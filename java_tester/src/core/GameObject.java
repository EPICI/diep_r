package core;

import java.awt.*;
import java.awt.geom.*;
import java.util.*;
import org.jscience.mathematics.vector.*;
import org.jscience.mathematics.number.*;

public class GameObject {

	public GamePanel root;
	public GameObject parent;
	public int team;
	public double radius;
	public Float64Vector position;
	public Float64Vector velocity;
	public Float64Vector acceleration;
	public Float64Vector aim;
	public double maxAcceleration;
	public double rotation;
	public int sides;
	public int score;
	public int level;
	public double damage;
	public double health;
	public double maxHealth;
	public double decay;
	public double density;
	public double area;
	public double mass;
	public double timeCreated;
	public double lastUpdated;
	public int[] stats;
	public ArrayList<GameObject> children;
	public ArrayList<Turret> turrets;
	public boolean controllable;
	public boolean fireKey;
	public boolean altFire;
	public String type;
	public String subtype;
	public ColorSet colorOverride;
	public double spin;
	public double spinDecay;
	public double lastHit;
	public double droneCounter;
	public double inset;
	public double stillBonus;
	
	private static final int[] LEVEL_SCORE = new int[46];
	
	static{
		for(int i=0;i<46;i++){
			LEVEL_SCORE[i] = levelToScore(i);
		}
	}
	
	public static final int levelToScore(int level){
		level -= 1;
		return ((level+3)*level+6)*level;
	}
	
	public static final int scoreToLevel(int score){
		int result = Arrays.binarySearch(LEVEL_SCORE, score);
		return result<0?(~result)-1:result;
	}
	
	public GameObject(){
		root = null;
		team = 0;
		radius = 0;
		position = Float64Vector.valueOf(0,0);
		velocity = Float64Vector.valueOf(0,0);
		acceleration = Float64Vector.valueOf(0,0);
		aim = Float64Vector.valueOf(0,0);
		maxAcceleration = 0;
		rotation = 0;
		sides = 0;
		score = 0;
		damage = 0;
		health = 1;
		maxHealth = 1;
		decay = 0;
		density = 1;
		area = 0;
		mass = 0;
		timeCreated = 0;
		lastUpdated = 0;
		stats = new int[8];
		children = new ArrayList<>();
		turrets = new ArrayList<>();
		controllable = false;
		fireKey = false;
		altFire = false;
		type = "";
		subtype = "";
		colorOverride = null;
		spin = 0;
		spinDecay = 0;
		lastHit = 0;
		droneCounter = 1;
		inset = 0;
		stillBonus = 0;
	}
	
	public String statString(){
		StringBuilder sb = new StringBuilder();
		sb.append(stats[0]);
		for(int i=1;i<8;i++){
			sb.append("/");
			sb.append(stats[i]);
		}
		return sb.toString();
	}
	
	public double getDps(){
		double dps = 0;
		for(Turret turret:turrets){
			dps += turret.damage*turret.health*turret.multiplier;
		}
		dps *= getBulletDamage()*getBulletHealth()*getReload();
		return dps;
	}
	
	public double getDamage(){
		double mul = 1;
		for(Turret turret:turrets){
			mul += turret.parentDamageHold*(turret.accumulator>=turret.delay?1:0);
		}
		return damage*mul;
	}
	
	public double getEquivalentDecay(){
		return decay*getEquivalentHealth();
	}
	
	public double getEquivalentHealth(){
		return maxHealth*damage;
	}
	
	public double getTerminalSpeed(){
		double anorm = maxAcceleration!=0?maxAcceleration:acceleration.normValue();
		return Math.sqrt(anorm*mass/(radius*GamePanel.DRAG_CONSTANT));
	}
	public Float64Vector getTerminalVelocity(){
		return GamePanel.directionOf(acceleration).times(getTerminalSpeed());
	}
	
	public void setFireKey(boolean fireKey){
		this.fireKey=fireKey;
		if(fireKey==true){
			for(Turret turret:turrets){
				turret.accumulator = Math.min(turret.accumulator, turret.cap);
			}
		}
	}
	
	public boolean intersects(GameObject other){
		Float64Vector diff = position.minus(other.position);
		return diff.normValue() < radius+other.radius;
	}
	
	public boolean friendly(GameObject other){
		return (team & other.team)!=0;
	}
	
	public boolean related(GameObject other){
		GameObject self = this;
		boolean tself = self.parent!=null, tother = other.parent!=null;
		while(self.parent!=null)self=self.parent;
		while(other.parent!=null)other=other.parent;
		return (tself^tother)&(self==other);
	}
	
	public void checkCollide(GameObject other,double dtime){
		if(intersects(other)){
			push(other, dtime);
			if(!friendly(other))collide(other, dtime);
		}
	}
	
	public void push(GameObject other,double dtime){
		boolean friendly = friendly(other);
		boolean related = related(other);
		double bounce = GamePanel.BOUNCE_CONSTANT;
		if(friendly)bounce *= GamePanel.BOUNCE_CONSTANT_FRIENDLY;
		if(related)bounce *= GamePanel.BOUNCE_CONSTANT_RELATED;
		Float64Vector diff = position.minus(other.position);
		diff = GamePanel.directionOf(diff).times(bounce*Math.pow(radius+other.radius-diff.normValue(),2)*dtime);
		velocity = velocity.plus(diff.times(1d/mass));
		other.velocity = other.velocity.plus(diff.times(-1d/other.mass));
	}
	
	public void collide(GameObject other,double dtime){
		dtime = Math.min(dtime, Math.min(health/other.damage, other.health/damage));
		double aloss = other.getDamage()*dtime*GamePanel.DAMAGE_CONSTANT, bloss = getDamage()*dtime*GamePanel.DAMAGE_CONSTANT;
		health -= aloss;
		other.health -= bloss;
		lastHit = other.lastHit = lastUpdated;
		if(health<GamePanel.EPS)killedby(other);
		if(other.health<GamePanel.EPS)other.killedby(this);
	}
	
	public void killedby(GameObject other){
		while(other.parent!=null)other = other.parent;// propagate kill credit
		if(!other.type.equals("tank"))return;
		other.score += Math.min(score, levelToScore(45));
		score = 0;
		other.updateProperties(true, true, true, true);
		other.updateStats();
		if(type.equals("shape") && other.subtype.equals("necro"))necrodby(other);
	}
	
	public void necrodby(GameObject other){
		boolean full = other.children.size()>=32;
		double ihealth = Math.sqrt(maxHealth*other.getBulletHealth());// geo mean
		double idamage = Math.sqrt(damage*other.getBulletDamage());// geo mean
		if(full){
			// look for something to replace
			double score = ihealth*idamage;
			int i;
			GameObject child = null;
			for(i=other.children.size()-1;i>=0;i--){
				child = other.children.get(i);
				if(child.getEquivalentHealth()<score)break;
			}
			if(i<0)return;
			other.children.remove(i);
			child.parent = null;//decouple
			child.decay = child.maxHealth;
		}
		timeCreated = lastUpdated;
		parent = other;
		team = other.team;
		colorOverride = null;
		density = 1;
		type = "shot";
		subtype = "drone";
		controllable = true;
		health = maxHealth = ihealth;
		damage = idamage;
		other.children.add(this);
	}
	
	public void updateStats(){
		damage = 1+0.5*stats[2];
		maxHealth = 1+level*0.04+0.2*stats[1];
		density = 1+0.2*stats[1];
		decay = -0.001*Math.pow(1+0.5*stats[0],2)*maxHealth;
		maxAcceleration = 60*(1-0.015*level)*(1+0.1*stats[7]);
	}
	
	public double getBulletAccel(){
		return 1+0.4*stats[3];
	}
	
	public double getBulletHealth(){
		return 1+0.2*stats[4];
	}
	
	public double getBulletDamage(){
		return 1+0.5*stats[5];
	}
	
	public double getReload(){
		return 1+0.13*stats[6];
	}
	
	public void updateAim(){
		rotation = GamePanel.angleOf(aim);
	}

	public void updateProperties(boolean doLevel,boolean doRadius,boolean doArea,boolean doMass){
		if(doLevel)level = scoreToLevel(score);
		if(doRadius)radius = 1+0.01*level;
		if(doArea)area = Math.PI*radius*radius;
		if(doMass)mass = area*density;
	}
	
	public GamePanel getRoot(){
		GameObject current = this;
		while(current.parent!=null)current = current.parent;
		return current.root;
	}
	
	public void update(double time){
		double dtime = time - lastUpdated;
		// update children
		double odensity = density;
		double densityMul = 1;
		boolean droneUser = false;
		for(Turret turret:turrets){
			droneUser |= turret.controllable;
			densityMul += turret.densityHold * (turret.accumulator>=turret.delay?1:0);
		}
		density *= densityMul;
		updateProperties(false, false, false, true);
		double accelFirst = turrets.isEmpty()?1:turrets.get(0).acceleration.normValue()*getBulletAccel();
		double droneCounter = this.droneCounter*Math.pow(getReload(), 2);// reload reduces drone speed penalty
		double oDroneCounter = droneCounter;
		for(GameObject child:children){
			if(child.controllable){
				if(!droneUser){
					child.decay = 1;
					continue;
				}
				child.maxAcceleration = accelFirst*oDroneCounter/droneCounter;
				Float64Vector point = GamePanel.directionOf(aim.plus(position).minus(child.position));
				child.aim = child.acceleration = point.times(child.maxAcceleration*(altFire?-1:1));
				child.updateAim();
				droneCounter += 1;
			}
		}
		children.retainAll(new HashSet<>(getRoot().objects));
		// update physics
		if(Math.abs(spin)>GamePanel.EPS){
			double spinBy = spin*dtime;
			spin -= spinBy*spinDecay;
			rotation = (rotation+spinBy)%(Math.PI*2);
			acceleration = GamePanel.complexMultiply(GamePanel.polar(1, spinBy), acceleration);
		}
		double velocityMag = velocity.normValue();
		Float64Vector laccel = acceleration;
		if(velocityMag>GamePanel.EPS){
			double velocityMul = -velocityMag*radius/mass*GamePanel.DRAG_CONSTANT-1/velocityMag*GamePanel.FRICTION_CONSTANT;
			laccel = laccel.plus(velocity.times(velocityMul));
		}
		velocity = velocity.plus(laccel.times(dtime));
		position = position.plus(velocity.times(dtime));
		double vfrac = velocity.normValue()/getTerminalSpeed();
		if(!Double.isFinite(vfrac))vfrac = 0;// NaN go away
		//System.out.println(laccel+" "+velocity+" "+position);
		// update turrets
		for(Turret turret:turrets){
			turret.update(time);
		}
		// update health
		double ldecay = decay;
		if(parent!=null && parent.health<GamePanel.EPS)ldecay = maxHealth;
		if(ldecay<0)ldecay *= Math.exp((time-lastHit)*0.1);
		health -= ldecay*dtime;
		health = Math.min(health, maxHealth);
		// bonus for not moving
		stillBonus += dtime;
		stillBonus *= Math.exp(-dtime*vfrac);
		// reset density
		density = odensity;
		// update lastUpdated
		lastUpdated = time;
	}
	
	public void draw(Graphics2D g){
		GamePanel root = getRoot();
		/*
		// draw children first
		for(GameObject obj:children){
			obj.draw((Graphics2D)g.create());
		}
		*/
		// draw turrets
		for(Turret turret:turrets){
			turret.draw((Graphics2D)g.create());
		}
		// colors
		ColorSet colors = colorOverride!=null?colorOverride:ColorSet.forTeam(team);
		double xpos = position.getValue(0), ypos = position.getValue(1), radius = this.radius;
		Shape shape;
		if(sides<3){
			shape = new Ellipse2D.Double(xpos-radius, ypos-radius, radius*2, radius*2);
		}else{
			double angle = this.rotation, ainc = Math.PI*2/sides;
			double[] xs = new double[sides];
			double[] ys = new double[sides];
			for(int i=0;i<sides;i++,angle+=ainc){
				xs[i] = xpos+radius*Math.cos(angle);
				ys[i] = ypos+radius*Math.sin(angle);
			}
			Path2D.Double path;
			shape = path = new Path2D.Double();
			path.moveTo(xs[sides-1], ys[sides-1]);
			if(inset==0){// simple algorithm
				for(int i=0;i<sides;i++){
					path.lineTo(xs[i], ys[i]);
				}
			}else{// apply inset
				double x1,y1,x2=xs[sides-1],y2=ys[sides-1],x3,y3;
				for(int i=0;i<sides;i++){
					x1=x2;
					y1=y2;
					x2=xs[i];
					y2=ys[i];
					x3=0.5*(x1+x2);
					y3=0.5*(y1+y2);
					path.quadTo(GamePanel.bezier(x3, xpos, inset), GamePanel.bezier(y3, ypos, inset), x2, y2);
				}
			}
			path.closePath();
		}
		Color fillCol = colors.fill, borderCol = colors.border;
		if(!controllable){
			double alpha = Math.min(1, Math.max(0, 
					health/(maxHealth*GamePanel.FADE_AT)
					));
			g.setComposite(AlphaComposite.SrcOver.derive((float)alpha));
		}
		g.setColor(fillCol);
		g.fill(shape);
		g.setColor(borderCol);
		g.setStroke(new BasicStroke((float)GamePanel.STROKE_WIDTH,BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
		g.draw(shape);
		if(root.showInfo && health<maxHealth){
			// health bar
			double x1 = xpos-radius, x2 = xpos+radius, y = ypos-radius*1.3;
			g.setColor(ColorSet.HEALTH_OUTER);
			g.draw(new Line2D.Double(x1, y, x2, y));
			g.setColor(ColorSet.HEALTH_INNER);
			g.draw(new Line2D.Double(x1, y, x1+(x2-x1)*health/maxHealth, y));
		}
	}
	
	public GameObject spawnShape(double roll){
		Random random = root.random;
		GameObject result = new GameObject();
		result.root = getRoot();
		result.type = "shape";
		result.team = 1;
		result.acceleration = GamePanel.polar(GamePanel.FRICTION_CONSTANT, Math.PI*2*random.nextDouble());
		result.rotation = Math.PI*2*random.nextDouble();
		result.density = 5;
		result.timeCreated = result.lastUpdated = lastUpdated;
		if(roll<0.05){// pentagon
			result.sides = 5;
			result.subtype = "pentagon";
			result.score = 500;
			result.damage = 1.5;
			result.health = result.maxHealth = 2;
			result.colorOverride = ColorSet.SHAPE_PENTAGON;
			result.radius = 1.5;
		}else if(roll<0.2){// triangle
			result.sides = 3;
			result.subtype = "triangle";
			result.score = 100;
			result.damage = 1;
			result.health = result.maxHealth = 1;
			result.colorOverride = ColorSet.SHAPE_TRIANGLE;
			result.radius = 1;
		}else{// square
			result.sides = 4;
			result.subtype = "square";
			result.score = 40;
			result.damage = 1;
			result.health = result.maxHealth = 0.2;
			result.colorOverride = ColorSet.SHAPE_SQUARE;
			result.radius = 1;
		}
		result.decay = result.health * -0.03;
		result.updateProperties(false, false, true, true);
		return result;
	}
	
}

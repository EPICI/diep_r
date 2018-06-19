package core;

import java.awt.*;
import java.awt.geom.*;
import java.util.*;
import org.jscience.mathematics.vector.*;
import org.jscience.mathematics.number.*;

public class GameObject {

	public int team;
	public double radius;
	public Float64Vector position;
	public Float64Vector velocity;
	public Float64Vector acceleration;
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
		team = 0;
		radius = 0;
		position = Float64Vector.valueOf(0,0);
		velocity = Float64Vector.valueOf(0,0);
		acceleration = Float64Vector.valueOf(0,0);
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
	}

	public void updateProperties(boolean doLevel,boolean doRadius,boolean doArea,boolean doMass){
		if(doLevel)level = scoreToLevel(score);
		if(doRadius)radius = 1+0.013636*level;
		if(doArea)area = Math.PI*radius*radius;
		if(doMass)mass = area*density;
	}
	
	public void update(double time){
		double dtime = time - lastUpdated;
		// update children
		for(int i=children.size()-1;i>=0;i--){
			GameObject obj = children.get(i);
			obj.update(time);
			if(obj.health<GamePanel.EPS)children.remove(i);
		}
		// update physics
		double velocityMag = velocity.normValue();
		Float64Vector laccel = acceleration;
		if(velocityMag>GamePanel.EPS){
			double velocityMul = -velocityMag*radius/mass*GamePanel.DRAG_CONSTANT-1/velocityMag*GamePanel.FRICTION_CONSTANT;
			laccel = laccel.plus(velocity.times(velocityMul));
		}
		velocity = velocity.plus(laccel.times(dtime));
		position = position.plus(velocity.times(dtime));
		// update health
		health -= decay*dtime;
		// update lastUpdated
		lastUpdated = time;
	}
	
	public void draw(Graphics2D g){
		// draw children first
		for(GameObject obj:children){
			obj.draw(g);
		}
		// colors
		ColorSet colors = ColorSet.forTeam(team);
		double xpos = position.getValue(0), ypos = position.getValue(1), radius = this.radius;
		Shape shape;
		if(sides<3){
			shape = new Ellipse2D.Double(xpos-radius, ypos-radius, radius*2, radius*2);
		}else{
			double angle = this.rotation, ainc = Math.PI*2/sides;
			double[] xs = new double[sides];
			double[] ys = new double[sides];
			for(int i=0;i<sides;i++,angle+=ainc){
				xs[i] = Math.cos(angle);
				ys[i] = Math.sin(angle);
			}
			Path2D.Double path;
			shape = path = new Path2D.Double();
			path.moveTo(xs[0], ys[0]);
			for(int i=1;i<sides;i++){
				path.lineTo(xs[i], ys[i]);
			}
			path.closePath();
		}
		g.setColor(colors.fill);
		g.fill(shape);
		g.setColor(colors.border);
		g.setStroke(new BasicStroke((float)GamePanel.STROKE_WIDTH));
		g.draw(shape);
	}
	
}

package core;

import java.awt.BasicStroke;
import java.awt.Graphics2D;
import java.awt.geom.Path2D;
import java.util.*;
import org.jscience.mathematics.number.*;
import org.jscience.mathematics.vector.*;

public class Turret {
	
	// turret info
	public GameObject parent;
	public double delay;
	public double cap;
	public double multiplier;
	public double accumulator;
	public double[] xs;
	public double[] ys;
	public double lastUpdated;
	public double rotation;
	public double spread;
	public double spreadMul;
	public int shots;
	public int limit;
	public double sweep;
	public double densityHold;
	public double parentDamageHold;
	public double pushback;
	
	// shot info
	public double radius,radiusOver;
	public Float64Vector position;
	public Float64Vector velocity;
	public Float64Vector acceleration;
	public double velocityOver,accelerationOver;
	public double damage,damageOver;
	public double health,healthOver;
	public double decay;
	public double density;
	public boolean controllable;
	public int sides;
	public double spin;
	public double spinDecay;
	public double converge;
	public double inset;
	public ArrayList<Turret> inherit;
	
	public Turret(){
		parent = null;
		delay = 0;
		cap = 0;
		multiplier = 1;
		accumulator = 0;
		xs = new double[1];
		ys = new double[1];
		lastUpdated = 0;
		radius = 0;
		position = Float64Vector.valueOf(0,0);
		velocity = Float64Vector.valueOf(0,0);
		acceleration = Float64Vector.valueOf(0,0);
		damage = 0;
		health = 1;
		decay = 1;
		density = 1;
		controllable = false;
		sides = 0;
		spread = 0;
		spreadMul = 1;
		shots = 0;
		spin = 0;
		spinDecay = 0;
		limit = 1<<30;
		converge = 0;
		inset = 0;
		inherit = new ArrayList<>();
		sweep = 0;
		densityHold = 0;
		parentDamageHold = 0;
		pushback = 0.3;
	}
	
	public void setShape(double length,double width){
		setShape(length,width,0);
	}
	public void setShape(double length,double width,double taper){
		setShape(length,width,taper,0);
	}
	public void setShape(double length,double width,double taper,double offset){
		setShape(length,width,taper,offset,offset);
	}
	public void setShape(double length,double width,double taper,double backofs,double frontofs){
		width *= 0.5;
		double fwidth = width;
		double bwidth = width;
		if(taper>0)fwidth *= 1-taper;
		if(taper<0)bwidth *= 1+taper;
		xs = new double[]{0,0,length,length};
		ys = new double[]{backofs+bwidth,backofs-bwidth,frontofs-fwidth,frontofs+fwidth};
		position = Float64Vector.valueOf(length-radius,frontofs);
	}
	
	public static Turret copy(Turret source){
		if(source==null)return null;
		Turret result = new Turret();
		result.copyFrom(source);
		return result;
	}
	
	public void copyFrom(Turret source){
		parent = source.parent;
		delay = source.delay;
		cap = source.cap;
		multiplier = source.multiplier;
		accumulator = source.accumulator;
		xs = source.xs;
		ys = source.ys;
		lastUpdated = source.lastUpdated;
		rotation = source.rotation;
		spread = source.spread;
		spreadMul = source.spreadMul;
		shots = source.shots;
		radius = source.radius;
		radiusOver = source.radiusOver;
		position = source.position;
		velocity = source.velocity;
		acceleration = source.acceleration;
		velocityOver = source.velocityOver;
		accelerationOver = source.accelerationOver;
		damage = source.damage;
		damageOver = source.damageOver;
		health = source.health;
		healthOver = source.healthOver;
		decay = source.decay;
		density = source.density;
		controllable = source.controllable;
		sides = source.sides;
		spin = source.spin;
		spinDecay = source.spinDecay;
		limit = source.limit;
		converge = source.converge;
		inset = source.inset;
		inherit = new ArrayList<>();
		for(Turret inherited:source.inherit){
			inherit.add(Turret.copy(inherited));
		}
		sweep = source.sweep;
		densityHold = source.densityHold;
		parentDamageHold = source.parentDamageHold;
		pushback = source.pushback;
	}

	public void update(double time){
		double dtime = time - lastUpdated;
		// do the cycle
		boolean ready = accumulator>=delay;//was it already able to shoot?
		double inc = Math.max(0, 1-(double)parent.children.size()/limit)*dtime*multiplier*parent.getReload();
		accumulator += inc;
		//System.out.println("accumulator: "+accumulator);
		if(parent.fireKey){
			// trying to shoot
			if(
					accumulator>=delay
					&& inc>GamePanel.EPS
					&& (sweep==0 || Angles.compare(sweep*(lastUpdated-parent.timeCreated), -rotation)-Angles.compare(sweep*(time-parent.timeCreated), -rotation)==-2*Math.signum(sweep))
					){
				double ftime;
				double over;
				if(ready){
					ftime = 0;
					over = accumulator-delay;
					accumulator = delay-1;
				}else{
					ftime = (accumulator-delay)/multiplier;
					over = 0;
					accumulator = accumulator-1;
				}
				GameObject bullet = makeShot(time,over);
				bullet.timeCreated = bullet.lastUpdated = time-ftime;
				bullet.parent = parent;
				parent.velocity = parent.velocity.minus(bullet.velocity.times(bullet.mass/parent.mass));// recoil by Newton's equal and opposite law
				parent.children.add(bullet);
				parent.getRoot().objects.add(bullet);
				shots++;
				bullet.update(time);
			}
		}
		// update lastUpdated
		lastUpdated = time;
	}
	
	public GameObject makeShot(double time,double over){
		GameObject bullet = new GameObject();
		initShot(bullet,time,over);
		return bullet;
	}
	
	public void initShot(GameObject bullet,double time,double over){
		double scale = parent.radius;
		double protation = parent.rotation+rotation+sweep*(time-parent.timeCreated);
		double lrotation = protation+Math.PI*2*spread*Math.sin(Math.PI*2*spreadMul*shots);
		double bspeed = parent.getBulletAccel();
		Float64Vector protate = GamePanel.polar(1, protation);
		Float64Vector lrotate = GamePanel.polar(1, lrotation);
		bullet.team = parent.team;
		bullet.colorOverride = parent.colorOverride;
		bullet.radius = (radius+radiusOver*over)*scale;
		bullet.position = GamePanel.complexMultiply(protate, position).times(scale).plus(parent.position);
		bullet.velocity = GamePanel.complexMultiply(lrotate, velocity).times((1+velocityOver*over)*bspeed*bspeed).plus(parent.velocity);
		bullet.acceleration = GamePanel.complexMultiply(lrotate, acceleration).times((1+accelerationOver*over)*bspeed);
		bullet.maxAcceleration = bullet.acceleration.normValue();
		bullet.rotation = lrotation;
		bullet.sides = sides;
		bullet.score = 0;
		bullet.damage = (damage+damageOver*over)*parent.getBulletDamage();
		bullet.health = bullet.maxHealth = (health+healthOver*over)*parent.getBulletHealth();
		bullet.decay = decay;
		bullet.density = density;
		bullet.controllable = controllable;
		bullet.type = "shot";
		bullet.subtype = controllable?"drone":"bullet";
		bullet.spin = spin;
		bullet.spinDecay = spinDecay;
		bullet.inset = inset;
		bullet.updateProperties(false, false, true, true);
		for(Turret inherited:inherit){
			inherited = Turret.copy(inherited);
			bullet.turrets.add(inherited);
			inherited.parent = bullet;
			inherited.lastUpdated = bullet.lastUpdated;
			inherited.damage *= bullet.damage;
			inherited.health *= bullet.health;
		}
		bullet.setFireKey(true);
		if(converge!=0){//battleship aiming
			double convergeMul = bullet.getTerminalSpeed()/parent.aim.normValue()*converge;
			bullet.spinDecay *= convergeMul;
			bullet.spin *= convergeMul;
		}
	}

	public void draw(Graphics2D g){
		double scale = parent.radius;
		double protation = parent.rotation+rotation+sweep*(lastUpdated-parent.timeCreated);
		g.translate(parent.position.getValue(0), parent.position.getValue(1));
		g.rotate(protation);
		g.translate(-pushback*Math.max(0, delay-accumulator), 0);
		ColorSet colors = ColorSet.forTeam(1);
		int sides = xs.length;
		Path2D.Double path = new Path2D.Double();
		path.moveTo(xs[0]*scale, ys[0]*scale);
		for(int i=1;i<sides;i++){
			path.lineTo(xs[i]*scale, ys[i]*scale);
		}
		path.closePath();
		g.setColor(colors.fill);
		g.fill(path);
		g.setColor(colors.border);
		g.setStroke(new BasicStroke((float)GamePanel.STROKE_WIDTH));
		g.draw(path);
	}

}

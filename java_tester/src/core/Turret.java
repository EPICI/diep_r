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
		radius = source.radius;
		radiusOver = source.radiusOver;
		position = source.velocity;
		velocity = source.velocity;
		velocityOver = source.velocityOver;
		acceleration = source.acceleration;
		accelerationOver = source.accelerationOver;
		damage = source.damage;
		damageOver = source.damageOver;
		health = source.health;
		healthOver = source.healthOver;
		decay = source.decay;
		density = source.density;
		controllable = source.controllable;
		sides = source.sides;
	}

	public void update(double time){
		double dtime = time - lastUpdated;
		// do the cycle
		boolean ready = accumulator>=delay;//was it already able to shoot?
		accumulator += dtime*multiplier*parent.getReload();
		//System.out.println("accumulator: "+accumulator);
		if(parent.fireKey){
			// trying to shoot
			if(accumulator>=delay){
				double over;
				if(ready){
					over = accumulator-delay;
					accumulator = delay-1;
				}else{
					over = 0;
					accumulator = accumulator-1;
				}
				GameObject bullet = makeShot(time,over);
				parent.velocity = parent.velocity.minus(bullet.velocity.times(bullet.mass/parent.mass));// recoil by Newton's equal and opposite law
				parent.children.add(bullet);
				parent.parent.objects.add(bullet);
			}
		}else{
			// not trying to shoot
			accumulator = Math.min(accumulator, cap);
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
		double lrotation = parent.rotation+rotation;
		double bspeed = parent.getBulletAccel();
		Float64Vector rotate = GamePanel.polar(1, lrotation);
		bullet.timeCreated = bullet.lastUpdated = time;
		bullet.team = parent.team;
		bullet.radius = radius+radiusOver*over;
		bullet.position = GamePanel.complexMultiply(rotate, position).plus(parent.position);
		bullet.velocity = GamePanel.complexMultiply(rotate, velocity).times(1+velocityOver*over).plus(parent.velocity);
		bullet.acceleration = GamePanel.complexMultiply(rotate, acceleration).times((1+accelerationOver*over)*bspeed);
		bullet.maxAcceleration = bullet.acceleration.normValue();
		bullet.rotation = lrotation;
		bullet.sides = 0;
		bullet.score = 0;
		bullet.damage = (damage+damageOver*over)*parent.getBulletDamage();
		bullet.health = bullet.maxHealth = (health+healthOver*over)*parent.getBulletHealth();
		bullet.decay = decay;
		bullet.density = density;
		bullet.controllable = controllable;
		bullet.updateProperties(false, false, true, true);
	}

	public void draw(Graphics2D g){
		g.translate(parent.position.getValue(0), parent.position.getValue(1));
		g.rotate(rotation+parent.rotation);
		ColorSet colors = ColorSet.forTeam(1);
		int sides = xs.length;
		Path2D.Double path = new Path2D.Double();
		path.moveTo(xs[0], ys[0]);
		for(int i=1;i<sides;i++){
			path.lineTo(xs[i], ys[i]);
		}
		path.closePath();
		g.setColor(colors.fill);
		g.fill(path);
		g.setColor(colors.border);
		g.setStroke(new BasicStroke((float)GamePanel.STROKE_WIDTH));
		g.draw(path);
	}

}
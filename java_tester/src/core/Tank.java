package core;

import org.jscience.mathematics.vector.Float64Vector;

public class Tank extends GameObject {
	
	// no added functionality yet
	
	public static void initTank(GamePanel panel,GameObject tank){
		tank.type = "tank";
		tank.subtype = "basic";
		tank.root = panel;
		tank.team = 2<<panel.random.nextInt(4);
		tank.timeCreated = tank.lastUpdated = panel.lastUpdated;
		tank.controllable = true;
		tank.updateProperties(true, true, true, true);
		tank.updateStats();
		tank.health = tank.maxHealth;
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 1;
		turret.health = 1;
		turret.decay = 0.4;
		turret.setShape(2, 1);
	}
	
	public static void initSpammer(GameObject tank){
		tank.subtype = "spammer";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 3.5;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 0.7;
		turret.damage = 0.7;
		turret.health = 0.7;
		turret.decay = 0.4;
		turret.spread = 1d/24;
		turret.spreadMul = 2d/9;
		turret.setShape(2, 1.5, -0.5);
	}
	
	public static void initHeavy(GameObject tank){
		tank.subtype = "heavy";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.0;
		turret.radius = 0.75;
		turret.velocity = Float64Vector.valueOf(20,0);
		turret.acceleration = Float64Vector.valueOf(70,0);
		turret.density = 1.5;
		turret.damage = 1.2;
		turret.health = 1.2;
		turret.decay = 0.4;
		turret.setShape(2, 1.5);
	}
	
	public static void initTriangle(GameObject tank){
		tank.subtype = "triangle";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 1;
		turret.health = 1;
		turret.decay = 0.8;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(turret);
		turret.rotation = Math.PI*5/6;
		turret.velocity = Float64Vector.valueOf(50,0);
		turret.damage = 0.5;
		turret.health = 0.5;
		turret.setShape(1.7, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(turret);
		turret.rotation = -turret.rotation;
	}
	
	public static void initTwin(GameObject tank){
		tank.subtype = "twin";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 0.5;
		turret.damage = 0.7;
		turret.health = 0.7;
		turret.decay = 0.4;
		turret.setShape(2, 1, 0, -0.5);
		turret = Turret.copy(turret);
		tank.turrets.add(turret);
		turret.delay = 0.5;
		turret.setShape(2, 1, 0, 0.5);
	}
	
	public static void initTrishot(GameObject tank){
		tank.subtype = "trishot";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(5,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 0.8;
		turret.health = 0.8;
		turret.decay = 0.4;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.velocity = Float64Vector.valueOf(3,0);
		turret.rotation = Math.PI/6;
		turret.delay = 0.5;
		turret.setShape(1.7, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.rotation = -turret.rotation;
	}
	
	public static void initQuad(GameObject tank){
		tank.subtype = "quad";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(5,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 0.8;
		turret.health = 0.8;
		turret.decay = 0.4;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.rotation = Math.PI;
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.rotation = Math.PI/2;
		turret.delay = 0.5;
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.rotation = -Math.PI/2;
	}
	
	public static void initTriplet(GameObject tank){
		tank.subtype = "triplet";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 0.5;
		turret.damage = 0.6;
		turret.health = 0.6;
		turret.decay = 0.4;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.velocity = Float64Vector.valueOf(7,-7);
		turret.delay = 0.9;
		turret.setShape(1.6, 1.6, 0, 0, -0.5);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.velocity = Float64Vector.valueOf(7,7);
		turret.setShape(1.6, 1.6, 0, 0, 0.5);
	}
	
}

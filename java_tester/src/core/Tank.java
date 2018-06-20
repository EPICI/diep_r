package core;

import org.jscience.mathematics.vector.Float64Vector;

public class Tank extends GameObject {
	
	public static final double VELOCITY = 1;
	
	// no added functionality yet
	
	public static void initTank(GamePanel panel,GameObject tank,int type){
		if(panel==null)panel = tank.getRoot();
		if(type==-1)type=panel.random.nextInt(12);
		switch(type){
		case 0:initTank(panel,tank);break;
		case 1:initSpammer(tank);break;
		case 2:initHeavy(tank);break;
		case 3:initTriangle(tank);break;
		case 4:initTwin(tank);break;
		case 5:initTrishot(tank);break;
		case 6:initQuad(tank);break;
		case 7:initDestroyer(tank);break;
		case 8:initSniper(tank);break;
		case 9:initTrapper(tank);break;
		case 10:initBooster(tank);break;
		case 11:initOverlord(tank);break;
		}
	}
	
	public static void initTank(GamePanel panel,GameObject tank){
		tank.type = "tank";
		tank.subtype = "basic";
		tank.root = panel;
		tank.timeCreated = tank.lastUpdated = panel.lastUpdated;
		tank.lastHit = tank.lastUpdated - 30;
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(40,0);
		turret.density = 2;
		turret.damage = 1.25;
		turret.health = 1.25;
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 1;
		turret.health = 1;
		turret.decay = 0.8;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(turret);
		turret.rotation = Math.PI*5/6;
		turret.velocity = Float64Vector.valueOf(VELOCITY*3,0);
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 0.7;
		turret.health = 0.7;
		turret.decay = 0.4;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
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
	
	public static void initDestroyer(GameObject tank){
		tank.subtype = "destroyer";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 0.6;
		turret.radius = 0.85;
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(10,0);
		turret.density = 5;
		turret.damage = 1.6;
		turret.health = 1.6;
		turret.decay = 0.4;
		turret.cap = 2;
		turret.radiusOver = 0.3;
		turret.setShape(1.7, 1.7);
	}
	
	public static void initSniper(GameObject tank){
		tank.subtype = "sniper";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.3;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(90,0);
		turret.density = 5;
		turret.damage = 0.7;
		turret.health = 1.4;
		turret.decay = 0.4;
		turret.cap = 2;
		turret.damageOver = 0.15;
		turret.healthOver = 0.3;
		turret.setShape(2.5, 1);
	}
	
	public static void initTrapper(GameObject tank){
		tank.subtype = "trapper";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.7;
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(2.5,0);
		turret.density = 5;
		turret.damage = 1;
		turret.health = 1;
		turret.decay = 0.2;
		turret.sides = 3;
		turret.setShape(1.3, 1.8, 0.3);
	}
	
	public static void initBooster(GameObject tank){
		tank.subtype = "booster";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 1;
		turret.health = 1;
		turret.decay = 1.5;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(turret);
		turret.rotation = Math.PI*5/6;
		turret.velocity = Float64Vector.valueOf(VELOCITY*3,0);
		turret.damage = 0.5;
		turret.health = 0.5;
		turret.setShape(1.7, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(turret);
		turret.rotation = -turret.rotation;
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.rotation = Math.PI*3/4;
		turret.delay = 0.5;
		turret.setShape(1.4, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.rotation = -turret.rotation;
	}
	
	public static void initOverlord(GameObject tank){
		tank.subtype = "overlord";
		tank.droneCounter = 4;
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.0;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(50,0);
		turret.density = 1;
		turret.damage = 1;
		turret.health = 1;
		turret.decay = -0.05;
		turret.sides = 3;
		turret.controllable = true;
		turret.limit = 8;
		turret.setShape(1.5, 1.5, -0.5);
		turret = Turret.copy(turret);
		tank.turrets.add(turret);
		turret.rotation = Math.PI;
		turret.delay = 0.5;
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
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 0.5;
		turret.damage = 0.6;
		turret.health = 0.6;
		turret.decay = 0.4;
		turret.setShape(2, 1);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.velocity = GamePanel.polar(VELOCITY, -Math.PI/6);
		turret.acceleration = GamePanel.polar(130, -Math.PI/6);
		turret.spin = Math.PI/3;
		turret.spinDecay = 2;
		turret.delay = 0.9;
		turret.setShape(1.6, 1.6, 0, 0, -0.5);
		turret = Turret.copy(turret);
		tank.turrets.add(0,turret);
		turret.velocity = GamePanel.polar(VELOCITY, Math.PI/6);
		turret.acceleration = GamePanel.polar(130, Math.PI/6);
		turret.spin = -Math.PI/3;
		turret.setShape(1.6, 1.6, 0, 0, 0.5);
	}
	
	public static void initStream(GameObject tank){
		tank.subtype = "stream";
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = tank.lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.4;
		turret.velocity = Float64Vector.valueOf(VELOCITY,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 0.5;
		turret.damage = 0.45;
		turret.health = 0.45;
		turret.decay = 0.4;
		turret.setShape(2, 0.8);
		for(int i=1;i<5;i++){
			turret = Turret.copy(turret);
			tank.turrets.add(turret);
			turret.delay = 0.2*i;
			turret.setShape(2-0.2*i, 0.8);
		}
	}
	
}

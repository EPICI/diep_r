package core;

import java.util.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import org.jscience.mathematics.number.*;
import org.jscience.mathematics.vector.*;

public class GamePanel extends JPanel {
	
	public static final double EPS = 1e-12d;
	
	public static final double DRAG_CONSTANT = 1;
	public static final double FRICTION_CONSTANT = 1;
	public static final double BOUNCE_CONSTANT = 50;
	public static final double DAMAGE_CONSTANT = 5;
	
	public static final double ZOOM_TO = 80;
	
	public static final double STROKE_WIDTH = 0.15;
	
	public static final double FADE_AT = 0.05;
	
	public static final double CELL_SIZE = 4;
	public static final double CELL_MUL = 1d/CELL_SIZE;
	private static final Float64Vector[] CELL_NEXT = {
			Float64Vector.valueOf(0,1),
			Float64Vector.valueOf(1,1),
			Float64Vector.valueOf(1,0),
			Float64Vector.valueOf(1,-1),
	};
	
	private static final String[] INSTRUCTIONS = {
			"1-9 to upgrade",
			"Alt 1-9 to change class",
			"U to reset upgrades",
			"Y to reset class",
			"E to auto fire",
			"K to level up",
			"Alt K for +100k score",
			"I to toggle info",
			"O to suicide",
	};
	
	public double lastUpdated;
	
	public ArrayList<GameObject> objects;
	
	public GameObject player;
	
	public BitSet keys;
	
	public Random random;
	
	public boolean showInfo = true;

	public GamePanel(){
		setPreferredSize(new Dimension(1280,720));
		
		random = new Random();
		
		lastUpdated = 0;
		objects = new ArrayList<>();
		
		player = new GameObject();
		initTank(player);
		objects.add(player);
		
		addListeners();
	}
	
	public void addListeners(){
		keys = new BitSet();
		addMouseListener(new MouseListener(){

			@Override
			public void mouseClicked(MouseEvent event) {
			}

			@Override
			public void mouseEntered(MouseEvent event) {
			}

			@Override
			public void mouseExited(MouseEvent event) {
			}

			@Override
			public void mousePressed(MouseEvent event) {
				requestFocusInWindow();
				//System.out.println("Mouse down");
				player.fireKey = true;
				player.altFire = event.getButton()!=MouseEvent.BUTTON1;
			}

			@Override
			public void mouseReleased(MouseEvent event) {
				//System.out.println("Mouse up");
				player.fireKey = false;
				player.altFire = false;
			}
			
		});
		addMouseMotionListener(new MouseMotionListener(){

			@Override
			public void mouseDragged(MouseEvent event) {
				onMouseMove(event.getX(),event.getY());
			}

			@Override
			public void mouseMoved(MouseEvent event) {
				onMouseMove(event.getX(),event.getY());
			}
			
		});
		addKeyListener(new KeyListener(){

			@Override
			public void keyPressed(KeyEvent event) {
				keys.set(event.getKeyCode());
				onKeyChange();
			}

			@Override
			public void keyReleased(KeyEvent event) {
				int upgrade = -1;
				switch(event.getKeyCode()){
				case KeyEvent.VK_1:upgrade=0;break;
				case KeyEvent.VK_2:upgrade=1;break;
				case KeyEvent.VK_3:upgrade=2;break;
				case KeyEvent.VK_4:upgrade=3;break;
				case KeyEvent.VK_5:upgrade=4;break;
				case KeyEvent.VK_6:upgrade=5;break;
				case KeyEvent.VK_7:upgrade=6;break;
				case KeyEvent.VK_8:upgrade=7;break;
				case KeyEvent.VK_9:upgrade=8;break;
				case KeyEvent.VK_U:{
					// reset upgrades
					Arrays.fill(player.stats, 0);
					player.updateStats();
					break;
				}
				case KeyEvent.VK_Y:{
					// reset tank
					initTank(player);
					break;
				}
				case KeyEvent.VK_E:{
					// temporary auto fire
					player.fireKey = true;
					break;
				}
				case KeyEvent.VK_K:{
					if(keys.get(KeyEvent.VK_ALT)){
						// +100k
						player.score += 100000;
					}else{
						// level up
						player.score = Math.max(player.score, GameObject.levelToScore(player.level+1));
					}
					player.updateProperties(true, true, true, true);
					player.updateStats();
					break;
				}
				case KeyEvent.VK_I:{
					// show infos
					showInfo = !showInfo;
					break;
				}
				case KeyEvent.VK_O:{
					// suicide
					player.score = 0;
					player.health = -1;
					break;
				}
				}
				if(upgrade>=0){
					if(keys.get(KeyEvent.VK_ALT)){
						// change class
						if(player.subtype.equals("basic")){
							switch(upgrade){
							case 0:initSpammer(player);break;
							}
						}
					}else{
						// upgrade stat
						player.stats[upgrade]++;
						player.updateStats();
					}
				}
				keys.clear(event.getKeyCode());
				onKeyChange();
			}

			@Override
			public void keyTyped(KeyEvent event) {
			}
			
		});
	}
	
	public void onMouseMove(int mousex,int mousey){
		//System.out.println("Mouse moved to ("+mousex+", "+mousey+")");
		int width = getWidth(), height = getHeight();
		double scale = Math.hypot(width, height)/ZOOM_TO;
		double aimx = (mousex-width*0.5)/scale, aimy = (mousey-height*0.5)/scale;
		player.aim = Float64Vector.valueOf(aimx,aimy);
		player.updateAim();
	}
	
	public void onKeyChange(){
		//System.out.println("Key pressed or released");
		int movex = (keys.get(KeyEvent.VK_RIGHT)||keys.get(KeyEvent.VK_D)?1:0) - (keys.get(KeyEvent.VK_LEFT)||keys.get(KeyEvent.VK_A)?1:0);
		int movey = (keys.get(KeyEvent.VK_DOWN)||keys.get(KeyEvent.VK_S)?1:0) - (keys.get(KeyEvent.VK_UP)||keys.get(KeyEvent.VK_W)?1:0);
		Float64Vector move = Float64Vector.valueOf(movex,movey);
		move = directionOf(move);
		player.acceleration = move.times(player.maxAcceleration);
	}
	
	@Override
	public void paint(Graphics og){
		// fetch
		Graphics2D g = (Graphics2D) og;
		int width = getWidth(), height = getHeight();
		double scale = Math.hypot(width, height)/ZOOM_TO;
		double camx = player.position.getValue(0);
		double camy = player.position.getValue(1);
		// rendering hints
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		// background
		g.setColor(Color.decode("#cdcdcd"));
		g.fillRect(0, 0, width, height);
		g.setColor(Color.decode("#c5c5c5"));
		for(double xpos=(-camx%1)*scale;xpos<width;xpos+=scale){
			int rxpos = (int)xpos;
			g.drawLine(rxpos, 0, rxpos, height);
		}
		for(double ypos=(-camy%1)*scale;ypos<height;ypos+=scale){
			int rypos = (int)ypos;
			g.drawLine(0, rypos, width, rypos);
		}
		// stats
		StringBuilder sb = new StringBuilder();
		sb.append(player.stats[0]);
		for(int i=1;i<8;i++){
			sb.append("/");
			sb.append(player.stats[i]);
		}
		g.setColor(Color.BLACK);
		g.drawString(sb.toString(), 10, 20);
		g.drawString("Level: "+player.level, 10, 40);
		g.drawString("Score: "+player.score, 10, 60);
		g.drawString("Health: "+player.health+" / "+player.maxHealth, 10, 80);
		for(int i=0;i<INSTRUCTIONS.length;i++){
			g.drawString(INSTRUCTIONS[i], 10, height-20*(INSTRUCTIONS.length-i));
		}
		// render objects
		g.translate(width*0.5, height*0.5);
		g.scale(scale, scale);
		g.translate(-camx, -camy);
		for(int i=objects.size()-1;i>=0;i--){
			GameObject obj = objects.get(i);
			obj.draw((Graphics2D)g.create());
		}
	}
	
	public void update(double time){
		HashMap<Float64Vector,ArrayList<GameObject>> cells = new HashMap<>();
		double dtime = time - lastUpdated;
		for(int i=0;i<objects.size();i++){
			GameObject obj = objects.get(i);
			obj.update(time);
			Float64Vector cell = Float64Vector.valueOf(Math.floor(obj.position.getValue(0)),Math.floor(obj.position.getValue(1)));
			ArrayList<GameObject> list = cells.get(cell);
			if(list==null){
				cells.put(cell, list=new ArrayList<>());
			}
			list.add(obj);
		}
		for(Float64Vector acell:cells.keySet()){
			ArrayList<GameObject> alist = cells.get(acell);
			for(Float64Vector offset:CELL_NEXT){
				Float64Vector bcell = acell.plus(offset);
				ArrayList<GameObject> blist = cells.get(bcell);
				if(blist!=null){
					for(GameObject first:alist){
						for(GameObject second:blist){
							if(!first.friendly(second) && first.intersects(second))first.collide(second, dtime);
						}
					}
				}
			}
		}
		for(int i=objects.size()-1;i>=0;i--){
			GameObject obj = objects.get(i);
			if(obj.health<EPS || obj.position.minus(player.position).normValue()>100)objects.remove(i);
		}
		if(!objects.contains(player)){
			objects.add(player);
			player.health = player.maxHealth;
			player.position = Float64Vector.valueOf(random.nextDouble()*2-1,random.nextDouble()*2-1).times(20);
		}
		while(objects.size()<500){
			double t = Math.PI*2*random.nextDouble();
			double u = random.nextDouble()+random.nextDouble();
			double r = Math.min(2-u, u);
			GameObject polygon = player.spawnShape(random.nextDouble());
			polygon.position = player.position.plus(polar(r*100,t));
			objects.add(polygon);
		}
		lastUpdated = time;
	}
	
	public static void sleep(long ms){
		try{
			Thread.sleep(ms);
		}catch(InterruptedException exception){
			
		}
	}
	
	public static Float64Vector directionOf(Float64Vector vec){
		double norm = vec.normValue();
		if(norm<EPS)return Float64Vector.valueOf(0,0);
		return vec.times(1/norm);
	}
	
	public static Float64Vector polar(double mag,double ang){
		return Float64Vector.valueOf(Math.cos(ang),Math.sin(ang)).times(mag);
	}
	
	public static Float64Vector complexMultiply(Float64Vector a,Float64Vector b){
		double ar = a.getValue(0), ai = a.getValue(1), br = b.getValue(0), bi = b.getValue(1);
		return Float64Vector.valueOf(ar*br-ai*bi,ar*bi+ai*br);
	}
	
	public void initTank(GameObject tank){
		tank.type = "tank";
		tank.subtype = "basic";
		tank.root = this;
		tank.team = 2<<random.nextInt(4);
		tank.timeCreated = tank.lastUpdated = lastUpdated;
		tank.controllable = true;
		tank.updateProperties(true, true, true, true);
		tank.updateStats();
		tank.health = tank.maxHealth;
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 1;
		turret.damage = 1;
		turret.health = 1;
		turret.decay = 0.4;
		turret.setShape(2, 1, 1);
	}
	
	public void initSpammer(GameObject tank){
		tank.subtype = "spammer";
		tank.timeCreated = tank.lastUpdated = lastUpdated;
		tank.controllable = true;
		tank.updateProperties(true, true, true, true);
		tank.updateStats();
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.lastUpdated = lastUpdated;
		turret.multiplier = 3.5;
		turret.radius = 0.5;
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(130,0);
		turret.density = 0.5;
		turret.damage = 0.7;
		turret.health = 0.7;
		turret.decay = 0.4;
		turret.spread = 1d/24;
		turret.spreadMul = 2d/9;
		turret.setShape(2, 1.5, 0.5);
	}
	
}

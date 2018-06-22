package core;

import java.util.*;
import java.util.concurrent.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import org.jscience.mathematics.number.*;
import org.jscience.mathematics.vector.*;

public class GamePanel extends JPanel {
	
	public static final double EPS = 1e-12d;
	
	public static final double DRAG_CONSTANT = 1;
	public static final double FRICTION_CONSTANT = 10;
	public static final double BOUNCE_CONSTANT = 1000;
	public static final double DAMAGE_CONSTANT = 5;
	
	public static final double STROKE_WIDTH = 0.15;
	
	public static final double FADE_AT = 0.05;
	
	public static final double CELL_SIZE = 5;
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
			"T to change team",
			"L to spawn opponent",
			"Shift L to spawn boss opponent",
			"Alt L to kill opponent",
			"Ctrl L for mirror opponent",
			"H for rapid healing",
	};
	
	public double lastUpdated;
	
	public ArrayList<GameObject> objects;
	public ArrayBlockingQueue<GameObject> objToAdd;
	
	public GameObject player;
	
	public GameObject opponent;
	
	public BitSet keys;
	
	public Random random;
	
	public boolean showInfo = true;

	public GamePanel(){
		setPreferredSize(new Dimension(1280,720));
		
		random = new Random();
		
		lastUpdated = 0;
		objects = new ArrayList<>();
		objToAdd = new ArrayBlockingQueue<>(16,true);
		
		player = new GameObject();
		Tank.initTank(GamePanel.this,player);
		player.team = 2;
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
				player.setFireKey(true);
				player.altFire = event.getButton()!=MouseEvent.BUTTON1;
			}

			@Override
			public void mouseReleased(MouseEvent event) {
				//System.out.println("Mouse up");
				player.setFireKey(false);
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
					Tank.initTank(GamePanel.this,player);
					break;
				}
				case KeyEvent.VK_E:{
					// temporary auto fire
					player.setFireKey(true);
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
				case KeyEvent.VK_T:{
					// team rotate
					player.team <<= 1;
					if(player.team>16)player.team = 2;
					break;
				}
				case KeyEvent.VK_H:{
					// rapid healing
					player.lastHit -= 60;
					break;
				}
				case KeyEvent.VK_L:{
					if(opponent!=null){
						opponent.health = -1;
						opponent.decay = 1;
					}
					if(keys.get(KeyEvent.VK_ALT)){
						opponent = null;
					}else{
						boolean boss = keys.get(KeyEvent.VK_SHIFT);
						boolean mirror = keys.get(KeyEvent.VK_CONTROL);
						// make opponent
						GameObject opponent = GamePanel.this.opponent = new GameObject();
						opponent.team = boss?1:player.team;
						while(opponent.team==player.team){
							opponent.team = 2<<random.nextInt(4);
						}
						int pts = boss?70:player.level;
						int lim = boss?14:7;
						while(pts>0){
							int i = random.nextInt(8);
							int inc = random.nextInt(1+Math.min(pts, lim-opponent.stats[i]));
							pts -= inc;
							opponent.stats[i] += inc;
						}
						opponent.score = player.score;
						opponent.health = opponent.maxHealth;
						opponent.position = player.position.plus(polar(0.6*zoomTo(player),Math.PI*2*random.nextDouble()));
						opponent.acceleration = directionOf(player.position.minus(opponent.position)).times(opponent.maxAcceleration);
						opponent.aim = directionOf(player.position.minus(opponent.position));
						opponent.updateAim();
						Tank.initTank(GamePanel.this, opponent);
						Tank.initTank(GamePanel.this, opponent, mirror?Tank.getType(player.subtype):-1);
						objToAdd.add(opponent);
					}
					break;
				}
				}
				if(upgrade>=0){
					if(keys.get(KeyEvent.VK_ALT)){
						// change class
						if(player.subtype.equals("basic")){
							switch(upgrade){
							case 0:Tank.initSpammer(player);break;
							case 1:Tank.initHeavy(player);break;
							case 2:Tank.initTriangle(player);break;
							}
						}else if(player.subtype.equals("spammer")){
							switch(upgrade){
							case 0:Tank.initTwin(player);break;
							case 1:Tank.initTrishot(player);break;
							case 2:Tank.initQuad(player);break;
							}
						}else if(player.subtype.equals("heavy")){
							switch(upgrade){
							case 0:Tank.initDestroyer(player);break;
							case 1:Tank.initSniper(player);break;
							case 2:Tank.initTrapper(player);break;
							}
						}else if(player.subtype.equals("triangle")){
							switch(upgrade){
							case 0:Tank.initBooster(player);break;
							case 1:Tank.initOverlord(player);break;
							}
						}else if(player.subtype.equals("twin")){
							switch(upgrade){
							case 0:Tank.initTriplet(player);break;
							case 1:Tank.initStream(player);break;
							case 2:Tank.initBattleship(player);break;
							}
						}else if(player.subtype.equals("trishot")){
							switch(upgrade){
							case 0:Tank.initPentashot(player);break;
							}
						}else if(player.subtype.equals("destroyer")){
							switch(upgrade){
							case 0:Tank.initSkimmer(player);break;
							}
						}
					}else if(upgrade<8){
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
		double scale = getScale();
		double aimx = (mousex-width*0.5)/scale, aimy = (mousey-height*0.5)/scale;
		Float64Vector newAim = Float64Vector.valueOf(aimx,aimy);
		double aimdist = newAim.normValue();
		if(aimdist>EPS){// aiming at yourself is not allowed
			player.aim = newAim;
			player.updateAim();
		}
	}
	
	public void onKeyChange(){
		//System.out.println("Key pressed or released");
		int movex = (keys.get(KeyEvent.VK_RIGHT)||keys.get(KeyEvent.VK_D)?1:0) - (keys.get(KeyEvent.VK_LEFT)||keys.get(KeyEvent.VK_A)?1:0);
		int movey = (keys.get(KeyEvent.VK_DOWN)||keys.get(KeyEvent.VK_S)?1:0) - (keys.get(KeyEvent.VK_UP)||keys.get(KeyEvent.VK_W)?1:0);
		Float64Vector move = Float64Vector.valueOf(movex,movey);
		move = directionOf(move);
		player.acceleration = move.times(player.maxAcceleration);
	}
	
	public static double zoomTo(GameObject tank){
		double result = 80+0.5*tank.level;
		switch(tank.subtype){
		case "sniper":result*=1.1;break;
		}
		return result;
	}
	
	public double getScale(){
		int width = getWidth(), height = getHeight();
		return Math.hypot(width, height)/zoomTo(player);
	}
	
	@Override
	public void paint(Graphics og){
		// fetch
		Graphics2D g = (Graphics2D) og;
		int width = getWidth(), height = getHeight();
		double scale = getScale();
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
		g.setColor(Color.BLACK);
		g.drawString("Level "+player.level+", "+player.score+" score", 10, 20);
		g.drawString("Playing as "+player.subtype+" with build "+player.statString()+" -> "+player.getDps()+" DPS, "+player.maxHealth+" HP", 10, 40);
		g.drawString(opponent==null?"No opponent":"Opponent is a "+opponent.subtype+" with build "+opponent.statString()+" -> "+opponent.getDps()+" DPS, "+opponent.maxHealth+" HP", 10, 60);
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
		for(GameObject nextToAdd=objToAdd.poll();nextToAdd!=null;nextToAdd=objToAdd.poll()){
			objects.add(nextToAdd);
		}
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
			// collide own cell
			for(int i=alist.size()-1;i>0;i--){
				GameObject first = alist.get(i);
				for(int j=i-1;j>=0;j--){
					GameObject second = alist.get(j);
					first.checkCollide(second, dtime);
				}
			}
			// collide other cells
			for(Float64Vector offset:CELL_NEXT){
				Float64Vector bcell = acell.plus(offset);
				ArrayList<GameObject> blist = cells.get(bcell);
				if(blist!=null){
					for(GameObject first:alist){
						for(GameObject second:blist){
							first.checkCollide(second, dtime);
						}
					}
				}
			}
		}
		for(int i=objects.size()-1;i>=0;i--){
			GameObject obj = objects.get(i);
			if(obj.health<EPS || obj.position.minus(player.position).normValue()>(obj.type.equals("tank")?500:100)){
				obj.health = -1;
				objects.remove(i);
			}
		}
		if(!objects.contains(opponent)){
			if(opponent!=null){
				opponent.decay = 1;
			}
			opponent = null;
		}else{
			Float64Vector otp = player.position.minus(opponent.position);
			double otpm = otp.normValue();
			double ozt = zoomTo(opponent)*0.5;
			opponent.acceleration = otpm>30?otp.times(opponent.maxAcceleration/otpm):complexMultiply(polar(1,(random.nextDouble()*2-1)*dtime),opponent.acceleration);
			if(otpm<ozt){
				opponent.aim = otp;
				opponent.updateAim();
			}
			if(otpm<ozt && !opponent.fireKey){
				opponent.setFireKey(true);
			}else if(otpm>ozt*1.5 && opponent.fireKey){
				opponent.setFireKey(false);
			}
		}
		if(!objects.contains(player)){
			objects.add(player);
			player.health = player.maxHealth;
			player.position = randomCircle().times(50);
		}
		while(objects.size()<300){
			GameObject polygon = player.spawnShape(random.nextDouble());
			polygon.position = player.position.plus(randomCircle().times(100));
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
	
	public Float64Vector randomCircle(){
		double t = Math.PI*2*random.nextDouble();
		double u = random.nextDouble()+random.nextDouble();
		double r = Math.min(2-u, u);
		return polar(r,t);
	}
	
	public static double angleOf(Float64Vector vec){
		return Math.atan2(vec.getValue(1), vec.getValue(0));
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
	
	public static double bezier(double a,double b,double t){
		return a+(b-a)*t;
	}
	
}

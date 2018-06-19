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
	
	public static final double ZOOM_TO = 80;
	
	public static final double STROKE_WIDTH = 0.15;
	
	public static final double FADE_AT = 0.1;
	
	public double lastUpdated;
	
	public ArrayList<GameObject> objects;
	
	public GameObject player;
	
	public BitSet keys;

	public GamePanel(){
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
				}
				if(upgrade>=0){
					if(keys.get(KeyEvent.VK_ALT)){
						// change class
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
		g.drawString(sb.toString(), 10, 30);
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
		double dtime = time - lastUpdated;
		for(int i=0;i<objects.size();i++){
			GameObject obj = objects.get(i);
			obj.update(time);
		}
		for(int i=objects.size()-1;i>=0;i--){
			GameObject obj = objects.get(i);
			if(obj.health<EPS)objects.remove(i);
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
		return Float64Vector.valueOf(mag*Math.cos(ang),mag*Math.sin(ang));
	}
	
	public static Float64Vector complexMultiply(Float64Vector a,Float64Vector b){
		double ar = a.getValue(0), ai = a.getValue(1), br = b.getValue(0), bi = b.getValue(1);
		return Float64Vector.valueOf(ar*br-ai*bi,ar*bi+ai*br);
	}
	
	public void initTank(GameObject tank){
		tank.root = this;
		tank.team = 2;
		tank.timeCreated = tank.lastUpdated = lastUpdated;
		tank.controllable = true;
		tank.updateProperties(true, true, true, true);
		tank.updateStats();
		Turret turret = new Turret();
		tank.turrets.clear();
		tank.turrets.add(turret);
		turret.parent = tank;
		turret.xs = new double[]{0,0,2,2};
		turret.ys = new double[]{0.5,-0.5,-0.5,0.5};
		turret.lastUpdated = lastUpdated;
		turret.multiplier = 1.6;
		turret.radius = 0.5;
		turret.position = Float64Vector.valueOf(1.5,0);
		turret.velocity = Float64Vector.valueOf(10,0);
		turret.acceleration = Float64Vector.valueOf(1,0);
		turret.damage = 1;
		turret.health = 1;
		turret.decay = 5;
	}
	
}

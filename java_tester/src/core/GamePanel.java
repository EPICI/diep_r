package core;

import java.util.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import org.jscience.mathematics.number.*;
import org.jscience.mathematics.vector.*;

public class GamePanel extends JPanel {
	
	public static final double EPS = 1e-12d;
	
	public static final double DRAG_CONSTANT = 0.1;
	public static final double FRICTION_CONSTANT = 0.1;
	
	public static final double ZOOM_TO = 80;
	
	public static final double STROKE_WIDTH = 0.15;
	
	public double lastUpdated;
	
	public ArrayList<GameObject> objects;

	public GamePanel(){
		lastUpdated = 0;
		objects = new ArrayList<>();
		
		GameObject test = new GameObject();
		objects.add(test);
		test.team = 2;
		test.updateProperties(true, true, true, true);
	}
	
	@Override
	public void paint(Graphics og){
		// fetch
		Graphics2D g = (Graphics2D) og;
		int width = getWidth(), height = getHeight();
		double scale = Math.hypot(width, height)/ZOOM_TO;
		double camx = 0, camy = 0;
		// rendering hints
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		// background
		g.setColor(Color.decode("#cdcdcd"));
		g.fillRect(0, 0, width, height);
		g.setColor(Color.decode("#c5c5c5"));
		for(double xpos=-camx%scale+scale;xpos<width;xpos+=scale){
			int rxpos = (int)xpos;
			g.drawLine(rxpos, 0, rxpos, height);
		}
		for(double ypos=-camy%scale+scale;ypos<height;ypos+=scale){
			int rypos = (int)ypos;
			g.drawLine(0, rypos, width, rypos);
		}
		// render objects
		g.translate(width*0.5, height*0.5);
		g.scale(scale, scale);
		g.translate(-camx, -camy);
		for(GameObject obj:objects){
			obj.draw(g);
		}
	}
	
	public void update(double time){
		double dtime = time - lastUpdated;
		for(GameObject obj:objects){
			obj.update(time);
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
	
}

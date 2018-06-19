package core;

import java.awt.*;

public class ColorSet {
	
	public static final Color HEALTH_INNER = Color.decode("#85e37d");
	public static final Color HEALTH_OUTER = Color.decode("#555555");
	
	public static final ColorSet NEUTRAL = new ColorSet(Color.decode("#9d9d9d"),Color.decode("#6b6b6b"));
	public static final ColorSet BLUE = new ColorSet(Color.decode("#00b2e1"),Color.decode("#0085a8"));
	public static final ColorSet GREEN = new ColorSet(Color.decode("#00e16e"),Color.decode("#00a852"));
	public static final ColorSet RED = new ColorSet(Color.decode("#f14e54"),Color.decode("#b43a3f"));
	public static final ColorSet PURPLE = new ColorSet(Color.decode("#bf7ff5"),Color.decode("#8f5fb7"));
	
	public static final ColorSet SHAPE_SQUARE = new ColorSet(Color.decode("#ffe869"),Color.decode("#bfae4e"));
	public static final ColorSet SHAPE_TRIANGLE = new ColorSet(Color.decode("#fc7677"),Color.decode("#bd5859"));
	public static final ColorSet SHAPE_PENTAGON = new ColorSet(Color.decode("#768dfc"),Color.decode("#5869bd"));

	public Color fill;
	public Color border;
	
	public ColorSet(Color fill,Color border){
		this.fill=fill;
		this.border=border;
	}
	
	public static ColorSet forTeam(int team){
		switch(team){
		case 2:return BLUE;
		case 4:return GREEN;
		case 8:return RED;
		case 16:return PURPLE;
		}
		return NEUTRAL;
	}
	
	public static Color setAlpha(Color color,double alpha){
		int ialpha = (int)Math.round(255*Math.min(1, Math.max(0, alpha)));
		int rgb = color.getRGB();
		return new Color(rgb|(ialpha<<24),true);
	}
	
}

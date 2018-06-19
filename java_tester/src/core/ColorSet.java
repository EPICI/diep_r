package core;

import java.awt.*;

public class ColorSet {
	
	public static final ColorSet NEUTRAL = new ColorSet(Color.decode("#9d9d9d"),Color.decode("#6b6b6b"));
	public static final ColorSet BLUE = new ColorSet(Color.decode("#00b2e1"),Color.decode("#0085a8"));

	public Color fill;
	public Color border;
	
	public ColorSet(Color fill,Color border){
		this.fill=fill;
		this.border=border;
	}
	
	public static ColorSet forTeam(int team){
		switch(team){
		case 2:return BLUE;
		}
		return NEUTRAL;
	}
	
	public static Color setAlpha(Color color,double alpha){
		int ialpha = (int)Math.round(255*Math.min(1, Math.max(0, alpha)));
		int rgb = color.getRGB();
		return new Color(rgb|(ialpha<<24),true);
	}
	
}

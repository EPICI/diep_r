package core;

import java.awt.*;

public class ColorSet {
	
	public static final ColorSet NEUTRAL = null;
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
	
}

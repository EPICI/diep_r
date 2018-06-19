package core;

import java.util.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Main {
	
	public static JFrame frame;
	public static GamePanel panel;
	
	public static final long FRAME_MS = 100;

	public static void main(String[] args) {
		frame = new JFrame("diep.io remake");
		panel = new GamePanel();
		frame.setContentPane(panel);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.pack();
		frame.setResizable(true);
		frame.setVisible(true);
		
		long start = System.nanoTime();
		while(frame.isVisible()){
			GamePanel.sleep(FRAME_MS);
			panel.update((System.nanoTime()-start)/1e9d);
			panel.repaint();
		}
	}

}

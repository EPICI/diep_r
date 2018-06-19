// This is the header for the Turret structure. Turrets are encapsulated in Tank structures.
//
// Bullet system as created by EPICI
//
// Turrets have 3 constants, a delay, a cap and a multiplier. They also track a variable, the 
// accumulator. The accumulator starts at the predefined cap, and increases by some fixed rate as 
// long as either the fire key is held or it is less than cap. If the fire key is not held, it is 
// capped at cap. If it reaches or passes delay, it is set to delay - 1 and a bullet is fired or 
// some other thing happens.
//
// Tanks meant to shoot slower will have a lower multiplier, which is a multiplier for how fast 
// accumulator increases.
//
// When you upgrade reload, it makes accumulator increase faster. This makes it so that reload rate
// can be the same number across tanks that shoot at different speeds. It also means reload will 
// affect fire rate (shots per second) rather than fire time (seconds per shot).
//
// Delay determines where in the cycle the shot happens; 0 is immediate, 1 is the end of the cycle,
// 1/4 is 1/4 of the way through the cycle, etc. Doesn't prevent bullet stacking. The amount 
// subtracted on shot determines the strength modifier for the shot. Normally cap is 0, which is at
// or below delay, so this is 1; however, if cap is higher than delay, you can stop firing for a 
// bit and your first shot after is extra strong. Snipers have their cap raised a lot so they can 
// get a big advantage by actually sniping. Destroyer types become more like annihilators for 
// their first shot. And so on.

struct Turret
{
	double t_Delay;
	double t_Cap;
	double t_Multiplier;
	double t_Accumulator;

	Turret(double _delay, double _cap, double _multiplier)
	{
		t_Delay = _delay;
		t_Cap = _cap;
		t_Multiplier = _multiplier;
		t_Accumulator = _cap;
	}
};
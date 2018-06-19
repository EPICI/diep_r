// This header holds the structure that represents a Tank. A tank is not the same as a Player, a 
// player represents the physical human at the end of a wire that controls a Tank. Thus, a Tank has
// much more properties and variables than a Player.

#include "Vector.h"
#include "Team.h"

// Enumeration of all the different classes a Tank can have.

enum TankClass
{
	Basic,						// One average cannon.

	Sniper,						// More FOV, stronger and faster bullets.
	Twin,						// Two parallel cannons, faster reload.
	Spammer,					// Wider cannon, faster reload in sacrifice for accuracy.
	Flank						// Flank cannon at back.
};

struct Tank
{
	// Velocities and position.

	Vector p_Position;
	Vector p_Velocity;
	Vector p_Acceleration;

	TeamClass p_Team;
	TankClass p_Class;

	unsigned int p_Level;

	double p_Rot;

	// Statistics.

	unsigned char s_Health_Regen;
	unsigned char s_Max_Health;
	unsigned char s_Body_Damage;
	unsigned char s_Bullet_Speed;
	unsigned char s_Bullet_Damage;
	unsigned char s_Bullet_Penetration;
	unsigned char s_Bullet_Reload;
	unsigned char s_Movement_Speed;

	// Health. This cannot exceed max_hp(p_Class, p_Level, s_Max_Health).


};
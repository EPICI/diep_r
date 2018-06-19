// This is the main file for the Player object in the Diep.io Remake project. Player objects 
// contain information regarding a player, not an entity. This information includes the player's
// connection information and unique ID. It also contains a Tank object that refers to the Tank
// that the Player is controlling or was controlling before it's death.

#include "Tank.h"

// The following variable will begin at zero and increment each time a new connection is established
// with the game server. It is reset when the server is restarted, so it is not unique for all-time.

unsigned int p_unique_id = 0;

struct Player
{
	
};
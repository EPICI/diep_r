// Remaking diep.io with HTML5 canvas and Javascript.

// Create and reference a new canvas for drawing to.

var canvas = document.createElement("canvas");

// Create the dimensions for the canvas.ctx.canvas.width  = window.innerWidth;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Insert the canvas into the document so that it can be seen.

document.body.insertBefore(canvas, document.body.childNodes[0]);

// Reference the context of the newly created canvas.

var context = canvas.getContext("2d");

// Draw round rectangle.

function Round_Rect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};

    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }

  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();

  if (fill) {
    ctx.fill();
  }

  if (stroke) {
    ctx.stroke();
  }
}

// This function creates a RGB string from an RGB color.

function Make_Color(r, g, b)
{
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

// This function creates a RGBA string from an RGBA color.

function Make_Color_Ex(r, g, b, a)
{
	return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

// This function prepares the context for rendering.

function Prepare_Context(r, g, b)
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	Clear_Context(r, g, b);
}

// This function clears the context to the specified RGB color.

function Clear_Context(r, g, b)
{
	context.fillStyle = Make_Color(r, g, b);
	context.fillRect(0, 0, canvas.width, canvas.height);
}

// This function draws a line of the given color and width from x1, y1, to x2, y2

function Draw_Line(r, g, b, a, w, x1, y1, x2, y2)
{
	context.strokeStyle = Make_Color_Ex(r, g, b, a);
	context.lineWidth = w;

	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}

// This function fills a rectangle with the given color.

function Fill_Rect(r, g, b, a, x, y, w, h)
{
	context.fillStyle = Make_Color_Ex(r, g, b, a);
	context.fillRect(x, y, w, h);
}

// This function draws a rectangle with the given color.

function Draw_Rect(r, g, b, a, x, y, w, h)
{
	context.strokeStyle = Make_Color_Ex(r, g, b, a);
	context.rect(x, y, w, h);
}

// Name table

var _NT = ["chino(bo)", "owix!", "[MG] Kalio", "Limdur [AB]", "lassso91.", "twips**", "Spooky X", "limring=D", "Deck", "bentish_", ""];

// Class type definitions

var C_BASIC = 0;

var C_TWIN = 1;					// Done design
var C_SNIPER = 2;				// Done design
var C_MACHINE_GUN = 3;			// Done design
var C_FLANK_GUARD = 4;			// Done design

var C_OVERSEER = 5;				// Done design
var C_SMASHER = 6;				
var C_DESTROYER = 7;			// Done design
var C_TRAPPER = 8;				// Done design
var C_ASSASSIN = 9;				// Done design
var C_GUNNER = 10;				// Done design
var C_HUNTER = 11;				// Done design
var C_TRIPLE_SHOT = 12;			// Done design	
var C_TRI_ANGLE = 13;			// Done design
var C_TWIN_FLANK = 14;			// Done design
var C_AUTO_3 = 15;				// Done design
var C_QUAD_TANK = 16;			// Done design

var C_NECROMANCER = 17;
var C_OVERLORD = 18;
var C_FACTORY = 19;
var C_BATTLESHIP = 20;
var C_LANDMINE = 21;
var C_SPIKE = 22;
var C_ROCKETEER = 23;
var C_STREAMLINER = 24;
var C_STALKER = 25;
var C_MANAGER = 26;
var C_PREDATOR = 27;
var C_RANGER = 28;
var C_ANNIHILATOR = 29;

var C_SKIMMER = 30;
var C_PENTA_SHOT = 31;
var C_BOOSTER = 32;
var C_TRIPLET = 33;
var C_SPREAD_SHOT = 34;
var C_SPRAYER = 35;
var C_OVERTRAPPER = 36;
var C_HYBRID = 37;
var C_AUTO_5 = 38;
var C_OCTO_TANK = 39;
var C_AUTO_SMASHER = 40;
var C_AUTO_GUNNER = 41;
var C_FIGHTER = 42;
var C_GUNNER_TRAPPER = 43;
var C_MEGA_TRAPPER = 44;
var C_TRIPLE_TWIN = 45;
var C_TRI_TRAPPER = 46;
var C_AUTO_TRAPPER = 47;

var C_DOMINATOR_GUNNER = 48;
var C_DOMINATOR_DESTROYER = 49;
var C_DOMINATOR_TRAPPER = 50;
var C_ARENA_CLOSER = 51;

var C_BOSS_GUARDIAN = 52;
var C_BOSS_SUMMONER = 53;
var C_BOSS_DEFENDER = 54;
var C_BOSS_FALLEN_BOOSTER = 55;
var C_BOSS_FALLEN_OVERLORD = 56;

var C_BASE_DEFENDER = 57;
var C_CRASHER = 58;

var C_NAMES =
[
	"Tank",
	"Twin",
	"Sniper",
	"Machine Gun",
	"Flank Guard",
	"Overseer",
	"Smasher",
	"Destroyer",
	"Trapper",
	"Assassin",
	"Gunner",
	"Hunter",
	"Triple Shot",
	"Tri-Angle",
	"Twin Flank",
	"Auto 3",
	"Quad Tank",
	"Necromancer",
	"Overlord",
	"Factory",
	"Battleship",
	"Landmine",
	"Spike",
	"Rocketeer",
	"Streamliner",
	"Stalker",
	"Manager",
	"Predator",
	"Ranger",
	"Annihilator",
	"Skimmer",
	"Penta Shot",
	"Booster",
	"Triplet",
	"Spread Shot",
	"Sprayer",
	"Overtrapper",
    "Hybrid",
	"Auto 5",
	"Octo Tank",
	"Auto Smasher",
	"Auto Gunner",
	"Fighter",
	"G. Trapper",
	"M. Trapper",
	"Triple Twin",
	"T. Trapper",
	"A. Trapper",
	"Dominator",
	"Dominator",
	"Dominator",
	"Arena Closer",
	"Guardian",
	"Summoner",
	"Defender",
	"Fallen Booster",
	"Fallen Overlord",
	"Protecter",
	"Crasher"
];

// Tank team indices

var _BLUE = 0;			// Blue team players or dominators
var _RED = 1;			// Red team players or dominators
var _GREEN = 2;			// Green team players or dominators
var _PURPLE = 3;		// Purple team players or dominators
var _YELLOW = 4;		// Contested dominators, arena closer, developer
var _GRAY = 5;			// Fallen bosses or dominators
var _PINK = 6;			// Pentagon defenders
var _TRIANGLE = 7;		// The Defender
var _BLACK = 8;			// Don't use on players! Only push notifications.

// Shape type indices

var S_SQUARE = 0;
var S_TRIANGLE = 1;
var S_PENTAGON = 2;
var S_ALPHA = 3;
var S_GREEN_SQUARE = 4;
var S_GREEN_TRIANGLE = 5;
var S_GREEN_PENTAGON = 6;

// Bullet types

var B_NORMAL = 0;			// Circle							DONE
var B_BATTLESHIP = 1;		// Small triangles					DONE
var B_SKIMMER = 2;			// Circle with two cannons on back 	
var B_ROCKETEER = 3;		// Circle with wide cannon on back 
var B_OVERLORD = 4;			// Triangles 						DONE
var B_NECROMANCER = 5;		// Squares							DONE
var B_TRAP = 6;				// Concave hexagon

// This structure represents one entry in the leaderboard.

function Leaderboard_Entry(name, team, tank, score, percent)
{
	this.name = name;
	this.team = team;
	this.tank = tank;
	this.score = score;
	this.percent = percent;
}

var _LB = [];

// This structure represents a player. It is passed in binary format to this client, the format is
//
// X (Sint16)
// Y (Sint16)
// Level (Uint8)
// Team (Uint8)
// Rotation (Sint16)
// Health (Sint8)
// Tank (Uint8)
// Score (Uint32)
// Tag (Uint16)

function Player(x, y, vx, vy, level, team, rotation, health, tank, score, tag, spawn, recoil, injury)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.level = level;
	this.team = team;
	this.rotation = rotation;
	this.health = health;
	this.tank = tank;
	this.score = score;
	this.tag = tag;
	this.spawn = spawn;
	this.recoil = recoil;
	this.injury = injury;

	this.cheat = false;
}

// This structure represents a shape.

function Shape(x, y, rotation, health, shape)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.health = health;
	this.shape = shape;
}

// This structure represents a bullet. 2nd degree polynomial for x, y.

function Bullet(x, y, vx, vy, ax, ay, size, rotation, team, bullet, life)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.ax = ax;
	this.ay = ay;
	this.size = size;
	this.rotation = rotation;
	this.team = team;
	this.bullet = bullet;
	this.life = life;
}

// This structure represents a dead bullet, i.e. a bullet that expired and is now fading away.

function DeadBullet(x, y, vx, vy, size, rotation, team, bullet)
{
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.size = size;
	this.rotation = rotation;
	this.team = team;
	this.bullet = bullet;
	this.life = 0;
}

// This structure represents a push notification.

function _Push_Notification(team, text)
{
	this.team = team;
	this.text = text;
	this.life = 0;

	this.getSize = function()
	{
		if (this.life < 10)
		{
			return (Math.sin(this.life * 9 * (Math.PI / 180)) + 1) / 2;
		}
		else if (this.life > 210)
		{
			return 0;
		}
		else if (this.life > 200)
		{
			return (Math.sin((210 - this.life) * 9 * (Math.PI / 180)) + 1) / 2;
		}
		else
		{
			return 1;
		}
	}
}

var _PN = [];

function Push_A_Notification(team, text)
{
	_PN.push(new _Push_Notification(team, text));
}

// Initialize variables used for rendering.

var GM_2TDM = 0;
var GM_4TDM = 1;
var GM_2DOM = 2;
var GM_4DOM = 3;
var GM_2FFA = 4;

var Game_Mode = GM_4TDM;
var Game_Dominators = [_BLUE, _PURPLE, _GREEN, _RED];

var Grid_Size = 20.0;
var Border_Size = 3300.0;
var Base_Size = 1100.0;
var Zone_Size = 720;
var Zone_Dist = 1000;

var Zoom_Fctr = 1.0;
var NewZoomFctr = Zoom_Fctr;

var CamX = 0.0;
var CamY = 0.0;

var MouseX = 0.0;
var MouseY = 0.0;

var Iteration = 0;

// Menu!

var MenuFade = 1;

// Handler for mouse wheel. Negative delta is away from user, positive is close to user.

function OnMouseWheel(e)
{
	e.preventDefault();

	if (e.deltaY < 0)
	{
		NewZoomFctr = Zoom_Fctr * 1.05;
	}
	else if (e.deltaY > 0)
	{
		NewZoomFctr = Zoom_Fctr / 1.05;
	}
}

// Handler for mouse movement. Don't do anything but update the mouse coordinates, relative to the screen.

function OnMouseMove(e)
{
	MouseX = e.clientX;
	MouseY = e.clientY;
}

// Handler for key presses. Store states in array, but don't move anything.

var KEYS = [false, false, false, false];

var KL = 0;
var KR = 1;
var KU = 2;
var KD = 3;

function OnKeyDown(e)
{
		 if (e.keyCode == 37 || e.keyCode == 65) { KEYS[KL] = true; }
	else if (e.keyCode == 38 || e.keyCode == 87) { KEYS[KU] = true; }
	else if (e.keyCode == 39 || e.keyCode == 68) { KEYS[KR] = true; }
	else if (e.keyCode == 40 || e.keyCode == 83) { KEYS[KD] = true; }
}

function OnKeyUp(e)
{
		 if (e.keyCode == 37 || e.keyCode == 65) { KEYS[KL] = false; }
	else if (e.keyCode == 38 || e.keyCode == 87) { KEYS[KU] = false; }
	else if (e.keyCode == 39 || e.keyCode == 68) { KEYS[KR] = false; }
	else if (e.keyCode == 40 || e.keyCode == 83) { KEYS[KD] = false; }
}

// Mouse event handlers. Just update the variables.

var ML = false;
var MR = false;

function OnMouseDown(e)
{
		 if (e.button == 0) { ML = true; }
	else if (e.button == 2) { MR = true; }
}

function OnMouseUp(e)
{
	 	 if (e.button == 0) { ML = false; }
	else if (e.button == 2) { MR = false; }
}

// Bind event handlers.

canvas.addEventListener("mousewheel", OnMouseWheel, false);
canvas.addEventListener("mousemove", OnMouseMove, false);
canvas.addEventListener("mousedown", OnMouseDown, false);
canvas.addEventListener("mouseup", OnMouseUp, false);

document.addEventListener("keydown", OnKeyDown, false);
document.addEventListener("keyup", OnKeyUp, false);

// This is the game's main render function.

// Note to developers:
//
// When plotting a coordinate from game space to screen space, you should use the following
// formula, assuming x and y are the game space coordinates, and sx and sy are screen
// coordinates. The formula is
//
// sx = (Width / 2) + (x - CamX) * Zoom_Fctr
// sy = (Height / 2) + (y - CamY) * Zoom_Fctr

function Point(x, y)
{
	this.x = x;
	this.y = y;
}

// This function executes the above formula.

function ptos(x, y)
{
	return new Point((window.innerWidth / 2) + x * Zoom_Fctr - CamX, (window.innerHeight / 2) + y * Zoom_Fctr - CamY);
}

function ptons(x, y)
{
	return new Point((window.innerWidth / 2) + x * NewZoomFctr - CamX, (window.innerHeight / 2) + y * NewZoomFctr - CamY);
}

// Reverse.

function stogs(x, y)
{
	return new Point((x - (window.innerWidth / 2) + CamX) / Zoom_Fctr, (y - (window.innerHeight / 2) + CamY) / Zoom_Fctr);
}

// This helper function converts a number into English notation. 1,000 = k, 1,000,000 = m, 1,000,000,000 = b (rare)

function ntoe(n)
{
	if (n > 999999999.999999999)
	{
		return (n / 1000000000.0).toFixed(1) + " b";
	}
	else if (n > 999999.999999999)
	{
		return (n / 1000000.0).toFixed(1) + " m";
	}
	else if (n > 999.999999999)
	{
		return (n / 1000.0).toFixed(1) + " k";
	}
	else
	{
		return n;
	}
}

// Comma formats a number.

function ntoc(n)
{
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// The main colors used in the game are defined here as Color objects

function Color(r, g, b)
{
	this.r = r;
	this.g = g;
	this.b = b;
}

function Borderize(c)
{
	return new Color(c.r / 1.3, c.g / 1.3, c.b / 1.3);
}

var _C = 
[
	new Color(0, 178, 255),
	new Color(241, 78, 84),
	new Color(0, 225, 110),
	new Color(191, 127, 245),
	new Color(255, 232, 105),
	new Color(192, 192, 192),
	new Color(237, 118, 222),
	new Color(252, 118, 119),
	new Color(0, 0, 0)
];

var _L = // For the leaderboard
[
	new Color(61, 182, 219),
	new Color(230, 116, 120),
	new Color(61, 219, 138),
	new Color(195, 150, 233)
];

var _O =
[
	Borderize(_C[0]),
	Borderize(_C[1]),
	Borderize(_C[2]),
	Borderize(_C[3]),
	Borderize(_C[4]),
	Borderize(_C[5]),
	Borderize(_C[6]),
	Borderize(_C[7]),
	Borderize(_C[8])
]

var _TF = new Color(153, 153, 153);
var _TB = Borderize(_TF);

var _FF = new Color(255, 255, 255);
var _FC = new Color(255, 255, 144);
var _FB = new Color(85, 85, 85);

var _UI = new Color(61, 61, 61);

// Dominator base

var _DBF = new Color(85, 85, 85);
var _DBB = new Color(63, 63, 63);

// Colors for shapes (don't use S_... variables, use SC_... variables)

var SC_SQUARE = 0;
var SC_TRIANGLE = 1;
var SC_PENTAGON = 2;
var SC_GREEN = 3;

var _SF =
[
	new Color(255, 232, 105),
	new Color(252, 118, 119),
	new Color(118, 141, 252),
	new Color(139, 254, 106)
];

var _SB =
[
	new Color(191, 174, 78),
	new Color(189, 88, 89),
	new Color(88, 105, 189),
	new Color(101, 189, 80)
];

// This function maps a S_... to a SC_....

function stosc(s)
{
	if (s < S_ALPHA) { return s; }
	if (s == S_ALPHA) { return SC_PENTAGON; }
	if (s > S_ALPHA) { return SC_GREEN; }

	return SC_SQUARE;
}

// This function chooses a random shape, equivalent to spawn probability.

function rshape()
{
	if (Math.random() * 100 < 50)
	{
		return S_SQUARE;
	}
	else if (Math.random() * 100 < 75)
	{
		return S_TRIANGLE;
	}
	else if (Math.random() * 100 < 70)
	{
		return S_PENTAGON;
	}
	else if (Math.random() * 100 < 10)
	{
		return S_ALPHA;
	}
	else if (Math.random() * 100 < 10)
	{
		return Math.floor(Math.random() * 4) + S_GREEN_SQUARE;
	}
	else
	{
		return S_SQUARE;
	}
}

// This function returns the radius of a shape.

var SRAD = [20, 20, 27, 75, 20, 20, 27];

// This function returns the amount of vertices in a shape.

var SVERT = [4, 3, 5, 5, 4, 3, 5];

// These are arrays of drawable entities. They are cleared and populated 10 times every second,
// giving 100 ms of delay between updates. However, extrapolation is used to give a smooth transition
// for the game's 60 FPS refresh rate.

var A_PLAYER = [];

for (var k = 0; k < 10; k++)
{
	A_PLAYER.push(new Player
	(
		Math.random() * Base_Size - Border_Size, 
		Math.random() * Base_Size - Border_Size, 
		0,
		0,
		1, 
		_BLUE, 
		Math.random() * 360, 
		100.0, 
		Math.floor(Math.random() * (51 + 1)), 
		Math.random() * 1000000, 
		Math.floor(Math.random() * 10),
		false,
		0
	));
}

for (var k = 0; k < 10; k++)
{
	A_PLAYER.push(new Player
	(
		Math.random() * Base_Size + Border_Size - Base_Size, 
		Math.random() * Base_Size - Border_Size, 
		0,
		0,
		1, 
		_RED, 
		Math.random() * 360, 
		100.0, 
		Math.floor(Math.random() * (51 + 1)), 
		Math.random() * 1000000, 
		Math.floor(Math.random() * 10),
		false,
		0
	));
}

for (var k = 0; k < 10; k++)
{
	A_PLAYER.push(new Player
	(
		Math.random() * Base_Size - Border_Size, 
		Math.random() * Base_Size + Border_Size - Base_Size, 
		0,
		0,
		1, 
		_BLUE, 
		Math.random() * 360, 
		100.0, 
		Math.floor(Math.random() * (51 + 1)), 
		Math.random() * 1000000, 
		Math.floor(Math.random() * 10),
		false,
		0
	));
}

for (var k = 0; k < 10; k++)
{
	A_PLAYER.push(new Player
	(
		Math.random() * Base_Size + Border_Size - Base_Size, 
		Math.random() * Base_Size + Border_Size - Base_Size, 
		0,
		0,
		1, 
		_RED, 
		Math.random() * 360, 
		100.0, 
		Math.floor(Math.random() * (51 + 1)), 
		Math.random() * 1000000, 
		Math.floor(Math.random() * 10),
		false,
		0
	));
}

A_PLAYER.push(new Player(-3000, -3000, 0, 0, 1, _BLUE, 90, 100.0, C_HUNTER, 1000000, 0, false, 0));

// Generate fake leaderboard

var iohtlsp = []; // Index of highest to lowest scoring players :)

for (var k = 0; k < 10; k++)
{
	var highest = 0;
	var index = 0;

	for (var n = 0; n < A_PLAYER.length; n++)
	{
		if (iohtlsp.indexOf(n) == -1)
		{
			if (A_PLAYER[n].score > highest)
			{
				highest = A_PLAYER[n].score;
				index = n;
			}
		}
	}

	iohtlsp.push(index);

	_LB.push(new Leaderboard_Entry(_NT[A_PLAYER[index].tag], A_PLAYER[index].team, A_PLAYER[index].tank, A_PLAYER[index].score, (A_PLAYER[index].score / A_PLAYER[iohtlsp[0]].score) * 100));
}

// Same as above, but for shapes.

var A_SHAPE = [];

for (var k = 0; k < 500; k++)
{
	A_SHAPE.push(new Shape
	(
		Math.random() * Border_Size * 2 - Border_Size,
		Math.random() * Border_Size * 2 - Border_Size,
		Math.random() * 360,
		100.0,
		rshape()
	));
}

// Same as above, but for bullets.

var A_BULLET = [];
var A_DEAD_BULLET = [];

// This function renders the body of a player at the specified level to the given coordinates.
// Note that centering is automatic for .arc(...).

function Draw_Body(gx, gy, lvl, team, spawn, injury, tank, rot)
{
	var sp = ptos(gx, gy);

	if (tank == C_NECROMANCER || tank == C_FACTORY || tank == C_BOSS_SUMMONER)
	{
		context.save();
		context.translate(sp.x, sp.y);
		context.rotate(rot * Math.PI / 180.0);
		context.translate(0 - sp.x, 0 - sp.y);
		context.fillStyle = Make_Color(_C[team].r, _C[team].g, _C[team].b);
		context.strokeStyle = Make_Color(_O[team].r, _O[team].g, _O[team].b);
		context.lineWidth = 3.0 * Zoom_Fctr;
		context.lineJoin = "round";
		context.fillRect(sp.x - (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr, sp.y - (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr, (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr * 2, (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr * 2)
		context.strokeRect(sp.x - (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr, sp.y - (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr, (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr * 2, (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr * 2)
		context.restore();
	}
	else if (tank == C_BOSS_DEFENDER || tank == C_BASE_DEFENDER || tank == C_CRASHER || tank == C_BOSS_GUARDIAN)
	{
		// Triangle body!

		var sr_ = (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr * 2;
		var sa_ = 2 * Math.PI / 3;

		context.save();
		context.lineJoin = "round";
		context.lineWidth = 3.0 * Zoom_Fctr;
		context.fillStyle = Make_Color(_C[team].r, _C[team].g, _C[team].b);
		context.strokeStyle = Make_Color(_O[team].r, _O[team].g, _O[team].b);
		context.translate(sp.x, sp.y);
		context.rotate((rot + 90) * Math.PI / 180);
		context.beginPath();
		context.moveTo(sr_ * Math.cos(sa_), sr_ * Math.sin(sa_));

		for (var i = 1; i <= 3; i++) {
			context.lineTo(sr_ * Math.cos(i * sa_), sr_ * Math.sin(i * sa_));
		}

		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	}
	else
	{
		context.beginPath();
		context.arc(sp.x, sp.y, (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr, 0, 2 * Math.PI, false);
		context.closePath();
		context.fillStyle = Make_Color(_C[team].r, _C[team].g, _C[team].b);
		context.fill();

		if (spawn == true)
		{
			context.fillStyle = Make_Color_Ex(255, 255, 255, Math.abs(Math.sin(Iteration / 5)) / 3.0);
			context.fill();
		}

		context.strokeStyle = Make_Color(_O[team].r, _O[team].g, _O[team].b);
		context.lineWidth = 3.0 * Zoom_Fctr;
		context.stroke();

		if (injury > 0)
		{
			context.fillStyle = Make_Color_Ex(255, 0, 0, injury + 0.1);
			context.strokeStyle = Make_Color_Ex(255, 0, 0, injury + 0.1);
			context.beginPath();
			context.arc(sp.x, sp.y, (20.0 + (lvl / 45) * 15.0 + 1.5) * Zoom_Fctr, 0, 2 * Math.PI, false);
			context.closePath();
			context.fill();
		}
	}
}

// This function draws a simple turret which comprises of a rectangle. The rectangle originates
// at the given coordinates.

function Draw_Turret_I(gx, gy, fLen, fWid, fRecoil, aRotation, fInjury)
{
	fRecoil *= Zoom_Fctr;

	var sp = ptos(gx, gy);

	context.save();

	context.translate(sp.x, sp.y);
	context.rotate(aRotation * Math.PI / 180.0);
	context.translate(0 - sp.x, 0 - sp.y);

	context.beginPath();
	context.fillStyle = Make_Color(_TF.r, _TF.g, _TF.b);
	context.fillRect(sp.x - fWid / 2, sp.y, fWid, fLen - fRecoil, fWid * 2);
	if (fInjury > 0)
	{
		context.fillStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.fillRect(sp.x - fWid / 2, sp.y, fWid, fLen - fRecoil, fWid * 2);
	}
	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.lineJoin = "round";
	context.rect(sp.x - fWid / 2, sp.y, fWid, fLen - fRecoil, fWid * 2);
	context.stroke();
	if (fInjury > 0)
	{
		context.strokeStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.stroke();
	}
	context.closePath();

	context.restore();
}

// This function is an extended version of Draw_Turret_I that includes offsetting the turret from the
// origin, so that multiple turrets facing the same direction can exist on one entity.

function Draw_Turret_II(gx, gy, fOff, fLen, fWid, fRecoil, aRotation, fInjury)
{
	fRecoil *= Zoom_Fctr;

	var sp = ptos(gx, gy);

	context.save();

	context.translate(sp.x, sp.y);
	context.rotate(aRotation * Math.PI / 180.0);
	context.translate(0 - sp.x, 0 - sp.y);

	context.beginPath();
	context.fillStyle = Make_Color(_TF.r, _TF.g, _TF.b);
	context.fillRect(sp.x - fWid / 2 - fOff, sp.y, fWid, fLen - fRecoil, fWid * 2);
	if (fInjury > 0)
	{
		context.fillStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.fillRect(sp.x - fWid / 2 - fOff, sp.y, fWid, fLen - fRecoil, fWid * 2);
	}
	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.lineJoin = "round";
	context.rect(sp.x - fWid / 2 - fOff, sp.y, fWid, fLen - fRecoil, fWid * 2);
	context.stroke();
	if (fInjury > 0)
	{
		context.strokeStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.stroke();
	}
	context.closePath();

	context.restore();
}

// This function allows for a turret that has a different internal width than external, thus
// making it look wider.

function Draw_Turret_III(gx, gy, fLen, fWidIn, fWidOut, fRecoil, aRotation, fInjury)
{
	fRecoil *= Zoom_Fctr;

	var sp = ptos(gx, gy);

	context.save();

	context.translate(sp.x, sp.y);
	context.rotate(aRotation * Math.PI / 180.0);
	context.translate(0 - sp.x, 0 - sp.y);

	context.fillStyle = Make_Color(_TF.r, _TF.g, _TF.b);
	context.beginPath();
	context.moveTo(sp.x - fWidIn / 2, sp.y);
	context.lineTo(sp.x + fWidIn / 2, sp.y);
	context.lineTo(sp.x + fWidOut / 2, sp.y + fLen - fRecoil);
	context.lineTo(sp.x - fWidOut / 2, sp.y + fLen - fRecoil);
	context.lineTo(sp.x - fWidIn / 2, sp.y);
	context.closePath();
	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.lineJoin = "round";
	context.fill();
	context.stroke();
	if (fInjury > 0)
	{
		context.fillStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.strokeStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.fill();
		context.stroke();
	}

	context.restore();
}

// This function draws a trap turret. It's like a basic turret with a wide turret at then end.

function Draw_Turret_IV(gx, gy, fLen, fWidIn, fWidFunnel, fRecoil, aRotation, fInjury)
{
	fRecoil *= Zoom_Fctr;

	var sp = ptos(gx, gy);

	context.save();

	context.translate(sp.x, sp.y);
	context.rotate(aRotation * Math.PI / 180.0);
	context.translate(0 - sp.x, 0 - sp.y);

	context.fillStyle = Make_Color(_TF.r, _TF.g, _TF.b);
	context.beginPath();
	context.moveTo(sp.x - fWidIn / 2, sp.y);
	context.lineTo(sp.x + fWidIn / 2, sp.y);
	context.lineTo(sp.x + fWidIn / 2, sp.y + fLen - fRecoil);
	context.lineTo(sp.x - fWidIn / 2, sp.y + fLen - fRecoil);
	context.lineTo(sp.x - fWidIn / 2, sp.y);
	context.closePath();
	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.lineJoin = "round";
	context.fill();
	context.stroke();
	if (fInjury > 0)
	{
		context.fillStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.strokeStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.fill();
		context.stroke();
	}
	context.fillStyle = Make_Color(_TF.r, _TF.g, _TF.b);
	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.beginPath();
	context.moveTo(sp.x + fWidIn / 2, sp.y + fLen - fRecoil);
	context.lineTo(sp.x + fWidIn / 2 + fWidFunnel, sp.y + fLen + fWidFunnel - fRecoil);
	context.lineTo(sp.x - fWidIn / 2 - fWidFunnel, sp.y + fLen + fWidFunnel - fRecoil);
	context.lineTo(sp.x - fWidIn / 2, sp.y + fLen - fRecoil);
	context.closePath();
	context.fill();
	context.stroke();
	if (fInjury > 0)
	{
		context.fillStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.strokeStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.fill();
		context.stroke();
	}

	context.restore();
}

// This draws an auto turret. There are two rotation constants, one for rotation about the body, and
// one for rotation about the fixed pivot point. Hard work!

function Draw_Turret_V(gx, gy, fDistCen, fLen, fWid, fNode, fRecoil, aRotation, aPivotRot, fInjury)
{
	fRecoil *= Zoom_Fctr;

	var sp = ptos(gx, gy);

	context.save();

	context.translate(sp.x, sp.y);
	context.rotate(aRotation * Math.PI / 180.0);
	context.translate(0, fDistCen);
	context.rotate(aPivotRot * Math.PI / 180.0);
	context.translate(0, -fDistCen);
	context.translate(0 - sp.x, 0 - sp.y);

	context.beginPath();
	context.fillStyle = Make_Color(_TF.r, _TF.g, _TF.b);
	context.fillRect(sp.x - fWid / 2, sp.y + fDistCen, fWid, fLen - fRecoil, fWid * 2);
	if (fInjury > 0)
	{
		context.fillStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.fillRect(sp.x - fWid / 2, sp.y + fDistCen, fWid, fLen - fRecoil, fWid * 2);
	}
	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.lineJoin = "round";
	context.rect(sp.x - fWid / 2, sp.y + fDistCen, fWid, fLen - fRecoil, fWid * 2);
	context.stroke();
	if (fInjury > 0)
	{
		context.strokeStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.stroke();
	}
	context.closePath();

	context.beginPath();
	context.arc(sp.x, sp.y + fDistCen, fNode, 0, 2 * Math.PI, false);
	context.closePath();
	context.fill();
	context.stroke();

	context.restore();
}

// This function combines Draw_Turret_III and Draw_Turret_II so you can offset a wide turret.

function Draw_Turret_VI(gx, gy, fOff, fLen, fWidIn, fWidOut, fRecoil, aRotation, fInjury)
{
	fRecoil *= Zoom_Fctr;

	var sp = ptos(gx, gy);

	context.save();

	context.translate(sp.x, sp.y);
	context.rotate(aRotation * Math.PI / 180.0);
	context.translate(0 - sp.x, 0 - sp.y);

	context.fillStyle = Make_Color(_TF.r, _TF.g, _TF.b);
	context.beginPath();
	context.moveTo(sp.x - fWidIn / 2 - fOff, sp.y);
	context.lineTo(sp.x + fWidIn / 2 - fOff, sp.y);
	context.lineTo(sp.x + fWidOut / 2 - fOff, sp.y + fLen - fRecoil);
	context.lineTo(sp.x - fWidOut / 2 - fOff, sp.y + fLen - fRecoil);
	context.lineTo(sp.x - fWidIn / 2 - fOff, sp.y);
	context.closePath();
	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.lineJoin = "round";
	context.fill();
	context.stroke();
	if (fInjury > 0)
	{
		context.fillStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.strokeStyle = Make_Color_Ex(255, 0, 0, fInjury);
		context.fill();
		context.stroke();
	}

	context.restore();
}

// This function draws a hexagon at the specified game point.

function Draw_Hexagon(gx, gy, size, rot, border)
{
	var sc = ptos(gx, gy);
	var sa_ = 2 * Math.PI / 6;

	context.save();
	context.lineJoin = "round";
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.strokeStyle = Make_Color(border.r, border.g, border.b);
	context.fillStyle = Make_Color(_DBF.r, _DBF.g, _DBF.b);
	context.translate(sc.x, sc.y);
	context.beginPath();
	context.moveTo(size * Math.cos(0 + rot), size * Math.sin(0 + rot));

	for (var i = 1; i <= 6; i++) {
		context.lineTo(size * Math.cos(i * sa_ + rot), size * Math.sin(i * sa_ + rot));
	}

	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}

// This function draws a concave star icositetragon at the specified game point.

function Draw_Icositetragon(gx, gy, size, size2, rot, border)
{
	var sc = ptos(gx, gy);
	var sa_ = 2 * Math.PI / 24;

	context.save();
	context.lineJoin = "round";
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.strokeStyle = Make_Color(border.r, border.g, border.b);
	context.fillStyle = Make_Color(_DBF.r, _DBF.g, _DBF.b);
	context.translate(sc.x, sc.y);
	context.beginPath();
	context.moveTo(size * Math.cos(0 + rot), size * Math.sin(0 + rot));

	for (var i = 1; i <= 24; i++) {
		if (i % 2 == 0)
		{
			context.lineTo(size2 * Math.cos(i * sa_ + rot), size2 * Math.sin(i * sa_ + rot));
		}
		else
		{
			context.lineTo(size * Math.cos(i * sa_ + rot), size * Math.sin(i * sa_ + rot));
		}
	}

	context.lineTo(size * Math.cos(25 * sa_ + rot), size * Math.sin(25 * sa_ + rot));
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}

// This function draws text centered around the given point in game space. You can specify whether
// you want it to be 'cheat' text, which is yellow, or clean text, which is white.

function Draw_Text(text, x, y, size, cheat)
{
	var sp = ptos(x, y);

	if (cheat == true)
	{
		context.font = "700 " + (size * Zoom_Fctr) + "px Ubuntu";
		context.textAlign = "center";
		context.strokeStyle = Make_Color(_FB.r, _FB.g, _FB.b);
		context.lineWidth = 4 * Zoom_Fctr;
		context.strokeText(text, sp.x, sp.y);
		context.fillStyle = Make_Color(_FC.r, _FC.g, _FC.b);
		context.fillText(text, sp.x, sp.y);	
	}
	else
	{
		context.font = "700 " + (size * Zoom_Fctr) + "px Ubuntu";
		context.textAlign = "center";
		context.strokeStyle = Make_Color(_FB.r, _FB.g, _FB.b);
		context.lineWidth = 4 * Zoom_Fctr;
		context.strokeText(text, sp.x, sp.y);
		context.fillStyle = Make_Color(_FF.r, _FF.g, _FF.b);
		context.fillText(text, sp.x, sp.y);	
	}		
}

// This reduces Draw_Text(...) to use screen space as opposed to game space. It does not utilize the
// Zoom_Fctr.

function Draw_Text_S(text, x, y, size, align, extra)
{
	context.font = "700 " + size + "px Ubuntu";
	context.textAlign = align;
	context.strokeStyle = Make_Color(_FB.r, _FB.g, _FB.b);
	context.lineWidth = extra;
	context.strokeText(text, x, y);
	context.fillStyle = Make_Color(_FF.r, _FF.g, _FF.b);
	context.fillText(text, x, y);	
}

// This function draws a push notification at the given screen coordinate (centered). The size can also
// be specified as a float between 0 and 1. 1 is full size, 0 is nothing.

function Draw_Push_Notificiation(x, y, team, text, size)
{
	context.font = "700 " + (14 * size) + "px Ubuntu";
	context.textAlign = "center";

	var w = context.measureText(text).width + 20;
	var h = 20 * size;

	context.fillStyle = Make_Color_Ex(_C[team].r, _C[team].g, _C[team].b, 0.28);
	context.fillRect(x - w / 2, y - h / 2, w, h);
	context.fillStyle = "white";
	context.fillText(text, x, y + 5 * size);	
}

// This function combines the Draw_Body(...) and Draw_Turret_...(...) functions to render a player
// at a given game coordinate. It uses the C_... variables for the _class parameter. Pass a value
// between 0 and 100 for recoil. It will be changed to suit the selected class. Injury should be
// between 0 and 1. It dictates how red the player is.

/*
var C_OVERSEER = 5; /donezo
var C_SMASHER = 6;	/finis
var C_DESTROYER = 7;	/finishe
var C_TRAPPER = 8;	/donezo
var C_ASSASSIN = 9;	/kalas
var C_GUNNER = 10;	/dunno
var C_HUNTER = 11;	/punto
var C_TRIPLE_SHOT = 12;	/mori
var C_TRI_ANGLE = 13;	/booleh
var C_TWIN_FLANK = 14;	/benne
var C_AUTO_3 = 15;		/donezo
var C_QUAD_TANK = 16;	/bokeh

var C_NECROMANCER = 17;/bokeh
var C_OVERLORD = 18;/bokeh
var C_FACTORY = 19;/bokeh
var C_BATTLESHIP = 20; /nuhkaay	
var C_LANDMINE = 21;/yuh
var C_SPIKE = 22;/yrn
var C_ROCKETEER = 23;/yakk
var C_STREAMLINER = 24;	//donezo
var C_STALKER = 25;	//doneeettt
var C_MANAGER = 26;/muhahah
var C_PREDATOR = 27;/okayy
var C_RANGER = 28;/ahhh seen
var C_ANNIHILATOR = 29;/nicedat
var C_SKIMMER = 30;	/OKAY
var C_PENTA_SHOT = 31;/done
var C_BOOSTER = 32;/okay
var C_TRIPLET = 33;/kk
var C_SPREAD_SHOT = 34;			// I don't like this tank
var C_SPRAYER = 35;/okay
var C_OVERTRAPPER = 36;/donezoooo
var C_HYBRID = 37;/ayyy
var C_AUTO_5 = 38;/WHOAHH!!
var C_OCTO_TANK = 39;/NICEE
var C_AUTO_SMASHER = 40;/done
var C_AUTO_GUNNER = 41;	// OHH
var C_FIGHTER = 42;	/ doneit
var C_GUNNER_TRAPPER = 43;/okay dokie
var C_MEGA_TRAPPER = 44;/ yahh
var C_TRIPLE_TWIN = 45;/done
var C_TRI_TRAPPER = 46;/done
var C_AUTO_TRAPPER = 47;/done

var C_DOMINATOR_GUNNER = 48;/done
var C_DOMINATOR_DESTROYER = 49;/done
var C_DOMINATOR_TRAPPER = 50;/done
var C_ARENA_CLOSER = 51;/done

var C_BOSS_GUARDIAN = 52;/done
var C_BOSS_SUMMONER = 53;/done
var C_BOSS_DEFENDER = 54;/done
var C_BOSS_FALLEN_BOOSTER = 55;/done
var C_BOSS_FALLEN_OVERLORD = 56;/done

var C_BASE_DEFENDER = 57;/done
var C_CRASHER = 58;/done

*/
_NT[A_PLAYER[A_PLAYER.length - 1].tag] = "";
A_PLAYER[A_PLAYER.length - 1].score = "";
A_PLAYER[A_PLAYER.length - 1].tank = C_ROCKETEER;

function Draw_Player(gx, gy, lvl, team, rot, rec, _class, name, score, cheat, spawn, injury)
{
	var radius = (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr;

	// For smasher and dominator

	if (_class == C_DOMINATOR_TRAPPER || _class == C_DOMINATOR_DESTROYER || _class == C_DOMINATOR_GUNNER)
	{
		Draw_Hexagon(gx, gy, radius * 1.325, 0, _DBB);
	}
	else if (_class == C_SMASHER || _class == C_AUTO_SMASHER)
	{
		Draw_Hexagon(gx, gy, radius * 1.15, (Iteration / 30) % 360, _DBF);
	}
	else if (_class == C_LANDMINE)
	{
		Draw_Hexagon(gx, gy, radius * 1.15, (Iteration / 30) % 360, _DBF);
		Draw_Hexagon(gx, gy, radius * 1.15, ((Iteration / 20) + (90 * Math.PI / 180)) % 360, _DBF);
	}
	else if (_class == C_SPIKE)
	{
		Draw_Icositetragon(gx, gy, radius * 1.05, radius * 1.4, (Iteration / 30) % 360, _DBB);
	}

	if (_class == C_BASIC)
	{
		// Long turret on front

		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_TWIN)
	{
		// Two long turrets on front, parallel

		Draw_Turret_II(gx, gy,     radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_SNIPER)
	{
		// Longer turret on front

		Draw_Turret_I(gx, gy, radius * 2.2, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_MACHINE_GUN)
	{
		// Wide turret on front

		Draw_Turret_III(gx, gy, radius * 1.8, radius * 0.8, radius * 1.5, rec / 40.0, rot, injury);
	}
	else if (_class == C_FLANK_GUARD)
	{
		// Long turret on front, short on back

		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 1.5, radius * 0.8, rec / 80.0 / 40.0, rot + 180, injury);
	}
	else if (_class == C_OVERSEER)
	{
		// Two wide, short cannons on either side

		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 90, injury);
		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 270, injury);
	}
	else if (_class == C_DESTROYER)
	{
		// Long wide cannon

		Draw_Turret_I(gx, gy, radius * 1.9, radius * 1.5, rec / 40.0, rot, injury);
	}
	else if (_class == C_TRAPPER)
	{
		// Trapper turret :D

		Draw_Turret_IV(gx, gy, radius * 1.35, radius * 0.95, radius * 0.35, rec / 40.0, rot, injury);
	}
	else if (_class == C_ASSASSIN)
	{
		// Very long cannon

		Draw_Turret_I(gx, gy, radius * 2.5, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_GUNNER)
	{
		// Just test it.

		Draw_Turret_II(gx, gy,     radius * 0.7, radius * 1.4, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.7, radius * 1.4, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy,     radius * 0.325, radius * 1.8, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.325, radius * 1.8, radius * 0.45, rec / 40.0, rot, injury);
	}
	else if (_class == C_HUNTER)
	{
		// Two overlapping long cannons

		Draw_Turret_I(gx, gy, radius * 2.25, radius * 0.7, (rec + 20) / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 1.95, radius * 1.2, rec / 20.0, rot, injury);
	}
	else if (_class == C_TRIPLE_SHOT)
	{
		// Three normal cannons over 90 degrees

		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 45, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot - 45, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_TRI_ANGLE)
	{
		// Two short on back, normal on front

		Draw_Turret_I(gx, gy, radius * 1.5, radius * 0.8, rec / 40.0, rot + 180 + 30, injury);
		Draw_Turret_I(gx, gy, radius * 1.5, radius * 0.8, rec / 40.0, rot + 180 - 30, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_TWIN_FLANK)
	{
		// C_TWIN at 0 and 180 degrees

		Draw_Turret_II(gx, gy,     radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy,     radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot + 180, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot + 180, injury);
	}
	else if (_class == C_AUTO_3)
	{
		// 3 auto turrets. Damn!

		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 3 * 1), Iteration / 0.3, injury);
		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 3 * 2), Iteration / 0.1, injury);
		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 3 * 3), Iteration / 0.2, injury);
	}
	else if (_class == C_QUAD_TANK)
	{
		// Normal spaced even over 360

		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot      , injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 90 , injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 180, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 270, injury);
	}
	else if (_class == C_NECROMANCER)
	{
		// Wide turrets on square body

		Draw_Turret_III(gx, gy, radius * 1.5, radius * 0.8, radius * 1.5, rec / 40.0, rot + 90 , injury);
		Draw_Turret_III(gx, gy, radius * 1.5, radius * 0.8, radius * 1.5, rec / 40.0, rot + 270, injury);
	}
	else if (_class == C_OVERLORD || _class == C_BOSS_FALLEN_OVERLORD)
	{
		// 2 C_OVERSEER

		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 0, injury);
		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 90, injury);
		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 180, injury);
		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 270, injury);
	}
	else if (_class == C_FACTORY)
	{
		// Half of C_NECROMANCER

		Draw_Turret_III(gx, gy, radius * 1.5, radius * 0.8, radius * 1.5, rec / 40.0, rot, injury);
	}
	else if (_class == C_BATTLESHIP)
	{
		// C_TWIN_FLANK but narrower

		Draw_Turret_VI(gx, gy,     radius * 0.4, radius * 1.5, radius * 1, radius * 0.55, rec / 40.0, rot, injury);
		Draw_Turret_VI(gx, gy, 0 - radius * 0.4, radius * 1.5, radius * 1, radius * 0.55, rec / 40.0, rot, injury);
		Draw_Turret_VI(gx, gy,     radius * 0.4, radius * 1.5, radius * 1, radius * 0.55, rec / 40.0, rot + 180, injury);
		Draw_Turret_VI(gx, gy, 0 - radius * 0.4, radius * 1.5, radius * 1, radius * 0.55, rec / 40.0, rot + 180, injury);
	}
	else if (_class == C_ROCKETEER)
	{
		// Like a short C_STALKER with a tiny inverse

		Draw_Turret_III(gx, gy, radius * 1.9, radius * 0, radius * 1.3, rec / 40.0, rot, injury);
		Draw_Turret_III(gx, gy, radius * 1.6, radius * 1.8, radius * 1.1, rec / 40.0, rot, injury);
	}
	else if (_class == C_STREAMLINER)
	{
		// 5 turrets

		Draw_Turret_I(gx, gy, radius * 2.3, radius * 0.9, rec / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 2.1, radius * 0.9, rec / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 1.9, radius * 0.9, rec / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 1.7, radius * 0.9, rec / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 1.5, radius * 0.9, rec / 40.0, rot, injury);
	}
	else if (_class == C_STALKER)
	{
		// Inverse long machine gun

		Draw_Turret_III(gx, gy, radius * 2.5, radius * 1.5, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_MANAGER)
	{
		// Half of C_OVERSEER

		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot, injury);
	}
	else if (_class == C_PREDATOR)
	{
		// Three overlapping long cannons

		Draw_Turret_I(gx, gy, radius * 2.70, radius * 0.7, (rec + 60) / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 2.40, radius * 0.9, (rec + 20) / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 2.10, radius * 1.2, rec / 20.0, rot, injury);
	}
	else if (_class == C_RANGER)
	{
		// Inverse short wide with very very long one (yes, very helpful description)

		Draw_Turret_I(  gx, gy, radius * 2.6, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_III(gx, gy, radius * 1.5, radius * 1.5, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_ANNIHILATOR)
	{
		// Gigantic cannon.

		Draw_Turret_I(gx, gy, radius * 1.9, radius * 2, rec / 40.0, rot, injury);
	}
	else if (_class == C_SKIMMER)
	{
		// I don't know.

		Draw_Turret_III(gx, gy, radius * 1.9, radius * 0, radius * 1.3, rec / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 1.6, radius * 1.6, rec / 40.0, rot, injury);
	}
	else if (_class == C_PENTA_SHOT)
	{
		// 5 cannons overlapping but spread.

		Draw_Turret_I(gx, gy, radius * 1.4, radius * 0.8, rec / 40.0, rot + 45, injury);
		Draw_Turret_I(gx, gy, radius * 1.4, radius * 0.8, rec / 40.0, rot - 45, injury);
		Draw_Turret_I(gx, gy, radius * 1.7, radius * 0.8, rec / 40.0, rot + 25, injury);
		Draw_Turret_I(gx, gy, radius * 1.7, radius * 0.8, rec / 40.0, rot - 25, injury);
		Draw_Turret_I(gx, gy, radius * 2.0, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_BOOSTER || _class == C_BOSS_FALLEN_BOOSTER)
	{
		// C_TRI_ANGLE but with two short extra cannons.

		Draw_Turret_I(gx, gy, radius * 1.3, radius * 0.8, rec / 40.0, rot + 180 + 45, injury);
		Draw_Turret_I(gx, gy, radius * 1.3, radius * 0.8, rec / 40.0, rot + 180 - 45, injury);
		Draw_Turret_I(gx, gy, radius * 1.5, radius * 0.8, rec / 40.0, rot + 180 + 30, injury);
		Draw_Turret_I(gx, gy, radius * 1.5, radius * 0.8, rec / 40.0, rot + 180 - 30, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_TRIPLET)
	{
		// Like a C_TWIN with a C_BASIC.

		Draw_Turret_II(gx, gy,     radius * 0.5, radius * 1.7, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.5, radius * 1.7, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_I(gx, gy, radius * 2, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_SPRAYER)
	{
		// Like C_BASIC and C_MACHINE_GUN

		Draw_Turret_I(gx, gy, radius * 2.1, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_III(gx, gy, radius * 1.9, radius * 0.8, radius * 1.5, rec / 40.0, rot, injury);
	}
	else if (_class == C_OVERTRAPPER)
	{
		// C_TRAPPER and a weird C_OVERSEER

		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 180 + 65, injury);
		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 180 - 65, injury);
		Draw_Turret_IV(gx, gy, radius * 1.35, radius * 0.95, radius * 0.35, rec / 40.0, rot, injury);
	}
	else if (_class == C_HYBRID)
	{
		// C_MANAGER at back and C_DESTROYER

		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.6, radius * 1.6, rec / 40.0, rot + 180, injury);
		Draw_Turret_I(gx, gy, radius * 1.9, radius * 1.5, rec / 40.0, rot, injury);
	}
	else if (_class == C_AUTO_5)
	{
		// 5 auto turrets. Amazing.

		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 5 * 1), Iteration / 0.2, injury);
		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 5 * 2), Iteration / 0.2, injury);
		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 5 * 3), Iteration / 0.2, injury);
		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 5 * 4), Iteration / 0.2, injury);
		Draw_Turret_V(gx, gy, radius, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 5 * 5), Iteration / 0.2, injury);
	}
	else if (_class == C_OCTO_TANK)
	{
		// 8 normal ones spaced evenly.

		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot      , injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 45 , injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 90 , injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 135, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 180, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 225, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 270, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 315, injury);
	}
	else if (_class == C_AUTO_GUNNER)
	{
		// C_GUNNER with auto turret on top

		Draw_Turret_II(gx, gy,     radius * 0.7, radius * 1.4, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.7, radius * 1.4, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy,     radius * 0.325, radius * 1.8, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.325, radius * 1.8, radius * 0.45, rec / 40.0, rot, injury);
	}
	else if (_class == C_FIGHTER)
	{
		// 2 short on back, 2 medium on sides, 1 long at front

		Draw_Turret_I(gx, gy, radius * 1.7, radius * 0.8, rec / 40.0, rot + 180 + 30, injury);
		Draw_Turret_I(gx, gy, radius * 1.7, radius * 0.8, rec / 40.0, rot + 180 - 30, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot + 90, injury);
		Draw_Turret_I(gx, gy, radius * 1.8, radius * 0.8, rec / 40.0, rot - 90, injury);
		Draw_Turret_I(gx, gy, radius * 1.9, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_GUNNER_TRAPPER)
	{
		// The long parts of C_GUNNER with C_TRAPPER on the back

		Draw_Turret_II(gx, gy,     radius * 0.325, radius * 1.8, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.325, radius * 1.8, radius * 0.45, rec / 40.0, rot, injury);
		Draw_Turret_IV(gx, gy, radius * 1.35, radius * 0.95, radius * 0.35, rec / 40.0, rot + 180, injury);
	}
	else if (_class == C_MEGA_TRAPPER)
	{
		// Huge version of C_TRAPPER

		Draw_Turret_IV(gx, gy, radius * 1.4, radius * 1.1, radius * 0.5, rec / 40.0, rot, injury);
	}
	else if (_class == C_TRIPLE_TWIN)
	{
		// Three C_TWIN

		Draw_Turret_II(gx, gy,     radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot, injury);
		Draw_Turret_II(gx, gy,     radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot + 120, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot + 120, injury);
		Draw_Turret_II(gx, gy,     radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot + 240, injury);
		Draw_Turret_II(gx, gy, 0 - radius * 0.5, radius * 1.8, radius * 0.8, rec / 40.0, rot + 240, injury);
	}
	else if (_class == C_TRI_TRAPPER)
	{
		// Three C_TRAPPER

		Draw_Turret_IV(gx, gy, radius * 1.4, radius * 0.95, radius * 0.35, rec / 40.0, rot, injury);
		Draw_Turret_IV(gx, gy, radius * 1.4, radius * 0.95, radius * 0.35, rec / 40.0, rot + 120, injury);
		Draw_Turret_IV(gx, gy, radius * 1.4, radius * 0.95, radius * 0.35, rec / 40.0, rot + 240, injury);
	}
	else if (_class == C_AUTO_TRAPPER)
	{
		// C_TRAPPER with auto turret

		Draw_Turret_IV(gx, gy, radius * 1.4, radius * 0.95, radius * 0.35, rec / 40.0, rot, injury);
	}
	else if (_class == C_ARENA_CLOSER)
	{
		// Short C_BASIC

		Draw_Turret_I(gx, gy, radius * 1.6, radius * 0.8, rec / 40.0, rot, injury);
	}
	else if (_class == C_BOSS_DEFENDER)
	{
		// C_TRI_TRAPPER with C_AUTO_3

		Draw_Turret_IV(gx, gy, radius * 1.6, radius * 0.95, radius * 0.35, rec / 40.0, rot + 60, injury);
		Draw_Turret_IV(gx, gy, radius * 1.6, radius * 0.95, radius * 0.35, rec / 40.0, rot + 120 + 60, injury);
		Draw_Turret_IV(gx, gy, radius * 1.6, radius * 0.95, radius * 0.35, rec / 40.0, rot + 240 + 60, injury);
	}
	else if (_class == C_BOSS_SUMMONER)
	{
		// Like C_OVERLORD

		Draw_Turret_III(gx, gy, radius * 1.3, radius * 0.2, radius * 1.2, rec / 40.0, rot + 0, injury);
		Draw_Turret_III(gx, gy, radius * 1.3, radius * 0.2, radius * 1.2, rec / 40.0, rot + 90, injury);
		Draw_Turret_III(gx, gy, radius * 1.3, radius * 0.2, radius * 1.2, rec / 40.0, rot + 180, injury);
		Draw_Turret_III(gx, gy, radius * 1.3, radius * 0.2, radius * 1.2, rec / 40.0, rot + 270, injury);
	}
	else if (_class == C_BOSS_GUARDIAN)
	{
		// Like C_MANAGER at back

		Draw_Turret_III(gx, gy, radius * 1.4, radius * 0.4, radius * 1.4, rec / 40.0, rot + 180, injury);
	}
	else if (_class == C_DOMINATOR_DESTROYER)
	{
		// Like a chubby C_RANGER

		Draw_Turret_I(  gx, gy, radius * 1.7, radius * 0.9, rec / 40.0, rot, injury);
		Draw_Turret_III(gx, gy, radius * 1.3, radius * 1.6, radius * 0.9, rec / 40.0, rot, injury);
	}
	else if (_class == C_DOMINATOR_GUNNER)
	{
		// Hard to explain

		Draw_Turret_I(  gx, gy, radius * 1.6, radius * 0.75, rec / 40.0, rot, injury);
		Draw_Turret_I(  gx, gy, radius * 1.7, radius * 0.5, rec / 40.0, rot, injury);
		Draw_Turret_III(gx, gy, radius * 1.3, radius * 1.6, radius * 0.9, rec / 40.0, rot, injury);
	}
	else if (_class == C_DOMINATOR_TRAPPER)
	{
		// Like C_OCTO_TANK with C_TRAPPER

		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot, injury);
		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot + 45, injury);
		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot + 90, injury);
		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot + 135, injury);
		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot + 180, injury);
		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot + 225, injury);
		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot + 270, injury);
		Draw_Turret_IV(gx, gy, radius * 1.3, radius * 0.50, radius * 0.2, rec / 40.0, rot + 315, injury);
	}

	Draw_Body(gx, gy, lvl, team, spawn, injury, _class, rot);

	// Things that go on top of the tank

	if (_class == C_AUTO_GUNNER || _class == C_AUTO_TRAPPER || _class == C_AUTO_SMASHER)
	{
		Draw_Turret_V(gx, gy, 0, radius * 1, radius * 0.6, radius / 2.3, rec / 40.0, rot + (360 / 5 * 1), Iteration / 0.2, injury);
	}
	else if (_class == C_BOSS_DEFENDER)
	{
		Draw_Turret_V(gx, gy, radius, radius * 0.8, radius * 0.4, radius / 2.8, rec / 40.0, rot + (360 / 3 * 1), Iteration / 0.3, injury);
		Draw_Turret_V(gx, gy, radius, radius * 0.8, radius * 0.4, radius / 2.8, rec / 40.0, rot + (360 / 3 * 2), Iteration / 0.1, injury);
		Draw_Turret_V(gx, gy, radius, radius * 0.8, radius * 0.4, radius / 2.8, rec / 40.0, rot + (360 / 3 * 3), Iteration / 0.2, injury);
	}
}

// This function draws the name and score above a player in game space.

function Draw_Player_Text(gx, gy, lvl, name, score, cheat)
{
	var radius = (20.0 + (lvl / 45) * 10.0) * Zoom_Fctr;

	Draw_Text(name, gx, gy - (radius / Zoom_Fctr) * 1.72 - 2.7, 18 + (lvl / 45) * 4, cheat);
	Draw_Text(ntoe(score), gx, gy - (radius / Zoom_Fctr) * 1.2 - 2.7, 10 + (lvl / 45) * 4, cheat);
}

// This function draws a shape in game space coordinates.

function Draw_Shape(x, y, rot, shape)
{
	var sc = ptos(x, y);
	var sc_ = stosc(shape);
	var sr_ = SRAD[shape] * Zoom_Fctr;
	var sv_ = SVERT[shape];
	var sa_ = 2 * Math.PI / sv_;

	context.save();
	context.lineJoin = "round";
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.strokeStyle = Make_Color(_SB[sc_].r, _SB[sc_].g, _SB[sc_].b);
	context.fillStyle = Make_Color(_SF[sc_].r, _SF[sc_].g, _SF[sc_].b);
	context.translate(sc.x, sc.y);
	context.beginPath();
	context.moveTo(sr_ * Math.cos(0 + rot), sr_ * Math.sin(0 + rot));

	for (var i = 1; i <= sv_; i++) {
		context.lineTo(sr_ * Math.cos(i * sa_ + rot), sr_ * Math.sin(i * sa_ + rot));
	}

	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
}

// This function draws a bullet in game coordinates.

function Draw_Bullet(gx, gy, size, rot, team, bullet)
{
	rot = (rot + 90) * Math.PI / 180;

	var sp = ptos(gx, gy);

	context.save();
	context.fillStyle = Make_Color(_C[team].r, _C[team].g, _C[team].b);
	context.strokeStyle = Make_Color(_O[team].r, _O[team].g, _O[team].b);
	context.lineWidth = 3.0 * Zoom_Fctr;
	context.lineJoin = "round";

	if (bullet == B_NORMAL)
	{
		context.beginPath();
		context.arc(sp.x, sp.y, size * Zoom_Fctr, 0, 2 * Math.PI, true);		
		context.fill();	
		context.stroke();
		context.closePath();
	}
	else if (bullet == B_BATTLESHIP || bullet == B_OVERLORD)
	{
		var sa_ = 2 * Math.PI / 3;

		size *= Zoom_Fctr;

		context.translate(sp.x, sp.y);
		context.beginPath();
		context.moveTo(size * Math.cos(0 + rot), size * Math.sin(0 + rot));

		for (var i = 1; i <= 3; i++) {
			context.lineTo(size * Math.cos(i * sa_ + rot), size * Math.sin(i * sa_ + rot));
		}

		context.closePath();
		context.fill();
		context.stroke();
	}
	else if (bullet == B_NECROMANCER)
	{
		var sa_ = 2 * Math.PI / 4;

		size *= Zoom_Fctr;

		context.translate(sp.x, sp.y);
		context.beginPath();
		context.moveTo(size * Math.cos(0 + rot), size * Math.sin(0 + rot));

		for (var i = 1; i <= 4; i++) {
			context.lineTo(size * Math.cos(i * sa_ + rot), size * Math.sin(i * sa_ + rot));
		}

		context.closePath();
		context.fill();
		context.stroke();
	}
	else if (bullet == B_TRAP)
	{
		var sa_ = 2 * Math.PI / 6;

		size *= Zoom_Fctr;

		context.translate(sp.x, sp.y);
		context.beginPath();
		context.moveTo(size * Math.cos(0 + rot), size * Math.sin(0 + rot));

		for (var i = 1; i <= 6; i++) {
			if (i % 2 == 0)
			{
				context.lineTo(size * Math.cos(i * sa_ + rot), size * Math.sin(i * sa_ + rot));
			}
			else
			{
				context.lineTo(size * 0.35 * Math.cos(i * sa_ + rot), size * 0.35 * Math.sin(i * sa_ + rot));
			}
		}

		context.closePath();
		context.fill();
		context.stroke();
	}
	else
	{
		// TODO!
	}

	context.restore();
}

// This function draws a dead bullet in game coordinates.

var B_LIFE_EXPIRE = 10;

function Draw_Dead_Bullet(gx, gy, size, rot, team, bullet, life)
{
	var sp = ptos(gx, gy);

	if (bullet == B_NORMAL)
	{
		context.beginPath();
		context.arc(sp.x, sp.y, (size + life / B_LIFE_EXPIRE * 3) * Zoom_Fctr, 0, 2 * Math.PI, true);
		context.fillStyle = Make_Color_Ex(_C[team].r, _C[team].g, _C[team].b, 1 - life / B_LIFE_EXPIRE);
		context.fill();
		context.strokeStyle = Make_Color_Ex(_O[team].r, _O[team].g, _O[team].b, 1 - life / B_LIFE_EXPIRE);
		context.lineWidth = 3.0 * Zoom_Fctr;
		context.stroke();
		context.closePath();
	}
	else
	{
		// TODO!
	}
}

// This function draws the appropriate minimap based on the selected game mode. It also renders
// the glyph that represents the player.

function Draw_Minimap(gx, gy, rot, players)
{
	var mx = window.innerWidth - 129.34 - 20.2;
	var my = window.innerHeight - 129.34 - 20.2;

	context.save();
	context.fillStyle = Make_Color_Ex(255, 255, 255, 0.3);
	context.fillRect(mx, my, 129.34, 129.34);

	if (Game_Mode == GM_4TDM || Game_Mode == GM_4DOM)
	{
		var bs = (Base_Size / (Border_Size * 2)) * 129.34;

		context.fillStyle = Make_Color_Ex(_C[_BLUE].r, _C[_BLUE].g, _C[_BLUE].b, 0.5);
		context.fillRect(mx, my, bs, bs);
		context.fillStyle = Make_Color_Ex(_C[_PURPLE].r, _C[_PURPLE].g, _C[_PURPLE].b, 0.5);
		context.fillRect(mx + 129.34 - bs, my, bs, bs);
		context.fillStyle = Make_Color_Ex(_C[_GREEN].r, _C[_GREEN].g, _C[_GREEN].b, 0.5);
		context.fillRect(mx, my + 129.34 - bs, bs, bs);
		context.fillStyle = Make_Color_Ex(_C[_RED].r, _C[_RED].g, _C[_RED].b, 0.5);
		context.fillRect(mx + 129.34 - bs, my + 129.34 - bs, bs, bs);
	}
	else if (Game_Mode == GM_2TDM)
	{
		var bs = (Base_Size / (Border_Size * 2)) * 129.34;

		context.fillStyle = Make_Color_Ex(_C[_BLUE].r, _C[_BLUE].g, _C[_BLUE].b, 0.5);
		context.fillRect(mx, my, bs, 129.34);
		context.fillStyle = Make_Color_Ex(_C[_RED].r, _C[_RED].g, _C[_RED].b, 0.5);
		context.fillRect(mx + 129.34 - bs, my, bs, 129.34);
	}
	else if (Game_Mode == GM_2DOM)
	{
		var bs = (Base_Size / (Border_Size * 2)) * 129.34;

		context.fillStyle = Make_Color_Ex(_C[_BLUE].r, _C[_BLUE].g, _C[_BLUE].b, 0.5);
		context.fillRect(mx, my, bs, bs);
		context.fillStyle = Make_Color_Ex(_C[_RED].r, _C[_RED].g, _C[_RED].b, 0.5);
		context.fillRect(mx + 129.34 - bs, my + 129.34 - bs, bs, bs);
	}

	if (Game_Mode == GM_2DOM || Game_Mode == GM_4DOM)
	{
		var zs = (Zone_Size / (Border_Size * 2)) * 129.34;
		var zd = (129.34 / 2) - (129.34 / (Border_Size * 2) * Zone_Dist);

		context.fillStyle = Make_Color_Ex(_C[Game_Dominators[0]].r, _C[Game_Dominators[0]].g, _C[Game_Dominators[0]].b, 0.5);
		context.fillRect(mx + zd - (zs / 2), my + zd - (zs / 2), zs, zs);
		context.fillStyle = Make_Color_Ex(_C[Game_Dominators[1]].r, _C[Game_Dominators[1]].g, _C[Game_Dominators[1]].b, 0.5);
		context.fillRect(mx + 129.34 - zd - (zs / 2), my + zd - (zs / 2), zs, zs);
		context.fillStyle = Make_Color_Ex(_C[Game_Dominators[2]].r, _C[Game_Dominators[2]].g, _C[Game_Dominators[2]].b, 0.5);
		context.fillRect(mx + zd - (zs / 2), my + 129.34 - zd - (zs / 2), zs, zs);
		context.fillStyle = Make_Color_Ex(_C[Game_Dominators[3]].r, _C[Game_Dominators[3]].g, _C[Game_Dominators[3]].b, 0.5);
		context.fillRect(mx + 129.34 - zd - (zs / 2), my + 129.34 - zd - (zs / 2), zs, zs);
	}

	// Draw arrow representing player (game space parameters)

	var sx = 129.34 / (Border_Size * 2) * gx + (mx + (129.34 / 2));
	var sy = 129.34 / (Border_Size * 2) * gy + (my + (129.34 / 2));

	context.rect(mx, my, 129.34, 129.34);
	context.clip();
	context.translate(sx, sy);
	context.rotate((rot + 90) * Math.PI / 180.0);
	context.beginPath();
	context.moveTo(0, -2.3);
	context.lineTo(0, 2.3);
	context.lineTo(5, 0);
	context.lineTo(0, -2.3);
	context.closePath();
	context.fillStyle = Make_Color_Ex(0, 0, 0, 0.9);
	context.fill();
	context.translate(0 - sx, 0 - sy);
	context.restore();

	context.strokeStyle = Make_Color(_TB.r, _TB.g, _TB.b);
	context.lineJoin = "round";
	context.lineWidth = 4;
	context.strokeRect(mx, my, 129.34, 129.34);

	// Render text displaying game title and online players

	Draw_Text_S(ntoc(A_PLAYER.length) + " players", mx + 129.34, my - 9, 12, "right", 4);
	Draw_Text_S("diep.io", mx + 129.34, my - 25, 17, "right", 4);
}

// This function draws the leaderboard.

function Draw_Leaderboard()
{
	var w = 160 - 18;
	var m = 25;

	Draw_Text_S("Scoreboard", window.innerWidth - (w / 2) - 20, 28, 17, "center", 4);

	for (var z = 0; z < _LB.length; z++)
	{
		var y = 26 + z * 17.3;

		context.beginPath();
		context.moveTo(window.innerWidth - w - m, 20 + y);
		context.lineTo(window.innerWidth - m, 20 + y);
		context.closePath();
		context.strokeStyle = Make_Color_Ex(_UI.r, _UI.g, _UI.b, 0.8);
		context.lineJoin = "round";
		context.lineWidth = 14.3;
		context.stroke();

		context.beginPath();
		context.moveTo(window.innerWidth - w - m, 20 + y);
		context.lineTo(window.innerWidth - w - m + (w / 100) * _LB[z].percent, 20 + y);
		context.closePath();
		context.strokeStyle = Make_Color_Ex(_L[_LB[z].team].r, _L[_LB[z].team].g, _L[_LB[z].team].b, 1);
		context.lineJoin = "round";
		context.lineWidth = 10.1;
		context.stroke();

		Draw_Text_S(_LB[z].name + " - " + ntoe(_LB[z].score), window.innerWidth - w / 2 - m, 20 + 4 + y, 10, "center", 3);
	}
}

// This function draws an upgrade box.

function Draw_Upgrade(x, y, tank, width, height, color)
{
	var b = Borderize(color);
	var s = stogs(x + width / 2, y + height / 2);

	context.save();
	context.fillStyle = Make_Color(color.r, color.g, color.b);
	context.lineJoin = "round";
	context.lineWidth = 4.1;
	Round_Rect(context, x, y, width, height, {tl: 5, tr: 5, bl: 5, br: 5}, true, false);
	context.rect(100, 100, width, height);
	context.clip();
	Draw_Player(s.x, s.y, -15, _BLUE, Iteration, 0, tank, "", "", false, false, 0);
	context.restore();
	context.strokeStyle = Make_Color(b.r, b.g, b.b);;
	Round_Rect(context, x, y, width, height, {tl: 5, tr: 5, bl: 5, br: 5}, false, true);
	Draw_Text_S(C_NAMES[tank], x + width / 2, y + width / 1.15, 10, "center", 3);
}

function Render()
{
	Prepare_Context(205, 205, 205);

	var Width = window.innerWidth;
	var Height = window.innerHeight;

	// Focus camera

	var Fo = 40;
	var At = 40; 

	Zoom_Fctr = 1 - (A_PLAYER[At].level / 100);

	CamX = A_PLAYER[Fo].x * Zoom_Fctr - A_PLAYER[Fo].vx * 2;
	CamY = A_PLAYER[Fo].y * Zoom_Fctr - A_PLAYER[Fo].vy * 2;

	var P_sp = ptos(A_PLAYER[At].x, A_PLAYER[At].y);
	var Angle = 0 - Math.atan2(MouseX - P_sp.x, MouseY - P_sp.y) / (Math.PI / 180);

	A_PLAYER[At].rotation = Angle;
	A_PLAYER[At].cheat = false;

	// Render gridlines

	var cell = Grid_Size * Zoom_Fctr;
	for(var xpos = -CamX % cell + cell;xpos < Width;xpos += cell){
		for(var i = 0;i < 2;i++){
			Draw_Line(199, 199, 199, 1, 1, xpos, 0, xpos, Height);
		}
	}
	for(var ypos = -CamY % cell + cell;xpos < Height;xpos += cell){
		for(var i = 0;i < 2;i++){
			Draw_Line(199, 199, 199, 1, 1, 0, ypos, Width, ypos);
		}
	}

	// Render boundaries

	var tlb = ptos(0 - Border_Size, 0 - Border_Size);
	var trb = ptos(Border_Size, 0 - Border_Size);
	var blb = ptos(0 - Border_Size, Border_Size);
	var brb = ptos(Border_Size, Border_Size);

	Fill_Rect(0, 0, 0, 0.1, tlb.x, 0, trb.x - tlb.x, tlb.y);
	Fill_Rect(0, 0, 0, 0.1, blb.x, blb.y, brb.x - blb.x, Height - blb.y);
	Fill_Rect(0, 0, 0, 0.1, 0, 0, tlb.x, Height);
	Fill_Rect(0, 0, 0, 0.1, trb.x, 0, Width - trb.x, Height);

	// Render team bases (if needed)

	if (Game_Mode == GM_4TDM || Game_Mode == GM_4DOM)
	{
		Fill_Rect(_C[_BLUE].r, _C[_BLUE].g, _C[_BLUE].b, 0.15, tlb.x, tlb.y, Base_Size * Zoom_Fctr, Base_Size * Zoom_Fctr);
		Fill_Rect(_C[_PURPLE].r, _C[_PURPLE].g, _C[_PURPLE].b, 0.15, trb.x, trb.y, 0 - Base_Size * Zoom_Fctr, Base_Size * Zoom_Fctr);
		Fill_Rect(_C[_GREEN].r, _C[_GREEN].g, _C[_GREEN].b, 0.15, blb.x, blb.y, Base_Size * Zoom_Fctr, 0 - Base_Size * Zoom_Fctr);
		Fill_Rect(_C[_RED].r, _C[_RED].g, _C[_RED].b, 0.15, brb.x, brb.y, 0 - Base_Size * Zoom_Fctr, 0 - Base_Size * Zoom_Fctr);
	}
	else if (Game_Mode == GM_2TDM)
	{
		Fill_Rect(_C[_BLUE].r, _C[_BLUE].g, _C[_BLUE].b, 0.15, tlb.x, tlb.y, Base_Size * Zoom_Fctr, Border_Size * 2 * Zoom_Fctr);
		Fill_Rect(_C[_RED].r, _C[_RED].g, _C[_RED].b, 0.15, trb.x, trb.y, 0 - Base_Size * Zoom_Fctr, Border_Size * 2 * Zoom_Fctr);
	}
	else if (Game_Mode == GM_2DOM)
	{
		Fill_Rect(_C[_BLUE].r, _C[_BLUE].g, _C[_BLUE].b, 0.15, tlb.x, tlb.y, Base_Size * Zoom_Fctr, Base_Size * Zoom_Fctr);
		Fill_Rect(_C[_RED].r, _C[_RED].g, _C[_RED].b, 0.15, brb.x, brb.y, 0 - Base_Size * Zoom_Fctr, 0 - Base_Size * Zoom_Fctr);
	}

	if (Game_Mode == GM_4DOM || Game_Mode == GM_2DOM)
	{
		// This is implemented in a shaky manner... to bad that we can't use pton(...) in Render_Minimap().

		var d_tl = ptos(0 - Zone_Dist - (Zone_Size / 2), 0 - Zone_Dist - (Zone_Size / 2));
		var d_tr = ptos(0 + Zone_Dist - (Zone_Size / 2), 0 - Zone_Dist - (Zone_Size / 2));
		var d_bl = ptos(0 - Zone_Dist - (Zone_Size / 2), 0 + Zone_Dist - (Zone_Size / 2));
		var d_br = ptos(0 + Zone_Dist - (Zone_Size / 2), 0 + Zone_Dist - (Zone_Size / 2));

		Fill_Rect(_C[Game_Dominators[0]].r, _C[Game_Dominators[0]].g, _C[Game_Dominators[0]].b, 0.15, d_tl.x, d_tl.y, Zone_Size * Zoom_Fctr, Zone_Size * Zoom_Fctr);
		Fill_Rect(_C[Game_Dominators[1]].r, _C[Game_Dominators[1]].g, _C[Game_Dominators[1]].b, 0.15, d_tr.x, d_tr.y, Zone_Size * Zoom_Fctr, Zone_Size * Zoom_Fctr);
		Fill_Rect(_C[Game_Dominators[2]].r, _C[Game_Dominators[2]].g, _C[Game_Dominators[2]].b, 0.15, d_bl.x, d_bl.y, Zone_Size * Zoom_Fctr, Zone_Size * Zoom_Fctr);
		Fill_Rect(_C[Game_Dominators[3]].r, _C[Game_Dominators[3]].g, _C[Game_Dominators[3]].b, 0.15, d_br.x, d_br.y, Zone_Size * Zoom_Fctr, Zone_Size * Zoom_Fctr);	
	}

	// Render shapes

	for (var n = 0; n < A_SHAPE.length; n++)
	{
		Draw_Shape(A_SHAPE[n].x, A_SHAPE[n].y, A_SHAPE[n].rotation, A_SHAPE[n].shape);

		A_SHAPE[n].rotation += 0.01;
		A_SHAPE[n].x += Math.sin(A_SHAPE[n].rotation / 5) / 5.0;
		A_SHAPE[n].y += Math.cos(A_SHAPE[n].rotation / 5) / 5.0;
	}

	// Render bullets

	var rblt = [];
	var rdblt = [];

	for (var n = 0; n < A_BULLET.length; n++)
	{
		Draw_Bullet(A_BULLET[n].x, A_BULLET[n].y, A_BULLET[n].size, A_BULLET[n].rotation, A_BULLET[n].team, A_BULLET[n].bullet);

		A_BULLET[n].ax /= 1.2;
		A_BULLET[n].ay /= 1.2;
		A_BULLET[n].x += A_BULLET[n].vx + A_BULLET[n].ax;
		A_BULLET[n].y += A_BULLET[n].vy + A_BULLET[n].ay;
		A_BULLET[n].life -= 1;

		if (A_BULLET[n].bullet == B_TRAP)
		{
			A_BULLET[n].vx /= 1.01 + Math.random() / 6;
			A_BULLET[n].vy /= 1.01 + Math.random() / 6;
		}

		if (A_BULLET[n].life < 0)
		{
			rblt.push(n);

			A_DEAD_BULLET.push(new DeadBullet
			(
				A_BULLET[n].x,
				A_BULLET[n].y,
				A_BULLET[n].vx / 2,
				A_BULLET[n].vy / 2,
				A_BULLET[n].size,
				A_BULLET[n].rotation,
				A_BULLET[n].team,
				A_BULLET[n].bullet
			));
		}
	}

	// Render dead bullets

	for (var n = 0; n < A_DEAD_BULLET.length; n++)
	{
		Draw_Dead_Bullet(A_DEAD_BULLET[n].x, A_DEAD_BULLET[n].y, A_DEAD_BULLET[n].size, A_DEAD_BULLET[n].rotation, A_DEAD_BULLET[n].team, A_DEAD_BULLET[n].bullet, A_DEAD_BULLET[n].life);
	
		A_DEAD_BULLET[n].x += A_DEAD_BULLET[n].vx;
		A_DEAD_BULLET[n].y += A_DEAD_BULLET[n].vy;
		A_DEAD_BULLET[n].life += 1;

		if (A_DEAD_BULLET[n].life > B_LIFE_EXPIRE)
		{
			rdblt.push(n);
		}
	}

	for (var k = 0; k < rblt.length; k++)
	{
		A_BULLET.splice(rblt[k], 1);
	}

	for (var k = 0; k < rdblt.length; k++)
	{
		A_DEAD_BULLET.splice(rdblt[k], 1);
	}

	if (ML == true && Iteration % 3 == 0)
	{
		A_BULLET.push(new Bullet
		(
			A_PLAYER[At].x + Math.sin((0 - A_PLAYER[At].rotation) * Math.PI / 180.0) * (20.0 + (A_PLAYER[At].level / 45) * 10.0) * 1.8,
			A_PLAYER[At].y + Math.cos((0 - A_PLAYER[At].rotation) * Math.PI / 180.0) * (20.0 + (A_PLAYER[At].level / 45) * 10.0) * 1.8,
			Math.sin((0 - A_PLAYER[At].rotation + ((Math.random() - 0.5) * 10)) * Math.PI / 180.0) * 10,
			Math.cos((0 - A_PLAYER[At].rotation + ((Math.random() - 0.5) * 10)) * Math.PI / 180.0) * 10,
			Math.sin((0 - A_PLAYER[At].rotation + ((Math.random() - 0.5) * 10)) * Math.PI / 180.0) * 5,
			Math.cos((0 - A_PLAYER[At].rotation + ((Math.random() - 0.5) * 10)) * Math.PI / 180.0) * 5,
			(20.0 + (A_PLAYER[At].level / 45) * 10.0) * (Iteration % 2 == 0 ? 0.25 : 0.4),
			A_PLAYER[At].rotation,
			A_PLAYER[At].team,
			B_NORMAL,
			230
		));

		A_PLAYER[At].recoil = Math.abs(Math.sin(Iteration / 5)) * 100;
	}
	else
	{
		A_PLAYER[n].recoil += (0 - A_PLAYER[n].recoil) * 0.5;
	}

	// Render players

	for (var n = 0; n < A_PLAYER.length; n++)
	{
		Draw_Player
		(
			A_PLAYER[n].x, 
			A_PLAYER[n].y, 
			A_PLAYER[n].level, 
			A_PLAYER[n].team, 
			A_PLAYER[n].rotation, 
			A_PLAYER[n].recoil, 
			A_PLAYER[n].tank, 
			_NT[A_PLAYER[n].tag], 
			A_PLAYER[n].score,
			A_PLAYER[n].cheat, 
			A_PLAYER[n].spawn,
			A_PLAYER[n].injury
		);

		A_PLAYER[n].vx /= 1.05;
		A_PLAYER[n].vy /= 1.05;
		A_PLAYER[n].x += A_PLAYER[n].vx;
		A_PLAYER[n].y += A_PLAYER[n].vy;
		A_PLAYER[n].rotation += 1;
	}

	// Render player names

	for (var n = 0; n < A_PLAYER.length; n++)
	{
		Draw_Player_Text(A_PLAYER[n].x, A_PLAYER[n].y, A_PLAYER[n].level, _NT[A_PLAYER[n].tag], A_PLAYER[n].score, A_PLAYER[n].cheat);
	}

	// Update and get rid of old push notifications.

	var rpn = [];

	for (var k = 0; k < _PN.length; k++)
	{
		if (_PN[k].life > 210)
		{
			rpn.push(k);
		}
		else
		{
			Draw_Push_Notificiation(Width / 2, 30 + (24 * (k - rpn.length)), _PN[k].team, _PN[k].text, Math.max(0, _PN[k].getSize()));
		}

		_PN[k].life += 1;
	}

	for (var z = 0; z < rpn.length; z++)
	{
		_PN.splice(rpn[z], 1);
	}

	Draw_Minimap(A_PLAYER[A_PLAYER.length - 1].x, A_PLAYER[A_PLAYER.length - 1].y, A_PLAYER[A_PLAYER.length - 1].rotation);
	
	if (Game_Mode != GM_2DOM && Game_Mode != GM_4DOM)
	{
		Draw_Leaderboard();
	} 

	// Handle keypresses

	var p_v = 9 - (A_PLAYER[At].level / 25);
	var p_a = 0.05;

	if (KEYS[KL] == true)
	{
		A_PLAYER[At].vx += (-p_v - A_PLAYER[At].vx) * p_a;
	}
	if (KEYS[KR] == true)
	{
		A_PLAYER[At].vx += (p_v - A_PLAYER[At].vx) * p_a;
	}
	if (KEYS[KD] == true)
	{
		A_PLAYER[At].vy += (p_v - A_PLAYER[At].vy) * p_a;
	}
	if (KEYS[KU] == true)
	{
		A_PLAYER[At].vy += (-p_v - A_PLAYER[At].vy) * p_a;
	}

	// Draw menu overlay

	//Fill_Rect(0, 0, 0, MenuFade * 0.3, 0, 0, Width, Height);

	

	Draw_Upgrade(29, 29, C_AUTO_TRAPPER, 70.5, 70.5, new Color(146, 178, 248))
	Draw_Upgrade(110.5, 29, C_MEGA_TRAPPER, 70.5, 70.5, new Color(146, 178, 248))
//function Draw_Player(gx, gy, lvl, team, rot, rec, _class, name, score, cheat, spawn, injury)
	// Flush zoom factor

	Iteration += 1;

	//window.requestAnimationFrame(Render);
}

// This line of code starts off the rendering function.

//window.requestAnimationFrame(Render);

setInterval(Render, 1000 / 60);

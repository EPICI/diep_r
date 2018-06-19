// This file contains the definition for a Vector structure. A Vector is a point in 2-dimensional 
// space. It supports the 4 basic arithmetic operations dealing with another Vector or a scalar.

#include <math.h>

struct Vector
{
	double x;
	double y;

	// Constructors.

	Vector()
	{
		x = 0;
		y = 0;
	}

	Vector(double _x, double _y)
	{
		x = _x;
		y = _y;
	}

	// Operations with other vectors.

	Vector operator + (Vector& b)
	{
		return Vector(x + b.x, y + b.y);
	}

	Vector operator - (Vector& b)
	{
		return Vector(x - b.x, y - b.y);
	}

	Vector operator * (Vector& b)
	{
		return Vector(x * b.x, y * b.y);
	}

	Vector operator / (Vector& b)
	{
		return Vector(x / b.x, y / b.y);
	}

	// Operations with a scalar.

	Vector operator + (double b)
	{
		return Vector(x + b, y + b);
	}

	Vector operator - (double b)
	{
		return Vector(x - b, y - b);
	}

	Vector operator * (double b)
	{
		return Vector(x * b, y * b);
	}

	Vector operator / (double b)
	{
		return Vector(x / b, y / b);
	}

	// Component-wise operations modifying the value of the current vector.

	Vector& operator += (Vector& b)
	{
		x += b.x;
		y += b.y;

		return *this;
	}

	Vector& operator -= (Vector& b)
	{
		x -= b.x;
		y -= b.y;

		return *this;
	}

	Vector& operator *= (Vector& b)
	{
		x *= b.x;
		y *= b.y;

		return *this;
	}

	Vector& operator /= (Vector& b)
	{
		x /= b.x;
		y /= b.y;

		return *this;
	}

	// Magnitude or length of a vector.

	double len()
	{
		return sqrt(x * x + y * y);
	}

	// Distance from the current vector to another vector.

	double dist(Vector& b)
	{
		// Define these to prevent recalculating dx and dy.

		double dx = x - b.x;
		double dy = y - b.y;

		return sqrt(dx * dx + dy * dy);
	}
};
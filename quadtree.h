/*

quadtree.h

Minimal implementation of a quadtree in C++.

*/

#include <vector>

#define QT_CAPACITY 5

// Definition of a point in two-dimensional space.

struct Point
{
	double x;
	double y;

	Point()
	{
		x = 0;
		y = 0;
	}

	Point(double _x, double _y)
	{
		x = _x;
		y = _y;
	}
};

// Definition of a rectangle in two-dimensional space.

struct Rectangle
{
	double x;
	double y;
	double w;
	double h;

	Rectangle()
	{
		x = 0;
		y = 0;
		w = 0;
		h = 0;
	}

	Rectangle(double _x, double _y, double _w, double _h)
	{
		x = _x;
		y = _y;
		w = _w;
		h = _h;
	}

	bool PointInBounds(Point _p)
	{
		return (_p.x > x && _p.x < x + w) && (_p.y > y && _p.y < y + h);
	}
};

// Definition of a quadtree in two-dimensional space.

struct Quadtree
{
	Rectangle bounds;

	std::vector<Point> points;

	Quadtree* tl;
	Quadtree* tr;
	Quadtree* bl;
	Quadtree* br;

	Quadtree(Rectangle _bounds)
	{
		// Initialize with given bounds and an empty array.

		bounds = _bounds;

		tl = NULL;
		tr = NULL;
		bl = NULL;
		br = NULL;
	}

	void Insert(Point _p)
	{
		// Ignore if the given point does not reside within this quadtree's boundary.

		if (bounds.PointInBounds(_p) == false)
		{
			return;
		}

		if (points.size() < QT_CAPACITY)
		{
			// Add _p to the point array.

			points.push_back(_p);
		}
		else
		{
			// What if it's already divided?

			if (tr == NULL)
			{
				// Point array is too big, subdivide as a result.

				Rectangle _tl = Rectangle(bounds.x, bounds.y, bounds.w / 2, bounds.h / 2);
				Rectangle _tr = Rectangle(bounds.x + bounds.w / 2, bounds.y, bounds.w / 2, bounds.h / 2);
				Rectangle _bl = Rectangle(bounds.x, bounds.y + bounds.h / 2, bounds.w / 2, bounds.h / 2);
				Rectangle _br = Rectangle(bounds.x + bounds.w / 2, bounds.y + bounds.h / 2, bounds.w / 2, bounds.h / 2);

				tl = new Quadtree(_tl);
				tr = new Quadtree(_tr);
				bl = new Quadtree(_bl);
				br = new Quadtree(_br);
			}

			tl->Insert(_p);
			tr->Insert(_p);
			bl->Insert(_p);
			br->Insert(_p);
		}
	}
};
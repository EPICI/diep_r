/*

quadtree.h

Optimized implementation of a quadtree in C++.

Bucket size is 1, constant.

*/

#define NULL 0

// Add the contents of an vector to the back of another vector.

template<typename T>

void AppendVector(std::vector<T> &_a, std::vector<T> _b)
{
	for (unsigned int n = 0; n < _b.size(); n++)
	{
		_a.push_back(_b[n]);
	}
}

// A point in two dimensional space. Represents a precise x and y coordinate.

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

// A quadtree that deals with two dimensional Point objects.

struct Quadtree
{
	double x;
	double y;
	double w;
	double h;

	Point point;

	Quadtree* tl;
	Quadtree* tr;
	Quadtree* bl;
	Quadtree* br;

	// Create a quadtree with the specified bounds.

	Quadtree(double _x, double _y, double _w, double _h)
	{
		x = _x;
		y = _y;
		w = _w;
		h = _h;

		tl = NULL;
		tr = NULL;
		bl = NULL;
		br = NULL;
	}

	void Destroy()
	{
		if (tl != NULL)
		{
			tl->Destroy();
			tr->Destroy();
			bl->Destroy();
			br->Destroy();
		}

		delete tl;
		delete tr;
		delete bl;
		delete br;
	}

	// Insert a point into a quadtree. If the quadtree contains one point, subdivide (if not divided 
	// already) and delegate the point to it's children. Upon subdividing, it's current point is 
	// dumped into one of it's children.

	bool Insert(Point _p)
	{
		// Ignore the point if it does not lie within this quadtree's bounds.

		if (((_p.x > x && _p.x < x + w) && (_p.y > y && _p.y < y + h)) == false)
		{
			return false;
		}

		// Insert the point.

		if (point.x == 0 && point.y == 0 && tl == NULL)
		{
			point = _p;

			return true;
		}
		else
		{
			// Ignore the point if it is identical to the current point.

			if (_p.x == point.x && _p.y == point.y)
			{
				return false;
			}

			if (tl == NULL)
			{
				// Subdivide.

				tl = new Quadtree(x, y, w / 2.0, h / 2.0);
				tr = new Quadtree(x + w / 2.0, y, w / 2.0, h / 2.0);
				bl = new Quadtree(x, y + h / 2.0, w / 2.0, h / 2.0);
				br = new Quadtree(x + w / 2.0, y + h / 2.0, w / 2.0, h / 2.0);

				// Insert current point into children.

				tl->Insert(point);
				tr->Insert(point);
				bl->Insert(point);
				br->Insert(point);

				// Nullify contained point.

				point = Point();
			}

			// Insert given point into children.

			return (tl->Insert(_p) || tr->Insert(_p) || bl->Insert(_p) || br->Insert(_p));
		}
	}

	std::vector<Point> Query(double _x, double _y, double _w, double _h)
	{
		std::vector<Point> points;

		if (_x + _w < x || _y + _h < y || _x > x + w || _y > y + w)
		{
			// Range does not intersect this quadtree's boundary.

			return points;
		}

		if (((point.x > _x && point.x < _x + _w) && (point.y > _y && point.y < _y + _h)) == true)
		{
			points.push_back(point);
		}

		if (tl == NULL)
		{
			// No children nodes.

			return points;
		}

		AppendVector(points, tl->Query(_x, _y, _w, _h));
		AppendVector(points, tr->Query(_x, _y, _w, _h));
		AppendVector(points, bl->Query(_x, _y, _w, _h));
		AppendVector(points, br->Query(_x, _y, _w, _h));

		return points;
	}
};
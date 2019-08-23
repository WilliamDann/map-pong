class Vector {
    /**
     * Stores position/size information
     * @param {Number} x X position
     * @param {Number} y Y Position
     * @param {Number} w Width
     * @param {Number} h height
     */
    constructor(x, y, w=null, h=null) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    /**
     * Add a vector
     * @param {Vector} other The Vector to add
     */
    add(other) {
        this.x += other.x;
        this.y += other.y;

        this.w += other.w;
        this.h += other.h;

        return this;
    }

     /**
     * Add a vector
     * @param {Vector} other The Vector to subtract
     */
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;

        this.w -= other.w;
        this.h -= other.h;

        return this;
    }

    /**
     * Add a vector
     * @param {Vector} other The Vector to multiply
     */
    multiply(other) {
        this.x *= other.x;
        this.y *= other.y;

        this.w *= other.w;
        this.h *= other.h;

        return this;
    }

    /**
     * Add a vector
     * @param {Vector} other The Vector to divide
     */
    divide(other) {
        this.x /= other.x;
        this.y /= other.y;

        this.w /= other.w;
        this.h /= other.h;

        return this;
    }

    /**
     * Check if a point is contained in the vector
     * @param {number} x X position of point
     * @param {number} y Y position of point
     */
    containsPoint(x, y) {
        return (x >= this.x && x <= this.w) && (y >= this.y && y <= this.h)
    }

    // Overload the default toString function
    toString() {
        return "Vector(" + this.x + ", " + this.y + ", " + this.w + ", " + this.h + ")";
    }
} exports.Vector = Vector;
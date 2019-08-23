package com.williamdann.map_pong;

public class Vector {
    int x, y, w, h;

    public Vector(int x, int y) {
        this.x = x;
        this.y = y;

        this.w = 0;
        this.h = 0;
    }

    Vector add(Vector other) {
        this.x += other.x;
        this.y += other.y;
        this.w += other.w;
        this.h += other.h;

        return this;
    }

    Vector subtract(Vector other) {
        this.x -= other.x;
        this.y -= other.y;
        this.w -= other.w;
        this.h -= other.h;

        return this;
    }

    Vector multiply(Vector other) {
        this.x *= other.x;
        this.y *= other.y;
        this.w *= other.w;
        this.h *= other.h;

        return this;
    }

    Vector divide(Vector other) {
        this.x /= other.x;
        this.y /= other.y;
        this.w /= other.w;
        this.h /= other.h;

        return this;
    }
}

import {Vector3D} from "../Vector3D";
import {Projection} from "./Projection";

/** A base for a plan positioned in 3D space */
export class OrthographicProjection implements Projection{
    /** The first base vector of the plan this base produces */
    private readonly b1: Vector3D;
    /** The second base vector of the plan this base produces */
    private readonly b2: Vector3D;
    /** The offset vector that positions the plan in space */
    private readonly offset: number;
    
    constructor(b1: Vector3D, b2: Vector3D, offset: number) {
        this.b1 = b1;
        this.b2 = b2;
        this.offset = offset;
    }

    /**
     * Return the result of the projection of {@code v} on the plan represented by this base
     * @param v The vector to project on the plan
     */
    public project(v: Vector3D): Vector3D {
        const projected = this.projectOnPlan(v, this.b1.cross(this.b2) );
        return new Vector3D(
            projected.projectedOnto(this.b1),
            projected.projectedOnto(this.b2),
            0
        ).add(this.b1.cross(this.b2).normalized().scale(this.offset));
        
    }

    /**
     * Use the normal vector of a plan to project the vector {@code v} on it
     * @param v The vector to project
     * @param normal The normal of the plan
     */
    public projectOnPlan(v: Vector3D, normal: Vector3D):Vector3D {
        return v.subtract(normal.scale(
            v.projectedOnto(normal)
        ));
    }
    
    
}
import {Vector3D} from "../Vector3D";

export interface Projection {
    
    project(v: Vector3D): Vector3D;
}
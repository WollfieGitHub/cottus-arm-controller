import {Projection} from "./Projection";
import {Vector3D} from "../Vector3D";

export default class PerspectiveProjection implements Projection {
    
    private readonly cameraPos: Vector3D;
    private readonly cameraRot: Vector3D;
    
    private readonly far: number;
    private readonly near: number;
    
    private readonly fov: number;
    
    constructor(cameraPos: Vector3D, cameraRot: Vector3D, far: number, near: number, fov: number) {
        this.cameraPos = cameraPos;
        this.cameraRot = cameraRot;
        this.far = far;
        this.near = near;
        this.fov = fov;
    }

    project(v: Vector3D): Vector3D {
        const S: number = 1/( Math.tan(this.fov*Math.PI/360) );
        let x:number, y:number, z:number, w:number;

        const projected: Vector3D = (this.cameraPos.subtract(v)).rotatedAtOriginUsing(this.cameraRot);
        x = projected.x; y = projected.y; z = projected.z;


        w = -z;
        x *= S; y *= S;
        z = -this.far/(this.far-this.near)*z - (this.far*this.near)/(this.far-this.near);
        
        return new Vector3D(x/w,  y/w, z/w);
    }
    
}
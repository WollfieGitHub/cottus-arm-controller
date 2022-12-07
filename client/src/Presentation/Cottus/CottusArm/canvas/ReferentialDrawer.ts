import {OrthographicProjection} from "../../../../Domain/Models/maths/projection/OrthographicProjection";
import {Vector3D} from "../../../../Domain/Models/maths/Vector3D";
import {Axis3D} from "../../../../Domain/Models/maths/Axis3D";
import Color from "../../../utils/Color";
import {Projection} from "../../../../Domain/Models/maths/projection/Projection";

const xGridSpacing: number = 100.0;
const yGridSpacing: number = 100.0;

const xReferentialRange: number = 1000.0;
const yReferentialRange: number = 1000.0;
const zReferentialRange: number = 1000.0;

export function DrawReferential(
    ctx: CanvasRenderingContext2D,
    base: Projection
) {
    drawReferentialGrid(ctx, base);
    drawReferentialAxis(ctx, base);
}

function drawReferentialGrid(
    ctx: CanvasRenderingContext2D,
    base: Projection,
) {
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = new Color(255, 255, 255, 125).toRgbString()
    let gridLineBegin: Vector3D, gridLineEnd: Vector3D;
    // Draw the grid for the x coordinates
    for (let x = 1; x < xReferentialRange/xGridSpacing; x++) {
        gridLineBegin = base.project(
            new Vector3D(+yReferentialRange/2.0, 0, 0)
                .add(new Vector3D(0, xGridSpacing*x - xReferentialRange/2.0, 0))
        );
        
        gridLineEnd = base.project(
            new Vector3D(-yReferentialRange/2.0, 0, 0)
                .add(new Vector3D(0, xGridSpacing*x -xReferentialRange/2.0, 0))
        );

        ctx.beginPath();
        ctx.moveTo(gridLineBegin.x, gridLineBegin.y);
        ctx.lineTo(gridLineEnd.x, gridLineEnd.y);
        ctx.stroke();
    }
    // Draw the grid for the y coordinate
    for (let y = 1; y < yReferentialRange/yGridSpacing; y++) {
        gridLineBegin = base.project(
            new Vector3D(0, +xReferentialRange/2.0, 0)
                .add(new Vector3D(xGridSpacing*y-xReferentialRange/2.0, 0, 0))
        );
        gridLineEnd = base.project(
            new Vector3D(0, -xReferentialRange/2.0, 0)
                .add(new Vector3D(xGridSpacing*y-xReferentialRange/2.0, 0, 0))
        );
        
        ctx.beginPath();
        ctx.moveTo(gridLineBegin.x, gridLineBegin.y);
        ctx.lineTo(gridLineEnd.x, gridLineEnd.y);
        ctx.stroke();
    }
}

function drawReferentialAxis(
    ctx: CanvasRenderingContext2D,
    base: Projection,
) {
    const drawAxis = (axis: Axis3D, range: number, color: Color) => {
        ctx.strokeStyle = color.toRgbString();
        
        const { x: x0, y: y0 } = base.project(Vector3D.Zero);
        const { x: x1, y: y1 } = base.project(axis.unitVector.scale(range));
        
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    }
    
    ctx.lineWidth = 2.0;
    drawAxis(Axis3D.X, xReferentialRange, Color.Red);
    drawAxis(Axis3D.Y, yReferentialRange, Color.Green);
    drawAxis(Axis3D.Z, zReferentialRange, Color.Blue);
}
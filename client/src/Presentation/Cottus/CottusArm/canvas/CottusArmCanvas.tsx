import {CottusArm} from "../../../../Domain/Models/CottusArm";
import {useEffect, useRef, useState} from "react";
import {DrawReferential} from "./ReferentialDrawer";
import {Vector3D} from "../../../../Domain/Models/maths/Vector3D";
import Color from "../../../utils/Color";
import {Projection} from "../../../../Domain/Models/maths/projection/Projection";
import PerspectiveProjection from "../../../../Domain/Models/maths/projection/PerspectiveProjection";

let n = 0;

const CottusArmCanvas = (
    cottusArm: CottusArm
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [ projection, setProjection ] = useState<Projection>(new PerspectiveProjection(
        new Vector3D(0, 0, 5),
        new Vector3D(0,0, Math.PI/4.0),
        100.0,
        0.1,
        80
    ));
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) { return; }

        const context = canvas.getContext("2d");
        if (context === null) { return; }

        context.setTransform(
            1, 0,
            0, 1,
            canvas.width/2, +canvas.height/2
        );
        
        context.fillStyle = new Color(80, 80, 80).toRgbString();
        context.fillRect(
            -canvas.width/2, -canvas.height/2,
            canvas.width, canvas.height
        );
        context.lineWidth = 1.0;

        DrawReferential(context, projection);
        
    }, [ projection ])
    
    return (<canvas width={700} height={700} ref={canvasRef}/>);
}

export default CottusArmCanvas;


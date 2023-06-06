import "../styles/Base.scss";
import SketchPad from "../components/SketchPad";
import NumberRecognizer from "../components/DigitRecognizer";
import { useRef } from "react";

export default function NumberRecognitionApp() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    return (
        <div>
            <p>Digit Recognition</p>
            <SketchPad canvasColor={'#000000'} penColor={"white"} width={280} height={280} penSize={20} canvasRef={canvasRef} />
            <NumberRecognizer canvas={canvasRef}></NumberRecognizer>
        </div>
    )
}
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import "../styles/Base.scss";
import "../styles/PainterApp.scss";
import PenSettings from "../components/PenSettings";
import SketchPad from "../components/SketchPad";
export default function PainterApp() {
    const [color, setColor] = useState("black");
    const [size, setSize] = useState(10);
    const [x, setX] = useState(400);
    const [y, setY] = useState(400);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const downloadRef = useRef<HTMLAnchorElement>(null);

    function download() {
        var image = canvasRef.current!.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloadRef.current!.setAttribute("href", image);
    }
    return (
        <div>
            <p>Painter</p>
            <div className="painter">
                <SketchPad penColor={color} penSize={size} canvasRef={canvasRef} width={x} height={y} />
                <div>
                    <PenSettings setColor={setColor} setSize={setSize} x={x} y={y} setX={setX} setY={setY} />
                    <a ref={downloadRef} download="image.png"><button type="button" onClick={download} >Download</button></a>
                </div>
            </div>
        </div>
    )
}
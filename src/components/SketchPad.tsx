import { useEffect, useRef } from "react";

import "../styles/Base.scss";

import useCanvasColorChange from "../hooks/useCanvasColorChange";
import useCanvasListener from "../hooks/useCanvasListener";
import useCanvasPenSizeChange from "../hooks/useCanvasPenSizeChange";

export default function SketchPad(props: { width: number, height: number, canvasColor: string, penColor: string, penSize: number, canvasRef: React.RefObject<HTMLCanvasElement> }) {
    const isIdle = useRef(true);

    useEffect(() => {
        const renderCanvas = () => {
            if (props.canvasRef.current) {
                const canvas: HTMLCanvasElement = props.canvasRef.current;
                const context = canvas.getContext("2d");
                if (context) {
                    context.lineCap = "round";
                    context.lineJoin = 'round'
                    context.strokeStyle = props.penColor;
                    context.fillStyle = props.canvasColor;
                    context.fillRect(0, 0, props.width, props.height);
                    context.lineWidth = props.penSize;
                    context.globalCompositeOperation = "source-over";
                }
            }
        }
        renderCanvas();
    }, [props.width, props.height]) // eslint-disable-line react-hooks/exhaustive-deps

    useCanvasColorChange(props.canvasRef, props.penColor);
    useCanvasPenSizeChange(props.canvasRef, props.penSize);
    useCanvasListener(props.canvasRef, isIdle)

    function clearCanvas() {
        const canvas: HTMLCanvasElement | null = props.canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                context.fillStyle = props.canvasColor;
                context.fillRect(0, 0, props.width, props.height);
            }
        }
    }


    return (
        <div>
            <div>
                <button style={{ width: props.width }} onClick={clearCanvas}>Clear</button>
            </div>
            <div>
                <canvas onMouseEnter={(e) => {
                    if (e.buttons === 1 && props.canvasRef.current) {
                        props.canvasRef.current?.getContext("2d")?.beginPath();
                        isIdle.current = false;
                    }
                }} onMouseLeave={() => isIdle.current = true} ref={props.canvasRef} width={props.width} height={props.height} style={{ border: "1px solid #000000" }} />
            </div>
        </div>
    )
}

SketchPad.defaultProps = {
    width: 400,
    height: 400,
    canvasColor: "#FFFFFF",
    penColor: "#000000",
    penSize: 12
}
import { useEffect } from "react";

const useCanvasColorChange = (canvasRef: React.RefObject<HTMLCanvasElement>, color: string) => {
    useEffect(() => {
        const changeColor = () => {
            if (canvasRef.current) {
                const canvas: HTMLCanvasElement = canvasRef.current;
                const context = canvas.getContext("2d");
                if (context) {
                        context.lineCap = "round";
                        context.strokeStyle = color;
                }
            }
        }
        changeColor();
    }, [canvasRef, color])
}

export default useCanvasColorChange;
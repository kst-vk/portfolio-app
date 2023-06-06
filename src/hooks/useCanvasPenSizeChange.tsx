import { useEffect } from "react";

const useCanvasPenSizeChange = (canvasRef: React.RefObject<HTMLCanvasElement>, penSize: number) => {
    
    useEffect(() => {
        const changePenSize = () => {
            if (canvasRef.current) {
                const canvas: HTMLCanvasElement = canvasRef.current;
                const context = canvas.getContext("2d");
                if (context) {
                    context.lineWidth = penSize;
                }
            }
        }
        changePenSize();
    }, [canvasRef, penSize])
}

export default useCanvasPenSizeChange;
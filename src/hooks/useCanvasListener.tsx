import { useEffect } from "react";

const useCanvasListener = (canvasRef: React.RefObject<HTMLCanvasElement>, isIdle: React.MutableRefObject<boolean>) => {
    
    function getStrokeVector (event: MouseEvent, canvas: HTMLCanvasElement) {
        return [event.pageX - canvas.offsetLeft,
        event.pageY - canvas.offsetTop] as [number, number]
    }

    useEffect(() => {
        const canvas: HTMLCanvasElement|null = canvasRef.current;
        const context = canvas?.getContext("2d");
        function drawStart(event: MouseEvent) {
            if (canvas && context) {
                context.beginPath();
                context.moveTo(
                    ...getStrokeVector(event, canvas)
                );
                drawMove(event);
                isIdle.current = false;
            }
        }
        const drawEnd = () => {
            isIdle.current = true;
        }
        

        const drawMove = (event: MouseEvent) => {
            if (isIdle.current) return;
            if (canvas && context) {
                context.lineTo(
                    ...getStrokeVector(event, canvas)
                );
                context.stroke();
            }
        }
     
        const addListeners = () => {
            if (canvas) {
                canvas.addEventListener("mousedown", drawStart, false);
                canvas.addEventListener("mousemove", drawMove, false);
                canvas.addEventListener("mouseup", drawEnd, false);
                
                return () => {
                    canvas.removeEventListener('mousedown', drawStart)
                    canvas.removeEventListener('mousemove', drawMove)
                    canvas.removeEventListener('mouseup', drawEnd)
                }
            }
        }
        addListeners();
    }, [canvasRef, isIdle]);
}

export default useCanvasListener;
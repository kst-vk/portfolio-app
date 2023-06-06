import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { LayersModel, Tensor3D } from "@tensorflow/tfjs";

import "../styles/Base.scss";
import * as tensorUtils from '../utils/tensorUtils';

export default function NumberRecognizer(props: { canvas: any }) {

  const [prediction, setPrediction] = useState(0);
  const [model, setModel] = useState<LayersModel | null>(null);
  const smallCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    (async () => {
      if (!model) {
        let loadedModel: LayersModel;
        try {
          loadedModel = await tf.loadLayersModel('https://raw.githubusercontent.com/ixartz/handwritten-digit-recognition-tensorflowjs/master/public/classifiers/model.json'); //I decided to borrow this model since my own is struggling with recognizing 9s.
        } catch (error) {
          console.log('Model loading error: ' + error + '\nFalling back to the saved one');
          loadedModel = await tf.loadLayersModel('http://' + window.location.host + '/models/digit-recognition-model/digit-recognition-model.json'); //here's my model just in case
        }
        setModel(loadedModel!);
      }
    })();
  }, [model]);

  const makePrediction = useCallback(
    async function MakePrediction(canvas: any, model: LayersModel) {
      tf.engine().startScope();
      const canvasTensor = tf.browser.fromPixels(canvas.current, 1);
      const resizedCanvasTensor = tensorUtils.getResizedTensor(canvasTensor);
      displayComparisonTensor(resizedCanvasTensor);
      const results = tensorUtils.getResultsFromCanvasTensor(model, resizedCanvasTensor);
      results.then(res => { displayResults(res); tf.dispose([res]) });
      tf.dispose([canvasTensor, resizedCanvasTensor]);
      tf.engine().endScope();

      function displayComparisonTensor(tensor: Tensor3D) {
        tf.browser.toPixels(tensor, smallCanvasRef.current as HTMLCanvasElement);
      }

      function displayResults(predictions: Number[]) {
        setPrediction(predictions.reduce(pickIndexOfMaxValue, 0))

        function pickIndexOfMaxValue(indexOfMaxValue: number, currentValue: Number, currentIndex: number, arr: Number[]) {
          return currentValue > arr[indexOfMaxValue] ? currentIndex : indexOfMaxValue;
        }
      }
    }
    , []);

  return (
    <div>
      <button onClick={() => { tf.tidy(() => { makePrediction(props.canvas, model!) }) }}>Predict</button>
      <h1>{prediction}</h1>
      <canvas width={28} height={28} ref={smallCanvasRef}></canvas>
    </div>
  )
}

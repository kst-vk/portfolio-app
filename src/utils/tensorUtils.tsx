import * as tf from "@tensorflow/tfjs";
import { LayersModel, Tensor3D } from "@tensorflow/tfjs";

export function getResizedTensor(tensor: Tensor3D) {
    return tf.tidy(() => {
      const resizedTensor = tf.image.resizeNearestNeighbor(
        tensor,
        [28, 28],
        true
      );
      return resizedTensor;
    });
  }

 export async function getResultsFromCanvasTensor(model: LayersModel, tensor: Tensor3D) {
    const normalizedTensor  = tensor.dataSync().map((x) => {return x / 255});
    const threeDTensor = tf.tensor3d(normalizedTensor, [28, 28, 1]);
    const expandedTensor =  threeDTensor.expandDims();
    const results = model.predict(expandedTensor);
    // @ts-expect-error
    const predictions = await results.array();
    tf.dispose([tensor, normalizedTensor, threeDTensor, expandedTensor, results, predictions]);
    return predictions[0];
  }
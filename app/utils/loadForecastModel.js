import * as tf from '@tensorflow/tfjs';

class LoadForecastModel {
  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({units: 32, inputShape: [5], activation: 'relu'}));
    this.model.add(tf.layers.dense({units: 16, activation: 'relu'}));
    this.model.add(tf.layers.dense({units: 1}));
    this.model.compile({loss: 'meanSquaredError', optimizer: tf.train.adam(0.01)});
  }

  async train(inputs, outputs) {
    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs);
    await this.model.fit(xs, ys, {epochs: 200, verbose: 0});
  }

  predict(input) {
    const prediction = this.model.predict(tf.tensor2d([input]));
    return prediction.dataSync()[0];
  }
}

export default LoadForecastModel;
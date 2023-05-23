export enum ActivationFunction {
  STEP_FUNCTION,
  BIPOLAR_STEP_FUNCTION,
  SIGMOID_FUNCTION,
  RELU_FUNCTION,
  TANH_FUNCTION,
  SOFTMAX_FUNCTION,
}

export const ActivationFunctions = {
  [ActivationFunction.STEP_FUNCTION]: (x: number) => (x >= 0 ? 1 : 0),
  [ActivationFunction.BIPOLAR_STEP_FUNCTION]: (x: number) => (x < 0 ? -1 : 1),
  [ActivationFunction.SIGMOID_FUNCTION]: (x: number) => 1 / (1 + Math.exp(-x)),
  [ActivationFunction.RELU_FUNCTION]: (x: number) => Math.max(0, x),
  [ActivationFunction.TANH_FUNCTION]: (x: number) => Math.tanh(x),
  [ActivationFunction.SOFTMAX_FUNCTION]: (x: number) => Math.exp(x),
};

export class PerceptronInput {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class Output {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

class Perceptron {
  activation_function: ActivationFunction;
  bias: number;
  errors: number[];
  learning_rate: number;
  num_inputs: number;
  p_inputs: PerceptronInput[];
  p_output: Output;
  testResults: number[];
  weights: number[];

  constructor(
    num_inputs: number,
    learning_rate: number,
    activation_function_index: number,
    names: string[]
  ) {
    this.errors = [];
    this.bias = 0;
    this.p_output = new Output(names[names.length - 1], 0);
    this.num_inputs = num_inputs;
    this.learning_rate = learning_rate;
    this.activation_function = activation_function_index as ActivationFunction;
    this.weights = new Array(num_inputs).fill(0);
    // this.p_inputs = new Array(num_inputs).fill(new Input("", 0));
    this.p_inputs = new Array(num_inputs)
      .fill(null)
      .map((_, index) => new PerceptronInput(names[index], 0));
    this.generateRandomWeights();
    this.testResults = [];
  }

  generateRandomWeights(): void {
    for (let i = 0; i < this.num_inputs; i++) {
      this.weights[i] = Math.random() * 2 - 1;
    }
  }

  updateWeights(error: number): void {
    this.bias += this.learning_rate * error;
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.learning_rate * error * this.p_inputs[i].value;
    }
  }

  train(
    inputs: PerceptronInput[][],
    outputs: Output[],
    testInputs: PerceptronInput[][],
    testOutputs: Output[],
    max_epochs: number
  ): void {
    let epoch = 0;
    let global_error: number;
    do {
      global_error = 0;
      for (let i = 0; i < inputs.length; i++) {
        this.p_inputs = inputs[i];
        let output = outputs[i].value;
        let weight_sum = 0;
        for (
          let weight_number = 0;
          weight_number < this.p_inputs.length;
          weight_number++
        ) {
          weight_sum +=
            this.p_inputs[weight_number].value * this.weights[weight_number];
        }
        this.p_output.value = ActivationFunctions[this.activation_function](
          weight_sum + this.bias
        );
        let error = output - this.p_output.value;
        global_error += error * error;
        if (output !== this.p_output.value) {
          this.updateWeights(error);
        }
      }
      this.testResults.push(this.test(testInputs, testOutputs));
      epoch++;
      this.errors.push(global_error);
    } while (global_error > 0.001 && epoch < max_epochs);
  }

  test(inputs: PerceptronInput[][], outputs: Output[]): number {
    let correctPredictions = 0;
    for (let i = 0; i < inputs.length; i++) {
      this.p_inputs = inputs[i];
      let output = outputs[i].value;
      let prediction = this.predict(this.p_inputs);
      if (Math.round(prediction) === output) {
        correctPredictions++;
      }
    }
    return correctPredictions / inputs.length;
  }

  predict(input: PerceptronInput[]): number {
    let weight_sum = 0;
    for (let weight_number = 0; weight_number < input.length; weight_number++) {
      weight_sum += input[weight_number].value * this.weights[weight_number];
    }
    return ActivationFunctions[this.activation_function](
      weight_sum + this.bias
    );
  }

  reset(): void {
    this.bias = 0;
    this.errors = [];
    this.generateRandomWeights();
    this.testResults = [];
    this.weights.fill(0);
  }
}

export default Perceptron;

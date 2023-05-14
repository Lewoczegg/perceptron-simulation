enum ActivationFunction {
  STEP_FUNCTION,
  BIPOLAR_STEP_FUNCTION,
  SIGMOID_FUNCTION,
  RELU_FUNCTION,
  TANH_FUNCTION,
  SOFTMAX_FUNCTION,
}

const ActivationFunctions = {
  [ActivationFunction.STEP_FUNCTION]: (x: number) => (x >= 0 ? 1 : 0),
  [ActivationFunction.BIPOLAR_STEP_FUNCTION]: (x: number) => (x < 0 ? -1 : 1),
  [ActivationFunction.SIGMOID_FUNCTION]: (x: number) => 1 / (1 + Math.exp(-x)),
  [ActivationFunction.RELU_FUNCTION]: (x: number) => Math.max(0, x),
  [ActivationFunction.TANH_FUNCTION]: (x: number) => Math.tanh(x),
  [ActivationFunction.SOFTMAX_FUNCTION]: (x: number) => Math.exp(x),
};

const uniqueStrings = (strings: string[]): string[] => {
  const uniqueStrings = Array.from(new Set(strings));
  return uniqueStrings;
};

class Input {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

class Output {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

class Perceptron {
  num_inputs: number;
  p_output: Output;
  p_inputs: Input[];
  weights: number[];
  errors: number[];
  activation_function: ActivationFunction;
  learning_rate: number;
  bias: number;

  constructor(
    num_inputs: number,
    learning_rate: number,
    activation_function: ActivationFunction,
    names: string[]
  ) {
    this.errors = [];
    this.bias = 0;
    this.p_output = new Output(names[names.length - 1], 0);
    this.num_inputs = num_inputs;
    this.learning_rate = learning_rate;
    this.activation_function = activation_function;
    this.weights = new Array(num_inputs).fill(0);
    this.p_inputs = new Array(num_inputs).fill(new Input("", 0));
    this.generateRandomWeights();
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

  train(inputs: Input[][], outputs: Output[], max_epochs: number): void {
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
      epoch++;
      this.errors.push(global_error);
    } while (global_error > 0.001 && epoch < max_epochs);
  }

  predict(input: Input[]): number {
    let weight_sum = 0;
    for (let weight_number = 0; weight_number < input.length; weight_number++) {
      weight_sum += input[weight_number].value * this.weights[weight_number];
    }
    return ActivationFunctions[this.activation_function](
      weight_sum + this.bias
    );
  }
}

const main = (data: string) => {
  let inputs: Input[][] = [];
  let outputs_string: string[] = [];
  let outputs: Output[] = [];
  let lines = data.split(/\r?\n/);
  let names: string[] = [];

  const firstLine = lines[0].split(",");
  if (isNaN(Number(firstLine[0]))) {
    firstLine.forEach((name) => names.push(name));
    lines = lines.slice(1);
  } else {
    for (let i = 0; i < firstLine.length - 1; i++) {
      names.push(`Input ${i}`);
    }
    names.push("Output");
  }

  const n: number = firstLine.length - 1;

  lines.forEach((line) => {
    const values = line.split(",");
    if (values.length >= n + 1) {
      const input = values
        .slice(0, n)
        .map((v, i) => new Input(names[i], Number(v)));
      const output = values[n];
      inputs.push(input);
      outputs_string.push(output);
    }
  });

  const uniqueOutputs = uniqueStrings(outputs_string);
  const outputMap: { [key: string]: number } = {};
  uniqueOutputs.forEach((output, i) => {
    outputMap[output] = i;
  });

  outputs = outputs_string.map(
    (output) => new Output(names[names.length - 1], outputMap[output])
  );

  const perceptron = new Perceptron(
    n,
    0.1,
    ActivationFunction.SIGMOID_FUNCTION,
    names
  );
  perceptron.train(inputs, outputs, 100);

  console.log(perceptron);
};

export default main;

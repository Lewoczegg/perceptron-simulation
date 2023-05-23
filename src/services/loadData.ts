import { PerceptronInput, Output } from "./perceptron";

const uniqueStrings = (strings: string[]): string[] => {
  const uniqueStrings = Array.from(new Set(strings));
  return uniqueStrings;
};

const splitData = (
  inputs: PerceptronInput[][],
  outputs: Output[],
  splitRatio: number
) => {
  const trainSize = Math.floor(inputs.length * splitRatio);
  const indices = [...Array(inputs.length).keys()];
  const trainIndices = indices.slice(0, trainSize);
  const testIndices = indices.slice(trainSize);
  const trainInputs = trainIndices.map((i) => inputs[i]);
  const testInputs = testIndices.map((i) => inputs[i]);
  const trainOutputs = trainIndices.map((i) => outputs[i]);
  const testOutputs = testIndices.map((i) => outputs[i]);
  return { trainInputs, testInputs, trainOutputs, testOutputs };
};

const loadData = (data: string, splitRatio: number) => {
  let inputs: PerceptronInput[][] = [];
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
        .map((v, i) => new PerceptronInput(names[i], Number(v)));
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

  const { trainInputs, testInputs, trainOutputs, testOutputs } = splitData(
    inputs,
    outputs,
    splitRatio
  );

  return { trainInputs, testInputs, trainOutputs, testOutputs, n, names };
};

export default loadData;

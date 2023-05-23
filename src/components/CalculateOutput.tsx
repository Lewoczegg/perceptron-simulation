import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import Perceptron, { PerceptronInput } from "../services/perceptron";

interface Props {
  perceptron: Perceptron;
}

const CalculateOutput = ({ perceptron }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const onSubmit = (data: FieldValues) => {
    const inputs = [];
    for (let i = 0; i < perceptron.num_inputs; i++) {
      const input = new PerceptronInput(
        perceptron.p_inputs[i].name,
        data[perceptron.p_inputs[i].name]
      );
      inputs.push(input);
    }
    const output = perceptron.predict(inputs).toFixed(4);
    toast({
      title: "Predicted Output:",
      description: output,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        width={{ base: "100px", md: "200px" }}
        colorScheme="teal"
        onClick={onOpen}
        whiteSpace="pre-line"
      >
        Calculate Output
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Calculate Output</DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              {perceptron.p_inputs.map((input, index) => (
                <FormControl key={index} mb={1}>
                  <FormLabel>{input.name}</FormLabel>
                  <Input
                    type="number"
                    step="0.01"
                    {...register(input.name, { required: true })}
                  />
                  {errors[input.name]?.type === "required" && (
                    <Text color="red">Required</Text>
                  )}
                </FormControl>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="teal" type="submit">
                Calculate
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CalculateOutput;

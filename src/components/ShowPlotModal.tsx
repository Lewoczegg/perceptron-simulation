import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import ErrorPlot from "./ErrorPlot";

interface Props {
  errors: number[];
}

const ShowPlotModal = ({ errors }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalSize = useBreakpointValue({
    base: "xl",
    md: "2xl",
    xl: "4xl",
  });

  return (
    <>
      <Button width="200px" colorScheme="teal" onClick={onOpen}>
        Show Plot
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error Plot</ModalHeader>
          <ModalCloseButton />
          <ModalBody height="600px" width="100%">
            <ErrorPlot errors={errors} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowPlotModal;

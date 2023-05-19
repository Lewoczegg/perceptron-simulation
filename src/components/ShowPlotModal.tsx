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
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import ErrorPlot from "./ErrorPlot";
import TestAccuracyPlot from "./TestAccuracyPlot";

interface Props {
  errors: number[];
  accuracy: number[];
}

const ShowPlotModal = ({ errors, accuracy }: Props) => {
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
          <ModalHeader display="flex" justifyContent="center">
            Graphs
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody height="600px" width="100%">
            <Tabs isFitted variant="line">
              <TabList>
                <Tab>Train errors</Tab>
                <Tab>Test accuracy</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ErrorPlot errors={errors} />
                </TabPanel>
                <TabPanel>
                  <TestAccuracyPlot accuracy={accuracy} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowPlotModal;

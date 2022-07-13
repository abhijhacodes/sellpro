import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";

const PublisherModal = ({ isOpen, onClose, publisher }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="gray.800">
        <ModalHeader
          alignSelf="center"
          color="white"
          borderBottom="2px solid #120E43"
        >
          Publisher Details
        </ModalHeader>
        <ModalCloseButton
          colorScheme="white"
          variant="filled"
          onClick={onClose}
        />
        <ModalBody>
          <VStack spacing="4">
            <Text>Name: {publisher.firstname + " " + publisher.lastname}</Text>
            <Text>Email: {publisher.email}</Text>
            <Button
              size="sm"
              colorScheme="teal"
              width="40%"
              as="a"
              href={`mailto:${publisher.email}`}
            >
              Contact
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            colorScheme="teal"
            size="sm"
            borderRadius="md"
            variant="outline"
            _hover={{
              backgroundColor: "green.800",
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublisherModal;

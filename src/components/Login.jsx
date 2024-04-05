import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

const Login = ({ onLogin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Login</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Login
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;

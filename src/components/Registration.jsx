import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

const Registration = ({ onRegistration }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    onRegistration(userData);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Create Account</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>First Name</FormLabel>
                <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Phone</FormLabel>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Create Account
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Registration;

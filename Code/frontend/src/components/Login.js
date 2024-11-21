/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik  */

import { useState } from "react"
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button
} from "@chakra-ui/react"
import React from 'react';

const Login = (props) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const handleUserName = (e) => {
    setUserName(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    props.handleLogin(userName, password);
  }

  const handleSignup = (e) => {
    e.preventDefault(); 
    props.handleSignup(userName, password);
  }

  const handleClose = () => {
    props.toggleLoginModal();
  }

  return (
    <>
      <Modal isOpen={true} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>LOG IN</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input onChange={handleUserName} placeholder='User name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handlePassword} placeholder='Password' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSignup} colorScheme='blue' mr={3}>
              Sign up
            </Button>
            <Button onClick={handleLogin}>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login;

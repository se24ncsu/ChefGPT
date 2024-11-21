'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading
} from '@chakra-ui/react'
import logo from '../Images/logo.png';
import React from 'react';

const NavLink = (props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function Nav(props) {

  return (
    <Box bg="#F0F4EC" color={"black"} mb={5} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box pl={5}>
          <div style={{ display: 'flex', alignItems: 'center', columnGap: 10 }}>
            <img src={logo} style={{ height: 50 }} />
            <div style={{ 
                fontSize: 32, 
                fontWeight: '600', 
                color: '#4CAF50', 
                fontFamily: "'Segoe UI', sans-serif",
                letterSpacing: '1px',
                textShadow: '1px 1px 3px rgba(76, 175, 80, 0.3)', 
                padding: '10px',
                borderRadius: '8px'
            }}>
                CookSmart
            </div>
          </div>
        </Box>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {props.userLoggedIn && props.currentUser ? (
              <Menu>
                <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                  <Avatar size={"sm"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    <Avatar size={"xl"} src={"https://avatars.dicebear.com/api/male/username.svg"} />
                  </Center>
                  <Center>
                    <p>{props.currentUser.email}</p>
                  </Center>
                  <MenuDivider />
                  <MenuItem onClick={props.handleBookMarks}>Bookmarks</MenuItem>
                  <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button onClick={props.toggleLoginModal}>Login</Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}

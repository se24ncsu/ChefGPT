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
  Heading,
  Link,
  IconButton,
} from '@chakra-ui/react'
import logo from '../Images/logo.png';
import React from 'react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

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
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Box bg={useColorModeValue("#F0F4EC", "gray.800")} color={useColorModeValue("black", "white")} mb={5} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box pl={5}>
        <Link href='/'>
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
          </Link>
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
          <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="lg"
              color={useColorModeValue("gray.600", "yellow.400")}
              _hover={{
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
            />
            {props.userLoggedIn && props.currentUser ? (
              <Menu>
                <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                  <Avatar  src={"https://api.dicebear.com/9.x/bottts/svg?baseColor=ffb300"} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <Center>
                    <Avatar size={"xl"} src={"https://api.dicebear.com/9.x/bottts/svg?baseColor=ffb300"} />
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

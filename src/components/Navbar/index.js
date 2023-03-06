import React from 'react';
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Text
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthService } from '../../services';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  let token = JSON.parse(localStorage.getItem('token'));
  let name = JSON.parse(localStorage.getItem('name'));
  const history = useHistory();

  const handleLogout = () => {
    const authService = new AuthService();
    authService
      .logout()
      .then((data) => {
        localStorage.removeItem('token');
        localStorage.removeItem('roleId');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        history.push('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
        mb={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Toko Online Home Page"
              display="flex"
              alignItems="center"
            >
              <FaStore fontSize={21} />

              <VisuallyHidden>Toko Online Sederhana</VisuallyHidden>
            </chakra.a>
            <Link to="/">
              <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                Toko Online Sederhana
              </chakra.h1>
            </Link>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              {!token ? (
                <>
                <Link to={'/login'}>
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to={'/signup'}>
                    <Button  colorScheme={"teal"}>Register</Button>
                  </Link>
                </>
              ) : (
                <>
                <Text mr={4}>Hi, {name}, Selamat Belanja!</Text>
                <Button onClick={() => handleLogout()} colorScheme="red">
                  Logout
                </Button>
                </>
              )}
            </HStack>

            <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: 'inherit',
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                {!token ? (
                  <>
                    <Link to={'/login'}>
                      <Button variant="ghost">Sign in</Button>
                    </Link>
                  </>
                ) : (
                  <Button onClick={() => handleLogout()} colorScheme="red">
                    Logout
                  </Button>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default Navbar;

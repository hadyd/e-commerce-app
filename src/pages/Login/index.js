import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { PasswordField } from '../../components';
import { AuthService } from '../../services';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { Background } from '../../assets';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onLogin = () => {
    const authService = new AuthService();

    authService
      .login({ email, password })
      .then((data) => {
        history.push('/');
        localStorage.setItem('token', JSON.stringify(data?.accessToken));
        localStorage.setItem('roleId', JSON.stringify(data?.role_id));
        localStorage.setItem('userId', JSON.stringify(data?.user_id));
        localStorage.setItem('name', JSON.stringify(data?.name));
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.msg,
        });
      });
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundImage={Background}
      backgroundSize="cover"
    >
      <Container
        maxWidth={'md'}
        py={{ base: '12', md: '24' }}
        px={{ base: '4', sm: '8' }}
      >
        <Stack spacing="8">
          <Box
            py={{ base: '8', sm: '8' }}
            px={{ base: '5', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'md', sm: 'md' }}
            borderRadius={{ base: 'xl', sm: 'xl' }}
            backgroundColor={'white'}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <Stack spacing="6">
                  <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: 'lg', md: 'sm', lg: 'lg' }}>
                      Login
                    </Heading>
                  </Stack>
                </Stack>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </FormControl>
                <PasswordField
                  label="Password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Stack>
              <Stack spacing="6">
                <Button colorScheme={'teal'} onClick={() => onLogin()}>
                  Login
                </Button>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don't have an account?</Text>
                  <Link to={'/signup'}>
                    <Button variant="link" colorScheme="blue">
                      Sign up
                    </Button>
                  </Link>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>

    /* <Container
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
        
          <Stack spacing="6">
            <Stack spacing="5">
            <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm', lg: 'lg' }}>Log in</Heading>
          </Stack>
        </Stack>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </FormControl>
              <PasswordField
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Stack>
            <Stack spacing="6">
              <Button colorScheme={'teal'} onClick={() => onLogin()}>
                Sign in
              </Button>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Button variant="link" colorScheme="blue">
                  Sign up
                </Button>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container> */
  );
};
export { Login };

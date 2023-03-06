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
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { PasswordField } from '../../components';
import { AuthService } from '../../services';
import Swal from 'sweetalert2';
import { Link, useHistory } from 'react-router-dom';
import { Background } from '../../assets';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();
  const roleId = 2;

  const onLogin = () => {
    const authService = new AuthService();

    authService
      .register({
        name,
        email,
        password,
        confPassword,
        address,
        phoneNumber,
        roleId,
      })
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Registrasi berhasil, silahkan login',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push('/login');
          }
        });
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
      <Container py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }}>
        <Stack spacing="8">
          <Box
            py={{ base: '8', sm: '8' }}
            px={{ base: '5', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'md', sm: 'md' }}
            borderRadius={{ base: 'xl', sm: 'xl' }}
            backgroundColor={'white'}
            maxHeight={'lg'}
            overflow={'auto'}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <Stack spacing="6">
                  <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: 'lg', md: 'sm', lg: 'lg' }}>
                      Register
                    </Heading>
                  </Stack>
                </Stack>
                <FormControl>
                  <FormLabel htmlFor="name">Nama</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </FormControl>
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
                <PasswordField
                  label="Konfirmasi Password"
                  onChange={(e) => setConfPassword(e.currentTarget.value)}
                />
                <FormControl>
                  <FormLabel htmlFor="email">Nomor Hp</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="addres">Addres</FormLabel>
                  <Textarea
                    id="Alamat"
                    type="text"
                    onChange={(e) => setAddress(e.currentTarget.value)}
                  />
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button colorScheme={'teal'} onClick={() => onLogin()}>
                  Sign Up
                </Button>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Already have an account?</Text>
                  <Link to="/login">
                    <Button variant="link" colorScheme="blue">
                      Login
                    </Button>
                  </Link>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};
export { SignUp };

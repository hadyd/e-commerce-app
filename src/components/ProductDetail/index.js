import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ProductService, OrderService } from '../../services';
import { formatRp } from '../../utils';

const ProductDetail = ({ productId }) => {
  const [product, setProductDetail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const userId = JSON.parse(localStorage.getItem('userId'));
  const token = JSON.parse(localStorage.getItem('token'));

  const history = useHistory();

  useEffect(() => {
    const productService = new ProductService();

    productService
      .getProductDetail(productId)
      .then((data) => {
        setProductDetail(data);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const onOrder = () => {
    if (!token) {
      Swal.fire({
        icon: 'info',
        title: 'Oopps',
        text: 'Silahkan login terlebih dahulu',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/login');
        }
      });
    }
    const orderService = new OrderService();
    let data = {
      productId: productId,
      quantity: quantity,
      price: product?.price,
      userId: userId,
      status: 0,
    };
    orderService
      .order(data)
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Produk Berhasil di Pesan',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push('/');
          }
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card py={5} shadow={'lg'}>
      <Container maxW={'7xl'}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={product?.url}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {product?.name || '-'}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >
                {formatRp(product?.price) || '-'}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <Text fontSize={'lg'}>{product?.description || '-'}</Text>
            </Stack>
            <FormControl mt={2}>
              <FormLabel>Jumlah</FormLabel>
              <NumberInput
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              onClick={() => onOrder()}
            >
              Pesan
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </Card>
  );
};

export default ProductDetail;

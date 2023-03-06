import React, { useEffect, useState } from 'react';
import { AddProduct, Footer, Hero, Navbar, Product } from '../../components';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { ProductService } from '../../services';

const Home = () => {
  const [productList, setProductList] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRefresh, setIsRefresh] = useState(0);

  let roleId = JSON.parse(localStorage.getItem('roleId'));

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProductList()
      .then((data) => {
        setProductList(data);
      })
      .catch((err) => console.log(err));
  }, [isRefresh]);

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <Navbar />
      <Hero />

      {roleId === 1 && (
        <Button colorScheme="blue" width="full" mt={2} onClick={onOpen}>
          Tambah Product
        </Button>
      )}

      <Product productList={productList} />
      <AddProduct
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />
      <Footer />
    </Box>
  );
};

export default Home;

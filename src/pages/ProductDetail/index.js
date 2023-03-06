import React from 'react';
import {
  Navbar,
  ProductDetail as ProductDetailComponent,
} from '../../components';
import { Box } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
const ProductDetail = () => {
  const history = useHistory();

  let productId = history.location.state.id;

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
      <ProductDetailComponent productId={productId} />
    </Box>
  );
};

export default ProductDetail;

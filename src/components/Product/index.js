import { Box } from '@chakra-ui/react';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import React from 'react';

const Product = ({ productList, setProductSelected, productSelected }) => {
  return (
    <Box mt={4}>
      <ProductGrid>
        {productList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            setProductSelected={setProductSelected}
            productSelected={productSelected}
          />
        ))}
      </ProductGrid>
    </Box>
  );
};

export default Product;

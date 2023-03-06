import {
  AspectRatio,
  Box,
  Button,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  CardBody,
  Card,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsFillEyeFill } from 'react-icons/bs';
import { formatRp } from '../../utils';

export const ProductCard = (props) => {
  const { product, rootProps } = props;
  const { name, url, price } = product;

  const history = useHistory();

  const handleDetail = (product) => {
    history.push('/detail/'+product?.id, {
      id: product?.id,
    });
  };

  return (
    <Card maxW="sm">
      <CardBody>
        <Stack
          spacing={{
            base: '4',
            md: '5',
          }}
          {...rootProps}
        >
          <Box position="relative">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={url}
                alt={name}
                draggable="false"
                fallback={<Skeleton />}
                borderRadius={{
                  base: 'md',
                  md: 'xl',
                }}
              />
            </AspectRatio>
          </Box>
          <Stack>
            <Stack spacing="1">
              <Text
                fontWeight="medium"
                color={useColorModeValue('gray.700', 'gray.400')}
              >
                {name}
              </Text>

              <Text
                fontWeight="medium"
                color={useColorModeValue('gray.700', 'gray.400')}
              >
                {formatRp(price)}
              </Text>
            </Stack>
          </Stack>
          <Stack align="center">
            <Button
              onClick={() => handleDetail(product)}
              colorScheme="blue"
              width="full"
            >
              Detail <BsFillEyeFill fontSize={20} style={{ marginLeft: 7 }} />
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

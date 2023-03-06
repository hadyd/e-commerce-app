import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Image, Skeleton } from '@chakra-ui/react';
import { imageHero } from './_data';

const Hero = () => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
    >
      {imageHero.map((item) => (
        <Image
          src={item.url}
          alt={item.name}
          draggable="false"
          fallback={<Skeleton />}
          borderRadius={{
            base: 'md',
            md: 'xl',
          }}
        />
      ))}
    </Carousel>
  );
};

export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Heading, Text } from '@chakra-ui/react';

const CoinCard = ({id, name, image, symbol, price, currencySymbol="₹"}) => (
  <Link to={`/coin/${id}`} rel="noopener noreferrer">
    <Box
      w="100%"
      p="4"
      shadow="lg"
      borderRadius="lg"
      transition="all 0.5"
      _hover={{
        transform: 'scale(1.05)',
      }}
    >
      <Image src={image} w="40px" h="40px" objectFit="contain" alt="Coin" mb="2" />
      <Heading size="md" mb="2" noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price? `${currencySymbol}${price}`:"NA"}</Text>
    </Box>
  </Link>
);

export default CoinCard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '..';
import { Container, Grid, Box, Heading, Text, Image } from '@chakra-ui/react';
import Loader from './Loader';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
        setLoading(false);
      }
    };

    fetchExchanges();
  }, []);

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={6} justifyContent={'space-evenly'}>
          {exchanges.map((exchange) => (
            <ExchangeCard key={exchange.id} {...exchange} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, image, trust_score_rank, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
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
      <Image src={image} w="40px" h="40px" objectFit="contain" alt="Exchange" mb="2" />
      <Heading size="md" mb="2" noOfLines={1}>
        {trust_score_rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </Box>
  </a>
);

export default Exchanges;

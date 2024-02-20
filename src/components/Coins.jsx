import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { server } from '..';
import { Container, Grid, Box, Heading, Text, Image, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from './Loader';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const[page,setPage]=useState(1);
  const[currency, setCurrency]=useState("inr");

  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";

  const changePage=(page)=>{
    setPage(page);
    setLoading(true);
  }

  const btns=new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

 

return (
  <Container maxW={'container.xl'}>
    {loading ? (
      <Loader />
    ) : (
      <>
        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={"4"}>
            <Radio value={"inr"}>₹ INR </Radio>
            <Radio value={"usd"}>$ USD </Radio>
            <Radio value={"eur"}>€ EUR </Radio>
          </HStack>
        </RadioGroup>

        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={6} justifyContent={'space-evenly'}>
          {coins.map((coin) => (
            <CoinCard 
              id={coin.id}
              key={coin.id}
              name={coin.name}
              price={coin.current_price} 
              image={coin.image}
              symbol={coin.symbol}
              currencySymbol={currencySymbol}
            />
          ))}
        </Grid>      

        <HStack w={"full"} overflowX={"auto"} p={"8"}>
          {btns.map((item, index) => (
            <Button
              key={index}
              bgColor="blackAlpha.900"
              color="white"
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </HStack>
      </>
    )}
  </Container>
);

};






export default Coins

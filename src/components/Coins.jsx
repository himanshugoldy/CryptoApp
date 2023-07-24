import { HStack,Container,RadioGroup,Radio,Button} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { server } from "../index";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]); // Initialize exchanges as an empty array
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [page,setPage] = useState(1);
  const [currency,setCurrency] = useState("inr");


  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";


  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  

  const fetchExchanges = async () => {
    try {
      const result = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      console.log(result.data);
      setCoins(result.data); // Update the state with fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coins:", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchExchanges(); // Fetch exchanges when the component mounts
  }, [currency,page]);


  if (error)
    return <ErrorComponent message={"Error While Fetching Coins"} />;

  
  const btns = new Array(132).fill(1);

  return (
  <Container maxW={"container.2xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                price = {i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol} 
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
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







export default Coins;

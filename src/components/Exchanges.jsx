import { Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import { server } from "../index";
import {
  Container,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter,Stack,Divider,ButtonGroup } from '@chakra-ui/react'

const Header = () => {
  const [exchanges, setExchanges] = useState([]); // Initialize exchanges as an empty array
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  

  const fetchExchanges = async () => {
    try {
      const result = await axios.get(`${server}/exchanges`);
      // console.log(result.data);
      setExchanges(result.data); // Update the state with fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching exchanges:", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchExchanges(); // Fetch exchanges when the component mounts
  }, []);


  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;

  return (
  <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};


const ExchangeCard = ({name,img,rank,url})=>{
  return(
    <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={name}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
  )
};




export default Header;

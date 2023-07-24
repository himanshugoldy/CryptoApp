import { Button, HStack,Container } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    // <Container maxW = {"container.2xl"}>
      <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/">Home</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/exchanges">Exchanges</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
          <Link to="/coins">Coins</Link>
        </Button>
      </HStack>
    // </Container>
  );
};

export default Header;
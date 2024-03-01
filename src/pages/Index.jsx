import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Text, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

// A simple function to check if a number is a Mersenne prime
const isMersennePrime = (p) => {
  let mersenneNumber = BigInt(2 ** p - 1);
  let s = BigInt(4);

  for (let i = 0; i < p - 2; i++) {
    s = (s ** 2n - 2n) % mersenneNumber;
  }

  return s === 0n;
};

const Index = () => {
  const [primeCandidate, setPrimeCandidate] = useState(3);
  const [mersennePrimes, setMersennePrimes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Retrieve stored Mersenne primes from localStorage
    const storedPrimes = localStorage.getItem("mersennePrimes");
    if (storedPrimes) {
      setMersennePrimes(JSON.parse(storedPrimes));
    }
  }, []);

  useEffect(() => {
    // Store Mersenne primes to localStorage
    localStorage.setItem("mersennePrimes", JSON.stringify(mersennePrimes));
  }, [mersennePrimes]);

  const handleCalculate = () => {
    if (primeCandidate < 2) {
      toast({
        title: "Error",
        description: "Enter a number greater than 2.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (isMersennePrime(primeCandidate)) {
      setMersennePrimes((prevPrimes) => [...prevPrimes, primeCandidate]);
      toast({
        title: "Success",
        description: `2^${primeCandidate} - 1 is a Mersenne prime!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Not a Prime",
        description: `2^${primeCandidate} - 1 is not a Mersenne prime.`,
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={5}>
        <Heading as="h1" size="xl">
          Mersenne Prime Generator
        </Heading>
        <Text>
          Enter a number to check if 2<sup>n</sup> - 1 is a Mersenne prime.
        </Text>
        <NumberInput min={3} value={primeCandidate} onChange={(valueString) => setPrimeCandidate(parseInt(valueString, 10))} clampValueOnBlur={false}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={handleCalculate}>
          Calculate
        </Button>
        {mersennePrimes.length > 0 && (
          <Box>
            <Heading as="h2" size="md">
              Found Mersenne Primes
            </Heading>
            <Text>{mersennePrimes.join(", ")}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;

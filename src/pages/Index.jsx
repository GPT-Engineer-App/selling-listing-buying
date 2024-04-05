import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Button, Input, Select, Image, useColorMode, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaMoon, FaSun, FaSearch } from "react-icons/fa";
import Login from "../components/Login";
import Registration from "../components/Registration";

const API_URL = "https://api.example.com"; // TODO: Replace with your API url

const Index = () => {
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.800", "white");

  useEffect(() => {
    // Fetch items for sale
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => setItems(data));

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data
      fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setMyItems(data.items);
          setPurchasedItems(data.purchased);
        });
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegistration = async (userData) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search
  };

  const handlePurchase = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/purchase/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        alert("Purchase successful!");

        const data = await res.json();
        setPurchasedItems(data.purchased);
      } else {
        alert("Purchase failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewListing = (e) => {
    e.preventDefault();
    // TODO: Implement new listing
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Flex justify="space-between" align="center" mb={8} px={4}>
        <Heading size="xl">Marketplace</Heading>
        <Flex align="center">
          {isLoggedIn ? (
            <>
              <Text mr={4}>Welcome, {user.name}</Text>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Login onLogin={handleLogin} mr={4} />
              <Registration onRegistration={handleRegistration} />
            </>
          )}
          <Button ml={4} onClick={toggleColorMode}>
            {useColorModeValue(<FaMoon />, <FaSun />)}
          </Button>
        </Flex>
      </Flex>

      <Flex direction={["column", "row"]} px={4}>
        <Box flex={1} mr={[0, 8]} mb={[8, 0]}>
          <Heading size="lg" mb={4}>
            Items for Sale
          </Heading>
          <form onSubmit={handleSearch}>
            <Flex mb={4}>
              <Input placeholder="Search items..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} mr={4} />
              <Select placeholder="Filter by zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} mr={4}>
                <option value="90210">90210</option>
                <option value="10001">10001</option>
                {/* TODO: Add more zip codes */}
              </Select>
              <Button type="submit" colorScheme="blue">
                <FaSearch />
              </Button>
            </Flex>
          </form>
          <Flex wrap="wrap">
            {items.map((item) => (
              <Box key={item.id} width={["100%", "50%", "33%"]} p={4}>
                <Box borderWidth={1} borderRadius="lg" p={4}>
                  <Image src={item.image} alt={item.title} mb={2} borderRadius="lg" />
                  <Heading size="md" mb={2}>
                    {item.title}
                  </Heading>
                  <Text mb={2}>{item.description}</Text>
                  <Text fontWeight="bold" mb={4}>
                    ${item.price}
                  </Text>
                  <Button colorScheme="green" onClick={() => handlePurchase(item.id)}>
                    Buy Now
                  </Button>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>

        {isLoggedIn && (
          <Box flex={1}>
            <Heading size="lg" mb={4}>
              My Account
            </Heading>
            <Box mb={8}>
              <Heading size="md" mb={2}>
                Profile
              </Heading>
              <Text>
                <strong>Name:</strong> {user.name}
              </Text>
              <Text>
                <strong>Email:</strong> {user.email}
              </Text>
              {/* TODO: Add more profile fields */}
            </Box>

            <Box mb={8}>
              <Heading size="md" mb={2}>
                My Listings
              </Heading>
              {myItems.map((item) => (
                <Box key={item.id} mb={4}>
                  <Text>
                    <strong>{item.title}</strong> - ${item.price}
                  </Text>
                </Box>
              ))}
              <form onSubmit={handleNewListing}>
                {/* TODO: Add new listing form fields */}
                <Button type="submit" colorScheme="blue" leftIcon={<FaPlus />}>
                  New Listing
                </Button>
              </form>
            </Box>

            <Box>
              <Heading size="md" mb={2}>
                Purchase History
              </Heading>
              {purchasedItems.map((item) => (
                <Box key={item.id} mb={4}>
                  <Text>
                    <strong>{item.title}</strong> - ${item.price}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Index;

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

  const itemsData = [
    {
      id: 1,
      title: "Item 1",
      description: "Description of Item 1",
      price: 10.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description of Item 2",
      price: 19.99,
      image: "https://via.placeholder.com/150",
    },
  ];

  const userData = {
    name: "John Doe",
    email: "john@example.com",
    items: [
      {
        id: 3,
        title: "User Item 1",
        price: 5.99,
      },
    ],
    purchased: [
      {
        id: 4,
        title: "Purchased Item 1",
        price: 8.99,
      },
    ],
  };

  useEffect(() => {
    setItems(itemsData);
    setIsLoggedIn(true);
    setUser(userData);
    setMyItems(userData.items);
    setPurchasedItems(userData.purchased);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search
  };

  const handlePurchase = (itemId) => {
    const purchasedItem = items.find((item) => item.id === itemId);
    if (purchasedItem) {
      setPurchasedItems([...purchasedItems, purchasedItem]);
      alert("Purchase successful!");
    } else {
      alert("Purchase failed");
    }
  };

  const [isNewListingOpen, setIsNewListingOpen] = useState(false);

  const handleNewListing = (e) => {
    e.preventDefault();
    setIsNewListingOpen(true);
  };

  const closeNewListing = () => {
    setIsNewListingOpen(false);
  };

  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Flex justify="space-between" align="center" mb={8} px={4}>
        <Heading size="xl">Marketplace</Heading>
        <Flex align="center">
          {isLoggedIn ? (
            <>
              <Text mr={4}>Welcome, {user.name}</Text>
              <Button onClick={() => setIsLoggedIn(false)}>Logout</Button>
            </>
          ) : null}
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
                <Box borderWidth={1} borderRadius="lg" borderColor="gray.300" p={4}>
                  <Image src={item.image} alt={item.title} mb={2} borderRadius="lg" />
                  <Heading size="md" mb={2}>
                    {item.title}
                  </Heading>
                  <Text mb={2}>{item.description}</Text>
                  <Text fontWeight="bold" mb={4}>
                    ${item.price}
                  </Text>
                  <Button colorScheme="green" borderColor="green.500" onClick={() => handlePurchase(item.id)}>
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
                <Button type="submit" colorScheme="blue" borderColor="blue.500" leftIcon={<FaPlus />} onClick={handleNewListing}>
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

      <Modal isOpen={isNewListingOpen} onClose={closeNewListing}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;

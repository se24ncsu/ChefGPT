/* MIT License

Copyright (c) 2023 Pannaga Rao, Harshitha, Prathima, Karthik */

import React, { useState, useEffect } from "react";
import { Flex, Modal, ModalBody, ModalCloseButton, ModalOverlay, ModalHeader, ModalFooter, ModalContent, Box, SimpleGrid, Text, Button } from "@chakra-ui/react";
import BookMarksRecipeCard from "./BookMarksRecipeCard";
import { fetchBookmarkedRecipes } from '../service/firestoreService';

// Component to handle displaying all bookmarked recipes
const BookMarksRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

  useEffect(() => {
    // Fetch bookmarked recipes when the component mounts
    const fetchRecipes = async () => {
      const bookmarkedRecipes = await fetchBookmarkedRecipes();
      setRecipes(bookmarkedRecipes);
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (data) => {
    setIsOpen(true);
    setCurrentRecipe(data);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box borderRadius={"lg"} border="1px" boxShadow={"10px"} borderColor={"gray.100"} fontFamily="regular" m={10} width={"94%"} p={5}>
        <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
          {recipes.length !== 0 ? recipes.map((recipe) => (
            <BookMarksRecipeCard key={recipe.recipeName} handler={handleViewRecipe} recipe={recipe} />
          )) : (
            <Text data-testid="noResponseText" fontSize={"lg"} color={"gray"}>
              No bookmarked recipes found.
            </Text>
          )}
        </SimpleGrid>
      </Box>

      {/* Modal for detailed view */}
      <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent data-testid="recipeModal">
          <ModalHeader>{currentRecipe.recipeName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box mt={4}>
                <Text><Text as={"b"}>Cooking Time: </Text> {currentRecipe.cookingTime} </Text>
              </Box>
            </Flex>
            <Text><Text as={"b"}>Instructions: </Text> {currentRecipe.ingredients} </Text>
            <Text><Text as={"b"}>Instructions: </Text> {currentRecipe.steps} </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookMarksRecipeList;
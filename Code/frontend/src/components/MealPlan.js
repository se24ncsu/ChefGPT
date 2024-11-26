import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Container,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import MealPlanDisplay from './MealPlanDisplay';
import { fetchUserPreferences } from '../service/firestoreService';

const MealPlan = () => {
  const [days, setDays] = useState();
  const [mealPlan, setMealPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleGenerateMealPlan = async () => {
    setIsLoading(true);
    try {
        const userPreferences = await fetchUserPreferences();
    if (!userPreferences) {
      toast({
        title: 'Error',
        description: 'Unable to fetch user preferences',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
      const response = await axios.post(process.env.REACT_APP_GET_MEAL_PLAN_URL, {
        userdata: userPreferences,
        days: days
      });
      setMealPlan(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate meal plan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" centerContent>
      <Box bg={bgColor} color={textColor} p={8} borderRadius="lg" boxShadow="md" w="100%">
        <VStack spacing={6} align="stretch">
          <Heading size="lg" textAlign="center">Generate Your Meal Plan</Heading>
          <NumberInput value={days} min={1} max={31} onChange={(value) => setDays(parseInt(value))}>
            <NumberInputField placeholder="Number of days" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button 
            colorScheme="blue" 
            size="md" 
            onClick={handleGenerateMealPlan}
            isLoading={isLoading}
            loadingText="Generating..."
            alignSelf="center"
          >
            Generate Meal Plan
          </Button>
          {mealPlan && <MealPlanDisplay mealPlan={mealPlan} />}
        </VStack>
      </Box>
    </Container>
  );
};

export default MealPlan;
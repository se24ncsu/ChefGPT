import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue
} from '@chakra-ui/react';

const MealPlanDisplay = ({mealPlan}) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
// const mealPlan = {
//     "mealPlan": [
//       {
//         "day": 1,
//         "meals": [
//           {"type": "breakfast", "name": "Churmuri", "ingredients": ["ingredient1", "ingredient2"], "nutritionalInfo": {"calories": "300", "protein": "300", "carbs": "300", "fat": "30"}},
//           {"type": "lunch", "name": "VadaPav", "ingredients": ["ingredient1", "ingredient2"], "nutritionalInfo": {"calories": "300", "protein": "30", "carbs": "30", "fat": "30"}},
//           {"type": "dinner", "name": "IceCreae", "ingredients": ["ingredient1", "ingredient2"], "nutritionalInfo": {"calories": "300", "protein": "30", "carbs": "30", "fat": "30"}}
//         ]
//       },
//       {
//         "day": 2,
//         "meals": [
//           {"type": "breakfast", "name": "Churmuri", "ingredients": ["ingredient1", "ingredient2"], "nutritionalInfo": {"calories": "300", "protein": "300", "carbs": "300", "fat": "30"}},
//           {"type": "lunch", "name": "VadaPav", "ingredients": ["ingredient1", "ingredient2"], "nutritionalInfo": {"calories": "300", "protein": "30", "carbs": "30", "fat": "30"}},
//           {"type": "dinner", "name": "IceCreae", "ingredients": ["ingredient1", "ingredient2"], "nutritionalInfo": {"calories": "300", "protein": "30", "carbs": "30", "fat": "30"}}
//         ]
//       }
//     ]
//   };


  return (
    <VStack spacing={4} align="stretch">
      <Heading size="lg" alignSelf="center" >Your Meal Plan</Heading>
      <Accordion allowMultiple>
        {mealPlan.mealPlan.map((day, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Day {day.day}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {day.meals.map((meal, mealIndex) => (
                <Box key={mealIndex} bg={bgColor} p={3} borderRadius="md" mb={2}>
                  <Text fontWeight="bold">{meal.type}</Text>
                  <Text>{meal.name}</Text>
                  <Text fontSize="sm" color={textColor}>
                    Calories: {meal.nutritionalInfo.calories} | Protein: {meal.nutritionalInfo.protein}g | 
                    Carbs: {meal.nutritionalInfo.carbs}g | Fat: {meal.nutritionalInfo.fat}g
                  </Text>
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
};

export default MealPlanDisplay;
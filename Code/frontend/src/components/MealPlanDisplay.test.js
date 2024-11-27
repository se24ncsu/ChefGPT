import React from 'react';
import { render } from '@testing-library/react';
import MealPlanDisplay from './MealPlanDisplay';

test('renders MealPlanDisplay component', () => {
  const mealPlan = {
    mealPlan: [
      {
        day: 1,
        meals: [
          { type: 'breakfast', name: 'Churmuri', nutritionalInfo: { calories: '300', protein: '300', carbs: '300', fat: '30' } },
          { type: 'lunch', name: 'VadaPav', nutritionalInfo: { calories: '300', protein: '30', carbs: '30', fat: '30' } },
          { type: 'dinner', name: 'IceCream', nutritionalInfo: { calories: '300', protein: '30', carbs: '30', fat: '30' } }
        ]
      }
    ]
  };

  const { getByText } = render(<MealPlanDisplay mealPlan={mealPlan} />);

  expect(getByText('Your Meal Plan')).toBeInTheDocument();
  expect(getByText('Day 1')).toBeInTheDocument();
  expect(getByText('breakfast')).toBeInTheDocument();
  expect(getByText('Churmuri')).toBeInTheDocument();
  expect(getByText('Calories: 300 | Protein: 300g | Carbs: 300g | Fat: 30g')).toBeInTheDocument();
});

test('renders multiple days correctly', () => {
  const mealPlan = {
    mealPlan: [
      {
        day: 1,
        meals: [
          { type: 'breakfast', name: 'Churmuri', nutritionalInfo: { calories: '300', protein: '300', carbs: '300', fat: '30' } }
        ]
      },
      {
        day: 2,
        meals: [
          { type: 'lunch', name: 'VadaPav', nutritionalInfo: { calories: '300', protein: '30', carbs: '30', fat: '30' } }
        ]
      }
    ]
  };

  const { getByText } = render(<MealPlanDisplay mealPlan={mealPlan} />);

  expect(getByText('Day 1')).toBeInTheDocument();
  expect(getByText('Day 2')).toBeInTheDocument();
});

test('renders meal types correctly', () => {
  const mealPlan = {
    mealPlan: [
      {
        day: 1,
        meals: [
          { type: 'breakfast', name: 'Churmuri', nutritionalInfo: { calories: '300', protein: '300', carbs: '300', fat: '30' } },
          { type: 'lunch', name: 'VadaPav', nutritionalInfo: { calories: '300', protein: '30', carbs: '30', fat: '30' } }
        ]
      }
    ]
  };

  const { getByText } = render(<MealPlanDisplay mealPlan={mealPlan} />);

  expect(getByText('breakfast')).toBeInTheDocument();
  expect(getByText('lunch')).toBeInTheDocument();
});

test('renders meal names correctly', () => {
  const mealPlan = {
    mealPlan: [
      {
        day: 1,
        meals: [
          { type: 'breakfast', name: 'Churmuri', nutritionalInfo: { calories: '300', protein: '300', carbs: '300', fat: '30' } },
          { type: 'lunch', name: 'VadaPav', nutritionalInfo: { calories: '300', protein: '30', carbs: '30', fat: '30' } }
        ]
      }
    ]
  };

  const { getByText } = render(<MealPlanDisplay mealPlan={mealPlan} />);

  expect(getByText('Churmuri')).toBeInTheDocument();
  expect(getByText('VadaPav')).toBeInTheDocument();
});

test('renders nutritional information correctly', () => {
  const mealPlan = {
    mealPlan: [
      {
        day: 1,
        meals: [
          { type: 'breakfast', name: 'Churmuri', nutritionalInfo: { calories: '300', protein: '300', carbs: '300', fat: '30' } }
        ]
      }
    ]
  };

  const { getByText } = render(<MealPlanDisplay mealPlan={mealPlan} />);

  expect(getByText('Calories: 300 | Protein: 300g | Carbs: 300g | Fat: 30g')).toBeInTheDocument();
});

test('renders no meal plan message when mealPlan is empty', () => {
  const mealPlan = { mealPlan: [] };

  const { getByText } = render(<MealPlanDisplay mealPlan={mealPlan} />);

  expect(getByText('Your Meal Plan')).toBeInTheDocument();
});
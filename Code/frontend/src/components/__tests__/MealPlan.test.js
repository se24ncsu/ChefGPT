import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MealPlan from '../MealPlan';

test('renders MealPlan component', () => {
  const { getByText, getByPlaceholderText } = render(<MealPlan />);

  expect(getByText('Generate Your Meal Plan')).toBeInTheDocument();
  expect(getByPlaceholderText('Number of days')).toBeInTheDocument();
  expect(getByText('Generate Meal Plan')).toBeInTheDocument();
});

test('handles number input change', () => {
  const { getByPlaceholderText } = render(<MealPlan />);
  const input = getByPlaceholderText('Number of days');

  fireEvent.change(input, { target: { value: '5' } });
  expect(input.value).toBe('5');
});

test('displays loading state when generating meal plan', () => {
  const { getByText } = render(<MealPlan />);
  const button = getByText('Generate Meal Plan');

  fireEvent.click(button);

  expect(button).toHaveTextContent('Generating...');
});
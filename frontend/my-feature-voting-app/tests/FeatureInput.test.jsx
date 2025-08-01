import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FeatureInput from '../components/FeatureInput';

describe('FeatureInput', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<FeatureInput onAddFeature={() => {}} />);

    // Check if the input and button are rendered
    expect(getByPlaceholderText('Enter a new feature idea...')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  it('calls onAddFeature with the input text when the button is pressed', () => {
    const mockOnAddFeature = jest.fn();
    const { getByPlaceholderText, getByText } = render(<FeatureInput onAddFeature={mockOnAddFeature} />);

    // Type text into the input field
    const input = getByPlaceholderText('Enter a new feature idea...');
    fireEvent.changeText(input, 'My New Feature');

    // Press the "Add" button
    const addButton = getByText('Add');
    fireEvent.press(addButton);

    // Check if the onAddFeature function was called with the correct text
    expect(mockOnAddFeature).toHaveBeenCalledWith('My New Feature');
  });

  it('clears the input field after the button is pressed', () => {
    const mockOnAddFeature = jest.fn();
    const { getByPlaceholderText, getByText } = render(<FeatureInput onAddFeature={mockOnAddFeature} />);

    const input = getByPlaceholderText('Enter a new feature idea...');
    fireEvent.changeText(input, 'Another Feature');

    const addButton = getByText('Add');
    fireEvent.press(addButton);

    // Check if the input field is now empty
    expect(input.props.value).toBe('');
  });
});
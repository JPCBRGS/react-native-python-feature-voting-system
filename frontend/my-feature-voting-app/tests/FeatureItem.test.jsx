import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FeatureItem from '../components/FeatureItem';

describe('FeatureItem', () => {
  it('renders correctly with feature data', () => {
    const mockItem = { id: 1, text: 'Test Feature', votes: 5 };
    const { getByText } = render(<FeatureItem item={mockItem} onUpvote={() => {}} />);

    // Check if the feature text and vote count are rendered
    expect(getByText('Test Feature')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('calls onUpvote with the correct ID when the button is pressed', () => {
    const mockOnUpvote = jest.fn();
    const mockItem = { id: 2, text: 'Another Feature', votes: 10 };
    const { getByText } = render(<FeatureItem item={mockItem} onUpvote={mockOnUpvote} />);

    // Find the upvote button and press it
    const upvoteButton = getByText('▲').parent; // The parent is the TouchableOpacity
    fireEvent.press(upvoteButton);

    // Check if the onUpvote function was called with the correct ID
    expect(mockOnUpvote).toHaveBeenCalledWith(2);
  });
});
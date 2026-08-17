import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FeedbackCard from '../FeedbackCard';

describe('FeedbackCard', () => {
  it('renders title and description properly', () => {
    const mockItem = {
      id: '1',
      type: 'bug',
      urgency: 'high',
      title: 'Login Error',
      description: 'Users cannot log in via Google OAuth',
      source: 'User Review'
    };

    render(<FeedbackCard item={mockItem} />);
    expect(screen.getByText('Login Error')).toBeDefined();
    expect(screen.getByText('Users cannot log in via Google OAuth')).toBeDefined();
  });
});
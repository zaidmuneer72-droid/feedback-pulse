import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('FeedbackPulse Main Application', () => {
  it('renders the application title and main elements correctly', () => {
    render(<App />);
    
    // Verify header title
    expect(screen.getByText('FeedbackPulse')).toBeInTheDocument();
    
    // Verify textarea input exists
    expect(
      screen.getByPlaceholderText(/paste multiple app reviews/i)
    ).toBeInTheDocument();
    
    // Verify analyze button exists
    expect(
      screen.getByRole('button', { name: /analyze feedback/i })
    ).toBeInTheDocument();
  });

  it('renders the initial mock sentiment breakdown and feedback items', () => {
    render(<App />);
    
    // Check for sentiment breakdown title
    expect(screen.getByText('Overall Sentiment Breakdown')).toBeInTheDocument();
    
    // Check for feedback action items heading
    expect(screen.getByText(/categorized action items/i)).toBeInTheDocument();
    
    // Check that mock feedback cards are displayed
    expect(screen.getByText('App crashes on toggle to Dark Mode')).toBeInTheDocument();
  });

  it('filters feedback items when sentiment filter buttons are clicked', () => {
    render(<App />);

    // Click on "Positive" filter button
    const positiveButton = screen.getByRole('button', { name: /positive/i });
    fireEvent.click(positiveButton);

    // Praise card should be visible
    expect(screen.getByText('Fast search indexing and clean layout')).toBeInTheDocument();

    // High priority bug card should be filtered out
    expect(screen.queryByText('App crashes on toggle to Dark Mode')).not.toBeInTheDocument();
  });
});
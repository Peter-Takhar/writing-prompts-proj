import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const mockPrompt1 = { Thing: 'A rusted key', Place: 'An abandoned lighthouse', Emotion: 'Longing' };
const mockPrompt2 = { Thing: 'A golden locket', Place: 'A frozen lake', Emotion: 'Hope' };

beforeEach(() => {
  let callCount = 0;
  global.fetch = jest.fn(() => {
    callCount += 1;
    const data = callCount === 1 ? mockPrompt1 : mockPrompt2;
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the Creative Writing Prompts heading', async () => {
  render(<App />);
  expect(screen.getByText('Creative Writing Prompts')).toBeInTheDocument();
});

test('displays Thing, Place, and Emotion card labels', async () => {
  render(<App />);
  expect(screen.getByText('Thing')).toBeInTheDocument();
  expect(screen.getByText('Place')).toBeInTheDocument();
  expect(screen.getByText('Emotion')).toBeInTheDocument();
});

test('shows fetched values in the cards on mount', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(mockPrompt1.Thing)).toBeInTheDocument();
    expect(screen.getByText(mockPrompt1.Place)).toBeInTheDocument();
    expect(screen.getByText(mockPrompt1.Emotion)).toBeInTheDocument();
  });
});

test('clicking Shuffle triggers a second fetch and updates cards', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByText(mockPrompt1.Thing)).toBeInTheDocument());

  await userEvent.click(screen.getByRole('button', { name: /shuffle/i }));

  await waitFor(() => {
    expect(screen.getByText(mockPrompt2.Thing)).toBeInTheDocument();
    expect(screen.getByText(mockPrompt2.Place)).toBeInTheDocument();
    expect(screen.getByText(mockPrompt2.Emotion)).toBeInTheDocument();
  });

  expect(global.fetch).toHaveBeenCalledTimes(2);
});

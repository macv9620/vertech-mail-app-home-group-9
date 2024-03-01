
import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'


import WriteEmail, { WriteEmailProps } from "../components/WriteEmail";


vi.mock('../services/messages/postMessage', () => ({
  postMessage: vi.fn().mockResolvedValue({ data: { message: 'Success' } }),
}));

describe('WriteEmail Component', () => {
test('should render the component', () => {
    const mockProps: WriteEmailProps = {
        open: true,
        onClose: vi.fn(),
        setOpen: vi.fn(),
        setOpenSnackbar: vi.fn(),
        updateGetMessages: false,
        setUpdateGetMessages: vi.fn(),
        setShowLoading: vi.fn(),
        openSnackbar: vi.fn() as unknown as ISnackbarOpen,
    };

    const { getByText } = render(<WriteEmail {...mockProps} />);
    const titleElement = getByText('New message');
    expect(titleElement).toBeInTheDocument();
});

  test('should enable send button when form is filled', () => {
    const mockProps: WriteEmailProps = {
        open: true,
        onClose: vi.fn(),
        setOpen: vi.fn(),
        setOpenSnackbar: vi.fn(),
        updateGetMessages: false,
        setUpdateGetMessages: vi.fn(),
        setShowLoading: vi.fn(),
        openSnackbar: vi.fn() as unknown as ISnackbarOpen, 
    };

    const { getByPlaceholderText, getByRole } = render(<WriteEmail {...mockProps} />);
    const toInput = getByPlaceholderText('email@vertech.com.co');
    const subjectInput = getByPlaceholderText('Subject');
    const messageInput = getByPlaceholderText('Type your message here…');
    const sendButton = getByRole('button', { name: /send/i });

    fireEvent.change(toInput, { target: { value: 'test@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Test Message' } });

    expect(sendButton).not.toBeDisabled();
  });

  test('should trigger submit action when "Send" button is clicked', async () => {
    const mockProps: WriteEmailProps = {
        open: true,
        onClose: vi.fn(),
        setOpen: vi.fn(),
        setOpenSnackbar: vi.fn(),
        updateGetMessages: false,
        setUpdateGetMessages: vi.fn(),
        setShowLoading: vi.fn(),
        openSnackbar: vi.fn() as unknown as ISnackbarOpen
    };
    
    const { getByText, getByPlaceholderText } = render(<WriteEmail {...mockProps} />);
    const toInput = getByPlaceholderText('email@vertech.com.co');
    const subjectInput = getByPlaceholderText('Subject');
    const bodyInput = getByPlaceholderText('Type your message here…');
    const sendButton = getByText('Send');

    fireEvent.change(toInput, { target: { value: 'test@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    fireEvent.click(sendButton);
    await waitFor(() => {
        expect(mockProps.setOpen).toHaveBeenCalled();
      });
  });
});

import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'


import WriteEmail, { WriteEmailProps } from "./WriteEmail";


vi.mock('../services/postMessage', () => ({
    postMessage: vi.fn().mockResolvedValue({ data: { message: 'Success' } }),
  }));

describe('WriteEmail Component', () => {
    test('should render the component', () => { 
        
        const mockProps: WriteEmailProps = {
            setOpen: vi.fn(),
            openSnackbar: {
                success: false,
                message: '',
                open: false
            },
            setOpenSnackbar: vi.fn(),
            setUpdateGetMessages: vi.fn(),
            updateGetMessages: false,
            setShowLoading: vi.fn() // Add the missing property
        };

        const { getByText } = render(<WriteEmail {...mockProps} />);
        const titleElement = getByText('New message');
        expect(titleElement).toBeInTheDocument();
    });
    /*
    test('should call setOpen when close icon is clicked', () => {
        const mockProps: WriteEmailProps = {
            setOpen: vi.fn(),
            openSnackbar: {
                success: false,
                message: '',
                open: false
            },
            setOpenSnackbar: vi.fn(),
            setUpdateGetMessages: vi.fn(),
            updateGetMessages: false
        };

        const { getByTestId } = render(<WriteEmail {...mockProps} />);
        const closeIcon = getByTestId('close-icon');
        fireEvent.click(closeIcon);
        expect(mockProps.setOpen).toHaveBeenCalled();
    });
    */

    test('should enable send button when form is filled', () => {
        const mockProps: WriteEmailProps = {
            setOpen: vi.fn(),
            openSnackbar: {
                success: false,
                message: '',
                open: false
            },
            setOpenSnackbar: vi.fn(),
            setUpdateGetMessages: vi.fn(),
            updateGetMessages: false,
            setShowLoading: vi.fn() // Add the missing property
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
            setOpen: vi.fn(),
            openSnackbar: {
                success: false,
                message: '',
                open: false
            },
            setOpenSnackbar: vi.fn(),
            setUpdateGetMessages: vi.fn(),
            updateGetMessages: false,
            setShowLoading: vi.fn() // Add the missing property
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
          }, { timeout: 5000 }); 

    });
});



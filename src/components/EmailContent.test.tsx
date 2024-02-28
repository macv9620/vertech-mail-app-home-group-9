import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect } from 'vitest'
import EmailContent from './EmailContent';


describe('EmailContent', () => {
  test('should render the component', () => {
    render(<EmailContent selectedMessage={null} />);
    const chipElement = screen.getByText(/Please select a message/i);
    expect(chipElement).toBeInTheDocument();
  });

  test('should render the component with selected message', () => {
    const selectedMessage: IMessageInfo = {
        message_id: 12345,
        color: 'blue',
        from_user_name: 'John Doe',
        created_at: '2022-01-01',
        subject: 'Test Subject',
        from_user: 'john.doe@example.com',
        to_user: 'jane.doe@example.com',
        body: 'This is a test email body',
    };
    render(<EmailContent selectedMessage={selectedMessage} />);
    const fromUserElement = screen.getByText(/From/i);
    expect(fromUserElement).toBeInTheDocument();
    const toUserElement = screen.getByText(/to/i);
    expect(toUserElement).toBeInTheDocument();
  });
  /*
  test('should open and close snackbar on reply button click', () => {
    const selectedMessage: IMessageInfo = {
        message_id: 12345,
        color: 'blue',
        from_user_name: 'John Doe',
        created_at: '2022-01-01',
        subject: 'Test Subject',
        from_user: 'john.doe@example.com',
        to_user: 'jane.doe@example.com',
        body: 'This is a test email body',
    };
    render(<EmailContent selectedMessage={selectedMessage} />);
    const replyButton = screen.getByText(/Reply/i);
    fireEvent.click(replyButton);
    const snackbarElement = screen.getByText(/Your message has been sent./i);
    expect(snackbarElement).toBeInTheDocument();
    const dismissButton = screen.getByText(/Dismiss/i);
    fireEvent.click(dismissButton);
    expect(snackbarElement).not.toBeInTheDocument();
  });

  test('should open and close snackbar on forward button click', () => {
    const selectedMessage: IMessageInfo = {
        message_id: 12345,
        color: 'blue',
        from_user_name: 'John Doe',
        created_at: '2022-01-01',
        subject: 'Test Subject',
        from_user: 'john.doe@example.com',
        to_user: 'jane.doe@example.com',
        body: 'This is a test email body',
    };
    render(<EmailContent selectedMessage={selectedMessage} />);
    const forwardButton = screen.getByText(/Forward/i);
    fireEvent.click(forwardButton);
    const snackbarElement = screen.getByText(/Your message has been forwarded./i);
    expect(snackbarElement).toBeInTheDocument();
    const dismissButton = screen.getByText(/Dismiss/i);
    fireEvent.click(dismissButton);
    expect(snackbarElement).not.toBeInTheDocument();
  });
  */
  test('should open and close snackbar on delete button click', async () => {
    const selectedMessage: IMessageInfo = {
        message_id: 12345,
        color: 'blue',
        from_user_name: 'John Doe',
        created_at: '2022-01-01',
        subject: 'Test Subject',
        from_user: 'john.doe@example.com',
        to_user: 'jane.doe@example.com',
        body: 'This is a test email body',
    };
    render(<EmailContent selectedMessage={selectedMessage} />);
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);
    const snackbarElement = screen.getByText(/Your message has been deleted./i);
    expect(snackbarElement).toBeInTheDocument();
    const dismissButton = screen.getByText(/Dismiss/i);
    fireEvent.click(dismissButton);
    await waitFor(() => {
      expect(snackbarElement).not.toBeInTheDocument();
    });
  });
});

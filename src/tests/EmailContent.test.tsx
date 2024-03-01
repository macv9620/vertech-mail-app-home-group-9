import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect } from 'vitest'
import EmailContent from '../components/EmailContent';


describe('EmailContent', () => {
  test('should render the component', () => {
    const props = {
      selectedMessage: null,
      categoriesInfo: [],
      selectedItem: '',
      updateGetMessages: true,
      setUpdateGetMessages: () => {
      },
      setSelectedMessage: () => {}, 
      showLoading: false, 
      setShowLoading: () => {},
      showSnackbar: false,
      setShowSnackbar: () => {},
      snackbarMessage: '',
      setSnackbarMessage: () => {},
      snackbarSeverity: '',
      setSnackbarSeverity: () => {},
      showSnackbarError: false,
      setShowSnackbarError: () => {},
      snackbarErrorMessage: '',
      setSnackbarErrorMessage: () => {},
      showSnackbarSuccess: false,
      setShowSnackbarSuccess: () => {},
      snackbarSuccessMessage: '',
      setSnackbarSuccessMessage: () => {},
      showSnackbarWarning: false,
      setShowSnackbarWarning: () => {},
      snackbarWarningMessage: '',
      setSnackbarWarningMessage: () => {},
      showSnackbarInfo: false,
      setShowSnackbarInfo: () => {},
      snackbarInfoMessage: '',
      setSnackbarInfoMessage: () => {},
    };
    const propsWithSnackbar = {
      ...props,
      setOpenSnackbar: () => {},
    };
    render(<EmailContent {...propsWithSnackbar} />);
    const chipElement = screen.getByText(/Please select a message/i);
    expect(chipElement).toBeInTheDocument();
  });
  
  test('should render the component with selected message', () => {
    const selectedMessage = {
      message_id: 12345,
      color: 'blue',
      from_user_name: 'John Doe',
      created_at: '2022-01-01',
      subject: 'Test Subject',
      from_user: 'john.doe@example.com',
      to_user: 'jane.doe@example.com',
      body: 'This is a test email body',
      to_user_name: 'Jane Doe',
      category_id: 1,
      category_name: 'Category Name',
    };
    render(<EmailContent
      selectedMessage={selectedMessage}
      categoriesInfo={null}
      selectedItem={""}
      updateGetMessages={false}
      setUpdateGetMessages={function (): void {
        throw new Error("Function not implemented.");
      }}
      setSelectedMessage={function (): void {
        throw new Error("Function not implemented.");
      }}
      showLoading={false}
      setShowLoading={() => {}} // Add setShowLoading property
      setOpenSnackbar={() => {}} // Add setOpenSnackbar property
    />);
    const fromUserElement = screen.getByText(/From/i);
    expect(fromUserElement).toBeInTheDocument();
    const toUserElement = screen.getByText(/to/i);
    expect(toUserElement).toBeInTheDocument();
  });
  /*
  test('should open and close snackbar on reply button click', () => {
    const selectedMessage = {
      message_id: 12345,
      color: 'blue',
      from_user_name: 'John Doe',
      created_at: '2022-01-01',
      subject: 'Test Subject',
      from_user: 'john.doe@example.com',
      to_user: 'jane.doe@example.com',
      body: 'This is a test email body',
      to_user_name: 'Jane Doe',
      category_id: 1,
      category_name: 'Category Name',
    };
    render(<EmailContent selectedMessage={selectedMessage} categoriesInfo={null} selectedItem={""} updateGetMessages={false} setUpdateGetMessages={function (value: SetStateAction<boolean>): void {
      throw new Error("Function not implemented.");
    } } setSelectedMessage={function (value: SetStateAction<IMessageInfo | null>): void {
      throw new Error("Function not implemented.");
    } } showLoading={false} />);
    const replyButton = screen.getByText(/Reply/i);
    fireEvent.click(replyButton);
    const snackbarElement = screen.getByText(/Your message has been sent./i);
    expect(snackbarElement).toBeInTheDocument();
    const dismissButton = screen.getByText(/Dismiss/i);
    fireEvent.click(dismissButton);
    expect(snackbarElement).not.toBeInTheDocument();
  });
  */
  /*
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
      to_user_name: 'Jane Doe',
      category_id: 1,
      category_name: 'Category Name',
    };
    render(<EmailContent selectedMessage={selectedMessage} categoriesInfo={null} selectedItem={""} updateGetMessages={false} setUpdateGetMessages={function (value: SetStateAction<boolean>): void {
      throw new Error("Function not implemented.");
    } } setSelectedMessage={function (value: SetStateAction<IMessageInfo | null>): void {
      throw new Error("Function not implemented.");
    } } showLoading={false} />);
    const forwardButton = screen.getByText(/Forward/i);
    fireEvent.click(forwardButton);
    const snackbarElement = screen.getByText(/Your message has been forwarded./i);
    expect(snackbarElement).toBeInTheDocument();
    const dismissButton = screen.getByText(/Dismiss/i);
    fireEvent.click(dismissButton);
    expect(snackbarElement).not.toBeInTheDocument();
  });
  */
  /*
  test('should open and close snackbar on delete button click', async () => {
    const selectedMessage = {
      message_id: 12345,
      color: 'blue',
      from_user_name: 'John Doe',
      created_at: '2022-01-01',
      subject: 'Test Subject',
      from_user: 'john.doe@example.com',
      to_user: 'jane.doe@example.com',
      body: 'This is a test email body',
      to_user_name: 'Jane Doe',
      category_id: 1,
      category_name: 'Category Name',
    };
    render(<EmailContent selectedMessage={selectedMessage} categoriesInfo={null} selectedItem={""} updateGetMessages={false} setUpdateGetMessages={function (value: SetStateAction<boolean>): void {
      throw new Error("Function not implemented.");
    } } setSelectedMessage={function (value: SetStateAction<IMessageInfo | null>): void {
      throw new Error("Function not implemented.");
    } } showLoading={false} />);
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
  */
});
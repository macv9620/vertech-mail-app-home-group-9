import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'
import EmailList from '../components/Mails';

describe('EmailList', () => {
  test('should render the component', () => {
    const messagesInfo = [
      {
        message_id: 1,
        from_user_name: 'John Doe',
        from_user: 'John Doe',
        to_user: 'Jane Smith',
        to_user_name: 'Jane Smith',
        category_id: 1,
        category_name: 'Category 1',
        color: 'blue',
        created_at: '2022-01-01',
        subject: 'Test Subject',
        body: 'Test Body',
      },
      {
        message_id: 2,
        from_user_name: 'Jane Smith',
        from_user: 'Jane Smith',
        to_user: 'John Doe',
        to_user_name: 'John Doe',
        category_id: 2,
        category_name: 'Category 2',
        color: 'red',
        created_at: '2022-01-02',
        subject: 'Another Subject',
        body: 'Another Body',
      },
    ];
    render(
      <EmailList
        messagesInfo={messagesInfo}
        setSelectedMessage={() => {}}
        selectedItem="inbox"
        userAuthEmail="a"
      />
    );
    expect(screen.getByText('Another Subject')).toBeInTheDocument();
  });
  
  test('should call setSelectedMessage and setSelectedIndex when clicked', () => {
    const setSelectedMessage = vi.fn();
    const messagesInfo: IMessageInfo[] = [
        {
            message_id: 1,
            from_user_name: 'John Doe',
            from_user: 'John Doe',
            to_user: 'Jane Smith',
            to_user_name: 'Jane Smith',
            category_id: 1,
            category_name: 'Category 1',
            color: 'blue',
            created_at: '2022-01-01',
            subject: 'Test Subject',
            body: 'Test Body',
        },
        {
            message_id: 2,
            from_user_name: 'Jane Smith',
            from_user: 'Jane Smith',
            to_user: 'John Doe',
            to_user_name: 'John Doe',
            category_id: 2,
            category_name: 'Category 2',
            color: 'red',
            created_at: '2022-01-02',
            subject: 'Another Subject',
            body: 'Another Body',
        },
    ];
    render(
        <EmailList
            messagesInfo={messagesInfo}
            setSelectedMessage={setSelectedMessage}
            selectedItem="inbox"
            userAuthEmail="a"
        />
    );
    fireEvent.click(screen.getByText('Test Subject'));
    expect(setSelectedMessage).toHaveBeenCalledWith(messagesInfo[0]);
  });
});
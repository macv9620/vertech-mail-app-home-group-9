import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect } from 'vitest'
import EmailList from '../components/Mails';


describe('EmailList', () => {

test('should render the component', () => {
    const messagesInfo: IMessageInfo[] = [
        {
            message_id: 1,
            from_user_name: 'John Doe', 
            from_user: 'John Doe',
            to_user: 'Jane Smith',
            color: 'blue',
            created_at: '2022-01-01',
            subject: 'Test Subject',
            body: 'Test Body'
        },
        {
            message_id: 2,
            from_user_name: 'Jane Smith', 
            from_user: 'Jane Smith',
            to_user: 'John Doe',
            color: 'red',
            created_at: '2022-01-02',
            subject: 'Another Subject',
            body: 'Another Body'
        }
    ];
    render(<EmailList messagesInfo={messagesInfo} setSelectedMessage={() => {}} />);
    
    expect(screen.getByText('Test Subject')).toBeInTheDocument();
    expect(screen.getByText('Another Subject')).toBeInTheDocument();
});
/*
test('should call setSelectedMessage and setSelectedIndex when clicked', () => {
    const setSelectedMessage = vi.fn();
    const setSelectedIndex = vi.fn();
    const messagesInfo: IMessageInfo[] = [
        {
            message_id: 1,
            from_user_name: 'John Doe',
            from_user: 'John Doe',
            to_user: 'Jane Smith',
            color: 'blue',
            created_at: '2022-01-01',
            subject: 'Test Subject',
            body: 'Test Body'
        },
        {
            message_id: 2,
            from_user_name: 'Jane Smith',
            from_user: 'Jane Smith',
            to_user: 'John Doe',
            color: 'red',
            created_at: '2022-01-02',
            subject: 'Another Subject',
            body: 'Another Body'
        }
    ];
    render(<EmailList messagesInfo={messagesInfo} setSelectedMessage={setSelectedMessage} setSelectedIndex={setSelectedIndex} />);
    
    
    fireEvent.click(screen.getByText('Test Subject'));
    
    expect(setSelectedMessage).toHaveBeenCalledWith(messagesInfo[0]);
    expect(setSelectedIndex).toHaveBeenCalledWith(0);
    });
    */
});
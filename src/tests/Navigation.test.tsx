import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'
import Navigation from '../components/Navigation';



describe('Navigation', () => {
  test('should render the component', () => {
    render(<Navigation selectedItem="" setSelectedItem={() => {}} setSearchTerm={() => {}} setUpdateGetMessages={() => {}} updateGetMessages={false} />);
    expect(screen.getByText('Inbox')).toBeInTheDocument();
  });

  test('should select inbox when clicked', () => {
    const setSelectedItem = vi.fn();
    render(<Navigation selectedItem="" setSelectedItem={setSelectedItem} setSearchTerm={() => {}} setUpdateGetMessages={() => {}} updateGetMessages={false} />);
    fireEvent.click(screen.getByText('Inbox'));
    expect(setSelectedItem).toHaveBeenCalledWith('inbox');
  });

  test('should select sent when clicked', () => {
    const setSelectedItem = vi.fn();
    render(<Navigation selectedItem="" setSelectedItem={setSelectedItem} setSearchTerm={() => {}} setUpdateGetMessages={() => {}} updateGetMessages={false} />);
    fireEvent.click(screen.getByText('Sent'));
    expect(setSelectedItem).toHaveBeenCalledWith('sent');
  });

  test('should clear search term and update messages when filtering by inbox', () => {
    const setSelectedItem = vi.fn();
    const setSearchTerm = vi.fn();
    const setUpdateGetMessages = vi.fn();
    const updateGetMessages = false;
    render(<Navigation selectedItem="" setSelectedItem={setSelectedItem} setSearchTerm={setSearchTerm} setUpdateGetMessages={setUpdateGetMessages} updateGetMessages={updateGetMessages} />);
    fireEvent.click(screen.getByText('Inbox'));
    expect(setSelectedItem).toHaveBeenCalledWith('inbox');
    expect(setSearchTerm).toHaveBeenCalledWith('');
    expect(setUpdateGetMessages).toHaveBeenCalledWith(!updateGetMessages);
  });

  test('should clear search term and update messages when filtering by sent', () => {
    const setSelectedItem = vi.fn();
    const setSearchTerm = vi.fn();
    const setUpdateGetMessages = vi.fn();
    const updateGetMessages = false;
    render(<Navigation selectedItem="" setSelectedItem={setSelectedItem} setSearchTerm={setSearchTerm} setUpdateGetMessages={setUpdateGetMessages} updateGetMessages={updateGetMessages} />);
    fireEvent.click(screen.getByText('Sent'));
    expect(setSelectedItem).toHaveBeenCalledWith('sent');
    expect(setSearchTerm).toHaveBeenCalledWith('');
    expect(setUpdateGetMessages).toHaveBeenCalledWith(!updateGetMessages);
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'
import Navigation from '../components/Navigation';

describe('Navigation', () => {
  test('should render the component', () => {
    render(<Navigation 
      selectedItem="" 
      setSelectedItem={() => {}} 
      setSearchTerm={() => {}} 
      setUpdateGetMessages={() => {}} 
      updateGetMessages={false} 
      categoriesInfo={[
        {
          category_id: 1,
          color: "#000",
          category_name: "Test"
        }
      ]}
      userLogged={
        {
          email: "a",
          name: "Test"
        }
      }
      setShowLoading={
        () => {}
      }
      setSelectedMessage={
        () => {}
      }
    />);
    expect(screen.getByText('Inbox')).toBeInTheDocument();
  });

  test('should select inbox when clicked', () => {
    const setSelectedItem = vi.fn();
    render(<Navigation 
      selectedItem="" 
      setSelectedItem={setSelectedItem} 
      setSearchTerm={() => {}} 
      setUpdateGetMessages={() => {}} 
      updateGetMessages={false} 
      categoriesInfo={[
        {
          category_id: 1,
          color: "#000",
          category_name: "Test"
        }
      ]}
      userLogged={
        {
          email: "a",
          name: "Test"
        }
      }
      setShowLoading={
        () => {}
      }
      setSelectedMessage={
        () => {}
      }
    />);
    fireEvent.click(screen.getByText('Inbox'));
    expect(setSelectedItem).toHaveBeenCalledWith('inbox');
  });

  test('should select sent when clicked', () => {
    const setSelectedItem = vi.fn();
    render(<Navigation 
      selectedItem="" 
      setSelectedItem={setSelectedItem} 
      setSearchTerm={() => {}} 
      setUpdateGetMessages={() => {}} 
      updateGetMessages={false} 
      categoriesInfo={[
        {
          category_id: 1,
          color: "#000",
          category_name: "Test"
        }
      ]}
      userLogged={
        {
          email: "a",
          name: "Test"
        }
      }
      setShowLoading={
        () => {}
      }
      setSelectedMessage={
        () => {}
      }
    />);
    fireEvent.click(screen.getByText('Sent'));
    expect(setSelectedItem).toHaveBeenCalledWith('sent');
  });

  test('should clear search term and update messages when filtering by inbox', () => {
    const setSelectedItem = vi.fn();
    const setSearchTerm = vi.fn();
    const setUpdateGetMessages = vi.fn();
    const updateGetMessages = false;
    render(<Navigation 
      selectedItem="" 
      setSelectedItem={setSelectedItem} 
      setSearchTerm={setSearchTerm} 
      setUpdateGetMessages={setUpdateGetMessages} 
      updateGetMessages={false} 
      categoriesInfo={[
        {
          category_id: 1,
          color: "#000",
          category_name: "Test"
        }
      ]}
      userLogged={
        {
          email: "a",
          name: "Test"
        }
      }
      setShowLoading={
        () => {}
      }
      setSelectedMessage={
        () => {}
      }
    />);
    fireEvent.click(screen.getByText('Inbox'));
    expect(setSelectedItem).toHaveBeenCalledWith('inbox');
    expect(setSearchTerm).toHaveBeenCalledWith('');
    expect(setUpdateGetMessages).toHaveBeenCalledWith(!updateGetMessages);
  });
});
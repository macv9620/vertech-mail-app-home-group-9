import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'
import Navigation from '../components/Navigation';
import * as CreateCategoryService from "../services/categories/createCategory";



describe('Navigation', () => {
  test('should render the component', () => {
    render(<Navigation 
      selectedItem="" 
      setMessagesInfo={() => {}} 
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
      setMessagesInfo={() => {}} // Add the missing setMessagesInfo property
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
      setMessagesInfo={() => {}} // Add the missing setMessagesInfo property
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
      setMessagesInfo={() => {}} // Add the missing setMessagesInfo property
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

  test('should call postUserCategory and update messages when creating a new category', () => {
    const setShowLoading = vi.fn();
    const setUpdateGetMessages = vi.fn();
    const updateGetMessages = false;
    const postUserCategory = vi.fn().mockResolvedValue({});
    vi.spyOn(CreateCategoryService, 'postUserCategory').mockImplementation(postUserCategory);

    render(<Navigation 
      selectedItem="" 
      setSelectedItem={() => {}} 
      setSearchTerm={() => {}} 
      setUpdateGetMessages={setUpdateGetMessages} 
      updateGetMessages={updateGetMessages} 
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
      setShowLoading={setShowLoading}
      setSelectedMessage={() => {}}
      setMessagesInfo={() => {}}
    />);
    (async () => {
      fireEvent.change(screen.getByPlaceholderText('Type your category name'), { target: { value: 'New Category' } });
      fireEvent.submit(screen.getByRole('button', { name: 'Create category' }));
      expect(setShowLoading).toHaveBeenCalledWith(true);
      expect(postUserCategory).toHaveBeenCalledWith({
        category_name: 'New Category',
        color: expect.any(String),
        email: 'a'
      });
      await waitFor(() => expect(setShowLoading).toHaveBeenCalledWith(false));
      expect(setUpdateGetMessages).toHaveBeenCalledWith(!updateGetMessages);
    })();
  });
});
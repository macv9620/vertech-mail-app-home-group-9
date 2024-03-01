//import { createTheme } from '@mui/system';
//import { MemoryRouter } from 'react-router-dom';
//import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe} from 'vitest'
//import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
//import Header from './Header';



describe('a', () => {
    test('should render the component', () => {
    });
    
});
/*
describe('Header', () => {
  test('should render the component', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header setSelectedItem={() => {}} selectedItem={''} />
        </ThemeProvider>
      </MemoryRouter>
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('should call logout function when Log out button is clicked', () => {
    const logoutMock = vi.fn();
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header setSelectedItem={() => {}} selectedItem={''} />
        </ThemeProvider>
      </MemoryRouter>
    );
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });

  test('should call setSelectedItem function when Inbox button is clicked', () => {
    const setSelectedItemMock = vi.fn();
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header setSelectedItem={setSelectedItemMock} selectedItem={''} />
        </ThemeProvider>
      </MemoryRouter>
    );
    const inboxButton = screen.getByText('Inbox');
    fireEvent.click(inboxButton);
    expect(setSelectedItemMock).toHaveBeenCalledWith('inbox');
  });
});
*/
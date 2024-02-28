import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from 'vitest'
import { SideDrawer } from '../components/Layout';


describe('SideDrawer', () => {
    
    test('should render the SideDrawer component', () => {
        render(<SideDrawer onClose={vi.fn()} />);
        const sideDrawerElement = screen.getByRole('button');
        expect(sideDrawerElement).toBeInTheDocument();
    });

    test('should call onClose function when clicked', () => {
        const onCloseMock = vi.fn();
        render(<SideDrawer onClose={onCloseMock} />);
        const sideDrawerElement = screen.getByRole('button');
        fireEvent.click(sideDrawerElement);
        expect(onCloseMock).toHaveBeenCalled();
    });
    
});
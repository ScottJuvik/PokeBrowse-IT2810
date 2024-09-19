import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '@components/ui/badge/Badge';
import '@testing-library/jest-dom';
import { toTitleCase } from '@/utils/text';

describe('Badge Component', () => {
    it('renders the badge component with the correct type', () => {
        render(<Badge type="fire" />);
        const badgeElement = screen.getByText(toTitleCase('fire'));
        expect(badgeElement).toBeInTheDocument();
    });

    it('applies the correct class based on the fire type', () => {
        render(<Badge type="fire" />);

        const badgeElement = screen.getByText(toTitleCase('fire'));
        expect(badgeElement.className).toMatch(/fire/);
    });

    it('applies the correct class based on the water type', () => {
        render(<Badge type="water" />);

        const badgeElement = screen.getByText(toTitleCase('water'));
        expect(badgeElement.className).toMatch(/water/);
    });

    it('applies the correct class for unknown types', () => {
        render(<Badge type="unknown" />);

        const badgeElement = screen.getByText(toTitleCase('unknown'));
        expect(badgeElement.className).toMatch(/unknown/);
    });

    it('defaults to the "unknown" badge for invalid types', () => {
        render(<Badge type="invalid-type" />);

        const badgeElement = screen.getByText('Unknown');
        expect(badgeElement).toBeInTheDocument();
        expect(badgeElement.className).toMatch(/unknown/);
    });
});

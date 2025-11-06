import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
    const mockProps = {
        name: 'Gold Standard Whey 5LB',
        brand: 'Optimum Nutrition',
        description: 'Proteína de suero de leche reconocida como una de las mejores proteínas del mercado.',
        price: '$69.990',
        oldPrice: '$79.990',
        image: '/assets/img/Gold Standard 5LB.webp',
        link: '/producto_individual2',
    };

    beforeEach(() => {
        render(<ProductCard {...mockProps} />);
    });

    it('debe mostrar el nombre del producto', () => {
        expect(screen.getByText(mockProps.name)).toBeTruthy();
    });

    it('debe mostrar la marca del producto', () => {
        expect(screen.getByText(mockProps.brand)).toBeTruthy();
    });

    it('debe mostrar la descripción del producto', () => {
        expect(screen.getByText(mockProps.description)).toBeTruthy();
    });

    it('debe mostrar el precio actual', () => {
        expect(screen.getByText(mockProps.price)).toBeTruthy();
    });

    it('debe mostrar el precio anterior tachado', () => {
        expect(screen.getByText(mockProps.oldPrice)).toBeTruthy();
    });

    it('debe tener el botón "Agregar al carrito"', () => {
        expect(screen.getByRole('button', { name: /Agregar al carrito/i })).toBeTruthy();
    });

    it('debe contener el enlace al producto individual', () => {
        const links = screen.getAllByRole('link');
        const linkMatch = links.find(link => link.getAttribute('href') === mockProps.link);
        expect(linkMatch).toBeTruthy();
    });

    it('debe mostrar la imagen del producto', () => {
        const img = screen.getByAltText(mockProps.name);
        expect(img.getAttribute('src')).toBe(mockProps.image);
    });
});

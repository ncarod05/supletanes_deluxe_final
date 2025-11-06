import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductoIndividual from '../components/ProductoIndividual';

describe('ProductoIndividual', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('agrega el producto si no está en el carrito', () => {
    const setCart = jasmine.createSpy('setCart');
    spyOn(window, 'alert');

    render(<ProductoIndividual setCart={setCart} />);
    fireEvent.click(screen.getByRole('button', { name: /agregar al carrito/i }));

    const guardado = JSON.parse(localStorage.getItem('carrito'));
    expect(guardado.length).toBe(1);
    expect(guardado[0].nombre).toBe('Prostar Whey Protein 5LB');
  });

  it('acumula cantidad al hacer múltiples clics en "Agregar al carrito"', () => {
    let carrito = [];

    const mockSetCart = (actualizador) => {
      carrito = typeof actualizador === 'function' ? actualizador(carrito) : actualizador;
    };

    spyOn(window, 'alert');

    render(<ProductoIndividual setCart={mockSetCart} />);

    const boton = screen.getByRole('button', { name: /Agregar al carrito/i });

    // Simular 3 clics
    boton.click();
    boton.click();
    boton.click();

    // Verificar que solo hay un producto
    expect(carrito.length).toBe(1);

    // Verificar que la cantidad es 3
    expect(carrito[0].cantidad).toBe(3);

    // Verificar que el nombre del producto es correcto
    expect(carrito[0].nombre).toBe("Prostar Whey Protein 5LB");
  });

  it('muestra una alerta al agregar el producto', () => {
    const setCart = jasmine.createSpy('setCart');
    spyOn(window, 'alert');

    render(<ProductoIndividual setCart={setCart} />);
    const boton = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(boton);

    expect(window.alert).toHaveBeenCalledWith('Producto agregado al carrito 🛒');
  });

  it('permite cambiar la cantidad desde el input', () => {
    render(<ProductoIndividual setCart={() => { }} />);
    const input = screen.getByLabelText(/cantidad/i);
    fireEvent.change(input, { target: { value: '5' } });
    expect(input.value).toBe('5');
  });
});
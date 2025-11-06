import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import Carrito from '../components/carrito';

describe('Carrito', () => {
    const mockCart = [
        { nombre: 'Proteína', precio: 10000, cantidad: 2 },
        { nombre: 'Creatina', precio: 5000, cantidad: 1 }
    ];

    let cart;
    let setCart;

    beforeEach(() => {
        cart = [...mockCart];
        setCart = jasmine.createSpy('setCart').and.callFake(fn => {
            cart = typeof fn === 'function' ? fn(cart) : fn;
        });
        render(<Carrito cart={cart} setCart={setCart} />);
    });

    it('muestra productos en el carrito', () => {
        expect(screen.getByText('Proteína')).not.toBeNull();
        expect(screen.getByText('Creatina')).not.toBeNull();
    });

    it('actualiza cantidad de un producto', () => {
        const input = screen.getAllByRole('spinbutton')[0];
        fireEvent.change(input, { target: { value: '3' } });
        expect(setCart).toHaveBeenCalled();
    });

    it('elimina un producto', () => {
        const eliminarBtn = screen.getByLabelText('Eliminar Proteína');
        fireEvent.click(eliminarBtn);
        expect(setCart).toHaveBeenCalled();
    });

    it('muestra total correcto', () => {
        expect(screen.getByText('$25.000')).not.toBeNull(); // 2x10000 + 1x5000
    });

    it('vacía el carrito al comprar', () => {
        spyOn(window, 'alert');
        const comprarBtn = screen.getByText('Realizar Compra');
        fireEvent.click(comprarBtn);
        expect(window.alert).toHaveBeenCalledWith('Compra realizada con éxito 🎉');
        expect(setCart).toHaveBeenCalledWith([]);
    });

    it('muestra mensaje si el carrito está vacío', () => {
        render(<Carrito cart={[]} setCart={jasmine.createSpy('setCart')} />);
        expect(screen.getByText('Tu carrito está vacío.')).not.toBeNull();
    });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('muestra el nombre del usuario si está logeado', () => {
    const mockUser = { nombre: 'Juan', email: 'juan@mail.com' };
    localStorage.setItem('loggedUser', JSON.stringify(mockUser));

    render(<Navbar cartCount={0} />);

    expect(screen.getByText('Juan')).not.toBeNull();
    expect(screen.getByText('juan@mail.com')).not.toBeNull();
  });

  it('muestra el contador del carrito correctamente', () => {
    render(<Navbar cartCount={5} />);
    expect(screen.getByText('5')).not.toBeNull();
  });

  it('permite cerrar sesión y borra el usuario', () => {
    window.__TEST_MODE__ = true;
    
    const mockUser = { nombre: 'Juan', email: 'juan@mail.com' };
    localStorage.setItem('loggedUser', JSON.stringify(mockUser));

    render(<Navbar cartCount={0} />);
    fireEvent.click(screen.getByText('Cerrar sesión'));

    expect(localStorage.getItem('loggedUser')).toBeNull();

    delete window.__TEST_MODE__;
  });

  it('muestra opcion de login si no hay usuario', () => {
    render(<Navbar cartCount={0} />);

    expect(screen.getAllByText('Iniciar Sesión')[0]).not.toBeNull();
  });
});

const API_URL = 'http://localhost:8080/api/auth';

export const authService = {
    login: async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login fallido');
            }

            const data = await response.json();

            // Guardar token y datos del usuario
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);
            }

            return data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    },

    getCurrentUser: () => {
        return {
            token: localStorage.getItem('token'),
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role')
        };
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    isAdmin: () => {
        return localStorage.getItem('role') === 'ADMIN';
    }
};
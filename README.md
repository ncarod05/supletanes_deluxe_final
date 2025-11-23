Proyecto final de Supletanes Deluxe

Se divide en dos partes:
- Backend --> Springboot
- Frontend --> React

Intrucciones para correr aplicación:
1. Clonar repositorio
2. Cambiarse al directorio donde se ubicó
3. En el bash --> npm run setup
4. Colocar wallet en: backend/src/main/resources/wallet
5. Actualizar URL de wallet en application.properties
6. En el bash --> npm start


Resumen de implementación

Backend:
- Spring Boot con Oracle Database
- Entidades: Producto, Marca, Categoria, Usuario
- Repositorios JPA
- Servicios de negocio
- Controladores REST con @CrossOrigin
- Spring Security con JWT
- Roles y permisos (ADMIN/USER)
- Swagger documentado
- CORS configurado

Frontend:
- React con axios
- Servicio de autenticación (authService.js)
- API con interceptores JWT (api.js)
- Login funcional
- Token guardado en localStorage
- Gestión de sesión persistente
- Rutas protegidas
- CRUD funcional de producto

Seguridad:
- JWT con clave segura de 256 bits
- Token expira en 24 horas
- GET públicos, POST/PUT/DELETE solo ADMIN
- Filtro JWT funcional
- Manejo de errores 401/403
- Redirección automática al expirar token

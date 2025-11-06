# supletanes_deluxe_react
Migración de nuestra página Supletanes Deluxe (HTML) a React, con implementación de pruebas unitarias por medio de Jasmine y Karma + Babel y Webpack.

Integrantes:
- Nicolas Caro
- Francisco Olate
- Christopher Espinoza

Pasos para la ejecución:
1.- Clonar el repositorio
2.- En el bash:
      - npm install
      - npm run karma  <-- para correr las pruebas unitarias
      - npm start  <-- para ejecutar la aplicación

Revisión de reporte de cobertura de pruebas:
- Generado dentro de /coverage/index.html

Funciones y aspectos principales:
- Diseño responsivo en bootstrap
- Modularidad de componentes
- Visualización de productos y productos individuales con funciones
- Login y Registro de usuario con validaciones
- Edición de perfil con validaciones
- Manejo de tipo de usuario admin / usuario normal
- Carrito con persistencia en LocalStorage
- Gestión de productos con persistencia en LocalStorage y validaciones
- 22 pruebas unitarias de lógica, interacción y cobertura

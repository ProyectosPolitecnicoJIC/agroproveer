# Usuarios
## Casos de Uso
### UC-01: Registrar Usuario
#### Descripción
El sistema debe permitir a un usuario registrarse en la aplicación.
#### Precondiciones
- El usuario no debe estar registrado en el sistema.
- El usuario debe proporcionar un correo electrónico válido.
- El usuario debe proporcionar una contraseña.
#### Postcondiciones
- El usuario queda registrado en el sistema.
- El usuario puede iniciar sesión en la aplicación.

### UC-02: Iniciar Sesión
#### Descripción
El sistema debe permitir a un usuario iniciar sesión en la aplicación.
#### Precondiciones
- El usuario debe estar registrado en el sistema.
- El usuario debe proporcionar un correo electrónico válido.
- El usuario debe proporcionar una contraseña.
#### Postcondiciones
- El usuario inicia sesión en la aplicación.



# Productos
## Casos de Uso
### UC-01: Registrar Producto
#### Descripción
El sistema debe permitir a un usuario registrar un producto a la venta.
#### Autor
- Vendedor
#### Precondiciones
- El usuario debe proporcionar un nombre para el producto.
- El usuario debe proporcionar una descripción para el producto.
- El usuario debe proporcionar un precio para el producto.
#### Postcondiciones
- El producto queda registrado en el sistema.
- El producto puede ser consultado por otros usuarios.


### UC-02: Consultar Producto
#### Descripción
El sistema debe permitir a un usuario consultar un producto.
#### Precondiciones
- El producto debe estar registrado en el sistema.
#### Postcondiciones
- El usuario puede visualizar la información del producto.

### UC-03: Añadir producto al carrito
#### Descripción
El sistema debe permitir a un usuario(sin registrar) añadir un producto al carrito de compras.
#### Precondiciones
- El producto debe estar registrado en el sistema.
- El usuario debe proporcionar una cantidad para el producto.
#### Postcondiciones
- El producto queda añadido al carrito de compras.
- El usuario puede visualizar el producto en el carrito de compras.

### UC-04: Eliminar producto del carrito
#### Descripción
El sistema debe permitir a un usuario eliminar un producto del carrito de compras.
#### Precondiciones
- El producto debe estar añadido al carrito de compras.
#### Postcondiciones
- El producto queda eliminado del carrito de compras.

### UC-05: Realizar pedido
#### Descripción
El sistema debe permitir a un usuario realizar la compra de los productos añadidos al carrito.
#### Precondiciones
- El usuario debe tener productos añadidos al carrito.
- El usuario debe proporcionar una dirección de envío.
- El usuario debe proporcionar un método de pago.
- El usuario debe proporcionar un correo electrónico válido.
- El usuario debe proporcionar un número de teléfono válido.
- El usuario debe proporcionar un nombre completo.
- El usuario debe proporcionar una nota adicional.
#### Postcondiciones
- Se genera un pedido en el sistema.

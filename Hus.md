# Historias de Usuario (HUs)

## Módulo de Usuarios

### HU-01: Registro de Usuario

Como usuario nuevo,
quiero registrarme en la aplicación proporcionando mis datos personales,
para poder acceder a las funcionalidades de la plataforma.

#### Criterios de Aceptación:
- El sistema debe validar que el correo electrónico ingresado sea válido y no esté registrado previamente.
- El sistema debe permitir ingresar una contraseña segura.
- Al completar el registro, el usuario debe poder iniciar sesión en la aplicación.

### HU-02: Inicio de Sesión

Como usuario registrado,
quiero iniciar sesión en la aplicación con mi correo y contraseña,
para acceder a mi cuenta y utilizar sus funcionalidades.

#### Criterios de Aceptación:

- El sistema debe validar que el correo y la contraseña sean correctos.
- Si las credenciales son correctas, el usuario debe acceder a su cuenta.
- Si las credenciales son incorrectas, el sistema debe mostrar un mensaje de error.

## Módulo de Productos

### HU-03: Registro de Producto

Como vendedor,
quiero registrar un producto proporcionando su nombre, descripción y precio,
para poder ofrecerlo a los compradores.

#### Criterios de Aceptación:

- El sistema debe validar que se ingresen todos los campos requeridos.
- El producto debe quedar registrado y disponible para consulta por otros usuarios.

### HU-04: Consulta de Producto

Como usuario,
quiero visualizar la información de un producto registrado,
para conocer sus detalles antes de tomar una decisión de compra.

#### Criterios de Aceptación:

- El sistema debe permitir buscar y visualizar los productos registrados.
- Se debe mostrar la información completa del producto, incluyendo nombre, descripción y precio.

### HU-05: Añadir Producto al Carrito

Como usuario no registrado,
quiero agregar un producto al carrito de compras,
para mantenerlo en una lista temporal hasta decidir comprarlo.

#### Criterios de Aceptación:

- El sistema debe permitir seleccionar un producto y agregarlo al carrito.
- El usuario debe poder especificar la cantidad deseada.
- El sistema debe mostrar los productos agregados en el carrito.

### HU-06: Eliminar Producto del Carrito

Como usuario,
quiero eliminar un producto del carrito de compras,
para modificar mi selección antes de realizar un pedido.

#### Criterios de Aceptación:

- El sistema debe permitir eliminar productos del carrito.
- Una vez eliminado, el producto ya no debe aparecer en la lista del carrito.

### HU-07: Realizar Pedido

Como usuario,
quiero completar la compra de los productos en mi carrito proporcionando mis datos de envío y pago,
para recibir mi pedido en la dirección deseada.

#### Criterios de Aceptación:

- El sistema debe validar que el usuario proporcione una dirección de envío.
- El usuario debe seleccionar un método de pago.
- Se debe registrar la información de contacto (correo electrónico y teléfono).
- Una vez finalizada la compra, se debe generar un pedido en el sistema.

## Dockerización y Despliegue

### HU-08: Dockerizar Frontend (Angular)

Como desarrollador,
quiero contenerizar la aplicación frontend en un contenedor Docker,
para facilitar su despliegue y ejecución en distintos entornos.

#### Criterios de Aceptación:

- Debe existir un Dockerfile para construir la imagen del frontend.
- La aplicación debe poder ejecutarse dentro del contenedor sin errores.
- Se debe poder exponer el frontend en un puerto configurable.

### HU-09: Dockerizar Backend (Node.js y Spring Boot)

Como desarrollador,
quiero contenerizar los microservicios en Node.js y Spring Boot en contenedores Docker,
para simplificar su despliegue y garantizar la portabilidad.

#### Criterios de Aceptación:

- Debe existir un Dockerfile para cada microservicio.
- Los microservicios deben ser configurables mediante variables de entorno.
- Debe poder ejecutarse cada servicio independientemente dentro de su contenedor.

### HU-10: Orquestar Microservicios con Docker Compose

Como desarrollador,
quiero definir un archivo docker-compose.yml para gestionar los contenedores de la aplicación,
para poder ejecutar todos los servicios fácilmente en un solo comando.

Criterios de Aceptación:

- Debe existir un docker-compose.yml que levante frontend y backend con sus dependencias.
- La comunicación entre contenedores debe ser posible mediante redes internas de Docker.
- Se debe poder levantar toda la aplicación con docker-compose up.

## Testing

### HU-11: Pruebas Unitarias

Como desarrollador,
quiero escribir pruebas unitarias para cada componente de la aplicación,
para garantizar que el código funciona correctamente de manera aislada.

#### Criterios de Aceptación:

- Debe haber pruebas unitarias para cada servicio backend y componente frontend.
- Las pruebas deben ejecutarse de manera automatizada en un pipeline de CI/CD.
- El sistema debe proporcionar un reporte de cobertura de pruebas.

### HU-12: Pruebas de Integración

Como desarrollador,
quiero ejecutar pruebas de integración en los microservicios,
para validar la correcta comunicación entre ellos.

#### Criterios de Aceptación:

- Se deben realizar pruebas sobre las APIs de los microservicios.
- Se deben simular respuestas esperadas y casos de error.
- Se deben ejecutar las pruebas en un entorno similar a producción.

## Módulo de Análisis Estático de Código

### HU-13: Configuración de Análisis Estático

Como desarrollador,
quiero integrar herramientas de análisis estático de código en el pipeline de CI/CD,
para detectar problemas de calidad y seguridad de manera temprana.

#### Criterios de Aceptación:

- Se deben definir reglas de calidad de código basadas en estándares.
- La herramienta debe ejecutarse automáticamente en cada commit.
- El sistema debe generar un reporte con los errores y advertencias encontradas.

### HU-14: Corrección de Errores Detectados

Como desarrollador,
quiero revisar y corregir los problemas reportados por el análisis estático,
para mantener un código limpio y seguro.

#### Criterios de Aceptación:

- Se deben corregir los errores y advertencias reportados.

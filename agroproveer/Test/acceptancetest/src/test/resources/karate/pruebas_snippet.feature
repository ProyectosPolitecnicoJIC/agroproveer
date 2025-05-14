@ignore
Feature:

  Background:
    * url 'http://localhost:8096/api'

  @DeleteCategoria
  Scenario: elimina categoria
    * def input = __arg
    * def id = input.id
    * def token = input.token
    Given header Authorization = token
    And path '/categoria/eliminar/'+ id
    When method DELETE
    Then status 200


  @CreateCategoria
  Scenario: crea categoria
    * def input = __arg
    * def nombreUnico = 'Categoria-' + java.util.UUID.randomUUID()
    * def categoria =
  """
  {
    "nombre": "#(nombreUnico)",
    "descripcion": "Categoría de prueba"
  }
  """
    Given path '/categoria/save'
    And header Content-Type = 'application/json'
    And header Authorization = input.token
    And request categoria
    When method POST
    Then status 200
    * def result = { id: #(response.id), nombre: #(response.nombre) }
    * karate.log('Categoría creada con ID:', result.id)
    * match result.nombre == nombreUnico
    * eval karate.set('result', result)


  @DeleteUsuario
  Scenario:
    * def input = __arg
    * def id = input.documento
    * def token = input.token
    Given path '/usuarios/eliminar/'+ id
    And header Authorization = token
    When method DELETE
    Then status 200


  @CreateUsuario
  Scenario: Crear usuario
    * def input = __arg
    * def documentoUnico = 'USR-' + java.util.UUID.randomUUID().toString().substring(0, 8)
    * def usuario =
  """
  {
    "documento": "#(documentoUnico)",
    "nombre": "Usuario Test",
    "apellido": "Prueba",
    "correo": "usuario.test@example.com",
    "contrasena": "123456",
    "telefono": "3000000000",
    "tipoDocumento": "CC",
    "direccion": "Calle Falsa 123",
    "departamento": "Antioquia",
    "municipio": "Medellín",
    "rol": "VENDEDOR"
  }
  """
    Given path '/usuarios/save'
    And header Content-Type = 'application/json'
    And header Authorization = input.token
    And request usuario
    When method POST
    Then status 200
    * def result = { documento: #(response.documento), nombre: #(response.nombre) }
    * karate.log('Usuario creado con documento:', result.documento)
    * match result.documento == documentoUnico
    * eval karate.set('result', result)


  @DeleteProducto
  Scenario: Eliminar producto
    * def input = __arg
    * def id = input.id
    * def token = input.token
    Given header Authorization = token
    And url 'http://localhost:8096/api/producto/eliminar/' + id
    When method DELETE
    Then status 200

  @CreateProducto
  Scenario: Crear producto
    * def input = __arg
    * def uniqueNombre = 'Producto-' + java.util.UUID.randomUUID()
    * def producto =
    """
    {
      "nombre": "#(uniqueNombre)",
      "descripcion": "Descripción del producto creado",
      "precio": 1500.00,
      "imagenUrl": "https://ejemplo.com/imagen.jpg",
      "municipio": "Medellín",
      "vendedor": "100200300",
      "categoria": 2,
      "cantidadDisponible": 100
    }
    """
    Given path '/producto/save'
    And header Content-Type = 'application/json'
    And header Authorization = input.token
    And request producto
    When method POST
    Then status 200
    * def result = { id: #(response.id), nombre: #(response.nombre) }
    * karate.log('Usuario creado con documento:', result.id)
    * match result.nombre == uniqueNombre
    * eval karate.set('result', result)

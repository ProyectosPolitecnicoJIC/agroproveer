Feature: CRUD de producto

  Background:
    * url 'http://localhost:8096/api'
    * def token  = karate.get('token')
    * header Authorization = token

  @listarProductos
  Scenario: Listar todos los productos
    Given path '/producto'
    When method GET
    Then status 200
    And match each response ==
  """
    {
      id: '#number',
      nombre: '#string',
      descripcion: '#string',
      precio: '#number',
      imagenUrl: '#string',
      municipio: '#string',
      vendedor: '#string',
      categoria: '#number',
      cantidadDisponible: '#number'
   }
  """
@ProductoPorId
  Scenario Outline: Listar producto por id
    Given path '/producto/'+ id
    When method GET
    Then status 200
    And match response ==

  """
    {
      id: '#number',
      nombre: '#string',
      descripcion: '#string',
      precio: '#number',
      imagenUrl: '#string',
      municipio: '#string',
      vendedor: '#string',
      categoria: '#number',
      cantidadDisponible: '#number'
   }
  """

    Examples:
      | id  |
      | 6   |
  @ProductoNoExiste
  Scenario Outline: Obtener un producto por ID que no existe
    Given path '/producto/' + id
    When method GET
    Then status 400
    * def mensajeEsperado = 'No se encuentra registrado el producto : ' + id
    And match response == { error: '#(mensajeEsperado)' }

    Examples:
      | id    |
      | 99999 |

  @editarProducto
  Scenario: Crear y editar un producto
    * def crearProducto = call read('classpath:karate//pruebas_snippet.feature@CreateProducto') { token: #(token) }
    * def productoCreado = crearProducto.result
    * def id = productoCreado.id

    * def productoEditado =
 """
    {
      "id": #(id),
      "nombre": "Producto Editado",
      "descripcion": "Descripción actualizada del producto",
      "precio": 1800.00,
      "imagenUrl": "https://ejemplo.com/imagen_editada.jpg",
      "municipio": "Bello",
      "vendedor": "300400500",
      "categoria": 1,
      "cantidadDisponible": 200
    }
    """

    Given path '/producto/actualizar'
    And header Content-Type = 'application/json'
    And request productoEditado
    When method POST
    Then status 200
    And match response.nombre == "Producto Editado"
    And match response.descripcion == "Descripción actualizada del producto"

    * call read('classpath:karate//pruebas_snippet.feature@DeleteProducto') { id: #(id), token: #(token) }

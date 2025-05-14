Feature: crud de categoria

  Background:
    * url 'http://localhost:8096/api'
    * def token  = karate.get('token')
    * header Authorization = token

  @tag1
  Scenario: listar todas las categorias
    Given path '/categoria'
    When method GET
    Then status 200
    And match each response == { id: '#number', nombre: '#string', descripcion: '#string' }

  @tag2
  Scenario Outline: listar categoria por id
    Given path '/categoria/',id
    When method GET
    Then status 200
    And match response == { id: '#number', nombre: '#string', descripcion: '#string' }

    Examples:
      | id |
      | 4  |

  @tag3
  Scenario Outline: listar categoria por nombre
    Given path '/categoria/nombre/',nombre
    When method GET
    Then status 200
    And match response == { id: '#number', nombre: '#string', descripcion: '#string' }

    Examples:
      | nombre   |
      | Verduras |

  @tag4
  Scenario Outline: Obtener una categoría por ID que no existe
    Given path '/categoria/',id
    When method GET
    Then status 400
    And match response == {"error":"No esta registrada : 9099"}

    Examples:
      | id   |
      | 9099 |

  @tag6
  Scenario Outline: Obtener una categoría por nombre que no existe
    Given path '/categoria/nombre/',nombre
    When method GET
    Then status 400
    And match response == {"error":"No esta registrada la cateogira : CategoriaInexistente"}

    Examples:
      | nombre               |
      | CategoriaInexistente |

  @tag7
  Scenario: Crear una nueva categoría y luego eliminarla
    * def uniqueNombre = 'Categoria-' + java.util.UUID.randomUUID()
    * def categoria =
    """
    {
      "nombre": "#(uniqueNombre)",
      "descripcion": "Descripción generada automáticamente"
    }
    """
    * def createdId = null

    Given path '/categoria/save'
    And header Content-Type = 'application/json'
    And request categoria
    When method POST
    Then status 200
    * def createdId = response.id
    And match response.nombre == uniqueNombre
    * print 'El nombre es:', createdId
    * def inputs = { token: #(token), id: #(createdId) }
    * def eliminar = call read('classpath:karate/pruebas_snippet.feature@DeleteCategoria') inputs


  @editar
  Scenario: Editar una categoría existente
    * call read('classpath:karate/pruebas_snippet.feature@CreateCategoria') { token: #(token) }
    * def id = result.id
    * print 'ID creado:', id

    * def categoriaEditada =
  """
  {
    "id": #(id),
    "nombre": "Categoria-Editada",
    "descripcion": "Descripción actualizada"
  }
  """
    Given path '/categoria/actualizar'
    And header Content-Type = 'application/json'
    And request categoriaEditada
    When method POST
    Then status 200
    And match response.nombre == 'Categoria-Editada'
    And match response.descripcion == 'Descripción actualizada'

    * call read('classpath:karate/pruebas_snippet.feature@DeleteCategoria') { id: #(id), token: #(token) }



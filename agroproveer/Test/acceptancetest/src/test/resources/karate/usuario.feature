Feature: CRUD de usuario

  Background:
    * url 'http://localhost:8096/api'
    * def token  = karate.get('token')
    * header Authorization = token

  @usuariosListar
  Scenario: Listar todos los usuarios
    Given path '/usuarios'
    When method GET
    Then status 200
    And match each response ==
    """
    {
      documento: '#string',
      nombre: '#string',
      apellido: '#string',
      correo: '#string',
      contrasena: '#string',
      telefono: '#string',
      tipoDocumento: '#string',
      direccion: '#string',
      departamento: '#string',
      municipio: '#string',
      rol: '#string'
    }
    """

  @usuarios-por-documento
  Scenario Outline: Obtener un usuario por documento
    Given path '/usuarios/', documento
    When method GET
    Then status 200
    And match response ==
    """
    {
      documento: '#string',
      nombre: '#string',
      apellido: '#string',
      correo: '#string',
      contrasena: '#string',
      telefono: '#string',
      tipoDocumento: '#string',
      direccion: '#string',
      departamento: '#string',
      municipio: '#string',
      rol: '#string'
    }
    """

    Examples:
      | documento   |
      | 103687459   |
      | 123456787   |


  @usuarios-inexistente
  Scenario Outline: Obtener un usuario que no existe
    Given path '/usuarios/', documento
    When method GET
    Then status 400
    * def mensajeEsperado = 'No se encuentra registrado el usuario con documento : ' + documento
    And match response == { error: '#(mensajeEsperado)' }

    Examples:
      | documento   |
      | 999999999   |
      | 888888888   |

  @crear-editar
  Scenario: Crear y editar un usuario
    * def documento = 'USR-' + java.util.UUID.randomUUID().toString().substring(0, 8)

    * def creado = call read('classpath:karate/pruebas_snippet.feature@CreateUsuario') { token: #(token) }
    * def documentoCreado = creado.result.documento
    * print 'Documento del usuario creado:', documentoCreado

    * def usuarioEditado =
  """
  {
    "documento": "#(documentoCreado)",
    "nombre": "Usuario Editado",
    "apellido": "Actualizado",
    "correo": "usuario.editado@example.com",
    "contrasena": "nueva123",
    "telefono": "3111111111",
    "tipoDocumento": "CC",
    "direccion": "Carrera 123",
    "departamento": "Cundinamarca",
    "municipio": "Bogotá",
    "rol": "VENDEDOR"
  }
  """
    Given path '/usuarios/actualizar'
    And header Content-Type = 'application/json'
    And request usuarioEditado
    When method POST
    Then status 200
    And match response.nombre == 'Usuario Editado'
    And match response.apellido == 'Actualizado'

    * call read('classpath:karate/pruebas_snippet.feature@DeleteUsuario') {  documento: #(documentoCreado), token: #(token) }

Feature: CRUD de ventas

  Background:
    * url 'http://localhost:8096/api'
    * def token = karate.get('token')
    * header Authorization = token

  @ventas-listar
  Scenario: Listar todas las ventas
    Given path '/venta'
    When method GET
    Then status 200
    And match each response ==
    """
      {
        id: '#number',
        fechaVenta: '#string',
        nombreCompleto: '#string',
        correo: '#string',
        direccionEnvio: '#string',
        metodoPago: '#string',
        telefono: '#string',
        documento: '#string',
        tipoDocumento: '#string',
        totalPagar: '#number',
        nota: '#string',
        productosVendidos: '#[]'
      }
    """


  @ventas-por-documento
  Scenario Outline: Consultar ventas por documento
    Given path '/venta/documento', documento
    When method GET
    Then status 200
    And match each response contains
    """
      {
        documento: '#(documento)',
        nombreCompleto: '#string',
        correo: '#string',
        direccionEnvio: '#string',
        metodoPago: '#string',
        productosVendidos: '#[]'
      }
    """

    Examples:
      | documento |
      | 123456789 |
      | 123456789 |

  @ventas-no-encontradas
  Scenario Outline: Consultar ventas con documento inexistente
    Given path '/venta/documento', documento
    When method GET
    Then status 400
    * def mensajeEsperado = 'No se registro : ' + documento
    And match response == { error: '#(mensajeEsperado)' }

    Examples:
      | documento |
      | 000000000 |
      | 999999999 |

  @crear-venta
  Scenario: Crear una venta
    * def ventaRequest =
    """
    {
      "nombreCompleto": "Juan Pérez",
      "correo": "juan.perez@example.com",
      "direccionEnvio": "Carrera 12 #45-67, Bogotá",
      "metodoPago": "Tarjeta de crédito",
      "telefono": "3123456789",
      "documento": "222222222",
      "tipoDocumento": "CC",
      "totalPagar": 9000.00,
      "nota": "Por favor entregar en horario de la mañana",
      "productos": [
        {
          "productoId": 5,
          "cantidad": 20,
          "precioUnitario": 2500.00
        },
        {
          "productoId": 7,
          "cantidad": 100,
          "precioUnitario": 4000.00
        }
      ]
    }
    """
    Given path '/venta/sendVenta'
    And header Content-Type = 'application/json'
    And request ventaRequest
    When method POST
    Then status 200
    And match response contains
    """
      {
        documento: '#string',
        nombreCompleto: '#string',
        correo: '#string',
        direccionEnvio: '#string',
        metodoPago: '#string',
        productosVendidos: '#[]'
      }
    """

Feature: Eliminar categoría por ID

  Scenario:
    * def input = __arg
    * def id = input.id
    * def token = input.token
    Given header Authorization = token
    And url 'http://localhost:8096/api/categoria/eliminar/'+ id
    When method DELETE
    Then status 200

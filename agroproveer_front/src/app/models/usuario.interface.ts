export interface Usuario {
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    telefono: string;
    documento: string;
    tipoDocumento: string;
    direccion: string;
    departamento: string | undefined;
    municipio: string | undefined;
    rol: string;
}
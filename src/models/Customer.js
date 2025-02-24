class Customer {
    constructor(data) {
        this.numeroCliente = data.numeroCliente;
        this.nombre = data.nombre;
        this.cifNif = data.cifNif;
        this.direccion = data.direccion;
        this.codigoPostal = data.codigoPostal;
        this.localidad = data.localidad;
        this.pais = data.pais;
        this.email = data.email;
        this.telefono = data.telefono;
        this.movil = data.movil;
        this.nombreEmpresa = data.nombreEmpresa;
    }

    static validate(data) {
        // Validar CIF/NIF
        const nifRegex = /^[0-9]{8}[A-Z]$/;
        const cifRegex = /^[A-Z][0-9]{7}[A-Z0-9]$/;
        if (!nifRegex.test(data.cifNif) && !cifRegex.test(data.cifNif)) {
            throw new Error('CIF/NIF no es válido');
        }

        // Validar teléfono
        const telefonoRegex = /^(\+\d{1,3})?\d{9}$/;
        if (!telefonoRegex.test(data.telefono)) {
            throw new Error('Teléfono debe ser un número de 9 dígitos o incluir un prefijo internacional');
        }

        if(!telefonoRegex.test(data.movil)){
            throw new Error('Móvil debe ser un número de 9 dígitos o incluir un prefijo internacional');
        }

        // Validar código postal
        const codigoPostalRegex = /^[0-9]{5}$/;
        if (!codigoPostalRegex.test(data.codigoPostal)) {
            throw new Error('Código Postal debe ser un número de 5 dígitos');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            throw new Error('Email no es válido');
        }
    }
}

export default Customer;
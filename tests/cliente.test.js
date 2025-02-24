import { expect } from 'chai';
import Cliente from '../../src/models/Cliente.js';

describe('Cliente Model', function() {
    before(async function() {
        await sequelize.sync({ force: true });
    });

    it('should create a Cliente with valid data', async function() {
        const clienteData = {
            numeroCliente: 478,
            nombre: 'John Doe',
            cifNif: '12345678A',
            direccion: '123 Main St',
            codigoPostal: '36000',
            localidad: 'Some City',
            pais: 'Some Country',
            email: 'mail@mail.com',
            telefono: '+34123456789',
            movil: '+34123456789',
            nombreEmpresa: 'Some Company'
        };

        const cliente = await Cliente.create(clienteData);
        expect(cliente).to.have.property('id');
        expect(cliente.numeroCliente).to.equal(clienteData.numeroCliente);
        expect(cliente.nombre).to.equal(clienteData.nombre);
        expect(cliente.cifNif).to.equal(clienteData.cifNif);
        expect(cliente.direccion).to.equal(clienteData.direccion);
        expect(cliente.codigoPostal).to.equal(clienteData.codigoPostal);
        expect(cliente.localidad).to.equal(clienteData.localidad);
        expect(cliente.pais).to.equal(clienteData.pais);
        expect(cliente.email).to.equal(clienteData.email);
        expect(cliente.telefono).to.equal(clienteData.telefono);
        expect(cliente.movil).to.equal(clienteData.movil);
        expect(cliente.nombreEmpresa).to.equal(clienteData.nombreEmpresa);
    });

});
class Order {
    constructor(data) {
        this.billingDetails = data.billingDetails;
        this.shippingDetails = data.shippingDetails;
        this.products = data.products;
        this.subtotal = data.subtotal;
        this.gastosEnvio = data.gastosEnvio;
        this.tasas = data.tasas;
        this.total = data.total;
        this.metodoPago = data.metodoPago;
    }

    static validate(data) {
        // Validar CIF/NIF
        const nifRegex = /^[0-9]{8}[A-Z]$/;
        const cifRegex = /^[A-Z][0-9]{7}[A-Z0-9]$/;
        if (!nifRegex.test(data.billingDetails.cif) && !cifRegex.test(data.billingDetails.cif)) {
            throw new Error('CIF/NIF no es válido');
        }

        // Validar teléfono
        const telefonoRegex = /^(\+\d{1,3})?\d{9}$/;
        if (!telefonoRegex.test(data.billingDetails.telefono)) {
            throw new Error('Teléfono debe ser un número de 9 dígitos o incluir un prefijo internacional');
        }

        // Validar código postal
        const codigoPostalRegex = /^[0-9]{5}$/;
        if (!codigoPostalRegex.test(data.billingDetails.codigoPostal) || !codigoPostalRegex.test(data.shippingDetails.codigoPostal)) {
            throw new Error('Código Postal debe ser un número de 5 dígitos');
        }

        // Validar los productos
        data.products.forEach(product => {
            const calculatedSubtotal = product.cantidad * product.precio;
            if (product.subtotal !== calculatedSubtotal) {
                throw new Error(`El subtotal del producto ${product.codigo} no es correcto`);
            }
        });

        // Validar el subtotal de la orden
        const calculatedSubtotal = data.products.reduce((sum, product) => sum + product.subtotal, 0);
        if (data.subtotal !== calculatedSubtotal) {
            throw new Error('El subtotal de la orden no es correcto');
        }

        // Validar el total de la orden
        const calculatedTotal = data.subtotal + data.gastosEnvio + data.tasas;
        if (data.total !== calculatedTotal) {
            throw new Error('El total de la orden no es correcto');
        }
    }
}

export default Order;
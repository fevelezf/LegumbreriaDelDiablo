const mongoose = require('mongoose');

const createConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión a MongoDB lista');
        return conn;
    } catch (error) {
        console.error('Error conectando MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = createConnection;

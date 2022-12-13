const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://acadaviu:aguacatote1@ac-tl4ocda-shard-00-00.hehfhoy.mongodb.net:27017,ac-tl4ocda-shard-00-01.hehfhoy.mongodb.net:27017,ac-tl4ocda-shard-00-02.hehfhoy.mongodb.net:27017/securityBacked?ssl=true&replicaSet=atlas-1myqos-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(url);
        console.log('Star bd');
    } catch (error) {
        console.log(error);
        throw new Error('Error  connect DB')
    }
}

module.exports = {
    getConnection
}
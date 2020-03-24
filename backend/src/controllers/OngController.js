const connectionDB = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, require){
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connectionDB('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({id});
    },

    async index(request, response) {
        const ongs = await connectionDB('ongs').select('*');
        return response.json(ongs);
    }
};
const connectionDB = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        const id = generateUniqueId();
        
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
const connection = require('../database/connection');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(request, response) {
        try {
            const { descricao, codigo } = request.body;
            const token = request.headers.authorization;
            const { usuarioId } = jwt.verify(token.replace('Bearer ', ''), config.secret);

            const loggedUser = await connection('usuario')
            .where('isDeleted', false)
            .where('id', usuarioId);
            
            if (loggedUser) {
                await connection('categoria').insert({
                    // id,
                    descricao,
                    codigo
                })
            }
            return response.status(201).json({ msg: 'Categoria criada!' });
        } catch (error) {
            return response.status(401).json({ error: error });
        }
    },
    async get(request, response) {
        try {
            const token = request.headers.authorization;
            const { usuarioId } = jwt.verify(token.replace('Bearer ', ''), config.secret);

            const loggedUser = await connection('usuario')
                .where('isDeleted', false)
                .where('id', usuarioId);
            if (loggedUser) {
                const categorias = await connection('categoria')
                    .where('isDeleted', false)
                    .select('*');

                return response.json(categorias);
            }
        } catch (error) {

            return response.status(401).json({ error: error });
        }
    },
    async delete(request, response) {
        try {
            const { id } = request.params;
            const token = request.headers.authorization;
            const { usuarioId } = jwt.verify(token.replace('Bearer ', ''), config.secret);

            const loggedUser = await connection('usuario')
                .where('isDeleted', false)
                .where('id', usuarioId);
            if (loggedUser) {
                const categoria = await connection('categoria')
                    .where('id', id)
                    .first();

                if(categoria)
                {
                    await connection('categoria')
                    .where('id', id)
                    .update('isDeleted', true);
                    return response.status(204).send();
                }else
                {
                    return response.status(400).json({ error: 'Categoria não cadastrada.' });
                }
                
            }
        } catch (error) {
            return response.status(401).json({ error: error });
        }
    },
    async update(request, response) {
        try {
            const { id, descricao, valor } = request.body;
            const token = request.headers.authorization;
            const { usuarioId } = jwt.verify(token.replace('Bearer ', ''), config.secret);

            const loggedUser = await connection('usuario')
                .where('isDeleted', false)
                .where('id', usuarioId);
            if (loggedUser) {

        const modifiedDate = Date.now();

        await connection('categoria')
            .where('id', id)
            .update({
                modifiedDate = modifiedDate,
                descricao: descricao,
                valor: valor
            });

        return response.status(202).send();
            }
        } catch (error) {
            return response.status(401).json({ error: error });
        }
    }
};
const connection = require('../database/connection');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(request, response) {
        try {
            const { nome, telefone, endereco, numero, bairro, cidade, uf, email, password } = request.body;
            const token = request.headers.authorization;
            const { usuarioId } = jwt.verify(token.replace('Bearer ', ''), config.secret);

            const usuario = await connection('usuario')
                .where('isDeleted', false)
                .where('id', usuarioId);

            if (usuario) {
                await connection('usuario').insert({
                    // id,
                    nome,
                    telefone,
                    endereco,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    email,
                    password
                })

            }
            return response.status(201).json({ msg: 'Usuário criado!' });
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
                const usuarios = await connection('usuario')
                    .where('isDeleted', false)
                    .select('*');

                return response.json(usuarios);
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
                const usuario = await connection('usuario')
                    .where('id', id)
                    .first();

                if(usuario)
                {
                    await connection('usuario')
                    .where('id', id)
                    .update('isDeleted', true);
                    return response.status(204).send();
                }else
                {
                    return response.status(400).json({ error: 'Usuário não cadastrado.' });
                }
                
            }
        } catch (error) {
            return response.status(401).json({ error: error });
        }
    },
    async update(request, response) {
        try {
            const { id, nome, telefone, endereco, numero, bairro, cidade, uf, email, password } = request.body;
            const token = request.headers.authorization;
            const { usuarioId } = jwt.verify(token.replace('Bearer ', ''), config.secret);

            const loggedUser = await connection('usuario')
                .where('isDeleted', false)
                .where('id', usuarioId);
            if (loggedUser) {

        const modifiedDate = Date.now();

        await connection('usuario')
            .where('id', id)
            .update({
                nome: nome,
                telefone: telefone,
                endereco: telefone,
                endereco: endereco,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                email: email,
                password: password,
                modifiedDate: modifiedDate
            });

        return response.status(202).send();
            }
        } catch (error) {
            return response.status(401).json({ error: error });
        }
    },
    async authenticate(request, response) {
        const { email, password } = request.body;

        const usuario = await connection('usuario')
            .where('isDeleted', false)
            .where('email', email)
            .first();

        if (usuario.email == email && usuario.password == password) {
            const token = jwt.sign({ usuarioId: usuario.id }, config.secret);

            return response.status(202)
                .json({
                    usuario: usuario.email,
                    token: 'Bearer ' + token,
                    tokenType: 'Bearer',
                    isAuthenticated: true
                });
        }

        if (usuario !== null)
            return response.status(401).json({ error: 'Operation not permitted.' });
    }
};
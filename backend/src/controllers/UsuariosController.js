const connection = require('../database/connection');
const crypto = require('crypto');
const config = require('../config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(request, response) {
        const { nome, telefone, endereco, numero, bairro, cidade, uf, email, password } = request.body;

        // const id = crypto.randomBytes(4).toString('HEX');

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

        return response.status(201).json({ msg: 'Usuário criado!' });
    },
    async get(request, response) {
        const usuarios = await connection('usuario')
            .where('isDeleted', false)
            .select('*');
        return response.json(usuarios);
    },
    async delete(request, response) {
        const { id } = request.params;
        // const ong_id = request.headers.authorization;

        const usuario = await connection('usuario')
            .where('id', id)
            // .select('ong_id')
            .first();

        // if (incident.ong_id !== ong_id) {
        //     return response.status(401).json({ error: 'Operation not permitted.' });
        // }

        await connection('usuario')
        .where('id', id)
        .update('isDeleted', true);

        return response.status(204).send();
    },
    async update(request, response) {
        const { id, nome, telefone, endereco, numero, bairro, cidade, uf, email, password } = request.body;
        // const ong_id = request.headers.authorization;

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
    },
    async authenticate(request, response) {
        const { email, password } = request.body;
        
        const usuario = await connection('usuario')
            .where('isDeleted', false)
            .where('email', email)
            .first();

        if(usuario.email == email && usuario.password == password)
        {
            const token = jwt.sign({ sub: usuario.id }, config.secret);

            return response.status(202)
                           .json({ 
                                       usuario: usuario.email ,
                                       token: token ,
                                       tokenType: 'Bearer',
                                       isAuthenticated: true
                                 });
        }
        
        if(usuario !== null)
            return response.status(401).json({ error: 'Operation not permitted.' });
    }
};
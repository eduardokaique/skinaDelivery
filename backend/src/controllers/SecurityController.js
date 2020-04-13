const connection = require('../database/connection');

module.exports = {
    async authenticate(request, response) {
        const { email, password } = request.body;

        const usuario = await connection('usuario')
            .where('isDeleted', false)
            .where('email', email)
            .first();

        if(usuario.email == email && usuario.password == password)
            return response.status(202).json({ msg: 'Logado com sucesso!' });
        
        if(usuario !== null)
            return response.status(401).json({ error: 'Operation not permitted.' });
    }
}
const express = require('express');
const cors = require('cors');
// const { errors } = require('celebrate');
const routes = require('./routes')

const app = express();

app.use(cors(

    //     { 
    //         origin: 'http://meuapp.com'
    //     }
));

//aceitar requisições com json
app.use(express.json());
app.use(routes);
// app.use(errors());

// const port  = process.env.PORT || 3000;
// app.listen(port);
app.listen(3333); 
const express = require('express');
const app = express(); 


app.use(express.json())



app.post('/register', (req, res) => {
   // nome, email, senha
    const { email, senha} = req.body;  
    console.log( email, senha);
});


app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
})
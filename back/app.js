const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Importa o bcrypt
const app = express(); 

app.use(express.json());
app.use(cors());

app.post('/registrar', async (req, res) => {
    const { email, senha } = req.body;  

    try {
        // Gera um hash da senha com um sal
        const salt = await bcrypt.genSalt(10); // Gera um sal
        const hashedPassword = await bcrypt.hash(senha, salt); // Criptografa a senha

        console.log(email, hashedPassword); // Exibe o email e a senha criptografada
        
        // Aqui você poderia salvar o usuário no banco de dados

        res.status(200).json({ message: 'Usuário registrado com sucesso!' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
});

app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
});



app.use(express.json())
app.use(cors())


app.post('/registrar', (req, res) => {
   // nome, email, senha
    const { email, senha} = req.body;  
    console.log( email, senha);
    res.status(200).json({ message: 'Usuário registrado com sucesso!' }); 
    
});


app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
})
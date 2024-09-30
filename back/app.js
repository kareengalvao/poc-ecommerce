const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Client } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do cliente PostgreSQL
const client = new Client({
    host: 'localhost',         // ou o IP do seu banco de dados
    port: 5432,                // porta padrão do PostgreSQL
    user: 'postgres',          // seu nome de usuário
    password: '',              // sua senha
    database: 'ecommerce'      // nome do seu banco de dados
});

// Conecta ao banco de dados
client.connect()
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch(err => console.error('Erro ao conectar', err.stack));

// Rota para registrar usuário
app.post('/registrar', async (req, res) => {
    const { email, senha } = req.body;  

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Salva o usuário no banco de dados
        await client.query('INSERT INTO usuarios (email, senha) VALUES ($1, $2)', [email, hashedPassword]);

        res.status(200).json({ message: 'Usuário registrado com sucesso!' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
});

// Rota para autenticação (login)
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  console.log(email, senha)

    try {
        // Busca o usuário pelo email
        const result = await client.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos.' });
        }

        const user = result.rows[0];

        // Compara a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha incorretos.' });
        }

        // Aqui você poderia gerar um token JWT ou outra lógica de autenticação, se desejar

        res.status(200).json({ message: 'Login bem-sucedido!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao autenticar usuário.' });
    }
});

// Inicie o servidor
const PORT = process.env.PORT || 3001; // Alterado para 3001 para evitar conflito
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//Instanciando os modulos express e express-handlebars
const express = require('express');
const app = express();
const User = require('./models/User')
const handlebarsconst = require('express-handlebars');
const bodyParser = require('body-parser')

//Template, confifgurando a página defaultLayout que é o corpo vazio de um html
app.engine('handlebars', handlebarsconst({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.json())


//Configurando as rotas
app.get('/', async(req,res) => {
    res.render('home');
});

app.get('/cadastro', async(req, res) => {
    res.render('cadastrar')
})

app.post("/dadosform", async(req,res) => {
    console.log(req.body);
    await User.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso."
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: false,
            mensagem: "Erro: Usuario não cadastrado"
        })
    });

    res.send("FORMULÁRIO ENVIADO COM SUCESSO.");
});


//Listando qual porta o servidor vai se iniciar, no caso a 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
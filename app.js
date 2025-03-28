const express = require("express"); //Importa lib do Express
const sqlite3 = require("sqlite3"); //Importa lib do sqlite3

const PORT = 8000; //Porta TCP do servidor HTTP da aplicação

const app = express(); //Instância para uso do Sqlite3

const db = new sqlite3.Database("user.db"); //Instância para uso de Sqlite3
db.serialize(() => {
  //Este método permite enviar comandos SQL em modo 'sequencial'
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,  username TEXT, password TEXT)"
  );
});

app.use("/static", express.static(__dirname + "/static"));

//Configurar EJS como o motor de visualização
app.set("view engine", "ejs");

//Cria conexão com o banco de dados

const index =
  "<a href='/'>Home</a> <a href='/sobre'>Sobre</a> <a href='/login'>Login</a> <a href='/cadastro'>Cadastro</a>";

const cadastro = "Você está na página Cadastro<br><a href='/'>Voltar</a>";

const sobre = "Você está na página Sobre<br><a href='/'>Voltar</a>";

const login = "Você está na página Login<br><a href='/'>Voltar</a>";

/*Método express.get necessita de dois parâmetros
Na ARROW FUNCTION, o primeiro são os dados do servidor (REQUISITION - 'req')
o segundo são os dados que serão enviados ao cliente (RESULT - 'res') */
app.get("/", (req, res) => {
  //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/
  /*res.send(index);*/
  res.render("index");
});

app.get("/sobre", (req, res) => {
  //Rota raiz do meu servidor, acesse o browser com o endereço http://localhost:8000/
  res.send(sobre);
});

app.get("/login", (req, res) => {
  // res.send(login);
  res.render("login");
});

app.post("/login", (req, res) => {
  res.send("Login ainda não implementado.");
});

app.get("/cadastro", (req, res) => {
  res.send(cadastro);
});

//app.listen() deve ser o último comando da aplicação (app.js)
app.listen(PORT, () => {
  console.log(`Servidor sendo executado na porta  ${PORT}!`);
});

# Desafio Técnico - Perfil de Usuário (Sync360.io)

Este projeto é uma aplicação web full-stack que apresenta uma página de perfil de usuário, permitindo a visualização, edição e upload de foto, com os dados persistidos em um banco de dados MySQL. Foi desenvolvido como parte do processo seletivo da Sync360.io.

## Visualização

![Screenshot da Aplicação](pasta projeto on)


---

## Tecnologias Utilizadas

**Backend:**
* Node.js
* Express.js
* MySQL2 (Driver)
* Multer (Para upload de arquivos)
* Dotenv (Para variáveis de ambiente)
* CORS

**Frontend:**
* HTML5
* CSS3
* JavaScript (ES6+)

**Banco de Dados:**
* MySQL

---

## Funcionalidades

-   [x] Visualização dos dados do perfil do usuário a partir do banco de dados.
-   [x] Alternância entre modo de visualização e modo de edição.
-   [x] Formulário para edição de todas as informações do perfil.
-   [x] Funcionalidade de upload de nova foto de perfil.
-   [x] Persistência de todas as alterações (texto e imagem) no banco de dados.
-   [x] Interface responsiva com tema escuro.

---

## Como Rodar o Projeto Localmente

**Pré-requisitos:**
* Node.js (versão 18 ou superior).
* Um servidor MySQL em execução.

### 1. Configuração do Backend

1.  Abra um terminal e navegue até a pasta `backend`:
    ```bash
    cd backend
    ```
2.  Instale as dependências necessárias:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz da pasta `backend` e preencha com suas credenciais do MySQL, usando o `.env.example` como base.
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=sync_db
    PORT=3001
    ```
4.  Inicie o servidor do backend:
    ```bash
    npm run dev
    ```
5.  O servidor estará rodando em `http://localhost:3001`. Mantenha este terminal aberto.

### 2. Configuração do Frontend

1.  Para visualizar a página, use a extensão **Live Server** no Visual Studio Code.
2.  Abra a pasta `frontend` no VS Code.
3.  Clique com o botão direito no arquivo `usuario.html` (ou `index.html`) e selecione "Open with Live Server".
4.  A aplicação será aberta no seu navegador, pronta para uso.

---

## Endpoints da API

* `GET /api/usuario`: Retorna os dados do usuário com `id = 1`.
* `POST /api/usuario`: Atualiza os dados do usuário com `id = 1`. Aceita dados `multipart/form-data` para o upload de imagem.
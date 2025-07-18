## APP Angular EnqueteOnline

### Features

- [x] Autenticação e Autorização com JWT com HTTP-only cookies
- [x] Refresh tokens com 1 semana de expiração e job com hangfire para limpar tokens revogados/expirados 
- [x] Login Google ou Facebook
- [x] Cadastro de Enquetes
- [x] Votar nas enquetes
- [x] Acompanhar votação da enquete em tempo real(Websocket com SignalR)
- [x] Editar/Excluir enquete apenas se for o criador da enquete 


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:
- [Angular](https://angular.dev/)
- [NgZorro](https://ng.ant.design/docs/introduce/en)
- SignalR

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [NodeJs](https://nodejs.org/pt).
[Angular CLI](https://angular.dev/tools/cli).
Também é preciso criar e configurar o arquivo environment.development.ts com base no environment.ts no diretório `enquete-online-app/src/environments`.
Além disto é bom ter um editor para trabalhar com o código como [Visual Studio Code](https://code.visualstudio.com/).


### 🎲 Rodando o Front End (Aplicativo web)

```bash
# Clone este repositório
$ git clone <https://github.com/henriquesan14/enquete-online-app.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd enquete-online-app

# Instale as dependências do projeto
$ npm install

# Execute a aplicação com o comando do angular cli
$ ng serve

# O aplicativo iniciará na porta:4200 com HTTP
```

### Autor
---

<a href="https://www.linkedin.com/in/henrique-san/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/33522361?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Henrique Santos</b></sub></a> <a href="https://www.linkedin.com/in/henrique-san/">🚀</a>


Feito com ❤️ por Henrique Santos 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Henrique-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/henrique-san/)](https://www.linkedin.com/in/henrique-san/) 

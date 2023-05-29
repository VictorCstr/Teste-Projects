<p align="center">
 <a href="#computer-o-projeto">Sobre</a> •
 <a href="#dart-objetivo">Objetivo</a> • 
 <a href="#mag_right-para-rodar-o-projeto">Como rodar</a> • 
</p>

<h1 align="center">Desafio #2 (TRIO)</h1> <br><br>
<p align="center"> 
  <img src="https://github.com/VictorCstr/desafioCRUDjs-gama/blob/main/public/images/smartmockups_kxgp62ci.jpg" width="100%">
</p>

## :computer: O projeto

- Administração de Projetos, com tela de login e criação de usuario, com redirecionamento para uma tela com um CRUD de projetos, podendo atualizar, marcar como concluido, excluir, criar novos projetos e visualizar separadamente com uma visualização de cidade e estado através do código postal.
- O Projeto inicialmente foi feito com foco no back-end e na estrutura clean-architechture, e como havia a necessidade de uma integração com o front, foi feito através de um motor (EJS) de templates e com isso algumas mudanças tiveram que ser feitas na estrutura da api, com mudanças nas rotas para renderizar as views e aceitar FORMS do html (que no caso só lidam com POST e GET).

## :computer: Tecnologias

- Node, Typescript, Express
- Clean Architechture
- SOLID, POO
- PostgreSQL, Prisma ORM.
- Axios para requisições
- Bcrypt para criptografia de login e senha
- CORS
- EJS (Template engine)
- Redis para cache de username
- Jest e supertest para testes unitários

## :mag_right: Para rodar o projeto:

```bash
# Pré requisitos
- Docker instalado na máquina

# Faça o clone do repositório
$ git clone <https://github.com/VictorCstr/Teste-Projects>

# Acesse a pasta do projeto no terminal
$ cd Teste-Projects

# Faça a instalação e execução de todos os containers com o compose
$ docker-compose up --build

```

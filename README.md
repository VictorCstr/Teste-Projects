<p align="center">
 <a href="#computer-o-projeto">Sobre</a> •
 <a href="#computer-tecnologias">Tecnologias usadas</a> • 
 <a href="#mag_right-para-rodar-o-projeto">Como rodar</a> • 
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

# Criar as variaveis para o container
Postgres => db.env FILE
Exemplos: 
$ POSTGRES_USER:postgres
$ POSTGRES_PASSWORD:admin
$ POSTGRES_DB:Fontes

REDIS => cache.env FILE
Exemplos: 
$ REDIS_URL="redis://host.docker.internal:6379"
$ ALLOW_EMPTY_PASSWORD=yes

API => .env FILE
Exemplos: 
$ NODE_ENV=dev
$ SECRET_KEY="paodequeijo"
$ DATABASE_URL="postgresql://postgres:admin@host.docker.internal:5432/Fontes"
$ REDIS_URL="redis://host.docker.internal:6379"

# Faça a instalação e execução de todos os containers com o compose
$ docker-compose up --build

```

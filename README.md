# Plataforma Programa Somar

## Time

**Nome**: Devs da 222

**Integrantes**: Enzo Andrade, Felipe Verdade, Glauber Martini, Gustavo Kruger, Lucas da Paz

**Turma**: DEV1N222

## Índice

- [Produto](#produto)
- [Objetivo (meta)](#objetivo-meta)
- [Rodando o projeto](#rodando-o-projeto)
  - [Instalações necessárias](#o-que-é-preciso-instalar)
  - [Configurando o ambiente](#configurando-o-ambiente)
  - [Executando](#executando)
- [Requisitos](#requisitos)
  - [Funcionais](#funcionais)
  - [Não funcionais](#não-funcionais)
- [Tarefas](#o-que-é-preciso-fazer)
- [Diagramas](#diagramas)
- [Cronograma](#cronograma)
  - [Fase 1 - até 05/05](#fase-1---projeto-base-mvp)
  - [Fase 2 - até 16/06](#fase-2---funcionalidades-recomendáveis)
  - [Fase 3 - até 25/08](#fase-3---funcionalidades-diferenciadas)
- [Linguagens, frameworks e ferramentas](#linguagens-frameworks-e-ferramentas)
- [Questões](#questões)
- [Design e layouts](#design-e-layouts)

## Produto

Website para registro e mapeamento dos projetos realizados dentro do programa Somar.

## Objetivo (meta)

Desenvolver, em quatro meses, um site que visa a comunicação com a sociedade via exposição dos projetos e divulgação dos Objetivos de Desenvolvimento Sustentável (ODS).

## Rodando o projeto

### O que é preciso instalar?

Para executar o projeto é preciso ter instalado o [_Node.js_](https://nodejs.org/pt-br); a versão utilizada para o desenvolvimento foi a _18.13.0 LTS_.

Também será necessário instalar o [_MySQL_](https://dev.mysql.com/downloads/windows/installer/8.0.html); a versão utilizada para o desenvolvimento foi a _8.0.31_.

É recomendado que o usuário utilize as versões mais próximas possíveis das utilizadas em desenvolvimento. Tenha em mente que versões anteriores podem causar problemas de compatibilidade e erros na execução do projeto.

Por fim, é altamente recomendado que a IDE utilizada para rodar o projeto seja o [_VS Code_](https://code.visualstudio.com/).

### Configurando o ambiente

#### MySQL

Este projeto utiliza o [_Sequelize_](https://sequelize.org/) como _ORM_ para realizar ações no banco de dados. Para que isso funcione corretamente, você precisa criar um banco de dados (o nome utilizado durante o desenvolvimento do projeto foi "dojotech_somar") e, no arquivo [config.json](src/config/config.json), na área _development_, você deve substituir os valores de _username_ pelo nome do seu usuário que vai acessar o banco de dados no _MySQL_ (lembrando que o usuário deve ter as permissões necessárias para realizar as operações), _password_ pela senha deste usuário ou `null` caso não tenha senha e _database_ pelo nome do banco de dados que você criou. Exemplo:

```json
  "development": {
    "username": "seu_usuario",
    "password": "sua_senha" ou null,
    "database": "seu_banco",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

#### VS Code

Você vai precisar da extensão [_Live Server_](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para rodar o _frontend_ do projeto. Isso é importante, pois caso você tente executar apenas os arquivos _HTML_ do projeto, ocorrerão erros do [_CORS_](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS) e não será possível utilizar nenhuma funcionalidade.

Após instalar a extensão, deve aparecer um botão no canto inferior direito do _VS CODE_ escrito "Go Live".

#### Node

Clone o projeto e navegue até a pasta [**src**](src/) pelo terminal. Execute comando `npm i` para instalar as dependências do projeto. Quando a instalação for concluída, execute os comandos a seguir para criar as tabelas do banco e inserir alguns dados nelas, respectivamente:

```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Agora você já deve ter todas as tabelas do projeto criadas no seu banco, com os dados dos arquivos [_seeders_](src/seeders/) inseridos.

### Executando

Para rodar o servidor no _backend_ do projeto, ainda no terminal e na pasta [**src**](src/), execute o comando `npm run server`.

Abra o projeto no _VS Code_; dentro da pasta [**public/views**](public/views/) abra o arquivo [_index.html_](public/views/index.html) e clique no botão "Go Live" do _Live Server_.

## Requisitos

### Funcionais

- [ ] CRUD projetos;
- [ ] CRUD usuários;
- [ ] Deve ser possível realizar a filtragem de projetos:
  - [ ] por ODS;
  - [ ] por cidade;
  - [ ] por causa de atuação;
  - [ ] por público-alvo.
- [ ] Deve ser possível adicionar até 5 imagens por projeto;
- [ ] Deve ser possível adicionar um vídeo de até 2min de duração por projeto;
- [ ] Deve ser possível visualizar a quantidade total de projetos;
- [ ] Deve ser possível visualizar a quantidade de projetos por ODS.

### Não funcionais

- [ ] O site deve ser acessível a todos os tipos de usuários (acessibilidade);
- [ ] O site deve ser responsivo e funcionar em desktop e dispositivos móveis.

## O que é preciso fazer?

- [x] Elaborar documentação técnica;
- [x] Decidir linguagens, frameworks e ferramentas que serão utilizados;
- [x] Elaboração de protótipo do site;
- [x] Criação do banco de dados;
- [x] Desenvolver página inicial;
- [x] Desenvolver página de login;
- [x] Desenvolver página de cadastro de usuário;
- [x] Desenvolver página “Conheça nossos projetos”;
- [x] Desenvolver página de cadastro de projeto;
- [ ] Desenvolver página de projeto;
- [ ] Realizar integração com banco de dados;
- [ ] Desenvolver funcionalidades.

## Diagramas

### Casos de uso

![Diagrama de casos de uso](img/diagramas/casos_de_uso.png)

### ER (Entidade-Relacionamento)

![Diagrama ER do banco de dados](img/diagramas/er.png)

### Relacional

![Modelo relacional do banco de dados](img/diagramas/relacional.png)

## Cronograma

- [x] 17/03 - Início do projeto;
- [x] 24/03 - Início da documentação técnica e primeiro esboço do projeto;
- [x] 31/03 - Diagramação e escolha das linguagens e _frameworks_ que serão utilizados;
- [x] 07/04 - Avaliação das entregas pela banca avaliadora.

### Fase 1 - Projeto Base (_MVP_)

- [x] 14/04 - Página inicial e página de login;
- [ ] 21/04 - Página “conheça nossos projetos”;
- [ ] 28/04 - Página de projeto;
- [ ] 05/05 - Apresentação da **Fase 1** para a equipe do comitê de sustentabilidade.

### Fase 2 - Funcionalidades Recomendáveis

- [ ] 12/05 a 09/06 - Visualização de contabilização de quantos projetos ao total, quantos para cada ODS e possibilidade de _upload_ de até 5 fotos por projeto;
- [ ] 16/06 - Apresentação das **Fases 1 e 2** para a equipe do comitê de sustentabilidade.

### Fase 3 - Funcionalidades Diferenciadas

- [ ] 23/06 a 14/07 - Possibilidade de _upload_ de um vídeo de até dois minutos por projeto e filtros para visualização de projetos por cidade, ODS, causa de atuação e público-alvo;
- [ ] 21/07 - Banca avaliadora irá avaliar o desenvolvimento do projeto como um todo;
- [ ] 27/07 - Apresentação do projeto final para a banca avaliadora e comitê do projeto Somar (a banca avaliadora vai definir o projeto vencedor);
- [ ] 25/08 - Entrega do projeto para o comitê de sustentabilidade.

## Linguagens, frameworks e ferramentas

### Front-end

- HTML;
- CSS;
- JavaScript;
- Figma.

### Back-end

- Node.js;
- MySQL;
- brModelo;
- Astah UML.

## Questões

Principais dúvidas da equipe sobre o projeto:

- Como/por quem será feito o cadastro de usuário?
- Como diferenciar os usuários?
- Quem são os multiplicadores de excelência?
- Como funciona o mapeamento dos projetos?
- Como é definido o público-alvo?
- Existe algum sistema externo envolvido?
- Será possível adicionar novas linguagens/frameworks ao decorrer do projeto?

## Design e layouts

### Guia de Cores ODS

![Guia de Cores ODS](img/layouts/cores_ods.png)

### Página inicial (Home)

![home.png](img/layouts/home.png)

### Página de login

![login.png](img/layouts/login.png)

### Página “Conheça Nossos Projetos”

![projetos_2.png](img/layouts/projetos.png)

### Página de projeto

![pag_projeto.png](img/layouts/pag_projeto.png)

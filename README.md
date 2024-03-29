# Plataforma Programa Somar

## Time

**Nome**: Devs da 222

**Integrantes**: <a href="https://www.linkedin.com/in/felipe-verdade-didio/" title="Felipe Verdade | LinkedIn" target="_blank">Felipe Verdade</a>, <a href="https://www.linkedin.com/in/glauber-martini-ab8743b0/" title="Glauber Martini | LinkedIn" target="_blank">Glauber Martini</a>, <a href="https://www.linkedin.com/in/xlucaspx/" title="Lucas da Paz | LinkedIn" target="_blank">Lucas da Paz</a>

**Turma**: DEV1N222

## Índice

- [Produto](#produto)
- [Objetivo (meta)](#objetivo-meta)
- [Rodando o projeto](#rodando-o-projeto)
  - [Instalações necessárias](#o-que-é-preciso-instalar)
  - [Configurando o ambiente](#configurando-o-ambiente)
  - [Executando](#executando)
  - [Testes](#testes)
  - [Dependências](#dependências)
- [Requisitos, regras de negócio e tarefas](#requisitos-regras-de-negócio-e-tarefas)
  - [Requisitos funcionais](#requisitos-funcionais)
  - [Requisitos não funcionais](#requisitos-não-funcionais)
  - [Regras de negócio](#regras-de-negócio)
  - [Tarefas](#o-que-é-preciso-fazer)
- [Cronograma](#cronograma)
  - [Fase 1 - até 05/05](#fase-1---projeto-base-mvp)
  - [Fase 2 - até 16/06](#fase-2---funcionalidades-recomendáveis)
  - [Fase 3 - até 28/08](#fase-3---funcionalidades-diferenciadas)
- [Linguagens, frameworks e ferramentas](#linguagens-frameworks-e-ferramentas)
- [Diagramas, design e layouts](#diagramas-design-e-layouts)

## Produto

Website para registro e mapeamento dos projetos realizados dentro do programa Somar.

<a href="https://youtu.be/m0VvSiY7pd8?si=GJR0iPDkqiiWv0FY" title="Programa Somar (DojoTech) - Pitch Final (Devs da 222)" target="_blank">Pitch de apresentação do projeto</a>.

## Objetivo (meta)

Desenvolver, em quatro meses, um site que visa a comunicação com a sociedade via exposição dos projetos e divulgação dos Objetivos de Desenvolvimento Sustentável (ODS).

## Rodando o projeto

### O que é preciso instalar?

Para executar o projeto é preciso ter instalado o [_Node.js_](https://nodejs.org/pt-br). A versão utilizada para o desenvolvimento foi a **18.13.0 LTS**; para os testes foi utilizada a versão **20.5.1**.

Também será necessário instalar o [_MySQL_](https://dev.mysql.com/downloads/windows/installer/8.0.html); a versão utilizada para o desenvolvimento foi a **8.0.31**.

É recomendado que o usuário utilize as versões mais próximas possíveis das utilizadas em desenvolvimento. Tenha em mente que versões anteriores podem causar problemas de compatibilidade e erros na execução do projeto.

Por fim, é altamente recomendado que a IDE utilizada para rodar o projeto seja o [_VS Code_](https://code.visualstudio.com/).

### Configurando o ambiente

Após clonar o projeto, siga as instruções abaixo para configurar o ambiente e rodar o projeto corretamente.

#### Variáveis de ambiente

Visando tornar o projeto mais seguro e sua configuração mais simples, são utilizadas **variáveis de ambiente** para guardar informações sensíveis. Para configurar as variáveis de ambiente com [_Dotenv_](https://www.npmjs.com/package/dotenv), é preciso criar um arquivo chamado `.env` na pasta [**src**](src/) com as chaves e valores que se deseja guardar; no arquivo [**exemplo.env**](src/exemplo.env), as chaves já estão disponíveis, você pode apenas renomear o arquivo para `.env` e preencher com os devidos valores.

Seu arquivo `.env` deverá se parecer com:

```
# Credenciais de acesso ao banco de dados:
DB_USERNAME = "seu_usuario"
DB_PASSWORD = "sua_senha"
DB_DATABASE = "nome_do_banco"

TEST_DATABASE = "banco_para_testes"

# Segredo Token JWT:
TOKEN_SECRET = "uma senha para validar seus tokens"
```

#### MySQL

Este projeto utiliza o [_Sequelize_](https://sequelize.org/) como _ORM_ para realizar ações no banco de dados. Para que isso funcione corretamente, você precisa criar um banco de dados e, no arquivo `.env`, você deve substituir os valores de **DB_USERNAME** pelo nome do seu usuário que vai acessar o banco de dados no _MySQL_ (lembrando que o usuário deve ter as permissões necessárias para realizar as operações), **DB_PASSWORD** pela senha deste usuário - ou uma string vazia (`""`) caso não tenha senha - e **DB_DATABASE** pelo nome do banco de dados que você criou.

Utilizando as variáveis de ambiente, essas informações serão importadas no arquivo [_config.js_](src/config/config.js), desta forma:

```js
// ...
development: {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql",
},
// ...
```

#### VS Code

Você vai precisar da extensão [_Live Server_](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para rodar o _frontend_ do projeto. Isso é importante, pois caso você tente executar apenas os arquivos _HTML_ do projeto, ocorrerão erros do [_CORS_](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS) e não será possível utilizar nenhuma funcionalidade.

Após instalar a extensão, deve aparecer um botão no canto inferior direito do _VS Code_ escrito "_Go Live_".

#### Node

Navegue até a pasta [**src**](src/) pelo terminal. Execute comando `npm i` para instalar as dependências do projeto. Quando a instalação for concluída, execute o seguinte script para criar as tabelas do banco e inserir alguns dados nelas:

```
npm run db:migrate-and-seed

# se preferir, você também pode executar as migrations e os seeders separadamente:

npm run db:migrate
npm run db:seed
```

Agora você já deve ter todas as tabelas do projeto criadas no seu banco, com os dados dos arquivos [**seeders**](src/seeders/) inseridos.

### Executando

Para rodar o servidor no _backend_ do projeto, ainda no terminal e na pasta [**src**](src/), execute o comando `npm start`.

Abra a raíz do projeto no _VS Code_; dentro da pasta [**public/views**](public/views/) abra o arquivo [**index.html**](public/views/index.html) e clique no botão "Go Live" do _Live Server_.

### Testes

Foram desenvolvidos testes _end-to-end_ e unitários utilizando o _test-runner_ nativo do Node.js 20.5; para executá-los é necessário criar um banco de dados à parte e informá-lo no arquivo `.env` como `TEST_DATABASE = <seu-banco>`. Para criar as tabelas e executar os arquivos [**seeders**](src/seeders/), defina manualmente a variável de ambiente `NODE_ENV` com o valor `test` (`$env:NODE_ENV="test"` no Windows e `NODE_ENV=test` no Linux/Unix) e, dentro da pasta [**src**](src/), execute o script `npm run db:migrate-and-seed` — ou, se preferir, pode executá-los separadamente com `db:migrate` e `db:seed`.

Com o ambiente de testes configurado, não precisa mais se preocupar em definir seu `NODE_ENV` manualmente: foi utilizado o [_cross-env_](https://www.npmjs.com/package/cross-env) para definir o ambiente de testes nos _scripts_ de teste. Para executar os testes, utilize os seguintes _scripts_:

| Script                    | Descrição                                                                        |
| ------------------------- | -------------------------------------------------------------------------------- |
| `npm t`                   | roda os testes uma vez                                                           |
| `npm run test:watch`      | reinicia as _suites_ sempre que um arquivo é alterado                            |
| `npm run test:cov`        | utiliza o [_c8_](https://www.npmjs.com/package/c8) para gerar _coverage_ em HTML |
| `npm run test:cov-native` | gera um _output_ contendo as informações de _coverage_ no terminal               |

### Dependências

Pacotes do Node.js necessários para executar o projeto; estão disponíveis também no arquivo [**package.json**](src/package.json):

- [Nodemon](https://nodemon.io/) (desenvolvimento);
- [c8](https://www.npmjs.com/package/c8) (testes);
- [cross-env](https://www.npmjs.com/package/cross-env) (testes);
- [Dotenv](https://www.npmjs.com/package/dotenv);
- [Sequelize](https://sequelize.org/);
  - [Sequelize-CLI](https://www.npmjs.com/package/sequelize-cli);
  - [MySQL2](https://www.npmjs.com/package/mysql2);
- [Express](https://expressjs.com/);
  - [Express-FileUpload](https://www.npmjs.com/package/express-fileupload);
  - [CORS](https://expressjs.com/en/resources/middleware/cors.html);
- [JSON Web Token](https://jwt.io/libraries?language=Node.js).

## Requisitos, regras de negócio e tarefas

### Requisitos funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível visualizar e editar o perfil de um usuário logado;
- [x] Deve ser possível que o usuário exclua seu cadastro;
- [x] Deve ser possível cadastrar projetos;
- [x] Deve ser possível visualizar projetos;
- [x] Deve ser possível ao usuário que cadastrou o projeto editá-lo;
- [x] Deve ser possível ao usuário que cadastrou o projeto excluí-lo;
- [x] Deve ser possível realizar a filtragem de projetos:
  - [x] por nome;
  - [x] por ODS;
  - [x] por cidade;
  - [x] por causa de atuação;
  - [x] por público-alvo.
- [x] Deve ser possível adicionar até 5 imagens por projeto;
- [x] Deve ser possível adicionar um vídeo de até 2min de duração por projeto;
- [x] Deve ser possível visualizar a quantidade total de projetos;
- [x] Deve ser possível visualizar a quantidade de projetos por ODS.

### Requisitos não funcionais

- [x] O site deve ser acessível a todos os tipos de usuários (acessibilidade);
- [x] O site deve ser responsivo e funcionar em desktop e dispositivos móveis;
- [x] A senha do usuário deve ser criptografada;
- [x] O usuário deve ser identificado com JWT;
- [x] Utilizar expressões regulares para escapar possíveis entradas maliciosas do usuário;
- [x] Validar e limitar tamanho máximo de upload de arquivos;
- [x] Criar componentes que possam ser reutilizados, evitando repetição e facilitando a manutenibilidade do projeto;
- [x] Estruturar o projeto separando os arquivos por funcionalidade e coerência;
- [x] Procurar escrever o código de forma semântica e organizada, facilitando o entendimento do sistema;
- [x] Validar dados inseridos pelo usuário conforme regras de negócio;

### Regras de negócio

- [x] O usuário não pode se cadastrar com um e-mail duplicado;
- [x] O usuário não pode se cadastrar com um nome de usuário duplicado;
- [x] O nome de usuário deve conter apenas letras, números, hífen e underline e deve ter entre 3 e 20 caracteres;
- [x] A senha do usuário deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial e deve ter entre 8 e 50 caracteres;
- [x] O campo e-mail deve ser validado;
- [x] O campo telefone deve ser validado;
- [x] O campo CEP deve ser validado e buscar os dados de endereço do usuário;
- [x] Os campos obrigatórios deve ser marcados com "\*";
- [x] O usuário deve estar autenticado para cadastrar um projeto;
- [x] O projeto deve possuir pelo menos 1 ODS.

### O que é preciso fazer?

- [x] Elaborar documentação técnica;
- [x] Decidir linguagens, frameworks e ferramentas que serão utilizados;
- [x] Elaboração de protótipo do site;
- [x] Criação do banco de dados;
- [x] Desenvolver página inicial;
- [x] Desenvolver página de login;
- [x] Desenvolver página de cadastro de usuário;
- [x] Desenvolver página “Conheça nossos projetos”;
- [x] Desenvolver página de cadastro de projeto;
- [x] Desenvolver página de projeto;
- [x] Realizar integração com banco de dados;
- [x] Desenvolver funcionalidades:
  - [x] Login e autenticação;
  - [x] Upload de imagens;
  - [x] Upload de vídeo;
  - [x] Filtragem de projetos;
  - [x] Contabilização de projetos;
  - [x] Botão "voltar" para facilitar navegação;
  - [x] Página de administração de dados do usuário;
  - [x] Possibilidade de editar e excluir projeto;
  - [x] Opção de gerar relatório contendo total de projetos e total de projetos por ODS.

## Cronograma

- [x] 17/03 - Início do projeto;
- [x] 24/03 - Início da documentação técnica e primeiro esboço do projeto;
- [x] 31/03 - Diagramação e escolha das linguagens e _frameworks_ que serão utilizados;
- [x] 07/04 - Avaliação das entregas pela banca avaliadora.

### Fase 1 - Projeto Base (_MVP_)

- [x] 14/04 - Página inicial e página de login;
- [x] 21/04 - Página “conheça nossos projetos”;
- [x] 28/04 - Página de projeto;
- [x] 05/05 - Pitch da **Fase 1** para a equipe do comitê de sustentabilidade.

### Fase 2 - Funcionalidades Recomendáveis

- [x] 12/05 a 09/06 - Visualização de contabilização de quantos projetos ao total, quantos para cada ODS e possibilidade de _upload_ de até 5 fotos por projeto;
- [x] 16/06 - Pitch das **Fases 1 e 2** para a equipe do comitê de sustentabilidade.

### Fase 3 - Funcionalidades Diferenciadas

- [x] 23/06 a 14/07 - Possibilidade de _upload_ de um vídeo de até dois minutos por projeto e filtros para visualização de projetos por cidade, ODS, causa de atuação e público-alvo;
- [x] 20/07 - Banca avaliadora irá avaliar o desenvolvimento do projeto como um todo;
- [x] 04/08 - Pitch final para a equipe do comitê de sustentabilidade;
- [x] 28/08 - Apresentação do projeto final para a banca avaliadora e comitê do projeto Somar (a banca avaliadora vai definir o projeto vencedor);

## Linguagens, frameworks e ferramentas

### Front-end

- HTML;
- CSS;
- JavaScript.

### Back-end

- Node.js;
- MySQL;

### Design e diagramação

- Figma;
- brModelo;
- Astah UML.

## Diagramas, design e layouts

Os diagramas e telas abaixo foram desenvolvidos durante a concepção inicial do projeto, podendo ter sofrido alterações durante o desenvolvimento.

### Diagrama de casos de uso

![Diagrama de casos de uso](img/diagramas/casos_de_uso.png)

### Diagrama ER (Entidade-Relacionamento)

![Diagrama ER do banco de dados](img/diagramas/er.png)

### Diagrama relacional

![Modelo relacional do banco de dados](img/diagramas/relacional.png)

### Guia de Cores ODS

![Guia de Cores ODS](img/layouts/cores_ods.png)

### Página inicial (Home)

![Layout base da página inicial](img/layouts/home.png)

### Página de login

![Layout base da página de login](img/layouts/login.png)

### Página “Conheça Nossos Projetos”

![Layout base da página “Conheça Nossos Projetos”](img/layouts/projetos.png)

### Página de projeto

![Layout base da página de projeto](img/layouts/pag_projeto.png)

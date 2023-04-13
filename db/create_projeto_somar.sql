CREATE SCHEMA IF NOT EXISTS projeto_somar;
USE projeto_somar;

-- Criando tabela de ODS
CREATE TABLE IF NOT EXISTS ods (
    id INT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    url_imagem VARCHAR(255) NOT NULL
);

-- Criando tabela de usuários
CREATE TABLE IF NOT EXISTS usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(75) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    telefone VARCHAR(25) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    complemento VARCHAR(50),
    numero INT,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    uf VARCHAR(2) NOT NULL
);

-- Criando tabela de projetos
CREATE TABLE IF NOT EXISTS projeto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(75) NOT NULL,
    causa VARCHAR(75) NOT NULL,
    objetivo VARCHAR(125) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    parceiros VARCHAR(255),
    publico_alvo VARCHAR(75) NOT NULL,
    resumo TEXT NOT NULL,
    id_usuario INT NOT NULL,
    CONSTRAINT FK_usuario_projeto FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

-- Criando tabela da relação projeto-ODS
CREATE TABLE IF NOT EXISTS projeto_ods (
    id_projeto INT NOT NULL,
    id_ods INT NOT NULL,
    PRIMARY KEY (id_projeto, id_ods),
    CONSTRAINT FK_id_projeto FOREIGN KEY (id_projeto) REFERENCES projeto (id),
    CONSTRAINT FK_id_ods FOREIGN KEY (id_ods) REFERENCES ods (id)
);

-- Criando tabela de mídias
CREATE TABLE IF NOT EXISTS midia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_projeto INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    alt VARCHAR(175),
    CONSTRAINT FK_projeto_midia FOREIGN KEY (id_projeto) REFERENCES projeto (id)
);

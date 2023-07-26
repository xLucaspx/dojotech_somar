-- INSERT ODS
INSERT INTO ods VALUES
	(1, "Erradicação da Pobreza", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_1.svg"),
	(2, "Fome Zero e Agricultura Sustentável", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_2.svg"),
	(3, "Saúde e Bem-Estar", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_3.svg"),
	(4, "Educação de Qualidade", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_4.svg"),
	(5, "Igualdade de Gênero", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_5.svg"),
	(6, "Água Potável e Saneamento", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_6.svg"),
	(7, "Energia Limpa e Acessível", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_7.svg"),
	(8, "Trabalho Decente e Crescimento Econômico", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_8.svg"),
	(9, "Indústria, Inovação e Infraestrutura", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_9.svg"),
	(10, "Redução das Desigualdades", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_10.svg"),
	(11, "Cidades e Comunidades Sustentáveis", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_11.svg"),
	(12, "Consumo e Produção Responsáveis", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_12.svg"),
	(13, "Ação Contra a Mudança Global do Clima", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_13.svg"),
	(14, "Vida na Água", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_14.svg"),
	(15, "Vida Terrestre", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_15.svg"),
	(16, "Paz, Justiça e Instituições Eficazes", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_16.svg"),
	(17, "Parcerias e Meios de Implementação", "%USERPROFILE%/desktop/workspace/dojotech/img/ods/ods_17.svg");

-- INSERT usuário
INSERT INTO usuario
	(nome, email, usuario, senha, telefone, cep, logradouro, bairro, cidade, uf)
VALUES
	("Juca da Silva", "juca@projsomar.com", "juca_s", "senhajuca", "51 98765-0987", "90040191", "Avenida Venâncio Aires", "Azenha", "Porto Alegre", "RS"),
	("Sílvia Dias", "silvia@projsomar.com", "silviads", "senhasilvia", "51 99875-0876", "90040191", "Avenida Venâncio Aires", "Azenha", "Porto Alegre", "RS");
  
-- INSERT projeto
INSERT INTO projeto
	(nome, causa, objetivo, id_usuario, cidade, parceiros, publico_alvo, resumo)
VALUES
	("Tramandaí mais Verde", "Reflorestamento e arborização",
  "Arborizar os espaços públicos de Tramandaí", 1,
  "Tramandaí", "Sesc,Senac,Sindicato,Prefeitura Municipal de Tramandaí",
  "Moradores e frequentadores de Tramandaí", "O objetivo do projeto Tramandaí mais Verde é arborizar os espaços públicos de Tramandaí e, com isso, propiciar uma melhoria no bem-estar dos cidadãos, bem como contribuir para a melhoria da qualidade do ar e da sensação térmica, entre outros benefícios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 árvores em espaços públicos da cidade, em 5 anos."
  ),
  ("Alvorada mais Verde", "Reflorestamento e arborização",
  "Arborizar os espaços públicos de Alvorada", 2,
  "Alvorada", "Sesc,Senac,Sindicato,Prefeitura Municipal de Alvorada",
  "Moradores e frequentadores de Alvorada", "O objetivo do projeto Alvorada mais Verde é arborizar os espaços públicos de Alvorada e, com isso, propiciar uma melhoria no bem-estar dos cidadãos, bem como contribuir para a melhoria da qualidade do ar e da sensação térmica, entre outros benefícios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 árvores em espaços públicos da cidade, em 5 anos."
  );
  
-- INSERT projeto_ods
INSERT INTO projeto_ods VALUES
	(1, 11),
  (1, 13),
  (1, 15),
  (2, 11),
  (2, 13),
  (2, 15);
  
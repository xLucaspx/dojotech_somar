-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: dojotech_somar
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `midia`
--

DROP TABLE IF EXISTS `midia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `midia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `id_projeto` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_projeto` (`id_projeto`),
  CONSTRAINT `midia_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `midia`
--

LOCK TABLES `midia` WRITE;
/*!40000 ALTER TABLE `midia` DISABLE KEYS */;
INSERT INTO `midia` VALUES (188,'midia_0.jpg','image/jpeg','../../public/img/projetos/1/midia_0.jpg','',1,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(189,'midia_1.jpg','image/jpeg','../../public/img/projetos/1/midia_1.jpg','',1,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(190,'midia_2.webp','image/webp','../../public/img/projetos/1/midia_2.webp','',1,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(191,'midia_3.jpg','image/jpeg','../../public/img/projetos/1/midia_3.jpg','',1,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(192,'midia_4.webp','image/webp','../../public/img/projetos/1/midia_4.webp','',1,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(193,'midia_0.png','image/png','../../public/img/projetos/16/midia_0.png','',16,'2023-07-20 13:27:17','2023-07-20 13:27:17'),(194,'midia_1.jpg','image/jpeg','../../public/img/projetos/16/midia_1.jpg','',16,'2023-07-20 13:27:17','2023-07-20 13:27:17'),(195,'midia_2.jpeg','image/jpeg','../../public/img/projetos/16/midia_2.jpeg','',16,'2023-07-20 13:27:17','2023-07-20 13:27:17'),(196,'midia_3.jpg','image/jpeg','../../public/img/projetos/16/midia_3.jpg','',16,'2023-07-20 13:27:17','2023-07-20 13:27:17'),(197,'midia_5.mp4','video/mp4','../../public/img/projetos/16/midia_5.mp4','',16,'2023-07-20 13:27:17','2023-07-20 13:27:17'),(232,'midia_1.jpg','image/jpeg','../../public/img/projetos/20/midia_1.jpg','',20,'2023-07-20 17:00:25','2023-07-20 17:00:25'),(233,'midia_2.webp','image/webp','../../public/img/projetos/20/midia_2.webp','',20,'2023-07-20 17:00:25','2023-07-20 17:00:25'),(234,'midia_3.jpg','image/jpeg','../../public/img/projetos/20/midia_3.jpg','',20,'2023-07-20 17:00:25','2023-07-20 17:00:25'),(235,'midia_4.webp','image/webp','../../public/img/projetos/20/midia_4.webp','',20,'2023-07-20 17:00:25','2023-07-20 17:00:25'),(241,'midia_1.png','image/png','../../public/img/projetos/24/midia_1.png','',24,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(242,'midia_2.png','image/png','../../public/img/projetos/24/midia_2.png','',24,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(243,'midia_3.jpg','image/jpeg','../../public/img/projetos/24/midia_3.jpg','',24,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(244,'midia_4.jpg','image/jpeg','../../public/img/projetos/24/midia_4.jpg','',24,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(245,'midia_1.jpg','image/jpeg','../../public/img/projetos/25/midia_1.jpg','',25,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(246,'midia_2.jpg','image/jpeg','../../public/img/projetos/25/midia_2.jpg','',25,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(247,'midia_5.jpg','image/jpeg','../../public/img/projetos/25/midia_5.jpg','',25,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(256,'midia_1.jpg','image/jpeg','../../public/img/projetos/19/midia_1.jpg','',19,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(257,'midia_2.jpg','image/jpeg','../../public/img/projetos/19/midia_2.jpg','',19,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(258,'midia_3.webp','image/webp','../../public/img/projetos/19/midia_3.webp','',19,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(259,'midia_4.jpg','image/jpeg','../../public/img/projetos/19/midia_4.jpg','',19,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(260,'midia_5.jpg','image/jpeg','../../public/img/projetos/19/midia_5.jpg','',19,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(261,'midia_6.mp4','video/mp4','../../public/img/projetos/19/midia_6.mp4','',19,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(267,'midia_1.webp','image/webp','../../public/img/projetos/26/midia_1.webp','',26,'2023-07-21 13:54:03','2023-07-21 13:54:03'),(268,'midia_2.jpg','image/jpeg','../../public/img/projetos/26/midia_2.jpg','',26,'2023-07-21 13:54:03','2023-07-21 13:54:03'),(269,'midia_3.jpg','image/jpeg','../../public/img/projetos/26/midia_3.jpg','',26,'2023-07-21 13:54:03','2023-07-21 13:54:03'),(270,'midia_4.jpg','image/jpeg','../../public/img/projetos/26/midia_4.jpg','',26,'2023-07-21 13:54:03','2023-07-21 13:54:03'),(272,'midia_1.jpg','image/jpeg','../../public/img/projetos/2/midia_1.jpg','',2,'2023-07-23 01:19:14','2023-07-23 01:19:14'),(273,'midia_2.jpg','image/jpeg','../../public/img/projetos/2/midia_2.jpg','',2,'2023-07-23 01:19:14','2023-07-23 01:19:14'),(274,'midia_3.jpg','image/jpeg','../../public/img/projetos/2/midia_3.jpg','',2,'2023-07-23 01:19:14','2023-07-23 01:19:14'),(275,'midia_4.jpg','image/jpeg','../../public/img/projetos/2/midia_4.jpg','',2,'2023-07-23 01:19:14','2023-07-23 01:19:14'),(289,'midia_1.jpg','image/jpeg','../../public/img/projetos/18/midia_1.jpg','',18,'2023-07-29 15:05:57','2023-07-29 15:05:57'),(290,'midia_2.webp','image/webp','../../public/img/projetos/18/midia_2.webp','',18,'2023-07-29 15:05:57','2023-07-29 15:05:57'),(291,'midia_6.mp4','video/mp4','../../public/img/projetos/18/midia_6.mp4','',18,'2023-07-29 15:05:57','2023-07-29 15:05:57'),(316,'midia_1.jpg','image/jpeg','../../public/img/projetos/34/midia_1.jpg','',34,'2023-08-13 20:43:29','2023-08-13 20:43:29'),(317,'midia_2.jpg','image/jpeg','../../public/img/projetos/34/midia_2.jpg','',34,'2023-08-13 20:43:29','2023-08-13 20:43:29'),(318,'midia_3.jpg','image/jpeg','../../public/img/projetos/34/midia_3.jpg','',34,'2023-08-13 20:43:29','2023-08-13 20:43:29'),(319,'midia_4.jpg','image/jpeg','../../public/img/projetos/34/midia_4.jpg','',34,'2023-08-13 20:43:29','2023-08-13 20:43:29'),(320,'midia_5.jpg','image/jpeg','../../public/img/projetos/34/midia_5.jpg','',34,'2023-08-13 20:43:29','2023-08-13 20:43:29'),(321,'midia_6.mp4','video/mp4','../../public/img/projetos/34/midia_6.mp4','',34,'2023-08-13 20:43:29','2023-08-13 20:43:29');
/*!40000 ALTER TABLE `midia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ods`
--

DROP TABLE IF EXISTS `ods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `url_imagem` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ods`
--

LOCK TABLES `ods` WRITE;
/*!40000 ALTER TABLE `ods` DISABLE KEYS */;
INSERT INTO `ods` VALUES (1,'Erradica├º├úo da Pobreza','../img/ods/ods_1.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(2,'Fome Zero e Agricultura Sustent├ível','../img/ods/ods_2.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(3,'Sa├║de e Bem-Estar','../img/ods/ods_3.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(4,'Educa├º├úo de Qualidade','../img/ods/ods_4.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(5,'Igualdade de G├¬nero','../img/ods/ods_5.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(6,'├ügua Pot├ível e Saneamento','../img/ods/ods_6.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(7,'Energia Limpa e Acess├¡vel','../img/ods/ods_7.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(8,'Trabalho Decente e Crescimento Econ├┤mico','../img/ods/ods_8.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(9,'Ind├║stria, Inova├º├úo e Infraestrutura','../img/ods/ods_9.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(10,'Redu├º├úo das Desigualdades','../img/ods/ods_10.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(11,'Cidades e Comunidades Sustent├íveis','../img/ods/ods_11.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(12,'Consumo e Produ├º├úo Respons├íveis','../img/ods/ods_12.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(13,'A├º├úo Contra a Mudan├ºa Global do Clima','../img/ods/ods_13.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(14,'Vida na ├ügua','../img/ods/ods_14.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(15,'Vida Terrestre','../img/ods/ods_15.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(16,'Paz, Justi├ºa e Institui├º├Áes Eficazes','../img/ods/ods_16.svg','2023-07-08 16:44:07','2023-07-08 16:44:07'),(17,'Parcerias e Meios de Implementa├º├úo','../img/ods/ods_17.svg','2023-07-08 16:44:07','2023-07-08 16:44:07');
/*!40000 ALTER TABLE `ods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `causa` varchar(255) NOT NULL,
  `objetivo` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `parceiros` varchar(255) NOT NULL,
  `publico_alvo` varchar(255) NOT NULL,
  `resumo` text NOT NULL,
  `id_usuario` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `projeto_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES (1,'Tramanda├¡ mais Verde','Reflorestamento e arboriza├º├úo','Arborizar os espa├ºos p├║blicos de Tramanda├¡','Tramanda├¡ - RS','Sesc,Senac,Sindicato,Prefeitura Municipal de Tramanda├¡','Moradores e frequentadores de Tramanda├¡','O objetivo do projeto Tramanda├¡ mais Verde ├® arborizar os espa├ºos p├║blicos de Tramanda├¡ e, com isso, propiciar uma melhoria no bem-estar dos cidad├úos, bem como contribuir para a melhoria da qualidade do ar e da sensa├º├úo t├®rmica, entre outros benef├¡cios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 ├írvores em espa├ºos p├║blicos da cidade, em 5 anos.',1,'2023-07-08 16:44:07','2023-07-20 13:08:37'),(2,'Alvorada mais Verde','Reflorestamento e arboriza├º├úo','Arborizar os espa├ºos p├║blicos de Alvorada','Alvorada - RS','Sesc, Senac, Prefeitura Municipal de Alvorada','Moradores e frequentadores de Alvorada','O objetivo do projeto Alvorada mais Verde ├® arborizar os espa├ºos p├║blicos de Alvorada e, com isso, propiciar uma melhoria no bem-estar dos cidad├úos, bem como contribuir para a melhoria da qualidade do ar e da sensa├º├úo t├®rmica, entre outros benef├¡cios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 ├írvores em espa├ºos p├║blicos da cidade, em 5 anos.',2,'2023-07-08 16:44:07','2023-07-23 01:19:14'),(16,'Juventude Tech','Ensino e prepara├º├úo para o mercado de trabalho','Realizar aulas e oficinas voltadas para a tecnologia e o ensino de jovens para que estes possam buscar coloca├º├úo profissional','Florian├│polis - SC','EdTech, E.M.E.B. Floripa','Crian├ºas e jovens em idade escolar e que se interessam por tecnologia','Realizamos aulas e oficinas voltadas para a tecnologia, angariando parcerias com as escolas do munic├¡pio para atingir cada vez mais pessoas. Ensinamos desde o b├ísico da inform├ítica at├® conceitos iniciais da engenharia de software, conforme o conhecimento e desempenho dos alunos, e buscamos a coloca├º├úo profissional dos nossos estudantes em idade adequada junto com empresas aliadas a nossa causa.',1,'2023-07-20 13:27:16','2023-07-20 13:27:16'),(18,'Vida de Cinema','Cinema e cultura','Divulgar e explicar grandes obras do cinema para quem quer descobrir mais sobre a hist├│ria das grandes telas.','Porto Alegre - RS','Casa de Cultura, Cinema Vit├│ria, Cinemateca Capit├│lio','Todos os interessados em filmes e cinema','Mostras de cinema com filmes cl├íssicos e atuais, seguidos de palestras e rodas de conversa para debater inspira├º├Áes, enredo, figurino, trilhas, etc. Interessados em participar devem buscar os hor├írios das pr├│ximas reuni├Áes e comparecer com 1kg ou mais de alimentos n├úo perec├¡veis, que ser├úo doados para institui├º├Áes de caridade. Contato WhatsApp: (51) 9 9882-3396.',3,'2023-07-20 14:04:33','2023-07-29 15:05:57'),(19,'Blues Workshops','Educa├º├úo musical e propaga├º├úo da cultura','Divulgar a hist├│ria do g├¬nero musical Blues, bem como os artistas que fazem parte do movimento','Vit├│ria - ES','History Pub, Gianini','Todas as pessoas interessadas em hist├│ria e m├║sica','Realizamos shows, palestras e cursos sobre hist├│ria da m├║sica, sempre focando no g├¬nero musical Blues. Tamb├®m conectamos artistas com estabelecimentos que buscam atra├º├Áes musicais, e divulgamos o trabalho da comunidade nas nossas redes sociais. Parte do dinheiro arrecadado pelo projeto ├® destinado ├á organiza├º├Áes beneficentes que auxiliam fam├¡lias de baixa renda.',3,'2023-07-20 14:18:11','2023-07-21 13:21:23'),(20,'Uni├úo Match Sinuca','Reunir cada vez mais pessoas para a pr├ítica da sinuca como esporte','Divulgar, propagar e conscientizar as pessoas sobre a sinuca como esporte, por meio de aulas e campeonatos regulamentados.','Canoas - RS','Match Clube de Sinuca','Todos os interessados por sinuca e esporte','Organizamos aulas e campeonatos de sinuca, jogando nas regras bola 8, inglesa e six red. Nosso objetivo ├® combater o preconceito contra a sinuca como um jogo de bar, muitas vezes criminalizado, e trazer a beleza do esporte para o imagin├írio p├║blico. O nosso clube est├í aberto todos os dias, inclusive feriados, das 17h em diante; fechamos conforme o movimento, mas n├úo antes da meia-noite.',7,'2023-07-20 16:36:38','2023-07-20 17:00:25'),(23,'Ar Mais Puro','Conscientiza├º├úo e preserva├º├úo do meio ambiente','Contribuir para a preserva├º├úo do planeta por meio de projetos ambientalistas','Pindamonhangaba - SP','Floricultura Pequena Semente','Moradores de Pindamonhangaba e do estado de S├úo Paulo','Plantamos ├írvores e recolhemos lixo das ruas; tamb├®m realizamos a├º├Áes de conscientiza├º├úo para que as pessoas percebam a import├óncia de preservar o meio ambiente e adquiram h├íbitos de cuidado com o planeta.',7,'2023-07-20 17:39:07','2023-07-20 17:59:42'),(24,'TI Para Todos','Educa├º├úo, tecnologia e encaminhamento profissional','Ensinar tecnologia para pessoas que n├úo possuem acesso ├á educa├º├úo de qualidade','S├úo Paulo - SP','SESC SP, SENAC','Pessoas em situa├º├úo de vulnerabilidade que desejam forma├º├úo em tecnologia','Oficinas e cursos voltados para a tecnologia dedicados ├á pessoas em situa├º├úo de vulnerabilidade que n├úo possuem condi├º├úo ou oportunidade de buscar aprimora├º├úo profissional. Buscamos parcerias com empresas para realizar o encaminhamento profissional dos participantes do projeto.',7,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(25,'Conquistando o Mercado','Inser├º├úo de jovens no mercado de trabalho','Capacitar e inserir jovens que buscam oportunidades no mercado de trabalho','S├úo Jos├® do Vale do Rio Preto - RJ','','Jovens que buscam coloca├º├úo professional e oportunidades de emprego','Buscamos capacitar e inserir jovens no mercado de trabalho por meio de parcerias com sindicatos e institui├º├Áes de ensino, reduzindo assim o desemprego e a desigualdade no nosso pa├¡s.',6,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(26,'Livros que Salvam','Educa├º├úo e propaga├º├úo da cultura','Disseminar a leitura em comunidades com baixo ├¡ndice de escolaridade','Porto Alegre - RS','Associa├º├úo de leitores de Porto Alegre, Livraria Bom Livro, Sebo Velha P├ígina','Crian├ºas e jovens que n├úo conclu├¡ram os estudos ou tem interesse em leitura','Reunimos crian├ºas e adolescentes que possuem interesse pela leitura ou ainda n├úo conclu├¡ram seus estudos para incentiv├í-los a ler cada vez mais. Realizamos parcerias com livrarias e sebos para distribuir os livros nas comunidades; organizamos rodas de leitura e saraus, al├®m de debates sobre estrutura e enredo dos livros. Tamb├®m aceitamos doa├º├Áes e sugest├Áes de livros!',3,'2023-07-20 22:04:38','2023-07-21 13:54:03'),(34,'Melodias da Vida','Educa├º├úo musical e qualidade de vida ','Melhorar a vida das pessoas por meio do ensino da m├║sica ','Porto Alegre - RS','Por├úo Musical, CifraClub','Todos os interessados em participar ','Promovemos o bem-estar e o conhecimento musical por meio de oficinas, cursos e rodas voltadas para ensino da m├║sica e teoria musical; interessados em participar, tanto para ensinar quanto para aprender, s├úo bem-vindos. Aceitamos doa├º├Áes de materiais e instrumentos musicais. Contato WhatsApp: (51) 99876-1131.',15,'2023-07-29 16:24:52','2023-08-13 20:43:29');
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_ods`
--

DROP TABLE IF EXISTS `projeto_ods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_ods` (
  `id_projeto` int NOT NULL,
  `id_ods` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_projeto`,`id_ods`),
  KEY `id_ods` (`id_ods`),
  CONSTRAINT `projeto_ods_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id`),
  CONSTRAINT `projeto_ods_ibfk_2` FOREIGN KEY (`id_ods`) REFERENCES `ods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_ods`
--

LOCK TABLES `projeto_ods` WRITE;
/*!40000 ALTER TABLE `projeto_ods` DISABLE KEYS */;
INSERT INTO `projeto_ods` VALUES (1,11,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(1,13,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(1,15,'2023-07-20 13:08:37','2023-07-20 13:08:37'),(2,11,'2023-07-23 01:19:14','2023-07-23 01:19:14'),(2,13,'2023-07-23 01:19:14','2023-07-23 01:19:14'),(2,15,'2023-07-23 01:19:14','2023-07-23 01:19:14'),(16,4,'2023-07-20 13:27:16','2023-07-20 13:27:16'),(16,10,'2023-07-20 13:27:16','2023-07-20 13:27:16'),(16,17,'2023-07-20 13:27:16','2023-07-20 13:27:16'),(18,2,'2023-07-29 15:05:57','2023-07-29 15:05:57'),(18,3,'2023-07-29 15:05:57','2023-07-29 15:05:57'),(18,4,'2023-07-29 15:05:57','2023-07-29 15:05:57'),(19,1,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(19,4,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(19,17,'2023-07-21 13:21:23','2023-07-21 13:21:23'),(20,3,'2023-07-20 17:00:25','2023-07-20 17:00:25'),(20,4,'2023-07-20 17:00:25','2023-07-20 17:00:25'),(20,17,'2023-07-20 17:00:25','2023-07-20 17:00:25'),(23,11,'2023-07-20 17:59:42','2023-07-20 17:59:42'),(23,13,'2023-07-20 17:59:42','2023-07-20 17:59:42'),(23,15,'2023-07-20 17:59:42','2023-07-20 17:59:42'),(24,1,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(24,4,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(24,9,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(24,17,'2023-07-20 19:04:58','2023-07-20 19:04:58'),(25,1,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(25,8,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(25,9,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(25,17,'2023-07-20 19:31:51','2023-07-20 19:31:51'),(26,3,'2023-07-21 13:54:03','2023-07-21 13:54:03'),(26,4,'2023-07-21 13:54:03','2023-07-21 13:54:03'),(26,17,'2023-07-21 13:54:03','2023-07-21 13:54:03'),(34,3,'2023-08-13 20:43:29','2023-08-13 20:43:29'),(34,4,'2023-08-13 20:43:29','2023-08-13 20:43:29');
/*!40000 ALTER TABLE `projeto_ods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230413145343-create-ods.js'),('20230413154321-create-usuario.js'),('20230413154425-create-projeto.js'),('20230413154610-create-midia.js'),('20230413160139-create-projeto_ods.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `hash_senha` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `cep` varchar(255) NOT NULL,
  `logradouro` varchar(255) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `uf` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juca da Silva','juca@projetosomar.com','juca_s','ddbef2b610e422b4985c268c015a55e27e69a911790187413a2adf52bc3647e375d74c58d0c824b74572a469314ea28653006f85d1971d6fcf1fb03c9fbec6ec','2ceb3b70c876ad982127be383fc71a39','51 98765-0987','90040191','Avenida Ven├óncio Aires',NULL,'93','Azenha','Porto Alegre','RS','2023-07-08 16:44:07','2023-07-08 16:44:07'),(2,'S├¡lvia Dias','silvia@projetosomar.com','silviads','e3d8dbfe489a0009f42cbc8beae4580439949d431ca109331d293f73be28b4abd23e028b7d7ddf20d4c293f0af08f1d59cf46ef03be5ba51fdba07b26dcfff43','4da5646341c2a95935fd8ff1b2930b99','51 99875-0876','90040191','Avenida Ven├óncio Aires',NULL,'93','Azenha','Porto Alegre','RS','2023-07-08 16:44:07','2023-07-08 16:44:07'),(3,'Lucas Oliveira','xlucaspx@gmail.com','Lucaspx','1f9d442a8c9ebb572a86165aca0bf6623b567ba00c95558a5d010f39df60ce16e99ab9f6a79c7612ab2344553cbe1313241dd9107f060670e5363dd1359892cc','e9bbbbea0c022a2ad68772591399a164','51 9 8345-8876','90010-340','Pra├ºa dos A├ºorianos','','','Centro Hist├│rico','Porto Alegre','RS','2023-07-08 19:21:21','2023-07-08 19:21:21'),(5,'Lucas da Paz','lucas@email.com','lucas-paz','bcbf9d4cd5fd95e6f60daedce3638218a56c9fb2c73a3b88ea178db97760ba8034d3e6d60c944c92ebcb34acf95d81beee3e9b93e84179ea7c23625092db8903','50ded712c7583cd9f99bc4c785b974a8','51 9 8535-0808','90040191','Avenida Ven├óncio Aires','','93','Azenha','Porto Alegre','RS','2023-07-20 12:54:05','2023-07-20 12:54:05'),(6,'Felipe Verdade','felipe@email.com','felipe-verdade','9b9e11a18af039e9b9c9741c469d836295c98dd11c3405ac7eef3a56d594e6454f5b5143cc788554120d7a7d6b579f7e3417e3d6687facd5f336654fa544834b','279be22c72214644d7400bbb9c954657','54 3342-0981','91450-310','Rua Gildo de Freitas','Apt. 206','93','Morro Santana','Porto Alegre','RS','2023-07-20 12:55:41','2023-07-24 13:07:45'),(7,'Glauber Martini','glauber@email.com','glauber-martini','1e9e4aa4c2c8aad9f8f79f46c5e2d219de102c9dcf099cf5be52be9406f42534c80e54e0bfc12e4411a298662db0350f93605c88e9a75226d7718d43e67f4b6e','dd2c62411e092fe0c4602cd6dc58b945','(51) 9 8766-9987','90240-160','Pra├ºa Navegantes','','12','Navegantes','Porto Alegre','RS','2023-07-20 12:57:50','2023-07-20 12:57:50'),(15,'Lucas da Paz','lucas@gmail.com','lucas-oliveira','ccb1017d56f02ad78de5ec5d86c4be66989dff50d52b2302b04daeb5036f677c9f647ee0abc48bb800c8474bbb927aabfc06df8d001959f216e452379c88c3d3','4022d2e20da30086f8e1a15b9fe8de4c','(51) 99876-1131','90200-500','Rua Fecom├®rcio','','101','Anchieta','Porto Alegre','RS','2023-07-29 16:21:17','2023-07-29 16:28:37');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-15 11:13:21

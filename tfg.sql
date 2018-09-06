-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: tfg
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `admin_usuario` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (16),(17);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cita`
--

DROP TABLE IF EXISTS `cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(300) NOT NULL,
  `hora` varchar(300) NOT NULL,
  `paciente` int(11) NOT NULL,
  `medico` int(11) NOT NULL,
  `origen` varchar(300) DEFAULT NULL,
  `tipo` tinyint(4) NOT NULL,
  `codigo` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`,`paciente`,`medico`),
  KEY `cita_paciente` (`paciente`),
  KEY `cita_medico` (`medico`),
  CONSTRAINT `cita_medico` FOREIGN KEY (`medico`) REFERENCES `medico` (`id`),
  CONSTRAINT `cita_paciente` FOREIGN KEY (`paciente`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (28,'18e80531c2541e8e0ac2b59dd546cfb6c3a141fefe0225642234eb014af3395d','15ed6acfaded17f65fc33605bf4705d85f4e9af7dca5b3567fc46e1519759f4f',5,3,'pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp',1,'9a266ebd3eda1db3a5ccf6a06a018b5043a241d1a4d2ff7c20e2a088bccca5ac'),(29,'23501829a13fc6454db29000ecefee3a82a5ce26a679bca990f26b7f09247325','bd382eeb17725026a1c5488af1d67d42a8387c2eb35f873a6921b7cdcf21d9bf',4,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',1,'32737d418f83672a0d5749d69da63048914bd06720643a90122fb65d2087ba47'),(30,'22d71f26f20adc22011ac7bffbd261811d9193ee4c8924fbc480791d5f9dc46e','1cd92db379910110dc96358d1d785a6b282a352774df443768d3e3f649cfa387',5,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',1,'d17e900b5abc2725d36abdf679cd9f6fcad3ee5f99b389fbd3ed06f208aafd25'),(31,'a5ab1f040a3318c03b5eec393e8c7efe9e73802b0bec017d100cb2d6febd4157','d8c8026dc836adae4a3a05448cbffa0a2451af39c088d00822bc095d392f6f75',5,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',0,'dee28326faeff6fa1ef28d6bde35975d0cde8d8aa456c8f243efabc5cb5ae545'),(32,'943f704f4c2f272e331c3d42860e281041bcb71242e6c9a3d19fca14855ba063','5e0367fa2244bd445da7262b2e0e480242c541c3dc0669ac11d14c9ea7516e70',5,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',0,'ddaa5f7611ee3971aa1941006f63a4800a3b87db348a55669b873413b6137dfd'),(33,'56a3469a84e991703b729cd907a632a115653a593997b97b0c616775731515a2','1c1e5a6322d104c201412e6ca40eecacec1bca825bb363260bf285eed20a3779',4,3,'pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp',0,'eff798a44326cedba2b7b201984056017657e3b2673ca5d199e32b2450b14a03'),(34,'778bbf0f3363f44b2d897cb14a3de242cb67f0f9e79de51b9f1d72a35994e0e2','9b313b3eb75f9c95876f72e3c8f812e12882cfbcf6d9981ac16b3c16698955f5',4,3,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'191cdf053b39e8a996dc0c42e4590731b370827ba48ef6387aaac91f9be6514b'),(35,'58126618fa533d94ba65c5783fff094ef57637d65a26d2f71990f17da61ae894','713dbccc9af204f68170c23e52151716a57f26f77e5d7f93c21a019cb626733b',4,15,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'Qm4im'),(36,'417091b2e3bfcac1d3410ef9371d3341b89d7d40613e21db970e0e1fd0c70ffa','b32476267c813f1aefc429f62a06175e43b1c03541a67afd04ecc75284037b13',4,3,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'H9Ouw'),(37,'c1ff64d55662dcd9bf5d8966f04d6f6f9e895f3b638539bb411d4da487b8b019','77696d7f0c9251a8082e7db12cf3fea5fe4466dc3c5d9c738c6a2be6c9b22a49',4,3,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'bhYoo'),(38,'fc760d911ce22f3bc021a0dafcd6c9613856b7625929961592f3277930cd4bd0','17c36906a5245b1500f8804b8fe5f86f515328f9f4ab05169a8ae44a104bb4e2',4,15,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'caWf3'),(39,'e015c0fd847c8879b6141c78f2f096b04a373f1889c092aea3918ed3acb13b2f','2cc0d40382c89c103c6c45d248092db8e4fb26a7341c41fe635141ba20fa24ca',4,15,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'QBIXB'),(40,'747b16cde85803b1c843d9a22db4ac6a089c70b8b4582d86192ce2eec64c7b53','d623f864771305fb935bababfc5bd8f8ffd0ca20f9a2b4870ee0ef8f95b898cd',4,3,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'AqxRe'),(41,'f0523ce2a3db57ab9a4c33b44aad81e9dc8126c68ad787861df14225f606cdad','9e0628db02b9cd831304d185940d6dbcb8ef5c153054c8be71a44316e77e874f',4,3,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'T1CKt'),(42,'b5a3d8f980811aa740d690387ac1c6555b6d503628666b54cf2c0bcb24c737bd','1696f5e2650de48a56d7ca474fcc4cafff1f1a80409190c3fa82713ce5512486',4,15,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'dZ4Wh'),(43,'9fadc1ae2dc38871bbd9070f0ba0d69e8ea1575e86594d90be79f07ecdfd926b','1fc72a16aebe21459c5833a19d9894476e5fad4f0557cc8aa66c46150fb3042f',4,15,'oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',1,'cBPL6');
/*!40000 ALTER TABLE `cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulta`
--

DROP TABLE IF EXISTS `consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consulta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `historial` int(11) NOT NULL,
  `fecha` varchar(500) NOT NULL,
  `motivo` varchar(1000) NOT NULL,
  `enfermedad_actual` varchar(5000) NOT NULL,
  `diagnostico` varchar(1000) NOT NULL,
  `tratamiento` varchar(300) NOT NULL,
  `clave_origen` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`,`historial`),
  KEY `consulta_historial` (`historial`),
  CONSTRAINT `consulta_historial` FOREIGN KEY (`historial`) REFERENCES `historial_clinico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES `consulta` WRITE;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
INSERT INTO `consulta` VALUES (46,4,'a4f290d853b3083f11b912dbf4ef36ed1a0cc07552b744aca4242fd8ecfaad80','f37c235565b84cbde6a06d83e43c21c4621c2aa9cb1e6c79542012541e14529e','3501bb880a298dc5759b54a0ea786ee029bf02e699948fb1a9fb70c5f8352d8d','13794c4fa3039b7692b2d49b9d0424c4aaf50c7d09b8c6578f398ddb5db8bf8a','c35ac9cf9b78fc2a2345fcc90a1999408460d19c0d356f95abb34ae4b97cdc13','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV'),(47,4,'5042b52976990a2b8db9cf36b5f6a9d7c62d317a585a6954ff9d94c2787564ad','b15bd45410c97184fd2155465386721471910be6ca6185dd544bf0b88d495773','278c534df70bae78993da381e2c59bb7f58b7cfb5ee311f5680d226e366c1c84','f3702e83f312a99cabb50ca0d3754e1e357ad835b831f976604476e7af7ddbcc','c5821bdd94f1369f93d079070b2d8f0cabc26cef6d1b1d74abb82798af398794','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV'),(48,4,'e47e10a2dd4a2461047eb4a71316114ac264882a908179162219a9f3593fde04','9e88cfbb4a5716ed835c8349013339afff3439beef378f0ec4b3d5e7cbe7c246','cb83bea63cff9504478f410f88569581bcb47bd0eb575667bcce0d63e96ea9b775c0d0678796bdd969746c49123239fe','be8242ff421abc2532c3cebda008c577b7a55a4959eb158007763246b79e1e05','304be9844ed6a47e92f497ce2c2168ec0ce6ca9d77253e95849fd0db057a9a2b','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp');
/*!40000 ALTER TABLE `consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medico` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  PRIMARY KEY (`id`,`medico`),
  KEY `especialidad_medico_idx` (`medico`),
  CONSTRAINT `especialidad_medico` FOREIGN KEY (`medico`) REFERENCES `medico` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,15,'Cirujano'),(2,3,'Familia'),(3,11,'Oftalmólogo');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` int(11) NOT NULL,
  `descripcion` int(11) NOT NULL,
  PRIMARY KEY (`id`,`usuario`),
  KEY `evento_usuario` (`usuario`),
  CONSTRAINT `evento_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fecha`
--

DROP TABLE IF EXISTS `fecha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fecha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fecha`
--

LOCK TABLES `fecha` WRITE;
/*!40000 ALTER TABLE `fecha` DISABLE KEYS */;
/*!40000 ALTER TABLE `fecha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fecha_evento`
--

DROP TABLE IF EXISTS `fecha_evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fecha_evento` (
  `id_evento` int(11) NOT NULL,
  `id_fecha` int(11) NOT NULL,
  PRIMARY KEY (`id_evento`,`id_fecha`),
  KEY `evento_fecha` (`id_fecha`),
  CONSTRAINT `evento_fecha` FOREIGN KEY (`id_fecha`) REFERENCES `fecha` (`id`),
  CONSTRAINT `fecha_evento` FOREIGN KEY (`id_evento`) REFERENCES `evento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fecha_evento`
--

LOCK TABLES `fecha_evento` WRITE;
/*!40000 ALTER TABLE `fecha_evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `fecha_evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_clinico`
--

DROP TABLE IF EXISTS `historial_clinico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historial_clinico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) NOT NULL,
  `nif` varchar(300) NOT NULL,
  `edad` varchar(300) NOT NULL,
  `sexo` varchar(300) NOT NULL,
  `nacionalidad` varchar(300) NOT NULL,
  `estado_civil` varchar(300) NOT NULL,
  `ocupacion` varchar(300) NOT NULL,
  `lugar_origen` varchar(300) NOT NULL,
  `domicilio` varchar(300) NOT NULL,
  `alergias` varchar(300) NOT NULL,
  `peso` varchar(300) NOT NULL,
  `altura` varchar(300) NOT NULL,
  `antecedentes` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `historial_paciente` FOREIGN KEY (`id`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_clinico`
--

LOCK TABLES `historial_clinico` WRITE;
/*!40000 ALTER TABLE `historial_clinico` DISABLE KEYS */;
INSERT INTO `historial_clinico` VALUES (4,'d3bbd2d3593cb9bb273ae56fae657d26a796ec29a0752cc71f73613a265c215b','635e5bc6163656acb9745ee49abd30e2da6ad9b6f47ec4939c46d37b42720b76','230da3db54b7d8d535faf60119fcd507d4df05bd7dad453db866619662c96ac5','5b95ae380683028bd3bb06a9e49cfe726edff23e0e768aee77552b3d7306fd5f','ecefa3ce615127d80796a3997743c885fb6a244e1644a945665ede27a28840f0','5c3acac5b83e341f11397f06b8dcd38ce8dfc2f88143c85cbf1d70b52e10cd79','433156bd54fd3538df8d2b98a1f57f47b327118a5a501a751859b73c7cac6ccc','289f016dcae057a456b2911dba64c070189ae120e1316ba29e4d4531c29479ef','68b4c8dc5070477ab126d500d420ccf817fbe01406701da168a7bc470f0d447a16df665f0afa4aeb77fd1e6c174e1bcf','198f5093de31b375af493bb7e2e085c530ed8c46b4e969e1e6a3483144e05d2d','589c487e7566d3f8174c876861a30161dd419fbab198ed2ac8634eb7296a680f','61ec92c78b12ee8f243e18bac6940df7b287c96fe3d2fb02a23a15aaf859cf19','e0305e2bb1bcc1564e79006b65d48dda467074acf42364aec12bf3f141abf84a6abc0bb1d2fbbe488b99aed6e07b3c5e');
/*!40000 ALTER TABLE `historial_clinico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medico`
--

DROP TABLE IF EXISTS `medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `validado` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `medico_usuario` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medico`
--

LOCK TABLES `medico` WRITE;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` VALUES (3,1),(11,NULL),(15,NULL);
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origen` int(11) NOT NULL,
  `destino` int(11) NOT NULL,
  `texto` varchar(1000) NOT NULL,
  `clave_origen` varchar(300) NOT NULL,
  `nombre_origen` varchar(300) DEFAULT NULL,
  `nombre_destino` varchar(300) DEFAULT NULL,
  `asunto` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`,`origen`,`destino`),
  KEY `mensaje_origen` (`origen`),
  KEY `mensaje_destino` (`destino`),
  CONSTRAINT `mensaje_destino` FOREIGN KEY (`destino`) REFERENCES `usuario` (`id`),
  CONSTRAINT `mensaje_origen` FOREIGN KEY (`origen`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensaje`
--

LOCK TABLES `mensaje` WRITE;
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
INSERT INTO `mensaje` VALUES (10,15,4,'c9ca69b7229fd807342f28e9c7c70c3415eb23eb590fd0b0cb97da4960adbf11','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV','hulio','bea','572eac57a4f12ce8fc52f2a7e99f34d92df660c8f7d45801390f791f6f99fe90'),(11,15,4,'0e46c475c32fa19e6b132d09b389fc9160d4e3c5d54e413d6c88bffc8973b944','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV','hulio','bea','bea7d4c0677067fa83caaf62c31d2431d5e16b80b1177ad0715d41b8d8394ad9'),(12,15,4,'5bdd66841cd0c2a16afc97c6ddb3ed2a4e5fa64cb33a87566156616b2c75b298','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV','hulio','bea','a0a972d1cca9bb405b9d5f1110874683e92c87723fcc8147678b76517e09f071');
/*!40000 ALTER TABLE `mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `sip` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `paciente_usuario` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (4,12345678),(5,87654321),(10,15345345);
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medico` int(11) NOT NULL,
  `tratamiento` varchar(300) NOT NULL,
  `dosis` varchar(300) NOT NULL,
  `fecha` int(11) NOT NULL,
  PRIMARY KEY (`id`,`medico`),
  KEY `receta_medico` (`medico`),
  CONSTRAINT `receta_medico` FOREIGN KEY (`medico`) REFERENCES `medico` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) DEFAULT NULL,
  `apellidos` varchar(300) DEFAULT NULL,
  `email` varchar(300) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(900) NOT NULL,
  `salt` varchar(300) DEFAULT NULL,
  `clave` varchar(300) DEFAULT NULL,
  `disponible` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,'Roberto Andre','Vega','robertoandrevega3d@gmail.com','andre','SIpfxURhNLCexZc5BkP1rGDGAlcqHCjH2ab0mmZRJWb8rN+JCYB6EIsGxZqCrf+wY7XGq3CHMyo5LQbOrdbfvg==','9o2oYVDFwYF7XmLpC9a6QaOeYVB3L68hePcILr8iTZXZ3oc3WEx2uLxXZct8PsJ/GuHdvSZXUCxWcLag/M+ApQ==','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp',1),(4,'Beatriz','Asensi','beatrizasensi17@gmail.com','bea','Zf3yfCSKC+kfnDNVONjSu55Mg42htDM7rNJhoBYI1N/myvDssBN1U8M3Xsles/EIx5Xrdyn1chQEGyF1suPn/g==','HvmuWwCzfj+Nlu3lC1IBMvcYadUwRaCi+IuRwO8iWIt4vJQFn+I6yxkced9sdZTA3o6dV/D9FqJQsQXGzfD0JQ==','djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',1),(5,'Sergio Julio','Garcia','sergio@gmail.com','sergio','UbGOvDNrH+pwUB7oRDgoUi3CW80bWzexfsxhwy/mTeZFi5lrGT3hih4VgBhc4rKwSjr+taKEopgqGXkaWc2qvQ==','4tQ/UOO40E+6R5LLAfbQTx9wU9L9u3AG+b65Rh+uhdYi57EcZr/619fQa8QoKgW9UssqlatUpiSHpSGN7tdfEQ==','ZekBPZU8fGmO+Uoqo098J2i62JCvHvIV',1),(10,'Luis Pascual','Martí','luis@gmail.com','luis','+pVli+Eu9hHfOcbzgzb/RTlRhJ5IHeP9PUY3xKjK9+LGFNSp6fOAZZUqsmEHFkCraigX5YcbWdNX+haKycJrQg==','sE5Bh0KUT87b756iIhVKQZ73lFkK0ykXyy9C2nr33tGxttj57G0tiviMu/JP2oOXA4cm8UmR3QHpR9CyQIrhxg==','0aFhBOeGY1l+Wb8v45XzsGmMB4PZGd2r',NULL),(11,'Lawrence Arthur','Rider García','larry@gmail.com','larry','AelzmP0uVF9jumKXjbgQo8LuwTWppRnujUyg06xv9MnkovK/gKI3g41CpJn/+6n5DaYiDTIysKZ2gO842gaDDQ==','E+i27ZSHsnspUZ+W6dAmSKTu5AkHiVqBnJOGPfk1AE4EHm9AKONL07hLQgdPvcnghb4zWBvX/4qMK/A2O/52Ig==','JJ/lJBUk6jeeEcX2wAC9u8LNwDMjT0SS',NULL),(15,'Hulio','De La Fuente','Hulio@gmail.com','hulio','T5JCnXCs5zCoRC2nkQhk4UGHgbK63V6mkmjao9cUIWrdKMKpncnlIjkbx2y/brjyasIbuwSRhsbpBYte91sF3A==','/h5QrX8t436ZT655MktaZtFIOEP/o3t6Ys5xd/Ydu8UshIXQs23PCGQkKnDqmuC2k2RSlbiLbk8Th/22s5BCiw==','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',NULL),(16,'admin','admin','robertoandrevega3d@gmail.com','admin','SIpfxURhNLCexZc5BkP1rGDGAlcqHCjH2ab0mmZRJWb8rN+JCYB6EIsGxZqCrf+wY7XGq3CHMyo5LQbOrdbfvg==','9o2oYVDFwYF7XmLpC9a6QaOeYVB3L68hePcILr8iTZXZ3oc3WEx2uLxXZct8PsJ/GuHdvSZXUCxWcLag/M+ApQ==',NULL,NULL),(17,'admin2','admin2','beatrizasensi17@gmail.com','admin2','Zf3yfCSKC+kfnDNVONjSu55Mg42htDM7rNJhoBYI1N/myvDssBN1U8M3Xsles/EIx5Xrdyn1chQEGyF1suPn/g==','HvmuWwCzfj+Nlu3lC1IBMvcYadUwRaCi+IuRwO8iWIt4vJQFn+I6yxkced9sdZTA3o6dV/D9FqJQsQXGzfD0JQ==','djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consulta` int(11) NOT NULL,
  `video` varchar(300) DEFAULT NULL,
  `mensajes` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`,`consulta`),
  KEY `video_cita_idx` (`consulta`),
  CONSTRAINT `video_consulta` FOREIGN KEY (`consulta`) REFERENCES `consulta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (11,46,'f1d48708b1ce149301723df583ddd1cd4d4fbfb3e3b7ffcdc2452b5b6bb5dacea14ea286cd190f891841a3a21f641f63','6edd73d9f0f9b404a8a522ce51ea1f5bb8e309c91d0fc5c987b6b727bf8f0b7c093301a9915a36fea7d9faf53699d08fdafa3e665908c5a4eb7db5a2e1cf83c1'),(12,47,'4497c2c08c0321953f6de4a4bdce92a8f2fc5cdc395fdcbf973d460e9ebc1249ab41f0070b9d4d54456a8b7223c16f35','c234f20d0caeb3ad639e86ec7260c04a601c9671f91b37d3ac4f823afc68190ab7396ad2232a6b39fde38f0ee4721c1e');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-01 11:27:02

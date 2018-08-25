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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (3);
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (28,'18e80531c2541e8e0ac2b59dd546cfb6c3a141fefe0225642234eb014af3395d','15ed6acfaded17f65fc33605bf4705d85f4e9af7dca5b3567fc46e1519759f4f',5,3,'pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp',1,'9a266ebd3eda1db3a5ccf6a06a018b5043a241d1a4d2ff7c20e2a088bccca5ac'),(29,'23501829a13fc6454db29000ecefee3a82a5ce26a679bca990f26b7f09247325','bd382eeb17725026a1c5488af1d67d42a8387c2eb35f873a6921b7cdcf21d9bf',4,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',1,'32737d418f83672a0d5749d69da63048914bd06720643a90122fb65d2087ba47'),(30,'22d71f26f20adc22011ac7bffbd261811d9193ee4c8924fbc480791d5f9dc46e','1cd92db379910110dc96358d1d785a6b282a352774df443768d3e3f649cfa387',5,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',1,'d17e900b5abc2725d36abdf679cd9f6fcad3ee5f99b389fbd3ed06f208aafd25'),(31,'a5ab1f040a3318c03b5eec393e8c7efe9e73802b0bec017d100cb2d6febd4157','d8c8026dc836adae4a3a05448cbffa0a2451af39c088d00822bc095d392f6f75',5,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',0,'dee28326faeff6fa1ef28d6bde35975d0cde8d8aa456c8f243efabc5cb5ae545'),(32,'943f704f4c2f272e331c3d42860e281041bcb71242e6c9a3d19fca14855ba063','5e0367fa2244bd445da7262b2e0e480242c541c3dc0669ac11d14c9ea7516e70',5,3,'djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',0,'ddaa5f7611ee3971aa1941006f63a4800a3b87db348a55669b873413b6137dfd'),(33,'56a3469a84e991703b729cd907a632a115653a593997b97b0c616775731515a2','1c1e5a6322d104c201412e6ca40eecacec1bca825bb363260bf285eed20a3779',4,3,'pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp',0,'eff798a44326cedba2b7b201984056017657e3b2673ca5d199e32b2450b14a03');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES `consulta` WRITE;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
INSERT INTO `consulta` VALUES (6,4,'0af8277ae5a588daef1f95166f74096963ee70388248ec15b365ead35c3eaba1','4ed142b9c43b6460d449211a74d1dc8ca29c13646db54e8aa09468e7b7132691','5d67299ea7547f0f50b3984d272af6c986a8f72a95a457cf9700bf7d323d635a','2d551ccceb0696fd6506215098dd4054551a66ed017477aa251e715469a2956e','069fbbfbe27bd04ff5820582f8da04eb597955fa24bd9e6dd873a30eb988236a','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp'),(7,4,'9e50550703223cde49ce4478d5a0296770bc4aea6c00b5c6dee92785352369fe','9cef75bcb31bc2d90266617429ec2e9901a4a7083efa9c36328708cd7c63e433f6329308317ad03c24a8482b0194d10a','5f618918e91d36c19e005ceb999d3d6c6fc32d2584773c25f63c755c98b5f1a8','b45c7fbbad89f4f5d2bb019d12417ee8a9d83306d4423139538681e74609cd8b','1e88951e2a0fd19f8531984c81a1f23a5a2581b4ec1576a16ec6b3f31a3c76f0','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp');
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
  CONSTRAINT `especialidad_medico` FOREIGN KEY (`medico`) REFERENCES `medico` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  PRIMARY KEY (`id`,`origen`,`destino`),
  KEY `mensaje_origen` (`origen`),
  KEY `mensaje_destino` (`destino`),
  CONSTRAINT `mensaje_destino` FOREIGN KEY (`destino`) REFERENCES `usuario` (`id`),
  CONSTRAINT `mensaje_origen` FOREIGN KEY (`origen`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensaje`
--

LOCK TABLES `mensaje` WRITE;
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
INSERT INTO `mensaje` VALUES (4,3,4,'5d410c4c62f68e843d97de963a5e249919c4fe23fa48066c45f6c847ac0168a3','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp'),(5,3,4,'aace824b0059e96e7c34d33b00e5188f0c28dde962dec1dc328146845efee586','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp'),(6,3,4,'8d8a9b338060d98b7ebb40378e8414161734e3117a8dc4787204770551c5d6e44bf977365702f1242b28fe40ce1a9af9','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp');
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
INSERT INTO `paciente` VALUES (4,123456789),(5,987654321),(10,15345345),(18,12345678);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,'Roberto Andre','Vega','robertoandrevega3d@gmail.com','andre','vmM8TBpjuWaF3p4xOdWRqSpnp07XUIjHmiG0nHxUz8Q928ogVfYUT9DeO5BTi2dZ9pewLzUnTQ6cYjG55Dm3GQ==','k3xAeuM0MQ+X5uWLxcPjhcpqVcMtO62TYgYQ3zVleEef6o6ozuikH/0ZgZAWRNKRISAbgH3XZcUSXzupPuTPZw==','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp',1),(4,'Beatriz','Asensi','beatrizasensi17@gmail.com','bea','Zf3yfCSKC+kfnDNVONjSu55Mg42htDM7rNJhoBYI1N/myvDssBN1U8M3Xsles/EIx5Xrdyn1chQEGyF1suPn/g==','HvmuWwCzfj+Nlu3lC1IBMvcYadUwRaCi+IuRwO8iWIt4vJQFn+I6yxkced9sdZTA3o6dV/D9FqJQsQXGzfD0JQ==','djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',NULL),(5,'Sergio Julio','Garcia','sergio@gmail.com','sergio','UbGOvDNrH+pwUB7oRDgoUi3CW80bWzexfsxhwy/mTeZFi5lrGT3hih4VgBhc4rKwSjr+taKEopgqGXkaWc2qvQ==','4tQ/UOO40E+6R5LLAfbQTx9wU9L9u3AG+b65Rh+uhdYi57EcZr/619fQa8QoKgW9UssqlatUpiSHpSGN7tdfEQ==','ZekBPZU8fGmO+Uoqo098J2i62JCvHvIV',NULL),(10,'Luis Pascual','Martí','luis@gmail.com','luis','+pVli+Eu9hHfOcbzgzb/RTlRhJ5IHeP9PUY3xKjK9+LGFNSp6fOAZZUqsmEHFkCraigX5YcbWdNX+haKycJrQg==','sE5Bh0KUT87b756iIhVKQZ73lFkK0ykXyy9C2nr33tGxttj57G0tiviMu/JP2oOXA4cm8UmR3QHpR9CyQIrhxg==','0aFhBOeGY1l+Wb8v45XzsGmMB4PZGd2r',NULL),(11,'Lawrence Arthur','Rider García','larry@gmail.com','larry','AelzmP0uVF9jumKXjbgQo8LuwTWppRnujUyg06xv9MnkovK/gKI3g41CpJn/+6n5DaYiDTIysKZ2gO842gaDDQ==','E+i27ZSHsnspUZ+W6dAmSKTu5AkHiVqBnJOGPfk1AE4EHm9AKONL07hLQgdPvcnghb4zWBvX/4qMK/A2O/52Ig==','JJ/lJBUk6jeeEcX2wAC9u8LNwDMjT0SS',NULL),(15,'Hulio','De La Fuente','Hulio@gmail.com','hulio','T5JCnXCs5zCoRC2nkQhk4UGHgbK63V6mkmjao9cUIWrdKMKpncnlIjkbx2y/brjyasIbuwSRhsbpBYte91sF3A==','/h5QrX8t436ZT655MktaZtFIOEP/o3t6Ys5xd/Ydu8UshIXQs23PCGQkKnDqmuC2k2RSlbiLbk8Th/22s5BCiw==','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',NULL),(18,NULL,NULL,'prueba@gmail.com','prueba','Hqs/04sFA/PwQyz1SqP++KFANZg/1swYscKfK6k/K1yYKsgL5NfbS5rOisAYhPoZPJ/lmrHvncln1Tk8VMktNA==','0DTf4Cl1X/d8lcw/0W2Myj/Ld7Dw8aiIsyTX+axqRWD9jkMVOWAYKWUEdCyPfqt33kbxpduvwu72qMNRasfchw==','vPbIVxxYf4SC/3gDQs8XU/a5eHC9GsLh',NULL);
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
  `video` varchar(300) NOT NULL,
  PRIMARY KEY (`id`,`consulta`),
  KEY `video_cita_idx` (`consulta`),
  CONSTRAINT `video_consulta` FOREIGN KEY (`consulta`) REFERENCES `consulta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
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

-- Dump completed on 2018-08-25 11:25:12

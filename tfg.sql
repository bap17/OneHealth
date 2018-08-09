-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: tfg
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.16.04.1

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
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
  `origen` int(11) DEFAULT NULL,
  `tipo` tinyint(4) NOT NULL,
  `codigo` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`,`paciente`,`medico`),
  KEY `cita_paciente` (`paciente`),
  KEY `cita_medico` (`medico`),
  CONSTRAINT `cita_medico` FOREIGN KEY (`medico`) REFERENCES `medico` (`id`),
  CONSTRAINT `cita_paciente` FOREIGN KEY (`paciente`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cita`
--

LOCK TABLES `cita` WRITE;
/*!40000 ALTER TABLE `cita` DISABLE KEYS */;
INSERT INTO `cita` VALUES (2,'fd1a137b79dfc477abbc359ff878b2121d79668f80f6dc908b9d2cd39736d704','0766817a4d4cab032c04633322d83dfa272b4555a3383a1f63777f73f0e9829d',5,3,3,0,NULL),(5,'46abb1425cb96e961b45eb8e1ac81541f779164259d5570c1a837a3fcac426b2','2e2b89a61b7c99647aa456e29ce93d7a7f1b85ecff5042ee8da6c6715f043655',5,3,3,1,'1c1f55538b9b68447f170d07285eb5ad12fb88d4a9c1f34c876396f27d0c32d3');
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
  `fecha` date NOT NULL,
  `motivo` varchar(1000) NOT NULL,
  `enfermedad_actual` varchar(5000) NOT NULL,
  `diagnostico` varchar(300) NOT NULL,
  `tratamiento` varchar(300) NOT NULL,
  PRIMARY KEY (`id`,`historial`),
  KEY `consulta_historial` (`historial`),
  CONSTRAINT `consulta_historial` FOREIGN KEY (`historial`) REFERENCES `historial_clinico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES `consulta` WRITE;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
INSERT INTO `consulta` VALUES (1,5,'2018-06-22','Dolor en el culo xd','Herpes','Herpes en el culo','pomadas'),(2,5,'2018-06-29','Dolor en el culo xd','Herpes','Herpes en el culo','pomadas');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,15,'Cirujano');
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
  `edad` int(11) NOT NULL,
  `sexo` varchar(300) NOT NULL,
  `nacionalidad` varchar(300) NOT NULL,
  `estado civil` varchar(300) NOT NULL,
  `ocupacion` varchar(300) NOT NULL,
  `lugar de origen` varchar(300) NOT NULL,
  `domicilio` varchar(300) NOT NULL,
  `alergias` varchar(300) NOT NULL,
  `peso` float NOT NULL,
  `altura` float NOT NULL,
  `antecedentes` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `historial_paciente` FOREIGN KEY (`id`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_clinico`
--

LOCK TABLES `historial_clinico` WRITE;
/*!40000 ALTER TABLE `historial_clinico` DISABLE KEYS */;
INSERT INTO `historial_clinico` VALUES (4,'Beatriz Asensi','87654321Y',23,'Mujer','Española','soltera','Informatica','aspe','calle tutankamon','la vida',0,1.65,'no'),(5,'Sergio Julio Garcia','12345678X',26,'Hombre','Española','soltero','Informatico','desconocido','calle las flores','coca cola',75,1.75,NULL);
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
  PRIMARY KEY (`id`,`origen`,`destino`),
  KEY `mensaje_origen` (`origen`),
  KEY `mensaje_destino` (`destino`),
  CONSTRAINT `mensaje_destino` FOREIGN KEY (`destino`) REFERENCES `usuario` (`id`),
  CONSTRAINT `mensaje_origen` FOREIGN KEY (`origen`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensaje`
--

LOCK TABLES `mensaje` WRITE;
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
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
INSERT INTO `paciente` VALUES (4,123456789),(5,987654321),(10,15345345);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (3,'Roberto Andre','Vega','robertoandrevega3d@gmail.com','andre','vmM8TBpjuWaF3p4xOdWRqSpnp07XUIjHmiG0nHxUz8Q928ogVfYUT9DeO5BTi2dZ9pewLzUnTQ6cYjG55Dm3GQ==','k3xAeuM0MQ+X5uWLxcPjhcpqVcMtO62TYgYQ3zVleEef6o6ozuikH/0ZgZAWRNKRISAbgH3XZcUSXzupPuTPZw==','pOBWT5or4gmha35EBqKTMwYKRDLmF+Wp',NULL),(4,'Beatriz','Asensi','bea@gmail.com','bea','Zf3yfCSKC+kfnDNVONjSu55Mg42htDM7rNJhoBYI1N/myvDssBN1U8M3Xsles/EIx5Xrdyn1chQEGyF1suPn/g==','HvmuWwCzfj+Nlu3lC1IBMvcYadUwRaCi+IuRwO8iWIt4vJQFn+I6yxkced9sdZTA3o6dV/D9FqJQsQXGzfD0JQ==','djeOIV3Zv0miskLgaYU7kRgNlsZTfl4m',NULL),(5,'Sergio Julio','Garcia','sergio@gmail.com','sergio','UbGOvDNrH+pwUB7oRDgoUi3CW80bWzexfsxhwy/mTeZFi5lrGT3hih4VgBhc4rKwSjr+taKEopgqGXkaWc2qvQ==','4tQ/UOO40E+6R5LLAfbQTx9wU9L9u3AG+b65Rh+uhdYi57EcZr/619fQa8QoKgW9UssqlatUpiSHpSGN7tdfEQ==','ZekBPZU8fGmO+Uoqo098J2i62JCvHvIV',NULL),(10,'Luis Pascual','Martí','luis@gmail.com','luis','+pVli+Eu9hHfOcbzgzb/RTlRhJ5IHeP9PUY3xKjK9+LGFNSp6fOAZZUqsmEHFkCraigX5YcbWdNX+haKycJrQg==','sE5Bh0KUT87b756iIhVKQZ73lFkK0ykXyy9C2nr33tGxttj57G0tiviMu/JP2oOXA4cm8UmR3QHpR9CyQIrhxg==','0aFhBOeGY1l+Wb8v45XzsGmMB4PZGd2r',NULL),(11,'Lawrence Arthur','Rider García','larry@gmail.com','larry','AelzmP0uVF9jumKXjbgQo8LuwTWppRnujUyg06xv9MnkovK/gKI3g41CpJn/+6n5DaYiDTIysKZ2gO842gaDDQ==','E+i27ZSHsnspUZ+W6dAmSKTu5AkHiVqBnJOGPfk1AE4EHm9AKONL07hLQgdPvcnghb4zWBvX/4qMK/A2O/52Ig==','JJ/lJBUk6jeeEcX2wAC9u8LNwDMjT0SS',NULL),(15,'Hulio','De La Fuente','Hulio@gmail.com','hulio','T5JCnXCs5zCoRC2nkQhk4UGHgbK63V6mkmjao9cUIWrdKMKpncnlIjkbx2y/brjyasIbuwSRhsbpBYte91sF3A==','/h5QrX8t436ZT655MktaZtFIOEP/o3t6Ys5xd/Ydu8UshIXQs23PCGQkKnDqmuC2k2RSlbiLbk8Th/22s5BCiw==','oU8uz0SXg1mcCMb/XzfTdqq/g4j9f1kV',NULL);
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

-- Dump completed on 2018-08-09 14:28:36

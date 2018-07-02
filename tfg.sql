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
-- Table structure for table `Administrador`
--

DROP TABLE IF EXISTS `Administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Administrador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `admin_usuario` FOREIGN KEY (`id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administrador`
--

LOCK TABLES `Administrador` WRITE;
/*!40000 ALTER TABLE `Administrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `Administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cita`
--

DROP TABLE IF EXISTS `Cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `paciente` int(11) NOT NULL,
  `medico` int(11) NOT NULL,
  PRIMARY KEY (`id`,`paciente`,`medico`),
  KEY `cita_paciente` (`paciente`),
  KEY `cita_medico` (`medico`),
  CONSTRAINT `cita_medico` FOREIGN KEY (`medico`) REFERENCES `Medico` (`id`),
  CONSTRAINT `cita_paciente` FOREIGN KEY (`paciente`) REFERENCES `Paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cita`
--

LOCK TABLES `Cita` WRITE;
/*!40000 ALTER TABLE `Cita` DISABLE KEYS */;
INSERT INTO `Cita` VALUES (1,'2018-12-12','19:30:00',5,3),(2,'2018-06-22','20:37:00',5,3);
/*!40000 ALTER TABLE `Cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Consulta`
--

DROP TABLE IF EXISTS `Consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Consulta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `historial` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `motivo` varchar(1000) NOT NULL,
  `enfermedad_actual` varchar(5000) NOT NULL,
  `diagnostico` varchar(300) NOT NULL,
  `tratamiento` varchar(300) NOT NULL,
  PRIMARY KEY (`id`,`historial`),
  KEY `consulta_historial` (`historial`),
  CONSTRAINT `consulta_historial` FOREIGN KEY (`historial`) REFERENCES `Historial_Clinico` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Consulta`
--

LOCK TABLES `Consulta` WRITE;
/*!40000 ALTER TABLE `Consulta` DISABLE KEYS */;
INSERT INTO `Consulta` VALUES (1,5,'2018-06-22','Dolor en el culo xd','Herpes','Herpes en el culo','pomadas'),(2,5,'2018-06-29','Dolor en el culo xd','Herpes','Herpes en el culo','pomadas');
/*!40000 ALTER TABLE `Consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Evento`
--

DROP TABLE IF EXISTS `Evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Evento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` int(11) NOT NULL,
  `descripcion` int(11) NOT NULL,
  PRIMARY KEY (`id`,`usuario`),
  KEY `evento_usuario` (`usuario`),
  CONSTRAINT `evento_usuario` FOREIGN KEY (`usuario`) REFERENCES `Usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evento`
--

LOCK TABLES `Evento` WRITE;
/*!40000 ALTER TABLE `Evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `Evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Fecha`
--

DROP TABLE IF EXISTS `Fecha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Fecha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Fecha`
--

LOCK TABLES `Fecha` WRITE;
/*!40000 ALTER TABLE `Fecha` DISABLE KEYS */;
/*!40000 ALTER TABLE `Fecha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Fecha_Evento`
--

DROP TABLE IF EXISTS `Fecha_Evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Fecha_Evento` (
  `id_evento` int(11) NOT NULL,
  `id_fecha` int(11) NOT NULL,
  PRIMARY KEY (`id_evento`,`id_fecha`),
  KEY `evento_fecha` (`id_fecha`),
  CONSTRAINT `evento_fecha` FOREIGN KEY (`id_fecha`) REFERENCES `Fecha` (`id`),
  CONSTRAINT `fecha_evento` FOREIGN KEY (`id_evento`) REFERENCES `Evento` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Fecha_Evento`
--

LOCK TABLES `Fecha_Evento` WRITE;
/*!40000 ALTER TABLE `Fecha_Evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `Fecha_Evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Historial_Clinico`
--

DROP TABLE IF EXISTS `Historial_Clinico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Historial_Clinico` (
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
  CONSTRAINT `historial_paciente` FOREIGN KEY (`id`) REFERENCES `Paciente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Historial_Clinico`
--

LOCK TABLES `Historial_Clinico` WRITE;
/*!40000 ALTER TABLE `Historial_Clinico` DISABLE KEYS */;
INSERT INTO `Historial_Clinico` VALUES (5,'Sergio Julio Garcia','12345678X',26,'Hombre','Española','soltero','Informatico','desconocido','calle las flores','coca cola',75,1.75,NULL);
/*!40000 ALTER TABLE `Historial_Clinico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medico`
--

DROP TABLE IF EXISTS `Medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Medico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `especialidad` varchar(300) NOT NULL,
  `validado` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `medico_usuario` FOREIGN KEY (`id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medico`
--

LOCK TABLES `Medico` WRITE;
/*!40000 ALTER TABLE `Medico` DISABLE KEYS */;
INSERT INTO `Medico` VALUES (3,'Familia',NULL);
/*!40000 ALTER TABLE `Medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mensaje`
--

DROP TABLE IF EXISTS `Mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mensaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origen` int(11) NOT NULL,
  `destino` int(11) NOT NULL,
  `texto` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`,`origen`,`destino`),
  KEY `mensaje_origen` (`origen`),
  KEY `mensaje_destino` (`destino`),
  CONSTRAINT `mensaje_destino` FOREIGN KEY (`destino`) REFERENCES `Usuario` (`id`),
  CONSTRAINT `mensaje_origen` FOREIGN KEY (`origen`) REFERENCES `Usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mensaje`
--

LOCK TABLES `Mensaje` WRITE;
/*!40000 ALTER TABLE `Mensaje` DISABLE KEYS */;
INSERT INTO `Mensaje` VALUES (1,3,4,'Que pasa loca, una consulta rapida? xd'),(2,3,4,'siempre arriba');
/*!40000 ALTER TABLE `Mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Paciente`
--

DROP TABLE IF EXISTS `Paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Paciente` (
  `id` int(11) NOT NULL,
  `sip` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `paciente_usuario` FOREIGN KEY (`id`) REFERENCES `Usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Paciente`
--

LOCK TABLES `Paciente` WRITE;
/*!40000 ALTER TABLE `Paciente` DISABLE KEYS */;
INSERT INTO `Paciente` VALUES (4,123456789),(5,987654321);
/*!40000 ALTER TABLE `Paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Receta`
--

DROP TABLE IF EXISTS `Receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Receta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medico` int(11) NOT NULL,
  `tratamiento` varchar(300) NOT NULL,
  `dosis` varchar(300) NOT NULL,
  `fecha` int(11) NOT NULL,
  PRIMARY KEY (`id`,`medico`),
  KEY `receta_medico` (`medico`),
  CONSTRAINT `receta_medico` FOREIGN KEY (`medico`) REFERENCES `Medico` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Receta`
--

LOCK TABLES `Receta` WRITE;
/*!40000 ALTER TABLE `Receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `Receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(300) DEFAULT NULL,
  `apellidos` varchar(300) DEFAULT NULL,
  `email` varchar(300) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(900) NOT NULL,
  `salt` varchar(300) DEFAULT NULL,
  `key` varchar(300) DEFAULT NULL,
  `disponible` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (3,'Roberto Andre','Vega','andre@gmail.com','andre','vmM8TBpjuWaF3p4xOdWRqSpnp07XUIjHmiG0nHxUz8Q928ogVfYUT9DeO5BTi2dZ9pewLzUnTQ6cYjG55Dm3GQ==','k3xAeuM0MQ+X5uWLxcPjhcpqVcMtO62TYgYQ3zVleEef6o6ozuikH/0ZgZAWRNKRISAbgH3XZcUSXzupPuTPZw==',NULL,NULL),(4,'Beatriz','Asensi','bea@gmail.com','bea','Zf3yfCSKC+kfnDNVONjSu55Mg42htDM7rNJhoBYI1N/myvDssBN1U8M3Xsles/EIx5Xrdyn1chQEGyF1suPn/g==','HvmuWwCzfj+Nlu3lC1IBMvcYadUwRaCi+IuRwO8iWIt4vJQFn+I6yxkced9sdZTA3o6dV/D9FqJQsQXGzfD0JQ==',NULL,NULL),(5,'Sergio Julio','Garcia','sergio@gmail.com','sergio','UbGOvDNrH+pwUB7oRDgoUi3CW80bWzexfsxhwy/mTeZFi5lrGT3hih4VgBhc4rKwSjr+taKEopgqGXkaWc2qvQ==','4tQ/UOO40E+6R5LLAfbQTx9wU9L9u3AG+b65Rh+uhdYi57EcZr/619fQa8QoKgW9UssqlatUpiSHpSGN7tdfEQ==',NULL,NULL);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Video`
--

DROP TABLE IF EXISTS `Video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `consulta` int(11) NOT NULL,
  `video` varchar(300) NOT NULL,
  PRIMARY KEY (`id`,`consulta`),
  KEY `video_cita_idx` (`consulta`),
  CONSTRAINT `video_consulta` FOREIGN KEY (`consulta`) REFERENCES `Consulta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Video`
--

LOCK TABLES `Video` WRITE;
/*!40000 ALTER TABLE `Video` DISABLE KEYS */;
/*!40000 ALTER TABLE `Video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-02 18:38:41

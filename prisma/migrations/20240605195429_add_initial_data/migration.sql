-- MySQL dump 10.13  Distrib 8.3.0, for macos14 (x86_64)
--
-- Host: localhost    Database: bpm
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Compania`
--

DROP TABLE IF EXISTS `Compania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Compania` (
  `CompaniaId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Telefono` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CorreoComp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReclamarComp` tinyint(1) DEFAULT '0',
  `CorreoSoporte` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReclamarSoporte` tinyint(1) DEFAULT '0',
  `Activo` tinyint(1) NOT NULL DEFAULT '1',
  `ColorBase` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaInicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`CompaniaId`),
  UNIQUE KEY `Compania_Codigo_key` (`Codigo`),
  UNIQUE KEY `Compania_Descripcion_key` (`Descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Compania`
--

LOCK TABLES `Compania` WRITE;
/*!40000 ALTER TABLE `Compania` DISABLE KEYS */;
INSERT INTO `Compania` VALUES (1,'SLS','C174','Santalucía Seguros','','',0,'',0,1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000'),(2,'SLP','G0241','Santalucía Gestora de Pensiones','','',0,'',0,1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000'),(3,'UNI','C637','Unicaja','','',0,'',0,1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000'),(4,'PLV','C693','Pelayo Vida','','',0,'',0,1,'','2024-05-08 18:41:21.000',NULL,'2024-05-08 18:41:21.000');
/*!40000 ALTER TABLE `Compania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contrato`
--

DROP TABLE IF EXISTS `Contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contrato` (
  `ContratoId` int NOT NULL AUTO_INCREMENT,
  `CompaniaId` int NOT NULL,
  `RamoId` int NOT NULL,
  `OficinaId` int NOT NULL,
  `UsuarioUltimaModif` int NOT NULL,
  `TipoConciliacionId` int DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `FechaAltaSolicitud` datetime(3) DEFAULT NULL,
  `FechaAltaContrato` datetime(3) DEFAULT NULL,
  `CCC` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoSolicitud` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CodigoPoliza` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechaEfectoSolicitud` datetime(3) DEFAULT NULL,
  `FechaEfectoContrato` datetime(3) DEFAULT NULL,
  `AnuladoSE` tinyint(1) NOT NULL,
  `CSRespAfirm` tinyint(1) NOT NULL,
  `DNITomador` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NombreTomador` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaDNITomador` datetime(3) DEFAULT NULL,
  `DNIAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NombreAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ProfesionAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DeporteAsegurado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaNacimientoAsegurado` datetime(3) DEFAULT NULL,
  `IndicadorFDPRECON` tinyint(1) DEFAULT NULL,
  `TipoEnvioFDPRECON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDPRECON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IndicadorFDCON` tinyint(1) DEFAULT NULL,
  `TipoEnvioFDCON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResultadoFDCON` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Revisar` tinyint(1) NOT NULL,
  `Conciliar` tinyint(1) NOT NULL,
  `Suplemento` tinyint(1) DEFAULT '0',
  `NoDigitalizar` tinyint(1) NOT NULL DEFAULT '0',
  `FechaConciliacion` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ContratoId`),
  KEY `Contrato_CompaniaId_fkey` (`CompaniaId`),
  KEY `Contrato_RamoId_fkey` (`RamoId`),
  KEY `Contrato_OficinaId_fkey` (`OficinaId`),
  KEY `Contrato_TipoConciliacionId_fkey` (`TipoConciliacionId`),
  KEY `Contrato_UsuarioUltimaModif_fkey` (`UsuarioUltimaModif`),
  CONSTRAINT `Contrato_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Contrato_OficinaId_fkey` FOREIGN KEY (`OficinaId`) REFERENCES `Mediador` (`MediadorId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Contrato_RamoId_fkey` FOREIGN KEY (`RamoId`) REFERENCES `Ramo` (`RamoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Contrato_TipoConciliacionId_fkey` FOREIGN KEY (`TipoConciliacionId`) REFERENCES `TipoConciliacion` (`TipoConciliacionId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Contrato_UsuarioUltimaModif_fkey` FOREIGN KEY (`UsuarioUltimaModif`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contrato`
--

LOCK TABLES `Contrato` WRITE;
/*!40000 ALTER TABLE `Contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `Contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentoContrato`
--

DROP TABLE IF EXISTS `DocumentoContrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentoContrato` (
  `DocumentoId` int NOT NULL AUTO_INCREMENT,
  `ContratoId` int NOT NULL,
  `TipoDocId` int NOT NULL,
  `UsuarioId` int NOT NULL,
  `EstadoDoc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NumeReclamaciones` int NOT NULL DEFAULT '0',
  `FechaReclamacion` datetime(3) DEFAULT NULL,
  `FechaConciliacion` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`DocumentoId`),
  KEY `DocumentoContrato_ContratoId_fkey` (`ContratoId`),
  KEY `DocumentoContrato_TipoDocId_fkey` (`TipoDocId`),
  KEY `DocumentoContrato_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `DocumentoContrato_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DocumentoContrato_TipoDocId_fkey` FOREIGN KEY (`TipoDocId`) REFERENCES `MaestroDocumentos` (`TipoDocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DocumentoContrato_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentoContrato`
--

LOCK TABLES `DocumentoContrato` WRITE;
/*!40000 ALTER TABLE `DocumentoContrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentoContrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FamiliaDocumento`
--

DROP TABLE IF EXISTS `FamiliaDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FamiliaDocumento` (
  `FamiliaId` int NOT NULL AUTO_INCREMENT,
  `Codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `FechaInicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`FamiliaId`),
  UNIQUE KEY `FamiliaDocumento_Codigo_key` (`Codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FamiliaDocumento`
--

LOCK TABLES `FamiliaDocumento` WRITE;
/*!40000 ALTER TABLE `FamiliaDocumento` DISABLE KEYS */;
INSERT INTO `FamiliaDocumento` VALUES (1,'ANE','Anexo Condiciones particulares',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(2,'BOL','Boletín de adhesión / Certificado de pertenencia',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(3,'CON','Formulario de conocimiento del cliente',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(4,'CP','Condiciones particulares o solicitudes',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(5,'CS','Cuestionario de salud',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(6,'DAT','Documento de datos fundamentales para el cliente. ',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(7,'DFP','Documento de datos fundamentales para el participe',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(8,'DNI','Documento acreditativo de identidad del cliente (NIF/NIE)',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(9,'IDO','Test de adecuación e idoneidad.',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(10,'SEPA','Documento Domiciliación SEPA',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(11,'SOL','Solicitud de seguro',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000'),(12,'SUP','Suplementos, anulaciones, rescates y otros',1,'2024-05-08 19:01:16.000',NULL,'2024-05-08 19:01:16.000');
/*!40000 ALTER TABLE `FamiliaDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IncidenciaDocumento`
--

DROP TABLE IF EXISTS `IncidenciaDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IncidenciaDocumento` (
  `IncidenciaId` int NOT NULL AUTO_INCREMENT,
  `DocumentoId` int NOT NULL,
  `TipoIncidenciaId` int NOT NULL,
  `UsuarioId` int NOT NULL,
  `FechaIncidencia` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Resuelta` tinyint(1) DEFAULT '0',
  `NumReclamaciones` int DEFAULT '0',
  `FechaUltimaModif` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`IncidenciaId`),
  KEY `IncidenciaDocumento_DocumentoId_fkey` (`DocumentoId`),
  KEY `IncidenciaDocumento_UsuarioId_fkey` (`UsuarioId`),
  KEY `IncidenciaDocumento_TipoIncidenciaId_fkey` (`TipoIncidenciaId`),
  CONSTRAINT `IncidenciaDocumento_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `DocumentoContrato` (`DocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `IncidenciaDocumento_TipoIncidenciaId_fkey` FOREIGN KEY (`TipoIncidenciaId`) REFERENCES `MaestroIncidencias` (`TipoIncidenciaId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `IncidenciaDocumento_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IncidenciaDocumento`
--

LOCK TABLES `IncidenciaDocumento` WRITE;
/*!40000 ALTER TABLE `IncidenciaDocumento` DISABLE KEYS */;
/*!40000 ALTER TABLE `IncidenciaDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LogAccion`
--

DROP TABLE IF EXISTS `LogAccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LogAccion` (
  `LogId` int NOT NULL AUTO_INCREMENT,
  `UsuarioId` int NOT NULL,
  `Accion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaAccion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`LogId`),
  KEY `LogAccion_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `LogAccion_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LogAccion`
--

LOCK TABLES `LogAccion` WRITE;
/*!40000 ALTER TABLE `LogAccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `LogAccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LogCarga`
--

DROP TABLE IF EXISTS `LogCarga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LogCarga` (
  `LogCargaId` int NOT NULL AUTO_INCREMENT,
  `LogId` int NOT NULL,
  `Tipo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TotalRegistros` int NOT NULL,
  `RegistrosOk` int NOT NULL,
  `RegistrosError` int NOT NULL,
  `ErrorLogs` longtext COLLATE utf8mb4_unicode_ci,
  `FechaCarga` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`LogCargaId`),
  KEY `LogCarga_LogId_fkey` (`LogId`),
  CONSTRAINT `LogCarga_LogId_fkey` FOREIGN KEY (`LogId`) REFERENCES `LogAccion` (`LogId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LogCarga`
--

LOCK TABLES `LogCarga` WRITE;
/*!40000 ALTER TABLE `LogCarga` DISABLE KEYS */;
/*!40000 ALTER TABLE `LogCarga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaestroDocumentos`
--

DROP TABLE IF EXISTS `MaestroDocumentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaestroDocumentos` (
  `TipoDocumentoId` int NOT NULL,
  `FamiliaId` int NOT NULL,
  `Codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Suplemento` tinyint(1) NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `FechaInicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`TipoDocumentoId`),
  KEY `MaestroDocumentos_FamiliaId_fkey` (`FamiliaId`),
  CONSTRAINT `MaestroDocumentos_FamiliaId_fkey` FOREIGN KEY (`FamiliaId`) REFERENCES `FamiliaDocumento` (`FamiliaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaestroDocumentos`
--

LOCK TABLES `MaestroDocumentos` WRITE;
/*!40000 ALTER TABLE `MaestroDocumentos` DISABLE KEYS */;
INSERT INTO `MaestroDocumentos` VALUES (1,1,'ANE1','Anexo Condiciones particulares','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(2,2,'BOL1','Boletín de adhesión / Certificado de pertenencia','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(3,3,'CON1','Formulario de conocimiento del cliente','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(4,4,'CP1','Condiciones particulares o solicitudes','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(5,5,'CS1','Cuestionario de salud','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(6,6,'DAT1','Documento de datos fundamentales para el cliente. ','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(7,7,'DFP1','Documento de datos fundamentales para el participe','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(8,8,'DNI1','Documento acreditativo de identidad del cliente (NIF/NIE)','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(9,9,'IDO1','Test de adecuación e idoneidad.','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(10,10,'SEPA1','Documento Domiciliación SEPA','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(11,11,'SOL1','Solicitud de seguro','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000'),(12,12,'SUP1','Suplementos, anulaciones, rescates y otros','',0,1,'2024-05-08 19:04:20.000',NULL,'2024-05-08 19:04:20.000');
/*!40000 ALTER TABLE `MaestroDocumentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MaestroIncidencias`
--

DROP TABLE IF EXISTS `MaestroIncidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MaestroIncidencias` (
  `TipoIncidenciaId` int NOT NULL,
  `DocAsociadoId` int DEFAULT NULL,
  `Codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Nombre` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `FechaInicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`TipoIncidenciaId`),
  KEY `MaestroIncidencias_DocAsociadoId_fkey` (`DocAsociadoId`),
  CONSTRAINT `MaestroIncidencias_DocAsociadoId_fkey` FOREIGN KEY (`DocAsociadoId`) REFERENCES `FamiliaDocumento` (`FamiliaId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MaestroIncidencias`
--

LOCK TABLES `MaestroIncidencias` WRITE;
/*!40000 ALTER TABLE `MaestroIncidencias` DISABLE KEYS */;
INSERT INTO `MaestroIncidencias` VALUES (1,2,'3003','El Boletín de adhesion al plan de pensiones no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(2,2,'3013','El Boletín de adhesion al plan de pensiones no está firmado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(3,2,'3023','La pregunta de actividad profesional no está respondida en el boletín de adhesión. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(4,2,'3033','La pregunta de obligaciones fiscales en el extrajero no está respondida en el boletín de adhesion. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(5,3,'822','ALTA ACTIVIDAD/CONOC. CLIENTE',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(6,3,'2002','El formulario de conocimiento del cliente no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(7,3,'2012','El formulario de conocimiento del cliente no está firmado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(8,3,'2022','El formulario de conocimiento del cliente esta incompleto. Faltan apartados por cumplimentar.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(9,3,'2102','El formulario de conocimiento del cliente no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(10,3,'2112','El formulario de conocimiento del cliente no está firmado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(11,3,'2122','El formulario de conocimiento del cliente está incompleto. Faltan apartados por cumplimentar.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(12,3,'22002','El formulario de conocimiento del cliente no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(13,3,'22012','El formulario de conocimiento del cliente no está firmado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(14,3,'22022','El formulario de conocimiento del cliente está incompleto. Faltan apartados por cumplimentar.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(15,3,'22122','El formulario de conocimiento del cliente está incompleto. Faltan apartados por cumplimentar.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(16,3,'22132','El formulario de conocimiento del cliente recibido es de persona física y se requiere el formulario de persona jurídica, al ser el tomador una empresa.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(17,4,'58','SELLO Y FIRMA DE LA OFICINA EN CONDICIONES GENERALES Y/O PARTICULARES',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(18,4,'653',' FALTA FIRMA DEL ASEGURADO/A EN LA DOCUMENTACIÓN CONTRACTUAL DE LA PÓLIZA.(Cond. Particulares, Cond. Generales y en determinados casos Anexo de las Cond. Particulares)',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(19,4,'654',' FALTA DOCUMENTACIÓN CONTRACTUAL DE LA PÓLIZA. (Cond. Particulares y/o Cond. Generales y/o, en determinados casos, Anexo de las Cond. Particulares)',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(20,4,'723','FALTA FIRMA DEL TOMADOR Y/O DEL ASEGURADO/A EN LA DOCUMENTACIÓN CONTRACTUAL DE LA PÓLIZA. (Cond. Particulares, Cond. Generales y en determinados casos Anexo de las Cond. Particulares)',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(21,4,'4004','Las Condiciones particulares de la póliza no se han recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(22,4,'4014','Las Condiciones particulares de la póliza no están firmadas por el cliente. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(23,4,'6013',' El 	Anexo a condiciones particulares no esta firmado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(24,4,'14004','Las Condiciones particulares de la póliza no se han recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(25,4,'14014','Las Condiciones particulares de la póliza no están firmadas por el cliente. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(26,5,'51','FIRMA EN CUESTIONARIO DE SALUD. (el Cuestionario de Salud debe estar siempre firmado por el cliente)',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(27,5,'56','FALTA COPIA CUESTIONARIO DE SALUD PARA LA COMPAÑÍA ASEGURADORA.(cumplimentación manual)',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(28,5,'57','CUESTIONARIO DE SALUD Y ACTIVIDAD  CORRECTAMENTE CUMPLIMENTADO INCLUIDA PROFESION (Si lo cumplimenta a mano tienen que coincidir todos los datos con los aportados por el cliente en el alta, en caso de desigualdad de datos, el cliente no estaría cubierto).',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(29,5,'651',' FALTA FIRMA DEL ASEGURADO/A EN EL CUESTIONARIO DE SALUD.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(30,5,'656','FALTA EL MODELO DEL CUESTIONARIO DE SALUD PARA LA COMPAÑÍA ASEGURADORA.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(31,5,'657',' EL CUESTIONARIO DE SALUD NO ESTÁ CUMPLIMENTADO CORRECTAMENTE.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(32,5,'721','FALTA FIRMA DEL ASEGURADO/A EN EL CUESTIONARIO DE SALUD.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(33,5,'726','FALTA EL MODELO DEL CUESTIONARIO DE SALUD PARA LA COMPAÑÍA ASEGURADORA.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(34,5,'727','EL CUESTIONARIO DE SALUD NO ESTÁ CUMPLIMENTADO CORRECTAMENTE.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(35,5,'728','FALTA FIRMA DEL ASEGURADO/A EN EL CUESTIONARIO DE SALUD.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(36,5,'821','FALTA FIRMA DEL ASEGURADO/A EN EL C. DE SALUD.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(37,5,'826','FALTA EL C. DE SALUD.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(38,5,'827','EL C. DE SALUD NO ESTÁ CUMPLIMENTADO CORRECTAMENTE.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(39,5,'6007','El cuestionario de salud no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(40,5,'6017',' El cuestionario de salud no esta firmado por el asegurado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(41,5,'6037',' El cuestionario de salud contiene enmiendas o tachaduras cuya correccion no está firmada por el asegurado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(42,5,'6047',' El cuestionario de salud no tiene informado el peso y/o la talla.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(43,5,'6057',' El cuestionario de salud no se puede firmar por poderes. Debe de firmarse por el asegurado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(44,5,'6067',' El cuestionario de salud tiene respuestas afirmativas y no se ha ampliado la información en la parte inferior.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(45,5,'6077',' El cuestionario de salud no indica la profesión del asegurado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(46,5,'6087',' El cuestionario de salud tiene respuestas tipo (SI/NO) sin responder.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(47,5,'6097',' El cuestionario de salud tiene respondida negativamente la pregunta 14. Realizar correccion y conseguir firma del cliente.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(48,5,'7007','El Cuestionario de salud no se ha recibido. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(49,5,'7017','El Cuestionario de salud no esta firmado por el asegurado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(50,5,'7027','El cuestionario de salud no indica la profesión del asegurado. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(51,5,'7037','El cuestionario de salud tiene respuestas sin responder. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(52,5,'7047','El cuestionario de salud no esta firmado por el asegurado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(53,5,'17007','El Cuestionario de salud no se ha recibido. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(54,5,'17017','El Cuestionario de salud no esta firmado por el asegurado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(55,5,'17027','El cuestionario de salud no indica la profesión del asegurado. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(56,5,'17037','El cuestionario de salud tiene respuestas sin responder. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(57,5,'17047','El cuestionario de salud tiene respuestas afirmativas y no se ha ampliado la información.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(58,6,'828','FALTA DOC. DATOS FUNDAMENTALES  (KID)',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(59,6,'6018',' El Documento de datos fundamentales no esta firmado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(60,6,'8008','El Documento de datos fundamentales no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(61,6,'8018','El Documento de datos fundamentales no esta firmado.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(62,6,'8028','El Documento de datos fundamentales corresponde a otro producto.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(63,7,'8108','El Documento de datos fundamentales del participe no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(64,7,'8118','El Documento de datos fundamentales del participe no está firmado',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(65,7,'8128','El Documento de datos fundamentales del participe corresponde a otro producto. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(66,8,'720','FALTA COPIA DEL DNI',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(67,8,'820','FALTA COPIA DEL DNI',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(68,8,'1000','El DNI del cliente no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(69,8,'1010','Falta el anverso del DNI del cliente recibido.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(70,8,'1020','Falta el reverso del DNI del cliente recibido.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(71,8,'1030','La fotografía del DNI del cliente no es visible. ',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(72,8,'1040','El número de DNI del cliente no es legible.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(73,8,'1050','El DNI del cliente recibido está caducado. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(74,8,'11000','El DNI del cliente no se ha recibido.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(75,8,'11010','Falta el anverso del DNI del cliente recibido.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(76,8,'11020','Falta el reverso del DNI del cliente recibido.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(77,8,'11030','La fotografía del DNI del cliente no es visible. ',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(78,8,'11040','El número de DNI del cliente no es legible.',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(79,8,'11050','El DNI del cliente recibido está caducado. ',1,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(80,9,'829','FALTA TEST IDONEIDAD O PERFIL INVERSOR (IDO)',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(81,9,'6019',' El Test de adecuación e idoneidad no está firmado por el cliente.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(82,9,'9009','El Test de adecuación e idoneidad no se ha recibido.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(83,9,'9019','El Test de adecuación e idoneidad no está firmado por el cliente.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(84,9,'9029','El Test de adecuación e idoneidad no tiene cumplimentada la renuncia manuscrita del cliente al asesoramiento.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(85,9,'9039','El Test de adecuación e idoneidad no está completo. Deben responderse todas las preguntas, seleccionar un perfil y las opciones de inversión recomendadas. ',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(86,10,'652','FALTA DOCUMENTO DOMICILIACION S.E.P.A.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(87,10,'6002','La orden de domiciliacion SEPA no se ha recibido.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(88,10,'6012',' La orden de domiciliacion SEPA no está firmada por el cliente.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(89,11,'953',' FALTA FIRMA DEL ASEGURADO/A EN LA SOLICITUD DE SEGURO',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(90,11,'4024','La solicitud de seguro no está firmada por el cliente. ',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(91,11,'6004','La Póliza de Seguro (o Solicitud de Seguro) no se ha recibido.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(92,11,'6014',' La Póliza de Seguro (o Solicitud de Seguro) no está firmada por el cliente.',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(93,11,'7057','La pregunta de actividad profesional no está respondida en la solicitud de seguro. ',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000'),(94,11,'7087','La pregunta de obligaciones fiscales en el extrajero no está respondida en la solicitud de seguro. ',0,'2024-05-08 19:22:39.000',NULL,'2024-05-08 19:22:39.000');
/*!40000 ALTER TABLE `MaestroIncidencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mediador`
--

DROP TABLE IF EXISTS `Mediador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Mediador` (
  `MediadorId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Canal` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Zona` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Responsable` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailResponsable` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Responsable2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmailResponsable2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Reclamar` tinyint(1) DEFAULT '0',
  `Activo` tinyint(1) DEFAULT '1',
  `FechaAlta` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Observaciones` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MediadorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mediador`
--

LOCK TABLES `Mediador` WRITE;
/*!40000 ALTER TABLE `Mediador` DISABLE KEYS */;
/*!40000 ALTER TABLE `Mediador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ObservacionContrato`
--

DROP TABLE IF EXISTS `ObservacionContrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ObservacionContrato` (
  `ObservacionId` int NOT NULL AUTO_INCREMENT,
  `UsuarioId` int NOT NULL,
  `ContratoId` int NOT NULL,
  `Contenido` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaAlta` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ObservacionId`),
  KEY `ObservacionContrato_UsuarioId_fkey` (`UsuarioId`),
  KEY `ObservacionContrato_ContratoId_fkey` (`ContratoId`),
  CONSTRAINT `ObservacionContrato_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ObservacionContrato_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ObservacionContrato`
--

LOCK TABLES `ObservacionContrato` WRITE;
/*!40000 ALTER TABLE `ObservacionContrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `ObservacionContrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ObservacionIncidencia`
--

DROP TABLE IF EXISTS `ObservacionIncidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ObservacionIncidencia` (
  `ObservacionId` int NOT NULL AUTO_INCREMENT,
  `UsuarioId` int NOT NULL,
  `IncidenciaId` int NOT NULL,
  `Contenido` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaObs` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ObservacionId`),
  KEY `ObservacionIncidencia_UsuarioId_fkey` (`UsuarioId`),
  KEY `ObservacionIncidencia_IncidenciaId_fkey` (`IncidenciaId`),
  CONSTRAINT `ObservacionIncidencia_IncidenciaId_fkey` FOREIGN KEY (`IncidenciaId`) REFERENCES `IncidenciaDocumento` (`IncidenciaId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ObservacionIncidencia_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ObservacionIncidencia`
--

LOCK TABLES `ObservacionIncidencia` WRITE;
/*!40000 ALTER TABLE `ObservacionIncidencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `ObservacionIncidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Precios`
--

DROP TABLE IF EXISTS `Precios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Precios` (
  `PrecioId` int NOT NULL,
  `CompaniaId` int NOT NULL,
  `Desde` int NOT NULL,
  `Hasta` int NOT NULL,
  `PrecioActuacion` double NOT NULL,
  `PrecioFijo` double NOT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`PrecioId`),
  KEY `Precios_CompaniaId_fkey` (`CompaniaId`),
  CONSTRAINT `Precios_CompaniaId_fkey` FOREIGN KEY (`CompaniaId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Precios`
--

LOCK TABLES `Precios` WRITE;
/*!40000 ALTER TABLE `Precios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Precios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ramo`
--

DROP TABLE IF EXISTS `Ramo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ramo` (
  `RamoId` int NOT NULL AUTO_INCREMENT,
  `CompId` int NOT NULL,
  `Codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descripcion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Reclamar` tinyint(1) DEFAULT '0',
  `Activo` tinyint(1) DEFAULT '1',
  `FechaAlta` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Observaciones` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RamoId`),
  UNIQUE KEY `Ramo_Codigo_key` (`Codigo`),
  KEY `Ramo_CompId_fkey` (`CompId`),
  CONSTRAINT `Ramo_CompId_fkey` FOREIGN KEY (`CompId`) REFERENCES `Compania` (`CompaniaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ramo`
--

LOCK TABLES `Ramo` WRITE;
/*!40000 ALTER TABLE `Ramo` DISABLE KEYS */;
INSERT INTO `Ramo` VALUES (1,1,'4077','ARQUISEGUROS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(2,1,'4239','AVIVA PROTECCIÓN OPTIMA',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(3,1,'4246','VIDA ENTERA',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(4,1,'5036','MAXIPLAN PIAS ASEGURADO',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(5,1,'5037','MAXIPLAN PIAS FONDOS',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(6,1,'5038','MAXIPLAN PENSIÓN GARANTIZADA PPA III ',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(7,1,'5039','MAXIPLAN Dinero Seguro ',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(8,1,'5040','MAXIPLAN Inversión Futura ',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(9,1,'5041','MAXIPLAN Inversión Dinámica ',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(10,1,'5047','Maxi Plan Inversión Premium',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(11,1,'5048','MAXIPLAN PIAS Cestas',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(12,1,'5049','MAXIMPLAN INVERSION CESTAS',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(13,1,'5053','MAXIPLAN Inver. Personal',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(14,1,'5054','Maxiplan Pias Inversión Personalizada',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(15,1,'5071','MAXIPLAN PIAS SELECCIÓN DINAMICA',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(16,1,'5072','MAXIPLAN SELECCIÓN DINAMICA',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(17,1,'5076','Maxiplan Inversión Premium 2',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(18,1,'6001','ACCIDENTES BASICO',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(19,1,'6002','ACCIDENTES PREFERENTE',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(20,1,'6003','ACCIDENTES PREMIUM',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(21,3,'AC03','FIDELIS ASOC. AH',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(22,3,'AE12','UNIVIDA AHORRO INVERSION',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(23,3,'AE22','UNIVIDA AHORRO INVERSION II',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(24,3,'AE32','UNIVIDA AHORRO INVERSION III',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(25,2,'AESP','Santalucía VP Espabolsa PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(26,3,'AG02','UNIVIDA AHORRO FISCAL',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(27,3,'AG03','SEG. AHORRO FUTURO 5',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(28,3,'AL03','RENTAESPAÑA ELEC. II',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(29,3,'AL13','RENTAESPAÑA ELECCIÓN',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(30,3,'AP02','UNIVIDA AHORRO ASEGURADO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(31,2,'APRO','Santalucia VP Retorno Absoluto',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(32,3,'AQ02','UNIVIDA AHORRO INFANTIL',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(33,3,'AQ03','AHORRO ESTUDIOS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(34,3,'AR11','AHORRO SEGURO I',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(35,3,'AR12','AHORRO SEGURO II',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(36,3,'AR13','AHORRO SEGURO III',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(37,3,'AR14','ALTA RENTABILIDAD',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(38,3,'AS02','UNIVIDA AHORRO JUBILACIÓN',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(39,3,'AS03','AHORRO ASEGURADO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(40,3,'AS13','AHORRO INFANTIL C.E',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(41,3,'ASP3','PLAN FIDELIS C.E.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(42,3,'AT01','ANUALIDADES',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(43,2,'ATRF','SANTALUCIA VIDA EMPLEADOS  RENTA FIJA, P.P.',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(44,2,'ATRV','SANTALUCIA VIDA EMPLEADOS  RENTA VARIABLE, P.P.',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(45,3,'AV03','RENTA PLAN VITALICIO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(46,3,'AV13','RENTA II PLAN VITALI',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(47,3,'AV23','RENTA ESPEC. VITALI',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(48,3,'AX03','SEGURFONDOS C.ESPAÑA',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(49,3,'AX13','SEGURFONDO GARAN. CE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(50,3,'AX23','SEGURFONDOS PREMIER',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(51,3,'AXM2','UNIFONDOS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(52,3,'AY02','UNIVIDA AHORRO ELECCIÓN',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(53,3,'AY03','AHORRO ELECCIÓN',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(54,3,'AZ02','RENTA SEGURA UNIPLAN',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(55,3,'AZ03','RENTA ESPAÑA II P.P.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(56,2,'C101','Santalucía Tu Plan Más Personal 2025',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(57,2,'C201','Santalucía Tu Plan Más Personal 2035',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(58,2,'C301','Santalucía Tu Plan Más Personal 2045',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(59,2,'C401','Santalucía Tu Plan Más Personal 2055',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(60,3,'CE03','AHOR.ESPAÑA ESTUDIOS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(61,3,'CF03','AHORRO ESPAÑA FUTURO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(62,3,'CJ03','AHOR.ESP. JUBILACION',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(63,3,'CUAN','ANUALIDADES',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(64,3,'CUTC','TEMPORAL CONSTANTE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(65,3,'CUTF','TAR FAMILIAR',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(66,3,'CUTL','TAR LIBRE',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(67,3,'CUTP','TAR PRESTAMOS',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(68,3,'EC01','VIDA ESP. EMP. CONV.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(69,3,'EE01','TAR FONDOEMPLEO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(70,2,'EEUU','Santalucia VP RV USA Élite PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(71,3,'EN02','UNIVIDA ORO',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(72,1,'EPAV','Santalucía VP Mixto Prudente PPSI',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(73,1,'EPJB','Santalucía VP Gestión Decidido PPSI',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(74,1,'EPRF','Santalucía VP Renta Fija PPSI',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(75,3,'ER01','RENTAESPAÑA P.PENS.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(76,3,'ER02','Renta Asaja Moderado',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(77,3,'ER03','Renta Asaja Medio',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(78,3,'ER04','Renta Asaja Dinámico',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(79,3,'ER05','Renta Asaja Futuresp',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(80,3,'ER06','Renta Agroupa',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(81,3,'ER07','Renta Agroupa Plus',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(82,2,'ESGM','Santalucia VP Gestión Sostenible RVM, PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(83,2,'EURI','Santalucia VP RV Europa Élite PP.',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(84,3,'EX01','TAR AYUNTAM ZAMORA.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(85,3,'EX02','TAR SEG.COLECTIVOS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(86,2,'GESL','Santalucía Gestión Estable',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(87,2,'GEST','Santalucía VP Gestión Estable',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(88,3,'IN11','AHORRO SEGURO INDICE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(89,3,'IN12','AHORRO SEGURO INDICE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(90,1,'0,00 LRD','Maxiplan Rentas',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(91,1,'10,00 LRD','Maxiplan Inversión Rentas, constante',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(92,1,'11,00 LRD','Maxiplan Inversión Rentas, constante',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(93,1,'20,00 LRD','Maxiplan Inversión Rentas, decreciente',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(94,1,'21,00 LRD','Maxiplan Inversión Rentas, decreciente',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(95,1,'LRW00','Maxiplan Inversión Rentas, actuarial',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(96,2,'MUND','Santalucia VP Mundiglobal Euro',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(97,2,'OJ25','Santalucía VP Objetivo Jubilación 2025',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(98,2,'OJ35','Santalucía VP Objetivo Jubilación 2035',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(99,2,'OJ45','Santalucía VP Objetivo Jubilación 2045',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(100,2,'OJ55','Santalucía VP Objetivo Jubilación 2055',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(101,4,'P150','PLV TAR 150',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(102,2,'PAN','Santalucia Panda Prudente PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(103,2,'PAR','Santalucia Pardo Decidido PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(104,3,'PG12','Univida Ahorro Elección PIAS',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(105,3,'PG13','Seguro Ahorro Elección PIAS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(106,3,'PIG2','UNIAHORRO SISTEMÁTICO',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(107,3,'PIG3','AHORROESPAÑA ESTABLE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(108,4,'PIND','PLV TAR 150 PIND',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(109,3,'PIR2','PENSIÓN INMEDIATA REVALORIZABLE (PIR)',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(110,3,'PIU3','AHORROESPAÑA FLEXI.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(111,4,'PLVA','PLV PLAN ACTIVO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(112,4,'PLVB','PLV ESPABOLSA',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(113,4,'PLVE','PLV PLAN EVOLUCION',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(114,4,'PLVF','PLV RENTA FIJA',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(115,4,'PLVS','PLV PLAN ESTABLE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(116,2,'POL','Santalucia Polar Equilibrado PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(117,3,'PPA3','PLAN PREV. ASEG.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(118,4,'PPAF','PLV PLAN DE AHORRO FLEXIBLE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(119,2,'PPGE','Santalucía VP Gestión Decidido PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(120,2,'PPMX','Santalucía VP Mixto Prudente PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(121,4,'PPPA','PLV PLAN PREVISION ASEGURADO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(122,2,'PPRF','Santalucía VP Renta Fija PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(123,2,'PPRV','Santalucía VP Renta Variable Europa PP',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(124,4,'PRL0','PLV VIDA SEGURO INTEGRAL',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(125,4,'PRL1','PLV SEGURO INTEGRAL',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(126,4,'PRLC','PELAYO VIDA MUJER',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(127,4,'PRM0','PLV SEGURO MODULAR',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','se reactiva 09/10/2023'),(128,4,'PRO0','PLV VIDA SEGURO AMORTIZACION',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(129,4,'PULC0','SEGURO DE APORTACIÓN DEFINIDA',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','NO CONCILIA'),(130,1,'Q4072','PLAN VIDA PROTECCION PERSONAL',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(131,3,'QQQQ','contratos CCM',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(132,2,'QREN','ANOIA FUTUR',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(133,3,'RD02','Unirentas Mixto',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(134,3,'RD03','Unirentas Mixto',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(135,3,'RD12','Unirentas Capital',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(136,3,'RD13','Unirentas Capital',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(137,3,'RD22','Unirentas Patrimonio 50',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(138,3,'RE02','SEGURO DE VIDA LIBRE PYMES',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(139,3,'RE03','VIDA RIESGO PYMES',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(140,3,'RI03','SEGURO INVALIDEZ',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(141,3,'RK02','SEGURO DE ACCIDENTES',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(142,3,'RK12','PLAN DE PROTECCIÓN FAMILIAR (Aplicalia)',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(143,4,'RL00','PLV SEGURO INTEGRAL',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(144,3,'RL02','UNIVIDA ANUAL RENOVABLE',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(145,3,'RL03','LIBRE',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(146,3,'RL12','UNIVIDA ANUAL RENOVABLE NO RESIDENTES',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(147,3,'RL13','RIESGO LIBRE NO RESI',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(148,3,'RL23','SEGURO VIDA MUJER',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(149,3,'RL33','SEGURO VIDA HOMBRE ENFERMEDAD 3C',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(150,4,'RLC0','PELAYO VIDA MUJER',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(151,4,'RLM0','PLV SEGURO MODULAR',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','se reactiva 09/10/2023'),(152,3,'RM02','UNIVIDA ANUAL RENOVABLE 45',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(153,3,'RM03','VIDAESPAÑA 45',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(154,3,'RN02','COLECTIVOS DE ACCIDENTES',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(155,4,'RO00','PLV SEGURO AMORTIZACION',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(156,3,'RO02','SEGURO CRÉDITOS HIPOTECARIOS',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(157,3,'RO03','PTMO HIPOTECARIO',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(158,3,'RO12','SEGURO CRÉDITOS HIPOTECARIOS NO RESIDENTES',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(159,3,'RO13','FINANCIACION NO RESI',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(160,3,'RP02','SEGURO CRÉDITOS PERSONALES',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','10/01/2023 deja de comercializarse'),(161,3,'RP03','PTMO PERSONAL',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(162,3,'RP12','Seguro Créditos Personales Anual',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(163,3,'RT02','SEGURO HIPOTECARIO PLUS 10',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','10/01/2023 deja de comercializarse'),(164,3,'RT12','Seguro Créditos Hipotecarios Mixto',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(165,3,'RT13','SEG.TEMPORAL - A.R.',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(166,3,'RU03','RIESGO HIPOTECARIO',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(167,3,'RW02','Unirentas Pensión Vitalicia',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(168,3,'RW03','Unirentas Pensión Vitalicia',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(169,3,'RW22','Unirentas Pensión Vitalicia 22',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','GDA'),(170,3,'SD02','SAFA (automatizado)',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(171,3,'SD2M','SAFA (manual)',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(172,2,'SL10','SANTA LUCIA FONDO X, F.P',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(173,3,'SM02','SAFA-RENTAS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(174,3,'SR02','SEGURO DE RENTAS (automatizado)',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(175,3,'SR2M','SEGURO DE RENTAS (manual)',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(176,1,'SULC0','SEGURO DE APORTACIÓN DEFINIDA',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','NO CONCILIA'),(177,3,'TC01','TEMPORAL CONSTANTE',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(178,1,'U4071','TAR INDIVIDUAL U4071',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(179,3,'UL11','MULTIFONDOS I',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(180,3,'UL12','MULTIFONDOS II',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(181,3,'UR01','UNIPLAN RENTAS ASEGURADAS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(182,3,'UX01','TAR COLECTIVOS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(183,3,'UX02','TAR COLECTIVOS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(184,3,'UX03','TAR COLECTIVOS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(185,3,'UX04','TAR EXTERIORIZACIÓN UNICAJA',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(186,3,'UX05','TAR COLECTIVOS ABIERTO',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(187,1,'V4071','PLAN VIDA INTEGRAL',1,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000',''),(188,3,'VC03','RENTA VITALICIA PLUS',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(189,3,'VR03','RENTA ESPAÑA P.V.',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','14/10/2019 SE ANADEN LOS DE CEV'),(190,3,'ZZZZ','contratos liberbank',0,1,'2024-05-08 20:14:15.000',NULL,'2024-05-08 20:14:15.000','');
/*!40000 ALTER TABLE `Ramo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RamoDocumento`
--

DROP TABLE IF EXISTS `RamoDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RamoDocumento` (
  `RamoDocId` int NOT NULL AUTO_INCREMENT,
  `RamoId` int NOT NULL,
  `DocumentoId` int NOT NULL,
  `AnexoIncidencias` int DEFAULT NULL,
  `AnexoConciliacion` int DEFAULT NULL,
  `Caratula` int DEFAULT NULL,
  `RequiereComunicacion` tinyint(1) DEFAULT '0',
  `Fase` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `FechaInicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `PlantillaConciliacion` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`RamoDocId`),
  KEY `RamoDocumento_DocumentoId_fkey` (`DocumentoId`),
  KEY `RamoDocumento_AnexoIncidencias_fkey` (`AnexoIncidencias`),
  KEY `RamoDocumento_AnexoConciliacion_fkey` (`AnexoConciliacion`),
  KEY `RamoDocumento_Caratula_fkey` (`Caratula`),
  KEY `RamoDocumento_RamoId_fkey` (`RamoId`),
  CONSTRAINT `RamoDocumento_AnexoConciliacion_fkey` FOREIGN KEY (`AnexoConciliacion`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `RamoDocumento_AnexoIncidencias_fkey` FOREIGN KEY (`AnexoIncidencias`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `RamoDocumento_Caratula_fkey` FOREIGN KEY (`Caratula`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `RamoDocumento_DocumentoId_fkey` FOREIGN KEY (`DocumentoId`) REFERENCES `MaestroDocumentos` (`TipoDocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `RamoDocumento_RamoId_fkey` FOREIGN KEY (`RamoId`) REFERENCES `RamoTipoOperacion` (`RamoTipoOpId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=771 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RamoDocumento`
--

LOCK TABLES `RamoDocumento` WRITE;
/*!40000 ALTER TABLE `RamoDocumento` DISABLE KEYS */;
INSERT INTO `RamoDocumento` VALUES (1,1,8,NULL,NULL,NULL,1,'CON',0,'2024-06-06 14:36:50.526',NULL,''),(2,2,8,NULL,NULL,NULL,1,'CON',0,'2024-06-06 14:36:50.526',NULL,''),(3,3,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(4,3,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(5,3,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(6,3,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(7,4,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(8,4,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(9,4,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(10,5,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(11,5,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(12,5,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(13,5,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(14,5,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(15,6,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(16,6,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(17,7,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(18,7,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(19,7,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(20,8,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(21,8,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(22,8,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(23,8,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(24,8,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(25,9,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(26,9,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(27,9,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(28,9,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(29,9,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(30,10,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(31,10,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(32,10,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(33,10,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(34,10,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(35,10,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(36,11,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(37,11,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(38,11,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(39,11,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(40,11,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(41,11,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(42,12,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(43,12,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(44,12,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(45,12,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(46,12,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(47,12,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(48,13,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(49,13,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(50,13,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(51,13,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(52,13,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(53,13,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(54,14,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(55,14,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(56,14,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(57,14,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(58,14,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(59,14,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(60,15,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(61,15,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(62,15,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(63,15,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(64,15,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(65,15,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(66,16,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(67,16,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(68,16,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(69,16,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(70,16,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(71,16,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(72,17,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(73,17,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(74,17,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(75,17,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(76,17,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(77,18,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(78,18,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(79,19,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(80,19,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(81,19,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(82,20,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(83,20,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(84,20,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(85,25,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(86,25,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(87,25,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(88,31,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(89,31,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(90,31,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(91,43,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(92,43,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(93,43,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(94,44,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(95,44,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(96,44,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(97,56,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(98,56,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(99,56,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(100,57,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(101,57,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(102,57,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(103,58,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(104,58,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(105,58,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(106,59,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(107,59,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(108,59,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(109,70,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(110,70,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(111,70,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(112,72,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(113,72,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(114,73,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(115,73,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(116,74,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(117,74,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(118,82,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(119,82,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(120,82,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(121,83,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(122,83,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(123,83,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(124,86,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(125,86,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(126,86,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(127,87,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(128,87,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(129,87,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(130,95,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(131,95,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(132,95,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(133,95,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(134,95,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(135,96,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(136,96,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(137,96,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(138,97,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(139,97,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(140,97,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(141,98,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(142,98,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(143,98,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(144,99,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(145,99,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(146,99,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(147,100,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(148,100,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(149,100,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(150,102,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(151,102,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(152,102,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(153,103,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(154,103,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(155,103,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(156,116,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(157,116,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(158,116,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(159,119,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(160,119,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(161,119,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(162,120,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(163,120,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(164,120,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(165,122,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(166,122,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(167,122,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(168,123,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(169,123,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(170,123,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(171,130,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(172,130,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(173,130,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(174,130,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(175,172,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(176,172,7,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(177,172,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(178,178,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(179,178,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(180,178,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(181,178,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(182,187,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(183,187,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(184,187,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(185,187,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(186,101,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(187,101,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(188,101,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(189,101,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(190,108,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(191,108,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(192,108,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(193,108,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(194,118,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(195,118,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(196,118,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(197,121,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(198,121,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(199,121,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(200,124,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(201,124,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(202,124,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(203,124,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(204,125,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(205,125,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(206,125,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(207,125,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(208,126,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(209,126,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(210,126,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(211,126,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(212,127,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(213,127,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(214,127,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(215,127,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(216,128,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(217,128,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(218,128,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(219,128,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(220,143,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(221,143,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(222,143,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(223,143,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(224,150,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(225,150,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(226,150,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(227,150,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(228,151,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(229,151,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(230,151,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(231,151,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(232,155,3,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(233,155,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(234,155,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(235,155,8,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(236,22,1,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(237,22,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(238,22,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(239,22,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(240,22,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(241,23,1,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(242,23,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(243,23,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(244,23,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(245,23,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(246,24,1,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(247,24,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(248,24,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(249,24,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(250,24,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(251,26,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(252,26,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(253,32,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(254,32,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(255,32,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(256,32,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(257,38,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(258,38,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(259,38,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(260,40,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(261,40,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(262,40,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(263,50,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(264,50,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(265,50,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(266,51,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(267,51,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(268,51,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(269,52,1,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(270,52,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(271,52,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(272,52,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(273,52,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(274,52,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(275,53,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(276,62,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(277,62,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(278,65,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(279,65,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(280,65,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(281,66,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(282,66,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(283,66,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(284,67,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(285,67,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(286,67,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(287,104,1,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(288,104,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(289,104,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(290,104,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(291,104,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(292,104,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(293,106,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(294,106,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(295,106,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(296,133,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(297,133,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(298,133,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(299,135,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(300,135,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(301,135,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(302,136,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(303,136,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(304,136,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(305,137,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(306,137,6,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(307,137,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(308,138,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(309,138,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(310,138,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(311,138,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(312,139,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(313,139,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(314,139,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(315,139,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(316,140,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(317,140,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(318,140,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(319,141,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(320,141,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(321,141,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(322,144,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(323,144,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(324,144,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(325,144,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(326,145,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(327,145,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(328,145,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(329,145,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(330,146,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(331,146,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(332,146,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(333,146,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(334,148,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(335,148,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(336,148,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(337,148,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(338,152,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(339,152,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(340,152,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(341,152,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(342,153,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(343,153,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(344,153,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(345,153,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(346,154,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(347,154,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(348,154,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(349,156,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(350,156,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(351,156,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(352,156,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(353,157,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(354,157,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(355,157,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(356,157,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(357,158,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(358,158,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(359,158,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(360,158,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(361,160,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(362,160,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(363,160,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(364,161,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(365,161,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(366,161,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(367,162,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(368,162,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(369,162,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(370,163,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(371,163,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(372,163,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(373,163,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(374,164,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(375,164,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(376,164,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(377,165,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(378,165,5,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(379,165,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(380,165,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(381,167,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(382,167,10,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(383,167,11,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(384,169,4,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(385,169,9,NULL,NULL,NULL,1,'CON',1,'2024-06-06 14:36:50.526',NULL,''),(386,1,8,NULL,NULL,NULL,1,'PRECON',0,'2024-06-06 14:36:50.526',NULL,''),(387,2,8,NULL,NULL,NULL,1,'PRECON',0,'2024-06-06 14:36:50.526',NULL,''),(388,3,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(389,3,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(390,3,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(391,3,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(392,4,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(393,4,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(394,4,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(395,5,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(396,5,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(397,5,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(398,5,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(399,5,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(400,6,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(401,6,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(402,7,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(403,7,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(404,7,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(405,8,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(406,8,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(407,8,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(408,8,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(409,8,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(410,9,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(411,9,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(412,9,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(413,9,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(414,9,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(415,10,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(416,10,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(417,10,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(418,10,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(419,10,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(420,10,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(421,11,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(422,11,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(423,11,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(424,11,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(425,11,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(426,11,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(427,12,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(428,12,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(429,12,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(430,12,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(431,12,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(432,12,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(433,13,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(434,13,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(435,13,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(436,13,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(437,13,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(438,13,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(439,14,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(440,14,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(441,14,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(442,14,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(443,14,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(444,14,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(445,15,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(446,15,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(447,15,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(448,15,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(449,15,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(450,15,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(451,16,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(452,16,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(453,16,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(454,16,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(455,16,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(456,16,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(457,17,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(458,17,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(459,17,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(460,17,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(461,17,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(462,18,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(463,18,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(464,19,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(465,19,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(466,19,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(467,20,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(468,20,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(469,20,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(470,25,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(471,25,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(472,25,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(473,31,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(474,31,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(475,31,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(476,43,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(477,43,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(478,43,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(479,44,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(480,44,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(481,44,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(482,56,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(483,56,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(484,56,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(485,57,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(486,57,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(487,57,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(488,58,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(489,58,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(490,58,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(491,59,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(492,59,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(493,59,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(494,70,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(495,70,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(496,70,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(497,72,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(498,72,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(499,73,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(500,73,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(501,74,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(502,74,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(503,82,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(504,82,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(505,82,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(506,83,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(507,83,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(508,83,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(509,86,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(510,86,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(511,86,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(512,87,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(513,87,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(514,87,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(515,95,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(516,95,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(517,95,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(518,95,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(519,95,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(520,96,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(521,96,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(522,96,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(523,97,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(524,97,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(525,97,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(526,98,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(527,98,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(528,98,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(529,99,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(530,99,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(531,99,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(532,100,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(533,100,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(534,100,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(535,102,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(536,102,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(537,102,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(538,103,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(539,103,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(540,103,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(541,116,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(542,116,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(543,116,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(544,119,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(545,119,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(546,119,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(547,120,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(548,120,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(549,120,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(550,122,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(551,122,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(552,122,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(553,123,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(554,123,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(555,123,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(556,130,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(557,130,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(558,130,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(559,130,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(560,172,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(561,172,7,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(562,172,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(563,178,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(564,178,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(565,178,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(566,178,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(567,187,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(568,187,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(569,187,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(570,187,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(571,101,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(572,101,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(573,101,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(574,101,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(575,108,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(576,108,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(577,108,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(578,108,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(579,118,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(580,118,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(581,118,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(582,121,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(583,121,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(584,121,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(585,124,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(586,124,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(587,124,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(588,124,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(589,125,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(590,125,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(591,125,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(592,125,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(593,126,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(594,126,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(595,126,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(596,126,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(597,127,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(598,127,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(599,127,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(600,127,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(601,128,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(602,128,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(603,128,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(604,128,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(605,143,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(606,143,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(607,143,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(608,143,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(609,150,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(610,150,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(611,150,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(612,150,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(613,151,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(614,151,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(615,151,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(616,151,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(617,155,3,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(618,155,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(619,155,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(620,155,8,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(621,22,1,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(622,22,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(623,22,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(624,22,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(625,22,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(626,23,1,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(627,23,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(628,23,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(629,23,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(630,23,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(631,24,1,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(632,24,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(633,24,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(634,24,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(635,24,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(636,26,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(637,26,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(638,32,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(639,32,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(640,32,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(641,32,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(642,38,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(643,38,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(644,38,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(645,40,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(646,40,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(647,40,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(648,50,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(649,50,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(650,50,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(651,51,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(652,51,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(653,51,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(654,52,1,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(655,52,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(656,52,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(657,52,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(658,52,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(659,52,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(660,53,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(661,62,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(662,62,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(663,65,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(664,65,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(665,65,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(666,66,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(667,66,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(668,66,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(669,67,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(670,67,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(671,67,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(672,104,1,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(673,104,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(674,104,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(675,104,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(676,104,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(677,104,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(678,106,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(679,106,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(680,106,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(681,133,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(682,133,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(683,133,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(684,135,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(685,135,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(686,135,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(687,136,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(688,136,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(689,136,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(690,137,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(691,137,6,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(692,137,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(693,138,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(694,138,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(695,138,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(696,138,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(697,139,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(698,139,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(699,139,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(700,139,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(701,140,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(702,140,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(703,140,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(704,141,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(705,141,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(706,141,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(707,144,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(708,144,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(709,144,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(710,144,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(711,145,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(712,145,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(713,145,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(714,145,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(715,146,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(716,146,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(717,146,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(718,146,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(719,148,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(720,148,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(721,148,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(722,148,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(723,152,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(724,152,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(725,152,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(726,152,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(727,153,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(728,153,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(729,153,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(730,153,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(731,154,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(732,154,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(733,154,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(734,156,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(735,156,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(736,156,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(737,156,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(738,157,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(739,157,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(740,157,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(741,157,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(742,158,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(743,158,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(744,158,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(745,158,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(746,160,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(747,160,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(748,160,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(749,161,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(750,161,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(751,161,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(752,162,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(753,162,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(754,162,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(755,163,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(756,163,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(757,163,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(758,163,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(759,164,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(760,164,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(761,164,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(762,165,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(763,165,5,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(764,165,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(765,165,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(766,167,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(767,167,10,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(768,167,11,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(769,169,4,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,''),(770,169,9,NULL,NULL,NULL,1,'PRECON',1,'2024-06-06 14:36:50.526',NULL,'');
/*!40000 ALTER TABLE `RamoDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RamoTipoOperacion`
--

DROP TABLE IF EXISTS `RamoTipoOperacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RamoTipoOperacion` (
  `RamoTipoOpId` int NOT NULL,
  `RamoId` int NOT NULL,
  `PlantillaIncidencia` int DEFAULT NULL,
  `PlantillaConciliacion` int DEFAULT NULL,
  `TipoOperacion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `FechaInicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`RamoTipoOpId`),
  KEY `RamoTipoOperacion_RamoId_fkey` (`RamoId`),
  KEY `RamoTipoOperacion_PlantillaIncidencia_fkey` (`PlantillaIncidencia`),
  KEY `RamoTipoOperacion_PlantillaConciliacion_fkey` (`PlantillaConciliacion`),
  CONSTRAINT `RamoTipoOperacion_PlantillaConciliacion_fkey` FOREIGN KEY (`PlantillaConciliacion`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `RamoTipoOperacion_PlantillaIncidencia_fkey` FOREIGN KEY (`PlantillaIncidencia`) REFERENCES `RepositorioPlantillas` (`PlantillaId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `RamoTipoOperacion_RamoId_fkey` FOREIGN KEY (`RamoId`) REFERENCES `Ramo` (`RamoId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RamoTipoOperacion`
--

LOCK TABLES `RamoTipoOperacion` WRITE;
/*!40000 ALTER TABLE `RamoTipoOperacion` DISABLE KEYS */;
INSERT INTO `RamoTipoOperacion` VALUES (1,1,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(2,2,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(3,3,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(4,4,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(5,5,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(6,6,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(7,7,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(8,8,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(9,9,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(10,10,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(11,11,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(12,12,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(13,13,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(14,14,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(15,15,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(16,16,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(17,17,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(18,18,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(19,19,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(20,20,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(21,21,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(22,22,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(23,23,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(24,24,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(25,25,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(26,26,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(27,27,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(28,28,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(29,29,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(30,30,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(31,31,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(32,32,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(33,33,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(34,34,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(35,35,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(36,36,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(37,37,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(38,38,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(39,39,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(40,40,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(41,41,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(42,42,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(43,43,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(44,44,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(45,45,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(46,46,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(47,47,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(48,48,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(49,49,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(50,50,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(51,51,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(52,52,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(53,53,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(54,54,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(55,55,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(56,56,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(57,57,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(58,58,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(59,59,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(60,60,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(61,61,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(62,62,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(63,63,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(64,64,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(65,65,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(66,66,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(67,67,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(68,68,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(69,69,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(70,70,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(71,71,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(72,72,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(73,73,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(74,74,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(75,75,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(76,76,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(77,77,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(78,78,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(79,79,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(80,80,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(81,81,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(82,82,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(83,83,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(84,84,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(85,85,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(86,86,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(87,87,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(88,88,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(89,89,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(90,90,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(91,91,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(92,92,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(93,93,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(94,94,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(95,95,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(96,96,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(97,97,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(98,98,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(99,99,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(100,100,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(101,101,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(102,102,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(103,103,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(104,104,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(105,105,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(106,106,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(107,107,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(108,108,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(109,109,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(110,110,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(111,111,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(112,112,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(113,113,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(114,114,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(115,115,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(116,116,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(117,117,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(118,118,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(119,119,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(120,120,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(121,121,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(122,122,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(123,123,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(124,124,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(125,125,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(126,126,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(127,127,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(128,128,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(129,129,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(130,130,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(131,131,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(132,132,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(133,133,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(134,134,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(135,135,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(136,136,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(137,137,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(138,138,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(139,139,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(140,140,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(141,141,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(142,142,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(143,143,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(144,144,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(145,145,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(146,146,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(147,147,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(148,148,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(149,149,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(150,150,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(151,151,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(152,152,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(153,153,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(154,154,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(155,155,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(156,156,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(157,157,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(158,158,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(159,159,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(160,160,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(161,161,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(162,162,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(163,163,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(164,164,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(165,165,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(166,166,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(167,167,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(168,168,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(169,169,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(170,170,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(171,171,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(172,172,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(173,173,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(174,174,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(175,175,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(176,176,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(177,177,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(178,178,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(179,179,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(180,180,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(181,181,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(182,182,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(183,183,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(184,184,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(185,185,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(186,186,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(187,187,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(188,188,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(189,189,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL),(190,190,NULL,NULL,'Alta',1,'2024-05-08 20:30:07.000',NULL);
/*!40000 ALTER TABLE `RamoTipoOperacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reclamaciones`
--

DROP TABLE IF EXISTS `Reclamaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reclamaciones` (
  `ReclamacionId` int NOT NULL AUTO_INCREMENT,
  `ContratoId` int NOT NULL,
  `UsuarioId` int NOT NULL,
  `Descricion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FechaReclamacion` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`ReclamacionId`),
  KEY `Reclamaciones_ContratoId_fkey` (`ContratoId`),
  KEY `Reclamaciones_UsuarioId_fkey` (`UsuarioId`),
  CONSTRAINT `Reclamaciones_ContratoId_fkey` FOREIGN KEY (`ContratoId`) REFERENCES `Contrato` (`ContratoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Reclamaciones_UsuarioId_fkey` FOREIGN KEY (`UsuarioId`) REFERENCES `Usuario` (`UsuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reclamaciones`
--

LOCK TABLES `Reclamaciones` WRITE;
/*!40000 ALTER TABLE `Reclamaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reclamaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RepositorioPlantillas`
--

DROP TABLE IF EXISTS `RepositorioPlantillas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RepositorioPlantillas` (
  `PlantillaId` int NOT NULL,
  `Documento` longblob NOT NULL,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `FechaAlta` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`PlantillaId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RepositorioPlantillas`
--

LOCK TABLES `RepositorioPlantillas` WRITE;
/*!40000 ALTER TABLE `RepositorioPlantillas` DISABLE KEYS */;
/*!40000 ALTER TABLE `RepositorioPlantillas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rol`
--

DROP TABLE IF EXISTS `Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol` (
  `RolId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `FechaAlta` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`RolId`),
  UNIQUE KEY `Rol_Nombre_key` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol`
--

LOCK TABLES `Rol` WRITE;
/*!40000 ALTER TABLE `Rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoConciliacion`
--

DROP TABLE IF EXISTS `TipoConciliacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoConciliacion` (
  `TipoConciliacionId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Activo` tinyint(1) DEFAULT '1',
  `FechaInicio` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`TipoConciliacionId`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoConciliacion`
--

LOCK TABLES `TipoConciliacion` WRITE;
/*!40000 ALTER TABLE `TipoConciliacion` DISABLE KEYS */;
INSERT INTO `TipoConciliacion` VALUES (8,'actualización de histórico',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(9,'por grabación carga GDA',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(10,'conciliado GDA',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(11,'Por Volcado (CCC)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(12,'Por Volcado (Póliza)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(21,'Por Fichero Tableta (CCC)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(22,'Por Fichero Tableta (Propuesta NP)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(31,'Por Grabación AvivaBancos (CCC)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(32,'Por Grabación AvivaBancos (Póliza)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(33,'Por Grabación AvivaBancos (Póliza NP)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(34,'Por Grabación AvivaBancos (Propuesta NP)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(35,'Por Grabación AvivaBancos (Ramo+Propuesta 1+2+3)',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(40,'MANUAL',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(41,'Carga previa',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000'),(45,'Firma digital',1,'2024-05-27 19:03:47.000',NULL,'2024-05-27 19:03:47.000');
/*!40000 ALTER TABLE `TipoConciliacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoDocIncidencia`
--

DROP TABLE IF EXISTS `TipoDocIncidencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TipoDocIncidencia` (
  `TipoDocIncidenciaId` int NOT NULL,
  `TipoDocumentoId` int NOT NULL,
  `TipoIncidenciaId` int NOT NULL,
  `Activo` tinyint(1) NOT NULL,
  `MailInterno` tinyint(1) NOT NULL DEFAULT '0',
  `FechaInicio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`TipoDocIncidenciaId`),
  KEY `TipoDocIncidencia_TipoDocumentoId_fkey` (`TipoDocumentoId`),
  KEY `TipoDocIncidencia_TipoIncidenciaId_fkey` (`TipoIncidenciaId`),
  CONSTRAINT `TipoDocIncidencia_TipoDocumentoId_fkey` FOREIGN KEY (`TipoDocumentoId`) REFERENCES `MaestroDocumentos` (`TipoDocumentoId`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `TipoDocIncidencia_TipoIncidenciaId_fkey` FOREIGN KEY (`TipoIncidenciaId`) REFERENCES `MaestroIncidencias` (`TipoIncidenciaId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoDocIncidencia`
--

LOCK TABLES `TipoDocIncidencia` WRITE;
/*!40000 ALTER TABLE `TipoDocIncidencia` DISABLE KEYS */;
INSERT INTO `TipoDocIncidencia` VALUES (1,2,2,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(2,2,2,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(3,2,3,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(4,2,3,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(5,3,5,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(6,3,8,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(7,3,11,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(8,3,14,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(9,3,15,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(10,3,7,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(11,3,10,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(12,3,13,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(13,3,6,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(14,3,9,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(15,3,12,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(16,3,16,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(17,4,23,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(18,4,19,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(19,4,18,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(20,4,20,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(21,4,22,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(22,4,25,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(23,4,21,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(24,4,24,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(25,4,17,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(26,5,41,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(27,5,31,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(28,5,40,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(29,5,45,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(30,5,43,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(31,5,42,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(32,5,47,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(33,5,44,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(34,5,46,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(35,5,29,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(36,5,28,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(37,5,38,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(38,5,34,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(39,5,49,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(40,5,52,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(41,5,54,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(42,5,50,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(43,5,55,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(44,5,39,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(45,5,48,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(46,5,53,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(47,5,57,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(48,5,51,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(49,5,56,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(50,5,27,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(51,5,37,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(52,5,33,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(53,5,30,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(54,5,36,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(55,5,32,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(56,5,35,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(57,5,26,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(58,6,59,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(59,6,62,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(60,6,61,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(61,6,60,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(62,6,58,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(63,7,65,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(64,7,64,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(65,7,63,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(66,8,68,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(67,8,74,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(68,8,73,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(69,8,79,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(70,8,72,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(71,8,78,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000'),(72,8,67,1,0,'2024-05-08 19:50:40.000',NULL,'2024-05-08 19:50:40.000');
/*!40000 ALTER TABLE `TipoDocIncidencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuario` (
  `UsuarioId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CaducidadPassword` datetime(3) DEFAULT NULL,
  `RolId` int NOT NULL,
  `Codigo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FechAlta` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  `Activo` tinyint(1) DEFAULT '1',
  `FechaBaja` datetime(3) DEFAULT NULL,
  `FechaUltimaModif` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`UsuarioId`),
  UNIQUE KEY `Usuario_Codigo_key` (`Codigo`),
  KEY `Usuario_RolId_fkey` (`RolId`),
  CONSTRAINT `Usuario_RolId_fkey` FOREIGN KEY (`RolId`) REFERENCES `Rol` (`RolId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bpm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-06 14:41:44

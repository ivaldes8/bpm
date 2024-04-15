-- CreateTable
CREATE TABLE "Rol" (
    "RolId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL DEFAULT true,
    "FechaAlta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaUltimaModif" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "UsuarioId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CaducidadPassword" DATETIME,
    "RolId" INTEGER NOT NULL,
    "Codigo" TEXT,
    "FechAlta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Activo" BOOLEAN NOT NULL DEFAULT true,
    "FechaBaja" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaUltimaModif" DATETIME NOT NULL,
    CONSTRAINT "Usuario_RolId_fkey" FOREIGN KEY ("RolId") REFERENCES "Rol" ("RolId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogAccion" (
    "LogId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UsuarioId" INTEGER NOT NULL,
    "Accion" TEXT NOT NULL,
    "FechaAccion" DATETIME NOT NULL,
    CONSTRAINT "LogAccion_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("UsuarioId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compania" (
    "CompaniaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Codigo" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Telefono" TEXT NOT NULL,
    "CorreoComp" TEXT NOT NULL,
    "ReclamarComp" BOOLEAN NOT NULL,
    "CorreoSoporte" TEXT NOT NULL,
    "ReclamarSoporte" BOOLEAN NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Mediador" (
    "MediadorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Codigo" TEXT NOT NULL,
    "Canal" TEXT NOT NULL,
    "Zona" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Responsable" TEXT NOT NULL,
    "EmailResponsable" TEXT NOT NULL,
    "Responsable2" TEXT NOT NULL,
    "EmailResponsable2" TEXT NOT NULL,
    "Reclamar" BOOLEAN NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaAlta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Observaciones" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FamiliaDocumento" (
    "FamiliaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Codigo" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MaestroDocumentos" (
    "TipoDocumentoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FamiliaId" INTEGER NOT NULL,
    "Codigo" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Suplemento" BOOLEAN NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MaestroDocumentos_FamiliaId_fkey" FOREIGN KEY ("FamiliaId") REFERENCES "FamiliaDocumento" ("FamiliaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MaestroIncidencias" (
    "TipoIncidenciaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DocAsociadoId" INTEGER NOT NULL,
    "Codigo" TEXT NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MaestroIncidencias_DocAsociadoId_fkey" FOREIGN KEY ("DocAsociadoId") REFERENCES "FamiliaDocumento" ("FamiliaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoDocIncidencia" (
    "TipoDocIncidenciaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TipoDocumentoId" INTEGER NOT NULL,
    "TipoIncidenciaId" INTEGER NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TipoDocIncidencia_TipoDocumentoId_fkey" FOREIGN KEY ("TipoDocumentoId") REFERENCES "MaestroDocumentos" ("TipoDocumentoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TipoDocIncidencia_TipoIncidenciaId_fkey" FOREIGN KEY ("TipoIncidenciaId") REFERENCES "MaestroIncidencias" ("TipoIncidenciaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RepositorioPlantillas" (
    "PlantillaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Documento" BLOB NOT NULL,
    "Nombre" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaAlta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Ramo" (
    "RamoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompId" INTEGER NOT NULL,
    "Codigo" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Reclamar" BOOLEAN NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaAlta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Observaciones" TEXT NOT NULL,
    CONSTRAINT "Ramo_CompId_fkey" FOREIGN KEY ("CompId") REFERENCES "Compania" ("CompaniaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RamoTipoOperacion" (
    "RamoTipoOpId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RamoId" INTEGER NOT NULL,
    "PlantillaIncidencia" INTEGER NOT NULL,
    "PlantillaConciliacion" INTEGER NOT NULL,
    "TipoOperacion" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    CONSTRAINT "RamoTipoOperacion_RamoId_fkey" FOREIGN KEY ("RamoId") REFERENCES "Ramo" ("RamoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RamoTipoOperacion_PlantillaIncidencia_fkey" FOREIGN KEY ("PlantillaIncidencia") REFERENCES "RepositorioPlantillas" ("PlantillaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RamoTipoOperacion_PlantillaConciliacion_fkey" FOREIGN KEY ("PlantillaConciliacion") REFERENCES "RepositorioPlantillas" ("PlantillaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RamoDocumento" (
    "RamoDocId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RamoId" INTEGER NOT NULL,
    "DocumentoId" INTEGER NOT NULL,
    "AnexoIncidencias" INTEGER NOT NULL,
    "AnexoConciliacion" INTEGER NOT NULL,
    "Caratula" INTEGER NOT NULL,
    "RequiereComunicacion" BOOLEAN NOT NULL,
    "Fase" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "PlantillaIncidencia" INTEGER NOT NULL,
    "PlantillaConciliacion" INTEGER NOT NULL,
    CONSTRAINT "RamoDocumento_RamoId_fkey" FOREIGN KEY ("RamoId") REFERENCES "RamoTipoOperacion" ("RamoTipoOpId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RamoDocumento_DocumentoId_fkey" FOREIGN KEY ("DocumentoId") REFERENCES "MaestroDocumentos" ("TipoDocumentoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RamoDocumento_AnexoIncidencias_fkey" FOREIGN KEY ("AnexoIncidencias") REFERENCES "RepositorioPlantillas" ("PlantillaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RamoDocumento_AnexoConciliacion_fkey" FOREIGN KEY ("AnexoConciliacion") REFERENCES "RepositorioPlantillas" ("PlantillaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RamoDocumento_Caratula_fkey" FOREIGN KEY ("Caratula") REFERENCES "RepositorioPlantillas" ("PlantillaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoConciliacion" (
    "TipoConciliacionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nombre" TEXT NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaBaja" DATETIME,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contrato" (
    "ContratoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompaniaId" INTEGER NOT NULL,
    "RamoId" INTEGER NOT NULL,
    "OficinaId" INTEGER NOT NULL,
    "Activo" BOOLEAN NOT NULL,
    "FechaAltaSolicitud" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaAltaContrato" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CCC" TEXT NOT NULL,
    "CodigoSolicitud" TEXT NOT NULL,
    "CodigoPoliza" TEXT NOT NULL,
    "FechaEfectoSolicitud" DATETIME,
    "FechaEfectoContrato" DATETIME,
    "AnuladoSE" BOOLEAN NOT NULL,
    "CSRespAfirm" BOOLEAN NOT NULL,
    "DNITomador" TEXT NOT NULL,
    "NombreTomador" TEXT NOT NULL,
    "DNIAsegurado" TEXT NOT NULL,
    "NombreAsegurado" TEXT NOT NULL,
    "ProfesionAsegurado" TEXT NOT NULL,
    "DeporteAsegurado" TEXT NOT NULL,
    "EdadAsegurado" INTEGER NOT NULL,
    "CanalMediador" TEXT NOT NULL,
    "CanalOperador" TEXT NOT NULL,
    "IndicadorFDPRECON" BOOLEAN NOT NULL,
    "TipoEnvioFDPRECON" TEXT NOT NULL,
    "ResultadoFDPRECON" TEXT NOT NULL,
    "IndicadorFDCON" BOOLEAN NOT NULL,
    "TipoEnvioFDCON" TEXT NOT NULL,
    "ResultadoFDCON" TEXT NOT NULL,
    "Conciliado" BOOLEAN NOT NULL,
    "FechaConciliacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UsuarioUltimaModif" INTEGER NOT NULL,
    "TipoConciliacionId" INTEGER NOT NULL,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contrato_CompaniaId_fkey" FOREIGN KEY ("CompaniaId") REFERENCES "Compania" ("CompaniaId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_RamoId_fkey" FOREIGN KEY ("RamoId") REFERENCES "Ramo" ("RamoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_OficinaId_fkey" FOREIGN KEY ("OficinaId") REFERENCES "Mediador" ("MediadorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_TipoConciliacionId_fkey" FOREIGN KEY ("TipoConciliacionId") REFERENCES "TipoConciliacion" ("TipoConciliacionId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_UsuarioUltimaModif_fkey" FOREIGN KEY ("UsuarioUltimaModif") REFERENCES "Usuario" ("UsuarioId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ObservacionContrato" (
    "ObservacionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UsuarioId" INTEGER NOT NULL,
    "ContratoId" INTEGER NOT NULL,
    "Contenido" TEXT NOT NULL,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaObs" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ObservacionContrato_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("UsuarioId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ObservacionContrato_ContratoId_fkey" FOREIGN KEY ("ContratoId") REFERENCES "Contrato" ("ContratoId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DocumentoContrato" (
    "DocumentoId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ContratoId" INTEGER NOT NULL,
    "TipoDocId" INTEGER NOT NULL,
    "UsuarioId" INTEGER NOT NULL,
    "EstadoDoc" TEXT NOT NULL,
    "NumeReclamaciones" INTEGER NOT NULL,
    CONSTRAINT "DocumentoContrato_ContratoId_fkey" FOREIGN KEY ("ContratoId") REFERENCES "Contrato" ("ContratoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DocumentoContrato_TipoDocId_fkey" FOREIGN KEY ("TipoDocId") REFERENCES "MaestroDocumentos" ("TipoDocumentoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DocumentoContrato_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("UsuarioId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IncidenciaDocumento" (
    "IncidenciaId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DocumentoId" INTEGER NOT NULL,
    "TipoIncidenciaId" INTEGER NOT NULL,
    "UsuarioId" INTEGER NOT NULL,
    "FechaIncidencia" DATETIME NOT NULL,
    "Resuelta" BOOLEAN NOT NULL,
    "NumReclamaciones" INTEGER NOT NULL,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IncidenciaDocumento_DocumentoId_fkey" FOREIGN KEY ("DocumentoId") REFERENCES "DocumentoContrato" ("DocumentoId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IncidenciaDocumento_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("UsuarioId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IncidenciaDocumento_TipoIncidenciaId_fkey" FOREIGN KEY ("TipoIncidenciaId") REFERENCES "MaestroIncidencias" ("TipoIncidenciaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ObservacionIncidencia" (
    "ObservacionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UsuarioId" INTEGER NOT NULL,
    "IncidenciaId" INTEGER NOT NULL,
    "Contenido" TEXT NOT NULL,
    "FechaObs" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ObservacionIncidencia_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("UsuarioId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ObservacionIncidencia_IncidenciaId_fkey" FOREIGN KEY ("IncidenciaId") REFERENCES "IncidenciaDocumento" ("IncidenciaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Precios" (
    "PrecioId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompaniaId" INTEGER NOT NULL,
    "Desde" INTEGER NOT NULL,
    "Hasta" INTEGER NOT NULL,
    "PrecioActuacion" REAL NOT NULL,
    "PrecioFijo" REAL NOT NULL,
    "FechaUltimaModif" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Precios_CompaniaId_fkey" FOREIGN KEY ("CompaniaId") REFERENCES "Compania" ("CompaniaId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Codigo_key" ON "Usuario"("Codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Compania_Codigo_key" ON "Compania"("Codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Compania_Descripcion_key" ON "Compania"("Descripcion");

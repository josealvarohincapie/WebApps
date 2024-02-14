
IF OBJECT_ID('spConsultarDatosRadicadoPorCodigo') IS NOT NULL
      BEGIN
            DROP Procedure spConsultarDatosRadicadoPorCodigo
      END
GO

/*===============================================================================================================				 
* Sistema  : Centro Medico Imbanaco - SIAM - Modulo
* Archivo  : prcConsultarServicioPorTrafico.sql
* Autor	   : José Álvaro Hincapié Castillo
* 
* Fecha      Responsable        Comentarios
* ==============================================================================================================
* 13/02/2024 José A Hincapié	Permite consultar los datos de un radicado a partir del código del radicado
* =============================================================================================================== */
CREATE PROCEDURE [dbo].[spConsultarDatosRadicadoPorCodigo]
@codigoSolicitud bigint
AS
	BEGIN
		select 
            rad.CodigoSolicitud, tt.Codigo CodigoTipoTramite, tt.Nombre NombreTipoTramite
            , fue.Codigo CodigoFuente,fue.Nombre NombreFuente
            , rad.Incidente
            , rad.NumeroRadicado, rad.Fecha, rad.Remitente
            , rad.Asunto, rad.Direccion, rad.Telefono
            , rad.CodigoEntidad, rad.NombreEntidad, rad.Correo
            , rad.Folios, rad.Anexos, rad.EsUrgente            
            , td.Codigo CodigoTipoDocumento, td.Nombre NombreTipoDocumento
            , std.Codigo CodigoSubTipoDocumento, std.Nombre NombreSubTipoDocumento
            , ge.Codigo CodigoGrupoEtnico, tt.Nombre NombreGrupoEtnico 
            , sd.Codigo CodigoSituacionDiscapacidad, tt.Nombre NombreSituacionDiscapacidad 
            , sep.Codigo CodigoSujetoEspecialProteccion, sep.Nombre NombreSujetoEspecialProteccion
            , ec.Codigo CodigoEstadoCivil, ec.Nombre NombreEstadoCivil
            , ne.Codigo CodigoNivelEstudio, ne.Nombre NombreNivelEstudio
            , rad.Discapacidad
            , rad.GrupoEtnicoReconoce
            , gen.Codigo CodigoGenero, gen.Nombre NombreGenero 
            , sex.Codigo CodigoSexo, sex.Nombre NombreSexo
            , os.Codigo CodigoOrientacionSexual, os.Nombre NombreOrientacionSexual
            , pro.Codigo CodigoProcedencia, pro.Nombre NombreProcedencia
            , re.Codigo CodigoRangoEdad, re.Nombre NombreRangoEdad 
            , ts.Codigo CodigoTipoSolicitante, ts.NombreTipoSolicitante 
            , rad.EsAnonimo
            , tdi.Codigo CodigoTipoDocId, tdi.Nombre NombreTipoDocId
            , pai.Codigo CodigoPais, pai.NombrePais NombrePais 
            , dep.Codigo CodigoDpto, dep.Nombre NombreDpto
            , ciu.Codigo CodigoCiudad, ciu.Nombre NombreCiudad
            , mr.Codigo CodigoMedioRespuesta, mr.Nombre NombreMedioRespuesta
            , tp.Codigo CodigoTipoPqrs, tp.Nombre NombreTipoPqrs
            , rad.Resumen, rad.DescripcionHechos, rad.DescripcionSolicitud
            , dh.Codigo CodigoDptoHechos, dh.Nombre NombreDptoHechos
            , mh.Codigo CodigoMunicipioHechos, mh.Nombre NombreMunicipioHechos
            , fo.Codigo CodigoFormato, fo.Nombre NombreFormato
            , rad.Observaciones
            from Radicado rad
            LEFT JOIN Catalogo.TipoTramite tt ON rad.CodigoTipoTramite = tt.Codigo and tt.Habilitado = 1
            LEFT JOIN Catalogo.Fuente fue ON rad.CodigoFuente = fue.Codigo and fue.Habilitado = 1
            LEFT JOIN Catalogo.Genero gen ON rad.CodigoGenero = gen.Codigo and gen.Habilitado = 1
            LEFT JOIN Catalogo.TipoDocumento td ON rad.CodigoTipoDocumento = td.Codigo and td.Habilitado = 1
            LEFT JOIN Catalogo.SubTipoDocumento std ON rad.CodigoSubTipoDocumento = std.Codigo and std.Habilitado = 1
            LEFT JOIN Catalogo.GrupoEtnico ge ON rad.CodigoGrupoEtnico = ge.Codigo and ge.Habilitado = 1
            LEFT JOIN Catalogo.SituacionDiscapacidad sd ON rad.CodigoSituacionDiscapacidad = sd.Codigo and sd.Habilitado = 1
            LEFT JOIN Catalogo.SujetoEspecialProteccion sep ON rad.CodigoSujetoEspecialProteccion = fue.Codigo and fue.Habilitado = 1
            LEFT JOIN Catalogo.EstadoCivil ec ON rad.CodigoFuente = ec.Codigo and ec.Habilitado = 1
            LEFT JOIN Catalogo.NivelEstudios ne ON rad.CodigoFuente = ne.Codigo and ne.Habilitado = 1
            LEFT JOIN Catalogo.Sexo sex ON rad.CodigoFuente = sex.Codigo and sex.Habilitado = 1
            LEFT JOIN Catalogo.OrientacionSexual os ON rad.CodigoFuente = os.Codigo and os.Habilitado = 1
            LEFT JOIN Catalogo.Procedencia pro ON rad.CodigoFuente = pro.Codigo and pro.Habilitado = 1
            LEFT JOIN Catalogo.RangoEdad re ON rad.CodigoFuente = re.Codigo and re.Habilitado = 1
            LEFT JOIN Catalogo.TipoSolicitante ts ON rad.CodigoFuente = ts.Codigo and ts.Habilitado = 1
            LEFT JOIN Catalogo.TipoDocumentoIdentificacion tdi ON rad.CodigoFuente = tdi.Codigo and tdi.Habilitado = 1
            LEFT JOIN Catalogo.Pais pai ON rad.CodigoFuente = pai.Codigo and pai.Habilitado = 1
            LEFT JOIN Catalogo.Departamento dep ON rad.CodigoFuente = dep.Codigo and dep.Habilitado = 1
            LEFT JOIN Catalogo.Ciudad ciu ON rad.CodigoFuente = ciu.Codigo and ciu.Habilitado = 1
            LEFT JOIN Catalogo.MedioRespuesta mr ON rad.CodigoFuente = mr.Codigo and mr.Habilitado = 1
            LEFT JOIN Catalogo.TipoPqrs tp ON rad.CodigoFuente = tp.Codigo and tp.Habilitado = 1
            LEFT JOIN Catalogo.Departamento dh ON rad.CodigoFuente = dh.Codigo and dh.Habilitado = 1
            LEFT JOIN Catalogo.Ciudad mh ON rad.CodigoFuente = mh.Codigo and mh.Habilitado = 1
            LEFT JOIN Catalogo.Formato fo ON rad.CodigoFuente = fo.Codigo and fo.Habilitado = 1
            where CodigoSolicitud = @codigoSolicitud
	END
go

using System.Data.SqlClient;
using System.Data;
using System;
using Modelo.dto;
using System.Collections.Generic;
using System.Xml.Linq;

namespace AccesoDatos.Data
{
    /// <summary>
    /// Permite gestionar la información de las solicitudes de radicación
    /// </summary>
    public class RadicadoData
    {
        private ConexionDB conexion = new ConexionDB();

        SqlDataReader leer;
        SqlCommand comando = new SqlCommand();

        /// <summary>        
        /// Permite consultar los datos de la radicación apartir del código de la solicitud
        /// </summary>        
        /// <param name="codigoSolicitud">Identificador único de la solicitud de radicación</param>
        /// <returns>Los datos de la solicitud de radicación</returns>
        public List<RadicadoDTO> ConsultarDatosRadicadoPorCodigo(Int64 codigoSolicitud)
        {
            List<RadicadoDTO> radicados = null;
            try
            {
                DataTable tabla = new DataTable();

                comando.Connection = conexion.AbrirConexion();
                comando.CommandText = "spConsultarDatosRadicadoPorCodigo";
                comando.CommandType = CommandType.StoredProcedure;
                leer = comando.ExecuteReader();

                tabla.Load(leer);

                radicados = MapearDatos(tabla);

            } catch (Exception ex)
            {
                throw new Exception("Excepción ConsultarDatosRadicadoPorCodigo: " + ex.Message);
            } finally
            {
                conexion.CerrarConexion();
            }
            return radicados;
        }
        
        private List<RadicadoDTO> MapearDatos(DataTable dt)
        {
            var lista = new List<RadicadoDTO>();

            foreach (DataRow row in dt.Rows)
            {
                var data = new RadicadoDTO();

                data.CodigoSolicitud = Int64.Parse(row["CodigoSolicitud"].ToString());

                data.TipoTramite = new CatalogoDTO();
                data.TipoTramite.Codigo = row["CodigoTipoTramite"].ToString();
                data.TipoTramite.Nombre = row["NombreTipoTramite"].ToString();

                data.Fuente = new CatalogoDTO();
                data.Fuente.Codigo = row["CodigoFuente"].ToString();
                data.Fuente.Nombre = row["NombreFuente"].ToString();

                data.Incidente = Int32.Parse(row["Incidente"].ToString());
                data.NumeroRadicado = row["NumeroRadicado"].ToString();
                data.Fecha = DateTime.Parse(row["Fecha"].ToString());
                data.Remitente = row["Remitente"].ToString();
                data.Asunto = row["Asunto"].ToString();
                data.Direccion = row["Direccion"].ToString();
                data.Telefono = row["Telefono"].ToString();
                
                data.Entidad = new CatalogoDTO();
                data.Entidad.Codigo = row["CodigoEntidad"].ToString();
                data.Entidad.Nombre = row["NombreEntidad"].ToString();

                data.Correo = row["Correo"].ToString();
                data.Folios = Int32.Parse(row["Folios"].ToString());
                data.Anexos = row["Anexos"].ToString();
                data.EsUrgente = Boolean.Parse(row["EsUrgente"].ToString());

                data.TipoDocumento = new CatalogoDTO();
                data.TipoDocumento.Codigo = row["CodigoTipoDocumento"].ToString();
                data.TipoDocumento.Nombre = row["NombreTipoDocumento"].ToString();

                data.SubTipoDocumento = new CatalogoDTO();
                data.SubTipoDocumento.Codigo = row["CodigoSubTipoDocumento"].ToString();
                data.SubTipoDocumento.Nombre = row["NombreSubTipoDocumento"].ToString();

                data.GrupoEtnico = new CatalogoDTO();
                data.GrupoEtnico.Codigo = row["CodigoGrupoEtnico"].ToString();
                data.GrupoEtnico.Nombre = row["NombreGrupoEtnico"].ToString();

                data.SituacionDiscapacidad = new CatalogoDTO();
                data.SituacionDiscapacidad.Codigo = row["CodigoSituacionDiscapacidad"].ToString();
                data.SituacionDiscapacidad.Nombre = row["NombreSituacionDiscapacidad"].ToString();

                data.SujetoEspecialProteccion = new CatalogoDTO();
                data.SujetoEspecialProteccion.Codigo = row["CodigoSujetoEspecialProteccion"].ToString();
                data.SujetoEspecialProteccion.Nombre = row["NombreSujetoEspecialProteccion"].ToString();

                data.EstadoCivil = new CatalogoDTO();
                data.EstadoCivil.Codigo = row["CodigoEstadoCivil"].ToString();
                data.EstadoCivil.Nombre = row["NombreEstadoCivil"].ToString();

                data.NivelEstudio = new CatalogoDTO();
                data.NivelEstudio.Codigo = row["CodigoNivelEstudio"].ToString();
                data.NivelEstudio.Nombre = row["NombreNivelEstudio"].ToString();

                data.Discapacidad = Boolean.Parse(row["Discapacidad"].ToString());
                data.GrupoEtnicoReconoce = Boolean.Parse(row["GrupoEtnicoReconoce"].ToString());

                data.Genero = new CatalogoDTO();
                data.Genero.Codigo = row["CodigoGenero"].ToString();
                data.Genero.Nombre = row["NombreGenero"].ToString();

                data.Sexo = new CatalogoDTO();
                data.Sexo.Codigo = row["CodigoSexo"].ToString();
                data.Sexo.Nombre = row["NombreSexo"].ToString();

                data.OrientacionSexual = new CatalogoDTO();
                data.OrientacionSexual.Codigo = row["CodigoOrientacionSexual"].ToString();
                data.OrientacionSexual.Nombre = row["NombreOrientacionSexual"].ToString();

                data.Procedencia = new CatalogoDTO();
                data.Procedencia.Codigo = row["CodigoProcedencia"].ToString();
                data.Procedencia.Nombre = row["NombreProcedencia"].ToString();

                data.RangoEdad = new CatalogoDTO();
                data.RangoEdad.Codigo = row["CodigoRangoEdad"].ToString();
                data.RangoEdad.Nombre = row["NombreRangoEdad"].ToString();

                data.TipoSolicitante = new CatalogoDTO();
                data.TipoSolicitante.Codigo = row["CodigoTipoSolicitante"].ToString();
                data.TipoSolicitante.Nombre = row["NombreTipoSolicitante"].ToString();

                data.EsAnonimo = Boolean.Parse(row["descripcion"].ToString());

                data.TipoDocId = new CatalogoDTO();
                data.TipoDocId.Codigo = row["CodigoTipoDocId"].ToString();
                data.TipoDocId.Nombre = row["NombreTipoDocId"].ToString();

                data.Pais = new CatalogoDTO();
                data.Pais.Codigo = row["CodigoPais"].ToString();
                data.Pais.Nombre = row["NombrePais"].ToString();

                data.Dpto = new CatalogoDTO();
                data.Dpto.Codigo = row["CodigoDpto"].ToString();
                data.Dpto.Nombre = row["NombreDpto"].ToString();

                data.Ciudad = new CatalogoDTO();
                data.Ciudad.Codigo = row["CodigoCiudad"].ToString();
                data.Ciudad.Nombre = row["NombreCiudad"].ToString();

                data.MedioRespuesta = new CatalogoDTO();
                data.MedioRespuesta.Codigo = row["CodigoMedioRespuesta"].ToString();
                data.MedioRespuesta.Nombre = row["NombreMedioRespuesta"].ToString();
 
                data.TipoPqrs = new CatalogoDTO();
                data.TipoPqrs.Codigo = row["CodigoTipoPqrs"].ToString();
                data.TipoPqrs.Nombre = row["NombreTipoPqrs"].ToString();

                data.Resumen = row["Resumen"].ToString();
                data.DescripcionHechos = row["DescripcionHechos"].ToString();
                data.DescripcionSolicitud = row["DescripcionSolicitud"].ToString();

                data.DptoHechos = new CatalogoDTO();
                data.DptoHechos.Codigo = row["CodigoDptoHechos"].ToString();
                data.DptoHechos.Nombre = row["NombreDptoHechos"].ToString();

                data.MunicipioHechos = new CatalogoDTO();
                data.MunicipioHechos.Codigo = row["CodigoMunicipioHechos"].ToString();
                data.MunicipioHechos.Nombre = row["NombreMunicipioHechos"].ToString();

                data.Formato = new CatalogoDTO();
                data.Formato.Codigo = row["CodigoFormato"].ToString();
                data.Formato.Nombre = row["NombreFormato"].ToString();
                data.Observaciones = row["Observaciones"].ToString();

                lista.Add(data);
            }
            return lista;
        }
        
    }
}
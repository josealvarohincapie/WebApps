using AccesoDatos.Data;
using Modelo.dto;
using System;
using System.Collections.Generic;
using System.Data;

namespace Logica
{
    public class RadicadoLogica
    {
        
        /// <summary>        
        /// Permite consultar los datos de la radicación apartir del código de la solicitud
        /// </summary>        
        /// <param name="codigoSolicitud">Identificador único de la solicitud de radicación</param>
        /// <returns>Los datos de la solicitud de radicación</returns>
        public List<RadicadoDTO> ConsultarDatosRadicadoPorCodigo(Int64 codigoSolicitud)
        {
            try
            {
                RadicadoData radicadoData = new RadicadoData();
                return radicadoData.ConsultarDatosRadicadoPorCodigo(codigoSolicitud);

            } catch (Exception ex)
            {
                throw new Exception("Logica - ConsultarDatosRadicadoPorCodigo: " + ex.Message);
            }
        }
    }
}

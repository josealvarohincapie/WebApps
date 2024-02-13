using AccesoDatos.Data;
using Modelo.dto;
using System.Collections.Generic;
using System.Data;

namespace Logica
{
    public class ParametroLogica
    {
        public List<ParametroDTO> ConsultarParametrosXCodTipo(string codTipoParametro)
        {
            ParametroData parametroData = new ParametroData();
            var dt = parametroData.consultarParametrosXCodTipo(codTipoParametro);

            var lista = new List<ParametroDTO>();

            foreach (DataRow row in dt.Rows)
            {
                var param = new ParametroDTO();
                param.Codigo = row["codigo"].ToString();
                param.Descripcion = row["descripcion"].ToString();
                lista.Add(param);
            }

            return lista;
        } 
    }
}

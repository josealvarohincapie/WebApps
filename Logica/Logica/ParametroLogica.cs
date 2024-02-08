using AccesoDatos.Data;
using Logica.dto;
using System;
using System.Collections.Generic;

namespace Logica
{
    public class ParametroLogica
    {
        public List<ParametroDTO> consultarParametrosXCodTipo(string codTipoParametro, System.Data.DataTable dataTable)
        {
            ParametroData parametroData = new ParametroData();
            var data = parametroData.consultarParametrosXCodTipo(codTipoParametro);

            var lista = new List<ParametroDTO>();

            /*
            foreach (var item in data)
            {
                
            }
            */
            return lista;
        }
        public static void main(String[] args)
        {
            Console.WriteLine("Hola mundo");
        }
    }
}

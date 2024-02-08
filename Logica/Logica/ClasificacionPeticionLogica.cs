using System;
using AccesoDatos.Data;

namespace Logica
{
    public class ClasificacionPeticionLogica
    {
        public String RadicarPeticion(string codTipoPeticion, string codAreaDerecho, string codDerecho, string descAsesoria, string observaciones, string loginname)
        {
            ClasificacionPeticionData clasificacionPeticionData = new ClasificacionPeticionData();
            clasificacionPeticionData.RadicarPeticion(codTipoPeticion, codAreaDerecho, codDerecho, descAsesoria, observaciones, loginname);
            return "OK";
        }
    }
}

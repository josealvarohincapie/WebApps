using System;
using AccesoDatos.Data;

namespace Logica
{
    public class ClasificacionPeticionLogica
    {
        public String Radicar()
        {
            ClasificacionPeticionData clasificacionPeticionData = new ClasificacionPeticionData();
            clasificacionPeticionData.Radicar("", "", "", 1, 1);
            return "";

        }
    }
}

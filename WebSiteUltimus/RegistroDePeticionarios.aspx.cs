using System;
using Logica;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class RegistroDePeticionarios : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        TxtTipoPeticion.Text = "Hola mundo";
    }

    protected void BtnGuardar_Click(object sender, EventArgs e)
    {
        ClasificacionPeticionLogica clasificacion = new ClasificacionPeticionLogica();
        //clasificacion.RadicarPeticion(TxtTipoPeticion.Text,txtDerechos.Text);
    }
}
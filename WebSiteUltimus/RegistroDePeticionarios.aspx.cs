using System;
using Logica;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections.Generic;
using System.IO;

public partial class RegistroDePeticionarios : System.Web.UI.Page
{
    

    protected void BtnGuardar_Click(object sender, EventArgs e)
    {
        ClasificacionPeticionLogica clasificacion = new ClasificacionPeticionLogica();
        //clasificacion.RadicarPeticion(TxtTipoPeticion.Text,txtDerechos.Text);
    }
    protected void BtnImprimir_Click(object sender, EventArgs e)
    {
        
    }
    protected void txtCanalAtencion_TextChanged(object sender, EventArgs e)
    {

    }
        protected void btnSubirDocumento_Click(object sender, EventArgs e)
    {
        if (fileUploadDocumento.HasFile)
        {
            try
            {
                // Especifica la ruta donde se guardarán los archivos subidos
                // Por ejemplo, en una carpeta "Uploads" dentro de la raíz de tu aplicación
                string rutaGuardar = Server.MapPath("~/Uploads/") + fileUploadDocumento.FileName;

                // Guarda el archivo en la ubicación especificada
                fileUploadDocumento.SaveAs(rutaGuardar);

                // Muestra un mensaje de éxito
                lblMensaje.Text = "Documento subido exitosamente.";
            }
            catch (Exception ex)
            {
                // Maneja la excepción
                lblMensaje.Text = "Error al subir el documento: " + ex.Message;
            }
        }
        else
        {
            lblMensaje.Text = "Por favor, selecciona un documento para subir.";
        }
    }


}

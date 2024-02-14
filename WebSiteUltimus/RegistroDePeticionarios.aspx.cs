using System;
using Logica;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections.Generic;
using System.IO;
using Modelo.dto;
using Microsoft.Ajax.Utilities;
using System.Globalization;

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



    protected void Page_Load(object sender, EventArgs e)
    {
        List<RadicadoDTO> radicados = new List<RadicadoDTO>();

        RadicadoLogica radicadoLogica = new RadicadoLogica();

        try
        {

            Int64 codigoSolicitud = Int64.Parse(txtCodigoSolicitud.Value.Trim());

            radicados = radicadoLogica.ConsultarDatosRadicadoPorCodigo(codigoSolicitud);

            if (radicados != null)
            {
                txtNumeroRadicado.Text = radicados[0].NumeroRadicado;
                //txtCanalAtencion = ;
                txtTipoSolicitante.Text = radicados[0].TipoSolicitante.Nombre;
                txtFecha.Text = radicados[0].Fecha.ToString("yyyy-MM-dd");
                chkEsAnonimo.Checked = radicados[0].EsAnonimo;
                txtTipoDocumento.Text = radicados[0].TipoDocId.Nombre;
                txtCedula.Text = radicados[0].Cedula;
                bool esMiembroGrupoEtnico = radicados[0].GrupoEtnicoReconoce;
                rblGrupoEtnico.SelectedValue = esMiembroGrupoEtnico ? "Si" : "No";
                txtSexoAsignado.Text = radicados[0].Sexo.Nombre;
                txtIdentidadGenero.Text = radicados[0].Genero.Nombre;//no trae datos, revisar
                txtOrientacionSexual.Text = radicados[0].OrientacionSexual.Nombre;
                //txtExpresionGenero.Text = radicados[0].;
                txtRangoEdad.Text = radicados[0].RangoEdad.Nombre;
            }
        } catch (Exception ex)
        {
            //txtNumeroRadicado.Text = "mateo dacartec";
            String error = ex.Message.Replace("'","");
            ScriptManager.RegisterStartupScript(Page, Page.GetType(), "err_msg", "alert('" + error + "');", true);
        }
    }
}

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RegistroDePeticionarios.aspx.cs" Inherits="RegistroDePeticionarios" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 

    <!--<link rel="stylesheet" href="~/css/FontAwesome.css" asp-append-version="true" />-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="~/css/Ultimus.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/css/toastr.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/css/font-awesome.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/Content/Site.css" asp-append-version="true" />
    <title>Formulario de Asesoría</title>

    <style>
        .help-text {
            background-color: #f9f9f9;
            border: 1px solid #c0c0c0;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 10px;
        }

        .form-row {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
        }

            .form-row label {
                width: 180px;
                margin-right: 10px;
            }

            .form-row input[type="text"],
            .form-row select,
            .form-row textarea {
                flex: 1;
                padding: 5px;
            }

            .form-row input[type="submit"] {
                width: auto;
                margin: 20px 0;
                cursor: pointer;
            }

        .form-row {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
        }

            .form-row label {
                width: 180px;
                margin-right: 10px;
            }

            .form-row input[type="text"],
            .form-row select,
            .form-row textarea {
                flex: 1;
                padding: 5px;
            }

            .form-row input[type="submit"] {
                width: auto;
                margin: 20px 0;
                cursor: pointer;
            }
    </style>
</head>
<body>
    <form method="post" runat="server">
        <div class="button-container">
            <asp:Button ID="BtnImprimir" runat="server" CssClass="btn amarillo" Text="Imprimir Pantalla"></asp:Button>

            <asp:Button ID="BtnGuardar" runat="server" CssClass="btn verde" Text="Guardar/Radicar" PostBackUrl="~/ClasificacionPeticion/RadicarPeticion">            
            </asp:Button>

            <asp:Button ID="BtnVerTramite" runat="server" CssClass="btn amarillo" Text="Ver trámite">
            </asp:Button>

            <asp:Button ID="BtnVerEtiqueta" runat="server" CssClass="btn gris" Text="Ver etiqueta">
            </asp:Button>

            <asp:Button ID="BtnEnviar" runat="server" CssClass="btn rojo" Text="Enviar">
            </asp:Button>

        </div>
        <div class="help-text">
            ASESORÍA: La asesoría consiste en orientar al peticionario en el ejercicio y defensa de los derechos humanos, ante las autoridades competentes o ante las entidades de carácter privado.
        </div>
        <div class="form-row">
        <asp:Label ID="LabelTipoPeticion" runat="server" Text="Tipo de petición:"></asp:Label>
        <asp:TextBox ID="TxtTipoPeticion" runat="server" Text='<%# Bind("DescTipoPeticion") %>'></asp:TextBox>
        <span class="input-group-btn">
        <asp:Button ID="Button1" runat="server" CssClass="btn btn-default btn-medium" Text="">
        </asp:Button>
        <asp:Button ID="Button2" runat="server" CssClass="btn btn-success btn-medium btn-margin-catalogo btn-file" Text="&nbsp;" >
        </asp:Button>
        </span>
        </div>
        <style>
            .form-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .form-row label {
                    margin-right: 10px;
            }

            .form-row input[type="text"] {
                    flex-grow: 1;
                    margin-right: 10px;
            }

            .btn-medium {
                padding: 0.5rem 0.75rem;
            }

            .btn-margin-catalogo {
                margin-right: 5px;
            }
             .form-row {
                 display: flex;
                 align-items: center;
                 justify-content: space-between;
             }

             .form-row label {
                     margin-right: 10px;
                 }

             .form-row input[type="text"], .form-row select {
                     flex-grow: 1;
                     margin-right: 10px;
                 }

             .input-group-btn {
                 display: flex;
             }

             .btn-medium {
                 padding: 0.5rem 0.75rem;
             }

             .btn-margin-catalogo {
                 margin-right: 5px;
             }
    
             .form-row {
                 display: flex;
                 align-items: center;
                 justify-content: space-between;
             }

             .form-row label {
                     margin-right: 10px;
                 }

             .form-row input[type="text"], .form-row textarea {
                     flex-grow: 1;
                     margin-right: 10px;
                 }

             .input-group-btn {
                 display: flex;
             }

             .btn-medium {
                 padding: 0.5rem 0.75rem;
             }

             .btn-margin-catalogo {
                 margin-right: 5px;
             }

 
        </style>
       <div class="form-row">
            <asp:Label ID="LabelAreaDerecho" runat="server"  Text="Área de derecho:"></asp:Label>
            <asp:DropDownList ID="DropDownListAreaDerecho" runat="server"  DataTextField="TextFieldName" DataValueField="ValueFieldName" AppendDataBoundItems="true">
                <asp:ListItem Text="-- Seleccione un valor --" Value=""></asp:ListItem>
            </asp:DropDownList>
       </div>
       <div class="form-row">
            <asp:Label ID="LabelDerechos" runat="server"  Text="Derechos:"></asp:Label>
            <asp:TextBox ID="txtDerechos" runat="server" Text="mateo"></asp:TextBox>
            <span class="input-group-btn">
            <asp:Button ID="btnClose" runat="server" CssClass="btn btn-default btn-medium" Text="">
            </asp:Button>
            <asp:Button ID="btnSearch" runat="server" CssClass="btn btn-success btn-medium btn-margin-catalogo btn-file" Text="&nbsp;" >
            </asp:Button>
            </span>
        </div>
       

        <div class="form-row">
            <asp:Label ID="LabelDescripcionAsesoria" runat="server" Text="Descripción de asesoría:"></asp:Label>
            <asp:TextBox ID="TxtDescripcionAsesoria" runat="server" TextMode="MultiLine"></asp:TextBox>
        </div>


        <div class="form-row">
            <asp:Label ID="LabelObservaciones" runat="server"  Text="Observaciones:"></asp:Label>
            <asp:TextBox ID="TxtObservaciones" runat="server" TextMode="MultiLine" Text='<%# Bind("Observaciones") %>'></asp:TextBox>
        </div>

        <div class="form-row">
            <asp:Label runat="server" Text="¿La asesoría debe generar respuesta por escrito?"></asp:Label>
            <div class="radio-group">
                <div>
                    <asp:RadioButton ID="respuestaEscritaSi" runat="server" GroupName="respuestaEscrita" Text="Sí"  />
                    <asp:Label runat="server" AssociatedControlID="respuestaEscritaSi">Sí</asp:Label>
                </div>
                <div>
                    <asp:RadioButton ID="respuestaEscritaNo" runat="server" GroupName="respuestaEscrita" Text="No"  />
                    <asp:Label runat="server" AssociatedControlID="respuestaEscritaNo">No</asp:Label>
                </div>
            </div>
        </div>
        <div class="form-row" id="divConclusionAsesoria">
            <asp:Label ID="LabelConclusionAsesoria" runat="server" CssClass="control-label col-sm-4" Text="Conclusión de asesoría:"></asp:Label>
            <asp:TextBox ID="txtConclusionAsesoria" runat="server" TextMode="MultiLine" Rows="4" Columns="50" Text='<%# Bind("ConclusionAsesoria") %>'></asp:TextBox>
            &nbsp;&nbsp;&nbsp;&nbsp;

            <span class="input-group-btn">
                <asp:Button ID="btnLimpiarConclusionAsesoria" runat="server" CssClass="btn btn-default btn-medium" OnClientClick="LimpiarConclusionesAsesorias(); return false;" Text="">
                </asp:Button>
                <asp:Button ID="btnBuscarConclusionAsesoria" runat="server" CssClass="btn btn-success btn-medium btn-margin-catalogo btn-file"  Text="&nbsp;">
                </asp:Button>
            </span>
          </div>
    
     </form>
</body>
</html>


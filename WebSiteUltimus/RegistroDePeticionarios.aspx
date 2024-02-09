<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RegistroDePeticionarios.aspx.cs" Inherits="RegistroDePeticionarios" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />


    <!--<link rel="stylesheet" href="~/css/FontAwesome.css" asp-append-version="true" />-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="~/Content/Site.css" asp-append-version="true" />
    <title>Formulario de Asesoría</title>

    <style>
        @media (min-width: 768px) {
            html {
                font-size: 16px;
            }
        }

        .btn:focus, .btn:active:focus, .btn-link.nav-link:focus, .form-control:focus, .form-check-input:focus {
            box-shadow: 0 0 0 0.1rem white, 0 0 0 0.25rem #258cfb;
        }

        html {
            position: relative;
            min-height: 100%;
        }

        body {
            margin-bottom: 60px;
        }

        .button-container {
            display: flex;
            justify-content: start;
            margin-bottom: 20px;
        }

        .btn {
            background-color: #f0f0f0;
            color: black;
            padding: 10px 20px;
            margin-right: 10px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
        }

            .btn i {
                margin-right: 5px;
            }

        .amarillo {
            background-color: orange;
        }

        .verde {
            background-color: green;
        }

        .gris {
            background-color: gray;
        }

        .rojo {
            background-color: red;
        }


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
            padding: 0.5rem 0.17rem;
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


        .auto-style1 {
            width: 189px;
        }


        .auto-style2 {
            width: 421px;
        }
    </style>
</head>
<body>
    <form method="post" runat="server">
        <div class="button-container">
            <asp:Button ID="BtnImprimir" runat="server" CssClass="btn amarillo" Text="Imprimir Pantalla"></asp:Button>

            <asp:Button ID="BtnGuardar" runat="server" CssClass="btn verde" Text="Guardar/Radicar" PostBackUrl="~/ClasificacionPeticion/RadicarPeticion" OnClick="BtnGuardar_Click"></asp:Button>

            <asp:Button ID="BtnVerTramite" runat="server" CssClass="btn amarillo" Text="Ver trámite"></asp:Button>

            <asp:Button ID="BtnVerEtiqueta" runat="server" CssClass="btn gris" Text="Ver etiqueta"></asp:Button>

            <asp:Button ID="BtnEnviar" runat="server" CssClass="btn rojo" Text="Enviar"></asp:Button>

        </div>
        <div class="help-text">
            ASESORÍA: La asesoría consiste en orientar al peticionario en el ejercicio y defensa de los derechos humanos, ante las autoridades competentes o ante las entidades de carácter privado.
        </div>

        <table style="width: 100%;">
            <tr>
                <td class="auto-style1">
                    <asp:Label ID="LabelTipoPeticion" runat="server" Text="Tipo de petición:"></asp:Label></td>
                <td class="auto-style2">
                    <asp:TextBox ID="TxtTipoPeticion" runat="server" Width="388px"></asp:TextBox></td>
                <td>
                    <span class="input-group-btn">
                        <button type="button" id="tnLimpiarConclusionAsesoria" class="btn btn-default btn-medium">
                            <i class="fa fa-close"></i>
                        </button>
                        <button type="button" id="tnBuscarConclusionAsesoria" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                            <i class="fa fa-search"></i>&nbsp;
                        </button>
                    </span>
                </td>
            </tr>
            <tr>
                <td class="auto-style1">
                    <div class="form-row">
                        <asp:Label ID="LabelAreaDerecho" runat="server" Text="Área de derecho:"></asp:Label>

                    </div>
                </td>
                <td class="auto-style2">
                    <asp:DropDownList ID="DropDownListAreaDerecho" runat="server" DataTextField="TextFieldName" DataValueField="ValueFieldName" AppendDataBoundItems="true">
                        <asp:ListItem Text="-- Seleccione un valor --" Value=""></asp:ListItem>
                    </asp:DropDownList></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style1">
                    <asp:Label ID="LabelDerechos" runat="server" Text="Derechos:"></asp:Label>
                </td>
                <td class="auto-style2">
                    <asp:TextBox ID="txtDerechos" runat="server" Text="mateo"></asp:TextBox></td>
                <td><span class="input-group-btn">
                    <button type="button" id="btnLimpiarDerechos" onclick="LimpiarConclusionesAsesorias()" class="btn btn-default btn-medium">
                        <i class="fa fa-close"></i>
                    </button>
                    <button type="button" id="btnBuscarDerechos" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                        <i class="fa fa-search"></i>&nbsp;
                    </button>
                </span></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="LabelDescripcionAsesoria" runat="server" Text="Descripción de asesoría:"></asp:Label>
                </td>
                <td>
                    <asp:TextBox ID="TxtDescripcionAsesoria" runat="server" TextMode="MultiLine"></asp:TextBox></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <div class="form-row">
                        <asp:Label ID="LabelObservaciones" runat="server" Text="Observaciones:"></asp:Label>

                    </div>
                </td>
                <td>
                    <asp:TextBox ID="TxtObservaciones" runat="server" TextMode="MultiLine" Text='<%# Bind("Observaciones") %>'></asp:TextBox></td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <asp:Label runat="server" Text="¿La asesoría debe generar respuesta por escrito?"></asp:Label>

                </td>
                <td>
                    <div class="radio-group">
                        <div>
                            <asp:RadioButton ID="respuestaEscritaSi" runat="server" GroupName="respuestaEscrita" Text="Sí" />
                            <asp:RadioButton ID="respuestaEscritaNo" runat="server" GroupName="respuestaEscrita" Text="No" />
                        </div>
                    </div>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>
                    <asp:Label ID="LabelConclusionAsesoria" runat="server" CssClass="control-label col-sm-4" Text="Conclusión de asesoría:"></asp:Label>

                </td>
                <td>
                    <asp:TextBox ID="txtConclusionAsesoria" runat="server" TextMode="MultiLine" Rows="4" Columns="50" Text='<%# Bind("ConclusionAsesoria") %>'></asp:TextBox></td>
                <td>
                    <span class="input-group-btn">
                        <button type="button" id="btnLimpiarConclusionAsesoria" onclick="LimpiarConclusionesAsesorias()" class="btn btn-default btn-medium">
                            <i class="fa fa-close"></i>
                        </button>
                        <button type="button" id="btnBuscarConclusionAsesoria" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                            <i class="fa fa-search"></i>&nbsp;
                        </button>
                    </span></td>
            </tr>
        </table>




        <div class="form-row">
        </div>

    </form>
</body>
</html>


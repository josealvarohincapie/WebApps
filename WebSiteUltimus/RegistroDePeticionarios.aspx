<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RegistroDePeticionarios.aspx.cs" Inherits="RegistroDePeticionarios" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />


    <!--<link rel="stylesheet" href="~/css/FontAwesome.css" asp-append-version="true" />-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link rel="stylesheet" href="~/Content/Site.css" asp-append-version="true" />
    <link href="Content/jquery-ui.css" rel="stylesheet" />
    
    <script src="/Scripts/jquery-3.6.0.js"></script>
    <script src="/Scripts/jquery-1.13.2.ui.js"></script>
    <script type="text/javascript">
        function imprimirPagina() {
            window.print();
            return false; 
        }
    </script>
    
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
            background-color: #28a745 !important; 
            border-color: #28a745 !important; 
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
        
        .tab {
            display: none;
        }
        .tab.active {
            display: block;
        }
        .tab-links a {
            padding: 10px;
            border: 1px solid #ccc;
            display: inline-block;
            background: #f0f0f0;
            color: #000;
            text-decoration: none;
        }
        .tab-links a.active {
            background: #ddd;
        }
        
        .contenedor {
        display: flex;
        }
        .columna {
        flex: 1; /* Esto hace que ambas columnas tengan el mismo ancho */
        margin: 10px; /* Espaciado opcional entre las columnas */
        }
     

    </style>
    <script type="text/javascript">
        function limpiarCampo(textBoxClientId) {
            document.getElementById(textBoxClientId).value = '';
        }
    </script>
    <script>

        $(function () {
            $("#tabs").tabs(
                {
                    active: 2
                }
            );           
        });

    </script>
</head>
<body>
    <form method="post" runat="server">
         <div class="button-container">
            <asp:LinkButton ID="BtnImprimir" runat="server" CssClass="btn amarillo" OnClientClick="return imprimirPagina();"><i class="fa fa-print"></i> Imprimir Pantalla</asp:LinkButton>

            <asp:LinkButton ID="BtnGuardar" runat="server" CssClass="btn verde" PostBackUrl="~/ClasificacionPeticion/RadicarPeticion" OnClick="BtnGuardar_Click"><i class="fa fa-save"></i> Guardar/Radicar</asp:LinkButton>

            <asp:LinkButton ID="BtnVerTramite" runat="server" CssClass="btn amarillo"><i class="fa fa-eye"></i> Ver trámite</asp:LinkButton>

            <asp:LinkButton ID="BtnVerEtiqueta" runat="server" CssClass="btn gris"><i class="fas fa-sync-alt"></i> Ver etiqueta</asp:LinkButton>

            <asp:LinkButton ID="BtnEnviar" runat="server" CssClass="btn rojo"><i class="far fa-circle"></i> Enviar</asp:LinkButton>
        </div>

        <div id="tabs">
            <ul>
                <li><a href="#tabs-1">Información del radicado</a></li>
                <li><a href="#tabs-2">Anexos del Radicado recibido</a></li>
                <li><a href="#tabs-3">Clasificación de la petición</a></li>
                <li><a href="#tabs-4">Decisión</a></li>
            </ul>
            
            <div id="tabs-1">
                <div class="contenedor">
                    <div class="columna">
                        <h2>Datos básicos del peticionario</h2>
                        <!-- Contenido de la primera columna -->
                         <table style="width: 100%;">
                             <tr>  
                                <td class="auto-style1">
                                    <asp:Label ID="lblNumeroRadicado" runat="server" Text="N° de radicado:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtNumeroRadicado" runat="server" Text="20237466365254256"></asp:TextBox></td>
                              </tr>
                              <tr>
                                <td class="auto-style1">
                                    <asp:Label ID="LblCanalAtencion" runat="server" Text="Canal de atención:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtCanalAtencion" runat="server" Text="" OnTextChanged="txtCanalAtencion_TextChanged"></asp:TextBox></td>
                                <td><span class="input-group-btn">
                                    <button type="button" id="btnLimpiarCanalAtencion"  onclick="limpiarCampo('<%= txtCanalAtencion.ClientID %>')" class="btn btn-default btn-medium">
                                        <i class="fa fa-close"></i>
                                    </button>
                                    <button type="button" id="btnCanalAtencion" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                        <i class="fa fa-search"></i>&nbsp;
                                    </button>
                                </span></td>
                            </tr>
                             <tr>
                             <td class="auto-style1">
                                    <asp:Label ID="lblFecha" runat="server" Text="Fecha:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtFecha" runat="server" TextMode="Date"></asp:TextBox>
                                </td>
                            </tr>
                              <tr>
                                <td class="auto-style1">
                                    <asp:Label ID="lblTipoSolicitante" runat="server" Text="Tipo de solicitante:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtTipoSolicitante" runat="server" Text="Persona natural" ></asp:TextBox></td>
                                <td><span class="input-group-btn">
                                    <button type="button" id="btnLimpiarTipoSolicitante" onclick="limpiarCampo('<%= txtTipoSolicitante.ClientID %>')" class="btn btn-default btn-medium">
                                        <i class="fa fa-close"></i>
                                    </button>
                                    <button type="button" id="btnTipoSolicitante" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                        <i class="fa fa-search"></i>&nbsp;
                                    </button>
                                </span></td>
                            </tr>
                             <tr>
                             <td>
                             <asp:Label ID="lblEsAnonimo" runat="server" Text="Es anónimo :"></asp:Label>
                             <asp:CheckBox ID="chkEsAnonimo" runat="server" />
                             </td>
                             </tr>
                               <tr>
                                    <td class="auto-style1">
                                        <asp:Label ID="LblTipoDocumento" runat="server" Text="Tipo documento de identificación:"></asp:Label>
                                    </td>
                                    <td class="auto-style2">
                                        <asp:TextBox ID="txtTipoDocumento" runat="server" Text="C.C" ></asp:TextBox></td>
                                    <td><span class="input-group-btn">
                                        <button type="button" id="btnLimpiarTipoDocumento" onclick="limpiarCampo('<%= txtTipoDocumento.ClientID %>')" class="btn btn-default btn-medium">
                                            <i class="fa fa-close"></i>
                                        </button>
                                        <button type="button" id="btnTipoDocumento" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                            <i class="fa fa-search"></i>&nbsp;
                                        </button>
                                    </span></td>
                                </tr>
                                <tr>
                                    <td>
                                    <asp:Label ID="lblCedula" runat="server" Text="Número documento de identificación:"></asp:Label>
                                    </td>
                                    <td>
                                    <asp:TextBox ID="txtCedula" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                 <tr>  
                                    <td class="auto-style1">
                                        <asp:Label ID="lblRemitente" runat="server" Text="Remitente:"></asp:Label>
                                    </td>
                                    <td class="auto-style2">
                                        <asp:TextBox ID="txtRemitente" runat="server" Text="Jose Alvaro Hincapié"></asp:TextBox></td>
                                 </tr>
                                 
                        </table>
                    </div>
                    <div class="columna">
                        <h2>Datos enfoques diferenciales y de género</h2>
                        <!-- Contenido de la segunda columna -->
                        <table style="width: 100%;">
                            <tr>  
                                <td>
                                <asp:Label ID="lblGrupoEtnico" runat="server" Text="¿Se reconoce como miembro de algún grupo étnico?"></asp:Label></td>
                                <td>
                                <asp:RadioButtonList ID="rblGrupoEtnico" runat="server">
                                    <asp:ListItem Text="Sí" Value="Si"></asp:ListItem>
                                    <asp:ListItem Text="No" Value="No"></asp:ListItem>
                                </asp:RadioButtonList>
                                </td>
                            </tr> 
                            <tr>
                                <td class="auto-style1">
                                    <asp:Label ID="lblSexoAsignado" runat="server" Text="Sexo asignado:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtSexoAsignado" runat="server" Text="" ></asp:TextBox></td>
                                <td><span class="input-group-btn">
                                    <button type="button" id="btnLimpiarSexoAsignado" onclick="limpiarCampo('<%= txtSexoAsignado.ClientID %>')" class="btn btn-default btn-medium">
                                        <i class="fa fa-close"></i>
                                    </button>
                                    <button type="button" id="btnSexoAsignado" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                        <i class="fa fa-search"></i>&nbsp;
                                    </button>
                                </span></td>
                            </tr>
                            <tr>
                                <td class="auto-style1">
                                    <asp:Label ID="lblIdentidadGenero" runat="server" Text="Identidad de género:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtIdentidadGenero" runat="server" Text="" ></asp:TextBox></td>
                                <td><span class="input-group-btn">
                                    <button type="button" id="btnLimpiarIdentidadGenero" onclick="limpiarCampo('<%= txtIdentidadGenero.ClientID %>')" class="btn btn-default btn-medium">
                                        <i class="fa fa-close"></i>
                                    </button>
                                    <button type="button" id="btnIdentidadGenero" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                        <i class="fa fa-search"></i>&nbsp;
                                    </button>
                                </span></td>
                            </tr>
                            <tr>
                                <td class="auto-style1">
                                    <asp:Label ID="lblOrientacionSexual" runat="server" Text="Orientación sexual:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtOrientacionSexual" runat="server" Text="" ></asp:TextBox></td>
                                <td><span class="input-group-btn">
                                    <button type="button" id="btnLimpiarOrientacionSexual" onclick="limpiarCampo('<%= txtOrientacionSexual.ClientID %>')"" class="btn btn-default btn-medium">
                                        <i class="fa fa-close"></i>
                                    </button>
                                    <button type="button" id="btnOrientacionSexual" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                        <i class="fa fa-search"></i>&nbsp;
                                    </button>
                                </span></td>
                            </tr>
                            <tr>
                                <td class="auto-style1">
                                    <asp:Label ID="lblExpresionGenero" runat="server" Text="Expresión de género :"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtExpresionGenero" runat="server" Text="" ></asp:TextBox></td>
                                <td><span class="input-group-btn">
                                    <button type="button" id="btnLimpiarExpresionGenero" onclick="limpiarCampo('<%= txtExpresionGenero.ClientID %>')"" class="btn btn-default btn-medium">
                                        <i class="fa fa-close"></i>
                                    </button>
                                    <button type="button" id="btnExpresionGenero" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                        <i class="fa fa-search"></i>&nbsp;
                                    </button>
                                </span></td>
                            </tr>
                            <tr>
                                <td class="auto-style1">
                                    <asp:Label ID="lblRangoEdad" runat="server" Text="Rango de edad:"></asp:Label>
                                </td>
                                <td class="auto-style2">
                                    <asp:TextBox ID="txtRangoEdad" runat="server" Text="" ></asp:TextBox></td>
                                <td><span class="input-group-btn">
                                    <button type="button" id="btnLimpiarRangoEdad" onclick="limpiarCampo('<%= txtRangoEdad.ClientID %>')" class="btn btn-default btn-medium">
                                        <i class="fa fa-close"></i>
                                    </button>
                                    <button type="button" id="btnRangoEdad" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                        <i class="fa fa-search"></i>&nbsp;
                                    </button>
                                </span></td>
                            </tr>
                            </table> 

                    </div>
                </div>
 
            </div>
            <div id="tabs-2">
                <h2>Anexos</h2>
               <asp:Label ID="lblMensaje" runat="server" Text="Subir anexos"></asp:Label>
              <asp:FileUpload ID="fileUploadDocumento" runat="server" />
              <asp:Button ID="btnSubirDocumento" runat="server" Text="Subir Documento" OnClick="btnSubirDocumento_Click" />


            </div>
            <div id="tabs-3">
                <div class="help-text">
                    ASESORÍA: La asesoría consiste en orientar al peticionario en el ejercicio y defensa de los derechos humanos, ante las autoridades competentes o ante las entidades de carácter privado.
                </div>

                <table style="width: 100%;">
                    <tr>
                        <td class="auto-style1">
                            <asp:Label ID="LabelTipoPeticion" runat="server" Text="Tipo de petición:"></asp:Label></td>
                        <td class="auto-style2 btn ">
                            <asp:TextBox ID="TxtTipoPeticion" runat="server"></asp:TextBox>
                        
                            <div class="input-group-btn">
                                <button type="button" id="tnLimpiarConclusionAsesoria" onclick="limpiarCampo('<%= TxtTipoPeticion.ClientID %>')"class="btn btn-default btn-medium">
                                    <i class="fa fa-close"></i>
                                </button>
                                <button type="button" id="tnBuscarConclusionAsesoria" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                    <i class="fa fa-search"></i>&nbsp;
                                </button>
                            </div>
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
                            <button type="button" id="btnLimpiarDerechos" onclick="limpiarCampo('<%= txtDerechos.ClientID %>')" class="btn btn-default btn-medium">
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
                                <button type="button" id="btnLimpiarConclusionAsesoria" onclick="limpiarCampo('<%= txtConclusionAsesoria.ClientID %>')"" class="btn btn-default btn-medium">
                                    <i class="fa fa-close"></i>
                                </button>
                                <button type="button" id="btnBuscarConclusionAsesoria" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                    <i class="fa fa-search"></i>&nbsp;
                                </button>
                            </span></td>
                    </tr>
                </table>
            </div>
        <div id="tabs-4">
            <h2>Decisión</h2>
            <table>
                <tr>
                    <td class="auto-style1">
                        <asp:Label ID="lblDecision" runat="server" Text="Decisión:"></asp:Label>
                    </td>
                    <td class="auto-style2">
                        <asp:TextBox ID="txtDecision" runat="server" Text=""></asp:TextBox>
                    </td>
                    <td>
                        <span class="input-group-btn">
                            <button type="button" id="btnLimpiarDecision" onclick="limpiarCampo('<%= txtDecision.ClientID %>')" class="btn btn-default btn-medium">
                                <i class="fa fa-close"></i>
                            </button>
                            <button type="button" id="btnDecision" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                <i class="fa fa-search"></i>&nbsp;
                            </button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style1">
                        <asp:Label ID="lblComentarios" runat="server" Text="Comentarios:"></asp:Label>
                    </td>
                    <td class="auto-style2" colspan="2"> <!-- Ajuste para que abarque las dos columnas restantes -->
                        <asp:TextBox ID="txtComentarios" runat="server" TextMode="MultiLine" Rows="4" Columns="50"></asp:TextBox>
                    </td>
                </tr>
            </table>
        </div>
</div>
     </form>
</body>
</html>


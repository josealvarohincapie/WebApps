<%@ Page Language="C#" AutoEventWireup="true" CodeFile="RegistroDePeticionarios.aspx.cs" Inherits="RegistroDePeticionarios" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />


    <!--<link rel="stylesheet" href="~/css/FontAwesome.css" asp-append-version="true" />-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <link href="Content/toastr.css" rel="stylesheet" />
    <link href="Content/font-awesome.css" rel="stylesheet" />
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <link href="Content/jquery-ui.css" rel="stylesheet" />
    <link href="Content/dashboard.css" rel="stylesheet" />

    <script src="Scripts/bootstrap.min.js"></script>
    <script type="text/javascript">
        function imprimirPagina() {
            window.print();
            return false;
        }
    </script>
    
    <title>Formulario de Asesoría</title>
   
    <script type="text/javascript">
        function limpiarCampo(textBoxClientId) {
            document.getElementById(textBoxClientId).value = '';
        }
    </script>
   
    <style>
        body {
            background-color: #ffffff;
            color: #000000;
        }

        .infoUltimus {
            color: #000000;
        }

        .MenuBar {
            background-color: #6699ff;
        }

        .HeaderToggle {
            background-color: #6699ff;
        }

        .BaseHeader {
            background-color: #ffffff !important;
        }


        .myNav .nav-pills > li.active > a {
            background-color: #04A29C !important;
            color: white !important;
        }

        .myNav .nav-tabs > li.active > a {
            background-color: #04A29C !important;
            color: white !important;
        }

        .myNav .nav a {
            color: #808080;
            background-color: #d6d6d6;
            border-color: #808080;
        }

            .myNav .nav a:hover {
                background-color: #78c9c6 !important;
                color: #000000 !important;
                opacity: 0.5;
            }

        .myNav .nav-active {
            background-color: #04A29C !important;
            color: white !important;
        }

        #frmRadicado .tab-pane {
            display: none;
        }

        #frmRadicado .active {
            display: block;
        }

        #frmRadicadoDocumento .tab-pane {
            display: none;
        }

        #frmRadicadoDocumento .active {
            display: block;
        }
    </style>
</head>
<body>
    <div id="frmHeader" class="scroll-header">
        <div class="row SubMenuBar">
            <div class=" col-xs-12 col-md-12 col-lg-12">
                <div class="btn-group">
                    <button type="button" class="btn btn-default btn-sm" id="btnHeaderToggle">
                        <strong>&nbsp;&nbsp;<i class="fa fa-chevron-circle-up"></i></strong>
                    </button>

                    <button type="button" class="btn btn-warning btn-sm" id="btnBotones_ImprimirPantalla">
                        <strong>&nbsp;<i class="fa fa-print"></i><span class="hidden-sm hidden-xs">&nbsp;Imprimir Pantalla</span></strong>
                    </button>
                    <button type="button" class="btn btn-success btn-sm" id="btnBotones_GuardarRadicado">
                        <strong>&nbsp;<i class="fa fa-floppy-o"></i><span class="hidden-sm hidden-xs">&nbsp;Radicar / Guardar</span></strong>
                    </button>
                    <button type="button" class="btn btn-default btn-sm" id="btnBotones_VerDocumento">
                        <strong>&nbsp;<i class="fa fa-eye"></i><span class="hidden-sm hidden-xs">&nbsp;Ver Documento</span></strong>
                    </button>
                    <button type="button" class="btn btn-default btn-sm" id="btnBotones_ImprimirDocumento">
                        <strong>&nbsp;<i class="fa fa-print"></i><span class="hidden-sm hidden-xs">&nbsp;Imprimir Documento</span></strong>
                    </button>
                    <button type="button" class="btn btn-success btn-sm" id="btnBotones_Archivar">
                        <strong>&nbsp;<i class="fa fa-circle-o"></i><span class="hidden-sm hidden-xs">&nbsp;Archivar</span></strong>
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" id="btnBotones_Completar">
                        <strong>&nbsp;<i class="fa fa-circle-o"></i><span class="hidden-sm hidden-xs">&nbsp;Enviar</span></strong>
                    </button>

                </div>
            </div>
        </div>
    </div>
    <form id="frmRespuesta" runat="server">
     <div id="frmBody" class="row">
        <div class="col-xs-12 col-md-12 col-lg-12  ">
            <div class="starter-template " id="divStarterTemplate2">
                <div id="body" class="l-main">
                    <div id="inner_body" class="l-wrapper">

                        <ul class="nav nav-pills nav-justified">
                            <li class="active"><a data-toggle="tab" href="#menu0">Información del radicado</a></li>
                            <li id="liRecibido"><a data-toggle="tab" href="#menu1">Anexos del Radicado recibido</a></li>
                            <li><a data-toggle="tab" href="#menu2">Clasificación de la petición</a></li>
                            <li><a data-toggle="tab" href="#menu3">Decisión</a></li>
                        </ul>
                        <div class="tab-content">
                            <div id="menu0" class="tab-pane fade in active">                            
                                <h3 class="TituloAcordeon"><i class="fa fa-chevron-circle-down"></i>&nbsp;Radicado Enviado</h3>
                                <div class="row">
                                    <div class="col-md-6">                                                                                     
                                        <h2>Datos básicos del peticionario</h2>
                                        <div class="form-group " id="divNumeroRadicado">
            
                                        <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label ControlsForms #custom_class" id="lblRespuesta_NumeroRadicado" name="lblRespuesta_NumeroRadicado" default_label="No. Radicado">No. Radicado</label>
    
                                            <div class="input-group col-lg-8 col-md-8 col-sm-8 col-xs-8 ">
                                                <asp:TextBox ID="txtNumeroRadicado" runat="server" Text="" CssClass="form-control imput-xs TextBoxFramework" ReadOnly="true"  ></asp:TextBox>
                                            </div>
                                        </div>
                                        <div class="form-group" id="divCanalAtencion">
                                            <label class="col-lg-4 col-md-4 col-sm-4 col-xs-4 control-label ControlsForms #custom_class" id="lblCanalAtencion" name="lblCanalAtencion" default_label="Canal de atención:">Canal de atención:</label>
                                            <div class="input-group input-group-sm">
	                                            <input type="hidden" id="hiddenCanalAtencion" value="" />
                                                <asp:TextBox ID="txtCanalAtencion" runat="server" Text="" OnTextChanged="txtCanalAtencion_TextChanged" CssClass="form-control TextBoxCatalogo inputSuccess"></asp:TextBox>
                                            <span class="input-group-btn">
                                                <button type="button" id="btn_LimpiarCanalAtencion"  onclick="limpiarCampo('<%= txtCanalAtencion.ClientID %>')" class="btn btn-default btn-medium">
                                                    <i class="fa fa-close"></i>
                                                </button>
                                                <button type="button" id="btn_CanalAtencion" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                                                    <i class="fa fa-search"></i>&nbsp;
                                                </button>
                                            </span>
                                            </div>
                                        </div>                                        
                                                 
                                                  <!-- Contenido de la primera columna -->
                                                  <table style="width: 100%;">                                                      
                                                       
                                                      <tr>
                                                      <td>
                                                             <asp:Label ID="lblFecha" runat="server" Text="Fecha:"></asp:Label>
                                                         </td>
                                                         <td>
                                                             <asp:TextBox ID="txtFecha" runat="server" TextMode="Date"></asp:TextBox>
                                                         </td>
                                                     </tr>
                                                       <tr>
                                                         <td>
                                                             <asp:Label ID="lblTipoSolicitante" runat="server" Text="Tipo de solicitante:"></asp:Label>
                                                         </td>
                                                         <td>
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
                                                      </td>
                                                      <td>
                                                      <asp:CheckBox ID="chkEsAnonimo" runat="server" />
                                                      </td>
                                                      </tr>
                                                        <tr>
                                                             <td>
                                                                 <asp:Label ID="LblTipoDocumento" runat="server" Text="Tipo documento de identificación:"></asp:Label>
                                                             </td>
                                                             <td>
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
                                                             <td>
                                                                 <asp:Label ID="lblRemitente" runat="server" Text="Remitente:"></asp:Label>
                                                             </td>
                                                             <td>
                                                                 <asp:TextBox ID="txtRemitente" runat="server" Text="Jose Alvaro Hincapié"></asp:TextBox></td>
                                                          </tr>
                  
                                                 </table>                                             
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
                                                         <td>
                                                             <asp:Label ID="lblSexoAsignado" runat="server" Text="Sexo asignado:"></asp:Label>
                                                         </td>
                                                         <td>
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
                                                         <td>
                                                             <asp:Label ID="lblIdentidadGenero" runat="server" Text="Identidad de género:"></asp:Label>
                                                         </td>
                                                         <td>
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
                                                         <td>
                                                             <asp:Label ID="lblOrientacionSexual" runat="server" Text="Orientación sexual:"></asp:Label>
                                                         </td>
                                                         <td>
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
                                                         <td>
                                                             <asp:Label ID="lblExpresionGenero" runat="server" Text="Expresión de género :"></asp:Label>
                                                         </td>
                                                         <td>
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
                                                         <td>
                                                             <asp:Label ID="lblRangoEdad" runat="server" Text="Rango de edad:"></asp:Label>
                                                         </td>
                                                         <td>
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
                            </div>
                            <div id="menu1" class="tab-pane fade">
                                <h3 class="TituloAcordeon"><i class="fa fa-chevron-circle-down"></i>&nbsp;Anexos del Radicado Enviado</h3>
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>Anexos</h2>
                                        <!--<
                                        <asp:Label ID="lblMensaje" runat="server" Text="Subir anexos"></asp:Label>
                                        <asp:FileUpload ID="fileUploadDocumento" runat="server" />
                                        <asp:Button ID="btnSubirDocumento" runat="server" Text="Subir Documento" OnClick="btnSubirDocumento_Click" />
                                        />-->
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">First</th>
                                                    <th scope="col">Last</th>
                                                    <th scope="col">Handle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>Larry</td>
                                                    <td>the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                             <div id="menu2" class="tab-pane fade">
                                <h3 class="TituloAcordeon"><i class="fa fa-chevron-circle-down"></i>&nbsp;Anexos del Radicado Enviado</h3>
                                <div class="row">
                                    <div class="col-md-6">
                                         <div class="help-text">
     ASESORÍA: La asesoría consiste en orientar al peticionario en el ejercicio y defensa de los derechos humanos, ante las autoridades competentes o ante las entidades de carácter privado.
 </div>
 <div display: flex; justify-content: center; align-items: center; height: 100vh;>
 <table style="width: 20%;">
     <tr>
         <td>
             <asp:Label ID="LabelTipoPeticion" runat="server" Text="Tipo de petición:"></asp:Label></td>
         <td>
             <asp:TextBox ID="TxtTipoPeticion" runat="server"></asp:TextBox>
         </td>
             <td><span class="input-group-btn">
                 <button type="button" id="tnLimpiarConclusionAsesoria" onclick="limpiarCampo('<%= TxtTipoPeticion.ClientID %>')" class="btn btn-default btn-medium">
                     <i class="fa fa-close"></i>
                 </button>
                 <button type="button" id="tnBuscarConclusionAsesoria" class="btn btn-success btn-medium btn-margin-catalogo btn-file" usehttppost="0" webapplication="" usedatasource="0">
                     <i class="fa fa-search"></i>&nbsp;
                 </button>
             </span></td>
         
     </tr>
     <tr>
         <td>
             <div class="form-row auto-style1">
                 <asp:Label ID="LabelAreaDerecho" runat="server" Text="Área de derecho:"></asp:Label>

             </div>
         </td>
         <td>
             <asp:DropDownList ID="DropDownListAreaDerecho" runat="server" DataTextField="TextFieldName" DataValueField="ValueFieldName" AppendDataBoundItems="true">
                 <asp:ListItem Text="-- Seleccione un valor --" Value=""></asp:ListItem>
             </asp:DropDownList></td>
         <td>&nbsp;</td>
     </tr>
     <tr>
         <td>
             <asp:Label ID="LabelDerechos" runat="server" Text="Derechos:"></asp:Label>
         </td>
         <td>
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
             <div class="form-row auto-style1">
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
                                    </div>
                                </div>
                            </div>
                             <div id="menu3" class="tab-pane fade">
                                <h3 class="TituloAcordeon"><i class="fa fa-chevron-circle-down"></i>&nbsp;Anexos del Radicado Enviado</h3>
                                <div class="row">
                                    <div class="col-md-6">
                                        <h2>Decisión</h2>
                                        <table>
                                            <tr>
                                                <td>
                                                    <asp:Label ID="lblDecision" runat="server" Text="Decisión:"></asp:Label>
                                                </td>
                                                <td>
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
                                                <td>
                                                    <asp:Label ID="lblComentarios" runat="server" Text="Comentarios:"></asp:Label>
                                                </td>
                                                <td colspan="2">
                                                    <asp:TextBox ID="txtComentarios" runat="server" TextMode="MultiLine" Rows="4" Columns="50"></asp:TextBox>
                                                </td>
                                            </tr>
                                        </table>            
                                    </div>
                                </div>
                            </div>        
                            <asp:HiddenField ID="txtCodigoSolicitud" runat="server" Value="3"></asp:HiddenField> 
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
    </form>
</body>
</html>


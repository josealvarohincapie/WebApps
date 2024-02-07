$("#frmRadicado").EnableValidationToolTip();
$("#frmRadicadoAdicional").EnableValidationToolTip();
$("#frmRadicadoDocumento").EnableValidationToolTip();
$("#frmRadicadoDecision").EnableValidationToolTip();
$("#frmRadicadoDireccion").EnableValidationToolTip();

jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_BotonesER", "BotonesER", "frmBotones", function () {
        UpdateControlsSettings("FILTRO_FRM_RadicadoER", "RadicadoER", "frmRadicado", function () {
            UpdateControlsSettings("FILTRO_FRM_RadicadoAdicionalER", "RadicadoAdicionalER", "frmRadicadoAdicional", function () {
                UpdateControlsSettings("FILTRO_FRM_RadicadoDocumentoER", "RadicadoDocumentoER", "frmRadicadoDocumento", function () {
                    UpdateControlsSettings("FILTRO_FRM_RadicadoDecisionER", "RadicadoDecisionER", "frmRadicadoDecision", function () {
                        UpdateControlsSettings("FILTRO_FRM_RadicadoDireccionER", "RadicadoDireccionER", "frmRadicadoDireccion", function () {
                            getDataModel();
                        });
                    });
                });
            });
        });
    });
})

var CodigoTipoDocumento;
var NombreTipoDocumento;

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    $("#btnBotones_ImprimirPantalla").unbind("click");
    $("#btnBotones_ImprimirPantalla").click(function () {
        window.print();
        return false;
    });

    $("#btnRadicado_Entidad").unbind("click");
    $("#btnRadicado_Entidad").click(function () {
        SelectedCatalog = "Radicado_Entidad";
        var local = ObtenerModelo();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $('input[name="radio_group_Radicado_GrupoEtnicoReconoce"]').on("click", function () {
        var reconoce = $('input[name="radio_group_Radicado_GrupoEtnicoReconoce"]:checked').prev('label').text();
        if (reconoce == "Sí") {
            $("#chkRadicado_GrupoEtnicoReconoceSi").prop('checked', true);
        } else {
            $("#chkRadicado_GrupoEtnicoReconoceSi").prop('checked', false);
        }
        EvaluarEstadosControlesFramework();
    });

    $('input[name="radio_group_Radicado_GrupoEtnicoIndigenaTieneCargo"]').on("click", function () {
        var reconoce = $('input[name="radio_group_Radicado_GrupoEtnicoIndigenaTieneCargo"]:checked').prev('label').text();
        if (reconoce == "Sí") {
            $("#chkRadicado_GrupoEtnicoIndigenaTieneCargoSi").prop('checked', true);
        } else {
            $("#chkRadicado_GrupoEtnicoIndigenaTieneCargoSi").prop('checked', false);
        }
        EvaluarEstadosControlesFramework();
    });

    $("#txtRadicado_Entidad").unbind("change");
    $("#txtRadicado_Entidad").change(function () {
        $("#hiddenRadicado_Secretaria").val("");
        $("#txtRadicado_Secretaria").val("");
        $("#ddlRadicado_CodigoSecretaria").val("");
        $("#frmRadicado").valid();
    });

    $("#txtRadicado_Direccion").unbind("click");
    $("#txtRadicado_Direccion").click(function () {
        $("#ModalDireccion").modal("show");
    });

    $("#btnGuardarDireccion").unbind("click");
    $("#btnGuardarDireccion").click(function () {
        var direccion = "";
        if (!$("#frmRadicadoDireccion").valid()) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return;
        }

        if ($("#ddlRadicadoDireccion_Via option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_Via option:selected").text() + " ";
        }
        if ($("#txtRadicadoDireccion_NumeroVia").val() != "") {
            direccion += $("#txtRadicadoDireccion_NumeroVia").val() + " ";
        }
        if ($("#ddlRadicadoDireccion_LetraVia option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_LetraVia option:selected").text() + " ";
        }
        if ($("#ddlRadicadoDireccion_BIS option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_BIS option:selected").text() + " ";
        }
        if ($("#ddlRadicadoDireccion_ComplementoVia option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_ComplementoVia option:selected").text() + " ";
        }
        if ($("#ddlRadicadoDireccion_CardinalidadVia option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_CardinalidadVia option:selected").text() + " ";
        }
        if ($("#txtRadicadoDireccion_Numero").val() != "") {
            direccion += "#" + $("#txtRadicadoDireccion_Numero").val() + " ";
        }
        if ($("#ddlRadicadoDireccion_Letra option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_Letra option:selected").text() + " ";
        }
        if ($("#txtRadicadoDireccion_Complemento").val() != "" ||
            $("#ddlRadicadoDireccion_Cardinalidad option:selected").text() != "" ||
            $("#ddlRadicadoDireccion_Vivienda option:selected").text() != "" ||
            $("#txtRadicadoDireccion_NumeroVivienda").val() != "") {
            direccion += "- ";
        }
        if ($("#txtRadicadoDireccion_Complemento").val() != "") {
            direccion += $("#txtRadicadoDireccion_Complemento").val() + " ";
        }
        if ($("#ddlRadicadoDireccion_Cardinalidad option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_Cardinalidad option:selected").text() + " ";
        }
        if ($("#ddlRadicadoDireccion_Vivienda option:selected").text() != "") {
            direccion += $("#ddlRadicadoDireccion_Vivienda option:selected").text() + " ";
        }
        if ($("#txtRadicadoDireccion_NumeroVivienda").val() != "") {
            direccion += $("#txtRadicadoDireccion_NumeroVivienda").val() + " ";
        }
        $("#txtRadicado_Direccion").val(direccion);
        $("#ModalDireccion").modal("hide");
    });

    $("#btnRadicado_Secretaria").unbind("click");
    $("#btnRadicado_Secretaria").click(function () {
        SelectedCatalog = "Radicado_Secretaria";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenRadicado_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRadicado_Secretaria").change(function () {
        var mtzSecretaria = $(this).val().split("-");
        if (mtzSecretaria.length > 1) {
            $(this).val($(this).val().replace(mtzSecretaria[0] + "-", ""));
        }
        $("#ddlRadicado_CodigoSecretaria").val($(this).val());
    });
    
    $("#btnRadicado_Departamento").unbind("click");
    $("#btnRadicado_Departamento").click(function () {
        SelectedCatalog = "Radicado_Departamento";
        var local = ObtenerModelo();
        local.CodigoPais = $("#hiddenRadicado_Pais").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnRadicado_DepartamentoHechos").unbind("click");
    $("#btnRadicado_DepartamentoHechos").click(function () {
        SelectedCatalog = "Radicado_DepartamentoHechos";
        var local = ObtenerModelo();
        local.CodigoPais = 39;
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnRadicado_Ciudad").unbind("click");
    $("#btnRadicado_Ciudad").click(function () {
        SelectedCatalog = "Radicado_Ciudad";
        var local = ObtenerModelo();
        local.CodigoDepartamento = $("#hiddenRadicado_Departamento").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnRadicado_MunicipioHechos").unbind("click");
    $("#btnRadicado_MunicipioHechos").click(function () {
        SelectedCatalog = "Radicado_MunicipioHechos";
        var local = ObtenerModelo();
        local.CodigoDepartamento = $("#hiddenRadicado_DepartamentoHechos").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRadicado_TipoTramite").unbind("change");
    $("#txtRadicado_TipoTramite").change(function () {
        $("#Radicado_Resumen").val("");
        $("#hiddenRadicado_TipoDocumento").val("");
        $("#txtRadicado_TipoDocumento").val("");
        $("#hiddenRadicado_SubTipoDocumento").val("");
        $("#txtRadicado_SubTipoDocumento").val("");
        $("#txtRadicado_FechaHechos").val("");
        $("#hiddenRadicado_DepartamentoHechos").val("");
        $("#txtRadicado_DepartamentoHechos").val("");
        $("#hiddenRadicado_MunicipioHechos").val("");
        $("#txtRadicado_MunicipioHechos").val("");
        $("#txtRadicado_DescripcionHechos").val("");
        $("#txtRadicado_DescripcionSolicitud").val("");
        EvaluarEstadosControlesFramework();
    });

    $("#txtRadicado_TipoDocumento").unbind("change");
    $("#txtRadicado_TipoDocumento").change(function () {
        Radicado_CargarHorasDiasVencimiento();
    });
    $("#txtRadicadoDecision_Decision").unbind("change");
    $("#txtRadicadoDecision_Decision").change(function () {
        if ($("#hiddenRadicadoDecision_Decision").val() == "24") {
            MostrarHelp(5);
        }
        EvaluarEstadosControlesFramework();
    });
    //catalogos posibles a enlazar
    //Solicitante
    //Medio de respuesta

    //Tipo de Dirección
    //Pais
    //Departamento
    //Ciudad
    $("#txtRadicado_DiasVencimiento").unbind("change");
    $("#txtRadicado_DiasVencimiento").change(function () {
        Radicado_CargarFechaVencimiento();
    });

    $("#txtRadicado_HorasVencimiento").unbind("change");
    $("#txtRadicado_HorasVencimiento").change(function () {
        Radicado_CargarFechaVencimiento();
    }); 

    $("#btnRadicadoDecision_Decision").unbind("click");
    $("#btnRadicadoDecision_Decision").click(function () {
        var local = ObtenerModelo();
        local.CodigoTipoDocumento = $("#hiddenRadicado_TipoDocumento").val();
        local.CodigoSubTipoDocumento = $("#hiddenRadicado_SubTipoDocumento").val();
        SelectedCatalog = "RadicadoDecision_Decision";
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#btnRadicadoDecision_Secretaria").unbind("click");
    $("#btnRadicadoDecision_Secretaria").click(function () {
        SelectedCatalog = "RadicadoDecision_Secretaria";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenRadicado_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRadicadoDecision_Secretaria").change(function () {
        var mtzSecretaria = $(this).val().split("-");
        if (mtzSecretaria.length > 1) {
            $(this).val($(this).val().replace(mtzSecretaria[0] + "-",""));
        }
    });

    $("#btnRadicadoDecision_Area").unbind("click");
    $("#btnRadicadoDecision_Area").click(function () {
        SelectedCatalog = "RadicadoDecision_Area";
        var CodigoSecretaria = $("#txtRadicado_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRadicado_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRadicadoDecision_Grupo").unbind("click");
    $("#btnRadicadoDecision_Grupo").click(function () {
        SelectedCatalog = "RadicadoDecision_Grupo";
        Ultimus.CargarDataCatalogo(null, null, { CodigoArea: $("#txtRadicado_CodigoRecipienteArea").val() });
    });

    $("#btnRadicado_TipoDocumento").unbind("click");
    $("#btnRadicado_TipoDocumento").click(function () {
        SelectedCatalog = "Radicado_TipoDocumento";
        Ultimus.CargarDataCatalogo(null, null, { CodigoTipoTramite: $("#hiddenRadicado_TipoTramite").val() });
    });

    $("#btnRadicadoDecision_Funcionario").unbind("click");
    $("#btnRadicadoDecision_Funcionario").click(function () {
        SelectedCatalog = "RadicadoDecision_Funcionario";
        var CodigoSecretaria = $("#txtRadicado_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRadicado_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRadicadoAdicional_Secretaria").unbind("click");
    $("#btnRadicadoAdicional_Secretaria").click(function () {
        SelectedCatalog = "RadicadoAdicional_Secretaria";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenRadicado_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#btnRadicado_SubTipoDocumento").unbind("click");
    $("#btnRadicado_SubTipoDocumento").click(function () {
        SelectedCatalog = "Radicado_SubTipoDocumento";
        var local = ObtenerModelo();
        local.CodigoTipoDocumento = $("#hiddenRadicado_TipoDocumento").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#btnBotones_GuardarRadicado").unbind("click");
    $("#btnBotones_GuardarRadicado").click(function () {
        Radicado_Guardar();
    });

    $("#btnBotones_VerSolicitudes").unbind("click");
    $("#btnBotones_VerSolicitudes").click(function () {
        Radicado_CargarTramites();
    });
    
    $("#btnBotones_VerEtiqueta").unbind("click");
    $("#btnBotones_VerEtiqueta").click(function () {
        $("#modalVerEtiqueta").modal("show");
    });

    $("#btnBotones_ImprimirEtiqueta").unbind("click");
    $("#btnBotones_ImprimirEtiqueta").click(function () {
        var src = $("#ifrBarcode").attr("src");
        if (src != null) {
            var pwin = window.open(src, "_blank");
            pwin.print();
        }
    });

    $("#btnBotones_VerEtiquetaDepartamental").unbind("click");
    $("#btnBotones_VerEtiquetaDepartamental").click(function () {
        $("#modalVerEtiquetaDepartamental").modal("show");
    });

    $("#btnBotones_ImprimirEtiquetaDepartamental").unbind("click");
    $("#btnBotones_ImprimirEtiquetaDepartamental").click(function () {
        var src = $("#ifrBarcodeDepartamental").attr("src");
        if (src != null) {
            var pwin = window.open(src, "_blank");
            pwin.print();
        }
    });

    $("#btnRadicadoDocumento_Agregar").unbind("click");
    $("#btnRadicadoDocumento_Agregar").click(function () {
        var FileInputList = FileInput_Get("RadicadoDocumento_Archivo");
        if (FileInputList == null || FileInputList.length == 0) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return false;
        }
        $("#txtRadicadoDocumento_RutaFisicaArchivo").val(FileInputList[0].RutaFisicaArchivo);
        $("#txtRadicadoDocumento_RutaVirtualArchivo").val(FileInputList[0].RutaVirtualArchivo);
        $("#txtRadicadoDocumento_TamanoArchivo").val(FileInputList[0].TamanoArchivo);
        $("#txtRadicadoDocumento_TituloArchivo").val(FileInputList[0].TituloArchivo);
        Grid_Add("RadicadoDocumento_AnexoList", "RadicadoDocumento", null);
    });

    $("#btnBotones_Descartar").unbind("click");
    $("#btnBotones_Descartar").click(function () {
        Radicado_Descartar();
    });

    $("#btnBotones_Archivar").unbind("click");
    $("#btnBotones_Archivar").click(function () {
        window.open($("#hiddenIntegracionDozzierWebUrl").val());
    });

    $("#btnBotones_Completar").unbind("click");
    $("#btnBotones_Completar").click(function () {
        Radicado_Completar();
    });

    $("#btnRadicado_RadicadoAdicional").unbind("click");
    $("#btnRadicado_RadicadoAdicional").click(function () {
        $("#modalRadicadoAdicional").modal("show");
    });

    $("#btnRadicadoAdicional_Agregar").unbind("click");
    $("#btnRadicadoAdicional_Agregar").click(function () {
        Grid_Add("RadicadoAdicional_RadicadoAdicionalList", "RadicadoAdicional", null);
    });

    $("#btnRadicadoAdicional_AgregarTodosJefes").unbind("click");
    $("#btnRadicadoAdicional_AgregarTodosJefes").click(function () {
        var local = ObtenerModelo();
        Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_CargarTodosJefes".format(WCFUrl), local, true, false, function (data) {
            Response(data, function () {
                $("#RadicadoAdicional_RadicadoAdicionalList").Grid("RenderGrid", data.Radicado.RadicadoAdicional);
            });
        }, "ERROR");
    });

    $("#btnRadicado_HelpEquivocacion").unbind("click");
    $("#btnRadicado_HelpEquivocacion").click(function () {
        MostrarHelp(1);
    });

    $("#btnRadicado_HelpSolicitudServidor").unbind("click");
    $("#btnRadicado_HelpSolicitudServidor").click(function () {
        MostrarHelp(2);
    });

    $("#btnRadicado_HelpCritico").unbind("click");
    $("#btnRadicado_HelpCritico").click(function () {
        MostrarHelp(3);
    });

    $("#btnRadicado_HelpPrioritario").unbind("click");
    $("#btnRadicado_HelpPrioritario").click(function () {
        MostrarHelp(4);
    });

    $("#chkRadicado_ModificaTipoDocumento").click(function () {
        EvaluarEstadosControlesFramework();
    });

    $("#chkRadicado_EquivocacionRadicar").click(function () {
        EvaluarEstadosControlesFramework();
        $("#chkRadicado_SolicitudServidor").prop('checked', false);
        if ($("#chkRadicado_EquivocacionRadicar").prop('checked')) {
            MostrarHelp(1);
        }
    });

    $("#chkRadicado_SolicitudServidor").click(function () {
        EvaluarEstadosControlesFramework();
        $("#chkRadicado_EquivocacionRadicar").prop('checked', false);
        if ($("#chkRadicado_SolicitudServidor").prop('checked')) {
            MostrarHelp(2);
        }
    });

    $("#lblRadicado_Critico").css('color', '#FFFFFF')
    $("#lblRadicado_Critico").css('background-color', '#e83d3a')
    $("#chkRadicado_Critico").click(function () {
        EvaluarEstadosControlesFramework();
        $("#chkRadicado_Prioritario").prop('checked', false);
        if ($("#chkRadicado_Critico").prop('checked')) {
            MostrarHelp(3);
        }
    });

    $("#lblRadicado_Prioritario").css('color', '#FFFFFF')
    $("#lblRadicado_Prioritario").css('background-color', '#e6b543')
    $("#chkRadicado_Prioritario").click(function () {
        EvaluarEstadosControlesFramework();
        $("#chkRadicado_Critico").prop('checked', false);
        if ($("#chkRadicado_Prioritario").prop('checked')) {
            MostrarHelp(4);
        }
    });

    Grid_Init("RadicadoDocumento_AnexoList", "RadicadoDocumento", true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        if (fila.Etapa == "" || fila.Etapa == null || fila.Etapa == $("#hiddenStep").val()) {
            fila.OpcionesRadicadoDocumento = $("#OpcionesRadicadoDocumento").html();
        } else {
            fila.OpcionesRadicadoDocumento = $("#OpcionesRadicadoDocumentoLectura").html();
        }
        fila.OpcionesRadicadoDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoDocumento);
        fila.OpcionesRadicadoDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoDocumento);
    });
    FileInput_Init("RadicadoDocumento_Archivo");

    Grid_Init("RadicadoAdicional_RadicadoAdicionalList", "RadicadoAdicional", true, function (fila) {
        if (fila.SoloLectura != this.undefined) {
            if (!fila.SoloLectura) {
                fila.SoloLecturaFormat = "NO";
            } else {
                fila.SoloLecturaFormat = "SÍ";
            }
        } else {
            fila.SoloLecturaFormat = "NO";
        }
    });

    Grid_Init("Radicado_TramiteLista", "Radicado", true, function (fila) {
        fila.FechaCreacionFormat = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
    });

    $("#txtRadicado_Remitente").keypress(function (e) {
        var userGetData = e.which;
        if (!(userGetData >= 65 && userGetData <= 122) && (userGetData != 32 && userGetData != 0)) {
            event.preventDefault();
        }
    });
    $("#txtRadicado_Asunto").prop("minLength", 5);
    $("#txtRadicado_Pais").change(function () {
        $("#hiddenRadicado_Departamento").val("");
        $("#txtRadicado_Departamento").val("");
        $("#hidenRadicado_Ciudad").val("");
        $("#txtRadicado_Ciudad").val("");
    });

    var local = ObtenerModelo();
    Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_Cargar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            CargarFormulario(data);
        });
    }, "ERROR");
}

this.MostrarHelp = function (id) {
    if (id == 1) {
        $("#lblRadicado_HelpSolicitudServidorTitulo").hide();
        $("#lblRadicado_HelpSolicitudServidorTexto").hide();
        $("#lblRadicado_HelpCriticoTitulo").hide();
        $("#lblRadicado_HelpCriticoTexto").hide();
        $("#lblRadicado_HelpPrioritarioTitulo").hide();
        $("#lblRadicado_HelpPrioritarioTexto").hide();
        $("#lblRadicado_HelpFinalizarTitulo").hide();
        $("#lblRadicado_HelpFinalizarTexto").hide();

        $("#lblRadicado_HelpEquivocacionTitulo").show();
        $("#lblRadicado_HelpEquivocacionTexto").show();
        $("#modalHelp").modal("show");
    }
    if (id == 2) {     
        $("#lblRadicado_HelpEquivocacionTitulo").hide();
        $("#lblRadicado_HelpEquivocacionTexto").hide();
        $("#lblRadicado_HelpCriticoTitulo").hide();
        $("#lblRadicado_HelpCriticoTexto").hide();
        $("#lblRadicado_HelpPrioritarioTitulo").hide();
        $("#lblRadicado_HelpPrioritarioTexto").hide();
        $("#lblRadicado_HelpFinalizarTitulo").hide();
        $("#lblRadicado_HelpFinalizarTexto").hide();

        $("#lblRadicado_HelpSolicitudServidorTitulo").show();
        $("#lblRadicado_HelpSolicitudServidorTexto").show();
        $("#modalHelp").modal("show");
    }
    if (id == 3) {
        $("#lblRadicado_HelpEquivocacionTitulo").hide();
        $("#lblRadicado_HelpEquivocacionTexto").hide();
        $("#lblRadicado_HelpSolicitudServidorTitulo").hide();
        $("#lblRadicado_HelpSolicitudServidorTexto").hide();
        $("#lblRadicado_HelpPrioritarioTitulo").hide();
        $("#lblRadicado_HelpPrioritarioTexto").hide();
        $("#lblRadicado_HelpFinalizarTitulo").hide();
        $("#lblRadicado_HelpFinalizarTexto").hide();

        $("#lblRadicado_HelpCriticoTitulo").show();
        $("#lblRadicado_HelpCriticoTexto").show();
        $("#modalHelp").modal("show");
    }
    if (id == 4) {
        $("#lblRadicado_HelpEquivocacionTitulo").hide();
        $("#lblRadicado_HelpEquivocacionTexto").hide();
        $("#lblRadicado_HelpSolicitudServidorTitulo").hide();
        $("#lblRadicado_HelpSolicitudServidorTexto").hide();
        $("#lblRadicado_HelpCriticoTitulo").hide();
        $("#lblRadicado_HelpCriticoTexto").hide();
        $("#lblRadicado_HelpFinalizarTitulo").hide();
        $("#lblRadicado_HelpFinalizarTexto").hide();

        $("#lblRadicado_HelpPrioritarioTitulo").show();
        $("#lblRadicado_HelpPrioritarioTexto").show();
        $("#modalHelp").modal("show");
    }
    if (id == 5) {
        $("#lblRadicado_HelpEquivocacionTitulo").hide();
        $("#lblRadicado_HelpEquivocacionTexto").hide();
        $("#lblRadicado_HelpSolicitudServidorTitulo").hide();
        $("#lblRadicado_HelpSolicitudServidorTexto").hide();
        $("#lblRadicado_HelpCriticoTitulo").hide();
        $("#lblRadicado_HelpCriticoTexto").hide();
        $("#lblRadicado_HelpPrioritarioTitulo").hide();
        $("#lblRadicado_HelpPrioritarioTexto").hide();

        $("#lblRadicado_HelpFinalizarTitulo").show();
        $("#lblRadicado_HelpFinalizarTexto").show();
        $("#modalHelp").modal("show");
    }
}

this.Radicado_CargarHorasDiasVencimiento = function () {
    $("#txtRadicado_DiasVencimiento").val("");
    $("#txtRadicado_HorasVencimiento").val("");
    $("#txtRadicado_FechaVencimiento").val("");
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    if (local.Radicado.CodigoTipoDocumento != "") {
        Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_CargarHorasDiasVencimiento".format(WCFUrl), local, true, false, function (data) {
            Response(data, function () {
                if (data.Radicado.DiasVencimiento != null) {
                    $("#txtRadicado_DiasVencimiento").val(data.Radicado.DiasVencimiento);
                }
                if (data.Radicado.HorasVencimiento != null) {
                    $("#txtRadicado_HorasVencimiento").val(data.Radicado.HorasVencimiento);
                }
                $("#txtRadicado_FechaVencimiento").val(data.Radicado.FechaVencimiento);
                EvaluarEstadosControlesFramework();
            });
        }, "ERROR");
    }
}

this.Radicado_CargarFechaVencimiento = function () {
    $("#txtRadicado_FechaVencimiento").val("");
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_CargarFechaVencimiento".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#txtRadicado_FechaVencimiento").val(data.Radicado.FechaVencimiento);
            EvaluarEstadosControlesFramework();
        });
    }, "ERROR");
}

this.Radicado_Guardar = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmRadicado").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    if ($("#txtRadicado_Direccion").val() == "" && ($("#hiddenRadicado_MedioRespuesta").val() == "2" || $("#hiddenRadicado_MedioRespuesta").val() == "3")) {
        toastr.warning("Debe ingresar la Dirección", Message_Warning);
        return;
    }
    if ($("#txtRadicado_Remitente").val() == "" && $("#chkRadicado_EsAnonimo").val() != true) {
        toastr.warning("Debe ingresar el Remitente", Message_Warning);
        return;
    }

    $(":input").each(function () {
        if (!$(this).is(":hidden")) {
            this.value = this.value.toUpperCase();
        }
    });

    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    local.Radicado.RadicadoDocumento = $("#RadicadoDocumento_AnexoList").Grid("Get");
    local.Radicado.RadicadoAdicional = $("#RadicadoAdicional_RadicadoAdicionalList").Grid("Get");
    local.Radicado.Remitente = $("#txtRadicado_Remitente").val();
    Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_Guardar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            if (local.CodigoSolicitud == 0) {
                var url = window.location.href.replace("co_solicitud=0", "co_solicitud={0}".format(data.Radicado.CodigoSolicitud));
                window.location = url;
            }
            else {
                CargarFormulario(data);
            }
        });
    }, "ERROR");
}

this.Radicado_CargarTramites = function () {
    if (IsDoubleClicked($(this))) return;
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    if (local.Radicado.NumeroDocumentoIdentificacion == "" || local.Radicado.NumeroDocumentoIdentificacion == null) {
        toastr.warning("Debe existir una identificación para poder ver el historial de trámites", Message_Warning);
        return;
    }
    Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_CargarTramites".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#Radicado_TramiteLista").Grid("RenderGrid", data.RadicadoTramiteLista);          
            $("#modalRadicadoTramites").modal("show");
        });
    }, "ERROR");
}

this.Radicado_Completar = function () {
    if (IsDoubleClicked($(this))) return;
    if ($("#txtRadicadoDecision_Comentarios").prop('required')) {
        $("#txtRadicadoDecision_Comentarios").prop("minLength", 10);
    } else {
        $("#txtRadicadoDecision_Comentarios").prop("minLength", 0);
    }
    if (!$("#frmRadicado").valid() || !$("#frmRadicadoDecision").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    if ($("#txtRadicado_Direccion").val() == "" && ($("#hiddenRadicado_MedioRespuesta").val() == "2" || $("#hiddenRadicado_MedioRespuesta").val() == "3")) {
        toastr.warning("Debe ingresar la Dirección", Message_Warning);
        return;
    }
    if ($("#txtRadicado_Remitente").val() == "" && $("#chkRadicado_EsAnonimo").val() != true) {
        toastr.warning("Debe ingresar el Remitente", Message_Warning);
        return;
    }
    
    //if ($("#btnRadicadoDecision_Firma").attr("firmado") != "1") {
    //    toastr.warning(MensajeFirmarFormulario, Message_Warning);
    //    return;
    //}
    if (confirm("¿Desea enviar esta solicitud a la siguiente etapa?")) {
        $("#btnBotones_Descartar").prop("disabled", true);
        $("#btnBotones_Completar").prop("disabled", true);

        $(":input").each(function () {
            if (!$(this).is(":hidden")) {
                this.value = this.value.toUpperCase();
            }
        });

        var local = ObtenerModelo();
        CargarRelacionCampos();
        local = RelacionCamposFramework.Guardar(local);
        local.Hash = $("#lblRadicadoDecision_FirmaHash").text();
        local.Radicado.RadicadoDocumento = $("#RadicadoDocumento_AnexoList").Grid("Get");
        local.Radicado.RadicadoAdicional = $("#RadicadoAdicional_RadicadoAdicionalList").Grid("Get");
        local.Radicado.Remitente = $("#txtRadicado_Remitente").val();
        Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_Completar".format(WCFUrl), local, true, false, function (data) {
            $("#btnBotones_Descartar").prop("disabled", false);
            $("#btnBotones_Completar").prop("disabled", false);
            Response(data, function () {
                if (local.UltimusIncident == 0)
                    alert("Se ha generado el incidente No. " + data.UltimusIncident);
                else
                    alert("Se ha completado el incidente No. " + data.UltimusIncident);
                CloseForm();
            });
        }, "ERROR");
    }
}

this.Radicado_Descartar = function () {
    if (IsDoubleClicked($(this))) return;
    if (confirm("¿Desea descartar esta solicitud?")) {
        $("#btnBotones_Descartar").prop("disabled", true);
        $("#btnBotones_Completar").prop("disabled", true);
        var local = ObtenerModelo();
        CargarRelacionCampos();
        local = RelacionCamposFramework.Guardar(local);
        local.Hash = $("#lblRadicadoDecision_FirmaHash").text();
        local.Radicado.RadicadoDocumento = $("#RadicadoDocumento_AnexoList").Grid("Get");
        local.Radicado.RadicadoAdicional = $("#RadicadoAdicional_RadicadoAdicionalList").Grid("Get");
        local.Radicado.Remitente = $("#txtRadicado_Remitente").val();
        Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Radicado_Descartar".format(WCFUrl), local, true, false, function (data) {
            $("#btnBotones_Descartar").prop("disabled", false);
            $("#btnBotones_Completar").prop("disabled", false);
            Response(data, function () {
                alert("Se ha descartado el incidente No. " + data.UltimusIncident);
                CloseForm();
            });
        }, "ERROR");
    }
}

this.CargarFormulario = function (data) {
    //if ($("#hiddenStep").val() != "Radicar") {
    //    $('.nav-pills a[href="#menu2"]').tab('show');
    //}
    if (data.Radicado.CodigoFuente != 2) { 
        $("#subMenu2").hide();
        $("#liCorreo").hide(); 
    }
    if (data.Radicado.CodigoFuente != 3) {
        $("#subMenu3").hide();
        $("#liPqrsdf").hide();
    }
    if (data.Radicado.CodigoFuente != 2 && data.Radicado.CodigoFuente != 3) {
        $("#liRadicado").hide();
    }
    $("#frmRadicado").reset();
    $("#frmRadicadoAdicional").reset();
    CargarRelacionCampos();
    RelacionCamposFramework.Cargar(data);
    $("#txtRadicado_Remitente").val(data.Radicado.Remitente);
    $("#frmRadicado").valid();
    $("#frmRadicadoAdicional").valid();

    if (data.Radicado.PqrsFuente != null) {
        if (data.Radicado.PqrsFuente.GrupoEtnicoReconoce == true) {
            $("#radio_Radicado_GrupoEtnicoReconocePqrsFuente_0").attr('checked', true);
        } else {
            $("#radio_Radicado_GrupoEtnicoReconocePqrsFuente_1").attr('checked', true);
        }
        if (data.Radicado.PqrsFuente.GrupoEtnicoIndigenaTieneCargo == true) {
            $("#radio_Radicado_GrupoEtnicoIndigenaTieneCargoPqrsFuente_0").attr('checked', true);
        } else {
            $("#radio_Radicado_GrupoEtnicoIndigenaTieneCargoPqrsFuente_1").attr('checked', true);
        }
    }

    if (data.Radicado != null) {
        if (data.Radicado.GrupoEtnicoReconoce == true) {
            $("#radio_Radicado_GrupoEtnicoReconoce_0").attr('checked', true);
        } else {
            $("#radio_Radicado_GrupoEtnicoReconoce_1").attr('checked', true);
        }
        if (data.Radicado.GrupoEtnicoIndigenaTieneCargo == true) {
            $("#radio_Radicado_GrupoEtnicoIndigenaTieneCargo_0").attr('checked', true);
        } else {
            $("#radio_Radicado_GrupoEtnicoIndigenaTieneCargo_1").attr('checked', true);
        }
    }
    
    if (data.Radicado != null) {
        var autocomplete = $('#txtRadicado_Remitente').typeahead();
        autocomplete.data('typeahead').source = data.Remitentes;

        if (data.Radicado.CorreoFuente != null) {
            $("#Radicado_CuerpoCorreoFuente").html(data.Radicado.CorreoFuente.Cuerpo);
        }
        if (data.Radicado.RutaVirtualBarcode != null) {
            $("#ifrBarcode").prop("src", data.Radicado.RutaVirtualBarcode);
        }
        if (data.Radicado.RutaVirtualBarcodeDepartamental != null) {
            $("#ifrBarcodeDepartamental").prop("src", data.Radicado.RutaVirtualBarcodeDepartamental);
        }
        $("#RadicadoAdicional_RadicadoAdicionalList").Grid("RenderGrid", data.Radicado.RadicadoAdicional);
        $("#RadicadoDocumento_AnexoList").Grid("RenderGrid", data.Radicado.RadicadoDocumento);

    }
    EvaluarEstadosControlesFramework();
    CodigoTipoDocumento = data.Radicado.CodigoTipoDocumento;
    NombreTipoDocumento = data.Radicado.NombreTipoDocumento;
    $("#frmRadicado").show();
}

this.DefinirSeleccionados = function (IdTabla, IdCheckbox, Llave, AsignarA) {
    var Lista = $("#{0}".format(IdTabla)).Grid("Get");
    Lista.forEach(function (valor, indice, array) {
        var checkbox = $("#{0}".format(IdTabla)).find("[data-name={0}][data-id={1}]".format(IdCheckbox, valor[Llave]));
        if (checkbox.prop("checked")) {
            valor[AsignarA] = true;
        } else {
            valor[AsignarA] = false;
        }      
    });
    return Lista;
}

$("#modalRadicadoTramites").on("shown.bs.modal", function () {
    $('#Radicado_TramiteLista').DataTable().columns.adjust().draw();
})
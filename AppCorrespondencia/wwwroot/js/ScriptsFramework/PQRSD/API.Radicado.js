$("#frmPqrs").EnableValidationToolTip();
$("#frmPqrsDocumento").EnableValidationToolTip();
$("#frmPqrsDireccion").EnableValidationToolTip();

jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_Botones", "Botones", "frmBotones", function () {
        UpdateControlsSettings("FILTRO_FRM_Pqrs", "Pqrs", "frmPqrs", function () {
            UpdateControlsSettings("FILTRO_FRM_PqrsDocumento", "PqrsDocumento", "frmPqrsDocumento", function () {
                UpdateControlsSettings("FILTRO_FRM_AceptaPolitica", "AceptaPolitica", "frmAceptaPolitica", function () {
                    UpdateControlsSettings("FILTRO_FRM_PqrsDireccion", "PqrsDireccion", "frmPqrsDireccion", function () {
                        getDataModel();
                    });
                });
            });
        });
    });
})

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    $("#txtPqrs_RepetirCorreo").addCustomRule(function () {
        return $("#txtPqrs_Correo").val() == $("#txtPqrs_RepetirCorreo").val() ? null : "Validar el correo ingresado";
    });

    $("#txtPqrs_RepetirCorreo").on("paste", function (e) {
        alert("Por favor, vuelva a ingresar su correo");
        $(this).val("");
    });

    $("#btnBotones_GuardarRadicado").unbind("click");
    $("#btnBotones_GuardarRadicado").click(function () {
        Radicado_Guardar();
    });

    $("#btnPqrs_Entidad").unbind("click");
    $("#btnPqrs_Entidad").click(function () {
        SelectedCatalog = "Pqrs_Entidad";
        var local = ObtenerModelo();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtPqrs_Entidad").unbind("change");
    $("#txtPqrs_Entidad").change(function () {
        $("#hiddenPqrs_Secretaria").val("");
        $("#txtPqrs_Secretaria").val("");
        $("#txtPqrs_Departamento").val("");
        $("#txtPqrs_Municipio").val("");
        $("#frmPqrs").valid();
        EvaluarEstadosControlesFramework();

        var local = ObtenerModelo();
        local.NombreEntidad = $("#txtPqrs_Entidad").val();
        if (local.NombreEntidad != "") {
            Ultimus.AjaxPostData("{0}/Catalogos.svc/api/ObtenerEntidadDetalle".format(WCFUrl), local, true, false, function (data) {
                Response(data, function () {
                    $("#txtPqrs_Departamento").val(data.Entidad.Departamento);
                    $("#txtPqrs_Municipio").val(data.Entidad.Municipio);
                    $("#frmPqrs").valid();
                });
            }, "ERROR");
        }
    });

    $('input[name="radio_group_Pqrs_GrupoEtnicoReconoce"]').on("click", function () {
        var reconoce = $('input[name="radio_group_Pqrs_GrupoEtnicoReconoce"]:checked').prev('label').text();
        if (reconoce == "Sí") {
            $("#chkPqrs_GrupoEtnicoReconoceSi").prop('checked', true);
        } else {
            $("#chkPqrs_GrupoEtnicoReconoceSi").prop('checked', false);
        }
        EvaluarEstadosControlesFramework();
    });

    $('input[name="radio_group_Pqrs_GrupoEtnicoIndigenaTieneCargo"]').on("click", function () {
        var reconoce = $('input[name="radio_group_Pqrs_GrupoEtnicoIndigenaTieneCargo"]:checked').prev('label').text();
        if (reconoce == "Sí") {
            $("#chkPqrs_GrupoEtnicoIndigenaTieneCargoSi").prop('checked', true);
        } else {
            $("#chkPqrs_GrupoEtnicoIndigenaTieneCargoSi").prop('checked', false);
        }
        EvaluarEstadosControlesFramework();
    });

    $("#txtPqrs_Direccion").unbind("click");
    $("#txtPqrs_Direccion").click(function () {
        $("#txtPqrs_Direccion").val("");
        $("#ModalDireccion").modal("show");
    });

    $("#btnGuardarDireccion").unbind("click");
    $("#btnGuardarDireccion").click(function () {
        var direccion = "";
        if (!$("#frmPqrsDireccion").valid()) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return;
        }

        if ($("#ddlPqrsDireccion_Via option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_Via option:selected").text() + " ";
        }
        if ($("#txtPqrsDireccion_NumeroVia").val() != "") {
            direccion += $("#txtPqrsDireccion_NumeroVia").val()+ " ";
        }
        if ($("#ddlPqrsDireccion_LetraVia option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_LetraVia option:selected").text() + " ";
        }
        if ($("#ddlPqrsDireccion_BIS option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_BIS option:selected").text() + " ";
        }
        if ($("#ddlPqrsDireccion_ComplementoVia option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_ComplementoVia option:selected").text() + " ";
        }
        if ($("#ddlPqrsDireccion_CardinalidadVia option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_CardinalidadVia option:selected").text() + " ";
        }
        if ($("#txtPqrsDireccion_Numero").val() != "") {
            direccion += "#" + $("#txtPqrsDireccion_Numero").val() + " ";
        }
        if ($("#ddlPqrsDireccion_Letra option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_Letra option:selected").text() + " ";
        }
        if ($("#txtPqrsDireccion_Complemento").val() != "" ||
            $("#ddlPqrsDireccion_Cardinalidad option:selected").text() != "" ||
            $("#ddlPqrsDireccion_Vivienda option:selected").text() != "" ||
            $("#txtPqrsDireccion_NumeroVivienda").val() != "") {
            direccion += "- ";
        }
        if ($("#txtPqrsDireccion_Complemento").val() != "") {
            direccion += $("#txtPqrsDireccion_Complemento").val() + " ";
        }
        if ($("#ddlPqrsDireccion_Cardinalidad option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_Cardinalidad option:selected").text() + " ";
        }
        if ($("#ddlPqrsDireccion_Vivienda option:selected").text() != "") {
            direccion += $("#ddlPqrsDireccion_Vivienda option:selected").text() + " ";
        }
        if ($("#txtPqrsDireccion_NumeroVivienda").val() != "") {
            direccion += $("#txtPqrsDireccion_NumeroVivienda").val() + " ";
        }
        $("#txtPqrs_Direccion").val(direccion);
        $("#ModalDireccion").modal("hide");
    });
    
    $("#btnPqrs_Secretaria").unbind("click");
    $("#btnPqrs_Secretaria").click(function () {
        SelectedCatalog = "Pqrs_Secretaria";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenPqrs_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnPqrs_Departamento").unbind("click");
    $("#btnPqrs_Departamento").click(function () {
        SelectedCatalog = "Pqrs_Departamento";
        var local = ObtenerModelo();
        local.CodigoPais = $("#hiddenPqrs_Pais").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnPqrs_DepartamentoHechos").unbind("click");
    $("#btnPqrs_DepartamentoHechos").click(function () {
        SelectedCatalog = "Pqrs_DepartamentoHechos";
        var local = ObtenerModelo();
        local.CodigoPais = 39;
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnPqrs_Ciudad").unbind("click");
    $("#btnPqrs_Ciudad").click(function () {
        SelectedCatalog = "Pqrs_Ciudad";
        var local = ObtenerModelo();
        local.CodigoDepartamento = $("#hiddenPqrs_Departamento").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnPqrs_MunicipioHechos").unbind("click");
    $("#btnPqrs_MunicipioHechos").click(function () {
        SelectedCatalog = "Pqrs_MunicipioHechos";
        var local = ObtenerModelo();
        local.CodigoDepartamento = $("#hiddenPqrs_DepartamentoHechos").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });
    $("#btnPqrsDocumento_Agregar").unbind("click");
    $("#btnPqrsDocumento_Agregar").click(function () {
        var FileInputList = FileInput_Get("PqrsDocumento_Archivo");
        if (FileInputList == null || FileInputList.length == 0) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return false;
        }
        $("#txtPqrsDocumento_RutaFisicaArchivo").val(FileInputList[0].RutaFisicaArchivo);
        $("#txtPqrsDocumento_RutaVirtualArchivo").val(FileInputList[0].RutaVirtualArchivo);
        $("#txtPqrsDocumento_TamanoArchivo").val(FileInputList[0].TamanoArchivo);
        $("#txtPqrsDocumento_TituloArchivo").val(FileInputList[0].TituloArchivo);
        Grid_Add("PqrsDocumento_AnexoList", "PqrsDocumento", null);
    });

    Grid_Init("PqrsDocumento_AnexoList", "PqrsDocumento", true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        fila.OpcionesRadicadoDocumento = $("#OpcionesPqrsDocumento").html();
        fila.OpcionesRadicadoDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoDocumento);
        fila.OpcionesRadicadoDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoDocumento);
    });
    FileInput_Init("PqrsDocumento_Archivo");
    $("#txtPqrs_NombreCompleto").keypress(function (e) {
        var userGetData = e.which;
        if (!(userGetData >= 65 && userGetData <= 122) && (userGetData != 32 && userGetData != 0)) {
            event.preventDefault();
        }
    });
    $("#txtPqrs_Asunto").prop("minLength", 5);   
    $("#txtPqrs_Pais").change(function () {
        $("#hiddenPqrs_Departamento").val("");
        $("#txtPqrs_Departamento").val("");
        $("#hidenPqrs_Ciudad").val("");
        $("#txtPqrs_Ciudad").val("");
    });

    var local = ObtenerModelo();
    Ultimus.AjaxPostData("{0}/PQRSD.svc/api/Radicado_Cargar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            CargarFormulario(data);
            $('#frmPqrsDocumento').css('display', 'block'); $('#frmPqrsDocumento').css('display', 'block');
        });
    }, "ERROR");
//    $('#frmPqrsDocumento').css('display', 'block');
}

this.Radicado_Guardar = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmPqrs").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    if (!($("#txtPqrs_Correo").val() == $("#txtPqrs_RepetirCorreo").val())) {
        toastr.warning("Validar el correo ingresado, no coinciden los correos", Message_Warning);
        return;
    }
    


    var token = grecaptcha.getResponse();
    if (token == "" || token.length == 0) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    local.token = token;
    local.Pqrs.PqrsDocumento = $("#PqrsDocumento_AnexoList").Grid("Get");
    local.Pqrs.SistemaGenera = CodigoFuente;
    $("#btnBotones_GuardarRadicado").prop("disabled", true);
    Ultimus.AjaxPostData("{0}/PQRSD.svc/api/Radicado_Guardar".format(WCFUrl), local, true, false, function (data) {
        $("#btnBotones_GuardarRadicado").prop("disabled", false);
        Response(data, function () {
            $("#frmPqrs").reset();
            $("#frmAceptaPolitica").reset();
            $("#txtCodigoSolicitudPqrs").text(data.NumeroRadicado);
            $("#chkPqrs_EsAnonimo").prop("checked", false);
            $("#chkAceptaPolitica_Acepto").prop("checked", false);
            $("#PqrsDocumento_AnexoList").Grid("RenderGrid", null);
            $("#hiddenPqrs_TipoTramite").val($("#hiddenCodigoTipoTramite").val());
            $("#txtPqrs_TipoTramite").val($("#hiddenNombreTipoTramite").val());
            EvaluarEstadosControlesFramework();
            $("#modalVerResultado").modal("show");
        });
    }, "ERROR");
}

this.CargarFormulario = function (data) {
    $("#frmPqrs").reset();
    CargarRelacionCampos();
    RelacionCamposFramework.Cargar(data);
    $("#hiddenPqrs_TipoTramite").val($("#hiddenCodigoTipoTramite").val());
    $("#txtPqrs_TipoTramite").val($("#hiddenNombreTipoTramite").val());
    $("#frmPqrs").valid();
    if (data.Pqrs != null) {
        $("#PqrsDocumento_AnexoList").Grid("RenderGrid", data.Pqrs.PqrsDocumento);
    }
    EvaluarEstadosControlesFramework();
}
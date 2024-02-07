$("#frmRadicado").EnableValidationToolTip();
$("#frmRadicadoInternoAntecedentes").EnableValidationToolTip();
$("#frmRadicadoInterno").EnableValidationToolTip();
$("#frmRadicadoInternoAdicional").EnableValidationToolTip();
$("#frmRadicadoInternoDocumento").EnableValidationToolTip();
$("#frmRadicadoInternoRespuesta").EnableValidationToolTip();
$("#frmRadicadoInternoRespuestaDocumento").EnableValidationToolTip();
$("#frmRadicadoInternoDecision").EnableValidationToolTip();

jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_BotonesCI", "BotonesCI", "frmBotones", function () {
        UpdateControlsSettings("FILTRO_FRM_RadicadoCI", "RadicadoCI", "frmRadicado", function () {
            UpdateControlsSettings("FILTRO_FRM_RadicadoInternoAntecedentesCI", "RadicadoInternoAntecedentesCI", "frmRadicadoInternoAntecedentes", function () {
                UpdateControlsSettings("FILTRO_FRM_RadicadoDocumentoCI", "RadicadoDocumentoCI", "frmRadicadoDocumento", function () {
                    UpdateControlsSettings("FILTRO_FRM_RadicadoInternoCI", "RadicadoInternoCI", "frmRadicadoInterno", function () {
                        UpdateControlsSettings("FILTRO_FRM_RadicadoInternoAdicionalCI", "RadicadoInternoAdicionalCI", "frmRadicadoInternoAdicional", function () {
                            UpdateControlsSettings("FILTRO_FRM_RadicadoInternoDocumentoCI", "RadicadoInternoDocumentoCI", "frmRadicadoInternoDocumento", function () {
                                UpdateControlsSettings("FILTRO_FRM_RadicadoInternoRespuestaCI", "RadicadoInternoRespuestaCI", "frmRadicadoInternoRespuesta", function () {
                                    UpdateControlsSettings("FILTRO_FRM_RadicadoInternoRespuestaDocumentoCI", "RadicadoInternoRespuestaDocumentoCI", "frmRadicadoInternoRespuestaDocumento", function () {
                                        UpdateControlsSettings("FILTRO_FRM_RadicadoInternoDecisionCI", "RadicadoInternoDecisionCI", "frmRadicadoInternoDecision", function () {
                                            getDataModel();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
})

var urlDocumento = null;

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    $("#btnBotones_ImprimirPantalla").unbind("click");
    $("#btnBotones_ImprimirPantalla").click(function () {
        window.print();
        return false;
    });

    $("#btnRadicadoInternoDecision_Decision").unbind("click");
    $("#btnRadicadoInternoDecision_Decision").click(function () {
        var local = ObtenerModelo();
        SelectedCatalog = "RadicadoInternoDecision_Decision";
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#btnRadicadoInternoDecision_Area").unbind("click");
    $("#btnRadicadoInternoDecision_Area").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_Area";
        var CodigoSecretaria = $("#txtRadicadoInterno_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRadicadoInterno_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRadicadoInternoDecision_Grupo").unbind("click");
    $("#btnRadicadoInternoDecision_Grupo").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_Grupo";
        Ultimus.CargarDataCatalogo(null, null, { CodigoArea: $("#txtRadicadoInterno_CodigoRecipienteArea").val() });
    });

    $("#btnRadicadoInternoDecision_Funcionario").unbind("click");
    $("#btnRadicadoInternoDecision_Funcionario").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_Funcionario";
        var CodigoSecretaria = $("#txtRadicadoInterno_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRadicadoInterno_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRadicadoInternoDecision_Abogado").unbind("click");
    $("#btnRadicadoInternoDecision_Abogado").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_Abogado";
        var CodigoSecretaria = $("#txtRadicadoInterno_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRadicadoInterno_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRadicadoInternoDecision_AreaRespuesta").unbind("click");
    $("#btnRadicadoInternoDecision_AreaRespuesta").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_AreaRespuesta";
        var CodigoSecretaria = $("#txtRadicadoInternoRespuesta_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRadicadoInternoRespuesta_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRadicadoInternoDecision_GrupoRespuesta").unbind("click");
    $("#btnRadicadoInternoDecision_GrupoRespuesta").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_GrupoRespuesta";
        Ultimus.CargarDataCatalogo(null, null, { CodigoArea: $("#txtRadicadoInternoRespuesta_CodigoRecipienteArea").val() });
    });

    $("#btnRadicadoInternoDecision_FuncionarioRespuesta").unbind("click");
    $("#btnRadicadoInternoDecision_FuncionarioRespuesta").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_FuncionarioRespuesta";
        var CodigoSecretaria = $("#txtRadicadoInternoRespuesta_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRadicadoInternoRespuesta_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRadicadoInternoDecision_AbogadoRespuesta").unbind("click");
    $("#btnRadicadoInternoDecision_AbogadoRespuesta").click(function () {
        SelectedCatalog = "RadicadoInternoDecision_AbogadoRespuesta";
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: $("#txtRadicadoInternoRespuesta_CodigoRecipienteSecretaria").val() });
    });

    $("#btnRadicadoInterno_Entidad").unbind("click");
    $("#btnRadicadoInterno_Entidad").click(function () {
        SelectedCatalog = "RadicadoInterno_Entidad";
        var local = ObtenerModelo();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRadicadoInterno_Entidad").unbind("change");
    $("#txtRadicadoInterno_Entidad").change(function () {
        $("#hiddenRadicadoInterno_Secretaria").val("");
        $("#txtRadicadoInterno_Secretaria").val("");
        $("#frmRadicadoInterno").valid();
    });

    $("#btnRadicadoInterno_Secretaria").unbind("click");
    $("#btnRadicadoInterno_Secretaria").click(function () {
        SelectedCatalog = "RadicadoInterno_Secretaria";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenRadicadoInterno_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRadicadoInterno_Secretaria").change(function () {
        var mtzSecretaria = $(this).val().split("-");
        if (mtzSecretaria.length > 1) {
            $(this).val($(this).val().replace(mtzSecretaria[0] + "-", ""));
        }
    });

    $("#btnRadicadoInterno_SecretariaSolicitarInformaciones").unbind("click");
    $("#btnRadicadoInterno_SecretariaSolicitarInformaciones").click(function () {
        SelectedCatalog = "RadicadoInterno_SecretariaSolicitarInformaciones";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenRadicadoInterno_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRadicadoInterno_SecretariaSolicitarInformaciones").change(function () {
        var mtzSecretaria = $(this).val().split("-");
        if (mtzSecretaria.length > 1) {
            $(this).val($(this).val().replace(mtzSecretaria[0] + "-", ""));
        }
    });

    $("#btnRadicadoInternoAdicional_SecretariaSolicitarInformaciones").unbind("click");
    $("#btnRadicadoInternoAdicional_SecretariaSolicitarInformaciones").click(function () {
        SelectedCatalog = "RadicadoInternoAdicional_SecretariaSolicitarInformaciones";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenRadicadoInterno_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRadicadoInternoAdicional_SecretariaSolicitarInformaciones").change(function () {
        var mtzSecretaria = $(this).val().split("-");
        if (mtzSecretaria.length > 1) {
            $(this).val($(this).val().replace(mtzSecretaria[0] + "-", ""));
        }
    });

    $("#btnBotones_GuardarRadicado").unbind("click");
    $("#btnBotones_GuardarRadicado").click(function () {
        Radicado_Guardar();
    });

    $("#btnBotones_GuardarRadicadoRespuesta").unbind("click");
    $("#btnBotones_GuardarRadicadoRespuesta").click(function () {
        Radicado_GuardarRespuesta();
    });

    $("#btnBotones_VerDocumento").unbind("click");
    $("#btnBotones_VerDocumento").click(function () {
        VerDocumento(urlDocumento);
    });

    $("#btnBotones_ImprimirDocumento").unbind("click");
    $("#btnBotones_ImprimirDocumento").click(function () {
        if (urlDocumento != null) {
            var pwin = window.open(urlDocumento, "_blank");
            pwin.print();
        }
    });

    $("#btnBotones_VerDocumentoRespuesta").unbind("click");
    $("#btnBotones_VerDocumentoRespuesta").click(function () {
        $("#modalVerDocumentoRespuesta").modal("show");
    });

    $("#btnBotones_ImprimirDocumentoRespuesta").unbind("click");
    $("#btnBotones_ImprimirDocumentoRespuesta").click(function () {
        var src = $("#ifrDocumentoRespuesta").attr("src");
        var pwin = window.open(src, "_blank");
        pwin.print();
    });

    $("#btnRadicadoInternoDocumento_Agregar").unbind("click");
    $("#btnRadicadoInternoDocumento_Agregar").click(function () {
        var FileInputList = FileInput_Get("RadicadoInternoDocumento_Archivo");
        if (FileInputList == null || FileInputList.length == 0) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return false;
        }
        $("#txtRadicadoInternoDocumento_RutaFisicaArchivo").val(FileInputList[0].RutaFisicaArchivo);
        $("#txtRadicadoInternoDocumento_RutaVirtualArchivo").val(FileInputList[0].RutaVirtualArchivo);
        $("#txtRadicadoInternoDocumento_TamanoArchivo").val(FileInputList[0].TamanoArchivo);
        $("#txtRadicadoInternoDocumento_TituloArchivo").val(FileInputList[0].TituloArchivo);
        Grid_Add("RadicadoInternoDocumento_AnexoList", "RadicadoInternoDocumento", null);
    });

    $("#btnRadicadoInternoRespuestaDocumento_Agregar").unbind("click");
    $("#btnRadicadoInternoRespuestaDocumento_Agregar").click(function () {
        var FileInputList = FileInput_Get("RadicadoInternoRespuestaDocumento_Archivo");
        if (FileInputList == null || FileInputList.length == 0) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return false;
        }
        $("#txtRadicadoInternoRespuestaDocumento_RutaFisicaArchivo").val(FileInputList[0].RutaFisicaArchivo);
        $("#txtRadicadoInternoRespuestaDocumento_RutaVirtualArchivo").val(FileInputList[0].RutaVirtualArchivo);
        $("#txtRadicadoInternoRespuestaDocumento_TamanoArchivo").val(FileInputList[0].TamanoArchivo);
        $("#txtRadicadoInternoRespuestaDocumento_TituloArchivo").val(FileInputList[0].TituloArchivo);
        Grid_Add("RadicadoInternoRespuestaDocumento_AnexoList", "RadicadoInternoRespuestaDocumento", null);
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

    $("#btnRadicadoInterno_RadicadoInternoAdicional").unbind("click");
    $("#btnRadicadoInterno_RadicadoInternoAdicional").click(function () {
        $("#modalRadicadoInternoAdicional").modal("show");
    });

    $("#btnRadicadoInternoAdicional_Agregar").unbind("click");
    $("#btnRadicadoInternoAdicional_Agregar").click(function () {
        Grid_Add("RadicadoInternoAdicional_RadicadoInternoAdicionalList", "RadicadoInternoAdicional", null);
    });

    $("#btnRadicadoInternoAdicional_AgregarTodosJefes").unbind("click");
    $("#btnRadicadoInternoAdicional_AgregarTodosJefes").click(function () {
        var local = ObtenerModelo();
        Ultimus.AjaxPostData("{0}/CorrInterna.svc/api/Radicado_CargarTodosJefes".format(WCFUrl), local, true, false, function (data) {
            Response(data, function () {
                $("#RadicadoInternoAdicional_RadicadoInternoAdicionalList").Grid("RenderGrid", data.RadicadoInterno.RadicadoInternoAdicional);
            });
        }, "ERROR");
    });

    Grid_Init("RadicadoDocumento_AnexoList", null, true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        fila.OpcionesRadicadoDocumento = $("#OpcionesRadicadoDocumento").html();
        fila.OpcionesRadicadoDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoDocumento);
        fila.OpcionesRadicadoDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoDocumento);
    });

    Grid_Init("RadicadoInternoAntecedentes_AnexoList", null, true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        fila.OpcionesRadicadoInternoAntecedentesDocumento = $("#OpcionesRadicadoInternoAntecedentesDocumento").html();
        fila.OpcionesRadicadoInternoAntecedentesDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoInternoAntecedentesDocumento);
        fila.OpcionesRadicadoInternoAntecedentesDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoInternoAntecedentesDocumento);
    });

    Grid_Init("RadicadoInternoDocumento_AnexoList", "RadicadoInternoDocumento", true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        if (fila.Etapa == "" || fila.Etapa == null || fila.Etapa == $("#hiddenStep").val()) {
            fila.OpcionesRadicadoInternoDocumento = $("#OpcionesRadicadoInternoDocumento").html();
        } else {
            fila.OpcionesRadicadoInternoDocumento = $("#OpcionesRadicadoDocumento").html();
        }
        fila.OpcionesRadicadoInternoDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoInternoDocumento);
        fila.OpcionesRadicadoInternoDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoInternoDocumento);
    });
    FileInput_Init("RadicadoInternoDocumento_Archivo");

    Grid_Init("RadicadoInternoRespuestaDocumento_AnexoList", "RadicadoInternoRespuestaDocumento", true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        if (fila.Etapa == "" || fila.Etapa == null || fila.Etapa == $("#hiddenStep").val()) {
            fila.OpcionesRadicadoInternoRespuestaDocumento = $("#OpcionesRadicadoInternoRespuestaDocumento").html();
        } else {
            fila.OpcionesRadicadoInternoRespuestaDocumento = $("#OpcionesRadicadoDocumento").html();
        }
        fila.OpcionesRadicadoInternoRespuestaDocumento = $("#OpcionesRadicadoInternoRespuestaDocumento").html();
        fila.OpcionesRadicadoInternoRespuestaDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoInternoRespuestaDocumento);
        fila.OpcionesRadicadoInternoRespuestaDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoInternoRespuestaDocumento);
    });
    FileInput_Init("RadicadoInternoRespuestaDocumento_Archivo");

    Grid_Init("RadicadoInternoAdicional_RadicadoInternoAdicionalList", "RadicadoInternoAdicional", true, function (fila) {
        fila.OpcionesRadicadoInternoAdicional = $("#OpcionesRadicadoInternoAdicional").html();
        fila.OpcionesRadicadoInternoAdicional = replaceAll("#RutaVirtualDocumento#", fila.RutaVirtualDocumento == null ? "" : fila.RutaVirtualDocumento, fila.OpcionesRadicadoInternoAdicional);
    });

    var local = ObtenerModelo();
    Ultimus.AjaxPostData("{0}/CorrInterna.svc/api/Radicado_Cargar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            CargarFormulario(data);
        });
    }, "ERROR");
}

this.Radicado_Guardar = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmRadicadoInterno").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
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
    local.RadicadoInterno.RadicadoInternoDocumento = $("#RadicadoInternoDocumento_AnexoList").Grid("Get");
    local.RadicadoInterno.RadicadoInternoAdicional = $("#RadicadoInternoAdicional_RadicadoInternoAdicionalList").Grid("Get");
    local.RadicadoInternoRespuesta.RadicadoInternoDocumento = $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("Get");
    Ultimus.AjaxPostData("{0}/CorrInterna.svc/api/Radicado_Guardar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            if (local.CodigoSolicitud == 0) {
                var url = window.location.href.replace("co_solicitud=0", "co_solicitud={0}".format(data.RadicadoInterno.CodigoSolicitud));
                window.location = url;
            }
            else {
                CargarFormulario(data);
            }
        });
    }, "ERROR");
}

this.Radicado_GuardarRespuesta = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmRadicadoInterno").valid() || !$("#frmRadicadoInternoRespuesta").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
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
    local.RadicadoInterno.RadicadoInternoDocumento = $("#RadicadoInternoDocumento_AnexoList").Grid("Get");
    local.RadicadoInterno.RadicadoInternoAdicional = $("#RadicadoInternoAdicional_RadicadoInternoAdicionalList").Grid("Get");
    local.RadicadoInternoRespuesta.RadicadoInternoDocumento = $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("Get");
    Ultimus.AjaxPostData("{0}/CorrInterna.svc/api/Radicado_GuardarRespuesta".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            CargarFormulario(data);
        });
    }, "ERROR");
}

this.Radicado_Completar = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmRadicado").valid() || !$("#frmRadicadoInterno").valid() || !$("#frmRadicadoInternoDecision").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var CodigoDecision = $("#hiddenRadicadoInternoDecision_Decision").val();
    var ArchivarTerminar = $("#hiddenCodigoDecision_ProyectarRespuesta_ArchivarTerminar").val();
    var EnviarA = $("#hiddenCodigoDecision_ProyectarRespuesta_EnviarA").val();
    if (CodigoDecision != ArchivarTerminar && CodigoDecision != EnviarA) {
        if (!$("#frmRadicadoInternoRespuesta").valid()) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return;
        }
    }
    //if ($("#btnRadicadoInternoDecision_Firma").attr("firmado") != "1") {
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
        local.Hash = $("#lblRadicadoInternoDecision_FirmaHash").text();
        local.RadicadoInterno.RadicadoInternoDocumento = $("#RadicadoInternoDocumento_AnexoList").Grid("Get");
        local.RadicadoInterno.RadicadoInternoAdicional = $("#RadicadoInternoAdicional_RadicadoInternoAdicionalList").Grid("Get");
        local.RadicadoInternoRespuesta.RadicadoInternoDocumento = $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("Get");
        Ultimus.AjaxPostData("{0}/CorrInterna.svc/api/Radicado_Completar".format(WCFUrl), local, true, false, function (data) {
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
    if (confirm("¿Desea terminar esta solicitud?")) {
        $("#btnBotones_Descartar").prop("disabled", true);
        $("#btnBotones_Completar").prop("disabled", true);
        var local = ObtenerModelo();
        CargarRelacionCampos();
        local = RelacionCamposFramework.Guardar(local);
        local.Hash = $("#lblRadicadoInternoDecision_FirmaHash").text();
        local.RadicadoInterno.RadicadoInternoDocumento = $("#RadicadoInternoDocumento_AnexoList").Grid("Get");
        local.RadicadoInterno.RadicadoInternoAdicional = $("#RadicadoInternoAdicional_RadicadoInternoAdicionalList").Grid("Get");
        local.RadicadoInternoRespuesta.RadicadoInternoDocumento = $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("Get");
        Ultimus.AjaxPostData("{0}/CorrInterna.svc/api/Radicado_Descartar".format(WCFUrl), local, true, false, function (data) {
            $("#btnBotones_Descartar").prop("disabled", false);
            $("#btnBotones_Completar").prop("disabled", false);
            Response(data, function () {
                alert("Se ha terminado el incidente No. " + data.UltimusIncident);
                CloseForm();
            });
        }, "ERROR");
    }
}

this.CargarFormulario = function (data) {
    $("#frmRadicado").reset();
    $("#frmRadicadoInterno").reset();
    $("#frmRadicadoInternoAdicional").reset();
    $("#frmRadicadoInternoRespuesta").reset();
    CargarRelacionCampos();
    RelacionCamposFramework.Cargar(data);
    $("#frmRadicado").valid();
    $("#frmRadicadoInterno").valid();
    $("#frmRadicadoInternoAdicional").valid();
    $("#frmRadicadoInternoRespuesta").valid();
    if (data.Radicado != null) {
        $("#RadicadoDocumento_AnexoList").Grid("RenderGrid", data.Radicado.RadicadoDocumento);
    }
    if (data.RadicadoInterno != null) {
        urlDocumento = data.RadicadoInterno.RutaVirtualDocumento;
        $("#RadicadoInternoAdicional_RadicadoInternoAdicionalList").Grid("RenderGrid", data.RadicadoInterno.RadicadoInternoAdicional);
        $("#RadicadoInternoDocumento_AnexoList").Grid("RenderGrid", data.RadicadoInterno.RadicadoInternoDocumento);
    }
    if (data.RadicadoInternoAntecedentes != null) {
        $("#RadicadoInternoAntecedentes_AnexoList").Grid("RenderGrid", data.RadicadoInternoAntecedentes.RadicadoInternoDocumento);
    }
    if (data.RadicadoInternoRespuesta != null) {
        if (data.RadicadoInternoRespuesta.RutaVirtualDocumento != null) {
            $("#ifrDocumentoRespuesta").prop("src", data.RadicadoInternoRespuesta.RutaVirtualDocumento);
        }
        $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("RenderGrid", data.RadicadoInternoRespuesta.RadicadoInternoDocumento);
    }
    EvaluarEstadosControlesFramework();
}

this.VerDocumento = function (url) {
    if (url != null && url != "") {
        $("#ifrDocumento").attr("src", url);
        $("#modalVerDocumento").modal("show");
    }
}
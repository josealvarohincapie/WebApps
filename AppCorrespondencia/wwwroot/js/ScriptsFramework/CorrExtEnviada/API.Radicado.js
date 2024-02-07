$("#frmRadicado").EnableValidationToolTip();
$("#frmRespuesta").EnableValidationToolTip();
$("#frmRespuestaAdicional").EnableValidationToolTip();
$("#frmRespuestaDocumento").EnableValidationToolTip();
$("#frmRespuestaDecision").EnableValidationToolTip();

jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_BotonesEE", "BotonesEE", "frmBotones", function () {
        UpdateControlsSettings("FILTRO_FRM_RadicadoEE", "RadicadoEE", "frmRadicado", function () {
            UpdateControlsSettings("FILTRO_FRM_RadicadoDocumentoEE", "RadicadoDocumentoEE", "frmRadicadoDocumento", function () {
                UpdateControlsSettings("FILTRO_FRM_RadicadoInternoDocumentoEE", "RadicadoInternoDocumentoEE", "frmRadicadoInternoDocumento", function () {
                    UpdateControlsSettings("FILTRO_FRM_RadicadoInternoRespuestaDocumentoEE", "RadicadoInternoRespuestaDocumentoEE", "frmRadicadoInternoRespuestaDocumento", function () {
                        UpdateControlsSettings("FILTRO_FRM_RespuestaEE", "RespuestaEE", "frmRespuesta", function () {
                            UpdateControlsSettings("FILTRO_FRM_RespuestaDocumentoEE", "RespuestaDocumentoEE", "frmRespuestaDocumento", function () {
                                UpdateControlsSettings("FILTRO_FRM_RespuestaAdicionalEE", "RespuestaAdicionalEE", "frmRespuestaAdicional", function () {
                                    UpdateControlsSettings("FILTRO_FRM_RespuestaDecisionEE", "RespuestaDecisionEE", "frmRespuestaDecision", function () {
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
})

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();
    
    $("#btnBotones_ImprimirPantalla").unbind("click");
    $("#btnBotones_ImprimirPantalla").click(function () {
        window.print();
        return false;
    });

    $("#btnRespuestaDecision_Decision").unbind("click");
    $("#btnRespuestaDecision_Decision").click(function () {
        var local = ObtenerModelo();
        SelectedCatalog = "RespuestaDecision_Decision";
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#btnRespuestaDecision_Abogado").unbind("click");
    $("#btnRespuestaDecision_Abogado").click(function () {
        SelectedCatalog = "RespuestaDecision_Abogado";
        var CodigoSecretaria = $("#txtRespuesta_CodigoRecipienteSecretaria").val();
        if (CodigoSecretaria == "")
            CodigoSecretaria = $("#hiddenRespuesta_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRespuestaDecision_Firmar").unbind("click");
    $("#btnRespuestaDecision_Firmar").click(function () {
        Radicado_Firmar();
    });
    
    $("#btnRespuesta_Defensor").unbind("click");
    $("#btnRespuesta_Defensor").click(function () {
        SelectedCatalog = "Respuesta_Defensor";
        var CodigoSecretaria = $("#hiddenRespuesta_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSecretaria: CodigoSecretaria });
    });

    $("#btnRespuesta_Formato").unbind("click");
    $("#btnRespuesta_Formato").click(function () {
        SelectedCatalog = "Respuesta_Formato";
        var CodigoTipoDocumento = $("#txtRespuesta_CodigoTipoDocumento").val();
        var CodigoSubTipoDocumento = $("#txtRespuesta_CodigoSubTipoDocumento").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoTipoDocumento: CodigoTipoDocumento, CodigoSubTipoDocumento: CodigoSubTipoDocumento });
    });

    $("#btnRespuestaAdicional_SolicitudOriginal").unbind("click");
    $("#btnRespuestaAdicional_SolicitudOriginal").click(function () {
        SelectedCatalog = "RespuestaAdicional_SolicitudOriginal";
        var CodigoSolicitudOriginal = $("#hiddenCodigoSolicitudOriginal").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoSolicitudOriginal: CodigoSolicitudOriginal });
    });

    $("#txtRespuestaAdicional_SolicitudOriginal").change(function () {
        var valor = $(this).val().replace(/\<br>/g,' - ');
        $(this).val(valor);
    });

    $("#btnBotones_GuardarRadicado").unbind("click");
    $("#btnBotones_GuardarRadicado").click(function () {
        Radicado_Guardar();
    });

    $("#btnBotones_VerDocumento").unbind("click");
    $("#btnBotones_VerDocumento").click(function () {
        $("#modalVerDocumento").modal("show");
    });

    $("#btnBotones_ImprimirDocumento").unbind("click");
    $("#btnBotones_ImprimirDocumento").click(function () {
        var src = $("#ifrDocumento").attr("src");
        if (src != null) {
            var pwin = window.open(src, "_blank");
            pwin.print();
        }
    });

    $("#btnRespuestaDocumento_Agregar").unbind("click");
    $("#btnRespuestaDocumento_Agregar").click(function () {
        var FileInputList = FileInput_Get("RespuestaDocumento_Archivo");
        if (FileInputList == null || FileInputList.length == 0) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return false;
        }
        $("#txtRespuestaDocumento_RutaFisicaArchivo").val(FileInputList[0].RutaFisicaArchivo);
        $("#txtRespuestaDocumento_RutaVirtualArchivo").val(FileInputList[0].RutaVirtualArchivo);
        $("#txtRespuestaDocumento_TamanoArchivo").val(FileInputList[0].TamanoArchivo);
        $("#txtRespuestaDocumento_TituloArchivo").val(FileInputList[0].TituloArchivo);
        Grid_Add("RespuestaDocumento_AnexoList", "RespuestaDocumento", null);
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

    $("#btnRespuesta_Entidad").unbind("click");
    $("#btnRespuesta_Entidad").click(function () {
        SelectedCatalog = "Respuesta_Entidad";
        var local = ObtenerModelo();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtRespuesta_Entidad").unbind("change");
    $("#txtRespuesta_Entidad").change(function () {
        $("#hiddenRespuesta_Secretaria").val("");
        $("#txtRespuesta_Secretaria").val("");
        $("#frmRespuesta").valid();
    });

    $("#btnRespuesta_Secretaria").unbind("click");
    $("#btnRespuesta_Secretaria").click(function () {
        SelectedCatalog = "Respuesta_Secretaria";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenRespuesta_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#btnRespuesta_Finalizacion").unbind("click");
    $("#btnRespuesta_Finalizacion").click(function () {
        SelectedCatalog = "Respuesta_Finalizacion";
        var CodigoTipoDocumento = $("#txtRespuesta_CodigoTipoDocumento").val();
        var CodigoSubTipoDocumento = $("#txtRespuesta_CodigoSubTipoDocumento").val();
        Ultimus.CargarDataCatalogo(null, null, { CodigoTipoDocumento: CodigoTipoDocumento, CodigoSubTipoDocumento: CodigoSubTipoDocumento });
    });
    

    $("#txtRespuesta_Secretaria").change(function () {
        var mtzSecretaria = $(this).val().split("-");
        if (mtzSecretaria.length > 1) {
            $(this).val($(this).val().replace(mtzSecretaria[0] + "-", ""));
        }
    });

    $("#btnRespuesta_RespuestaAdicional").unbind("click");
    $("#btnRespuesta_RespuestaAdicional").click(function () {
        $("#modalRespuestaAdicional").modal("show");
    });

    $("#btnRespuestaAdicional_Agregar").unbind("click");
    $("#btnRespuestaAdicional_Agregar").click(function () {
        Grid_Add("RespuestaAdicional_RespuestaAdicionalList", "RespuestaAdicional", null);
    });

    Grid_Init("RadicadoDocumento_AnexoList", null, true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        fila.OpcionesRadicadoDocumento = $("#OpcionesRadicadoDocumento").html();
        fila.OpcionesRadicadoDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoDocumento);
        fila.OpcionesRadicadoDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoDocumento);
    });

    Grid_Init("RadicadoInternoDocumento_AnexoList", "RadicadoInternoDocumento", true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        fila.OpcionesRadicadoInternoDocumento = $("#OpcionesRadicadoInternoDocumento").html();
        fila.OpcionesRadicadoInternoDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoInternoDocumento);
        fila.OpcionesRadicadoInternoDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoInternoDocumento);
    });

    Grid_Init("RadicadoInternoRespuestaDocumento_AnexoList", "RadicadoInternoRespuestaDocumento", true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        fila.OpcionesRadicadoInternoRespuestaDocumento = $("#OpcionesRadicadoInternoRespuestaDocumento").html();
        fila.OpcionesRadicadoInternoRespuestaDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRadicadoInternoRespuestaDocumento);
        fila.OpcionesRadicadoInternoRespuestaDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRadicadoInternoRespuestaDocumento);
    });

    Grid_Init("RespuestaDocumento_AnexoList", "RespuestaDocumento", true, function (fila) {
        fila.TamanoArchivoFormatted = CustomNumberFormat(fila.TamanoArchivo);
        fila.FechaCreacionFormatted = fila.FechaCreacion == this.undefined ? null : FormatDateTime(fila.FechaCreacion, true);
        fila.NombreUsuarioCreacion = fila.NombreUsuarioCreacion == this.undefined ? null : fila.NombreUsuarioCreacion;
        if (fila.Etapa == "" || fila.Etapa == null || fila.Etapa == $("#hiddenStep").val()) {
            fila.OpcionesRespuestaDocumento = $("#OpcionesRespuestaDocumento").html();
        } else {
            fila.OpcionesRespuestaDocumento = $("#OpcionesRadicadoDocumento").html();
        }
        fila.OpcionesRespuestaDocumento = replaceAll("#RutaVirtualArchivo#", fila.RutaVirtualArchivo, fila.OpcionesRespuestaDocumento);
        fila.OpcionesRespuestaDocumento = replaceAll("#CodigoDocumento#", fila.CodigoDocumento, fila.OpcionesRespuestaDocumento);
    });
    FileInput_Init("RespuestaDocumento_Archivo");

    Grid_Init("RespuestaAdicional_RespuestaAdicionalList", "RespuestaAdicional", true, function (fila) { });

    var local = ObtenerModelo();
    Ultimus.AjaxPostData("{0}/CorrExtEnviada.svc/api/Radicado_Cargar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            CargarFormulario(data);
        });
    }, "ERROR");
}

this.Radicado_Guardar = function () {
    if (IsDoubleClicked($(this))) return;

    $(":input").each(function () {
        if (!$(this).is(":hidden")) {
            this.value = this.value.toUpperCase();
        }
    });

    if (!$("#frmRespuesta").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    local.Radicado.RadicadoDocumento = $("#RadicadoDocumento_AnexoList").Grid("Get");
    local.RadicadoInterno = {};
    local.RadicadoInterno.RadicadoInternoDocumento = $("#RadicadoInternoDocumento_AnexoList").Grid("Get");
    local.RadicadoInternoRespuesta = {};
    local.RadicadoInternoRespuesta.RadicadoInternoDocumento = $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("Get");
    local.Respuesta.RespuestaDocumento = $("#RespuestaDocumento_AnexoList").Grid("Get");
    local.Respuesta.RespuestaAdicional = $("#RespuestaAdicional_RespuestaAdicionalList").Grid("Get");
    Ultimus.AjaxPostData("{0}/CorrExtEnviada.svc/api/Radicado_Guardar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            if (local.CodigoSolicitud == 0) {
                var url = window.location.href.replace("co_solicitud=0", "co_solicitud={0}".format(data.Respuesta.CodigoSolicitud));
                window.location = url;
            }
            else {
                CargarFormulario(data);
            }
        });
    }, "ERROR");
}

this.Radicado_Completar = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmRespuesta").valid() || !$("#frmRespuestaDecision").valid()) {
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
    if (local.UltimusStep == "Aprobar") {
        if ($("#btnRespuestaDecision_Firma").attr("firmado") != "1" && $("#ddlRespuestaDecision_TipoFirma").val() == 1) {
            toastr.warning(MensajeFirmarFormulario, Message_Warning);
            return;
        }
    }
    if (confirm("¿Desea enviar esta solicitud a la siguiente etapa?")) {
        $("#btnBotones_Descartar").prop("disabled", true);
        $("#btnBotones_Completar").prop("disabled", true);
        local.Hash = $("#lblRespuestaDecision_FirmaHash").text();
        local.Radicado.RadicadoDocumento = $("#RadicadoDocumento_AnexoList").Grid("Get");
        local.RadicadoInterno = {};
        local.RadicadoInterno.RadicadoInternoDocumento = $("#RadicadoInternoDocumento_AnexoList").Grid("Get");
        local.RadicadoInternoRespuesta = {};
        local.RadicadoInternoRespuesta.RadicadoInternoDocumento = $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("Get");
        local.Respuesta.RespuestaDocumento = $("#RespuestaDocumento_AnexoList").Grid("Get");
        local.Respuesta.RespuestaAdicional = $("#RespuestaAdicional_RespuestaAdicionalList").Grid("Get");
        Ultimus.AjaxPostData("{0}/CorrExtEnviada.svc/api/Radicado_Completar".format(WCFUrl), local, true, false, function (data) {
            $("#btnBotones_Descartar").prop("disabled", false);
            $("#btnBotones_Completar").prop("disabled", false);
            Response(data, function () {
                if (local.UltimusIncident == 0) {
                    alert("Se ha generado el incidente No. " + data.UltimusIncident);
                    CloseForm();
                }
                else {
                    if (local.UltimusStep == "Aprobar") {
                        if (local.RespuestaDecision.CodigoTipoFirma == 2) {
                            $("#ifrFirmarDocumento").prop("src", 'about:blank');
                            setTimeout(function () {
                                $("#ifrFirmarDocumento").prop("src", data.Respuesta.UrlParaFirma);
                                $("#modalFirmarDocumento").modal("show");
                                $("#modalFirmarDocumento").on("hidden.bs.modal", function () {
                                    CloseForm();
                                });
                            }, 100);
                        } else {
                            alert("Se ha completado el incidente No. " + data.UltimusIncident);
                            CloseForm();
                        }                      
                    } else {
                        alert("Se ha completado el incidente No. " + data.UltimusIncident);
                        CloseForm();
                    }
                }
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
        local.Hash = $("#lblRespuestaDecision_FirmaHash").text();
        local.Radicado.RadicadoDocumento = $("#RadicadoDocumento_AnexoList").Grid("Get");
        local.RadicadoInterno = {};
        local.RadicadoInterno.RadicadoInternoDocumento = $("#RadicadoInternoDocumento_AnexoList").Grid("Get");
        local.RadicadoInternoRespuesta = {};
        local.RadicadoInternoRespuesta.RadicadoInternoDocumento = $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("Get");
        local.Respuesta.RespuestaDocumento = $("#RespuestaDocumento_AnexoList").Grid("Get");
        local.Respuesta.RespuestaAdicional = $("#RespuestaAdicional_RespuestaAdicionalList").Grid("Get");
        Ultimus.AjaxPostData("{0}/CorrExtEnviada.svc/api/Radicado_Descartar".format(WCFUrl), local, true, false, function (data) {
            $("#btnBotones_Descartar").prop("disabled", false);
            $("#btnBotones_Completar").prop("disabled", false);
            Response(data, function () {
                alert("Se ha descartado el incidente No. " + data.UltimusIncident);
                CloseForm();
            });
        }, "ERROR");
    }
}

this.Radicado_Firmar = function () {
    if (IsDoubleClicked($(this))) return;
    if (confirm("¿Seguro que desea aprobar y firmar digitalmente esta solicitud?")) {
        $("#btnRespuestaDecision_Firmar").prop("disabled", true);
        $("#btnBotones_Completar").prop("disabled", true);
        var local = ObtenerModelo();
        CargarRelacionCampos();
        local = RelacionCamposFramework.Guardar(local);
        Ultimus.AjaxPostData("{0}/CorrExtEnviada.svc/api/Radicado_Firmar".format(WCFUrl), local, true, false, function (data) {
            $("#btnRespuestaDecision_Firmar").prop("disabled", false);
            $("#btnBotones_Completar").prop("disabled", false);
            Response(data, function () {
                $("#ifrFirmarDocumento").prop("src", 'about:blank');
                setTimeout(function () {
                    $("#ifrFirmarDocumento").prop("src", data.Respuesta.UrlParaFirma);
                    $("#modalFirmarDocumento").modal("show");
                    $("#modalFirmarDocumento").on("hidden.bs.modal", function () {
                        CloseForm();
                    });
                }, 100); 
            });
        }, "ERROR");
    }
}


this.CargarFormulario = function (data) {
    if (data.Radicado == null) {
        $("#liRecibido").hide();
        $("#frmRadicadoDocumento").hide();
    }
    if (data.RadicadoInterno == null) {
        $("#frmRadicadoInternoDocumento").hide();
    }
    if (data.RadicadoInternoRespuesta == null) {
        $("#frmRadicadoInternoRespuestaDocumento").hide();
    }
    $("#frmRadicado").reset();
    $("#frmRespuesta").reset();
    CargarRelacionCampos();
    RelacionCamposFramework.Cargar(data);
    if (data.Radicado != null) {
        $("#txtRadicado_Remitente").val(data.Radicado.Remitente);
    }
    $("#frmRadicado").valid();
    $("#frmRespuesta").valid();
    $("#frmRespuestaAdicional").valid();
    if (data.Respuesta != null && data.Respuesta.RutaVirtualDocumento != null) {
        $("#ifrDocumento").prop("src", data.Respuesta.RutaVirtualDocumento);
    }
    if (data.Radicado != null) {
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
        $("#RadicadoDocumento_AnexoList").Grid("RenderGrid", data.Radicado.RadicadoDocumento);
        if (data.Radicado.CorreoFuente != null) {
            $("#Radicado_CuerpoCorreoFuente").html(data.Radicado.CorreoFuente.Cuerpo);
        }
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
    }
    if (data.Respuesta != null) {
        $("#RespuestaAdicional_RespuestaAdicionalList").Grid("RenderGrid", data.Respuesta.RespuestaAdicional);
        $("#RespuestaDocumento_AnexoList").Grid("RenderGrid", data.Respuesta.RespuestaDocumento);
    }
    if (data.RadicadoInterno != null) {
        $("#RadicadoInternoDocumento_AnexoList").Grid("RenderGrid", data.RadicadoInterno.RadicadoInternoDocumento);
    }
    if (data.RadicadoInternoRespuesta != null) {
        $("#RadicadoInternoRespuestaDocumento_AnexoList").Grid("RenderGrid", data.RadicadoInternoRespuesta.RadicadoInternoDocumento);
    }
    
    EvaluarEstadosControlesFramework();
}
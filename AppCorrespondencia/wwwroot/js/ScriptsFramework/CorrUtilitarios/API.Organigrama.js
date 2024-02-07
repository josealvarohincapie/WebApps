$("#frmOrganigrama").EnableValidationToolTip();
$("#frmOrganigramaEntidad").EnableValidationToolTip();
$("#frmOrganigramaSecretaria").EnableValidationToolTip();
$("#frmOrganigramaUsuario").EnableValidationToolTip();

var OrganigramaUsuarioList = null;

jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_Organigrama", "Organigrama", "frmOrganigrama", function () {
        UpdateControlsSettings("FILTRO_FRM_OrganigramaEntidad", "OrganigramaEntidad", "frmOrganigramaEntidad", function () {
            UpdateControlsSettings("FILTRO_FRM_OrganigramaSecretaria", "OrganigramaSecretaria", "frmOrganigramaSecretaria", function () {
                UpdateControlsSettings("FILTRO_FRM_OrganigramaUsuario", "OrganigramaUsuario", "frmOrganigramaUsuario", function () {
                    getDataModel();
                });
            });
        });
    });
})

this.getDataModel = function () {
    $("#btnOrganigrama_AgregarEntidad").unbind("click");
    $("#btnOrganigrama_AgregarEntidad").click(function () {
        AbrirModalEntidad(null);
    });

    $("#btnOrganigrama_AgregarSecretaria").unbind("click");
    $("#btnOrganigrama_AgregarSecretaria").click(function () {
        AbrirModalSecretaria(null);
    });

    $("#btnOrganigrama_Entidad").unbind("click");
    $("#btnOrganigrama_Entidad").click(function () {
        SelectedCatalog = "Organigrama_Entidad";
        var local = ObtenerModelo();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtOrganigrama_Entidad").unbind("change");
    $("#txtOrganigrama_Entidad").change(function () {
        $("#hiddenOrganigrama_Secretaria").val("");
        $("#txtOrganigrama_Secretaria").val("");
        $("#hiddenOrganigrama_Grupo").val("");
        $("#txtOrganigrama_Grupo").val("");
        $("#frmOrganigrama").valid();
        $("#Organigrama_OrganigramaUsuarioList").Grid("RenderGrid", null);
        OrganigramaUsuarioList = null;
    });

    $("#btnOrganigrama_Secretaria").unbind("click");
    $("#btnOrganigrama_Secretaria").click(function () {
        SelectedCatalog = "Organigrama_Secretaria";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenOrganigrama_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtOrganigrama_Secretaria").unbind("change");
    $("#txtOrganigrama_Secretaria").change(function () {
        $("#hiddenOrganigrama_Grupo").val("");
        $("#txtOrganigrama_Grupo").val("");
        $("#frmOrganigrama").valid();
        $("#Organigrama_OrganigramaUsuarioList").Grid("RenderGrid", null);
        OrganigramaUsuarioList = null;
    });

    $("#btnOrganigrama_Grupo").unbind("click");
    $("#btnOrganigrama_Grupo").click(function () {
        SelectedCatalog = "Organigrama_Grupo";
        var local = ObtenerModelo();
        local.CodigoEntidad = $("#hiddenOrganigrama_Entidad").val();
        local.CodigoSecretaria = $("#hiddenOrganigrama_Secretaria").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtOrganigrama_Grupo").unbind("change");
    $("#txtOrganigrama_Grupo").change(function () {
        $("#Organigrama_OrganigramaUsuarioList").Grid("RenderGrid", null);
        OrganigramaUsuarioList = null;
    });

    $("#btnOrganigrama_EditarEntidad").unbind("click");
    $("#btnOrganigrama_EditarEntidad").click(function () {
        var local = ObtenerModelo();
        local.OrganigramaEntidad = {};
        local.OrganigramaEntidad.CodigoEntidad = $("#hiddenOrganigrama_Entidad").val();
        local.OrganigramaEntidad.NombreEntidad = $("#txtOrganigrama_Entidad").val();
        if (local.OrganigramaEntidad.CodigoEntidad == "") {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return;
        }
        Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_ObtenerEntidad".format(WCFUrl), local, true, false, function (data) {
            Response(data, function () {
                AbrirModalEntidad(data);
            });
        }, "ERROR");
    });

    $("#btnOrganigrama_EditarSecretaria").unbind("click");
    $("#btnOrganigrama_EditarSecretaria").click(function () {
        var local = ObtenerModelo();
        local.OrganigramaSecretaria = {};
        local.OrganigramaSecretaria.CodigoSecretaria = $("#hiddenOrganigrama_Secretaria").val();
        local.OrganigramaSecretaria.NombreSecretaria = $("#txtOrganigrama_Secretaria").val();
        if (local.OrganigramaSecretaria.CodigoSecretaria == "") {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return;
        }
        Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_ObtenerSecretaria".format(WCFUrl), local, true, false, function (data) {
            Response(data, function () {
                AbrirModalSecretaria(data);
            });
        }, "ERROR");
    });

    $("#btnOrganigrama_AgregarUsuario").unbind("click");
    $("#btnOrganigrama_AgregarUsuario").click(function () {
        if (!$("#frmOrganigrama").valid()) {
            toastr.warning(MensajeValidarFormulario, Message_Warning);
            return;
        }
        $("#frmOrganigramaUsuario").reset();
        $("#frmOrganigramaUsuario").valid();
        EvaluarEstadosControlesFramework();
        $("#modalOrganigramaUsuario").modal("show");
    });

    $("#btnOrganigrama_Cargar").unbind("click");
    $("#btnOrganigrama_Cargar").click(function () {
        Obtener();
    });

    $("#btnOrganigramaEntidad_Guardar").unbind("click");
    $("#btnOrganigramaEntidad_Guardar").click(function () {
        GuardarEntidad();
    });

    $("#btnOrganigramaSecretaria_Guardar").unbind("click");
    $("#btnOrganigramaSecretaria_Guardar").click(function () {
        GuardarSecretaria();
    });

    $("#btnOrganigramaUsuario_Usuario").unbind("click");
    $("#btnOrganigramaUsuario_Usuario").click(function () {
        SelectedCatalog = "OrganigramaUsuario_Usuario";
        var local = ObtenerModelo();
        local.NombreEntidad = $("#txtOrganigrama_Entidad").val();
        Ultimus.CargarDataCatalogo(null, null, local);
    });

    $("#txtOrganigramaUsuario_Usuario").unbind("change");
    $("#txtOrganigramaUsuario_Usuario").change(function () {
        var local = ObtenerModelo();
        CargarRelacionCampos();
        local = RelacionCamposFramework.Guardar(local);
        Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_ObtenerUsuarioDirectorioActivo".format(WCFUrl), local, true, false, function (data) {
            Response(data, function () {
                data.OrganigramaUsuario.CodigoUsuario = null;
                CargarRelacionCampos();
                RelacionCamposFramework.Cargar(data);
                $("#frmOrganigrama").valid();
            });
            ENDREQUEST();
        }, "ERROR");
    });

    $("#btnOrganigramaUsuario_Guardar").unbind("click");
    $("#btnOrganigramaUsuario_Guardar").click(function () {
        GuardarUsuario();
    });

    Grid_Init("Organigrama_OrganigramaUsuarioList", null, false, function (fila) {
        fila.OpcionesRadicadoDocumento = $("#OpcionesOrganigramaUsuario").html();
        fila.OpcionesRadicadoDocumento = replaceAll("#CodigoUsuario#", fila.CodigoUsuario, fila.OpcionesRadicadoDocumento);
        fila.OpcionesRadicadoDocumento = replaceAll("#NombreUsuario#", fila.NombreUsuario, fila.OpcionesRadicadoDocumento);
    });

    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_Obtener".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#frmOrganigrama").reset();
            CargarRelacionCampos();
            RelacionCamposFramework.Cargar(data);
            $("#frmOrganigrama").valid();
        });
        ENDREQUEST();
        SetearAccordion();
    }, "ERROR");
}

this.AbrirModalEntidad = function (model) {
    $("#frmOrganigramaEntidad").reset();
    CargarRelacionCampos("OrganigramaEntidad");
    RelacionCamposFramework.Cargar(model);
    $("#frmOrganigramaEntidad").valid();
    EvaluarEstadosControlesFramework();
    $("#modalOrganigramaEntidad").modal("show");
}

this.AbrirModalSecretaria = function (model) {
    $("#frmOrganigramaSecretaria").reset();
    CargarRelacionCampos("OrganigramaSecretaria");
    RelacionCamposFramework.Cargar(model);
    $("#frmOrganigramaSecretaria").valid();
    EvaluarEstadosControlesFramework();
    $("#modalOrganigramaSecretaria").modal("show");
}

this.AbrirModalUsuario = function (model) {
    $("#frmOrganigramaUsuario").reset();
    CargarRelacionCampos("OrganigramaUsuario");
    RelacionCamposFramework.Cargar(model);
    $("#frmOrganigramaUsuario").valid();
    EvaluarEstadosControlesFramework();
    $("#modalOrganigramaUsuario").modal("show");
}

this.Obtener = function () {
    if (!$("#frmOrganigrama").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_Obtener".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#Organigrama_OrganigramaUsuarioList").Grid("RenderGrid", data.OrganigramaUsuarioList);
            OrganigramaUsuarioList = data.OrganigramaUsuarioList;
        });
    }, "ERROR");
}

this.EditarUsuario = function (CodigoUsuario, NombreUsuario) {
    var local = ObtenerModelo();
    local.OrganigramaUsuario = {};
    local.OrganigramaUsuario.CodigoUsuario = CodigoUsuario;
    local.OrganigramaUsuario.NombreUsuario = NombreUsuario;
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_ObtenerUsuario".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            AbrirModalUsuario(data);
        });
    }, "ERROR");
}

this.RemoverUsuario = function (CodigoUsuario, NombreUsuario) {
    if (confirm("¿Desea remover este usuario?")) {
        var local = ObtenerModelo();
        CargarRelacionCampos();
        local = RelacionCamposFramework.Guardar(local);
        local.OrganigramaUsuario.CodigoUsuario = CodigoUsuario;
        local.OrganigramaUsuario.NombreUsuario = NombreUsuario;
        Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_RemoverUsuario".format(WCFUrl), local, true, false, function (data) {
            Response(data, function () {
                $("#Organigrama_OrganigramaUsuarioList").Grid("RenderGrid", data.OrganigramaUsuarioList);
                OrganigramaUsuarioList = data.OrganigramaUsuarioList;
            });
        }, "ERROR");
    }
}

this.GuardarEntidad = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmOrganigramaEntidad").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_GuardarEntidad".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#modalOrganigramaEntidad").modal("hide");
        });
    }, "ERROR");
}

this.GuardarSecretaria = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmOrganigramaSecretaria").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_GuardarSecretaria".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#modalOrganigramaSecretaria").modal("hide");
        });
    }, "ERROR");
}

this.GuardarUsuario = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmOrganigramaUsuario").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Organigrama_GuardarUsuario".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#modalOrganigramaUsuario").modal("hide");
            $("#Organigrama_OrganigramaUsuarioList").Grid("RenderGrid", data.OrganigramaUsuarioList);
            OrganigramaUsuarioList = data.OrganigramaUsuarioList;
        });
    }, "ERROR");
}
$("#frmValidarRadicado").EnableValidationToolTip();

jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_ValidarRadicado", "ValidarRadicado", "frmValidarRadicado", function () {
        getDataModel();
    });
})

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    $("#btnBotones_ValidarRadicado").unbind("click");
    $("#btnBotones_ValidarRadicado").click(function () {
        ValidarRadicado();
    });

    FileInput_Init("ValidarRadicado_Archivo");
}

this.ValidarRadicado = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmValidarRadicado").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }
    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/ValidarRadicado_Validar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            CargarFormulario(data);
        });
    }, "ERROR");
}

this.CargarFormulario = function (data) {
    $("#frmValidarRadicado").reset();
    CargarRelacionCampos();
    RelacionCamposFramework.Cargar(data);
    $("#frmValidarRadicado").valid();
    EvaluarEstadosControlesFramework();
}
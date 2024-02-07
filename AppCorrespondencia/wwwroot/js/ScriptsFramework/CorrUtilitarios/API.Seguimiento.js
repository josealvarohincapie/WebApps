$("#frmSeguimiento").EnableValidationToolTip();

jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_Seguimiento", "Seguimiento", "frmSeguimiento", function () {
        getDataModel();
    });
})

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    $("#btnBotones_Seguimiento").unbind("click");
    $("#btnBotones_Seguimiento").click(function () {
        Seguimiento();
    });

    Grid_Init("Seguimiento_SeguimientoDecisionList", null, false, function (fila) {
        fila.FechaInicioHtml = FormatDateTime(fila.FechaInicio, true);
        fila.FechaFinHtml = fila.FechaFin == null ? null : FormatDateTime(fila.FechaFin, true);
    });
}

this.Seguimiento = function () {
    if (IsDoubleClicked($(this))) return;
    if (!$("#frmSeguimiento").valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return;
    }

    var local = ObtenerModelo();
    CargarRelacionCampos();
    local = RelacionCamposFramework.Guardar(local);
    Ultimus.AjaxPostData("{0}/CorrUtilitarios.svc/api/Seguimiento_Obtener".format(WCFUrl), local, true, false, function (data) {

        local.Seguimiento.Resultado = false;
        local.Seguimiento.SeguimientoDecisionList = null;
        CargarFormulario(local);

        Response(data, function () {
            CargarFormulario(data);
        });
    }, "ERROR");
}

this.CargarFormulario = function (data) {
    $("#frmSeguimiento").reset();
    CargarRelacionCampos();
    RelacionCamposFramework.Cargar(data);
    $("#frmSeguimiento").valid();
    EvaluarEstadosControlesFramework();
}
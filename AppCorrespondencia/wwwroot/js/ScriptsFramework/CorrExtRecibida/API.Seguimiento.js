jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_BotonesER", "BotonesER", "frmBotones", function () {
        UpdateControlsSettings("FILTRO_FRM_RadicadoDecisionER", "RadicadoDecisionER", "frmRadicadoDecision", function () {
            getDataModel();
        });
    });
})

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    Grid_Init("RadicadoDecision_DecisionList", null, false, function (fila) {
        fila.FechaInicio = FormatDateTime(fila.FechaInicio, true);
        fila.FechaFin = FormatDateTime(fila.FechaFin, true);
    });

    var local = ObtenerModelo();
    Ultimus.AjaxPostData("{0}/CorrExtRecibida.svc/api/Seguimiento_Cargar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            $("#RadicadoDecision_DecisionList").Grid("RenderGrid", data.RadicadoDecisionList);
        });
    }, "ERROR");
}
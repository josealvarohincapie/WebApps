jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_BotonesCI", "BotonesCI", "frmBotones", function () {
        UpdateControlsSettings("FILTRO_FRM_RadicadoInternoDecisionCI", "RadicadoInternoDecisionCI", "frmRadicadoInternoDecision", function () {
            getDataModel();
        });
    });
})

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    Grid_Init("RadicadoInternoDecision_DecisionList", null, false, function (fila) {
        fila.FechaInicio = FormatDateTime(fila.FechaInicio, true);
        fila.FechaFin = FormatDateTime(fila.FechaFin, true);
    });

    var local = ObtenerModelo();
    Ultimus.AjaxPostData("{0}/CorrInterna.svc/api/Seguimiento_Cargar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            var newArray = $.merge(data.RadicadoDecisionList == null ? [] : data.RadicadoDecisionList, data.RadicadoInternoDecisionList == null ? [] : data.RadicadoInternoDecisionList);
            $("#RadicadoInternoDecision_DecisionList").Grid("RenderGrid", newArray);
        });
    }, "ERROR");
}
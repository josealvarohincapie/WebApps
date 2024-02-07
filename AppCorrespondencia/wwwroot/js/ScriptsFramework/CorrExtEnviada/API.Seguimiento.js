jQuery(document).ready(function () {
    UpdateControlsSettings("FILTRO_FRM_BotonesEE", "BotonesEE", "frmBotones", function () {
        UpdateControlsSettings("FILTRO_FRM_RespuestaDecisionEE", "RespuestaDecisionEE", "frmRespuestaDecision", function () {
            getDataModel();
        });
    });
})

this.getDataModel = function () {
    ENDREQUEST();
    SetearAccordion();

    Grid_Init("RespuestaDecision_DecisionList", null, false, function (fila) {
        fila.FechaInicio = FormatDateTime(fila.FechaInicio, true);
        fila.FechaFin = FormatDateTime(fila.FechaFin, true);
    });

    var local = ObtenerModelo();
    Ultimus.AjaxPostData("{0}/CorrExtEnviada.svc/api/Seguimiento_Cargar".format(WCFUrl), local, true, false, function (data) {
        Response(data, function () {
            var newArray = $.merge(data.RadicadoDecisionList == null ? [] : data.RadicadoDecisionList, data.RadicadoInternoDecisionList == null ? [] : data.RadicadoInternoDecisionList);
            var newArray2 = $.merge(newArray, data.RespuestaDecisionList == null ? [] : data.RespuestaDecisionList);
            $("#RespuestaDecision_DecisionList").Grid("RenderGrid", newArray2);
        });
    }, "ERROR");
}
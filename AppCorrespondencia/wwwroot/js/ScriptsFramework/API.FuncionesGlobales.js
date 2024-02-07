var WebUrl = $("#hiddenWebUrl").val();
var WCFUrl = $("#hiddenWCFUrl").val();

var ButtonSwicthGuardado = function (Valor) { return (IsNullOrEmpty(Valor) ? null : (Valor == 0 ? true : false)); }
var ButtonSwicthCarga = function (Valor) { return (IsNullOrEmpty(Valor) ? null : (Valor == true ? 0 : 1)); }

function IsDoubleClicked(element) {
    //If already clicked return TRUE to indicate this click is not allowed
    if (element.data("IsDoubleClicked")) return true;

    //Mark as clicked for 5 second (5000)
    element.data("IsDoubleClicked", true);
    setTimeout(function () {
        element.removeData("IsDoubleClicked");
    }, 5000);

    //Return FALSE to indicate this click was allowed
    return false;
}

this.SetearAccordion = function () {
    $(".TituloAcordeon").unbind("click");
    $(".TituloAcordeon").click(function () {
        var h3 = $(this);
        var i = h3.find("i");
        var div = null;
        if (h3.parent().is("span")) {
            div = h3.parent().parent().nextAll("div");
        }
        else {
            div = h3.nextAll("div");
        }
        var visible = div.is(":visible");
        if (visible) {
            i.removeClass("fa fa-chevron-circle-down");
            i.addClass("fa fa-chevron-circle-up");
            div.slideUp(100);
        }
        else {
            i.removeClass("fa fa-chevron-circle-up");
            i.addClass("fa fa-chevron-circle-down");
            div.slideDown(100);
        }
    });
}

this.ObtenerModelo = function () {
    var modelo = {};
    modelo.UltimusTaskId = $("#hiddenTaskId").val();
    modelo.UltimusUserID = $("#hiddenUserID").val();
    modelo.UltimusProcess = $("#hiddenProcess").val();
    modelo.UltimusStep = $("#hiddenStep").val();
    modelo.UltimusIncident = $("#hiddenIncident").val();
    modelo.UltimusIpAdress = $("#hiddenIpAdress").val();
    modelo.UltimusMachineName = $("#hiddenMachineName").val();
    modelo.UltimusActivityType = $("#hiddenActivityType").val();
    modelo.UltimusJobFunction = $("#hiddenJobFunction").val();
    modelo.UltimusUserFullName = $("#hiddenUserFullName").val();
    modelo.UltimusUserEmail = $("#hiddenUserEmail").val();
    modelo.UltimusSupervisor = $("#hiddenSupervisor").val();
    modelo.UltimusSupervisorFullName = $("#hiddenSupervisorFullName").val();
    modelo.UltimusBrowserName = $("#hiddenBrowserName").val();
    modelo.UltimusBrowserVersion = $("#hiddenBrowserVersion").val();
    modelo.UltimusVersion = $("#hiddenVersion").val();
    modelo.UltimusTaskStartTime = $("#hiddenStartTime").val();
    modelo.UltimusTaskStatus = $("#hiddenTaskStatus").val();
    modelo.HostResponse = $("#hiddenHostResponse").val();
    modelo.CodigoSolicitud = $("#hiddenCodigoSolicitud").val();
    modelo.CodigoSolicitudOriginal = $("#hiddenCodigoSolicitudOriginal").val();
    modelo.CodigoSolicitudInterna = $("#hiddenCodigoSolicitudInterna").val();
    return modelo;
}

this.Response = function (data, callback) {
    ENDREQUEST();
    if (data.CodigoRespuesta == "EXITOSO") {
        if (!IsNullOrEmpty(data.DescripcionRespuesta)) {
            toastr.success(data.DescripcionRespuesta, Message_Success);
        }
        if (callback != null && callback != undefined) {
            callback(data);
        }
    }
    else if (data.CodigoRespuesta == "ADVERTENCIA") {
        toastr.warning(data.DescripcionRespuesta, Message_Warning);
    }
    else if (data.CodigoRespuesta == "ERROR") {
        toastr.error(data.DescripcionRespuesta, Message_Error);
    }
}

this.FormatDateTime = function (value, showTime) {
    if (showTime)
        return moment(value).format("DD-MMMM-YYYY HH:mm:ss");
    else
        return moment(value).format("DD-MMMM-YYYY");
}

this.FormatBoolean = function (value, enable, name) {
    var checked = value == true ? "checked='checked'" : "";
    var disabled = enable == true ? "" : "disabled='disabled'";
    return "<input type='checkbox' {0} {1} data-name='{2}' />".format(checked, disabled, name);
}

this.CloseForm = function () {
    if (window.top == window.self) {
        window.parent.close();
    }
    else {
        parent.window.close();
        window.parent.LoadInboxTask();
    }  
}

//**********************GRID INICIO**********************//
this.Grid_Init = function (grid, property, orderable, loadCallback) {
    if (grid == undefined || grid == null)
        return;

    $("#{0}".format(grid)).Grid("Set", {
        setCustomSettings: function (Settings) {
            if (Settings.data != null) {
                $.each(Settings.data, function (index, item) {
                    item.index = index;
                    item.Opciones = $("#Opciones").html();
                    //Llamo el metodo
                    if (loadCallback != undefined && loadCallback != null && $.isFunction(loadCallback)) {
                        loadCallback(item);
                    }
                });
                $.each(Settings.ColumnDefinition, function (index, item) {
                    //Orderable
                    if (orderable != undefined && orderable != null) {
                        Settings.ColumnDefinition[index].orderable = orderable;
                    }
                });
            }
            return Settings;
        }
    });

    $("#{0}".format(grid)).attr("data-property", property);
    $("#{0}".format(grid)).attr("data-index", null);
}

this.Grid_Add = function (grid, property, fieldsToCheck) {
    if (grid == undefined || grid == null)
        return;

    //Valido el formulario
    if (!$("#frm{0}".format(property)).valid()) {
        toastr.warning(MensajeValidarFormulario, Message_Warning);
        return false;
    }
    //CargarRelacionCampos
    CargarRelacionCampos(property);
    var model = RelacionCamposFramework.Guardar(model);

    var list = $("#{0}".format(grid)).Grid("Get");
    var index = $("#{0}".format(grid)).attr("data-index");
    if (index == null) {
        var existe = false;
        //Recorro el grid
        $.each(list, function (indexGrid, itemGrid) {
            //Valido si el elemento ya existe
            if (fieldsToCheck != null) {
                $.each(fieldsToCheck, function (indexFieldToCheck, itemFieldToCheck) {
                    if (itemGrid[itemFieldToCheck] == model[property][itemFieldToCheck]) {
                        existe = true;
                        return;
                    }
                });
            }
        });
        if (existe) {
            toastr.warning("¡Ya existe!", Message_Warning);
            return;
        }
        else {
            //Agregar
            $("#{0}".format(grid)).Grid("Add", model[property]);
        }
    }
    else {
        //Editar solo las propriedades que tienen un valor y es diferente
        $.each(model[property], function (name, value) {
            if (list[index][name] != value) {
                list[index][name] = value;
            }
        });
        $("#{0}".format(grid)).Grid("RenderGrid", list);
        //Seteo el index y el botón
        $("#btn{0}_Agregar span".format(property)).text(" Agregar");
        $("#{0}".format(grid)).attr("data-index", null);
    }
    //Reset del formulario
    $("#frm{0}".format(property)).reset();
    //Validación del formulario
    $("#frm{0}".format(property)).valid();
}

this.Grid_Clean = function (grid, property) {
    if (grid == undefined || grid == null)
        return;

    //Seteo el index y el botón
    $("#btn{0}_Agregar span".format(property)).text(" Agregar");
    $("#{0}".format(grid)).attr("data-index", null);
    //Reset del formulario
    $("#frm{0}".format(property)).reset();
    //Validación del formulario
    $("#frm{0}".format(property)).valid();
}

this.Grid_Edit = function (obj) {
    //Registro seleccionado
    var tr = $(obj).closest('tr');
    var table = $(obj).closest('table');
    var dataTable = table.DataTable();
    var index = dataTable.row(tr).index();
    var property = table.attr("data-property");

    var list = table.Grid("Get");
    var model = {};
    model[property] = list[index];

    //CargarRelacionCampos
    CargarRelacionCampos(property);
    RelacionCamposFramework.Cargar(model);

    $("#btn{0}_Agregar span".format(property)).text(" Editar");
    table.attr("data-index", index);

    if (property != null && property != "") {
        //Validación del formulario
        $("#frm{0}".format(property)).valid();
    }
}

this.Grid_Delete = function (obj) {
    //Registro seleccionado
    var tr = $(obj).closest('tr');
    var table = $(obj).closest('table');
    var dataTable = table.DataTable();
    var index = dataTable.row(tr).index();
    var property = table.attr("data-property");

    if (confirm(MensajeEliminar)) {
        table.Grid("Remove", index);

        if (property != null && property != "") {
            //Reset del formulario
            $("#frm{0}".format(property)).reset();
            //Validación del formulario
            $("#frm{0}".format(property)).valid();
        }
    }
}
//**********************GRID FIN**********************//

//**********************FILE INPUT INICIO**********************//
this.FileInput_Init = function (catalog) {
    if (catalog == undefined || catalog == null)
        return;
    if (!window.FileReader)
        return;

    var control = $("<input id='in{0}' type='file' class='file'>".format(catalog));
    $("#btn{0}".format(catalog)).addClass("btn-file");
    $("#btn{0}".format(catalog)).append(control);

    var multiple = $("#hidden{0}_FileInputMultiple".format(catalog)).val();
    if (multiple == "true") {
        $("#in{0}".format(catalog)).attr("multiple", "multiple");
    }

    $("#in{0}".format(catalog)).unbind("change");
    $("#in{0}".format(catalog)).change(function () {
        var input = $("#in{0}".format(catalog))[0];

        if (input.files && input.files.length > 0) {
            var files = [];
            var names = "";
            var extensions = FileInputExtension.split(';');

            $.each(input.files, function (index, item) {
                var extension = item.name.toLowerCase().split('.').pop();
                var isAllowed = extensions.indexOf(extension) > -1;
                if (!isAllowed) {
                    toastr.warning(MensajeArchivoNoPermitido.format(item.name, extension, FileInputExtension), Message_Warning);
                    return;
                }
                else if (item.size > FileInputMaxSize) {
                    toastr.warning(MensajeArchivoMuyPesado.format(item.name, CustomNumberFormat(item.size), CustomNumberFormat(FileInputMaxSize)), Message_Warning);
                    return;
                }
                else if (item.size == 0) {
                    toastr.warning(MensajeArchivoVacio.format(item.name), Message_Warning);
                    return;
                }
                var fr = new FileReader();
                fr.onload = function () {
                    var local = {};
                    local.NombreProceso = $("#hiddenProcess").val();
                    local.NombreCarpeta = CarpetaAdjuntos;
                    local.TamanoArchivo = item.size;
                    local.TituloArchivo = item.name;
                    local.Data = fr.result;
                    Ultimus.AjaxPostData("{0}/api/UltimusFormAPI/CargarArchivo".format(WebUrl), local, true, false, function (data) {
                        Response(data, function () {
                            files.push(data);
                            names += "{0}; ".format(data.TituloArchivo);
                            if (index == input.files.length - 1) {
                                var json = JSON.stringify(files);
                                $("#hidden{0}".format(catalog)).val(json);
                                $("#txt{0}".format(catalog)).val(names);
                                $("#txt{0}".format(catalog)).trigger("change");
                            }
                        });
                    }, "ERROR");
                }
                fr.readAsDataURL(item);
            });
        }
    });

    $("#in{0}".format(catalog)).unbind("click");
    $("#in{0}".format(catalog)).click(function () {
        $("#in{0}".format(catalog)).val("");
        $("#hidden{0}".format(catalog)).val("");
        $("#txt{0}".format(catalog)).val("");
        $("#txt{0}".format(catalog)).trigger("change");
    });
}

this.FileInput_Get = function (catalog) {
    var json = $("#hidden{0}".format(catalog)).val();
    if (json == "")
        return null;
    else
        return JSON.parse(json);
}
//**********************FILE INPUT FIN**********************//

//**********************CONFIRM INICIO**********************//
this.Confirm_Show = function (text, callback) {
    $("#modalConfirm").modal("show");
    $("#modalConfirm .modal-body").text(text);
    //Llamo el metodo
    if (callback != undefined && callback != null && $.isFunction(callback)) {
        $("#modal-btn-si").unbind("click");
        $("#modal-btn-si").click(function () {
            $("#modalConfirm").modal("hide");
            callback(true);
        });

        $("#modal-btn-no").unbind("click");
        $("#modal-btn-no").click(function () {
            $("#modalConfirm").modal("hide");
            callback(false);
        });
    }
}
//**********************CONFIRM FIN**********************//

//**********************ALERT INICIO**********************//
this.Alert_Show = function (text, callback) {
    $("#modalAlert").modal("show");
    $("#modalAlert .modal-body").text(text);
    //Llamo el metodo
    if (callback != undefined && callback != null && $.isFunction(callback)) {
        $("#modal-btn-ok").unbind("click");
        $("#modal-btn-ok").click(function () {
            $("#modalAlert").modal("hide");
        });
        $('#modalAlert').on('hidden.bs.modal', function () {
            callback(true);
        });
    }
}
//**********************ALERT FIN**********************//

this.CargarRelacionCampos = function (form) {
    RelacionCamposFramework.ListaControles = [];
    //Radicado
    if (form == undefined || form == "Radicado") {
        //********************************************************************************************************************************************************
        //Físico
        //********************************************************************************************************************************************************
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "AceptaPolitica_Acepto", valor: "AceptaPolitica.Acepto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NumeroRadicado", valor: "Radicado.NumeroRadicado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NumeroRadicadoTemporal", valor: "Radicado.NumeroRadicadoTemporal" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NumeroRadicadoDepartamental", valor: "Radicado.NumeroRadicadoDepartamental" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Fuente", codigo: "Radicado.CodigoFuente", valor: "Radicado.NombreFuente" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoTramite", codigo: "Radicado.CodigoTipoTramite", valor: "Radicado.NombreTipoTramite" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EsAnonimo", valor: "Radicado.EsAnonimo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Fecha", valor: "Radicado.Fecha" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoSolicitante", codigo: "Radicado.CodigoTipoSolicitante", valor: "Radicado.NombreTipoSolicitante" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoDocumentoIdentificacion", codigo: "Radicado.CodigoTipoDocumentoIdentificacion", valor: "Radicado.NombreTipoDocumentoIdentificacion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NumeroDocumentoIdentificacion", valor: "Radicado.NumeroDocumentoIdentificacion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Remitente", valor: "Radicado.Remitente" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EstadoCivil", codigo: "Radicado.CodigoEstadoCivil", valor: "Radicado.NombreEstadoCivil" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NivelEstudios", codigo: "Radicado.CodigoNivelEstudios", valor: "Radicado.NombreNivelEstudios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Correo", valor: "Radicado.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Telefono", valor: "Radicado.Telefono" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Direccion", valor: "Radicado.Direccion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Pais", codigo: "Radicado.CodigoPais", valor: "Radicado.NombrePais" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Departamento", codigo: "Radicado.CodigoDepartamento", valor: "Radicado.NombreDepartamento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Ciudad", codigo: "Radicado.CodigoCiudad", valor: "Radicado.NombreCiudad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Discapacidad", valor: "Radicado.Discapacidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SituacionDiscapacidad", codigo: "Radicado.CodigoSituacionDiscapacidad", valor: "Radicado.NombreSituacionDiscapacidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoReconoceSi", valor: "Radicado.GrupoEtnicoReconoce" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnico", codigo: "Radicado.CodigoGrupoEtnico", valor: "Radicado.NombreGrupoEtnico" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoIndigenaComunidad", valor: "Radicado.GrupoEtnicoIndigenaComunidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoIndigenaTieneCargoSi", valor: "Radicado.GrupoEtnicoIndigenaTieneCargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoCual", valor: "Radicado.GrupoEtnicoCual" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoConsejoComunitario", valor: "Radicado.GrupoEtnicoConsejoComunitario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoTerritorioColectivo", valor: "Radicado.GrupoEtnicoTerritorioColectivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Sexo", codigo: "Radicado.CodigoSexo", valor: "Radicado.NombreSexo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Genero", codigo: "Radicado.CodigoGenero", valor: "Radicado.NombreGenero" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_OrientacionSexual", codigo: "Radicado.CodigoOrientacionSexual", valor: "Radicado.NombreOrientacionSexual" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Procedencia", codigo: "Radicado.CodigoProcedencia", valor: "Radicado.NombreProcedencia" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_RangoEdad", codigo: "Radicado.CodigoRangoEdad", valor: "Radicado.NombreRangoEdad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Asunto", valor: "Radicado.Asunto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_MedioRespuesta", codigo: "Radicado.CodigoMedioRedpuesta", valor: "Radicado.NombreMedioRespuesta" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Entidad", codigo: "Radicado.CodigoEntidad", valor: "Radicado.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CodigoSecretaria", valor: "Radicado.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Secretaria", codigo: "Radicado.CodigoSecretaria", valor: "Radicado.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Folios", valor: "Radicado.Folios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Anexos", valor: "Radicado.Anexos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoTramite", codigo: "Radicado.CodigoTipoTramite", valor: "Radicado.NombreTipoTramite" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoDocumento", codigo: "Radicado.CodigoTipoDocumento", valor: "Radicado.NombreTipoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SubTipoDocumento", codigo: "Radicado.CodigoSubTipoDocumento", valor: "Radicado.NombreSubTipoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EsUrgente", valor: "Radicado.EsUrgente" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Resumen", valor: "Radicado.Resumen" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_FechaHechos", valor: "Radicado.FechaHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DescripcionHechos", valor: "Radicado.DescripcionHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DescripcionSolicitud", valor: "Radicado.DescripcionSolicitud" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Observaciones", valor: "Radicado.Observaciones" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DepartamentoHechos", codigo: "Radicado.CodigoDepartamentoHechos", valor: "Radicado.NombreDepartamentoHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_MunicipioHechos", codigo: "Radicado.CodigoMunicipioHechos", valor: "Radicado.NombreMunicipioHechos" });;
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DiasVencimiento", valor: "Radicado.DiasVencimiento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_HorasVencimiento", valor: "Radicado.HorasVencimiento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_FechaVencimiento", valor: "Radicado.FechaVencimiento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SujetoEspecialProteccion", codigo: "Radicado.CodigoSujetoEspecialProteccion", valor: "Radicado.NombreSujetoEspecialProteccion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EstadoTarea", codigo: "Radicado.CodigoEstadoTarea", valor: "Radicado.NombreEstadoTarea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CodigoRecipienteSecretaria", valor: "Radicado.CodigoRecipienteSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CodigoRecipienteArea", valor: "Radicado.CodigoRecipienteArea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CodigoRecipienteGrupo", valor: "Radicado.CodigoRecipienteGrupo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Critico", valor: "Radicado.Critico" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_Prioritario", valor: "Radicado.Prioritario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_ModificaTipoDocumento", valor: "Radicado.ModificaTipoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EquivocacionRadicar", valor: "Radicado.EquivocacionRadicar" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SolicitudServidor", valor: "Radicado.SolicitudServidor" });
        //********************************************************************************************************************************************************
        //Correo
        //********************************************************************************************************************************************************
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_ObjetoCorreoFuente", valor: "Radicado.CorreoFuente.Objeto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_FechaCorreoFuente", valor: "Radicado.CorreoFuente.Fecha" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NombreCorreoFuente", valor: "Radicado.CorreoFuente.Nombre" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DireccionCorreoFuente", valor: "Radicado.CorreoFuente.Direccion" });
        //********************************************************************************************************************************************************
        //PQRS
        //********************************************************************************************************************************************************
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoTramitePqrsFuente", codigo: "Radicado.PqrsFuente.CodigoTipoTramite", valor: "Radicado.PqrsFuente.NombreTipoTramite" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CodigoSolicitudPqrsFuente", valor: "Radicado.PqrsFuente.CodigoSolicitud" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_FechaPqrsFuente", valor: "Radicado.PqrsFuente.Fecha" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EntidadPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoEntidad", valor: "Radicado.PqrsFuente.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SecretariaPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoSecretaria", valor: "Radicado.PqrsFuente.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoSolicitantePqrsFuente", codigo: "Radicado.PqrsFuente.CodigoTipoSolicitante", valor: "Radicado.PqrsFuente.NombreTipoSolicitante" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EsAnonimoPqrsFuente", valor: "Radicado.PqrsFuente.EsAnonimo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoDocumentoIdentificacionPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoTipoDocumentoIdentificacion", valor: "Radicado.PqrsFuente.NombreTipoDocumentoIdentificacion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NumeroDocumentoIdentificacionPqrsFuente", valor: "Radicado.PqrsFuente.NumeroDocumentoIdentificacion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NombreCompletoPqrsFuente", valor: "Radicado.PqrsFuente.NombreCompleto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_EstadoCivilPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoEstadoCivil", valor: "Radicado.PqrsFuente.NombreEstadoCivil" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NivelEstudiosPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoNivelEstudios", valor: "Radicado.PqrsFuente.NombreNivelEstudios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CorreoPqrsFuente", valor: "Radicado.PqrsFuente.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TelefonoPqrsFuente", valor: "Radicado.PqrsFuente.Telefono" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DireccionPqrsFuente", valor: "Radicado.PqrsFuente.Direccion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_PaisPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoPais", valor: "Radicado.PqrsFuente.NombrePais" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DepartamentoPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoDepartamento", valor: "Radicado.PqrsFuente.NombreDepartamento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CiudadPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoCiudad", valor: "Radicado.PqrsFuente.NombreCiudad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DiscapacidadPqrsFuente", valor: "Radicado.PqrsFuente.Discapacidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SituacionDiscapacidadPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoSituacionDiscapacidad", valor: "Radicado.PqrsFuente.NombreSituacionDiscapacidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoReconoceSiPqrsFuente", valor: "Radicado.PqrsFuente.GrupoEtnicoReconoce" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoGrupoEtnico", valor: "Radicado.PqrsFuente.NombreGrupoEtnico" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoIndigenaComunidadPqrsFuente", valor: "Radicado.PqrsFuente.GrupoEtnicoIndigenaComunidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoIndigenaTieneCargoSiPqrsFuente", valor: "Radicado.PqrsFuente.GrupoEtnicoIndigenaTieneCargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoCualPqrsFuente", valor: "Radicado.PqrsFuente.GrupoEtnicoCual" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoConsejoComunitarioPqrsFuente", valor: "Radicado.PqrsFuente.GrupoEtnicoConsejoComunitario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GrupoEtnicoTerritorioColectivoPqrsFuente", valor: "Radicado.PqrsFuente.GrupoEtnicoTerritorioColectivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SexoPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoSexo", valor: "Radicado.PqrsFuente.NombreSexo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_GeneroPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoGenero", valor: "Radicado.PqrsFuente.NombreGenero" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_OrientacionSexualPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoOrientacionSexual", valor: "Radicado.PqrsFuente.NombreOrientacionSexual" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_ProcedenciaPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoProcedencia", valor: "Radicado.PqrsFuente.NombreProcedencia" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_RangoEdadPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoRangoEdad", valor: "Radicado.PqrsFuente.NombreRangoEdad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_FechaHechosPqrsFuente", valor: "Radicado.PqrsFuente.FechaHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DescripcionHechosPqrsFuente", valor: "Radicado.PqrsFuente.DescripcionHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DescripcionSolicitudPqrsFuente", valor: "Radicado.PqrsFuente.DescripcionSolicitud" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_DepartamentoHechosPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoDepartamentoHechos", valor: "Radicado.PqrsFuente.NombreDepartamentoHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_MunicipioHechosPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoMunicipioHechos", valor: "Radicado.PqrsFuente.NombreMunicipioHechos" });

        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_MedioRespuestaPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoMedioRespuesta", valor: "Radicado.PqrsFuente.NombreMedioRespuesta" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoDireccionPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoTipoDireccion", valor: "Radicado.PqrsFuente.NombreTipoDireccion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_CodigoPostalPqrsFuente", valor: "Radicado.PqrsFuente.CodigoPostal" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_NumeroRadicadoPqrsFuente", valor: "Radicado.PqrsFuente.NumeroRadicado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_MunicipioPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoCiudad", valor: "Radicado.PqrsFuente.NombreCiudad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_TipoPqrsPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoTipoPqrs", valor: "Radicado.PqrsFuente.NombreTipoPqrs" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_AsuntoPqrsFuente", valor: "Radicado.PqrsFuente.Asunto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_ResumenPqrsFuente", valor: "Radicado.PqrsFuente.Resumen" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SituacionDiscapacidadPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoSituacionDiscapacidad", valor: "Radicado.PqrsFuente.NombreSituacionDiscapacidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Radicado_SujetoEspecialProteccionPqrsFuente", codigo: "Radicado.PqrsFuente.CodigoSujetoEspecialProteccion", valor: "Radicado.PqrsFuente.NombreSujetoEspecialProteccion" });
        //********************************************************************************************************************************************************
    }
    //RadicadoAdicional
    if (form == undefined || form == "RadicadoAdicional") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoAdicional_Secretaria", codigo: "RadicadoAdicional.CodigoSecretaria", valor: "RadicadoAdicional.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoAdicional_Correo", valor: "RadicadoAdicional.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoAdicional_SoloLectura", valor: "RadicadoAdicional.SoloLectura" });
    }
    //RadicadoDocumento
    if (form == undefined || form == "RadicadoDocumento") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDocumento_RutaFisicaArchivo", valor: "RadicadoDocumento.RutaFisicaArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDocumento_RutaVirtualArchivo", valor: "RadicadoDocumento.RutaVirtualArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDocumento_TamanoArchivo", valor: "RadicadoDocumento.TamanoArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDocumento_TituloArchivo", valor: "RadicadoDocumento.TituloArchivo" });
    }
    //RadicadoDecision
    if (form == undefined || form == "RadicadoDecision") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDecision_Decision", codigo: "RadicadoDecision.CodigoDecision", valor: "RadicadoDecision.NombreDecision" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDecision_Comentarios", valor: "RadicadoDecision.Comentarios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDecision_Secretaria", codigo: "RadicadoDecision.CodigoSecretaria", valor: "RadicadoDecision.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDecision_Area", codigo: "RadicadoDecision.CodigoArea", valor: "RadicadoDecision.NombreArea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDecision_Grupo", codigo: "RadicadoDecision.CodigoGrupo", valor: "RadicadoDecision.NombreGrupo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoDecision_Funcionario", codigo: "RadicadoDecision.CodigoFuncionario", valor: "RadicadoDecision.NombreFuncionario" });
    }
    //Respuesta
    if (form == undefined || form == "Respuesta") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_NumeroRadicado", valor: "Respuesta.NumeroRadicado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Fecha", valor: "Respuesta.Fecha" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Entidad", codigo: "Respuesta.CodigoEntidad", valor: "Respuesta.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Secretaria", codigo: "Respuesta.CodigoSecretaria", valor: "Respuesta.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Formato", codigo: "Respuesta.CodigoFormato", valor: "Respuesta.NombreFormato" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Calificativo", valor: "Respuesta.Calificativo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Nombre", valor: "Respuesta.Nombre" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Cargo", valor: "Respuesta.Cargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Ciudad", valor: "Respuesta.Ciudad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Correo", valor: "Respuesta.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Folios", valor: "Respuesta.Folios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Anexos", valor: "Respuesta.Anexos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_EsUrgente", valor: "Respuesta.EsUrgente" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_AsuntoDocumento", valor: "Respuesta.AsuntoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_NumeroGuia", valor: "Respuesta.NumeroGuia" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_EstadoTarea", codigo: "Respuesta.CodigoEstadoTarea", valor: "Respuesta.NombreEstadoTarea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_CuerpoDocumento", valor: "Respuesta.CuerpoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_CodigoRecipienteSecretaria", valor: "Respuesta.CodigoRecipienteSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_CodigoRecipienteFuncionario", valor: "Respuesta.CodigoRecipienteFuncionario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_CodigoRecipienteAbogado", valor: "Respuesta.CodigoRecipienteAbogado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_ResponderConCorreo", valor: "Respuesta.ResponderConCorreo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Telefono", valor: "Respuesta.Telefono" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Direccion", valor: "Respuesta.Direccion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_FirmaFisica", valor: "Respuesta.FirmaFisica", CargaPersonalizada: ButtonSwicthCarga, GuardadoPersonalizado: ButtonSwicthGuardado });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_Defensor", codigo: "Respuesta.CodigoDefensor", valor: "Respuesta.NombreDefensor" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_FechaCita", valor: "Respuesta.FechaCita" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_HoraCita", valor: "Respuesta.HoraCita" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_HabilitaRespIntegrada", valor: "Respuesta.HabilitaRespIntegrada" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_CodigoTipoDocumento", valor: "Respuesta.CodigoTipoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_CodigoSubTipoDocumento", valor: "Respuesta.CodigoSubTipoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Respuesta_CuerpoEmail", valor: "Respuesta.CuerpoEmail" });
    }
    //RespuestaAdicional
    if (form == undefined || form == "RespuestaAdicional") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaAdicional_SolicitudOriginal", codigo: "RespuestaAdicional.CodigoSolicitudOriginal", valor: "RespuestaAdicional.NombreSolicitudOriginal" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaAdicional_Calificativo", valor: "RespuestaAdicional.Calificativo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaAdicional_Nombre", valor: "RespuestaAdicional.Nombre" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaAdicional_Cargo", valor: "RespuestaAdicional.Cargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaAdicional_Entidad", valor: "RespuestaAdicional.Entidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaAdicional_Ciudad", valor: "RespuestaAdicional.Ciudad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaAdicional_Correo", valor: "RespuestaAdicional.Correo" });
    }
    //RespuestaDocumento
    if (form == undefined || form == "RespuestaDocumento") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDocumento_RutaFisicaArchivo", valor: "RespuestaDocumento.RutaFisicaArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDocumento_RutaVirtualArchivo", valor: "RespuestaDocumento.RutaVirtualArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDocumento_TamanoArchivo", valor: "RespuestaDocumento.TamanoArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDocumento_TituloArchivo", valor: "RespuestaDocumento.TituloArchivo" });
    }
    //RespuestaDecision
    if (form == undefined || form == "RespuestaDecision") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDecision_Decision", codigo: "RespuestaDecision.CodigoDecision", valor: "RespuestaDecision.NombreDecision" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDecision_Abogado", codigo: "RespuestaDecision.CodigoAbogado", valor: "RespuestaDecision.NombreAbogado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDecision_Comentarios", valor: "RespuestaDecision.Comentarios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RespuestaDecision_TipoFirma", codigo: "RespuestaDecision.CodigoTipoFirma", valor: "RespuestaDecision.NombreTipoFirma" });
    }
    //RadicadoInterno
    if (form == undefined || form == "RadicadoInterno") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_NumeroRadicado", valor: "RadicadoInterno.NumeroRadicado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Fecha", valor: "RadicadoInterno.Fecha" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Entidad", codigo: "RadicadoInterno.CodigoEntidad", valor: "RadicadoInterno.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Secretaria", codigo: "RadicadoInterno.CodigoSecretaria", valor: "RadicadoInterno.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Formato", codigo: "RadicadoInterno.CodigoFormato", valor: "RadicadoInterno.NombreFormato" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_TipoOficio", codigo: "RadicadoInterno.CodigoTipoOficio", valor: "RadicadoInterno.NombreTipoOficio" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_SecretariaSolicitarInformaciones", codigo: "RadicadoInterno.CodigoSecretariaSolicitarInformaciones", valor: "RadicadoInterno.NombreSecretariaSolicitarInformaciones" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Calificativo", valor: "RadicadoInterno.Calificativo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Nombre", valor: "RadicadoInterno.Nombre" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Cargo", valor: "RadicadoInterno.Cargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_Correo", valor: "RadicadoInterno.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_AsuntoDocumento", valor: "RadicadoInterno.AsuntoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_EstadoTarea", codigo: "RadicadoInterno.CodigoEstadoTarea", valor: "RadicadoInterno.NombreEstadoTarea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_CuerpoDocumento", valor: "RadicadoInterno.CuerpoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_CodigoRecipienteSecretaria", valor: "RadicadoInterno.CodigoRecipienteSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_CodigoRecipienteArea", valor: "RadicadoInterno.CodigoRecipienteArea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_CodigoRecipienteGrupo", valor: "RadicadoInterno.CodigoRecipienteGrupo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_CodigoRecipienteFuncionario", valor: "RadicadoInterno.CodigoRecipienteFuncionario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInterno_CodigoRecipienteAbogado", valor: "RadicadoInterno.CodigoRecipienteAbogado" });
    }
    //RadicadoInternoRespuesta
    if (form == undefined || form == "RadicadoInternoRespuesta") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_NumeroRadicado", valor: "RadicadoInternoRespuesta.NumeroRadicado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Fecha", valor: "RadicadoInternoRespuesta.Fecha" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Entidad", codigo: "RadicadoInternoRespuesta.CodigoEntidad", valor: "RadicadoInternoRespuesta.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Secretaria", codigo: "RadicadoInternoRespuesta.CodigoSecretaria", valor: "RadicadoInternoRespuesta.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Formato", codigo: "RadicadoInternoRespuesta.CodigoFormato", valor: "RadicadoInternoRespuesta.NombreFormato" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Calificativo", valor: "RadicadoInternoRespuesta.Calificativo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Nombre", valor: "RadicadoInternoRespuesta.Nombre" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Cargo", valor: "RadicadoInternoRespuesta.Cargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_Correo", valor: "RadicadoInternoRespuesta.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_AsuntoDocumento", valor: "RadicadoInternoRespuesta.AsuntoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_EstadoTarea", codigo: "RadicadoInternoRespuesta.CodigoEstadoTarea", valor: "RadicadoInternoRespuesta.NombreEstadoTarea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_CuerpoDocumento", valor: "RadicadoInternoRespuesta.CuerpoDocumento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_CodigoRecipienteSecretaria", valor: "RadicadoInternoRespuesta.CodigoRecipienteSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_CodigoRecipienteArea", valor: "RadicadoInternoRespuesta.CodigoRecipienteArea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_CodigoRecipienteGrupo", valor: "RadicadoInternoRespuesta.CodigoRecipienteGrupo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_CodigoRecipienteFuncionario", valor: "RadicadoInternoRespuesta.CodigoRecipienteFuncionario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuesta_CodigoRecipienteAbogado", valor: "RadicadoInternoRespuesta.CodigoRecipienteAbogado" });
    }
    //RadicadoInternoAdicional
    if (form == undefined || form == "RadicadoInternoAdicional") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoAdicional_SecretariaSolicitarInformaciones", codigo: "RadicadoInternoAdicional.CodigoSecretariaSolicitarInformaciones", valor: "RadicadoInternoAdicional.NombreSecretariaSolicitarInformaciones" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoAdicional_Calificativo", valor: "RadicadoInternoAdicional.Calificativo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoAdicional_Cargo", valor: "RadicadoInternoAdicional.Cargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoAdicional_Nombre", valor: "RadicadoInternoAdicional.Nombre" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoAdicional_Correo", valor: "RadicadoInternoAdicional.Correo" });
    }
    //RadicadoInternoDocumento
    if (form == undefined || form == "RadicadoInternoDocumento") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDocumento_RutaFisicaArchivo", valor: "RadicadoInternoDocumento.RutaFisicaArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDocumento_RutaVirtualArchivo", valor: "RadicadoInternoDocumento.RutaVirtualArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDocumento_TamanoArchivo", valor: "RadicadoInternoDocumento.TamanoArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDocumento_TituloArchivo", valor: "RadicadoInternoDocumento.TituloArchivo" });
    }
    //RadicadoInternoRespuestaDocumento
    if (form == undefined || form == "RadicadoInternoRespuestaDocumento") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuestaDocumento_RutaFisicaArchivo", valor: "RadicadoInternoRespuestaDocumento.RutaFisicaArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuestaDocumento_RutaVirtualArchivo", valor: "RadicadoInternoRespuestaDocumento.RutaVirtualArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuestaDocumento_TamanoArchivo", valor: "RadicadoInternoRespuestaDocumento.TamanoArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoRespuestaDocumento_TituloArchivo", valor: "RadicadoInternoRespuestaDocumento.TituloArchivo" });
    }
    //RadicadoInternoDecision
    if (form == undefined || form == "RadicadoInternoDecision") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_Decision", codigo: "RadicadoInternoDecision.CodigoDecision", valor: "RadicadoInternoDecision.NombreDecision" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_Comentarios", valor: "RadicadoInternoDecision.Comentarios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_Secretaria", codigo: "RadicadoInternoDecision.CodigoSecretaria", valor: "RadicadoInternoDecision.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_Area", codigo: "RadicadoInternoDecision.CodigoArea", valor: "RadicadoInternoDecision.NombreArea" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_Grupo", codigo: "RadicadoInternoDecision.CodigoGrupo", valor: "RadicadoInternoDecision.NombreGrupo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_Funcionario", codigo: "RadicadoInternoDecision.CodigoFuncionario", valor: "RadicadoInternoDecision.NombreFuncionario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_Abogado", codigo: "RadicadoInternoDecision.CodigoAbogado", valor: "RadicadoInternoDecision.NombreAbogado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_SecretariaRespuesta", codigo: "RadicadoInternoDecision.CodigoSecretariaRespuesta", valor: "RadicadoInternoDecision.NombreSecretariaRespuesta" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_AreaRespuesta", codigo: "RadicadoInternoDecision.CodigoAreaRespuesta", valor: "RadicadoInternoDecision.NombreAreaRespuesta" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_GrupoRespuesta", codigo: "RadicadoInternoDecision.CodigoGrupoRespuesta", valor: "RadicadoInternoDecision.NombreGrupoRespuesta" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_FuncionarioRespuesta", codigo: "RadicadoInternoDecision.CodigoFuncionarioRespuesta", valor: "RadicadoInternoDecision.NombreFuncionarioRespuesta" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "RadicadoInternoDecision_AbogadoRespuesta", codigo: "RadicadoInternoDecision.CodigoAbogadoRespuesta", valor: "RadicadoInternoDecision.NombreAbogadoRespuesta" });
    }
    //Pqrs
    if (form == undefined || form == "Pqrs") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_TipoTramite", codigo: "Pqrs.CodigoTipoTramite", valor: "Pqrs.NombreTipoTramite" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Entidad", codigo: "Pqrs.CodigoEntidad", valor: "Pqrs.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Secretaria", codigo: "Pqrs.CodigoSecretaria", valor: "Pqrs.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_TipoSolicitante", codigo: "Pqrs.CodigoTipoSolicitante", valor: "Pqrs.NombreTipoSolicitante" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_EsAnonimo", valor: "Pqrs.EsAnonimo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_TipoDocumentoIdentificacion", codigo: "Pqrs.CodigoTipoDocumentoIdentificacion", valor: "Pqrs.NombreTipoDocumentoIdentificacion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_NumeroDocumentoIdentificacion", valor: "Pqrs.NumeroDocumentoIdentificacion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_NombreCompleto", valor: "Pqrs.NombreCompleto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_EstadoCivil", codigo: "Pqrs.CodigoEstadoCivil", valor: "Pqrs.NombreEstadoCivil" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_NivelEstudios", codigo: "Pqrs.CodigoNivelEstudios", valor: "Pqrs.NombreNivelEstudios" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Correo", valor: "Pqrs.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Telefono", valor: "Pqrs.Telefono" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Direccion", valor: "Pqrs.Direccion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Pais", codigo: "Pqrs.CodigoPais", valor: "Pqrs.NombrePais" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Departamento", codigo: "Pqrs.CodigoDepartamento", valor: "Pqrs.NombreDepartamento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Ciudad", codigo: "Pqrs.CodigoCiudad", valor: "Pqrs.NombreCiudad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Discapacidad", valor: "Pqrs.Discapacidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_SituacionDiscapacidad", codigo: "Pqrs.CodigoSituacionDiscapacidad", valor: "Pqrs.NombreSituacionDiscapacidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_GrupoEtnicoReconoceSi", valor: "Pqrs.GrupoEtnicoReconoce" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_GrupoEtnico", codigo: "Pqrs.CodigoGrupoEtnico", valor: "Pqrs.NombreGrupoEtnico" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_GrupoEtnicoIndigenaComunidad", valor: "Pqrs.GrupoEtnicoIndigenaComunidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_GrupoEtnicoIndigenaTieneCargoSi", valor: "Pqrs.GrupoEtnicoIndigenaTieneCargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_GrupoEtnicoCual", valor: "Pqrs.GrupoEtnicoCual" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_GrupoEtnicoConsejoComunitario", valor: "Pqrs.GrupoEtnicoConsejoComunitario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_GrupoEtnicoTerritorioColectivo", valor: "Pqrs.GrupoEtnicoTerritorioColectivo" });      
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Sexo", codigo: "Pqrs.CodigoSexo", valor: "Pqrs.NombreSexo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Genero", codigo: "Pqrs.CodigoGenero", valor: "Pqrs.NombreGenero" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_OrientacionSexual", codigo: "Pqrs.CodigoOrientacionSexual", valor: "Pqrs.NombreOrientacionSexual" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Procedencia", codigo: "Pqrs.CodigoProcedencia", valor: "Pqrs.NombreProcedencia" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_RangoEdad", codigo: "Pqrs.CodigoRangoEdad", valor: "Pqrs.NombreRangoEdad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Asunto", valor: "Pqrs.Asunto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_MedioRespuesta", codigo: "Pqrs.CodigoMedioRedpuesta", valor: "Pqrs.NombreMedioRespuesta" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_TipoPqrs", codigo: "Pqrs.CodigoTipoPqrs", valor: "Pqrs.NombreTipoPqrs" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_Resumen", valor: "Pqrs.Resumen" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_FechaHechos", valor: "Pqrs.FechaHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_DescripcionHechos", valor: "Pqrs.DescripcionHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_DescripcionSolicitud", valor: "Pqrs.DescripcionSolicitud" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_DepartamentoHechos", codigo: "Pqrs.CodigoDepartamentoHechos", valor: "Pqrs.NombreDepartamentoHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_MunicipioHechos", codigo: "Pqrs.CodigoMunicipioHechos", valor: "Pqrs.NombreMunicipioHechos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Pqrs_NumeroRadicado", valor: "Pqrs.NumeroRadicado" });
    }
    //PqrsDocumento
    if (form == undefined || form == "PqrsDocumento") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "PqrsDocumento_RutaFisicaArchivo", valor: "PqrsDocumento.RutaFisicaArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "PqrsDocumento_RutaVirtualArchivo", valor: "PqrsDocumento.RutaVirtualArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "PqrsDocumento_TamanoArchivo", valor: "PqrsDocumento.TamanoArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "PqrsDocumento_TituloArchivo", valor: "PqrsDocumento.TituloArchivo" });
    }
    //AceptaPolitica
    if (form == undefined || form == "AceptaPolitica") {

    }
    //Organigrama
    if (form == undefined || form == "Organigrama") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Organigrama_EsAdministrador", valor: "Organigrama.EsAdministrador" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Organigrama_Entidad", codigo: "Organigrama.CodigoEntidad", valor: "Organigrama.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Organigrama_Grupo", codigo: "Organigrama.CodigoGrupo", valor: "Organigrama.NombreGrupo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Organigrama_UsuarioList", valor: "UsuarioList" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Organigrama_Secretaria", codigo: "Organigrama.CodigoSecretaria", valor: "Organigrama.NombreSecretaria" });
    }
    //OrganigramaEntidad
    if (form == undefined || form == "OrganigramaEntidad") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_CodigoEntidad", valor: "OrganigramaEntidad.CodigoEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_NombreEntidad", valor: "OrganigramaEntidad.NombreEntidad" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_Departamento", valor: "OrganigramaEntidad.Departamento" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_Municipio", valor: "OrganigramaEntidad.Municipio" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_Sigla", valor: "OrganigramaEntidad.Sigla" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_SecuencialInicio", valor: "OrganigramaEntidad.SecuencialInicio" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_RutaDocumentos", valor: "OrganigramaEntidad.RutaDocumentos" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_Dominio", valor: "OrganigramaEntidad.Dominio" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_RecipienteNotificaciones", valor: "OrganigramaEntidad.RecipienteNotificaciones" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaEntidad_Habilitado", valor: "OrganigramaEntidad.Habilitado" });
    }
    //OrganigramaSecretaria
    if (form == undefined || form == "OrganigramaSecretaria") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaSecretaria_CodigoSecretaria", valor: "OrganigramaSecretaria.CodigoSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaSecretaria_NombreSecretaria", valor: "OrganigramaSecretaria.NombreSecretaria" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaSecretaria_CodigoDependencia", valor: "OrganigramaSecretaria.CodigoDependencia" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaSecretaria_CodigoIntegracionDozzier", valor: "OrganigramaSecretaria.CodigoIntegracionDozzier" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaSecretaria_Correo", valor: "OrganigramaSecretaria.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaSecretaria_CargoAprobadorRemplazo", valor: "OrganigramaSecretaria.CargoAprobadorRemplazo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaSecretaria_Habilitado", valor: "OrganigramaSecretaria.Habilitado" });
    }
    //OrganigramaUsuario
    if (form == undefined || form == "OrganigramaUsuario") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_CodigoUsuario", valor: "OrganigramaUsuario.CodigoUsuario" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_Usuario", codigo: "OrganigramaUsuario.NombreUsuario", valor: "OrganigramaUsuario.NombreCompleto" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_Cargo", valor: "OrganigramaUsuario.Cargo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_Cedula", valor: "OrganigramaUsuario.Cedula" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_Correo", valor: "OrganigramaUsuario.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_Firma", valor: "OrganigramaUsuario.Firma" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_CorrExtRecibida", valor: "OrganigramaUsuario.CorrExtRecibida" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_CorrExtEnviada", valor: "OrganigramaUsuario.CorrExtEnviada" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "OrganigramaUsuario_CorrInterna", valor: "OrganigramaUsuario.CorrInterna" });
    }
    //ValidarRadicado
    if (form == undefined || form == "ValidarRadicado") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Hash", valor: "ValidarRadicado.Hash" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Archivo", codigo: "ValidarRadicado.CodigoArchivo", valor: "ValidarRadicado.NombreArchivo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Resultado", valor: "ValidarRadicado.Resultado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Proceso", valor: "ValidarRadicado.Proceso" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Incidente", valor: "ValidarRadicado.Incidente" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_NumeroRadicado", valor: "ValidarRadicado.NumeroRadicado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_UserFullName", valor: "ValidarRadicado.UserFullName" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Etapa", valor: "ValidarRadicado.Etapa" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Fecha", valor: "ValidarRadicado.Fecha" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_Decision", valor: "ValidarRadicado.Decision" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "ValidarRadicado_IP", valor: "ValidarRadicado.IP" });
    }
    //Seguimiento
    if (form == undefined || form == "Seguimiento") {
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Seguimiento_NumeroRadicado", valor: "Seguimiento.NumeroRadicado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Seguimiento_Correo", valor: "Seguimiento.Correo" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Seguimiento_NumeroDocumentoIdentificacion", valor: "Seguimiento.NumeroDocumentoIdentificacion" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Seguimiento_Resultado", valor: "Seguimiento.Resultado" });
        RelacionCamposFramework.AgregarRelacion("basico", { IdControl: "Seguimiento_SeguimientoDecisionList", valor: "Seguimiento.SeguimientoDecisionList" });
    }
}
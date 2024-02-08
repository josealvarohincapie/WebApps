// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


function LimpiarConclusionesAsesorias() {
    document.getElementById("txtConclusionAsesoria").value = "";
}
function OcultarConclusiones() {

    var x = document.getElementById("divConclusionAsesoria");
    var txtConclusionAsesoria = document.getElementById("txtConclusionAsesoria");
    var btnLimpiarConclusionAsesoria = document.getElementById("btnLimpiarConclusionAsesoria");
    var btnBuscarConclusionAsesoria = document.getElementById("btnBuscarConclusionAsesoria");
    
    if (document.getElementById("respuestaEscritaSi").checked) {

        txtConclusionAsesoria.hidden = false;
        btnLimpiarConclusionAsesoria.hidden = false;
        btnBuscarConclusionAsesoria.hidden = false;
        //x.style.display = "block";
    } else {
        //x.style.display = "none";
        txtConclusionAsesoria.hidden = true;
        btnLimpiarConclusionAsesoria.hidden = true;
        btnBuscarConclusionAsesoria.hidden = true;
    }
}
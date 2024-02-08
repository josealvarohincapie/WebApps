using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebAppAsesorias.Models
{
    public class ClasificacionPeticionModel
    {
        public int Id { get; set; }
        public string? TextoAyuda { get; set; }
        public string? DescTipoPeticion { get; set; }
        public List<SelectListItem>? ListaAreaDerecho { get; set; } 
        public List<ParametrosModel> Derechos { get; set; } = new List<ParametrosModel>();
        public string? DescripcionAsesorias { get; set; }
        public string? Observaciones { get; set; }
        public bool RespuestaAsesoria { get; set; }
        public string? ConclusionAsesoria { get; set; }
    }
}

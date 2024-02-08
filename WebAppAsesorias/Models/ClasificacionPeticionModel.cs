namespace WebAppAsesorias.Models
{
    public class ClasificacionPeticionModel
    {
        public int Id { get; set; }
        public string? TextoAyuda { get; set; }
        public int IdTipoPeticion { get; set; }
        public string? DescTipoPeticion { get; set; }
        public int IdAreaDerecho { get; set; }
        public string? DescAreaDerecho { get; set; }
        public List<DerechoModel> Derechos { get; set; } = new List<DerechoModel>();
        public string? DescripcionAsesorias { get; set; }
        public string? Observaciones { get; set; }
        public bool RespuestaAsesoria { get; set; }
        public string? ConclusionAsesoria { get; set; }
    }
}

namespace WebAppAsesorias.Models
{
    public class ClasificacionPeticionModel
    {
        private string textoAyuda;

        public int Id { get; set; }
        public string TextoAyuda { get => textoAyuda; set => textoAyuda = value; }
        public int IdTipoPeticion { get; set; }
        public string? DescTipoPeticion { get; set; }
        public int IdAreaDerecho { get; set; }
        public string? DescAreaDerecho { get; set; }
        public int IdDerecho { get; set; }
        public string? DescDerecho { get; set; }
        public string? DescripcionAsesorias { get; set; }
        public string? Observaciones { get; set; }
        public bool RespuestaAsesoria { get; set; }
        public required string ConclusionAsesoria { get; set; }
    }
}

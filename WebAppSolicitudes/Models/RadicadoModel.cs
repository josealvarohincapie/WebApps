namespace WebAppSolicitudes.Models
{
    public class RadicadoModel
    {
        public int Id { get; set; }

        public int NumeroRadicado { get; set; }

        public string? CanalAtencion { get; set; }

        public DateTime Fecha { get; set; }

        public required string TipoSolicitante { get; set; }

        public bool EsAnonimo { get; set; }
    }
}

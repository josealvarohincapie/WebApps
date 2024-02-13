using System;

namespace Modelo.dto
{
    public class RadicadoDTO
    {
        public Int64 CodigoSolicitud { get; set; }
        public CatalogoDTO TipoTramite { get; set; }
        public CatalogoDTO Fuente { get; set; }
        public int Incidente { get; set; }
        public String NumeroRadicado { get; set; }
        public DateTime Fecha { get; set; }
        public String Remitente { get; set; }
        public String Asunto { get; set; }
        public String Direccion { get; set; }
        public String Telefono { get; set; }
        public CatalogoDTO Entidad { get; set; }
        public String Correo { get; set; }
        public int Folios { get; set; }
        public String Anexos{ get; set; }
        public Boolean EsUrgente { get; set; }
        public CatalogoDTO TipoDocumento { get; set; }
        public CatalogoDTO SubTipoDocumento { get; set; }
        public CatalogoDTO GrupoEtnico { get; set; }
        public CatalogoDTO SituacionDiscapacidad { get; set; }
        public CatalogoDTO SujetoEspecialProteccion { get; set; }
        public CatalogoDTO EstadoCivil { get; set; }
        public CatalogoDTO NivelEstudio { get; set; }
        public Boolean Discapacidad { get; set; }
        public Boolean GrupoEtnicoReconoce { get; set; }
        public CatalogoDTO Genero { get; set; }
        public CatalogoDTO Sexo { get; set; }
        public CatalogoDTO OrientacionSexual { get; set; }
        public CatalogoDTO Procedencia { get; set; }
        public CatalogoDTO RangoEdad { get; set; }
        public CatalogoDTO TipoSolicitante { get; set; }
        public Boolean EsAnonimo { get; set; }
        public CatalogoDTO TipoDocId { get; set; }
        public CatalogoDTO Pais { get; set; }
        public CatalogoDTO Dpto { get; set; }
        public CatalogoDTO Ciudad { get; set; }
        public CatalogoDTO MedioRespuesta { get; set; }
        public CatalogoDTO TipoPqrs { get; set; }
        public String Resumen { get; set; }
        public String DescripcionHechos { get; set; }
        public String DescripcionSolicitud { get; set; }
        public CatalogoDTO DptoHechos { get; set; }
        public CatalogoDTO MunicipioHechos { get; set; }
        public CatalogoDTO Formato { get; set; }
        public String Observaciones { get; set; } 
    }
}

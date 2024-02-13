using System.Data.SqlClient;
using System.Data;

namespace AccesoDatos.Data
{
    public class ConexionDB
    {
        private SqlConnection Conexion = new SqlConnection("Server=localhost\\SQLEXPRESS;Database=defensoria;Trusted_Connection=True;");

        public SqlConnection AbrirConexion()
        {
            if (Conexion.State == ConnectionState.Closed)
                Conexion.Open();
            return Conexion;
        }

        public SqlConnection CerrarConexion()
        {
            if (Conexion.State == ConnectionState.Open)
                Conexion.Close();
            return Conexion;
        }
    }
}
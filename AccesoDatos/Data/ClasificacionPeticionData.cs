using System.Data.SqlClient;
using System.Data;

namespace AccesoDatos.Data
{
    public class ClasificacionPeticionData
    {
        private ConexionDB conexion = new ConexionDB();

        SqlDataReader leer;
        DataTable tabla = new DataTable();
        SqlCommand comando = new SqlCommand();

        public DataTable Mostrar()
        {

            comando.Connection = conexion.AbrirConexion();
            comando.CommandText = "MostrarProductos";
            comando.CommandType = CommandType.StoredProcedure;
            leer = comando.ExecuteReader();
            tabla.Load(leer);
            conexion.CerrarConexion();
            return tabla;

        }

        /**
         *  Permite radicar la clasificación de una petición
         */
        public void RadicarPeticion(string codTipoPeticion, string codAreaDerecho, string codDerecho, string descAsesoria, string observaciones, string loginname)
        {

            comando.Connection = conexion.AbrirConexion();
            comando.CommandText = "spInsRadicarPeticion";
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@codTipoPeticion", codTipoPeticion);
            comando.Parameters.AddWithValue("@codAreaDerecho", codAreaDerecho);
            comando.Parameters.AddWithValue("@codDerecho", codDerecho);
            comando.Parameters.AddWithValue("@descAsesoria", descAsesoria);
            comando.Parameters.AddWithValue("@observaciones", observaciones);
            comando.Parameters.AddWithValue("@loginname", loginname);

            comando.ExecuteNonQuery();

            comando.Parameters.Clear();
            conexion.CerrarConexion();

        }

        public void Editar(string nombre, string desc, string marca, double precio, int stock, int id)
        {
            comando.Connection = conexion.AbrirConexion();
            comando.CommandText = "EditarProductos";
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@nombre", nombre);
            comando.Parameters.AddWithValue("@descrip", desc);
            comando.Parameters.AddWithValue("@Marca", marca);
            comando.Parameters.AddWithValue("@precio", precio);
            comando.Parameters.AddWithValue("@stock", precio);
            comando.Parameters.AddWithValue("@id", id);

            comando.ExecuteNonQuery();

            comando.Parameters.Clear();
            conexion.CerrarConexion();
        }

        public void Eliminar(int id)
        {
            comando.Connection = conexion.AbrirConexion();
            comando.CommandText = "EliminarProducto";
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddWithValue("@idpro", id);

            comando.ExecuteNonQuery();

            comando.Parameters.Clear();
            conexion.CerrarConexion();
        }

    }
}
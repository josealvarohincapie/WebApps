using Logica;
using Microsoft.AspNetCore.Mvc;
using WebAppAsesorias.Models;

namespace WebAppAsesorias.Controllers
{
    public class ClasificacionPeticionController : Controller
    {
        // GET: ClasificacionPeticionController
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RegistroDePeticionarios()
        {
            return View();
        }
        // GET: ClasificacionPeticionController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ClasificacionPeticionController/Create
        public ActionResult Radicar()
        {
            ClasificacionPeticionLogica clasificacionPeticionLogica = new ClasificacionPeticionLogica();
            clasificacionPeticionLogica.Radicar("","",);
            return View();
        }

        // POST: ClasificacionPeticionController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Radicar(IFormCollection collection)
        {
            try
            {
               // var clasificacionPeticionLogica = new ClasificacionPeticionLogica();
               
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ClasificacionPeticionController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ClasificacionPeticionController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index);
            }
            catch
            {
                return View();
            }
        }

        // GET: ClasificacionPeticionController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ClasificacionPeticionController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        public ActionResult Index3()
        {
            ClasificacionPeticionModel data = new ClasificacionPeticionModel();
            data.DescTipoPeticion = "";
            data.DescAreaDerecho = "";
            data.Derechos = new List<DerechoModel>();
            data.DescripcionAsesorias = "";
            data.Observaciones = "";
            data.RespuestaAsesoria = true;
            data.ConclusionAsesoria = "";
            return View(data);
        }
    }
}

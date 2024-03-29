﻿using Logica;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
        
        // GET: ClasificacionPeticionController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ClasificacionPeticionController/Create
        public ActionResult Radicar()
        {
            ClasificacionPeticionLogica clasificacionPeticionLogica = new ClasificacionPeticionLogica();
           // clasificacionPeticionLogica.Radicar("","",);
            return View();
        }

        // POST: ClasificacionPeticionController/Create
        [HttpPost]
//        [ValidateAntiForgeryToken]
        public ActionResult RadicarPeticion(ClasificacionPeticionModel clasificacionPeticionModel)
        {
            try
            {
                var clasificacionPeticionLogica = new ClasificacionPeticionLogica();
                var respuesta = clasificacionPeticionLogica.RadicarPeticion("1", "1", "1", clasificacionPeticionModel.ConclusionAsesoria, clasificacionPeticionModel.Observaciones, "jahc");

                return RedirectToAction(nameof(RegistroDePeticionarios));
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
                return RedirectToAction(nameof(Index));
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

        //[HttpGet]
        public ActionResult RegistroDePeticionarios()
        {

            ParametroLogica parametroLogica = new ParametroLogica();
            var listaParametros = parametroLogica.ConsultarParametrosXCodTipo("AREADERE");

            ClasificacionPeticionModel data = new ClasificacionPeticionModel(); 
            data.DescTipoPeticion = "";

            data.ListaAreaDerecho = new List<SelectListItem>();

            foreach (var item in listaParametros)
            {
                var itemDerecho = new SelectListItem { Text = item.Descripcion, Value = item.Codigo};
                data.ListaAreaDerecho.Add(itemDerecho);
            }

            data.Derechos = new List<ParametrosModel>();
            data.DescripcionAsesorias = "";
            data.Observaciones = "";
            data.RespuestaAsesoria = false;
            data.ConclusionAsesoria = "";
            return View(data);
        }
    }
}

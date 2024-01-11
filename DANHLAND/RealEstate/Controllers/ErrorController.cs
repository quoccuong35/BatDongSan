﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RealEstate.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult Index(string code)
        {
            ViewBag.Code = code;
            return View();
        }
        public ActionResult Unauthorized()
        {
            return View();
        }
    }
}
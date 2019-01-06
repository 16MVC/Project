using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BuyTicket.Controllers
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Order()
        {
            return View();
        }

        public ActionResult OrderInsert()
        {
            return View();
        }

        public ActionResult OrderUpdate()
        {
            return View();
        }


    }
}
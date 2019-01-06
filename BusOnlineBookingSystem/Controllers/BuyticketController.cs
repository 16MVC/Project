using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BuyTicket.Controllers
{
    public class BuyticketController : Controller
    {
        // GET: Buyticket
        //车票预订
        public ActionResult TicketBook()
        {
            return View();
        }
        //查询车票
        public ActionResult getTicketBook()
        {

            return View();
        }
        //车票改签、变更到站 
        public ActionResult TicketUpdae()
        {
            return View();
        }
        //退票 
        public ActionResult TicketDelete()
        {
            return View();
        }
        //余票查询 
        public ActionResult TicketSelect()
        {
            return View();
        }
        //查询余票 
        public ActionResult getTicketSelect()
        {
            return View();
        }
        //车票预订信息确认
        public ActionResult ConfirmPassenger()
        {
            return View();
        }

        //车票预订信息确认
        public ActionResult PayOrder()
        {
            return View();
        }
    }
}
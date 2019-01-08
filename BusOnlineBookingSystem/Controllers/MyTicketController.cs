using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BuyTicket.Controllers
{
    public class MyTicketController : Controller
    {
        
        Controllers.Entities2 ef = new Controllers.Entities2();
        // GET: My12306 insurance 
        public ActionResult MyTicket()
        {
            return View();
        }

        //未完成订单
        public ActionResult initNoComplete()
        {
            return View();
        }
        //查询未完成订单
        public ActionResult getinitNoComplete()
        {

            return View();
        }
        //已完成订单
        public ActionResult queryOrder()
        {
            return View();
        }
        //查询未出行订单
        public ActionResult getqueryOrder(DateTime startTime,DateTime endTime,string strName)
        {

            return View();
        }
        //查询历史订单
        public ActionResult getHistoryqueryOrder()
        {

            return View();
        }
        //我的保险
        public ActionResult insurance()
        {
            return View();
        }
        //查询保险
        public ActionResult getinsurance()
        {

            return View();
        }
        //查看个人信息
        public ActionResult initQueryUserInfo()
        {
            return View();
        }
        //查询个人信息
        public ActionResult getinitQueryUserInfo()
        {

            return View();
        }
        //账号安全
        public ActionResult userSecurity()
        {
            return View();
        }
        //手机核验
        public ActionResult bindTel()
        {
            return View();
        }
        public ActionResult getbindTel()
        {
            int id = (int)Session["UserID"];
            var query = from tb in ef.Linkman
                        where tb.userID== id
                        select new
                        {
                            mobilephonenumber = tb.phonenumber,
                            checkdate=tb.chekestate,
                        };
            return Json(query.ToList(),JsonRequestBehavior.AllowGet);
        }
        public ActionResult updatebindTel(Controllers.Linkman models,string phonenumber, string pwd)
        {
            string password = Session["Password"].ToString().Trim();
            int id = (int)Session["UserID"];
            if (password == pwd)
            {
                var query = (from tb in ef.Linkman
                             where tb.userID == id
                             select tb).Single<Controllers.Linkman>();
                query.phonenumber = models.phonenumber.Trim();
                int intCount = ef.SaveChanges();
                if (intCount > 0)
                {
                    return Json("修改成功", JsonRequestBehavior.AllowGet);
                }
                else {
                    return Json("修改失败", JsonRequestBehavior.AllowGet);
                }
            }
            else {
                return Json("您输入的密码不正确！请重新输入！", JsonRequestBehavior.AllowGet);
            }
        }
        //常用联系人管理
        public ActionResult passengers()
        {
            return View();
        }
        //查询常用联系人
        public ActionResult getpassengers()
        {

            return View();
        }
        public ActionResult updatepassengers()
        {

            return View();
        }
        public ActionResult deletepassengers()
        {

            return View();
        }
        //车票快递地址
        public ActionResult address()
        {
            return View();
        }
        //查询车票快递地址
        public ActionResult getaddress()
        {

            return View();
        }
        public ActionResult updateaddress()
        {

            return View();
        }
        public ActionResult deleteaddress()
        {

            return View();
        }
        //重点旅客预约
        public ActionResult qxyyInfo()
        {
            return View();
        }
        //遗失物品查找
        public ActionResult lostInfo()
        {
            return View();
        }
    }
}
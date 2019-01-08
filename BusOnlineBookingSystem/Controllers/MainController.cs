using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace BuyTicket.Controllers
{
    public class MainController : Controller
    {
        Controllers.Entities2 ef = new Controllers.Entities2();

        // GET: Main 
        //动作：杂凑    盐（Salt）
        // 密码杂凑所需的 Salt 乱数值
        private string pwSalt = "A1rySq1oPe2Mh784QQwG6jRAfkdPpDa90J0i";

        //客运首页
        public ActionResult Main()
        {
            return View();
        }
        //查询车票信息
        public ActionResult getTrainticket(string startStation,string endStation,DateTime startDate,DateTime backDate,int ticketType)
        {

            return View();
        }

        //登录
        public ActionResult Login()
        {
            return View();
        }
        //MD5加密
        public string SetMD5(string strSource)
        {
            return FormsAuthentication.HashPasswordForStoringInConfigFile(strSource, "MD5");
        }

        [HttpGet]
        public ActionResult Login(string Name, string Password)
        {
            //密码加密
           // string hash_pw = FormsAuthentication.HashPasswordForStoringInConfigFile(pwSalt + Password, "sha1");
            var member = (from tb in ef.User
                         where tb.userName == Name && tb.pwd == Password
                          select tb).FirstOrDefault();
            if (member == null)
            {
                return View();
            }
            else {
                Session["UserID"] = member.userID;
                Session["User"] = member.userName.Trim();
                Session["Password"] = member.pwd.Trim();

            }
            return Json("OK", JsonRequestBehavior.AllowGet);
        }
        //注册
        public ActionResult Register()
        {
            return View();
        }
        #region 注册信息
        
        //绑定证件类型
        public ActionResult getcardType() {
            var query = from tb in ef.PassworkType
                        select new
                        {
                            value = tb.passworkTypeID,
                            name = tb.passworkType1
                        };
            return Json(query.ToList(),JsonRequestBehavior.AllowGet);
        }
        //绑定乘客类型
        public ActionResult getpassengertype() {
            var query = from tb in ef.TicketType
                        select new
                        {
                            value = tb.ticketTypeID,
                            name = tb.ticketTypename
                        };
            return Json(query.ToList(),JsonRequestBehavior.AllowGet);
        }

        //绑定国家
        public ActionResult getCountry()
        {
            var query = from tb in ef.Country
                        select new
                        {
                            value = tb.CountryID,
                            name = tb.countryName
                        };
            return Json(query.ToList(), JsonRequestBehavior.AllowGet);
        }

        //绑定省份
        public ActionResult getProvince()
        {
            var query = from tb in ef.Province
                        select new
                        {
                            value = tb.provinceID,
                            name = tb.provinceName
                        };
            return Json(query.ToList(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        [HttpPost]
        //注册
        public ActionResult Register(int userID,string linkmanName, string sex,int countryID,int paperworkTypeID,int paperworkNumber,
           DateTime adddate,string phonenumber,string fixedphone,string email, string address, string postcode,
           int ticketTypeID)
        {
            var query = (from tb in ef.Linkman
                        join intuserID in ef.User on tb.userID equals intuserID.userID
                        join strlinkmanName in ef.Linkman on tb.linkmanName equals strlinkmanName.linkmanName
                        join intsex in ef.Linkman on tb.sex equals intsex.sex
                        join intcountryID in ef.Linkman on tb.countryID equals intcountryID.countryID
                        join intpaperworkTypeID in ef.Linkman on tb.paperworkTypeID equals intpaperworkTypeID.paperworkTypeID
                        join intpaperworkNumber in ef.Linkman on tb.paperworkNumber equals intpaperworkNumber.paperworkNumber
                        select new{
                            tb.linkmanID,
                            tb.userID,
                            tb.linkmanName,
                            tb.sex,
                            tb.countryID,
                            tb.paperworkTypeID,
                            tb.paperworkNumber,
                            tb.adddate,
                            tb.phonenumber,
                            tb.fixedphone,
                            tb.email,
                            tb.address,
                            tb.postcode,
                            tb.ticketTypeID
                        }).ToList();
            Controllers.Linkman passenger = new Controllers.Linkman();
            passenger.userID = userID;
            passenger.linkmanName = linkmanName;
            passenger.sex = sex;
            passenger.countryID = countryID;
            passenger.paperworkTypeID = paperworkTypeID;
            passenger.phonenumber = phonenumber;
            passenger.adddate = adddate;
            passenger.phonenumber = phonenumber;
            passenger.fixedphone = fixedphone;
            passenger.email = email;
            passenger.address = address;
            passenger.postcode = postcode;
            passenger.ticketTypeID = ticketTypeID;

            ef.Linkman.Add(passenger);
            ef.SaveChanges();
            return Json(passenger.linkmanID, JsonRequestBehavior.AllowGet);
        }

        //忘记密码
        public ActionResult ForgetMyPassword()
        {
            return View();
        }
    }
}
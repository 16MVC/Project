using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BuyTicket.Controllers
{
    public class userSecurityController : Controller
    {
        Controllers.Entities2 ef = new Controllers.Entities2();
        // GET: userSecurity  
        //密码修改
        public ActionResult loginPwd()
        {
            return View();
        }
        //随机生成手机验证码
        #region
        private string CreateRandomNum(int numCount)
        {
            const string allChar = "1,2,3,4,5,6,7,8,9,0";
            string[] charArray = allChar.Split(',');
            string randomNum = "";
            int temp = -1;
            var rand = new Random();
            for (int i = 0; i < numCount; i++)
            {
                if (temp != -1)
                {
                    rand = new Random(i * temp * ((int)DateTime.Now.Ticks));
                }
                int t = rand.Next(10);
                if (temp == t)
                {
                    return CreateRandomNum(numCount);
                }
                temp = t;
                randomNum += charArray[temp];
            }
            return randomNum;
        }

        public string Page_zwdch()
        {
            string validateNum = CreateRandomNum(6);
            Session["CheckCode"] = validateNum.Trim();
            return validateNum;
        }
        #endregion
        public ActionResult getloginPwd()
        {
            return View();
        }
        public ActionResult updateloginPwd(Controllers.User models, string old_pwd, string pwd, string checkcode)
        {
            string check_code = Session["CheckCode"].ToString().Trim();
            string password = Session["Password"].ToString().Trim();
            if (password == old_pwd && check_code == checkcode)
            {
                var query = (from tb in ef.User
                             where tb.pwd == old_pwd
                             select tb).Single<Controllers.User>();
                query.pwd = models.pwd;
                int Count = ef.SaveChanges();
                if (Count > 0)
                {
                    return Json("修改成功", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("修改失败", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                if (password != old_pwd)
                {
                    return Json("您输入的密码不正确！请重新输入！", JsonRequestBehavior.AllowGet);
                }
                else if(checkcode != check_code)
                {
                    return Json("您输入的验证码不正确！请重新获取！", JsonRequestBehavior.AllowGet);
                }
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }
        //安全邮箱
        public ActionResult safeEmail()
        {
            return View();
        }
        public ActionResult getsafeEmail()
        {
            int UserID = (int)Session["UserID"];
            var query = from tb in ef.Linkman
                        where tb.userID == UserID
                        select new
                        {
                            tb.email
                        };
            return Json(query.ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult updatesafeEmail(Controllers.Linkman models,string Email, string pwd, string checkcode)
        {
            string check_code = Session["CheckCode"].ToString().Trim();
            string password = Session["Password"].ToString().Trim();
            int UserID = (int)Session["UserID"];
            if (password == pwd)
            {
                if (check_code == checkcode)
                {
                    var query = (from tb in ef.Linkman
                                 where tb.userID == UserID
                                 select tb).Single<Controllers.Linkman>();
                    query.email = models.email;
                    int Count = ef.SaveChanges();
                    if (Count > 0)
                    {
                        return Json("修改成功", JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json("修改失败", JsonRequestBehavior.AllowGet);
                    }
                }
                else {
                    return Json("您输入的验证码不正确！请重新输入！", JsonRequestBehavior.AllowGet);
                }
            }
            else {
                return Json("您输入的密码不正确！请重新输入！", JsonRequestBehavior.AllowGet);
            }
            //return View();
        }
        //兑奖密码修改
        public ActionResult integrationPwd()
        {
            return View();
        }
        public ActionResult getintegrationPwd()
        {
            return View();
        }
        public ActionResult updateintegrationPwd()
        {
            return View();
        }
    }
}
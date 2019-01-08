using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BuyTicket.Controllers
{
    public class TravelguideController : Controller
    {
        Controllers.Entities2 ef = new Controllers.Entities2();
        // GET: Travelguide
        //代售点查询
        public ActionResult Travelguide()
        {
            return View();
        }
        #region 代售点查询
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

        //绑定城市
        public ActionResult getCity(int ProvinceID)
        {
            var query = from tb in ef.City
                        where tb.provinceID== ProvinceID
                        select new
                        {
                            value = tb.cityID,
                            name = tb.cityName
                        };
            return Json(query.ToList(), JsonRequestBehavior.AllowGet);
        }
        //绑定县区
        public ActionResult getTown(int CityID)
        {
            var query = from tb in ef.Town
                        where tb.cityID==CityID
                        select new
                        {
                            value = tb.townID,
                            name = tb.townName
                        };
            return Json(query.ToList(), JsonRequestBehavior.AllowGet);
        }
        //按省市区查询代售点
        public ActionResult getTravelguide(int ProvinceID, int CityID, int TownID)
        {

            var query = from tb in ef.Outlet
                        where tb.provinceID == ProvinceID
                        select new
                        {
                            outletID = tb.OutletID,
                            name = tb.OutleName,
                            address = tb.address,
                            businessHours = tb.businessHours,
                            windownumber = tb.windownumber,
                            provinceID=tb.provinceID,
                            cityID=tb.cityID,
                            townID=tb.townID
                        };
            if (CityID != 0) {
                query = query.Where(a => a.cityID == CityID);

            }
            if (TownID != 0) {
                query = query.Where(a => a.townID == TownID);
            }
            return Json(query.ToList(), JsonRequestBehavior.AllowGet);
        }
        #endregion
        //正晚点查询
        public ActionResult zwdch()
        {
            return View();
        }
        //生成验证码
        #region 生成验证码
        private string CreateRandomNum(int numCount)
        {
            const string allChar = "1,2,3,4,5,6,7,8,9,0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,y,z";
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
                int t = rand.Next(60);
                if (temp == t)
                {
                    return CreateRandomNum(numCount);
                }
                temp = t;
                randomNum += charArray[temp];
            }
            return randomNum;
        }

        private void CreateImage(string validateNum)
        {
            if (validateNum == null || validateNum.Trim() == string.Empty)
                return;
            var image = new Bitmap(validateNum.Length * 15 + 20, 40);
            Graphics g = Graphics.FromImage(image);
            try
            {
                var random = new Random();
                g.Clear(Color.LightGray);
                var font = new Font("方正舒体", 20, (FontStyle.Regular | FontStyle.Italic));
                var brush =
                    new LinearGradientBrush(new Rectangle(0, 0, image.Width, image.Height), Color.Black, Color.Black,
                        1.2f, true);
                g.DrawString(validateNum, font, brush, 5, 5);
                g.DrawRectangle(new Pen(Color.LightGray), 0, 0, image.Width - 1, image.Height - 1);
                var ms = new MemoryStream();
                image.Save(ms, ImageFormat.Gif);
                Response.ClearContent();
                Response.ContentType = "image/Gif";
                Response.BinaryWrite(ms.ToArray());
            }
            finally
            {
                g.Dispose();
                image.Dispose();
            }
        }

        public void Page_zwdch()
        {
            string validateNum = CreateRandomNum(4);
            CreateImage(validateNum);
            Session["ValidateNum"] = validateNum.ToLower();
        }
        #endregion
        //查询列车正晚点
        public ActionResult getTrianarray()
        {
            
            return View();
        }
        //中转查询
        public ActionResult zzzcx()
        {
            return View();
        }
        //查询中转站
        public ActionResult getzzzcx()
        {

            return View();
        }
        //车站车次查询
        public ActionResult czxxcx()
        {
            return View();
        }
        //查询车站车次
        public ActionResult getczxxcx()
        {

            return View();
        }
        //票价查询
        public ActionResult leftTicketPrice()
        {
            return View();
        }
        //查询票价
        public ActionResult getleftTicketPrice()
        {

            return View();
        }
        //车次查询
        public ActionResult queryTrainInfo()
        {
            return View();
        }
        //查询车次
        public ActionResult getqueryTrainInfo()
        {

            return View();
        }
    }
}
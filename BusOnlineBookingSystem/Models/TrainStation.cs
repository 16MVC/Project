//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace BuyTicket.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class TrainStation
    {
        public int TrainStationID { get; set; }
        public string trainID { get; set; }
        public string Type { get; set; }
        public string Station { get; set; }
        public Nullable<int> S_No { get; set; }
        public Nullable<int> Day { get; set; }
        public string A_Time { get; set; }
        public string D_Time { get; set; }
        public string R_Date { get; set; }
        public Nullable<int> Distance { get; set; }
        public string P1 { get; set; }
        public string P2 { get; set; }
        public string P3 { get; set; }
        public string P4 { get; set; }
    }
}

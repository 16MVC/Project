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
    
    public partial class OrderDetail
    {
        public int orderDetailID { get; set; }
        public Nullable<int> orderID { get; set; }
        public Nullable<int> trainSeatIntervalID { get; set; }
        public Nullable<int> ticketTypeID { get; set; }
        public string passengerName { get; set; }
        public Nullable<int> paperworkTypeID { get; set; }
        public string paperworkNumber { get; set; }
        public string phone { get; set; }
        public Nullable<bool> ifChangeTicket { get; set; }
        public Nullable<bool> ifCancelTicket { get; set; }
        public Nullable<long> intervalBit { get; set; }
        public Nullable<decimal> price { get; set; }
        public string orderstatus { get; set; }
        public Nullable<bool> ifInsurance { get; set; }
    }
}

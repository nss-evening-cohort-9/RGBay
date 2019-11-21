using System;

namespace RGBay.api.DataModels
{
    public class PaymentType
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ServiceName { get; set; }
        public string ProfileName { get; set; }
    }
}
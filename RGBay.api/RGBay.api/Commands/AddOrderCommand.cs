using System;

namespace RGBay.api.Commands
{
    public class AddOrderCommand
    {
        public DateTime Date { get; set; }
        public int CustomerId { get; set; }
        public int Total { get; set; }
        public string Status { get; set; }
    }
}

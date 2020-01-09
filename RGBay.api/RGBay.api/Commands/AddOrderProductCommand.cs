using System;

namespace RGBay.api.Commands
{
    public class AddOrderProductCommand
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
    }
}

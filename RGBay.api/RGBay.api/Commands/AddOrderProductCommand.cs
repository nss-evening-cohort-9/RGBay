using System;

namespace RGBay.api.Commands
{
    public class AddOrderProductCommand
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Duration { get; set; }
    }
}

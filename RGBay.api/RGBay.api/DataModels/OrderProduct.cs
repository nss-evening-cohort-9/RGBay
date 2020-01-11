using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.DataModels
{
    public class OrderProduct
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Duration { get; set; }
    }
}

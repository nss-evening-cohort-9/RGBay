using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RGBay.api.DataModels;

namespace RGBay.api.Commands
{
    public class Cart
    {
        public Order CartOrder { get; set; }
        public int OrderId => CartOrder.Id;
        public IEnumerable<CartItem> CartItems { get; set; }
    }
}

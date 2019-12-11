using System.Collections.Generic;
using RGBay.api.DataModels;

namespace RGBay.api.Dtos
{
    public class Cart
    {
        public Order CartOrder { get; set; }
        public IEnumerable<Product> CartProducts { get; set; }
        //OrderId
        //IE <Product>
        //Order
    }
}
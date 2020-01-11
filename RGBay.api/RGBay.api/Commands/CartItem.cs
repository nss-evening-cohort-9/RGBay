using RGBay.api.DataModels;

namespace RGBay.api.Commands
{
    public class CartItem
    {
        public int OrderProductId { get; set; }
        public int Duration { get; set; }
        public Product Product { get; set; }
    }
}
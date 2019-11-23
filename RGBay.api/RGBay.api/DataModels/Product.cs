using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.DataModels
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public int RentalPrice { get; set; }
        public int SalesPrice { get; set; }
        public bool IsForSale { get; set; }
        public bool IsRgb { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int OwnerId { get; set; }
    }

    public enum Category
    {
        Peripheral,
        Part,
        Space
    }
}

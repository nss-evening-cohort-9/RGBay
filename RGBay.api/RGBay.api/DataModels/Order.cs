using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.DataModels
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int CustomerId  { get; set; }
        public string Status { get; set; }
    }
}
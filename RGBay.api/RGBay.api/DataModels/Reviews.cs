using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.DataModels
{
    public class Reviews
    {
        public int ReviewId { get; set; }
        public string Review { get; set; }
        public int ReviewerId { get; set; }
        public DateTime ReviewDate { get; set; }
        public int ProductReviewId { get; set; }
    }
}

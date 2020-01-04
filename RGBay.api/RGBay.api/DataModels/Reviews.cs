using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.DataModels
{
    public class Reviews
    {
        public int FeedbackId { get; set; }
        public string Feedback { get; set; }
        public int ReviewerId { get; set; }
        public DateTime ReviewDate { get; set; }
    }
}

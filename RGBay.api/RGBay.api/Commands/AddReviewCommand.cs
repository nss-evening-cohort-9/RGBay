using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.Commands
{
    public class AddReviewCommand
    {
        public string Feedback { get; set; }
        public int ReviewerId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.DataModels
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseUid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Bio { get; set; }
    }
}

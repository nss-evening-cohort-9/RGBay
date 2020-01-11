using RGBay.api.DataModels;

namespace RGBay.api.Commands
{
    public class AddPaymentTypeCommand
    {
        public string UserId { get; set; }
        public ServiceName ServiceName { get; set; }
        public string ProfileName { get; set; }
    }
}
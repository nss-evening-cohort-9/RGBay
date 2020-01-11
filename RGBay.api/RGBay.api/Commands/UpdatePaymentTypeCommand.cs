using RGBay.api.DataModels;

namespace RGBay.api.Commands
{
    public class UpdatePaymentTypeCommand
    {
        public int Id { get; set; }
        public ServiceName ServiceName { get; set; }
        public string ProfileName { get; set; }
    }
}
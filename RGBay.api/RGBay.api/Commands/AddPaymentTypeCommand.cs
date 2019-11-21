namespace RGBay.api.Commands
{
    public class AddPaymentTypeCommand
    {
        public int UserId { get; set; }
        public string ServiceName { get; set; }
        public string ProfileName { get; set; }
    }
}
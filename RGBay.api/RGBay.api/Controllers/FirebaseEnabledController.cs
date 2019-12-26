using Microsoft.AspNetCore.Mvc;

namespace RGBay.api.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string FirebaseUserId => User.FindFirst(x => x.Type == "user_id").Value;
    }
}

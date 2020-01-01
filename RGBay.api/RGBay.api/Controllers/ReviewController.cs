using Microsoft.AspNetCore.Mvc;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using RGBay.api.Repositories;
using System.Collections.Generic;

namespace RGBay.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : FirebaseEnabledController
    {
        [HttpGet]
        public ActionResult<IEnumerable<Reviews>> GetAllReviews()
        {
            var reviewRepo = new ReviewsRepository();
            return reviewRepo.GetAll();
        }

        [HttpPost]
        public ActionResult AddReview(AddReviewCommand newReviewCommand)
        {
            var repo = new ReviewsRepository();
        }
    }
}
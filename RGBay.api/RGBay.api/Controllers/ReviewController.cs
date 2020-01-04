using Microsoft.AspNetCore.Mvc;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using RGBay.api.Repositories;
using System.Collections.Generic;

namespace RGBay.api.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewController : FirebaseEnabledController
    {
        private readonly ReviewsRepository _repo = new ReviewsRepository();

        [HttpGet]
        public ActionResult<IEnumerable<Reviews>> GetAllReviews()
        {
            return _repo.GetAll();
        }

        [HttpPost]
        public int AddReview(AddReviewCommand addReviewCommand)
        {
            return _repo.Add(addReviewCommand);
        }
    }
}
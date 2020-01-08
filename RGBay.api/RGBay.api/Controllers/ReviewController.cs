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

        [HttpGet("{id}")]
        public IEnumerable<Reviews> GetReviewForUser(int id)
        {
            return _repo.GetReviewForUser(id);
        }

        [HttpDelete("{reviewId}")]
        public IActionResult RemoveUser(int reviewId)
        {
            
            _repo.Delete(reviewId);

            return Ok();
        }

        [HttpPost]
        public IActionResult CreateReview(AddReviewCommand newUserCommand)
        {
            var reviewCreated = _repo.Add(newUserCommand);
            return Created($"rgbay/reviews/{reviewCreated}", reviewCreated);
        }
    }
}
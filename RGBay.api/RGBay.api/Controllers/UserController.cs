using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using RGBay.api.Repositories;


namespace RGBay.api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : FirebaseEnabledController
    {
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllUsers()
        {
            var userRepo = new UserRepository();
            return userRepo.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetByUserName(int id)
        {
            var userRepo = new UserRepository();
            return userRepo.Get(id);
        }

        [HttpGet("uid/{firebaseUid}")]
        public ActionResult<User> GetByUid(string firebaseUid)
        {
            var userRepo = new UserRepository();
            return userRepo.GetByUid(firebaseUid);
        }

        [HttpPost]
        public IActionResult CreateUser(AddUserCommand newUserCommand)
        {
            newUserCommand.FirebaseUid = FirebaseUserId;

            var repo = new UserRepository();
            var userCreated = repo.Add(newUserCommand);

            if (userCreated == null)
            {
                return NotFound("could not create user");
            }
            return Created($"rgbay/user/{userCreated}", userCreated);
        }

        [HttpDelete("{userId}")]
        public IActionResult RemoveUser(int userId)
        {
            var repo = new UserRepository();
            repo.Delete(userId);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(UpdateUserCommand updatedUserCommand, int id)
        {
            var repo = new UserRepository();

            var updatedUser = new User
            {
                Username = updatedUserCommand.Username,
                Email = updatedUserCommand.Email,
                City = updatedUserCommand.City,
                State = updatedUserCommand.State,
                Bio = updatedUserCommand.Bio
            };

            var yourUpdatedUser = repo.Update(updatedUser, id);
            return Ok(yourUpdatedUser);
        }
    }
}
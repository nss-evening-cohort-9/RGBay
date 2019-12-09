using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using RGBay.api.Repositories;


namespace RGBay.api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
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
            var newUser = new User
            {
                Id = 1,
                FirebaseUid = newUserCommand.FirebaseUid,
                Username = newUserCommand.Username,
                Email = newUserCommand.Email,
                City = newUserCommand.City,
                State = newUserCommand.State,
                Bio = newUserCommand.Bio
            };

            var repo = new UserRepository();
            var userCreated = repo.Add(newUser);

            if (userCreated == null)
            {
                return NotFound("could not create user");
            }
            return Created($"rgbay/user/{userCreated}", userCreated);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveUser(int id)
        {
            var repo = new UserRepository();
            repo.Delete(id);

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
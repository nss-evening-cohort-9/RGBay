using Dapper;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace RGBay.api.Repositories
{
    public class UserRepository
    {
        string _connectionString = "Server=localhost;Database=RGBay;Trusted_Connection=True;";

        public List<User> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>("select * from [User]");
                return users.ToList();
            }
        }

        public User Get(string username) 
        { 
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "";
                var user = db.QueryFirst<User>(sql, new { userName = username });
                return user;

            }
        }

        public bool Delete(string username)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete from [User] where [Username] = @Username";
                return db.Execute(sql, new { username }) == 1;
            }
        }

        public int Add(User newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[User]([Username], [Email], [City], [State], [Bio])
                            VALUES (
                              @Username,
                              @Email,
                              @City,
                              @State,
                              @Bio
                            )";
                return db.Execute(sql, newUser);
            }
        }

        public User Update(User updatedUser, int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [dbo].[User]
                            SET [Username] = @userName,
	                            [Email] = @email,
	                            [City] = @city,
	                            [State] = @state,
	                            [Bio] = @bio
                             OUTPUT INSERTED.*
                             WHERE Id = @id";

                var updateUser = new
                {
                    id = id,
                    username = updatedUser.Username,
                    email = updatedUser.Email,
                    city = updatedUser.City,
                    state = updatedUser.State,
                    bio = updatedUser.Bio
                };


                var user = connection.Query<User>(sql, updateUser).SingleOrDefault();
                return user;
            }
        }
    }
}

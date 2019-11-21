using Dapper;
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
                var sql = @"INSERT INTO [dbo].[User]([Username], [Email], [City], [State])
                            VALUES (
                              @Username,
                              @Email,
                              @City,
                              @State
                            )";
                return db.Execute(sql, newUser);
            }
        }

        public User Update(User updatedUser, int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [User]
                            SET [Username] = @Username,
	                            [Email] = @Email,
	                            [City] = @City,
	                            [State] = @State
                            WHERE Id = @Id";

                updatedUser.Id = id;

                var user = db.Query<User>(sql, updatedUser);
                return user;
            }
        }
    }
}

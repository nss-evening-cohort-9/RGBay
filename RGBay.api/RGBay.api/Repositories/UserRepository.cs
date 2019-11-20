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
                var sql = @"Insert into [dbo].[User]([Username], [Email], [City], [State])
                            values (
                              @Username
                            , @Email
                            , @City
                            , @State
                            )";
                return db.Execute(sql, newUser);
            }
        }
    }
}

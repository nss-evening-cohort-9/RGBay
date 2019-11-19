using Dapper;
using RGBay.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RGBay.api.Repositories
{
    public class UserRepository
    {
        string _connectionString = "Server=localhost;Database=RGBay;Trusted_Connection=True;";
        public List<User> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>("Select * from User");
                return users.ToList();
            }
        }
    }
}

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

        public IEnumerable<User> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>(@"select * from [User]");
                return users;
            }
        }

        public IEnumerable<User> GetAllNonDeleted()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var users = db.Query<User>(@"select * from [User]
                                            where[IsDeleted] = 0");
                return users;
            }
        }

        public User Get(int id) 
        { 
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select * from [User]
                            where [Id] = @id";
                var user = db.QuerySingle<User>(sql, new { Id = id });
                return user;

            }
        }

        public User GetByUid(string firebaseUid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select * from [User]
                            where FirebaseUid = @firebaseUid
                                and [IsDeleted] = 0";
                var user = db.QueryFirstOrDefault<User>(sql, new { firebaseUid });
                return user;
            }
        }

        public bool Delete(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [User] set [isDeleted] = 1 WHERE [Id] = @Id";
                var parameters = new { id };

                return db.Execute(sql, parameters) == 1;
            }
        }

        public int Add(AddUserCommand newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[User]([FirebaseUid], [Username], [Email], [City], [State], [Bio])
                            VALUES (
                              @FirebaseUid,
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

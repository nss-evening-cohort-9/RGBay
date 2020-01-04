using Dapper;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace RGBay.api.Repositories
{
    public class ReviewsRepository
    {
        string _connectionString = "Server=localhost;Database=RGBay;Trusted_Connection=True;";

        public List<Reviews> GetAll()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var reviews = db.Query<Reviews>(@"select * from [Feedback]");
                return reviews.ToList();
            }
        }

        public IEnumerable<Reviews>GetReviewForUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT [USER].[Username], [Feedback].[Feedback], [Feedback].[ReviewDate]
                            FROM [FEEDBACK]
                            INNER JOIN [User]
                            ON [USER].[Id] = [Feedback].[ReviewerId]
                            WHERE [user].[Id] = @id";
                var reviews = db.Query<Reviews>(sql, new { id });
                return reviews;

            }
        }

        public int Add(AddReviewCommand newReview)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[Feedback]([FeedbackId], [Feedback], [ReviewerId], [ReviewDate])
                            VALUES (
                              @FeedbackId,
                              @Feedback,
                              @ReviewerId,
                              @ReviewDate
                            )";
                return db.Execute(sql, newReview);
            }
        }
    }
}

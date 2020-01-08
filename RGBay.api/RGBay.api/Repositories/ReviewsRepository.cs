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
                var reviews = db.Query<Reviews>(@"select * 
                                                from [Reviews]");
                return reviews.ToList();
            }
        }

        public IEnumerable<Reviews>GetReviewForUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT [Reviews].[ReviewId], [USER].[Username], [Reviews].[Review], FORMAT ([Reviews].[ReviewDate], 'MM-dd-yyyy') as [ReviewDate] , [Reviews].[ReviewerId], [Product].[OwnerId]
                            FROM [User]
                            JOIN [Reviews]
                            ON [Reviews].[ProductReviewId] = [USER].[Id]
                            LEFT JOIN [Product] 
							ON [Product].[OwnerId] = [User].[Id]
							WHERE [Reviews].[ReviewerId] = @id";
                var reviews = db.Query<Reviews>(sql, new { id });
                return reviews;
            }
        }

        public int Add(AddReviewCommand newReview)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[Reviews]([ReviewId], [Review], [ReviewerId], [ReviewDate], [ProductReviewId])
                            VALUES 
							(
							@ReviewId, 
                            @Review, 
                            @ReviewerId, 
                            @ReviewDate, 
                            @ProductReviewId
                            )";
                return db.Execute(sql, newReview);
            }
        }

        public bool Delete(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"delete from [Reviews]
                            where [ReviewId] = @id";
                var parameters = new { id };

                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}

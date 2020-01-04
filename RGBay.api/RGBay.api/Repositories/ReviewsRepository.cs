using RGBay.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using RGBay.api.Commands;
using Microsoft.AspNetCore.Mvc;

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

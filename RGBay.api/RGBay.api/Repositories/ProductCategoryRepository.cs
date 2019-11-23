using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using RGBay.api.DataModels;
using RGBay.api.Commands;
using Dapper;

namespace RGBay.api.Repositories
{
    public class ProductCategoryRepository
    {
        string _connectionString = "Server=localhost; Database=RGBay; Trusted_Connection=True;";

        public IEnumerable<ProductCategory> GetAllProductCategories()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from ProductCategory";
                var productCategories = db.Query<ProductCategory>(sql);
                return productCategories;
            }
        }


    }
}

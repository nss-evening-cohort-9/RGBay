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

        public ProductCategory GetProductCategory(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select * from ProductCategory
                            where [id] = @id";
                var parameters = new { id };
                var productCategory = db.QueryFirstOrDefault<ProductCategory>(sql, parameters);
                return productCategory;
            }
        }

        public bool AddProductCategory(AddProductCategoryCommand addProductCategoryCommand)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"insert into [dbo].[ProductCategory]
                            ([Name])
                            values
                            (@name)";
                return connection.Execute(sql, addProductCategoryCommand) == 1;
            }
        }

        public bool UpdateProductCategory(UpdateProductCategoryCommand updateProductCategoryCommand)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update [dbo].[ProductCategory]
                            set [Name] = @Name
                            where [Id] = @Id";
                return db.Execute(sql, updateProductCategoryCommand) == 1;
            }
        }

        public bool DeleteProductCategory(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE FROM [dbo].[ProductCategory]
                            WHERE [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }

    }
}

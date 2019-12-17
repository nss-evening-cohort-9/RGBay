using RGBay.api.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using RGBay.api.Commands;

namespace RGBay.api.Repositories
{
    public class ProductRepository
    {
        string _connectionString = "Server=localhost;Database=rgbay;Trusted_Connection=True";

        public IEnumerable<Product> GetProducts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from product";
                var products = db.Query<Product>(sql);
                return products;
            }
        }

        public IEnumerable<Product> GetRecentProductsByCategory(int categoryId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select top(3) * from product where Category = @categoryId order by id desc";
                var parameters = new { categoryId };
                var categories = db.Query<Product>(sql, parameters);
                return categories;
            }
        }

        public IEnumerable<Product> GetLatestProducts(int getLatestProductsNum)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select top (@getLatestProductsNum) * from product order by DateCreated desc";
                var parameters = new { getLatestProductsNum };
                var products = db.Query<Product>(sql, parameters);
                return products;
            }
        }

        public Product GetProduct(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from product where [id] = @id";
                var parameters = new { id };
                var product = db.QueryFirstOrDefault<Product>(sql, parameters);
                return product;
            }
        }

        public bool DeleteProduct(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "delete from product where [id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public bool PostProduct(AddProductCommand addProductCommand)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Product]
                                ([Title]
                                ,[Category]
                                ,[RentalPrice]
                                ,[SalesPrice]
                                ,[IsForSale]
                                ,[IsRgb]
                                ,[Description]
                                ,[ImageUrl]
                                ,[OwnerId])
                            VALUES
                                (@Title
                                ,@Category
                                ,@RentalPrice
                                ,@SalesPrice
                                ,@IsForSale
                                ,@IsRgb
                                ,@Description
                                ,@ImageUrl
                                ,@OwnerId)";

                return db.Execute(sql, addProductCommand) == 1;
            }
        }

        public bool UpdateProduct(UpdateProductCommand updateProductCommand)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [dbo].[Product]
                           SET [Title] = @Title
                              ,[Category] = @Category
                              ,[RentalPrice] = @RentalPrice
                              ,[SalesPrice] = @SalesPrice
                              ,[IsForSale] = @IsForSale
                              ,[IsRgb] = @IsRgb
                              ,[Description] = @Description
                              ,[ImageUrl] = @ImageUrl
                         WHERE [Id] = @Id";

                return db.Execute(sql, updateProductCommand) == 1;
            }
        }
    }
}

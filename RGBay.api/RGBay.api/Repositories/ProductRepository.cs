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
        string _connectionString = "Server=localhost;Database=candymarket;Trusted_Connection=True";

        public IEnumerable<Product> GetProducts()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from product";
                var products = db.Query<Product>(sql);
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

        public void DeleteProduct(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "delete from product where [id] = @id";
                var parameters = new { id };
                db.Execute(sql, parameters);
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

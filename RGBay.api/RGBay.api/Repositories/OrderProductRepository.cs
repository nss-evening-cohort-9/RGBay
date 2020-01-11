using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using RGBay.api.Commands;
using RGBay.api.DataModels;

namespace RGBay.api.Repositories
{
    public class OrderProductRepository
    {
        readonly string _connectionString = @"Server=localhost;
                                              Database=RGBay;
                                              Trusted_Connection=True;";

        public IEnumerable<OrderProduct> GetOrderProductsByOrderId(int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [OrderProduct]
                            WHERE OrderId = @OrderId
                            AND IsDeleted = 0";
                var parameters = new
                {
                    OrderId = orderId
                };
                var orderProducts = db.Query<OrderProduct>(sql, parameters);
                return orderProducts;
            }
        }

        public IEnumerable<OrderProduct> GetOrderProductsByCustomerId(int customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [OrderProduct]
                            WHERE CustomerId = @CustomerId
                            AND IsDeleted = 0";
                var parameters = new
                {
                    CustomerId = customerId
                };
                var orderProducts = db.Query<OrderProduct>(sql, parameters);
                return orderProducts;
            }
        }

        public OrderProduct AddOrderProduct(OrderProduct orderProduct)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [OrderProduct]
                                ([OrderId], [ProductId], [Duration])
                            OUTPUT INSERTED.*
                            VALUES
                                (@orderId, @productId, @duration)";
                return db.QueryFirstOrDefault<OrderProduct>(sql, orderProduct);
            }
        }

        public bool DeleteFromCart(int orderProductId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [dbo].[OrderProduct]
                            SET [IsDeleted] = 1
                            WHERE Id = @orderProductId";
                var parameters = new {orderProductId};

                return db.Execute(sql, parameters) == 1;
            }
        }


    }
}

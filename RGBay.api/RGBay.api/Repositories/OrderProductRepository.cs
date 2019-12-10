using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using RGBay.api.DataModels;

namespace RGBay.api.Repositories
{
    public class OrderProductRepository
    {
        string _connectionString = @"Server=localhost;
                                     Database=RGBay;
                                     Trusted_Connection=True;";

        public IEnumerable<Order> GetOrderProductsByOrderId(int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [OrderProduct]
                            WHERE OrderId = @OrderId";
                var parameters = new
                {
                    OrderId = orderId
                };
                var orderProducts = db.Query<Order>(sql, parameters);
                return orderProducts;
            }
        }
    }
}

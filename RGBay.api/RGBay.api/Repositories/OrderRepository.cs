using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using RGBay.api.DataModels;

namespace RGBay.api.Repositories
{
    public class OrderRepository
    {
        string _connectionString = @"Server=localhost;
                                     Database=RGBay;
                                     Trusted_Connection=True;";

        public IEnumerable<Order> GetAllOrders()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Order]";
                var orders = db.Query<Order>(sql).AsList();
                return orders;
            }
        }

        public Order GetOrderByOrderId(int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Order]
                            WHERE Id = @OrderId";
                var parameters = new
                {
                    OrderId = orderId
                };
                var selectedOrder = db.QueryFirst<Order>(sql, parameters);
                return selectedOrder;
            }
        }

    }
}

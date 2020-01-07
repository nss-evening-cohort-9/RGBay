using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using RGBay.api.Commands;
using RGBay.api.DataModels;

namespace RGBay.api.Repositories
{
    public class OrderRepository
    {
        string _connectionString = @"Server=localhost;
                                     Database=RGBay;
                                     Trusted_Connection=True;";



        /* POST || CREATE */

        public Order CreateOrder(Order newOrder)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [Order]
                                ([CustomerId], [Date], [Total], [Status])
                            OUTPUT INSERTED.*
                            VALUES
                                (@customerId, @date, @total, @status)";
                return db.QueryFirst<Order>(sql, newOrder);
            }
        }

        public Order CreateCartOrder(int customerId)
        {
            var newOrder = new Order
            {
                CustomerId = customerId,
                Date = DateTime.Now,
                Status = "Cart"
            };
            return CreateOrder(newOrder);
        }

        public Cart CreateCartFromNewOrder(int customerId)
        {
            var cartOrder = CreateCartOrder(customerId);
            var newCart = new Cart
            {
                CartOrder = cartOrder
            };
            return newCart;
        }

        /* GET || READ */

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

        public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Order]
                            WHERE CustomerId = @CustomerId";
                var parameters = new
                {
                    CustomerId = customerId
                };
                var customerOrders = db.Query<Order>(sql, parameters);
                return customerOrders;
            }
        }

        public Order GetCartOrder(int customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Order]
                            WHERE CustomerId = @CustomerId
                            AND Status = @Status";
                var parameters = new
                {
                    CustomerId = customerId,
                    Status = "Cart"
                };
                var cart = db.QueryFirstOrDefault<Order>(sql, parameters);
                return cart;
            }
        }



        /* PUT || UPDATE */

        public Order UpdateOrderStatus(Order updatedOrder, int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Order]
                                SET [Status] = @status
                            OUTPUT INSERTED.*
                                WHERE [Id] = @id";

                updatedOrder.Id = orderId;

                var order = db.QueryFirst<Order>(sql, updatedOrder);

                return order;
            }
        }

        public Order UpdateOrderTotal(Order updatedOrder, int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [ORDER] 
                                SET [Total] = @total
                            OUTPUT INSERTED.*
                                WHERE [Id] = @id";

                updatedOrder.Id = orderId;

                var order = db.QueryFirst<Order>(sql, updatedOrder);

                return order;
            }
        }

        public Order UpdateFullOrder(Order updatedOrder, int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [ORDER] 
                                    SET [Total] = @total,
                                        [Status] = @status
                            OUTPUT INSERTED.*
                                WHERE [Id] = @id";

                updatedOrder.Id = orderId;

                var returningOrder = db.QueryFirst<Order>(sql, updatedOrder);

                return returningOrder;
            }
        }



        /* DELETE */
        
        public bool DeleteByOrderId(int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE FROM [Order]
                                WHERE Id = @orderId";

                var parameters = new { orderId };

                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}

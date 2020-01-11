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
    public class OrderRepository
    {
        readonly string _connectionString = @"Server=localhost;
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
                return db.QueryFirstOrDefault<Order>(sql, newOrder);
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
                            FROM [Order]
                            WHERE IsDeleted = 0";
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
                var selectedOrder = db.QueryFirstOrDefault<Order>(sql, parameters);
                return selectedOrder;
            }
        }

        public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"SELECT *
                            FROM [Order]
                            WHERE CustomerId = @CustomerId
                            AND IsDeleted = 0";
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
                            AND Status = @Status
                            AND IsDeleted = 0";
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

        public Order UpdateFullOrder(Order updatedOrder, int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Order] 
                                    SET [Total] = @total,
                                        [Status] = @status
                            OUTPUT INSERTED.*
                                WHERE [Id] = @id";

                updatedOrder.Id = orderId;

                var returningOrder = db.QueryFirstOrDefault<Order>(sql, updatedOrder);

                return returningOrder;
            }
        }

        public bool CheckoutOrder(Order orderToCheckout)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Order]
                            SET [Status] = @status
                            WHERE [Id] = @id";
                var parameters = new
                {
                    id = orderToCheckout.Id,
                    status = "Ordered"
                };

                return db.Execute(sql, parameters) == 1;
            }
        }

        public bool UpdateTotal(Order order)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [Order]
                            SET [Total] = @total
                            WHERE [Id] = @id";
                var parameters = new
                {
                    id = order.Id,
                    total = order.Total
                };

                return db.Execute(sql, parameters) == 1;

            }
        }

        public void CalculateOrderTotalThenUpdate(int orderId)
        {
            var orderToUpdate = GetOrderByOrderId(orderId);
            var itemsInOrder = new OrderProductRepository().GetOrderProductsByOrderId(orderId);
            var totalToAdd = 0;
            var productRepo = new ProductRepository();
            foreach (var item in itemsInOrder)
            {
                var product = productRepo.GetProduct(item.ProductId);
                if(item.Duration == 0)
                {
                    var itemCost = product.SalesPrice;
                    totalToAdd += itemCost;
                }

                if(item.Duration != 0)
                {
                    var itemCost = product.RentalPrice * item.Duration;
                    totalToAdd += itemCost;
                }
            }

            orderToUpdate.Total = totalToAdd;

            UpdateTotal(orderToUpdate);
        }

        /* DELETE */
        public bool DeleteByOrderId(int orderId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [dbo].[Order]
                            SET [IsDeleted] = 1
                            WHERE Id = @orderId";

                var parameters = new { orderId };

                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}

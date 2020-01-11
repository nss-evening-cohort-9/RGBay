using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using RGBay.api.Repositories;

namespace RGBay.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : FirebaseEnabledController
    {
        // POST  || CREATE//

        /* Add New Order (DateTime calculated here) */
        [HttpPost]
        [Authorize]
        public IActionResult CreateOrder(AddOrderCommand newOrderCommand)
        {
            var userRepo = new UserRepository();
            var user = userRepo.GetByUid(FirebaseUserId);
            var newOrder = new Order
            {
                CustomerId = user.Id,
                Date = DateTime.Now,
                Total = newOrderCommand.Total,
                Status = newOrderCommand.Status
            };

            var repo = new OrderRepository();
            var orderToBeAdded = repo.CreateOrder(newOrder);

            return Created($"api/Order/{orderToBeAdded.Id}", orderToBeAdded);
        }

        // GET || READ//

        /* Get All Orders */
        [HttpGet]
        public IEnumerable<Order> GetAllOrders()
        {
            var repo = new OrderRepository();
            var orders = repo.GetAllOrders();
            return orders;
        }

        /* Get an Order by "OrderId" */
        [HttpGet("{orderId:int}")]
        public ActionResult<Order> GetOrderByOrderId(int orderId)
        {
            var repo = new OrderRepository();
            var order = repo.GetOrderByOrderId(orderId);
            return order;
        }

        /* Get all Orders related to CustomerId */
        [HttpGet("customer/{customerId:int}")]
        public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
        {
            var repo = new OrderRepository();
            var customerOrders = repo.GetOrdersByCustomerId(customerId);
            return customerOrders;
        }

        // Get Orders by UID
        [HttpGet("uid")]
        [Authorize]
        public IEnumerable<Order> GetOrdersByUid()
        {
            var userRepo = new UserRepository();
            var orderRepo = new OrderRepository();
            var user = userRepo.GetByUid(FirebaseUserId);
            var orders = orderRepo.GetOrdersByCustomerId(user.Id);
            return orders;
        }

        [HttpGet("cart")]
        [Authorize]
        public ActionResult<Order> GetCartOrder()
        {
            var userRepo = new UserRepository();
            var orderRepo = new OrderRepository();
            var user = userRepo.GetByUid(FirebaseUserId);
            var cartOrder = orderRepo.GetCartOrder(user.Id);
            if (cartOrder == null)
            {
                return orderRepo.CreateCartOrder(user.Id);
            }
            orderRepo.CalculateOrderTotalThenUpdate(cartOrder.Id);
            return cartOrder;
        }

        [HttpPut("checkout")]
        [Authorize]
        public Cart OrderCheckout()
        {
            var orderRepo = new OrderRepository();
            var user = new UserRepository().GetByUid(FirebaseUserId);
            var orderToCheckout = orderRepo.GetCartOrder(user.Id);

            orderRepo.CheckoutOrder(orderToCheckout);

            var newCart = orderRepo.CreateCartFromNewOrder(user.Id);
            return newCart;
        }

        // DELETE //

        /* Delete Order by OrderId */
        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrderByOrderId(int orderId)
        {
            var repo = new OrderRepository();
            repo.DeleteByOrderId(orderId);

            return Ok();
        }
    }
}
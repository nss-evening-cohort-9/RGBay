using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class OrderController : ControllerBase
    {

        // GET //

        /* GET: api/order
           Get All Orders */
        [HttpGet]
        public IEnumerable<Order> GetAllOrders()
        {
            var repo = new OrderRepository();
            var orders = repo.GetAllOrders();
            return orders;
        }

        /* GET: order/OrderId
           Get an Order by "OrderId" */
        [HttpGet("orderId/{orderId:int}")]
        public ActionResult<Order> GetOrderByOrderId(int orderId)
        {
            var repo = new OrderRepository();
            var order = repo.GetOrderByOrderId(orderId);
            return order;
        }

        /* GET: order/CustomerId
           Get all Orders related to CustomerId */
        [HttpGet("customerId/{customerId:int}")]
        public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
        {
            var repo = new OrderRepository();
            var customerOrders = repo.GetOrdersByCustomerId(customerId);
            return customerOrders;
        }

        // POST //

        /* POST: api/Order
           Add New Order (DateTime calculated here) */
        [HttpPost]
        public IActionResult CreateOrder(AddOrderCommand newOrderCommand)
        {
            var newOrder = new Order
            {
                CustomerId = newOrderCommand.CustomerId,
                Date = DateTime.Now,
                Total = newOrderCommand.Total,
                Status = newOrderCommand.Status
            };

            var repo = new OrderRepository();
            var orderToBeAdded = repo.CreateOrder(newOrder);

            return Created($"api/Order/{orderToBeAdded.Id}", orderToBeAdded);
        }

        // PUT //

        /* PUT: Order/OrderId
           Update Order Status by OrderId */

        [HttpPut("status/{orderId}")]
        public IActionResult UpdateOrderStatus(UpdateOrderCommand updatedOrderCommand, int orderId)
        {
            var repo = new OrderRepository();

            var updatedOrder = new Order
            {
                Status = updatedOrderCommand.Status
            };

            var orderToBeUpdated = repo.UpdateOrderStatus(updatedOrder, orderId);

            if (orderToBeUpdated == null)
            {
                return NotFound("Order Status Could Not Be Updated");
            }

            return Ok(orderToBeUpdated);
        }

        [HttpPut("total/{orderId}")]
        public IActionResult UpdateOrderTotal(UpdateOrderCommand updatedOrderCommand, int orderId)
        {
            var repo = new OrderRepository();

            var updatedOrder = new Order
            {
                Total = updatedOrderCommand.Total
            };

            var orderToBeUpdated = repo.UpdateOrderTotal(updatedOrder, orderId);

            if (orderToBeUpdated == null)
            {
                return NotFound("Order Total Could Not Be Updated");
            }

            return Ok(orderToBeUpdated);
        } 

        // DELETE //

        /* DELETE: Order/OrderId
           Delete Order by OrderId */

        [HttpDelete("{orderId}")]
        public IActionResult DeleteOrderByOrderId(int orderId)
        {
            var repo = new OrderRepository();
            repo.DeleteByOrderId(orderId);

            return Ok();
        }
    }
}
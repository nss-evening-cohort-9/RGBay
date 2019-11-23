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

        /* Get All Orders */
        [HttpGet]
        public IEnumerable<Order> GetAllOrders()
        {
            var repo = new OrderRepository();
            var orders = repo.GetAllOrders();
            return orders;
        }

        /* Get an Order by "OrderId" */
        [HttpGet("orderId/{orderId:int}")]
        public ActionResult<Order> GetOrderByOrderId(int orderId)
        {
            var repo = new OrderRepository();
            var order = repo.GetOrderByOrderId(orderId);
            return order;
        }

        /* Get all Orders related to CustomerId */
        [HttpGet("customerId/{customerId:int}")]
        public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
        {
            var repo = new OrderRepository();
            var customerOrders = repo.GetOrdersByCustomerId(customerId);
            return customerOrders;
        }
        


        // POST //

        /* Add New Order (DateTime calculated here) */
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

        /* Update Order Status by OrderId */
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

        /* Update Order Total by OrderId*/
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

        /* Update Order Total/Status (Need to go over with team/instructors)*/
        [HttpPut]
        public IActionResult UpdateFullOrder(UpdateOrderCommand updatedOrderCommand)
        {
            var repo = new OrderRepository();

            var updatedOrder = new Order
            {
                Id = updatedOrderCommand.Id,
                Total = updatedOrderCommand.Total,
                CustomerId = updatedOrderCommand.CustomerId,
                Status = updatedOrderCommand.Status,
            };

            var orderToBeUpdated = repo.UpdateFullOrder(updatedOrder);

            if (orderToBeUpdated == null)
            {
                return NotFound("Order Status Could Not Be Updated... Are CustomerId & OrderId related?");
            }

            return Ok(orderToBeUpdated);
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
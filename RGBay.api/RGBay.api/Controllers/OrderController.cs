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




        // PUT || UPDATE//

        //*Update Order Details(Status AND/OR Total) CustomerId Needed for validation*/
        [HttpPut("{orderId:int}")]
        public IActionResult UpdateOrder(UpdateOrderCommand incomingOrder, int orderId)
        {
            var repo = new OrderRepository();


            var newOrder = new Order
            {
                Id = orderId,
                Total = incomingOrder.Total,
                CustomerId = incomingOrder.CustomerId,
                Status = incomingOrder.Status,
            };

            var matchedOrder = repo.GetOrderByOrderId(orderId);

            if (incomingOrder.CustomerId == matchedOrder.CustomerId)
            {
                //Update ONLY Order Total
                if (incomingOrder.Total != matchedOrder.Total
                    && (incomingOrder.Status == null
                        || incomingOrder.Status == matchedOrder.Status))
                {
                    var updatedOrderTotal = repo.UpdateOrderTotal(newOrder, newOrder.Id);

                    return Ok(updatedOrderTotal);
                }

                //Update ONLY Order Status
                else if (incomingOrder.Status != matchedOrder.Status
                         && (incomingOrder.Total == matchedOrder.Total
                             || incomingOrder.Total == 0))
                {
                    var updatedOrderStatus = repo.UpdateOrderStatus(newOrder, newOrder.Id);
                    return Ok(updatedOrderStatus);
                }

                // Update BOTH Status & Total
                else if (incomingOrder.Total != matchedOrder.Total
                         && incomingOrder.Status != matchedOrder.Status
                         &&incomingOrder.Total != 0 
                         && incomingOrder.Status != null)
                {
                    var updatedFullOrder = repo.UpdateFullOrder(newOrder, newOrder.Id);
                    return Ok(updatedFullOrder);
                }

                else if (incomingOrder.Total == matchedOrder.Total && incomingOrder.Status == matchedOrder.Status)
                {
                    return Ok();
                }

                else return NotFound("Order matched, but didn't update... Are values The same?");
            }
            else
            {
                return NotFound("Order Status Could Not Be Updated... Are CustomerId & OrderId related?");
            }
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RGBay.api.DataModels;
using RGBay.api.Dtos;
using RGBay.api.Repositories;

namespace RGBay.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        [HttpGet("order/{orderId:int}")]
        public IEnumerable<OrderProduct> GetOrderProductsByOrderId(int orderId)
        {
            var repo = new OrderProductRepository();
            var orderProducts = repo.GetOrderProductsByOrderId(orderId);
            return orderProducts;
        }

        [HttpGet("customer/{customerId:int}")]
        public IEnumerable<OrderProduct> GetOrderProductsByCustomerId(int customerId)
        {
            var repo = new OrderProductRepository();
            var orderProducts = repo.GetOrderProductsByCustomerId(customerId);
            return orderProducts;
        }

        [HttpGet("cart/{customerId:int}")]
        public Cart GetCart(int customerId)
        {

            return new Cart();
        }
            // get shopping cart (order id)
            // get order products for order id (cart)
            // get product details for each product id
    }
}
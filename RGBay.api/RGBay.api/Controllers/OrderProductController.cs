using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RGBay.api.DataModels;
using RGBay.api.Commands;
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
            var orderRepo = new OrderRepository();
            var productRepo = new ProductRepository();
            var orderProductRepo = new OrderProductRepository();
            var productList = new List<Product>();

            var cartOrder = orderRepo.GetCartOrder(customerId);

            if (cartOrder == null)
            {
                return new Cart();
            }
            else
            {
                var cartOrderProducts = orderProductRepo.GetOrderProductsByOrderId(cartOrder.Id);
                foreach (var product in cartOrderProducts)
                {
                    var productMatch = productRepo.GetProduct(product.ProductId);
                    productList.Add(productMatch);
                }

                var cart = new Cart
                {
                    CartOrder = cartOrder,
                    CartProducts = productList
                };
                return cart;
            }
        }

        [HttpPost("{customerId}")]
        public IActionResult CreateOrderProduct(AddOrderProductCommand addOrderProductCommand, int customerId)
        {
            var orderRepo = new OrderRepository();
            var productRepo = new ProductRepository();
            var orderProductRepo = new OrderProductRepository();
            var product = productRepo.GetProduct(addOrderProductCommand.ProductId);

            var cartOrder = orderRepo.GetCartOrder(customerId);

            if (cartOrder == null)
            {
                var createdOrder = orderRepo.CreateCartOrder(customerId, addOrderProductCommand.Duration, product);
                var orderId = createdOrder.Id;
                var orderProduct = new OrderProduct
                {
                    OrderId = orderId,
                    ProductId = addOrderProductCommand.ProductId,
                    Duration = addOrderProductCommand.Duration
                };
                var createdOP = orderProductRepo.AddOrderProduct(orderProduct);
                return Created($"api/OrderProduct/{createdOP.Id}", createdOP);
            }
            else
            {
                var orderProduct = new OrderProduct
                {
                    OrderId = cartOrder.Id,
                    ProductId = addOrderProductCommand.ProductId,
                    Duration = addOrderProductCommand.Duration
                };
                var createdOP = orderProductRepo.AddOrderProduct(orderProduct);
                return Created($"api/OrderProduct/{createdOP.Id}", createdOP);
            }
        }
    }
}
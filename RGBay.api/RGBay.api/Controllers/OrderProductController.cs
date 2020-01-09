using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RGBay.api.DataModels;
using RGBay.api.Commands;
using RGBay.api.Repositories;

namespace RGBay.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : FirebaseEnabledController
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

        [HttpGet("cart")]
        [Authorize]
        public Cart GetCart()
        {
            var orderRepo = new OrderRepository();
            var productRepo = new ProductRepository();
            var orderProductRepo = new OrderProductRepository();
            var productList = new List<Product>();
            var cartItems = new Dictionary<int, Product>();
            var userRepo = new UserRepository();
            var user = userRepo.GetByUid(FirebaseUserId);

            var cartOrder = orderRepo.GetCartOrder(user.Id);

            if (cartOrder == null)
            {
                var newCart = orderRepo.CreateCartFromNewOrder(user.Id);
                return newCart;
            }
            else
            {
                var cartOrderProducts = orderProductRepo.GetOrderProductsByOrderId(cartOrder.Id);
                foreach (var orderProduct in cartOrderProducts)
                {
                    var productMatch = productRepo.GetProduct(orderProduct.ProductId);
                    productList.Add(productMatch);
                    cartItems.Add(orderProduct.Id, productMatch);
                }

                var cart = new Cart
                {
                    CartOrder = cartOrder,
                    CartProducts = productList,
                    CartItems = cartItems
                };
                return cart;
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult CreateOrderProduct(AddOrderProductCommand addOrderProductCommand)
        {
            var orderRepo = new OrderRepository();
            var productRepo = new ProductRepository();
            var userRepo = new UserRepository();
            var orderProductRepo = new OrderProductRepository();
            var product = productRepo.GetProduct(addOrderProductCommand.ProductId);
            var user = userRepo.GetByUid(FirebaseUserId);
            var cartOrder = orderRepo.GetCartOrder(user.Id);

            if (cartOrder == null)
            {
                var createdOrder = orderRepo.CreateCartOrder(user.Id);
                var orderId = createdOrder.Id;
                var orderProduct = new OrderProduct
                {
                    OrderId = orderId,
                    ProductId = addOrderProductCommand.ProductId,
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
                };
                var createdOP = orderProductRepo.AddOrderProduct(orderProduct);
                return Created($"api/OrderProduct/{createdOP.Id}", createdOP);
            }
        }

        [HttpDelete("{orderProductId:int}")]
        [Authorize]
        public IActionResult DeleteFromCart(int orderProductId)
        {
            var repo = new OrderProductRepository();
            repo.DeleteFromCart(orderProductId);

            return Ok();
        }
    }
}
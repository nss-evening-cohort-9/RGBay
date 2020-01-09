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
        public Cart GetCartInfo()
        {
            var orderProductRepo = new OrderProductRepository();
            var orderRepo = new OrderRepository();
            var productRepo = new ProductRepository();
            var itemsInCart = new List<CartItem>();
            var user = new UserRepository().GetByUid(FirebaseUserId);
            var cartOrder = orderRepo.GetCartOrder(user.Id);
            
            if (cartOrder == null)
            { 
                return orderRepo.CreateCartFromNewOrder(user.Id);
            }

            var orderProducts = orderProductRepo.GetOrderProductsByOrderId(cartOrder.Id);
            
            foreach (var orderProduct in orderProducts)
            {
                var productInCart = productRepo.GetProduct(orderProduct.ProductId);
                var cartItem = new CartItem
                {
                    OrderProductId = orderProduct.Id,
                    Product = productInCart,
                };
                itemsInCart.Add(cartItem);
            }

            var cart = new Cart
            {
                CartOrder = cartOrder,
                CartItems = itemsInCart
            };

            return cart;
        }

        [HttpPost("add")]
        [Authorize]
        public IActionResult AddOrderProduct(AddOrderProductCommand orderProductCommand)
        {
            var repo = new OrderProductRepository();
            var newOrderProduct = new OrderProduct
            {
                OrderId = orderProductCommand.OrderId,
                ProductId = orderProductCommand.ProductId
            };
            var orderProductAdded = repo.AddOrderProduct(newOrderProduct);

            return Created($"api/OrderProduct/{orderProductAdded.Id}", orderProductAdded);
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
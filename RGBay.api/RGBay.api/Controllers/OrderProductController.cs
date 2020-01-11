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
                    Duration = orderProduct.Duration,
                    Product = productInCart,
                };
                itemsInCart.Add(cartItem);
            }

            var cart = new Cart
            {
                CartOrder = cartOrder,
                CartItems = itemsInCart
            };
            orderRepo.CalculateOrderTotalThenUpdate(cartOrder.Id);
            return cart;
        }

        [HttpGet("details/{orderId:int}")]
        [Authorize]
        public Cart GetOrderDetails(int orderId)
        {
            var orderRepo = new OrderRepository();
            var matchedOrder = orderRepo.GetOrderByOrderId(orderId);
            var productRepo = new ProductRepository();
            var orderProductRepo = new OrderProductRepository();
            var itemsInCart = new List<CartItem>();
            var orderProducts = orderProductRepo.GetOrderProductsByOrderId(orderId);

            foreach (var orderProduct in orderProducts)
            {
                var productInCart = productRepo.GetProduct(orderProduct.ProductId);
                var cartItem = new CartItem
                {
                    OrderProductId = orderProduct.Id,
                    Duration = orderProduct.Duration,
                    Product = productInCart,
                };
                itemsInCart.Add(cartItem);
            }

            var cart = new Cart
            {
                CartOrder = matchedOrder,
                CartItems = itemsInCart
            };

            return cart;
        }

        [HttpPost("add")]
        [Authorize]
        public IActionResult AddOrderProduct(AddOrderProductCommand orderProductCommand)
        {
            var repo = new OrderProductRepository();
            var orderRepo = new OrderRepository();
            var newOrderProduct = new OrderProduct
            {
                OrderId = orderProductCommand.OrderId,
                ProductId = orderProductCommand.ProductId,
                Duration = orderProductCommand.Duration
            };

            var orderProductAdded = repo.AddOrderProduct(newOrderProduct);
            orderRepo.CalculateOrderTotalThenUpdate(newOrderProduct.OrderId);
            return Created($"api/OrderProduct/{orderProductAdded.Id}", orderProductAdded);
        }

        [HttpDelete("{orderProductId:int}")]
        [Authorize]
        public IActionResult DeleteFromCart(int orderProductId)
        {
            var repo = new OrderProductRepository();
            var user = new UserRepository().GetByUid(FirebaseUserId);
            var orderToUpdate = new OrderRepository().GetCartOrder(user.Id);
            var orderRepo = new OrderRepository();
            repo.DeleteFromCart(orderProductId);
            orderRepo.CalculateOrderTotalThenUpdate(orderToUpdate.Id);
            return Ok();
        }
    }
}
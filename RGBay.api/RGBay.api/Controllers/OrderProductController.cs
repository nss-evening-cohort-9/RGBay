using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RGBay.api.DataModels;
using RGBay.api.Repositories;

namespace RGBay.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        [HttpGet("{orderId:int}")]
        public IEnumerable<OrderProduct> GetOrderProductsByOrderId(int orderId)
        {
            var repo = new OrderProductRepository();
            var orderProducts = repo.GetOrderProductsByOrderId(orderId);
        }
    }
}
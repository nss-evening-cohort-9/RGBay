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
    public class OrderController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Order> GetAllOrders()
        {
            var repo = new OrderRepository();
            var orders = repo.GetAllOrders();
            return orders;
        }
    }
}
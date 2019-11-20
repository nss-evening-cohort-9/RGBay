using System;
using System.Collections.Generic;
using System.Linq;
using RGBay.api.DataModels;
using RGBay.api.Dtos;
using RGBay.api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace RGBay.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        private readonly ILogger<PaymentTypeController> _logger;
        private readonly IPaymentTypeRepository _repo;

        public PaymentTypeController(ILogger<PaymentTypeController> logger, IPaymentTypeRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<PaymentType> GetAll()
        {
            return _repo.GetAllPaymentTypes();
        }

        [HttpGet("{paymentTypeId}")]
        public PaymentType Get(int paymentTypeId)
        {
            return _repo.GetAllPaymentTypes().FirstOrDefault(paymentType => paymentType.Id == paymentTypeId);
        }

        [HttpPost]
        public void Add(AddPaymentTypeDto newPaymentType)
        {
            _repo.AddPaymentType(newPaymentType);
        }

        [HttpDelete("{paymentTypeIdToDelete}/delete")]
        public void Delete(int paymentTypeIdToDelete)
        {
            _repo.DeletePaymentType(paymentTypeIdToDelete);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RGBay.api.Commands;
using RGBay.api.DataModels;
using RGBay.api.Repositories;

namespace RGBay.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypeController : ControllerBase
    {
        private readonly PaymentTypeRepository _repo = new PaymentTypeRepository();

        [HttpGet]
        public IEnumerable<PaymentType> GetAll()
        {
            return _repo.GetAllPaymentTypes();
        }

        [HttpGet("{id}")]
        public PaymentType GetPaymentType(int id)
        {
            return _repo.GetPaymentType(id);
        }

        [HttpPost]
        public void Add(AddPaymentTypeCommand newPaymentTypeCommand)
        {
            _repo.AddPaymentType(newPaymentTypeCommand);
        }

        [HttpPut("{id}")]
        public bool UpdatePaymentType(UpdatePaymentTypeCommand updatePaymentTypeCommand, int id)
        {
            updatePaymentTypeCommand.Id = id;
            return _repo.UpdatePaymentType(updatePaymentTypeCommand, id);
        }

        [HttpDelete("{id}")]
        public bool DeletePaymentType(int id)
        {
            return _repo.DeletePaymentType(id);
        }
    }
}
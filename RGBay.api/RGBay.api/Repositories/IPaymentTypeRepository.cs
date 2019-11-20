using System;
using System.Collections.Generic;
using RGBay.api.DataModels;
using RGBay.api.Dtos;

namespace RGBay.api.Repositories
{
    public interface IPaymentTypeRepository
    {
        IEnumerable<PaymentType> GetAllPaymentTypes();
        bool AddPaymentType(AddPaymentTypeDto newPaymentType);
        bool DeletePaymentType(int paymentTypeIdToDelete);
    }
}
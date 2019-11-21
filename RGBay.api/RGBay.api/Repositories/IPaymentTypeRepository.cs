using System;
using System.Collections.Generic;
using RGBay.api.DataModels;
using RGBay.api.Commands;

namespace RGBay.api.Repositories
{
    public interface IPaymentTypeRepository
    {
        IEnumerable<PaymentType> GetAllPaymentTypes();
        bool AddPaymentType(AddPaymentTypeCommand newPaymentType);
        bool UpdatePaymentType(UpdatePaymentTypeCommand updatedPaymentTypeCommand, int id);
        bool DeletePaymentType(int paymentTypeIdToDelete);
    }
}
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using RGBay.api.DataModels;
using RGBay.api.Commands;
using Dapper;

namespace RGBay.api.Repositories
{
    public class PaymentTypeRepository : IPaymentTypeRepository
    {
        string _connectionString = "Server=localhost; Database=RGBay; Trusted_Connection=True;";

        public IEnumerable<PaymentType> GetAllPaymentTypes()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                var allPaymentTypes = connection.Query<PaymentType>("Select * from [PaymentType]");

                return allPaymentTypes.AsList();
            }
        }

        public bool AddPaymentType(AddPaymentTypeCommand newPaymentType)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"INSERT INTO [dbo].[PaymentType]
                            ([UserId]
                            ,[ServiceName]
                            ,[ProfileName])
                            VALUES
                            (@userId
                            ,@serviceName
                            ,@profileName)";

                return connection.Execute(sql, newPaymentType) == 1;
            }
        }

        public bool UpdatePaymentType(UpdatePaymentTypeCommand updatedPaymentTypeCommand, int idOfPaymentTypeToUpdate)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"UPDATE [dbo].[PaymentType]
                            SET [ServiceName] = @serviceName
                                ,[ProfileName] = @profileName
                            WHERE Id = @id";
                //output inserted.*

                var parameters = new {id = idOfPaymentTypeToUpdate
                                     ,serviceName = updatedPaymentTypeCommand.ServiceName
                                     ,profileName = updatedPaymentTypeCommand.ProfileName};

                return connection.Execute(sql, parameters) == 1;
            }
        }

        public bool DeletePaymentType(int paymentTypeIdToDelete)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE FROM [dbo].[PaymentType]
                            WHERE [Id] = @paymentTypeId";

                var parameters = new { paymentTypeId = paymentTypeIdToDelete };

                return connection.Execute(sql, parameters) == 1;
            }
        }
    }
}

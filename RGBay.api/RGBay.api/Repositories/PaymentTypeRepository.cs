using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using RGBay.api.DataModels;
using RGBay.api.Commands;
using Dapper;

namespace RGBay.api.Repositories
{
    public class PaymentTypeRepository
    {
        string _connectionString = "Server=localhost; Database=RGBay; Trusted_Connection=True;";

        public IEnumerable<PaymentType> GetAllPaymentTypes()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "Select * from [PaymentType]";
                var allPaymentTypes = connection.Query<PaymentType>(sql);
                return allPaymentTypes;
            }
        }

        public PaymentType GetPaymentType(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"select * from PaymentType
                            where [id] = @id";
                var parameters = new { id };
                var paymentType = db.QueryFirstOrDefault<PaymentType>(sql, parameters);
                return paymentType;
            }
        }

        public bool AddPaymentType(AddPaymentTypeCommand newPaymentTypeCommand)
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
                return connection.Execute(sql, newPaymentTypeCommand) == 1;
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
                return connection.Execute(sql, updatedPaymentTypeCommand) == 1;
            }
        }

        public bool DeletePaymentType(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = @"DELETE FROM [dbo].[PaymentType]
                            WHERE [Id] = @id";
                var parameters = new { id };
                return connection.Execute(sql, parameters) == 1;
            }
        }
    }
}

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
    public class ProductController : FirebaseEnabledController
    {
        private readonly ProductRepository _repo = new ProductRepository();

        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _repo.GetProducts();
        }

        [HttpGet("{getLatestProductsNum}/latest")]
        public IEnumerable<Product> GetLatestProducts(int getLatestProductsNum)
        {
            return _repo.GetLatestProducts(getLatestProductsNum);
        }

        [HttpGet("{productId}")]
        public Product GetProduct(int productId)
        {
            return _repo.GetProduct(productId);
        }

        [HttpPost]
        public bool PostProduct(AddProductCommand addProductCommand)
        {
            return _repo.PostProduct(addProductCommand);
        }

        [HttpPut("{productId}")]
        public bool UpdateProduct(UpdateProductCommand updateProductCommand, int productId)
        {
            updateProductCommand.Id = productId;
            return _repo.UpdateProduct(updateProductCommand);
        }

        [HttpDelete("{productId}")]
        public bool DeleteProduct(int productId)
        {
            return _repo.DeleteProduct(productId);
        }
    }
}
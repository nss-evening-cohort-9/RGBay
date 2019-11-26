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
    public class ProductCategoryController : ControllerBase
    {
        private readonly ProductCategoryRepository _repo = new ProductCategoryRepository();

        [HttpGet]
        public IEnumerable<ProductCategory> GetProductCategories()
        {
            return _repo.GetAllProductCategories();
        }

        [HttpGet("{productCategoryId}")]
        public ProductCategory GetProduct(int productCategoryId)
        {
            return _repo.GetProductCategory(productCategoryId);
        }

        [HttpPost]
        public bool AddProductCategory(AddProductCategoryCommand addProductCategoryCommand)
        {
            return _repo.AddProductCategory(addProductCategoryCommand);
        }

        [HttpPut("{productCategoryId}")]
        public bool UpdateProductCategory(UpdateProductCategoryCommand updateProductCategoryCommand, int productCategoryId)
        {
            updateProductCategoryCommand.Id = productCategoryId;
            return _repo.UpdateProductCategory(updateProductCategoryCommand);
        }

        [HttpDelete("{productCategoryId}")]
        public bool DeleteProduct(int productCategoryId)
        {
            return _repo.DeleteProductCategory(productCategoryId);
        }
    }
}
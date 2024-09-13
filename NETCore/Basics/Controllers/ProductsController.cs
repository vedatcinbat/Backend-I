using Microsoft.AspNetCore.Mvc;
using NETCore.Basics.Models;

namespace Basics.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetProduct(int id)
        {
            // Logic to retrieve a product by ID
            return Ok(new { Id = id, Name = "Product", Price = 100 });
        }

        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            // Logic to create a new product
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product product)
        {
            // Logic to update the product
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            // Logic to delete the product
            return NoContent();
        }

    }
}
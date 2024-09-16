using EfCoreRestApi.Data;
using EfCoreRestApi.DTOs;
using EfCoreRestApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EfCoreRestApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public ProductsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _dbContext.Products.AsNoTracking().ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _dbContext.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound("Product not found with given Id : " + id);
        }

        return Ok(product);
    }

    [HttpGet("expensiveProducts")]
    public async Task<IActionResult> GetExpensiveProducts()
    {
        var expensiveProducts = await _dbContext.Products.Where(p => p.Price > 500).ToListAsync(); 
        
        return Ok(expensiveProducts);
    }

    [HttpGet("sortedProducts")]
    public async Task<IActionResult> GetSortedProducts()
    {
        var sortedProducts = await _dbContext.Products.OrderByDescending(p => p.Price).ToListAsync();
        
        return Ok(sortedProducts);
    }

    [HttpGet("groupedProducts")]
    public async Task<IActionResult> GetGroupedProducts()
    {
        var productGroups = await _dbContext.Products
            .GroupBy(p => p.CategoryId)
            .Select(g => new
            {
                CategoryId = g.Key,
                ProductCount = g.Count(),
            })
            .ToListAsync(); 
        
        return Ok(productGroups);
    }

    [HttpGet("projectProducts")]
    public async Task<IActionResult> ProjectProducts()
    {
        var productDtos = await _dbContext.Products
            .Select(p => new ProductDto()
            {
                Id = p.ProductId,
                Name = p.Name,
                Price = p.Price

            })
            .ToListAsync();
        
        return Ok(productDtos);
    }

    [HttpGet("productsWithCategories")]
    public async Task<IActionResult> GetProductsWithCategories()
    {
        var productsWithCategories = await _dbContext.Products
            .Include(p => p.Category)
            .ToListAsync();
        
        return Ok(productsWithCategories);
    }

    [HttpPost]
    public async Task<IActionResult> AddProduct(Product product)
    {
        await _dbContext.Products.AddAsync(product);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAllProducts), new { productId = product.ProductId, product });
    }
}
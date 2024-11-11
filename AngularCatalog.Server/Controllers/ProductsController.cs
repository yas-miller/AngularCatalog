using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularCatalog.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductsController : ControllerBase, IApiController<Product>
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly ProductsService _productsService;

        

        public ProductsController(ILogger<ProductsController> logger, ProductsService productsService)
        {
            this._logger = logger;
            this._productsService = productsService;
        }

        
        [HttpGet("/{id:int}")]
        public Product Get(int id)
        {
            return _productsService.getProductById(id);
        }
    }
}
using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularCatalog.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoriesController : ControllerBase, IApiController<Category>
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly CategoriesService _categoriesService;

        

        public CategoriesController(ILogger<ProductsController> logger, CategoriesService categoriesService)
        {
            this._logger = logger;
            this._categoriesService = categoriesService;
        }

        
        [HttpGet("/{id:int}")]
        public Category Get(int id)
        {
            return _categoriesService.getCategoryById(id);
        }
    }
}
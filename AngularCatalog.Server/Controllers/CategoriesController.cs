using Codebase.Models;
using Codebase.Models.Enums;
using Codebase.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularCatalog.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoriesController : Controller, IApiController<Category>
    {
        private readonly ILogger<CategoriesController> _logger;
        private readonly CategoriesService _categoriesService;
        
        public CategoriesController(ILogger<CategoriesController> logger, CategoriesService categoriesService)
        {
            this._logger = logger;
            this._categoriesService = categoriesService;
        }


        [HttpGet("")]
        public JsonResult GetAll()
        {
            try
            {
                var allProducts = _categoriesService.getAllCategories();

                return Json(allProducts);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
        [HttpGet("/{loadProducts:bool?}")]
        public JsonResult GetAll([FromQuery] bool? loadProducts)
        {
            try
            {
                var allProducts = _categoriesService.getAllCategories(loadProducts: loadProducts ?? false);

                return Json(allProducts);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
        [HttpGet("{id:int}")]
        public JsonResult Get([FromRoute] int id)
        {
            try
            {
                var category = _categoriesService.getCategoryById(id, loadProducts: true);
            
                return Json(category);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [Authorize(Roles = "ProUser, Admin")]
        [HttpPost("")]
        public JsonResult Create([FromBody] Category newCategory)
        {
            try
            {
                newCategory = _categoriesService.createCategory(newCategory);
            
                return Json(newCategory);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [Authorize(Roles = "ProUser, Admin")]
        [HttpPut("")]
        public JsonResult Update([FromBody] Category category)
        {
            try
            {
                var updatedCategory = _categoriesService.updateCategory(category);
            
                return Json(updatedCategory);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [Authorize(Roles = "ProUser, Admin")]
        [HttpDelete("{id:int}")]
        public StatusCodeResult Delete([FromRoute] int id)
        {
            try
            {
                _categoriesService.deleteCategory(id);

                return new OkResult();
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
    }
}
using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace AngularCatalog.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductsController : Controller, IApiController<Product>
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly ProductsService _productsService;

        public ProductsController(ILogger<ProductsController> logger, IWebHostEnvironment webHostEnvironment, ProductsService productsService)
        {
            this._logger = logger;
            this._webHostEnvironment = webHostEnvironment;
            this._productsService = productsService;
        }


        [HttpGet("")]
        public JsonResult GetAll()
        {
            try
            {
                var allProducts = _productsService.getAllProducts();

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
                var product = _productsService.getProductById(id);
            
                return Json(product);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [HttpPost("")]
        public JsonResult Create([FromBody] Product newProduct)
        {
            try
            {
                newProduct = _productsService.createProduct(newProduct);
            
                return Json(newProduct);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody] Product product)
        {
            try
            {
                var updatedProduct = _productsService.updateProduct(product);
            
                return Json(updatedProduct);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public StatusCodeResult Delete([FromRoute] int id)
        {
            try
            {
                _productsService.deleteProduct(id);

                return new OkResult();
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [HttpPost("[action]")]
        public JsonResult UploadImage()
        {
            try
            {
                if (!Request.HasFormContentType)
                    throw new Exception();
                if (Request.Form.Files.Count == 1 && Request.Form.Files.FirstOrDefault() is IFormFile file) 
                {
                    var webRootPathBaseDir = "img";
                    // Create wwwroot\Files directory if needed
                    if (!Directory.Exists(_webHostEnvironment.WebRootPath))
                    {
                        Directory.CreateDirectory(_webHostEnvironment.WebRootPath);
                    }
                    if (!Directory.Exists(_webHostEnvironment.WebRootPath + "/" + webRootPathBaseDir))
                    {
                        Directory.CreateDirectory(_webHostEnvironment.WebRootPath + "/" + webRootPathBaseDir);
                    }

                    // Process file
                    using (var readStream = file.OpenReadStream())
                    {
                        var fileFullName = _webHostEnvironment.WebRootPath + "/" + webRootPathBaseDir + "/" + Guid.NewGuid() + System.IO.Path.GetExtension(file.FileName);
                        var hostedFileName = webRootPathBaseDir + "/" + System.IO.Path.GetFileName(fileFullName);
                        //Save file to harddrive
                        using (FileStream fs = System.IO.File.Create(fileFullName))
                        {
                            file.CopyTo(fs);
                            fs.Flush();
                        }

                        return Json(new { url = hostedFileName });
                    }
                }
                else 
                {
                    throw new Exception("Неверное количество файлов для загрузки");
                }
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
    }
}
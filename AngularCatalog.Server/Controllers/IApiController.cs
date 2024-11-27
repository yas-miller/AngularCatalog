using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularCatalog.Server.Controllers
{
    public interface IApiController<T>
    {
        [HttpGet("")]
        public JsonResult GetAll();
        [HttpGet("{id:int}")]
        public JsonResult Get([FromRoute] int id);
        [HttpPost("")]
        public JsonResult Create([FromBody] T model);
        [HttpPut("")]
        public JsonResult Update([FromBody] T model);

        [HttpDelete("{id:int}")]
        public StatusCodeResult Delete([FromRoute] int id);
    }
}
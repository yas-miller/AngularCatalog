using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularCatalog.Server.Controllers
{
    public interface IApiController<T>
    {
        [HttpGet("/{id:int}")]
        public T Get(int id);
    }
}
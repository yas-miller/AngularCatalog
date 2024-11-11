using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularCatalog.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersController : ControllerBase, IApiController<User>
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UsersService _usersService;

        

        public UsersController(ILogger<UsersController> logger, UsersService usersService)
        {
            this._logger = logger;
            this._usersService = usersService;
        }

        
        [HttpGet("/{id:int}")]
        public User Get(int id)
        {
            return _usersService.getUserById(id);
        }
    }
}

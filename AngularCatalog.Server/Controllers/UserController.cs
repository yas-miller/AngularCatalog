using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AngularCatalog.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserService _userService;

        

        public UserController(ILogger<UsersController> logger, UserService userService)
        {
            this._logger = logger;
            this._userService = userService;
        }

        
        [HttpPost()]
        public ActionResult Register(User newUser)
        {
            var newUser = _userService.register(newUser);
            return newUser;

            this.HttpContext.SignInAsync()
        }
        [HttpGet()]
        public void Authorize(string login, string password)
        {
            _userService.authorize(login, password);
        }
    }
}

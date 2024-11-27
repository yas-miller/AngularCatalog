using System.Security.Claims;
using AngularCatalog.Server.Helpers;
using Codebase.Models;
using Codebase.Models.Enums;
using Codebase.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularCatalog.Server.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersController : Controller, IApiController<User>
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserService _userService;
        private readonly UsersService _usersService;
        
        public UsersController(ILogger<UsersController> logger, UserService userService, UsersService usersService)
        {
            this._logger = logger;
            this._userService = userService;
            this._usersService = usersService;
        }

        
        [HttpGet("")]
        public JsonResult GetAll()
        {
            try
            {
                var allUsers = _usersService.getAllUsers();

                return Json(allUsers);
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
                var user = _usersService.getUserById(id);
            
                return Json(user);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [HttpPost("")]
        public JsonResult Create([FromBody] User newUser)
        {
            try
            {
                newUser = _usersService.createUser(newUser);
            
                return Json(newUser);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [HttpPut("")]
        public JsonResult Update([FromBody] User user)
        {
            try
            {
                var updatedUser = _usersService.updateUser(user);
            
                return Json(updatedUser);
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
                _usersService.deleteUser(id);

                return new OkResult();
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
        
        
        [HttpGet("[action]/{userId:int}")]
        public StatusCodeResult BlockUser([FromRoute] int userId)
        {
            try
            {
                _usersService.blockUser(userId);
            
                return new OkResult();
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
        [HttpGet("[action]/{userId:int}")]
        public StatusCodeResult UnblockUser([FromRoute] int userId)
        {
            try
            {
                _usersService.unblockUser(userId);
            
                return new OkResult();
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
        [HttpGet("[action]")]
        public StatusCodeResult ChangePassword(int userId, string? oldPassword, string newPassword)
        {
            try
            {
                var currentUserIsAuthenticated = this.HttpContext.User.Identity!.IsAuthenticated;
                int.TryParse(this.HttpContext.User.FindFirstValue(CustomClaimTypes.Id), out int currentUserId);
                Enum.TryParse<EUserType>(this.HttpContext.User.FindFirstValue(ClaimTypes.Role), out EUserType currentUserRole);

                var currentUser = this._userService.tryFindUserByIdAndRole(currentUserId, currentUserRole);


                _usersService.changePassword(userId, oldPassword, newPassword, adminRequest: currentUser?.UserType == EUserType.Admin);
            
                return new OkResult();
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
    }
}

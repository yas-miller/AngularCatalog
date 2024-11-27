using Codebase.Models;
using Codebase.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AngularCatalog.Server.Helpers;
using Codebase.Models.Enums;
using Microsoft.AspNetCore.Authorization;

namespace AngularCatalog.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UserService _userService;

        public UserController(ILogger<UsersController> logger, UserService userService)
        {
            this._logger = logger;
            this._userService = userService;
        }

        
        [HttpGet]
        public JsonResult IsAuthenticated()
        {
            try
            {
                var currentUserIsAuthenticated = this.HttpContext.User.Identity!.IsAuthenticated;
                int.TryParse(this.HttpContext.User.FindFirstValue(CustomClaimTypes.Id), out int currentUserId);
                Enum.TryParse<EUserType>(this.HttpContext.User.FindFirstValue(ClaimTypes.Role), out EUserType currentUserRole);

                var currentUser = this._userService.tryFindUserByIdAndRole(currentUserId, currentUserRole);

                return Json(new {
                    isAuthenticated = currentUserIsAuthenticated,
                    currentUser,
                    currentUserId,
                    currentUserRole
                });
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }     
        [HttpPost]
        public async Task<JsonResult> RegisterAsync([FromBody] User newUser)
        {
            try
            {
                var currentUserIsAuthenticated = this.HttpContext.User.Identity!.IsAuthenticated;
                int.TryParse(this.HttpContext.User.FindFirstValue(CustomClaimTypes.Id), out int currentUserId);
                Enum.TryParse<EUserType>(this.HttpContext.User.FindFirstValue(ClaimTypes.Role), out EUserType currentUserRole);

                var currentUser = this._userService.tryFindUserByIdAndRole(currentUserId, currentUserRole);

                var adminRequest = currentUser?.UserType == EUserType.Admin;


                newUser = _userService.register(newUser, adminRequest: adminRequest);

                if (!currentUserIsAuthenticated) {
                    await this.HttpContext.SignInAsync(ClaimsPrincipalHelper.CreateClaimsPrincipal(newUser));
                }
                
                return Json(newUser);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }        
        [HttpGet]
        public async Task<JsonResult> AuthorizeAsync(string login, string password)
        {
            try
            {
                var user = _userService.authorize(login, password);

                await this.HttpContext.SignInAsync(ClaimsPrincipalHelper.CreateClaimsPrincipal(user));
                
                return Json(user);
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<StatusCodeResult> LogOutAsync()
        {
            try
            {
                await this.HttpContext.SignOutAsync();

                return new OkResult();
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }


        [Authorize]
        [HttpGet]
        public StatusCodeResult ChangePassword(string oldPassword, string newPassword)
        {
            try
            {
                if (int.TryParse(HttpContext.User.FindFirstValue(CustomClaimTypes.Id), out int userId))
                {
                    _userService.changePassword(userId, oldPassword, newPassword);

                    return new OkResult();
                }
                else
                {
                    throw new Exception("ID текущего пользователя не найдено. Перезайдите в систему");
                }
            }
            catch (Exception e)
            {
                throw new BadHttpRequestException(e.Message);
            }
        }
    }
}

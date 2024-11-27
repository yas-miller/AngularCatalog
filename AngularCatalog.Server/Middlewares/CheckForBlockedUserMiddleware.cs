using System.Security.Claims;
using AngularCatalog.Server.Helpers;
using Codebase.Models.Enums;
using Codebase.Services;

public class CheckForBlockedUserMiddleware
{
    private readonly RequestDelegate _next;

    public CheckForBlockedUserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext, UserService userService)
    {
        try
        {
            var currentUserIsAuthenticated = httpContext.User.Identity!.IsAuthenticated;
            int.TryParse(httpContext.User.FindFirstValue(CustomClaimTypes.Id), out int currentUserId);
            Enum.TryParse<EUserType>(httpContext.User.FindFirstValue(ClaimTypes.Role), out EUserType currentUserRole);

            var currentUser = userService.tryFindUserByIdAndRole(currentUserId, currentUserRole);


            if (currentUser?.IsBlocked == true) 
            {
                throw new BlockedUserException();
            }
            
            await _next(httpContext);
        }
        catch (BlockedUserException BlockedUserException)
        {
            httpContext.Response.Clear();
            httpContext.Response.StatusCode = (int)StatusCodes.Status404NotFound;
        }
        catch (Exception e)
        {
            throw new BadHttpRequestException(e.Message);
        }
    }
}

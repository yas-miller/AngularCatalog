using System.Security.Claims;
using Codebase.Models;
using Codebase.Models.Enums;

namespace AngularCatalog.Server.Helpers
{
    public static class ClaimsPrincipalHelper
    {
        public static ClaimsPrincipal CreateClaimsPrincipal(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(CustomClaimTypes.Id, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(EUserType), user.UserType)),
            };

            return new ClaimsPrincipal(new ClaimsIdentity(claims, "ApplicationCookie", ClaimTypes.Name, ClaimsIdentity.DefaultRoleClaimType));
        }
    }
}

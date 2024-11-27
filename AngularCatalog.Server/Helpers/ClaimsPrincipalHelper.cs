using Codebase.Models;
using Codebase.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Services
{
    public static class ClaimsPrincipalHelper
    {
        public static ClaimsPrincipal CreateNewClaimsPrincipal(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.Role, Enum.GetName(typeof(EUserType), user.UserType)),
            };

            return new ClaimsPrincipal(new ClaimsIdentity(claims, "ApplicationCookie", ClaimTypes.Name, ClaimsIdentity.DefaultRoleClaimType));
        }
    }
}

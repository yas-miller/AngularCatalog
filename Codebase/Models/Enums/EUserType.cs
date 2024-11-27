using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Models.Enums
{
    public enum EUserType: int
    {
        [Description("Простой пользователь")]
        User = 0,
        [Description("Продвинутый пользователь")]
        ProUser = 1,
        [Description("Администратор")]
        Admin = 2
    }
}

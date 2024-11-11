using Codebase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Services
{
    public class UserService
    {
        private AppDbContext _appDbContext;
        
        public User? CurrentUser { get; private set; }
        
        public UserService(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public void authorize(string username, string password)
        {
            
        }
    }
}

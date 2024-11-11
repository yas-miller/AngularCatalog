using Codebase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Services
{
    public class UsersService
    {
        private AppDbContext _appDbContext;
        public UsersService(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public List<User> getAllUsers()
        {
            var users = _appDbContext.Users.ToList();

            return users;
        }
        public User getUserById(int id)
        {
            var user = _appDbContext.Users.Find(id);

            return user ?? throw new Exception("Пользователь с таким ID не найден");
        }
    }
}

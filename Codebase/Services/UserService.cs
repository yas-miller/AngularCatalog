using Codebase.Helpers;
using Codebase.Models;
using Codebase.Models.Enums;
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
        private readonly AppDbContext _appDbContext;
        private readonly UsersService _usersService;
        
        public UserService(AppDbContext appDbContext, UsersService usersService)
        {
            this._appDbContext = appDbContext;
            this._usersService = usersService;
        }

        
        public User? tryFindUserByIdAndRole(int id, EUserType userType)
        {
            var user = this._appDbContext.Users.SingleOrDefault(u => u.Id == id && u.UserType == userType);

            return user;
        }
        public User authorize(string login, string password)
        {
            var user = this._appDbContext.Users.SingleOrDefault(u => u.Login == login);

            if (user != null)
            {
                if (PasswordHelper.ValidatePassword(user.PasswordHash, user.PasswordSalt, password))
                {
                    return user;
                }
                else
                {
                    throw new Exception("Пароль неверный");
                }
            }
            else
            {
                throw new Exception("Пользователь с таким логином не найден");
            }
        }

        public User register(User newUser, bool adminRequest = false)
        {
            var user = this._appDbContext.Users.SingleOrDefault(u => u.Login == newUser.Login);

            if (user == null)
            {
                var hashedPasswordWithSaltTuple = PasswordHelper.HashPassword(newUser.Password);
                var passwordHash = hashedPasswordWithSaltTuple.Item1;
                var passwordSalt = hashedPasswordWithSaltTuple.Item2;
                
                newUser.PasswordHash = passwordHash;
                newUser.PasswordSalt = passwordSalt;
                
                newUser.Id = default(int);
                if (!adminRequest) {
                    newUser.UserType = default(EUserType);
                }

                this._appDbContext.Users.Add(newUser);
                this._appDbContext.SaveChanges();

                return newUser;
            }
            else
            {
                throw new Exception("Пользователь с таким логином уже существует");
            }
        }


        public void changePassword(int userId, string oldPassword, string newPassword) =>
            _usersService.changePassword(userId, oldPassword, newPassword);

        public void changePassword(User currentUser, string oldPassword, string newPassword) =>
            _usersService.changePassword(currentUser, oldPassword, newPassword);
    }
}

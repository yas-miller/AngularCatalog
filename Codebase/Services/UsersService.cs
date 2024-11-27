using Codebase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Codebase.Helpers;

namespace Codebase.Services
{
    public class UsersService
    {
        private readonly AppDbContext _appDbContext;
        
        public UsersService(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        
        public List<User> getAllUsers()
        {
            var users = _appDbContext.Users.ToList();

            return users;
        }
        public User getUserById(int userId)
        {
            var user = _appDbContext.Users.Find(userId);

            return user ?? throw new Exception("Пользователь с таким ID не найден");
        }
        public User createUser(User newUser)
        {
            newUser.Id = default(int);
            
            _appDbContext.Users.Add(newUser);
            _appDbContext.SaveChanges();

            return newUser;
        }
        public User updateUser(User user)
        {
            _appDbContext.Users.Update(user);
            _appDbContext.SaveChanges();
            
            return user;
        }
        public void deleteUser(int userId)
        {
            var user = _appDbContext.Users.Find(userId);
            this.deleteUser(user ?? throw new Exception("Пользователь с таким ID не найден"));
        }
        public void deleteUser(User user)
        {
            _appDbContext.Users.Remove(_appDbContext.Users.Find(user.Id)!);
            _appDbContext.SaveChanges();
        }
        
        
        public void blockUser(int userId)
        {
            var user = this._appDbContext.Users.Find(userId);

            this.blockUser(user ?? throw new Exception("Пользователь с таким ID не найден"));
        }
        public void blockUser(User user)
        {
            user.IsBlocked = true;
            _appDbContext.SaveChanges();
        }
        
        public void unblockUser(int userId)
        {
            var user = this._appDbContext.Users.Find(userId);

            this.unblockUser(user ?? throw new Exception("Пользователь с таким ID не найден"));
        }
        public void unblockUser(User user)
        {
            user.IsBlocked = false;
            _appDbContext.SaveChanges();
        }
        
        public void changePassword(int userId, string? oldPassword, string newPassword, bool adminRequest = false)
        {
            var user = this._appDbContext.Users.Find(userId);

            this.changePassword(user ?? throw new Exception("Пользователь с таким ID не найден"), oldPassword, newPassword, adminRequest: adminRequest);
        }
        public void changePassword(User user, string? oldPassword, string newPassword, bool adminRequest = false)
        {
            if (adminRequest || PasswordHelper.ValidatePassword(user.PasswordHash, user.PasswordSalt, oldPassword))
            {
                var hashedPasswordWithSaltTuple = PasswordHelper.HashPassword(newPassword);
                var passwordHash = hashedPasswordWithSaltTuple.Item1;
                var passwordSalt = hashedPasswordWithSaltTuple.Item2;
                
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                _appDbContext.SaveChanges();
            }
            else
            {
                throw new Exception("Пароль неверный");
            }
        }
    }
}

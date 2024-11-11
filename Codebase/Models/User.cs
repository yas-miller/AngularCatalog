using Codebase.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Models
{
    public class User
    {
        public int Id { get; set; }
        public required EUserType UserType { get; set; }
        [MaxLength(100)]
        public string? Name { get; set; }
        [MaxLength(100)]
        public string? Surname { get; set; }
        [MaxLength(100)]
        public required string Login { get; set; }
        [MaxLength(100)]
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public string? ImageUrl { get; set; }
    }
}

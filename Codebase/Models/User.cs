using Codebase.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Models
{
    public class User
    {
        public int Id { get; set; }
        public bool IsBlocked { get; set; }
        public EUserType UserType { get; set; }
        [MaxLength(100)]
        public string? Name { get; set; }
        [MaxLength(100)]
        public string? Surname { get; set; }
        [MaxLength(100)]
        public required string Email { get; set; }
        [MaxLength(100)]
        public required string Login { get; set; }
        [NotMapped]
        public string? Password { get; set; }
        public string? PasswordHash { get; set; }
        public string? PasswordSalt { get; set; }
        
        [InverseProperty(nameof(Category.UserCreated))]
        public virtual List<Category>? CreatedCategories { get; set; }
        [InverseProperty(nameof(Product.UserCreated))]
        public virtual List<Product>? CreatedProducts { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Models
{
    public class Category
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public required string Name { get; set; }
        public User? UserCreated { get; set; }
        public DateTime? DateTimeCreated { get; set; }
        
        [InverseProperty(nameof(Product.Category))]
        public virtual List<Product>? Products { get; set; }
    }
}

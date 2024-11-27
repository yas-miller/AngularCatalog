using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Models
{
    public class Product
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public required string Name { get; set; }
        public Category? Category { get; set; }
        [MaxLength(300)]
        public string? Description { get; set; }
        public decimal? PriceRubles { get; set; }
        [MaxLength(1000)]
        public string? Notes { get; set; }
        [MaxLength(1000)]
        public string? NotesSpecial { get; set; }
        public string? ImageUrl { get; set; }
        
        public User? UserCreated { get; set; }
        public DateTime? DateTimeCreated { get; set; }
    }
}

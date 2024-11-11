using Codebase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Services
{
    public class ProductsService
    {
        private AppDbContext _appDbContext;
        public ProductsService(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public List<Product> getAllProducts()
        {
            var products = _appDbContext.Products.Include(p => p.Category).ToList();

            return products;
        }
        public Product getProductById(int id)
        {
            var product = _appDbContext.Products.Find(id);

            return product ?? throw new Exception("Продукт с таким ID не найден");
        }
    }
}

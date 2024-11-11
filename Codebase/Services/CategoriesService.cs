using Codebase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase.Services
{
    public class CategoriesService
    {
        private AppDbContext _appDbContext;
        public CategoriesService(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public List<Category> getAllCategories(bool loadProducts = false)
        {
            List<Category>? categories = null;
            if (loadProducts)
            {
                categories = this._appDbContext.Categories.ToList();
            }
            else
            {
                categories = this._appDbContext.Categories.Include(c => c.Products).ToList();
            }

            return categories;
        }
        public Category getCategoryById(int id)
        {
            var category = _appDbContext.Categories.Find(id);

            return category ?? throw new Exception("Категория с таким ID не найдена");
        }
    }
}

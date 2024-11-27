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
        private readonly AppDbContext _appDbContext;
        
        public CategoriesService(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        
        public List<Category> getAllCategories(bool loadProducts = false)
        {
            List<Category>? categories = null;
            if (loadProducts)
            {
                categories = this._appDbContext.Categories.Include(c => c.Products).ToList();
                categories = categories.Select(c => 
                {
                    if (c?.Products?.Any() == true)
                    {
                        foreach (var product in c.Products) {
                            product.Category = null;
                        }
                    }
                    return c;
                }).ToList();
            }
            else
            {
                categories = this._appDbContext.Categories.ToList();
            }

            return categories;
        }
        public Category getCategoryById(int id, bool loadProducts = false)
        {
            Category? category = null;
            if (loadProducts)
            {
                category = this._appDbContext.Categories.Include(c => c.Products).SingleOrDefault(c => c.Id == id);
                if (category?.Products?.Any() == true)
                {
                    foreach (var product in category.Products) {
                        product.Category = null;
                    }
                }
            }
            else
            {
                category = this._appDbContext.Categories.Find(id);
            }

            return category ?? throw new Exception("Категория с таким ID не найдена");
        }
        public Category createCategory(Category newCategory)
        {
            newCategory.Id = default(int);
            
            _appDbContext.Categories.Add(newCategory);
            _appDbContext.SaveChanges();

            return newCategory;
        }
        public Category updateCategory(Category category)
        {
            _appDbContext.Categories.Update(category);
            _appDbContext.SaveChanges();
            
            return category;
        }
        public void deleteCategory(int categoryId)
        {
            var category = _appDbContext.Categories.Include(c => c.Products).SingleOrDefault(c => c.Id == categoryId);
            this.deleteCategory(category ?? throw new Exception("Категория с таким ID не найдена"));
        }
        public void deleteCategory(Category category)
        {
            _appDbContext.Categories.Remove(category);
            _appDbContext.SaveChanges();
        }
    }
}

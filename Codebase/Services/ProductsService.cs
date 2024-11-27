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
        private readonly AppDbContext _appDbContext;
        
        public ProductsService(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        
        public List<Product> getAllProducts()
        {
            var products = _appDbContext.Products.Include(p => p.Category).ToList();
            products = products.Select(p => { 
                if (p.Category != null)
                {
                    p.Category.Products = null;
                }
                return p;
            }).ToList();
            return products;
        }
        public Product getProductById(int productId)
        {
            var product = _appDbContext.Products.Include(p => p.Category).ToList().SingleOrDefault(c => c.Id == productId);
            if (product?.Category != null) 
            {
                product.Category.Products = null;
            }

            return product ?? throw new Exception("Продукт с таким ID не найден");
        }
        public Product createProduct(Product newProduct)
        {
            newProduct.Id = default(int);
            newProduct.Category = _appDbContext.Categories.Find(newProduct.Category?.Id);
            
            _appDbContext.Products.Add(newProduct);
            _appDbContext.SaveChanges();

            if (newProduct?.Category != null) 
            {
                newProduct.Category.Products = null;
            }
            return newProduct;
        }
        public Product updateProduct(Product product)
        {
            product.Category = _appDbContext.Categories.Find(product.Category?.Id);

            _appDbContext.Products.Update(product);
            _appDbContext.SaveChanges();
            
            if (product?.Category != null) 
            {
                product.Category.Products = null;
            }

            return product;
        }
        public void deleteProduct(int productId)
        {
            var product = _appDbContext.Products.Find(productId);
            this.deleteProduct(product ?? throw new Exception("Продукт с таким ID не найден"));
        }
        public void deleteProduct(Product product)
        {
            product.Category = _appDbContext.Categories.Find(product.Category?.Id);

            _appDbContext.Products.Remove(_appDbContext.Products.Find(product.Id)!);
            _appDbContext.SaveChanges();
        }
    }
}

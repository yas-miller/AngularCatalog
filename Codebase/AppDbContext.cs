﻿using Codebase.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codebase
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        public AppDbContext()
        {
            Database.Migrate();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["MysqlServer"].ConnectionString;

            optionsBuilder.UseMySql(connectionString,
                new MySqlServerVersion(ServerVersion.AutoDetect(connectionString)));
        }
    }
}

﻿// <auto-generated />
using System;
using Codebase;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Codebase.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Codebase.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("DateTimeCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int?>("UserCreatedId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserCreatedId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Codebase.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateTimeCreated")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasMaxLength(300)
                        .HasColumnType("varchar(300)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Notes")
                        .HasMaxLength(1000)
                        .HasColumnType("varchar(1000)");

                    b.Property<string>("NotesSpecial")
                        .HasMaxLength(1000)
                        .HasColumnType("varchar(1000)");

                    b.Property<decimal?>("PriceRubles")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int?>("UserCreatedId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserCreatedId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Codebase.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordSalt")
                        .HasColumnType("longtext");

                    b.Property<string>("Surname")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Codebase.Models.Category", b =>
                {
                    b.HasOne("Codebase.Models.User", "UserCreated")
                        .WithMany("CreatedCategories")
                        .HasForeignKey("UserCreatedId");

                    b.Navigation("UserCreated");
                });

            modelBuilder.Entity("Codebase.Models.Product", b =>
                {
                    b.HasOne("Codebase.Models.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId");

                    b.HasOne("Codebase.Models.User", "UserCreated")
                        .WithMany("CreatedProducts")
                        .HasForeignKey("UserCreatedId");

                    b.Navigation("Category");

                    b.Navigation("UserCreated");
                });

            modelBuilder.Entity("Codebase.Models.Category", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("Codebase.Models.User", b =>
                {
                    b.Navigation("CreatedCategories");

                    b.Navigation("CreatedProducts");
                });
#pragma warning restore 612, 618
        }
    }
}

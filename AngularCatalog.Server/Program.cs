using Codebase;
using Codebase.Services;

namespace AngularCatalog.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppDbContext>();
            builder.Services.AddScoped<ProductsService>();
            builder.Services.AddScoped<CategoriesService>();
            builder.Services.AddScoped<UsersService>();
            builder.Services.AddLogging();

            //

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            //
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}

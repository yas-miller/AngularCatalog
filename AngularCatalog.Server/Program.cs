using ApiMultiPartFormData;
using Codebase;
using Codebase.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.HttpLogging;

namespace AngularCatalog.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers(options =>
            {
                options.InputFormatters.Add(new MultipartFormDataFormatter());
            })
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            builder.Services.AddDbContext<AppDbContext>();
            builder.Services.AddScoped<ProductsService>();
            builder.Services.AddScoped<CategoriesService>();
            builder.Services.AddScoped<UsersService>();
            builder.Services.AddScoped<UserService>();
            
            builder.Services.AddHttpLogging(logging =>
            {
                logging.LoggingFields = HttpLoggingFields.All;
                logging.RequestBodyLogLimit = 4096;
                logging.ResponseBodyLogLimit = 4096;
            });

            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie((options) =>
                {
                    options.Cookie.HttpOnly = false;
                    options.LoginPath = string.Empty;
                    options.AccessDeniedPath = string.Empty;
                    options.Events.OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        return Task.CompletedTask;
                    };
                    options.Events.OnRedirectToAccessDenied = context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        return Task.CompletedTask;
                    };
                });
            builder.Services.AddAuthorization();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowCors", builder => 
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });

            //

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            //
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware<CheckForBlockedUserMiddleware>();

            app.UseCors("AllowCors");

            app.UseHttpLogging();


            app.MapControllers();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}

using FilmApp3.Data;
using FilmApp3.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace FilmApp3.Configuration
{
    public class FilmTrackerApp
    {
        private readonly WebApplicationBuilder _builder;
        private readonly WebApplication _app;
        public FilmTrackerApp(string[] args)
        {
            _builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            ConfigureServices();

            _app = _builder.Build();

            ConfigureMiddlewares();

            

        }
        private void ConfigureServices()
        {
            _builder.Services.AddDbContext<DatabaseContext>(options =>
                            options.UseSqlServer(_builder.Configuration.GetConnectionString("DefaultConnction")));

            AddAuthApi();

            _builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            _builder.Services.AddEndpointsApiExplorer();
            
            _builder.Services.AddSwaggerGen(CustomSwaggerGenOptions);
        }

        private void AddAuthApi()
        {
            _builder.Services.AddAuthorization();

            _builder.Services.AddIdentityApiEndpoints<CustomUser>(CustomIdentityOptions)
                .AddEntityFrameworkStores<DatabaseContext>();
        }

        private void CustomIdentityOptions(IdentityOptions options)
        {
            if (_builder.Environment.IsDevelopment())
            {
                // Set simpler passwordRequirements for development
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
            }
        }

        private void CustomSwaggerGenOptions(SwaggerGenOptions options)
        {
            options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey
            });

            options.OperationFilter<SecurityRequirementsOperationFilter>(); // Required for using access token
        }

        private void ConfigureMiddlewares()
        {
            // Configure the HTTP request pipeline.
            if (_app.Environment.IsDevelopment())
            {
                _app.UseSwagger();
                _app.UseSwaggerUI();
            }

            _app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            _app.UseHttpsRedirection();

            _app.MapIdentityApi<CustomUser> ();

            _app.UseAuthorization();

            _app.MapControllers();
        }

        public void Run()
        {
            _app.Run();

        }
    }
    
}

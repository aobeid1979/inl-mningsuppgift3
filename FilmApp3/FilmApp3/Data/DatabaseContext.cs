using FilmApp3.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FilmApp3.Data
{
    public class DatabaseContext : IdentityDbContext<CustomUser>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        public DbSet<Film> Films { get; set; }
        public DbSet<Review> Reviews { get; set; }
    }
}

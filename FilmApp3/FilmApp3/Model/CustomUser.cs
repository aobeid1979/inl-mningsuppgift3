using Microsoft.AspNetCore.Identity;

namespace FilmApp3.Model
{
    public class CustomUser : IdentityUser
    {
        public ICollection<Film> Films { get; set; } = new List<Film>();
    }
}

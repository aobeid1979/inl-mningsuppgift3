using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System.ComponentModel.DataAnnotations;

namespace FilmApp3.Model
{
    public class Film
    {
        [Key]
        public int Id { get; set; }
        [Required] 
        public string? Title { get; set; }

        public DateTime ReleaseYear { get; set; }
        public string Genre { get; set; }

        [ValidateNever]
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}

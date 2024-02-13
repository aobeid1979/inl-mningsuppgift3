using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FilmApp3.Model
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        public int Rate { get; set; }

        public string Comments { get; set; }
        [ValidateNever]
        [ForeignKey("Film")]
        public int FilmId { get; set; }
        [ValidateNever]
        public Film Film { get; set; }

        
    }
}

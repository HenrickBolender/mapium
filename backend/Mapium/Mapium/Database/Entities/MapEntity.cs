using System.ComponentModel.DataAnnotations.Schema;

namespace Mapium.Database.Entities
{
    public class MapEntity
    {
        public int Id { get; set; }
        public string Name { get; set;  }
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public UserEntity UserEntity { get; set; }
    }
}                                                                                                                                                                                   
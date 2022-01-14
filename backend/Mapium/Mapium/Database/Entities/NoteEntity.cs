using System.ComponentModel.DataAnnotations.Schema;

namespace Mapium.Database.Entities
{
    public class NoteEntity
    {
        public int Id { get; set; }
        
        //foreign key
        public int MapId { get; set; }

        [ForeignKey(nameof(MapId))]
        public MapEntity Map { get; set; }

        public string Text { get; set;  }
        public string Header { get; set;  }

    }
}
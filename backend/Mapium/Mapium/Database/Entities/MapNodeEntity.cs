using System.ComponentModel.DataAnnotations.Schema;

namespace Mapium.Database.Entities
{
    public class MapNodeEntity
    {
        //foreign key
        public int Id { get; set; }
        public int? ParentNodeId { get; set; }
        [ForeignKey(nameof(ParentNodeId))]
        public MapNodeEntity ParentNode { get; set; }

        public int NoteId { get; set; }
        [ForeignKey(nameof(NoteId))]
        public NoteEntity Note { get; set; }
        
        public int MapId { get; set; }
        [ForeignKey(nameof(MapId))]
        public MapEntity Map { get; set; }
    }
}
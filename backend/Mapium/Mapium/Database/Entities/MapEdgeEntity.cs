using System.ComponentModel.DataAnnotations.Schema;

namespace Mapium.Database.Entities
{
    public class MapEdgeEntity
    {
        public int Id { get; set; }
        public int FromId  { get; set; }
        public int ToId { get; set; }
        public int MapId { get; set; }
        [ForeignKey(nameof(MapId))]
        public MapEntity Map { get; set; }
    }
}
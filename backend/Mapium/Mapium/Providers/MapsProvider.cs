using System.Linq;
using System.Threading.Tasks;
using Mapium.Database;
using Microsoft.EntityFrameworkCore;

namespace Mapium.Providers
{
    public class MapDto
    {
        public int Id { get; set; }
        public string Name { get; set;  }
    }

    public class NodeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class EdgeDto
    {
        public int FromNodeId { get; set; }
        public int ToNodeId { get; set; }
    }

    public class MapsProvider
    {
        private readonly MapiumDatabaseContext context;

        public MapsProvider(MapiumDatabaseContext context)
        {
            this.context = context;
        }

        public async Task<MapDto[]> GetMaps()
        {
            var maps =  await context.Maps.ToListAsync().ConfigureAwait(false);

            return maps.Select(m => new MapDto
            {
                Id = m.Id,
                Name = m.Name,
            })
            .ToArray();
        }

        public async Task<MapDto> GetMap(int mapId)
        {
            var nodes = await context.MapNodes.Where(n => n.MapId == mapId).ToListAsync().ConfigureAwait(false);

            var nodeDtos = nodes.Select(n => new NodeDto() {Id = n.Id, Name = n.Note.Header});

            var map = await context.Maps.FirstAsync(m => m.Id == mapId).ConfigureAwait(false);

            return new MapDto
            {
                Id = mapId,
                Name = map.Name,
            };
        }
    }
}
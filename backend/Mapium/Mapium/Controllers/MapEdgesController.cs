using Mapium.Database;
using Mapium.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Mapium.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MapEdgesController : ControllerBase
    {
        private readonly MapiumDatabaseContext context; 

        public MapEdgesController(MapiumDatabaseContext context)
        {
            this.context = context;
        }

        [HttpPost("")]
        public void CreateEdge([FromQuery] int mapId, [FromQuery] int fromId, [FromQuery] int toId)
        {
            context.MapEdges.Add(new MapEdgeEntity {FromId = fromId, ToId = toId, MapId = mapId});
            context.SaveChanges();
        }
    }

}
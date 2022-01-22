using System.Linq;
using Mapium.Database;
using Mapium.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Mapium.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MapsController : ControllerBase
    {
        private readonly MapiumDatabaseContext context;

        public MapsController(MapiumDatabaseContext context)
        {
            this.context = context;
        }

        [HttpGet("")]
        public JsonResult GetMaps([FromQuery] int userId)
        {
            var result = context.Maps.Where(m => m.UserId == userId).Select(m => new {m.Id, m.Name}).ToList();
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public JsonResult GetMap(int id)
        {
            var map = context.Maps.First(m => m.Id == id);
            var notes = context.Notes.Where(n => n.MapId == id).Select(n => new {n.Header, n.Text, n.Id}).ToList();
            var edges = context.MapEdges.Where(n => n.MapId == id).Select(e => new {From = e.FromId,To = e.ToId}).ToList();

            return new JsonResult(
                new
                {
                    map.Id,
                    map.Name,
                    notes,
                    edges
                }
            );
        }

        [HttpPost("")]
        public JsonResult CreateMap([FromQuery] int userId, [FromQuery] string mapName)
        {
            var map = new MapEntity {Name = mapName, UserId = userId};
            context.Maps.Add(map);
            context.SaveChanges();

            GlobalState.CurrentMapId = map.Id;
            return new JsonResult(map.Id);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMap(int id)
        {
            var mapToDelete = context.Maps.FirstOrDefault(map => map.Id == id);

            if (mapToDelete == null)
                return NotFound(id);

            context.Maps.Remove(mapToDelete);
            context.SaveChanges();
            return Ok(id);
        }
    }
}

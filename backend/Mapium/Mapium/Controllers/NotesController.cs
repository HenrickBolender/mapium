using System.Linq;
using Mapium.Database;
using Mapium.Database.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Mapium.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly MapiumDatabaseContext context;

        public NotesController(MapiumDatabaseContext context)
        {
            this.context = context;
        }
        
        [HttpGet("{id}")]
        public JsonResult GetNote(int id)
        {
            var result = context.Notes.First(n => n.Id == id);
            return new JsonResult(result);
        }
        
        [HttpPost("")]
        public JsonResult AddNote([FromQuery] int mapId, [FromQuery] string header, [FromBody] string text)
        {
            var note = new NoteEntity
            {
                Header = header,
                MapId = mapId,
                Text = text
            };
            
            context.Notes.Add(note);
            context.SaveChanges();
            
            return new JsonResult(note.Id);
        }
        
        [HttpDelete("{id}")]
        public void DeleteNote(int id)
        {
            var note = new NoteEntity {Id = id};

            context.Notes.Attach(note);
            context.Notes.Remove(note);
            context.SaveChanges();
        }

        [HttpPut("{id}/editText")]
        public void EditText(int id, [FromBody] string text)
        {
            var note = context.Notes.First(n => n.Id == id);

            note.Text = text;

            context.SaveChanges();
        }
        
        [HttpPut("{id}/editHeader")]
        public void EditHeader(int id, [FromBody] string header)
        {
            var note = context.Notes.First(n => n.Id == id);
            note.Header = header;

            context.SaveChanges();
        }
    }
}
using System.Linq;
using Mapium.Database;
using Microsoft.AspNetCore.Mvc;

namespace Mapium.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MapiumDatabaseContext context;

        public UsersController(MapiumDatabaseContext context)
        {
            this.context = context;
        }


        [HttpGet("current")]
        public JsonResult Get()
        {
            if (GlobalState.CurrentUserId == null)
            {
                return new JsonResult(new EmptyResult());
            }

            var user = context.Users.First(u => u.Id == GlobalState.CurrentUserId);

            if (GlobalState.CurrentMapId == null)
            {
                var map = context.Maps.First(m => m.UserId == user.Id);
                GlobalState.CurrentMapId = map.Id;
            }

                return new JsonResult(new
            {
                user, GlobalState.CurrentMapId,
            });
        }

        [HttpGet("switch")]
        public void Switch([FromQuery] int userId)
        {
            GlobalState.CurrentUserId = userId;
            var map = context.Maps.First(m => m.UserId == userId);
            GlobalState.CurrentMapId = map.Id;
        }

        [HttpGet("logout")]
        public void Logout()
        {
            GlobalState.CurrentUserId = null;
            GlobalState.CurrentMapId = null;
        }
    }
}
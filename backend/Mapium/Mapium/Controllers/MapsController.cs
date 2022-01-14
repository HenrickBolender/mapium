using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapium.Providers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Mapium.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MapsController : ControllerBase
    {
        private readonly MapsProvider mapsProvider;

        public MapsController(MapsProvider mapsProvider)
        {
            this.mapsProvider = mapsProvider;
        }
        
        
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            var result = await mapsProvider.GetMaps().ConfigureAwait(false);
            return new JsonResult(result);
        }
        
        [HttpGet("{mapId}")]
        public async Task<JsonResult> Get(int mapId)
        {
            var result = await mapsProvider.GetMap(mapId).ConfigureAwait(false);
            return new JsonResult(result);
        }
    }
}
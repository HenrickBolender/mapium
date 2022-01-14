using Mapium.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Mapium.Database
{
    //список все сущностей для создания в базе данных
    // миграция создаётся с помощью dotnet ef migrations add <migration_name>
    //миграцию нужно перенести в базу данных dotnet ef database update
    public class MapiumDatabaseContext : DbContext
    {
        public DbSet<NoteEntity> Notes { get; set; }
        public DbSet<MapNodeEntity> MapNodes { get; set; }
        public DbSet<MapEntity> Maps { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   

        }

        public MapiumDatabaseContext()
        {
        }
    }
}
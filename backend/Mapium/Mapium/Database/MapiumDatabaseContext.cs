using Mapium.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Mapium.Database
{
    //список все сущностей для создания в базе данных
    // миграция создаётся с помощью dotnet ef migrations add <migration_name>
    //миграцию нужно перенести в базу данных dotnet ef database update
    public class MapiumDatabaseContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<MapEntity> Maps { get; set; }
        public DbSet<NoteEntity> Notes { get; set; }
        public DbSet<MapEdgeEntity> MapEdges { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SeedUsers(modelBuilder);
            SeedMaps(modelBuilder);
            SeedNotes(modelBuilder);
            SeedEdges(modelBuilder);
        }

        private static void SeedUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>().HasData(
                new UserEntity {Id = 1, Name = "HenrickBolender"},
                new UserEntity {Id = 2, Name = "NightGuard"}
            );
        }
        
        private static void SeedMaps(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MapEntity>().HasData(
                new MapEntity {Id = 1, Name = "Математика", UserId = 1 },
                new MapEntity {Id = 2, Name = "Биология", UserId = 1},
                new MapEntity {Id = 3, Name = "Спорт", UserId = 1},
                new MapEntity {Id = 4, Name = "Химия", UserId = 2 },
                new MapEntity {Id = 5, Name = "Физика", UserId = 2},
                new MapEntity {Id = 6, Name = "Геометрия", UserId = 2}
            );
        }
        
        private static void SeedNotes(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NoteEntity>().HasData(
                new NoteEntity {Id = 1, Header = "Математика", Text = "Я люблю математику", MapId = 1},
                new NoteEntity {Id = 2, Header = "Графика", Text = "Я люблю графику", MapId = 1},
                new NoteEntity {Id = 3, Header = "Алгебра", Text = "Я люблю алгебру", MapId = 1}
            );
        }
        
        private static void SeedEdges(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MapEdgeEntity>().HasData(
                new MapEdgeEntity {Id = 1, FromId = 1, ToId = 2, MapId = 1},
                new MapEdgeEntity {Id = 2, FromId = 1, ToId = 3, MapId = 1}
            );
        }

        public MapiumDatabaseContext(DbContextOptions options) : base(options)
        {
        }
    }
}
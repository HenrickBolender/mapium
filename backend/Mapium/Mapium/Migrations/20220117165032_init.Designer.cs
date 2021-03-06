// <auto-generated />
using Mapium.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mapium.Migrations
{
    [DbContext(typeof(MapiumDatabaseContext))]
    [Migration("20220117165032_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.22");

            modelBuilder.Entity("Mapium.Database.Entities.MapEdgeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("FromId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MapId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ToId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("MapId");

                    b.ToTable("MapEdges");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FromId = 1,
                            MapId = 1,
                            ToId = 2
                        },
                        new
                        {
                            Id = 2,
                            FromId = 1,
                            MapId = 1,
                            ToId = 3
                        });
                });

            modelBuilder.Entity("Mapium.Database.Entities.MapEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Maps");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Математика",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Name = "Биология",
                            UserId = 1
                        },
                        new
                        {
                            Id = 3,
                            Name = "Спорт",
                            UserId = 1
                        },
                        new
                        {
                            Id = 4,
                            Name = "Химия",
                            UserId = 2
                        },
                        new
                        {
                            Id = 5,
                            Name = "Физика",
                            UserId = 2
                        },
                        new
                        {
                            Id = 6,
                            Name = "Геометрия",
                            UserId = 2
                        });
                });

            modelBuilder.Entity("Mapium.Database.Entities.NoteEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Header")
                        .HasColumnType("TEXT");

                    b.Property<int>("MapId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("MapId");

                    b.ToTable("Notes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Header = "Математика",
                            MapId = 1,
                            Text = "Я люблю математику"
                        },
                        new
                        {
                            Id = 2,
                            Header = "Графика",
                            MapId = 1,
                            Text = "Я люблю графику"
                        },
                        new
                        {
                            Id = 3,
                            Header = "Алгебра",
                            MapId = 1,
                            Text = "Я люблю алгебру"
                        });
                });

            modelBuilder.Entity("Mapium.Database.Entities.UserEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "HenrickBolender"
                        },
                        new
                        {
                            Id = 2,
                            Name = "NightGuard"
                        });
                });

            modelBuilder.Entity("Mapium.Database.Entities.MapEdgeEntity", b =>
                {
                    b.HasOne("Mapium.Database.Entities.MapEntity", "Map")
                        .WithMany()
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Mapium.Database.Entities.MapEntity", b =>
                {
                    b.HasOne("Mapium.Database.Entities.UserEntity", "UserEntity")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Mapium.Database.Entities.NoteEntity", b =>
                {
                    b.HasOne("Mapium.Database.Entities.MapEntity", "Map")
                        .WithMany()
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

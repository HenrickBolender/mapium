using Microsoft.EntityFrameworkCore.Migrations;

namespace Mapium.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Maps_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MapEdges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FromId = table.Column<int>(nullable: false),
                    ToId = table.Column<int>(nullable: false),
                    MapId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapEdges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapEdges_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Text = table.Column<string>(nullable: true),
                    Header = table.Column<string>(nullable: true),
                    MapId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notes_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "HenrickBolender" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "NightGuard" });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 1, "Математика", 1 });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 2, "Биология", 1 });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 3, "Спорт", 1 });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 4, "Химия", 2 });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 5, "Физика", 2 });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 6, "Геометрия", 2 });

            migrationBuilder.InsertData(
                table: "MapEdges",
                columns: new[] { "Id", "FromId", "MapId", "ToId" },
                values: new object[] { 1, 1, 1, 2 });

            migrationBuilder.InsertData(
                table: "MapEdges",
                columns: new[] { "Id", "FromId", "MapId", "ToId" },
                values: new object[] { 2, 1, 1, 3 });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Header", "MapId", "Text" },
                values: new object[] { 1, "Математика", 1, "Я люблю математику" });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Header", "MapId", "Text" },
                values: new object[] { 2, "Графика", 1, "Я люблю графику" });

            migrationBuilder.InsertData(
                table: "Notes",
                columns: new[] { "Id", "Header", "MapId", "Text" },
                values: new object[] { 3, "Алгебра", 1, "Я люблю алгебру" });

            migrationBuilder.CreateIndex(
                name: "IX_MapEdges_MapId",
                table: "MapEdges",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_Maps_UserId",
                table: "Maps",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_MapId",
                table: "Notes",
                column: "MapId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MapEdges");

            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "Maps");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

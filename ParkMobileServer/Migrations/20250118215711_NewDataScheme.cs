using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class NewDataScheme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArticleTableId",
                table: "ItemEntities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DescriptionTableId",
                table: "ItemEntities",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ArticleEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Article = table.Column<string>(type: "text", nullable: true),
                    ItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArticleEntity_ItemEntities_ItemId",
                        column: x => x.ItemId,
                        principalTable: "ItemEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DescriptionEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ItemId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DescriptionEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DescriptionEntity_ItemEntities_ItemId",
                        column: x => x.ItemId,
                        principalTable: "ItemEntities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleEntity_ItemId",
                table: "ArticleEntity",
                column: "ItemId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DescriptionEntity_ItemId",
                table: "DescriptionEntity",
                column: "ItemId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArticleEntity");

            migrationBuilder.DropTable(
                name: "DescriptionEntity");

            migrationBuilder.DropColumn(
                name: "ArticleTableId",
                table: "ItemEntities");

            migrationBuilder.DropColumn(
                name: "DescriptionTableId",
                table: "ItemEntities");
        }
    }
}

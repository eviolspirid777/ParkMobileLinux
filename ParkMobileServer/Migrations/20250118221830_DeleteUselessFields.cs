using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class DeleteUselessFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Article",
                table: "ItemEntities");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ItemEntities");

            migrationBuilder.RenameColumn(
                name: "DescriptionTableId",
                table: "ItemEntities",
                newName: "DescriptionId");

            migrationBuilder.RenameColumn(
                name: "ArticleTableId",
                table: "ItemEntities",
                newName: "ArticleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DescriptionDescriptionId",
                table: "ItemEntities",
                newName: "DescriptionTableId");

            migrationBuilder.RenameColumn(
                name: "ArticleId",
                table: "ItemEntities",
                newName: "ArticleTableId");

            migrationBuilder.AddColumn<string>(
                name: "Article",
                table: "ItemEntities",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ItemEntities",
                type: "text",
                nullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class NewMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Article",
                table: "OrderItems");

            migrationBuilder.AddColumn<string>(
                name: "Options",
                table: "ItemEntities",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Options",
                table: "ItemEntities");

            migrationBuilder.AddColumn<string>(
                name: "Article",
                table: "OrderItems",
                type: "text",
                nullable: true);
        }
    }
}

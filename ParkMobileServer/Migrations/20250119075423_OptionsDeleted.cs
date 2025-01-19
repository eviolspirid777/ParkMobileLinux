using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class OptionsDeleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Options",
                table: "ItemEntities");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Options",
                table: "ItemEntities",
                type: "text",
                nullable: true);
        }
    }
}

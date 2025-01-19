using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class NewField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Options",
                table: "ItemEntities");

            migrationBuilder.RenameColumn(
                name: "DescriptionId",
                table: "ItemEntities",
                newName: "DescriptionDescriptionId");
        }
    }
}

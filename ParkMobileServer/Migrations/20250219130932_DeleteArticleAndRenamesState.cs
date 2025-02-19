using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class DeleteArticleAndRenamesState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Article",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Order");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Order",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Order");

            migrationBuilder.AddColumn<string>(
                name: "Article",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "State",
                table: "Order",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}

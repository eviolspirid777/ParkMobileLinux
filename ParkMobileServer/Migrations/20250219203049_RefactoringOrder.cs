using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class RefactoringOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "OrderClient",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Order",
                newName: "PvzCode");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Order",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "OrderClient",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "PvzCode",
                table: "Order",
                newName: "Comment");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderItems",
                table: "OrderItem",
                column: "Id");
        }
    }
}

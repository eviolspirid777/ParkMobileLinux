using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class ItemBrandIdNowBrandId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemEntities_ItemBrands_ItemBrandId",
                table: "ItemEntities");

            migrationBuilder.RenameColumn(
                name: "ItemBrandId",
                table: "ItemEntities",
                newName: "BrandId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemEntities_ItemBrandId",
                table: "ItemEntities",
                newName: "IX_ItemEntities_BrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemEntities_ItemBrands_BrandId",
                table: "ItemEntities",
                column: "BrandId",
                principalTable: "ItemBrands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemEntities_ItemBrands_BrandId",
                table: "ItemEntities");

            migrationBuilder.RenameColumn(
                name: "BrandId",
                table: "ItemEntities",
                newName: "ItemBrandId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemEntities_BrandId",
                table: "ItemEntities",
                newName: "IX_ItemEntities_ItemBrandId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemEntities_ItemBrands_ItemBrandId",
                table: "ItemEntities",
                column: "ItemBrandId",
                principalTable: "ItemBrands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkMobileServer.Migrations
{
    /// <inheritdoc />
    public partial class ConvertPriceAndDiscount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Явное преобразование Price
            migrationBuilder.Sql(@"
        ALTER TABLE ""ItemEntities"" 
        ALTER COLUMN ""Price"" TYPE decimal(18,2) 
        USING CASE 
            WHEN ""Price"" IS NOT NULL AND ""Price"" != '' 
            THEN CAST(""Price"" AS decimal(18,2)) 
            ELSE NULL 
        END;
    ");

            // Явное преобразование DiscountPrice
            migrationBuilder.Sql(@"
        ALTER TABLE ""ItemEntities"" 
        ALTER COLUMN ""DiscountPrice"" TYPE decimal(18,2) 
        USING CASE 
            WHEN ""DiscountPrice"" IS NOT NULL AND ""DiscountPrice"" != '' 
            THEN CAST(""DiscountPrice"" AS decimal(18,2)) 
            ELSE NULL 
        END;
    ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

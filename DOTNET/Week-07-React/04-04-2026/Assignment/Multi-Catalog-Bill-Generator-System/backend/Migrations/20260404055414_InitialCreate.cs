using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MultiBillGenerator.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    InvoiceNumber = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    BillDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Subtotal = table.Column<decimal>(type: "TEXT", nullable: false),
                    Discount = table.Column<decimal>(type: "TEXT", nullable: false),
                    DiscountType = table.Column<string>(type: "TEXT", nullable: false),
                    TaxRate = table.Column<decimal>(type: "TEXT", nullable: false),
                    Tax = table.Column<decimal>(type: "TEXT", nullable: false),
                    Total = table.Column<decimal>(type: "TEXT", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BillId = table.Column<int>(type: "INTEGER", nullable: false),
                    ItemName = table.Column<string>(type: "TEXT", maxLength: 200, nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillItems_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CatalogItems",
                columns: new[] { "Id", "Category", "CreatedAt", "Name", "Price", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "entrance", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6131), "Adult Ticket", 500m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6133) },
                    { 2, "entrance", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6136), "Child Ticket", 250m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6136) },
                    { 3, "entrance", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6137), "Senior Ticket", 300m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6137) },
                    { 4, "entrance", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6138), "VIP Ticket", 1000m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6138) },
                    { 5, "donation", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6162), "Small Donation", 100m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6162) },
                    { 6, "donation", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6163), "Medium Donation", 500m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6164) },
                    { 7, "donation", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6165), "Large Donation", 1000m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6165) },
                    { 8, "product", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6179), "Merchandise T-Shirt", 250m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6180) },
                    { 9, "product", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6181), "Snack Pack", 150m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6181) },
                    { 10, "product", new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6182), "Beverage", 100m, new DateTime(2026, 4, 4, 5, 54, 12, 437, DateTimeKind.Utc).AddTicks(6182) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_BillId",
                table: "BillItems",
                column: "BillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillItems");

            migrationBuilder.DropTable(
                name: "CatalogItems");

            migrationBuilder.DropTable(
                name: "Bills");
        }
    }
}

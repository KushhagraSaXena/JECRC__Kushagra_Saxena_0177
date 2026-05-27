using FoodOrdering.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace FoodOrdering.Web.Services;

public class InvoicePdfGenerator
{
    public byte[] Generate(Order order, IdentityUser? user)
    {
        var customerName = user?.UserName ?? order.UserId;
        var customerEmail = user?.Email ?? "N/A";

        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(30);
                page.PageColor(Colors.White);
                page.DefaultTextStyle(x => x.FontSize(11));

                page.Header().Row(row =>
                {
                    row.RelativeItem().Column(column =>
                    {
                        column.Item().Text("FoodOrdering.Web")
                            .FontSize(18)
                            .SemiBold();
                        column.Item().Text("Invoice")
                            .FontSize(22)
                            .Bold()
                            .FontColor(Colors.Green.Darken1);
                    });

                    row.ConstantItem(200).Column(column =>
                    {
                        column.Item().Text($"Invoice #: {order.Id}").SemiBold();
                        column.Item().Text($"Date: {order.OrderDate:dd MMM yyyy}");
                        column.Item().Text($"Status: {order.Status}");
                    });
                });

                page.Content().Column(column =>
                {
                    column.Spacing(15);

                    column.Item().Background(Colors.Grey.Lighten3).Padding(10).Column(info =>
                    {
                        info.Item().Text("Billed To").SemiBold();
                        info.Item().Text(customerName);
                        info.Item().Text(customerEmail);
                    });

                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn(4);
                            columns.RelativeColumn(2);
                            columns.RelativeColumn(2);
                            columns.RelativeColumn(2);
                        });

                        table.Header(header =>
                        {
                            header.Cell().Element(CellStyle).Text("Item").SemiBold();
                            header.Cell().Element(CellStyle).AlignRight().Text("Qty").SemiBold();
                            header.Cell().Element(CellStyle).AlignRight().Text("Price").SemiBold();
                            header.Cell().Element(CellStyle).AlignRight().Text("Total").SemiBold();
                        });

                        foreach (var item in order.OrderItems ?? Array.Empty<OrderItem>())
                        {
                            var lineTotal = item.Price * item.Quantity;

                            table.Cell().Element(RowStyle).Text(item.FoodItem?.Name ?? "Item");
                            table.Cell().Element(RowStyle).AlignRight().Text(item.Quantity.ToString());
                            table.Cell().Element(RowStyle).AlignRight().Text($"₹ {item.Price}");
                            table.Cell().Element(RowStyle).AlignRight().Text($"₹ {lineTotal}");
                        }

                        static IContainer CellStyle(IContainer container)
                        {
                            return container.Background(Colors.Grey.Lighten2).PaddingVertical(6).PaddingHorizontal(8);
                        }

                        static IContainer RowStyle(IContainer container)
                        {
                            return container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(6).PaddingHorizontal(8);
                        }
                    });

                    column.Item().AlignRight().Column(total =>
                    {
                        total.Item().Text($"Total: ₹ {order.TotalAmount}")
                            .FontSize(14)
                            .Bold();
                    });
                });

                page.Footer().AlignCenter().Text(text =>
                {
                    text.Span("Thanks for ordering with FoodOrdering.Web").FontSize(10).FontColor(Colors.Grey.Darken1);
                });
            });
        });

        return document.GeneratePdf();
    }
}

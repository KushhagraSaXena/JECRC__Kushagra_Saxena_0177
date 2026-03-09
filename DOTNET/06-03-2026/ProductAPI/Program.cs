using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;

var builder = WebApplication.CreateBuilder(args);

//Add controller
builder.Services.AddControllers();
//add database context service
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

//add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cors connection fixed 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
var app = builder.Build();
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

//Middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
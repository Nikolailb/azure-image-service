using image_service_api.Endpoints;
using image_service_api.Services;
using Microsoft.Extensions.Logging;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddLogging();


// Services
builder.Services.AddOpenApi();
builder.Services.AddSingleton<ImageService>();

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

var logger = app.Services.GetRequiredService<ILogger<Program>>();
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Servers =
        [
            new ScalarServer("https://localhost:5501"),
            new ScalarServer("http://localhost:5500"),
        ];
    });
}

app.UseHttpsRedirection();
app.MapImageEndpoints();

app.MapGet("/", () =>
{
    return TypedResults.Ok("This is working");
});

app.Run();

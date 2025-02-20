using image_service_api.Services;

namespace image_service_api.Endpoints
{
    public static class ImageEndpoints
    {
        public static string Path { get; } = "images";

        public static void MapImageEndpoints(this WebApplication app)
        {
            var group = app.MapGroup(Path);

            group.MapGet("/", GetImages).DisableAntiforgery(); ;
            group.MapGet("/{image}", GetImage).DisableAntiforgery(); ;
            group.MapPost("/", UploadImage).DisableAntiforgery(); ;
        }

        public static async Task<IResult> GetImages(
            ImageService imageService
        )
        {
            return Results.Ok(await imageService.GetAllFiles());
        }

        public static async Task<IResult> UploadImage(IFormFile file, ImageService imageService)
        {
            if (file == null || file.Length == 0)
            {
                return Results.BadRequest("No file uploaded or file is empty.");
            }

            await using var stream = file.OpenReadStream();
            await imageService.UploadFileAsync(stream, file.FileName);

            return Results.Ok(new { file.FileName, Message = "File uploaded successfully" });
        }

        public static async Task<IResult> GetImage(ImageService imageService, string image)
        {
            var stream = await imageService.DownloadFileAsync(image);

            if (stream == null) return TypedResults.NotFound("Image not found!");
            return TypedResults.File(stream, "image/jpeg");
        }
    }
}

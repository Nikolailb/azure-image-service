using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;

namespace image_service_api.Services
{
    public class ImageService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly BlobContainerClient _blobContainerClient;

        private readonly string _containerName = "images";

        public ImageService(ILogger<ImageService> logger)
        {
            var connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING")
                ?? throw new InvalidOperationException("Azure Storage connection string is missing.");
            _blobServiceClient = new BlobServiceClient(connectionString);
            _blobContainerClient = _blobServiceClient.GetBlobContainerClient(_containerName);

            _blobContainerClient.CreateIfNotExistsAsync(PublicAccessType.Blob).GetAwaiter().GetResult();
        }

        public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
        {
            await _blobContainerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);

            var blobClient = _blobContainerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(fileStream, true);

            return blobClient.Uri.ToString();
        }

        public async Task<Stream> DownloadFileAsync(string fileName)
        {
            var blobClient = _blobContainerClient.GetBlobClient(fileName);

            var response = await blobClient.DownloadAsync();
            return response.Value.Content;
        }
        public async Task<List<string>> GetAllFiles()
        {
            var blobList = new List<string>();

            await foreach (var blobItem in _blobContainerClient.GetBlobsAsync())
            {
                blobList.Add(blobItem.Name);
            }

            return blobList;
        }
    }
}

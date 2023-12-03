import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

async function salvarImagem(
  blobName: string,
  imageString: string
): Promise<string> {
  const credentials = new StorageSharedKeyCredential(
    process.env.ACCOUNT_NAME || "",
    process.env.ACCOUNT_KEY || ""
  );

  const blobServiceClient = new BlobServiceClient(
    `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net`,
    credentials
  );

  const containerClient = blobServiceClient.getContainerClient(
    process.env.CONTAINER_NAME || ""
  );

  const blobClient = containerClient.getBlockBlobClient(blobName);

  const buffer = Buffer.from(imageString);

  const teste = await blobClient.uploadData(buffer);

  console.log(
    `Imagem ${blobName} foi enviada com sucesso para o Blob Storage.`
  );
  return teste._response.request.url;
}

export default salvarImagem;

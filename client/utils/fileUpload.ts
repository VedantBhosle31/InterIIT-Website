// import AWS from "aws-sdk";

// AWS.config.update({
//   accessKeyId: process.env.TECHMEET_AWS_ACCESS_KEY,
//   secretAccessKey: process.env.TECHMEET_AWS_SECRET_KEY,
//   region: process.env.TECHMEET_AWS_BUCKET_NAME,
// });

// const s3 = new AWS.S3();
// const bucketName: string = process.env.TECHMEET_AWS_BUCKET_NAME as string;

// const uploadFileToS3 = async (file: Blob, key: string): Promise<string> => {
//   try {
//     const params = {
//       Bucket: bucketName,
//       Key: key,
//       Body: file,
//       ContentType: file.type,
//     };

//     const result = await s3.upload(params).promise();
//     return result.Location;
//   } catch (error) {
//     console.error("Error uploading file to S3:", error);
//     throw error;
//   }
// };

// export default uploadFileToS3;

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.TECHMEET_AWS_ACCESS_KEY,
  secretAccessKey: process.env.TECHMEET_AWS_SECRET_KEY,
  region: process.env.TECHMEET_AWS_BUCKET_NAME,
});

const s3 = new AWS.S3();
const bucketName: string = process.env.TECHMEET_AWS_BUCKET_NAME as string;

const maxUploadSize = 50 * 1024 * 1024; // 50MB

const uploadFileToS3 = async (file: Blob, key: string): Promise<string> => {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  try {
    const res = await s3.createMultipartUpload(params).promise();
    if (!res.UploadId) {
      throw new Error("Upload ID is undefined");
    }
    const uploadId = res.UploadId;

    const partSize = 5 * 1024 * 1024; // 5MB part size (can be adjusted)
    const fileSize = file.size;
    const partCount = Math.ceil(fileSize / partSize);
    const parts = [];
    if (fileSize > maxUploadSize)
      throw new Error("File size too large. Max file size is 50MB");

    for (let i = 0; i < partCount; i++) {
      const startByte = partSize * i;
      const endByte = Math.min(startByte + partSize, fileSize);

      const partParams = {
        Body: file.slice(startByte, endByte),
        Bucket: bucketName,
        Key: key,
        PartNumber: i + 1,
        UploadId: uploadId,
      };

      const data = await s3.uploadPart(partParams).promise();
      parts.push({ ETag: data.ETag, PartNumber: i + 1 });
      // add ETag to ExposeHeaders in CORS configuration on AWS S3 permissions
    }
    const uploadRes = await completeUpload(uploadId, parts, key);
    if (uploadRes.success) {
      return uploadRes.url as string;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    throw error;
  }
};

const completeUpload = async (uploadId: any, parts: any, key: any) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    MultipartUpload: {
      Parts: parts,
    },
    UploadId: uploadId,
  };
  try {
    const res = await s3.completeMultipartUpload(params).promise();
    return { success: true, url: res.Location as string };
  } catch (error) {
    return { success: false };
  }
};

export default uploadFileToS3;

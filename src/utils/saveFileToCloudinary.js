const uploadStream = cloudinary.uploader.upload_stream(
  {
    folder: 'avatars',
    public_id: String(userId),
    resource_type: 'image',
    overwrite: true,
    unique_filename: false,
  },
  (error, result) => {
    if (error) return reject(error);
    resolve(result);
  },
);
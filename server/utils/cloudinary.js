const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "property",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const storageProperty = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "propertyManager/property",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const storageUser = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "propertyManager/user",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const storageMaintenance = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "propertyManager/maintenance",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

async function removeImage(image, folder) {
  const filename = image.split("/");
  const imageKey = filename[filename.length - 1].split(".")[0];
  await cloudinary.uploader.destroy(
    `${folder}/${imageKey}`,
    { invalidate: true },
    (err, res) => {
      console.log(res, err);
    }
  );
}

module.exports = {
  cloudinary,
  storage,
  storageProperty,
  storageUser,
  storageMaintenance,
  removeImage,
};

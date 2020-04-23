Cloudinary.config do |config|
  config.cloud_name = process.env.CLOUDINARY_CLOUD_NAME
  config.api_key = process.env.CLOUDINARY_API_SECRET
  config.api_secret = process.env.CLOUDINARY_CLOUD_NAME
  config.secure = true
  config.cdn_subdomain = true
end
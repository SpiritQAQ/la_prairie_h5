const PASSWORD = process.env.MONGODB_PASSWORD
const USERNAME = process.env.MONGODB_USERNAME

const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.w3slx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  },
}

module.exports = nextConfig

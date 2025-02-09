/** @type {import('next').NextConfig} */
const nextConfig ={
    images: {
      domains: [
        'avatars.githubusercontent.com',  // using GitHub
        'lh3.googleusercontent.com',     // using Google
        'platform-lookaside.fbsbx.com',  // using Facebook
      ],
    },
  }

export default nextConfig;

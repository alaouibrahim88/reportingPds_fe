/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a dev server run next to production (`next start` serves .next) without overwriting its build
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async rewrites() {
    return [
      {
        source: "/api/Polydesign/Kpi/:path*",
        destination: "http://127.0.0.1:2222/api/Polydesign/Kpi/:path*"
      },
      {
        source: "/api/Polydesign/Reporting/:path*",
        destination: "http://127.0.0.1:2222/api/Polydesign/Reporting/:path*"
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:2222/api/:path*"
      }
    ]
  }
};

export default nextConfig;
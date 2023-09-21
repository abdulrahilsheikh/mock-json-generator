/** @type {import('next').NextConfig} */

let assetPrefix = "";
let basePath = "/mock-json-generator";
basePath = "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  assetPrefix: assetPrefix,
  basePath: basePath,
};

module.exports = nextConfig;

import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingRoot: path.join(__dirname),
    serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
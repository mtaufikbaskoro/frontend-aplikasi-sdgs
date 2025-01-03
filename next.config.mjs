const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: isProduction ? '/astra' : '',
    assetPrefix: isProduction ? '/astra' : '',
};

export default nextConfig;

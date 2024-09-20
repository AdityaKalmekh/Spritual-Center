/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects : async function () {
        return [{
            source : "/",
            destination : "/login",
            permanent : false
        }]
    }
};

export default nextConfig;

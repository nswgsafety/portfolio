import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents clickjacking — no one can embed your site in an iframe
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stops browsers from sniffing content types
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Enables browser XSS filter
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Controls referrer info sent to external sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Forces HTTPS for 1 year once visited
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // Restricts which browser features can be used
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig;

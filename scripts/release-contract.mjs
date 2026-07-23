import { gzipSync } from 'node:zlib'

export const releaseContract = {
  origin: 'https://pianic2.github.io',
  basePath: '/its-react-portfolio-web/',
  requiredFiles: ['index.html', '404.html', 'robots.txt', 'sitemap.xml'],
}

export function siteUrl(pathname) {
  return new URL(
    `${releaseContract.basePath.replace(/\/$/, '')}${pathname}`,
    releaseContract.origin,
  ).href
}

export function requirePagesConfiguration(environment) {
  if (
    typeof environment.VITE_WEB3FORMS_ACCESS_KEY !== 'string' ||
    !environment.VITE_WEB3FORMS_ACCESS_KEY.trim()
  ) {
    throw new Error('Pages release configuration is missing VITE_WEB3FORMS_ACCESS_KEY.')
  }
}

export function summarizeAssets(files) {
  return files.map(({ path, contents }) => ({
    path,
    bytes: contents.byteLength,
    gzipBytes: gzipSync(contents).byteLength,
  }))
}

export function compareBudget(measured, budget) {
  return measured.flatMap((asset) => {
    const allowed = budget[asset.path]
    if (!allowed) return [`Unexpected emitted asset: ${asset.path}`]
    return asset.bytes > allowed.bytes || asset.gzipBytes > allowed.gzipBytes
      ? [
          `${asset.path}: ${asset.bytes}/${asset.gzipBytes} exceeds ${allowed.bytes}/${allowed.gzipBytes} bytes.`,
        ]
      : []
  })
}

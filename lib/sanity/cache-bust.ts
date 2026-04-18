/** 为静态资源 URL 追加版本参数，减轻浏览器/CDN 对同一地址的强缓存导致的「换图仍显示旧图」 */
export function appendUrlCacheBust(url: string, bust?: string | null): string {
  if (!url || !bust) return url
  const sep = url.includes("?") ? "&" : "?"
  return `${url}${sep}cb=${encodeURIComponent(bust)}`
}

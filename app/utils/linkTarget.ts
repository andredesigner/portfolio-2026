const nativeHrefPrefixes = ['#', 'http://', 'https://', 'mailto:', 'tel:']

export const isNativeHref = (href = '') =>
  nativeHrefPrefixes.some((prefix) => href.startsWith(prefix)) || href.endsWith('.pdf')

export const isExternalHref = (href = '') =>
  href.startsWith('http://') || href.startsWith('https://')

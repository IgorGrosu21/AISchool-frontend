import { NextRequest } from 'next/server'

/**
 * Parses browser name and version from user agent
 */
function parseBrowser(ua: string): { name: string; version: string } {
  const browsers = [
    { name: 'Chrome', pattern: /(?:chrome|crios)\/([\d.]+)/i },
    { name: 'Firefox', pattern: /firefox\/([\d.]+)/i },
    { name: 'Safari', pattern: /version\/([\d.]+).*safari/i },
    { name: 'Edge', pattern: /edg(?:e|a|ios)?\/([\d.]+)/i },
    { name: 'Opera', pattern: /(?:opera|opr)\/([\d.]+)/i },
    { name: 'Internet Explorer', pattern: /(?:msie |trident\/.*; rv:)([\d.]+)/i },
  ]
  
  for (const browser of browsers) {
    const match = ua.match(browser.pattern)
    if (match) {
      return { name: browser.name, version: match[1] }
    }
  }
  
  return { name: 'Unknown', version: '' }
}

/**
 * Parses OS name and version from user agent
 */
function parseOS(ua: string): { name: string; version: string } {
  const osPatterns = [
    { name: 'Windows', pattern: /windows nt ([\d.]+)/i },
    { name: 'macOS', pattern: /mac os x ([\d_]+)/i },
    { name: 'Linux', pattern: /linux/i },
    { name: 'Android', pattern: /android ([\d.]+)/i },
    { name: 'iOS', pattern: /(?:iphone|ipad|ipod).*os ([\d_]+)/i },
  ]
  
  for (const os of osPatterns) {
    const match = ua.match(os.pattern)
    if (match) {
      const version = match[1]?.replace(/_/g, '.') || ''
      return { name: os.name, version }
    }
  }
  
  return { name: 'Unknown', version: '' }
}

/**
 * Detects device type based on user agent
 */
function detectDeviceType(ua: string): 'mobile' | 'tablet' | 'desktop' {
  const uaLower = ua.toLowerCase()
  
  // Check for mobile devices
  if (/android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(uaLower)) {
    // Check if it's a tablet (Android tablets, iPad)
    if (/ipad|tablet|playbook|silk/i.test(uaLower) || /android.*mobile/i.test(uaLower) === false) {
      return 'tablet'
    }
    return 'mobile'
  }
  
  // Check for tablets
  if (/ipad|tablet|playbook|silk/i.test(uaLower)) {
    return 'tablet'
  }
  
  return 'desktop'
}

/**
 * Generates a simple device fingerprint from user agent and IP
 */
function generateDeviceFingerprint(ua: string, ip?: string | null): string {
  const components = [
    ua,
    ip || '',
  ]
  
  const fingerprint = components.join('|')
  
  // Simple hash function
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16).substring(0, 16)
}

/**
 * Extracts device information from NextRequest headers
 */
export function extractDeviceInfoFromRequest(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             req.headers.get('x-real-ip') || 
             ''
  
  if (!ua) {
    return null
  }
  
  const browser = parseBrowser(ua)
  const os = parseOS(ua)
  const deviceType = detectDeviceType(ua)
  const deviceFingerprint = generateDeviceFingerprint(ua, ip)
  
  // Extract language from Accept-Language header
  const acceptLanguage = req.headers.get('accept-language') || ''
  const language = acceptLanguage.split(',')[0]?.split(';')[0]?.trim() || ''
  
  return {
    user_agent: ua,
    device_type: deviceType,
    device_fingerprint: deviceFingerprint,
    browser: browser.name,
    browser_version: browser.version,
    os: os.name,
    os_version: os.version,
    metadata: {
      language,
      ip_address: ip,
    },
  }
}

export type DeviceInfo = ReturnType<typeof extractDeviceInfoFromRequest>
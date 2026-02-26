'use client'

/**
 * Detects device type based on user agent and screen size
 */
function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
  
  const ua = navigator.userAgent.toLowerCase()
  const width = window.innerWidth
  
  // Check for mobile devices
  if (/android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return width < 768 ? 'mobile' : 'tablet'
  }
  
  // Check for tablets
  if (/ipad|tablet|playbook|silk/i.test(ua) || (width >= 768 && width < 1024)) {
    return 'tablet'
  }
  
  return 'desktop'
}

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
 * Generates a simple device fingerprint based on available browser properties
 */
function generateDeviceFingerprint(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return ''
  }
  
  // TypeScript doesn't recognize deviceMemory, but it's available in some browsers
  const navigatorWithMemory = navigator as Navigator & { deviceMemory?: number }
  
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth?.toString() || '',
    new Date().getTimezoneOffset().toString(),
    navigator.hardwareConcurrency?.toString() || '',
    navigatorWithMemory.deviceMemory?.toString() || '',
  ]
  
  const fingerprint = components.join('|')
  
  // Simple hash function (for client-side, not cryptographically secure)
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16).substring(0, 16)
}

/**
 * Collects comprehensive device and browser information
 */
export function collectDeviceInfo() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return null
  }
  
  const ua = navigator.userAgent
  const browser = parseBrowser(ua)
  const os = parseOS(ua)
  const deviceType = detectDeviceType()
  const deviceFingerprint = generateDeviceFingerprint()
  
  return {
    user_agent: ua,
    device_type: deviceType,
    device_fingerprint: deviceFingerprint,
    browser: browser.name,
    browser_version: browser.version,
    os: os.name,
    os_version: os.version,
    metadata: {
      screen_resolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookie_enabled: navigator.cookieEnabled,
      online: navigator.onLine,
    },
  }
}

export type DeviceInfo = ReturnType<typeof collectDeviceInfo>
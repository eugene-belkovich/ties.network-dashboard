function splitHostname(hostname) {
  const [subdomain, domain, type] = hostname.split('.')
  return { subdomain, domain, type }
}

export function getSubdomains() {
  const hostname = window.location.hostname
  if (hostname !== 'localhost') {
    const { domain, type } = splitHostname(window.location.host)
    if (domain && type) {
      return `.${domain}.${type}`
    }
  }
  return undefined
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  const email = value.trim()
  if (!email || /\s/.test(email)) return false
  return EMAIL_PATTERN.test(email)
}

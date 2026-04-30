export const LINKS = {
  onboardingForm:
    'https://docs.google.com/forms/d/e/1FAIpQLSeQUXdC_qng7ronY6W_gYXQq3MVIm_riF7EUOaMglxx_G3Nuw/viewform?usp=sharing',
} as const

export function googleFormEmbedUrl(url: string) {
  try {
    const u = new URL(url)
    u.searchParams.set('embedded', 'true')
    return u.toString()
  } catch {
    return url
  }
}


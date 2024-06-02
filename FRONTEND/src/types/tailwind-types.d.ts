import 'tailwindcss'

declare module 'tailwindcss' {
  interface DefaultColors {
    brand: {
      primary: string
      secondary: string
    }
    success: string
    warning: string
    error: string
  }
}

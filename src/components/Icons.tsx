import { WhatsappLogo, ArrowRight, ArrowUpRight, Sun, Moon } from '@phosphor-icons/react'

/* Una sola familia (Phosphor), un solo grosor (regular). El logo de WhatsApp va relleno para reconocerse. */
type P = { className?: string }
const d = 'h-5 w-5'

export const WhatsAppIcon = ({ className = d }: P) => <WhatsappLogo className={className} weight="fill" aria-hidden="true" />
export const ArrowIcon = ({ className = d }: P) => <ArrowRight className={className} aria-hidden="true" />
export const ExternalIcon = ({ className = d }: P) => <ArrowUpRight className={className} aria-hidden="true" />
export const SunIcon = ({ className = d }: P) => <Sun className={className} aria-hidden="true" />
export const MoonIcon = ({ className = d }: P) => <Moon className={className} aria-hidden="true" />

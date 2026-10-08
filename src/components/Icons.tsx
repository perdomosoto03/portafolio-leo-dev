import {
  WhatsappLogo, EnvelopeSimple, ArrowRight, ArrowUpRight, Check, Layout, Globe, Code,
  HardDrives, List, X, DownloadSimple, Sun, Moon,
} from '@phosphor-icons/react'

/* Una sola familia (Phosphor), un solo grosor (regular). El logo de WhatsApp va relleno para reconocerse. */
type P = { className?: string }
const d = 'h-5 w-5'

export const WhatsAppIcon = ({ className = d }: P) => <WhatsappLogo className={className} weight="fill" aria-hidden="true" />
export const MailIcon = ({ className = d }: P) => <EnvelopeSimple className={className} aria-hidden="true" />
export const ArrowIcon = ({ className = d }: P) => <ArrowRight className={className} aria-hidden="true" />
export const ExternalIcon = ({ className = d }: P) => <ArrowUpRight className={className} aria-hidden="true" />
export const CheckIcon = ({ className = d }: P) => <Check className={className} weight="bold" aria-hidden="true" />
export const LayoutIcon = ({ className = d }: P) => <Layout className={className} aria-hidden="true" />
export const GlobeIcon = ({ className = d }: P) => <Globe className={className} aria-hidden="true" />
export const CodeIcon = ({ className = d }: P) => <Code className={className} aria-hidden="true" />
export const ServerIcon = ({ className = d }: P) => <HardDrives className={className} aria-hidden="true" />
export const MenuIcon = ({ className = d }: P) => <List className={className} aria-hidden="true" />
export const CloseIcon = ({ className = d }: P) => <X className={className} aria-hidden="true" />
export const DownloadIcon = ({ className = d }: P) => <DownloadSimple className={className} aria-hidden="true" />
export const SunIcon = ({ className = d }: P) => <Sun className={className} aria-hidden="true" />
export const MoonIcon = ({ className = d }: P) => <Moon className={className} aria-hidden="true" />

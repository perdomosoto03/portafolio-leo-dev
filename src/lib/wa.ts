import { site } from '../data/site'

export const waLink = (msg: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`

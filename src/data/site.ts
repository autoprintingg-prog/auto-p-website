import type { LucideIcon } from 'lucide-react'
import {
  BellRing,
  Clock3,
  CreditCard,
  FileImage,
  FileText,
  FileType2,
  Layers3,
  Mail,
  MessageSquareText,
  Palette,
  Printer,
  ScanSearch,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Workflow,
} from 'lucide-react'

export type NavItem = {
  label: string
  path: string
}

export type TextCard = {
  description: string
  title: string
}

export type IconItem = TextCard & {
  icon: LucideIcon
}

export type SupportedFormat = {
  description: string
  name: string
}

export type SupportedFormatWithIcon = SupportedFormat & {
  icon: LucideIcon
}

export type PricingComparisonItem = {
  bw: string
  color: string
  label: string
}

export type PricingFaqItem = {
  answer: string
  question: string
}

export type TeamMember = {
  email: string
  mobile: string
  name: string
  photo: string
}

export type PageIntro = {
  eyebrow: string
  lead: string
  title: string
}

export type HomeHeroContent = PageIntro & {
  primaryCtaLabel: string
  secondaryCtaLabel: string
}

export type ProjectGuideSummary = {
  description: string
  title: string
}

export type SiteContent = {
  aboutIntro: PageIntro
  contactCards: TextCard[]
  contactIntro: PageIntro
  emailComposeUrl: string
  featureList: TextCard[]
  footerDescription: string
  footerEyebrow: string
  homeHero: HomeHeroContent
  howItWorksIntro: PageIntro
  navCtaLabel: string
  navItems: NavItem[]
  navMetaLabel: string
  pricingComparison: PricingComparisonItem[]
  pricingFaqs: PricingFaqItem[]
  pricingIntro: PageIntro
  projectGuideSummary: ProjectGuideSummary
  siteName: string
  siteTagline: string
  supportedFormats: SupportedFormat[]
  teamMembers: TeamMember[]
  techStack: string[]
  timelineSteps: TextCard[]
  useCases: TextCard[]
  whatsappUrl: string
  workflowPreview: TextCard[]
}

export type SiteContentView = Omit<
  SiteContent,
  'contactCards' | 'featureList' | 'supportedFormats' | 'workflowPreview'
> & {
  contactCards: IconItem[]
  featureList: IconItem[]
  supportedFormats: SupportedFormatWithIcon[]
  workflowPreview: IconItem[]
}

const workflowIcons = [Send, SlidersHorizontal, CreditCard, Printer]
const featureIcons = [Smartphone, Layers3, SlidersHorizontal, ShieldCheck, Workflow, BellRing]
const formatIcons = [FileText, FileType2, Palette, FileImage, ScanSearch]
const contactIcons = [MessageSquareText, Mail, Clock3]
const LEGACY_WHATSAPP_URL =
  'https://api.whatsapp.com/send?text=Hello%20AutoPrinting%2C%20I%20want%20to%20start%20a%20print%20request.'
export const DEFAULT_WHATSAPP_URL = 'https://wa.me/918263962485?text=Hi'

export const defaultSiteContent: SiteContent = {
  siteName: 'AutoPrinting',
  siteTagline: 'WhatsApp · Email · Print automation',
  navMetaLabel: 'Dual Channel',
  navCtaLabel: 'Start on WhatsApp',
  footerEyebrow: 'WhatsApp + Email Print Automation',
  footerDescription:
    'AutoPrinting is a fully automated print workflow platform. Customers send documents via WhatsApp or email autoprintingg@gmail.com — the system handles validation, pricing, payment via Cashfree, and queues the job for printing automatically.',
  whatsappUrl: DEFAULT_WHATSAPP_URL,
  emailComposeUrl: 'mailto:autoprintingg@gmail.com?subject=Print%20Request&body=Hi%2C%20I%20would%20like%20to%20print%20a%20document.%20Please%20find%20the%20attachment.',
  homeHero: {
    eyebrow: 'WhatsApp · Email · Print Automation',
    title: 'Send a document. Get it printed.',
    lead:
      'AutoPrinting turns WhatsApp or Email into a fully automated print intake workflow. Send a file, choose your settings, pay through Cashfree, and your document moves straight into the print queue.',
    primaryCtaLabel: 'Start on WhatsApp',
    secondaryCtaLabel: 'See the flow',
  },
  howItWorksIntro: {
    eyebrow: 'Workflow Breakdown',
    title: 'From WhatsApp or Email to printed output — fully automated',
    lead:
      'AutoPrinting supports two intake channels: WhatsApp for instant conversational ordering and Email (autoprintingg@gmail.com) for document-first workflows. Both lead to the same payment gate and print queue.',
  },
  pricingIntro: {
    eyebrow: 'Pricing',
    title: 'Transparent billing logic for every print job',
    lead:
      'AutoPrinting does not publish invented rates. The pricing formula is explained clearly so the connected print center can use its real per-page charges. Customers always see the exact total before paying via Cashfree.',
  },
  aboutIntro: {
    eyebrow: 'About AutoPrinting',
    title: 'A dual-channel print automation platform for modern print shops',
    lead:
      'AutoPrinting is a fully automated printing workflow. Customers send documents via WhatsApp or email autoprintingg@gmail.com — no app, no counter, no phone call needed. The system handles everything from document validation to payment and print queue handoff.',
  },
  contactIntro: {
    eyebrow: 'Contact',
    title: 'Reach the AutoPrinting team',
    lead:
      'WhatsApp is the fastest path for customers. For onboarding inquiries, product walkthroughs, or deployment discussions, use the form below or email us directly at autoprintingg@gmail.com.',
  },
  navItems: [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  workflowPreview: [
    {
      title: 'Send',
      description: 'Start via WhatsApp or email autoprintingg@gmail.com with your document attached.',
    },
    {
      title: 'Choose',
      description:
        'Select color mode, duplex preference, and number of copies. Email orders show a confirmation page; WhatsApp orders use the chat flow.',
    },
    {
      title: 'Pay',
      description: 'Complete payment through Cashfree after the system prepares your print summary.',
    },
    {
      title: 'Print',
      description: 'Your file enters the print queue automatically once payment is confirmed.',
    },
  ],
  featureList: [
    {
      title: 'No App Required',
      description: 'Order prints via WhatsApp chat or by emailing autoprintingg@gmail.com — no app, no signup.',
    },
    {
      title: 'Dual Channel',
      description: 'Both WhatsApp and Email ordering are supported in one unified automation system.',
    },
    {
      title: 'Flexible Options',
      description: 'Users choose black and white or color, single-side or duplex, plus copy count — on any channel.',
    },
    {
      title: 'Secure Payments',
      description:
        'Cashfree handles payment before any print job is queued. Money collected first, paper used after.',
    },
    {
      title: 'Automatic Queue',
      description:
        'Approved jobs enter the print queue automatically — no manual re-entry at the printer desk.',
    },
    {
      title: 'Smart Notifications',
      description:
        'Customers receive WhatsApp messages or emails at every stage: received, paid, printing, and ready.',
    },
  ],
  useCases: [
    {
      title: 'Campus Print Desks',
      description:
        'Students send files via WhatsApp or email autoprintingg@gmail.com, choose settings, pay online, and pick up their prints — zero counter interaction needed.',
    },
    {
      title: 'Office Document Hubs',
      description:
        'Internal teams email reports and presentation decks directly to the print inbox. Payment and queue handoff happen automatically.',
    },
    {
      title: 'Managed Service Counters',
      description:
        'Reduce repetitive intake work. File collection, print settings, payment, and queue readiness all handled before the operator steps in.',
    },
  ],
  timelineSteps: [
    {
      title: 'Send the document',
      description:
        'Customer sends a file via WhatsApp or emails it to autoprintingg@gmail.com with the document attached.',
    },
    {
      title: 'System validates the file',
      description:
        'AutoPrinting checks the file type, counts pages, and converts images or Word/PowerPoint files to print-ready PDF automatically.',
    },
    {
      title: 'Print preferences collected',
      description:
        'WhatsApp users respond to guided prompts. Email users open a secure confirmation link to choose color, duplex, and copy count.',
    },
    {
      title: 'Price summary generated',
      description:
        'The system calculates the total — pages × rate × copies — and presents it clearly before any payment is requested.',
    },
    {
      title: 'Payment via Cashfree',
      description:
        'A Cashfree payment link is sent to the customer. Print only proceeds after the payment is confirmed.',
    },
    {
      title: 'Auto-queued and printed',
      description:
        'Once payment succeeds, the job enters the print queue automatically. The customer gets a confirmation on WhatsApp or email.',
    },
  ],
  supportedFormats: [
    {
      name: 'PDF',
      description: 'Best for print-ready documents where layout consistency matters the most.',
    },
    {
      name: 'DOCX',
      description:
        'Useful for editable text-heavy documents that still need a guided print flow.',
    },
    {
      name: 'PPTX',
      description: 'Ideal for presentation decks, class slides, and structured visual handouts.',
    },
    {
      name: 'JPG',
      description:
        'Suitable for image-based print requests, proofs, posters, and reference pages.',
    },
    {
      name: 'PNG',
      description:
        'Handy for graphics, diagrams, and high-clarity image assets that need printing.',
    },
  ],
  pricingComparison: [
    {
      label: 'Billing model',
      bw: 'Per-page rate set by the print desk',
      color: 'Per-page rate set by the print desk',
    },
    {
      label: 'Formula',
      bw: 'Pages × B&W rate × Copies',
      color: 'Pages × Color rate × Copies',
    },
    {
      label: 'Duplex support',
      bw: 'Available when printer setup allows double-sided jobs',
      color: 'Available when printer setup allows double-sided jobs',
    },
    {
      label: 'Payment gate',
      bw: 'Cashfree — paid before queue entry',
      color: 'Cashfree — paid before queue entry',
    },
    {
      label: 'Supported inputs',
      bw: 'PDF, DOCX, PPTX, JPG, PNG',
      color: 'PDF, DOCX, PPTX, JPG, PNG',
    },
    {
      label: 'Order channels',
      bw: 'WhatsApp + Email',
      color: 'WhatsApp + Email',
    },
  ],
  pricingFaqs: [
    {
      question: 'How do I place a print order?',
      answer:
        'You can send a document via WhatsApp to our business number, or email it directly to autoprintingg@gmail.com. The system picks it up within seconds and guides you through the rest.',
    },
    {
      question: 'Why are per-page rates not shown on the website?',
      answer:
        'AutoPrinting is designed to work with rates configured by the connected print center. The calculator stays transparent without publishing numbers that may not match the actual deployment.',
    },
    {
      question: 'How is the total calculated?',
      answer:
        'Pages × selected per-page rate × number of copies. For color jobs, the rate is higher. Duplex billing depends on how the print center configures it.',
    },
    {
      question: 'When does payment happen?',
      answer:
        'Payment happens after print preferences are confirmed. A Cashfree payment link is sent via WhatsApp or shown on the email confirmation page. Print only starts after payment is verified.',
    },
    {
      question: 'What file types are supported?',
      answer:
        'PDF, DOCX, PPTX, JPG, and PNG. Word and PowerPoint files are converted to PDF automatically. Images are scaled to A4 with proper margins before printing.',
    },
  ],
  techStack: [
    'React + TypeScript + Vite',
    'Node.js + Express',
    'PostgreSQL + Prisma',
    'Redis + BullMQ',
    'WhatsApp (Evolution API)',
    'Gmail API (OAuth2)',
    'Cashfree Payments',
    'PDF + DOCX + PPTX Processing',
    'Docker + Docker Compose',
    'JWT Auth + bcrypt',
  ],
  teamMembers: [
    { name: 'Prajwal Abhang', email: 'prajwalabhang25@gmail.com', mobile: '+91 80100 76459', photo: '/team/prajwal.jpg' },
    { name: 'Vinayak Gund', email: 'gundvinayak1@gmail.com', mobile: '+91 87675 35697', photo: '/team/vinayak.jpg' },
    { name: 'Shubham Sonawane', email: 'shubhamsonawane8081@gmail.com', mobile: '+91 80104 11281', photo: '/team/shubham.png' },
  ],
  projectGuideSummary: {
    title: 'Product Foundations',
    description:
      'AutoPrinting is presented as a product-first workflow while the underlying system has been shaped through structured engineering review. The public website focuses on clarity, adoption, and trust, while the automation layer handles validation, payment safety, and print queue readiness separately.',
  },
  contactCards: [
    {
      title: 'WhatsApp Entry Point',
      description:
        'Send a WhatsApp message to start your print request instantly. The chatbot guides you through document upload, settings, and payment.',
    },
    {
      title: 'Email Your Document',
      description:
        'Email your file directly to autoprintingg@gmail.com. The system picks it up automatically and emails you a confirmation link to review settings and pay.',
    },
    {
      title: 'Call or Message Us',
      description:
        'Speak directly with our team — +91 87675 35697 or +91 80100 76459. Available during working hours for inquiries and onboarding.',
    },
  ],
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

function normalizeWhatsAppUrl(value: unknown) {
  const nextValue = readString(value, defaultSiteContent.whatsappUrl)
  return nextValue === LEGACY_WHATSAPP_URL ? defaultSiteContent.whatsappUrl : nextValue
}

function normalizeObjectArray<T extends Record<string, string>>(
  value: unknown,
  fallback: T[],
  keys: string[],
) {
  if (!Array.isArray(value) || value.length === 0) {
    return clone(fallback)
  }

  return value.map((entry, index) => {
    const base = fallback[index] ?? fallback[fallback.length - 1]
    const source = isRecord(entry) ? entry : {}
    const normalized = { ...base } as Record<string, string>

    keys.forEach((key) => {
      normalized[key] = readString(source[key], base[key as keyof T] ?? '')
    })

    return normalized as T
  })
}

function normalizeStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value) || value.length === 0) {
    return clone(fallback)
  }

  const normalized = value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)

  return normalized.length > 0 ? normalized : clone(fallback)
}

function normalizePageIntro(value: unknown, fallback: PageIntro): PageIntro {
  const source = isRecord(value) ? value : {}

  return {
    eyebrow: readString(source.eyebrow, fallback.eyebrow),
    title: readString(source.title, fallback.title),
    lead: readString(source.lead, fallback.lead),
  }
}

function normalizeHomeHero(value: unknown, fallback: HomeHeroContent): HomeHeroContent {
  const source = isRecord(value) ? value : {}

  return {
    ...normalizePageIntro(source, fallback),
    primaryCtaLabel: readString(source.primaryCtaLabel, fallback.primaryCtaLabel),
    secondaryCtaLabel: readString(source.secondaryCtaLabel, fallback.secondaryCtaLabel),
  }
}

export function cloneSiteContent(content: SiteContent = defaultSiteContent) {
  return clone(content)
}

export function mergeSiteContent(value: unknown): SiteContent {
  const source = isRecord(value) ? value : {}
  const guideSource = isRecord(source.projectGuideSummary) ? source.projectGuideSummary : {}

  return {
    siteName: readString(source.siteName, defaultSiteContent.siteName),
    siteTagline: readString(source.siteTagline, defaultSiteContent.siteTagline),
    navMetaLabel: readString(source.navMetaLabel, defaultSiteContent.navMetaLabel),
    navCtaLabel: readString(source.navCtaLabel, defaultSiteContent.navCtaLabel),
    footerEyebrow: readString(source.footerEyebrow, defaultSiteContent.footerEyebrow),
    footerDescription: readString(source.footerDescription, defaultSiteContent.footerDescription),
    whatsappUrl: normalizeWhatsAppUrl(source.whatsappUrl),
    emailComposeUrl: readString(source.emailComposeUrl, defaultSiteContent.emailComposeUrl),
    homeHero: normalizeHomeHero(source.homeHero, defaultSiteContent.homeHero),
    howItWorksIntro: normalizePageIntro(source.howItWorksIntro, defaultSiteContent.howItWorksIntro),
    pricingIntro: normalizePageIntro(source.pricingIntro, defaultSiteContent.pricingIntro),
    aboutIntro: normalizePageIntro(source.aboutIntro, defaultSiteContent.aboutIntro),
    contactIntro: normalizePageIntro(source.contactIntro, defaultSiteContent.contactIntro),
    navItems: normalizeObjectArray(source.navItems, defaultSiteContent.navItems, ['label', 'path']),
    workflowPreview: normalizeObjectArray(source.workflowPreview, defaultSiteContent.workflowPreview, [
      'title',
      'description',
    ]),
    featureList: normalizeObjectArray(source.featureList, defaultSiteContent.featureList, [
      'title',
      'description',
    ]),
    useCases: normalizeObjectArray(source.useCases, defaultSiteContent.useCases, [
      'title',
      'description',
    ]),
    timelineSteps: normalizeObjectArray(source.timelineSteps, defaultSiteContent.timelineSteps, [
      'title',
      'description',
    ]),
    supportedFormats: normalizeObjectArray(
      source.supportedFormats,
      defaultSiteContent.supportedFormats,
      ['name', 'description'],
    ),
    pricingComparison: normalizeObjectArray(
      source.pricingComparison,
      defaultSiteContent.pricingComparison,
      ['label', 'bw', 'color'],
    ),
    pricingFaqs: normalizeObjectArray(source.pricingFaqs, defaultSiteContent.pricingFaqs, [
      'question',
      'answer',
    ]),
    techStack: normalizeStringArray(source.techStack, defaultSiteContent.techStack),
    teamMembers: normalizeObjectArray(source.teamMembers, defaultSiteContent.teamMembers, ['name', 'email', 'mobile', 'photo']),
    projectGuideSummary: {
      title: readString(guideSource.title, defaultSiteContent.projectGuideSummary.title),
      description: readString(
        guideSource.description,
        defaultSiteContent.projectGuideSummary.description,
      ),
    },
    contactCards: normalizeObjectArray(source.contactCards, defaultSiteContent.contactCards, [
      'title',
      'description',
    ]),
  }
}

function attachIconItems(items: TextCard[], icons: LucideIcon[]): IconItem[] {
  return items.map((item, index) => ({
    ...item,
    icon: icons[index] ?? icons[icons.length - 1],
  }))
}

function attachFormatIcons(items: SupportedFormat[], icons: LucideIcon[]): SupportedFormatWithIcon[] {
  return items.map((item, index) => ({
    ...item,
    icon: icons[index] ?? icons[icons.length - 1],
  }))
}

export function buildSiteContentView(content: SiteContent): SiteContentView {
  return {
    ...content,
    workflowPreview: attachIconItems(content.workflowPreview, workflowIcons),
    featureList: attachIconItems(content.featureList, featureIcons),
    supportedFormats: attachFormatIcons(content.supportedFormats, formatIcons),
    contactCards: attachIconItems(content.contactCards, contactIcons),
  }
}

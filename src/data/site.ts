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
  name: string
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
  siteTagline: 'WhatsApp printing automation',
  navMetaLabel: 'Automation Layer',
  navCtaLabel: 'Start on WhatsApp',
  footerEyebrow: 'WhatsApp Print Workflow',
  footerDescription:
    'Product website and entry layer for a WhatsApp-based document printing workflow built around faster intake, clearer pricing, and cleaner queue handoff.',
  whatsappUrl: DEFAULT_WHATSAPP_URL,
  emailComposeUrl: 'mailto:autoprintingg@gmail.com?subject=AutoPrinting%20Inquiry',
  homeHero: {
    eyebrow: 'WhatsApp-Based Print Automation',
    title: 'Send a document. Get it printed.',
    lead:
      'AutoPrinting turns WhatsApp into a print intake workflow. Send a file, choose the print settings, pay through Cashfree, and move straight into the queue.',
    primaryCtaLabel: 'Start on WhatsApp',
    secondaryCtaLabel: 'See the flow',
  },
  howItWorksIntro: {
    eyebrow: 'Workflow Breakdown',
    title: 'From WhatsApp message to printed output',
    lead:
      'AutoPrinting separates the user-facing conversation from the backend automation. This site explains the exact journey so users know what happens before, during, and after payment.',
  },
  pricingIntro: {
    eyebrow: 'Pricing',
    title: 'Transparent billing logic for real print deployments',
    lead:
      'AutoPrinting does not publish invented rates. Instead, the website explains the formula clearly so the connected print center can use its real per-page charges without misleading users.',
  },
  aboutIntro: {
    eyebrow: 'About AutoPrinting',
    title: 'A print workflow product built around faster document intake',
    lead:
      'AutoPrinting is designed as a practical workflow product for document printing. This website explains the experience clearly, shows how the system fits into real usage, and gives users a direct entry point through WhatsApp.',
  },
  contactIntro: {
    eyebrow: 'Contact',
    title: 'Reach the AutoPrinting team through the channels that fit the workflow',
    lead:
      'WhatsApp is the fastest path into the product. For workflow discussions, walkthroughs, or implementation inquiries, you can also draft an email directly from this page.',
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
      description: 'Start in WhatsApp by sending a supported file directly to the AutoPrinting flow.',
    },
    {
      title: 'Choose',
      description:
        'Select color mode, duplex preference, and the number of copies before confirmation.',
    },
    {
      title: 'Pay',
      description: 'Complete payment through Cashfree after the system prepares the print summary.',
    },
    {
      title: 'Print',
      description: 'The file enters the print queue automatically once payment is confirmed.',
    },
  ],
  featureList: [
    {
      title: 'No App Required',
      description: 'The full interaction starts in WhatsApp, keeping onboarding simple and familiar.',
    },
    {
      title: 'Multiple Formats',
      description: 'AutoPrinting handles PDF, DOCX, PPTX, JPG, and PNG uploads in one flow.',
    },
    {
      title: 'Flexible Options',
      description: 'Users choose black and white or color, single-side or duplex, plus copy count.',
    },
    {
      title: 'Secure Payments',
      description:
        'Cashfree handles the payment handoff so the print job only proceeds after confirmation.',
    },
    {
      title: 'Automatic Queue',
      description:
        'Approved jobs move into the processing queue without manual re-entry at the printer desk.',
    },
    {
      title: 'Status Updates',
      description:
        'The chat flow can keep the user informed as the document moves through validation and print.',
    },
  ],
  useCases: [
    {
      title: 'Campus Print Desks',
      description:
        'Turn student file submissions into a guided print workflow without needing a separate app or manual counter-side configuration for every request.',
    },
    {
      title: 'Office Document Hubs',
      description:
        'Let internal teams submit reports, forms, and presentation decks through a familiar channel while preserving payment and queue logic where needed.',
    },
    {
      title: 'Managed Service Counters',
      description:
        'Reduce repetitive intake work by collecting file type, print settings, payment handoff, and print readiness before the operator steps in.',
    },
  ],
  timelineSteps: [
    {
      title: 'Upload the file in WhatsApp',
      description:
        'The user opens the AutoPrinting WhatsApp entry point and sends a document or image to begin.',
    },
    {
      title: 'Validate format and page readiness',
      description:
        'The automation checks whether the file type is supported and prepares it for the print workflow.',
    },
    {
      title: 'Collect print preferences',
      description:
        'The user confirms black and white or color, single or duplex, and the required number of copies.',
    },
    {
      title: 'Generate the payable summary',
      description:
        'The system prepares the final print request based on page count, chosen mode, and copy quantity.',
    },
    {
      title: 'Redirect to Cashfree',
      description:
        'Payment is completed securely before the print request is allowed into the automation queue.',
    },
    {
      title: 'Queue and print automatically',
      description:
        'Once payment succeeds, the job moves to the connected print process without extra manual handling.',
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
      bw: 'Per-page rate configured by the print desk',
      color: 'Per-page rate configured by the print desk',
    },
    {
      label: 'Formula',
      bw: 'Pages x B&W rate x Copies',
      color: 'Pages x Color rate x Copies',
    },
    {
      label: 'Duplex support',
      bw: 'Available when the printer setup allows double-sided jobs',
      color: 'Available when the printer setup allows double-sided jobs',
    },
    {
      label: 'Payment gate',
      bw: 'Cashfree confirmation before queue entry',
      color: 'Cashfree confirmation before queue entry',
    },
    {
      label: 'Supported inputs',
      bw: 'PDF, DOCX, PPTX, JPG, PNG',
      color: 'PDF, DOCX, PPTX, JPG, PNG',
    },
  ],
  pricingFaqs: [
    {
      question: 'Why are rates entered instead of hardcoded on this website?',
      answer:
        'AutoPrinting is designed to work with the pricing configured by the connected print center. The calculator stays transparent without inventing rates that may not match the actual deployment.',
    },
    {
      question: 'How is the total calculated?',
      answer:
        'The website uses the workflow formula directly: pages multiplied by the selected per-page rate and multiplied by the number of copies.',
    },
    {
      question: 'Does duplex change the calculator formula?',
      answer:
        'The display formula stays the same here because the charging policy depends on how the print center defines duplex billing. The site keeps that choice explicit instead of assuming a hidden discount.',
    },
    {
      question: 'When does payment happen?',
      answer:
        'Payment happens only after the print request has been configured. Cashfree is used as the secure payment handoff before the system queues the file.',
    },
  ],
  techStack: [
    'React',
    'TypeScript',
    'Vite',
    'React Router',
    'Framer Motion',
    'WhatsApp Workflow',
    'Cashfree Payment Flow',
    'Document Validation',
    'Print Queue Automation',
  ],
  teamMembers: [{ name: 'Vinayak Gund' }, { name: 'Prajwal Abhang' }, { name: 'Shubham' }],
  projectGuideSummary: {
    title: 'Product Foundations',
    description:
      'AutoPrinting is presented as a product-first workflow while the underlying system has been shaped through structured engineering review. The public website focuses on clarity, adoption, and trust, while the automation layer handles validation, payment safety, and print queue readiness separately.',
  },
  contactCards: [
    {
      title: 'WhatsApp Entry Point',
      description:
        'Open a prefilled WhatsApp message to start the print request conversation from the same channel the product is built around.',
    },
    {
      title: 'Email Us',
      description:
        'Reach us at autoprintingg@gmail.com for product questions, walkthrough requests, or deployment discussions.',
    },
    {
      title: 'Call Us',
      description:
        'Speak directly with our team — +91 87675 35697 or +91 80100 76459. Available during working hours.',
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
    teamMembers: normalizeObjectArray(source.teamMembers, defaultSiteContent.teamMembers, ['name']),
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

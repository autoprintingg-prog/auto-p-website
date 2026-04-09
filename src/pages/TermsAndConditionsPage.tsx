import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By using AutoPrinting (https://autoprinting.in), you agree to these Terms and Conditions.',
      'If you do not agree, please do not use the service.',
    ],
  },
  {
    title: '2. Service Scope',
    body: [
      'AutoPrinting is an automated WhatsApp-based document printing service.',
      'Users upload files, choose print settings, complete payment, and the system processes print jobs automatically.',
      'The platform operates with minimal to no manual intervention in normal workflow.',
    ],
  },
  {
    title: '3. User Responsibilities',
    body: [
      'You are fully responsible for the files and content you upload.',
      'You confirm you have legal rights to print the uploaded document.',
      'You must not upload unlawful, harmful, infringing, or prohibited content.',
      'You are responsible for reviewing print options such as color mode, page range, and copies before payment.',
    ],
  },
  {
    title: '4. Automated Processing Disclaimer',
    body: [
      'Once payment is confirmed, the system may automatically move your job into processing and printing.',
      'Because this is an automated workflow, changes or cancellations may not be possible after processing starts.',
    ],
  },
  {
    title: '5. Payments and Third-Party Gateways',
    body: [
      'Payments are processed through third-party payment gateways such as Razorpay or Cashfree.',
      'AutoPrinting does not store full card or banking credentials.',
      'Gateway approvals, failures, delays, and settlement timelines are subject to the policies of the selected payment provider.',
    ],
  },
  {
    title: '6. Refund Terms',
    body: [
      'No refund is applicable once printing is completed.',
      'Refunds are considered only for eligible cases such as system failure or successful payment without print initiation.',
      'Refund decisions are made after technical verification of logs and payment status.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    body: [
      'To the maximum extent permitted by law, AutoPrinting is not liable for indirect, incidental, or consequential losses.',
      'Our total liability for any claim related to a specific order is limited to the amount paid for that order.',
      'We are not responsible for user-side issues such as incorrect file upload, wrong print selections, or poor file quality.',
    ],
  },
  {
    title: '8. Service Availability',
    body: [
      'Service availability may be affected by internet issues, WhatsApp availability, payment gateway downtime, or maintenance windows.',
      'We may update, suspend, or discontinue features at any time to improve system performance or compliance.',
    ],
  },
  {
    title: '9. Governing Law',
    body: [
      'These terms are governed by the laws of India.',
      'Any dispute is subject to the competent courts in India.',
    ],
  },
]

export function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-3xl border border-emerald-400/20 p-8 shadow-[0_0_80px_rgba(16,185,129,0.08)] backdrop-blur"
          style={{ background: 'var(--surface)' }}
        >
          <p className="mb-3 inline-flex rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Legal
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: 'var(--text)' }}>
            Terms and Conditions
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 sm:text-base" style={{ color: 'var(--text-soft)' }}>
            These terms govern your use of AutoPrinting, a WhatsApp-based automated document printing system.
            Please read them carefully before placing any order.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              to="/refund-policy"
              className="rounded-xl border px-4 py-2 transition hover:border-emerald-400/60 hover:text-emerald-200"
              style={{ borderColor: 'var(--border-strong)', background: 'var(--surface-strong)', color: 'var(--text)' }}
            >
              View Refund Policy
            </Link>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          className="mt-8 space-y-6"
        >
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border p-6 transition hover:border-emerald-400/30"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                {section.title}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 sm:text-base" style={{ color: 'var(--text-soft)' }}>
                {section.body.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14, ease: 'easeOut' }}
          className="mt-8 rounded-2xl border p-6"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
            10. Contact
          </h2>
          <p className="mt-3 text-sm leading-7 sm:text-base" style={{ color: 'var(--text-soft)' }}>
            For legal or policy questions, contact us at{' '}
            <a href="mailto:autoprintingg@gmail.com" className="font-medium text-emerald-300 hover:text-emerald-200">
              autoprintingg@gmail.com
            </a>
            .
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
            Last updated: April 2026
          </p>
        </motion.section>
      </main>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: '1. Policy Overview',
    body: [
      'This Refund Policy applies to all payments made for printing orders on AutoPrinting (https://autoprinting.in).',
      'AutoPrinting is an automated system and each refund request is reviewed against payment and processing logs.',
    ],
  },
  {
    title: '2. Eligible Refund Cases',
    body: [
      'Refunds may be approved if payment is successful but the print job is not initiated due to system failure.',
      'Refunds may be approved for duplicate payment charged for the same order due to gateway or technical error.',
      'Refunds may be approved if payment is captured but order creation fails in our system.',
    ],
  },
  {
    title: '3. Non-Refundable Cases',
    body: [
      'No refund is available once printing is completed.',
      'No refund is available for issues caused by incorrect file upload, wrong print selection, or poor file quality submitted by the user.',
      'No refund is available where order details were correctly processed as selected by the user.',
    ],
  },
  {
    title: '4. Cancellation and Processing Window',
    body: [
      'Because the workflow is automated, orders may start processing immediately after payment confirmation.',
      'Cancellation is generally not possible once processing begins.',
      'If the order has not started processing, cancellation requests may be considered at our discretion.',
    ],
  },
  {
    title: '5. Payment Gateway Handling',
    body: [
      'Payments are processed through third-party gateways such as Razorpay or Cashfree.',
      'Any bank, card, UPI, or settlement delay is controlled by the payment provider and banking network.',
      'Approved refunds are sent back through the original payment mode as per gateway timelines.',
    ],
  },
  {
    title: '6. Refund Timeline',
    body: [
      'After approval, refunds are usually processed within 5 to 7 working days.',
      'In some cases, final credit may take longer depending on your bank or payment provider.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    body: [
      'AutoPrinting\'s liability is limited to the amount paid for the affected order.',
      'We are not liable for indirect losses, business interruption, or user-side document errors.',
    ],
  },
]

export function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-8 shadow-[0_0_80px_rgba(6,182,212,0.08)] backdrop-blur"
        >
          <p className="mb-3 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Legal
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Refund Policy</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            This policy explains when a refund can be issued for AutoPrinting orders and when it cannot be
            provided.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              to="/terms-and-conditions"
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-200"
            >
              View Terms and Conditions
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
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-cyan-400/30"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300 sm:text-base">
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
          className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
        >
          <h2 className="text-xl font-semibold text-white">8. Contact for Refund Support</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            To request a refund review, email{' '}
            <a href="mailto:autoprintingg@gmail.com" className="font-medium text-cyan-300 hover:text-cyan-200">
              autoprintingg@gmail.com
            </a>{' '}
            with your order details and payment reference.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-400">Last updated: April 2026</p>
        </motion.section>
      </main>
    </div>
  )
}

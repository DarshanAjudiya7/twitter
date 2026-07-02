import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendWelcomeEmail(to: string, name?: string) {
  const subject = "Welcome back to Twitter XI Five"
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
      <h1 style="color: #1d9bf0;">Welcome back!</h1>
      <p>Hi ${name ?? "there"},</p>
      <p>Thanks for signing in to <strong>Twitter XI Five</strong>.</p>
      <p>We're happy to have you back. Enjoy the latest updates and content on your dashboard.</p>
      <p>If you didn&apos;t sign in, please ignore this message.</p>
      <hr />
      <p style="font-size: 0.9rem; color: #555;">https://twitter-xi-five.vercel.app/</p>
    </div>
  `

  return transporter.sendMail({
    from: process.env.EMAIL_FROM ?? `"Twitter XI Five" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })
}

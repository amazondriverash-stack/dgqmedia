export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 px-6 py-16 text-slate-400 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-2xl font-black text-white">DGQ</h3>
            <p className="text-sm leading-relaxed">
              Strategy, creative, and performance marketing built to drive real growth.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-bold text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span>Strategy</span>
              </li>
              <li>
                <span>Creative</span>
              </li>
              <li>
                <span>Performance</span>
              </li>
              <li>
                <span>Analytics</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-bold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#main" className="transition hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#solutions" className="transition hover:text-white">
                  Work
                </a>
              </li>
              <li>
                <span>Blog</span>
              </li>
              <li>
                <span>Careers</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-bold text-white">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:ducksgquack@gmail.com" className="transition hover:text-white">
                  ducksgquack@gmail.com
                </a>
              </li>
              <li>
                <span>Twitter</span>
              </li>
              <li>
                <span>LinkedIn</span>
              </li>
              <li>
                <span>Instagram</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between text-sm md:flex-row">
            <p>&copy; {currentYear} DGQ. All rights reserved.</p>
            <div className="mt-4 flex gap-6 md:mt-0">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

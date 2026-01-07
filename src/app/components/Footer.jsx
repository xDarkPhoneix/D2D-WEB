import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaXTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-yellow-400 text-black pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-2xl mb-6 tracking-tight">D2D SOCIAL</h3>
            <p className="text-black/60 mb-8 max-w-sm leading-relaxed">
              Crafting digital experiences that inspire and connect. We help bold brands tell their authentic stories in the digital age.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-black/60 hover:text-black transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-black/60 hover:text-black transition-colors duration-300">
                <FaXTwitter size={24} />
              </a>
              <a href="#" className="text-black/60 hover:text-black transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-black/60 hover:text-black transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-black">Company</h4>
            <ul className="space-y-4 text-black/60">
              {['About', 'Careers', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-lg mb-6 text-black">Services</h4>
            <ul className="space-y-4 text-black/60">
              {['Branding', 'Web Design', 'Social Media', 'Content'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="font-semibold text-lg mb-6 text-black">Stay Updated</h4>
            <p className="text-black/60 mb-6">
              Subscribe to our newsletter for the latest digital trends and agency news.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/20 w-full"
              />
              <button className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-black/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-black/50">
          <p>&copy; {new Date().getFullYear()} D2D Social. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
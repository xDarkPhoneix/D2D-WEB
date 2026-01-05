import Link from 'next/link';
import React from 'react';

function  Footer () {
    return (
        <>
         {/* Footer */}
        <footer className="bg-foreground text-background py-16 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="font-bold text-xl mb-4">D2D SOCIAL</h3>
                <p className="text-background/70">Creative digital agency for bold brands.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-background/70">
                  <li>
                    <Link href="/about" className="hover:text-background transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="hover:text-background transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-background transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-background/70">
                  <li>
                    <Link href="/services" className="hover:text-background transition-colors">
                      Branding
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-background transition-colors">
                      Web Design
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-background transition-colors">
                      Social Media
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Social</h4>
                <ul className="space-y-2 text-background/70">
                  <li>
                    <a href="#" className="hover:text-background transition-colors">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-background transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-background transition-colors">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-background/20 pt-8 text-center text-background/70 text-sm">
              <p>&copy; 2026 D2D Social. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </>
    )
}

export default Footer;
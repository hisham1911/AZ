import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-blue-950 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top section with main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 md:py-8">
          {/* Company Info */}
          <div className="flex flex-col">
            <div className="flex items-center mb-3 group">
              <div className="relative mr-3">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-blue-400/30 blur-sm rounded-full opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative h-9 w-9 md:h-11 md:w-11 bg-blue-900 rounded-full p-1 flex items-center justify-center ring-1 ring-white/10">
                  <Image 
                    src="/images/az-logo.png" 
                    alt="AZ International Logo" 
                    width={40} 
                    height={40}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-sky-200 group-hover:from-blue-200 group-hover:to-sky-100 transition-all duration-300">
                  AZ INTERNATIONAL
                </h3>
                <span className="text-[10px] text-blue-300/80 uppercase tracking-wider">Engineering & Technical Consulting</span>
              </div>
            </div>            <p className="text-gray-300/90 mb-3 text-xs leading-relaxed max-w-md">
              Third party inspection and capacity building body since 2012, specializing in NDT, quality control inspection,
              and capacity building courses. We provide high-quality services to develop human resources in steel fabrication,
              oil and gas, chemical, fertilizers, cement and electrical power plants sectors.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:items-end">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-blue-200 mb-3 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500/80 to-transparent rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start group">
                <div className="bg-blue-800/30 p-1.5 rounded-full mr-2.5 group-hover:bg-blue-700/50 transition-all duration-300">
                  <MapPin className="h-3 w-3 text-blue-300 flex-shrink-0" />
                </div>
                <span className="text-gray-300/90 text-xs group-hover:text-blue-200 transition-colors duration-300">33 Gamal El-Deen Kassem St., Nasr City, Cairo, Egypt</span>
              </li>
              <li className="flex items-center group">
                <div className="bg-blue-800/30 p-1.5 rounded-full mr-2.5 group-hover:bg-blue-700/50 transition-all duration-300">
                  <Phone className="h-3 w-3 text-blue-300 flex-shrink-0" />
                </div>
                <a href="tel:+20222879691" className="text-gray-300/90 text-xs group-hover:text-blue-200 transition-colors duration-300">(02) 22-8-79-691</a>
              </li>
              <li className="flex items-center group">
                <div className="bg-blue-800/30 p-1.5 rounded-full mr-2.5 group-hover:bg-blue-700/50 transition-all duration-300">
                  <Mail className="h-3 w-3 text-blue-300 flex-shrink-0" />
                </div>
                <a href="mailto:az.qualitycontrol@gmail.com" className="text-gray-300/90 text-xs group-hover:text-blue-200 transition-colors duration-300">az.qualitycontrol@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-blue-800/30 py-3 text-center text-blue-200/70 text-[11px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent animate-shimmer pointer-events-none"></div>
          <p>© {new Date().getFullYear()} AZ INTERNATIONAL. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

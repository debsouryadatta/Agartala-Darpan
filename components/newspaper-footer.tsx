import Link from "next/link";
import Image from "next/image";

export default function NewspaperFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-white border-t border-taupe">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center mb-3">
            <Image
              src="/logo.jpg"
              alt="Agartala Darpan Logo"
              width={60}
              height={60}
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* Main Footer Text */}
          <p className="font-inter text-sm text-charcoal/70">
            © {currentYear} Agartala Darpan (আগরতলা দৰ্পণ) | Published from Kunjaban Colony, P.O-Abhoynagar, Agartala, West Tripura. PIN-799005 | Email: agtdarpan16@gmail.com | M: 9774842294
          </p>

          {/* Links */}
          {/* <div className="flex items-center justify-center gap-4">
            <Link
              href="#"
              className="font-inter text-xs text-charcoal/60 hover:text-burgundy transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="text-charcoal/40">•</span>
            <Link
              href="#"
              className="font-inter text-xs text-charcoal/60 hover:text-burgundy transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div> */}

          {/* Bengali Tagline */}
          {/* <p className="bengali-text text-xs text-charcoal/50 pt-2">
            জনতার কণ্ঠস্বর, জনতার ভাষা
          </p> */}
        </div>
      </div>
    </footer>
  );
}
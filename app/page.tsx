import { ShoppingBag, MapPin, Clock, Phone, User, Store } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-sans flex flex-col justify-between selection:bg-[#B8860B] selection:text-white">
      {/* Header */}
      <header className="border-b border-black/10 py-6 px-6 sm:px-12 flex justify-center items-center bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xs p-1 border border-[#D4AF37]/30">
            <img src="/logo.png" alt="Sweety Beauty Studio & Spa Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-sm font-black text-[#B8860B] tracking-wider uppercase block">
              Sweety Beauty Studio & Spa
            </span>
            <span className="text-[9px] text-[#A67C1E] font-bold tracking-widest block uppercase -mt-0.5">
              Peroorkada, Trivandrum
            </span>
          </div>
        </div>
      </header>

      {/* Main Info */}
      <main className="flex-1 max-w-xl mx-auto w-full px-6 flex flex-col justify-center items-center py-16">
        <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-8 sm:p-12 shadow-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37]" />
          
          <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#B8860B] text-[10px] font-bold rounded-full tracking-wider uppercase mb-6">
            Store Directory & Contacts
          </span>
          
          <h1 className="text-3xl font-black text-[#B8860B] leading-tight tracking-tight mb-2">
            Sweety Beauty Studio & Spa
          </h1>
          <p className="text-xs text-[#A67C1E] font-black tracking-widest uppercase mb-8">
            Beauty Studio & Spa Services
          </p>

          <div className="space-y-6 text-left max-w-md mx-auto text-sm font-semibold text-[#1A1A1A]/80 border-t border-black/10 pt-8">
            <div className="flex items-start gap-4">
              <User className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-0.5">Owner</p>
                <p className="text-[#1A1A1A] font-bold">
                  Sunitha Mercy
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Store className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-0.5">Location</p>
                <p className="text-[#1A1A1A] font-bold">
                  Peroorkada Junction, Trivandrum City, Kerala
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-0.5">Address</p>
                <p className="text-[#1A1A1A] leading-relaxed">
                  156 Neethi Nagar, Peroorkada, Trivandrum, Kerala
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-0.5">Phone Numbers</p>
                <p className="text-[#1A1A1A]">
                  +91 93601 78097 / +91 93608 03056
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-black/50 uppercase tracking-wider mb-0.5">Business Hours</p>
                <p className="text-[#1A1A1A]">
                  Open Daily: 9:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-6 text-center bg-white">
        <p className="text-[10px] font-bold text-[#B8860B] tracking-widest uppercase">
          Sweety Beauty Studio & Spa • Peroorkada, Trivandrum
        </p>
        <p className="text-[9px] font-semibold text-black/40 uppercase tracking-wider mt-1">
          © {new Date().getFullYear()} All Rights Reserved • Powered by Cenexa Systems
        </p>
      </footer>
    </div>
  );
}

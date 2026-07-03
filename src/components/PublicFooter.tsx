import React from "react";
import { Mail, Box, MapPin, Phone, Smartphone, Instagram, MessageCircle, Twitter, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PublicFooter() {
  const navigate = useNavigate();
  return (
    <div className="w-full relative z-10 mt-24">
      
      {/* Newsletter */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between relative z-20 translate-y-12">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-display text-slate-900 flex items-center justify-center md:justify-start gap-2">
              Subscribe to Our Newsletter 
              <span className="text-xl">📦</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">Receive expert insights, course updates, and learning resources directly in your inbox and get notified</p>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0 w-full md:w-auto">
            <div className="relative w-full md:w-[320px]">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                placeholder="Enter your email address here" 
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0B0F59] transition-colors" 
              />
            </div>
            <button className="px-8 py-2 bg-[#0B0F59] hover:bg-indigo-900 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#0B0F59] text-white pt-24 pb-8 relative z-0">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1 */}
          <div className="md:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-400/30 text-indigo-100 text-[10px] font-semibold tracking-wide">
              <span>🔥</span> Let's get started now!
            </div>
            <h2 className="text-4xl font-display font-bold leading-[1.1] tracking-tight">
              Take the First Step<br/>Towards Mastery!
            </h2>
            <button 
              onClick={() => navigate("/student/register")}
              className="px-5 py-2.5 bg-[#151978] border border-indigo-800 hover:bg-indigo-800 rounded-xl flex items-center gap-2 text-xs font-semibold mt-4 transition-colors cursor-pointer shadow-sm"
            >
              <Box className="w-4 h-4 text-indigo-200" /> 
              <span>Enroll on Courses</span>
            </button>
          </div>
          
          {/* Col 2 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-sm tracking-wide">Additional Links</h4>
            <div className="flex flex-col gap-2.5 text-[11px] text-indigo-200 font-medium">
              <a href="#" className="hover:text-white transition-colors">Login</a>
              <a href="#" className="hover:text-white transition-colors">Register</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Certificate Validation</a>
              <a href="#" className="hover:text-white transition-colors">Become Instructor</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Terms and Policies</a>
            </div>
          </div>
          
          {/* Col 3 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-sm tracking-wide">Popular Categories</h4>
            <div className="flex flex-col gap-2.5 text-[11px] text-indigo-200 font-medium">
              <a href="#" className="hover:text-white transition-colors">Development</a>
              <a href="#" className="hover:text-white transition-colors">Business</a>
              <a href="#" className="hover:text-white transition-colors">Marketing</a>
              <a href="#" className="hover:text-white transition-colors">Lifestyle</a>
              <a href="#" className="hover:text-white transition-colors">Health</a>
              <a href="#" className="hover:text-white transition-colors">Academics</a>
              <a href="#" className="hover:text-white transition-colors">Academics</a>
              <a href="#" className="hover:text-white transition-colors">Design</a>
            </div>
          </div>
          
          {/* Col 4 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-sm tracking-wide">Contact US</h4>
            <div className="flex flex-col gap-4 text-[11px] text-indigo-200 font-medium leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" />
                <span>1234 Sunset Blvd, Suite 567 Los Angeles,<br/>CA 90026 United States</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>+233 26 107 2492</span>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>+233 50 702 3211</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>info@corelify.io</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="max-w-[1400px] mx-auto px-6 mt-16 pt-6 border-t border-indigo-900/50 flex flex-col md:flex-row justify-between items-center text-[10px] text-indigo-400 font-medium">
          <p>© 2026 CORELIFY EDU SYSTEMS. All Rights Reserved. Empowering Learning Worldwide.</p>
          <div className="flex items-center gap-5 mt-4 md:mt-0">
            <Instagram className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <MessageCircle className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <Twitter className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <Facebook className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.message.length > 500) {
      toast.error('⚠️ Message must be 500 characters or less.', {
        style: { border: '1px solid #facc15', background: '#1a1a1a', color: '#facc15' },
        icon: '⚠️',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // ✅ Localhost & Vercel ke liye URL auto switch
      const apiUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://alpha-digitalcom.vercel.app/api/contact'
          : '/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('✅ Message sent successfully! 🎉', {
          style: { border: '1px solid #4ade80', background: '#1a1a1a', color: '#4ade80' },
          icon: '🚀',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('❌ Failed to send message. Please try again.', {
          style: { border: '1px solid #ef4444', background: '#1a1a1a', color: '#ef4444' },
          icon: '❌',
        });
      }
    } catch (error) {
      console.error('❌ Form submit error:', error);
      toast.error('⚠️ Server error. Try again later.', {
        style: { border: '1px solid #facc15', background: '#1a1a1a', color: '#facc15' },
        icon: '⚠️',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-gradient-to-br from-purple-900 via-black to-pink-900"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* ✅ Left Side - Robot */}
        <div className="relative flex justify-center">
          <iframe
            src="https://my.spline.design/genkubgreetingrobot-xFkiPyPgBmLyDrLtIESFj5Zt/"
            frameBorder="0"
            width="100%"
            height="500px"
            className="rounded-xl transition-transform duration-500 hover:rotate-6"
          ></iframe>
        </div>

        {/* ✅ Right Side - Contact Form */}
        <div>
          <div
            className={`text-center lg:text-left mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              LET'S
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent ml-4">
                TALK
              </span>
            </h2>
          </div>

          {/* ✅ Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={6}
                maxLength={500}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition resize-none"
              />
              <div className="text-right mt-2">
                <span className="text-white/40 text-sm">{formData.message.length}/500</span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative bg-white text-black px-12 py-4 rounded-full text-lg font-bold tracking-wide transition hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

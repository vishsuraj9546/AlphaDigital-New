'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function CareersPage() {
  // 🟢 Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    skill: '',
    message: '',
    resume: ''
  });

  // 🟢 Loading state
  const [loading, setLoading] = useState(false);

  // 📌 Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📌 Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Send data to API Route
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success('✅ Application sent successfully! We’ll get back to you.');
        setForm({ name: '', email: '', skill: '', message: '', resume: '' }); // reset form
      } else {
        toast.error('❌ Something went wrong while sending the application.');
      }
    } catch (error) {
      console.error('Form submit error:', error);
      toast.error('⚠️ Network Error! Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-6 sm:p-8">
      {/* ✅ Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#111', // Dark background
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '10px',
            border: '1px solid #7C3AED', // Purple border
            boxShadow: '0 0 15px rgba(124, 58, 237, 0.4)', // Purple glow
            padding: '12px 16px',
            fontSize: '15px',
          },
          success: {
            iconTheme: {
              primary: '#7C3AED',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* ✅ Main Card */}
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-6 sm:p-8 border border-purple-500/30">
        
        {/* 🟣 Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">
          🚀 Join <span className="text-purple-400">AlphaDigital</span>
        </h1>

        <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          Fill the form below to apply for collaboration or job opportunities.
        </p>

        {/* 🟣 Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* 🔹 Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-purple-400 outline-none text-sm sm:text-base"
            required
          />

          {/* 🔹 Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-purple-400 outline-none text-sm sm:text-base"
            required
          />

          {/* 🔹 Skillset Dropdown */}
          <select
            name="skill"
            value={form.skill}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-purple-400 outline-none text-sm sm:text-base"
            required
          >
            <option value="">Select Your Expertise</option>
            <option value="Full-Stack Development">Full-Stack Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="3D Animation">3D Animation</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Other">Other</option>
          </select>

          {/* 🔹 Resume Link */}
          <input
            type="text"
            name="resume"
            value={form.resume}
            onChange={handleChange}
            placeholder="Resume Link (Google Drive, Dropbox, etc.)"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-purple-400 outline-none text-sm sm:text-base"
            required
          />

          {/* 🔹 Message */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Why do you want to join AlphaDigital?"
            className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-purple-400 outline-none resize-none text-sm sm:text-base"
            rows={4}
            required
          ></textarea>

          {/* 🔹 Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-lg font-bold hover:opacity-90 transition"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
}

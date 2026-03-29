import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubmissionForm from "@/components/SubmissionForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Full-width immersive background */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/2021-Toyota-Hilux-Legend-RS-Header-4.webp"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          {/* Bottom fade to white for blending */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Bold branding text on the right - Weelee style with color blocks */}
        <div className="absolute right-0 left-[55%] top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 select-none pointer-events-none">
          <div className="bg-blue-600 px-7 py-2.5 rounded-xl -rotate-6 shadow-2xl shadow-blue-600/40">
            <span className="text-7xl xl:text-8xl font-black text-white tracking-tight">We</span>
          </div>
          <div className="bg-blue-600 px-7 py-2.5 rounded-xl rotate-3 shadow-2xl shadow-blue-600/40">
            <span className="text-7xl xl:text-8xl font-black text-white tracking-tight">Buy</span>
          </div>
          <div className="bg-cyan-400 px-7 py-2.5 rounded-xl -rotate-3 shadow-2xl shadow-cyan-400/40">
            <span className="text-7xl xl:text-8xl font-black text-white tracking-tight">Cars.</span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-2xl">
            {/* Floating white card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/20 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-blue-600 text-xs font-semibold tracking-wide uppercase">
                  Now buying across Namibia
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
                Sell your car.
                <br />
                <span className="gradient-text">Get paid today.</span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-gray-500 leading-relaxed max-w-md">
                Submit your vehicle — used, rebuilt, or accident damaged — get a fair offer within 24 hours, and
                receive cash the same day you accept.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#submit-form"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-blue-600/25 text-center transition-colors flex items-center justify-center gap-2"
                >
                  Sell Your Car Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <Link
                  href="/track"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-sm transition-colors text-center"
                >
                  Track Submission
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Same-day payment</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free inspection</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>We buy damaged cars too</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Form Section */}
      <section id="submit-form" className="relative pb-0 pt-20 md:pt-28">
        {/* Background blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-950" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-36">
          {/* Section header */}
          <div className="text-center mb-10">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-3">
              Start Selling
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Submit your vehicle
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto leading-relaxed">
              Fill in your car details below and we&apos;ll get back to you with
              a fair offer within 24 hours.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xl shadow-black/5">
            <SubmissionForm />
          </div>

          {/* Trust bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-gray-400">
            <span>Your data is secure</span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span>Response within 24hrs</span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span>No obligation</span>
          </div>
        </div>
      </section>

      {/* How It Works - Dark Section */}
      <section className="relative py-24 md:py-32 bg-gray-950 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4">
                Simple Process
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Quick, safe and easy.
                <br />
                <span className="text-gray-400 italic">
                  How to sell your car &amp; get the best deal.
                </span>
              </h2>
              <p className="mt-5 text-gray-500 text-lg max-w-xl">
                No dealership visits, no tyre kickers, no waiting weeks for a buyer.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="#submit-form"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-sm shadow-lg shadow-blue-600/25 transition-colors"
              >
                Sell Your Car Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Step Cards */}
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {/* Step 1 - Submit */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&q=80"
                alt="Person using phone to submit car details"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              {/* Step number badge */}
              <div className="absolute top-5 left-5 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                <span className="text-white font-black text-sm">01</span>
              </div>
              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Submit Your Car
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Fill in your car details, upload photos, and set your asking
                  price. Takes under 5 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 - Inspect */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80"
                alt="Mechanic inspecting a car"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute top-5 left-5 w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-black text-sm">02</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  We Inspect &amp; Diagnose
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our certified team does a full inspection, diagnostic scan, and
                  test drive at your convenience.
                </p>
              </div>
            </div>

            {/* Step 3 - Get Paid */}
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
                alt="Cash payment for car"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="absolute top-5 left-5 w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-white font-black text-sm">03</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Get Paid Instantly
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Accept our offer and get cash in hand the same day. We handle all
                  NaTIS paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
        {/* Background accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="group rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/2015-Audi-A4-front_9719_032_2400x1800_0C0C.png"
                      alt="Audi A4"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="group rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/VW-PoloVivo-12.jpg"
                      alt="VW Polo Vivo"
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="group rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/2015-Volkswagen-Touareg-front_10268_032_2400x1800_0Q0Q.png"
                      alt="Volkswagen Touareg"
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="group rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/496390165_1249212973875312_3503794304214430696_n.jpg"
                      alt="Car for sale"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              {/* Floating stat badges */}
              <div className="absolute -bottom-5 -right-2 md:-right-5 bg-white rounded-2xl px-5 py-4 shadow-xl ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none">
                      <path d="M5 17h14M3 13l2-8h14l2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="7.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="16.5" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 13V9h2l2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 text-base font-bold">20+</p>
                    <p className="text-gray-400 text-xs">Cars bought</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -left-2 md:-left-5 bg-white rounded-2xl px-5 py-4 shadow-xl ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 9v4.5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 3h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M12 3v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M18.5 7.5l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="12" cy="13" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 text-base font-bold">24hrs</p>
                    <p className="text-gray-400 text-xs">Offer turnaround</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Features */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
                  Why NamBuyer?
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                The smartest way to
                <br />
                <span className="gradient-text">sell your vehicle</span>
              </h2>
              <p className="mt-4 text-gray-500 text-lg leading-relaxed">
                We&apos;ve streamlined the car selling process so you get the
                best value with zero hassle.
              </p>

              <div className="mt-10 space-y-4">
                {/* Instant Payment - banknotes icon */}
                <div className="group flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200/80 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 9v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M18 15v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-0.5">Instant Payment</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      No waiting for bank transfers. Accept our offer and walk away with cash the same day.
                    </p>
                  </div>
                </div>

                {/* Fair & Transparent - balance/scale icon */}
                <div className="group flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 7l4 8h0a4 4 0 008 0h0l4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 7h6M15 7h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 15a2 2 0 01-4 0" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M21 15a2 2 0 01-4 0" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-0.5">Fair &amp; Transparent</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Every car is assessed thoroughly. Our offers are based on real market data and vehicle condition.
                    </p>
                  </div>
                </div>

                {/* Zero Paperwork - hand with thumbs up/done */}
                <div className="group flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200/80 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3.332.88-4.5 2.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M4 7h5v12H4a1 1 0 01-1-1V8a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9 7l2-3.5a1 1 0 011.8.3L13 7h4a2 2 0 012 2v6a2 2 0 01-2 2H9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <line x1="6.5" y1="17" x2="6.5" y2="17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-0.5">Zero Paperwork</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      We handle all NaTIS transfers, deregistration, and documentation. You just sign and go.
                    </p>
                  </div>
                </div>

                {/* Nationwide Coverage - Namibia map outline with pin */}
                <div className="group flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200/80 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 text-orange-600" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6l3-3h12l3 3v12l-3 3H6l-3-3V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 12c0 2 3 4.5 3 4.5H9s3-2.5 3-4.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      <circle cx="7" cy="7" r="1" fill="currentColor" />
                      <circle cx="17" cy="17" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold mb-0.5">Nationwide Coverage</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      From Windhoek to Walvis Bay, Oshakati to Keetmanshoop — we buy cars across all of Namibia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-6">
            <span className="text-blue-600 text-xs font-medium tracking-wide uppercase">
              Ready to sell?
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            Get your offer in
            <br />
            <span className="gradient-text">under 24 hours</span>
          </h2>
          <p className="mt-6 text-gray-500 text-lg max-w-xl mx-auto">
            Join hundreds of Namibians who chose the fast, fair, and hassle-free
            way to sell their vehicles.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#submit-form"
              className="btn-glow bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-blue-600/25"
            >
              Submit Your Car Now
            </a>
          </div>

          <p className="mt-6 text-gray-400 text-sm">
            Free to submit. No obligations. Get your offer today.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

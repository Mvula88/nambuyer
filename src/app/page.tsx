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
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="flex items-center justify-between gap-12">
            {/* Left content */}
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Sell your car.
                <br />
                <span className="text-blue-400">Get paid today.</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-gray-300 leading-relaxed max-w-md">
                Submit your vehicle — used, rebuilt, or accident damaged — get a fair offer within 24 hours, and
                receive cash the same day you accept.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#submit-form"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-semibold text-sm text-center transition-colors"
                >
                  Sell Your Car Now
                </a>
                <Link
                  href="/track"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-semibold text-sm transition-colors text-center border border-white/20"
                >
                  Track Submission
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="text-sm text-gray-400">Same-day payment</span>
                <span className="text-gray-600">·</span>
                <span className="text-sm text-gray-400">Free inspection</span>
                <span className="text-gray-600">·</span>
                <span className="text-sm text-gray-400">No hidden fees</span>
                <span className="text-gray-600">·</span>
                <span className="text-sm text-gray-400">We buy damaged cars too</span>
              </div>
            </div>

            {/* Right - We Buy Cars blocks */}
            <div className="hidden lg:flex flex-col items-center gap-3 select-none pointer-events-none shrink-0">
              <div className="bg-blue-600 px-8 py-3 rounded-2xl -rotate-3">
                <span className="text-7xl xl:text-8xl font-black text-white italic">We Buy</span>
              </div>
              <div className="bg-cyan-400 px-8 py-3 rounded-2xl rotate-2">
                <span className="text-7xl xl:text-8xl font-black text-white italic">Cars.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Form Section */}
      <section id="submit-form" className="py-20 md:py-28 bg-gray-50 border-t border-gray-200">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Submit your vehicle
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Fill in your car details and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <SubmissionForm />

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-gray-400">
            <span>Your data is secure</span>
            <span>·</span>
            <span>Response within 24hrs</span>
            <span>·</span>
            <span>No obligation</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              How it works
            </h2>
            <p className="mt-3 text-gray-400 text-lg">
              Three steps. No dealership visits, no tyre kickers, no waiting weeks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-gray-800 rounded-xl overflow-hidden">
            {/* Step 1 */}
            <div className="bg-gray-950 p-8 md:p-10">
              <span className="text-5xl font-black text-blue-500">1</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">
                Submit your car
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fill in your car details, upload a few photos, and set your asking price. Takes under 5 minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-950 p-8 md:p-10">
              <span className="text-5xl font-black text-blue-500">2</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">
                We inspect &amp; value
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our team does a full inspection, diagnostic scan, and test drive at a time that works for you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-950 p-8 md:p-10">
              <span className="text-5xl font-black text-blue-500">3</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">
                Get paid same day
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Accept our offer and get cash in hand the same day. We handle all the NaTIS paperwork.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#submit-form"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-semibold text-sm transition-colors"
            >
              Sell Your Car Now
            </a>
          </div>
        </div>
      </section>

      {/* Why NamBuyer */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Image grid */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/2015-Audi-A4-front_9719_032_2400x1800_0C0C.png"
                      alt="Audi A4"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/VW-PoloVivo-12.jpg"
                      alt="VW Polo Vivo"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/2015-Volkswagen-Touareg-front_10268_032_2400x1800_0Q0Q.png"
                      alt="Volkswagen Touareg"
                      className="w-full h-36 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="https://xkalnrbgueowflmebmch.supabase.co/storage/v1/object/public/car-photos/039c27ca-7fe7-46f0-9798-bbeb3fe18004/496390165_1249212973875312_3503794304214430696_n.jpg"
                      alt="Car for sale"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Features */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Why NamBuyer?
              </h2>
              <p className="mt-3 text-gray-500 text-lg">
                We&apos;ve streamlined car selling so you get the best value with zero hassle.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-gray-900 font-bold">Instant Payment</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    No waiting for bank transfers. Accept our offer and walk away with cash the same day.
                  </p>
                </div>

                <div className="border-t border-gray-200" />

                <div>
                  <h3 className="text-gray-900 font-bold">Fair &amp; Transparent</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Every car is assessed thoroughly. Our offers are based on real market data and vehicle condition.
                  </p>
                </div>

                <div className="border-t border-gray-200" />

                <div>
                  <h3 className="text-gray-900 font-bold">Zero Paperwork</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    We handle all NaTIS transfers, deregistration, and documentation. You just sign and go.
                  </p>
                </div>

                <div className="border-t border-gray-200" />

                <div>
                  <h3 className="text-gray-900 font-bold">Nationwide Coverage</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    From Windhoek to Walvis Bay, Oshakati to Keetmanshoop — we buy cars across all of Namibia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Get your offer in under 24 hours
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Join hundreds of Namibians who chose the fast, fair, and hassle-free
            way to sell their vehicles.
          </p>

          <div className="mt-8">
            <a
              href="#submit-form"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-sm transition-colors"
            >
              Submit Your Car Now
            </a>
          </div>

          <p className="mt-4 text-gray-400 text-sm">
            Free to submit. No obligations.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

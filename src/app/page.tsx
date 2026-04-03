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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight whitespace-nowrap">
                We buy cars for cash.
                <br />
                <span className="text-blue-400">Even damaged ones.</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-gray-300 leading-relaxed max-w-md">
                Need money fast? Car been in an accident? We&apos;ll make you an offer and pay you today.
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
                <span className="text-sm text-gray-400">Cash same day</span>
                <span className="text-gray-600">·</span>
                <span className="text-sm text-gray-400">Fast offer</span>
                <span className="text-gray-600">·</span>
                <span className="text-sm text-gray-400">We also buy damaged cars</span>
                <span className="text-gray-600">·</span>
                <span className="text-sm text-gray-400">Free to submit</span>
              </div>
            </div>

            {/* Right - We Buy Cars blocks */}
            <div className="hidden lg:flex flex-col items-start gap-4 select-none pointer-events-none shrink-0">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-7 py-3 rounded-lg">
                <span className="text-5xl xl:text-6xl font-black text-white">Urgent Sale?</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-7 py-3 rounded-lg ml-6">
                <span className="text-5xl xl:text-6xl font-black text-white">Damaged Car?</span>
              </div>
              <div className="bg-blue-600 px-7 py-3 rounded-lg">
                <span className="text-5xl xl:text-6xl font-black text-white">We Buy It.</span>
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
              Tell us about your car
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Fill in the details below. We&apos;ll get back to you within 24 hours.
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
              How to sell your car
            </h2>
            <p className="mt-3 text-gray-400 text-lg">
              Whether your car was in an accident or you just need cash fast — here&apos;s how it works.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-gray-800 rounded-xl overflow-hidden">
            {/* Step 1 */}
            <div className="bg-gray-950 p-8 md:p-10">
              <span className="text-5xl font-black text-blue-500">1</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">
                Send us your car details
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tell us the make, model, and condition. Upload a few photos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-950 p-8 md:p-10">
              <span className="text-5xl font-black text-blue-500">2</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">
                We come and check it
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our team inspects the car at your location. No cost to you.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-950 p-8 md:p-10">
              <span className="text-5xl font-black text-blue-500">3</span>
              <h3 className="text-lg font-bold text-white mt-4 mb-2">
                Get your cash
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Accept the offer, we pay you same day.
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
                Why sell to us?
              </h2>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-gray-900 font-bold">Cash same day</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Receive cash the same day you accept.
                  </p>
                </div>

                <div className="border-t border-gray-200" />

                <div>
                  <h3 className="text-gray-900 font-bold">We buy damaged cars</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Accident, not running — we still buy it.
                  </p>
                </div>

                <div className="border-t border-gray-200" />

                <div>
                  <h3 className="text-gray-900 font-bold">No paperwork stress</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    We handle NaTIS and everything else.
                  </p>
                </div>

                <div className="border-t border-gray-200" />

                <div>
                  <h3 className="text-gray-900 font-bold">We come to you</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Windhoek, Walvis Bay, Oshakati, anywhere.
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
            Ready to sell?
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Submit your car details and get an offer within 24 hours.
          </p>

          <div className="mt-8">
            <a
              href="#submit-form"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-sm transition-colors"
            >
              Sell Your Car Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

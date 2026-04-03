import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubmissionForm from "@/components/SubmissionForm";

export const metadata = {
  title: "Sell Your Car - NamBuyer",
  description:
    "Need money fast? Submit your car details and get a cash offer from NamBuyer within 24 hours.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
              Start Selling
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Submit your vehicle
            </h1>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Fill in your car details below and we&apos;ll get back to you with
              a fair offer within 24 hours.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-xl shadow-gray-200/50">
              <SubmissionForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

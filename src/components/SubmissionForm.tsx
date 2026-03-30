"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { generateReferenceNumber } from "@/lib/utils";
import PhotoUploader from "./PhotoUploader";

const namibianTowns = [
  "Windhoek",
  "Walvis Bay",
  "Swakopmund",
  "Oshakati",
  "Rundu",
  "Katima Mulilo",
  "Otjiwarongo",
  "Gobabis",
  "Keetmanshoop",
  "Mariental",
  "Tsumeb",
  "Ondangwa",
  "Okahandja",
  "Grootfontein",
  "Rehoboth",
  "Outjo",
  "Lüderitz",
  "Henties Bay",
  "Ongwediva",
  "Other",
];

const carMakes = [
  "Toyota",
  "Volkswagen",
  "Nissan",
  "Ford",
  "Hyundai",
  "Kia",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Honda",
  "Mazda",
  "Mitsubishi",
  "Isuzu",
  "Chevrolet",
  "Suzuki",
  "Renault",
  "Jeep",
  "Land Rover",
  "Subaru",
  "Opel",
  "Other",
];

interface FormData {
  make: string;
  model: string;
  year: string;
  mileage: string;
  color: string;
  transmission: string;
  fuel_type: string;
  condition: string;
  vehicle_status: string;
  accident_history: string;
  known_issues: string;
  service_history: string;
  ownership_duration: string;
  is_financed: string;
  settlement_amount: string;
  damage_type: string;
  is_drivable: string;
  has_insurance: string;
  damage_description: string;
  scrap_interest: string;
  description: string;
  asking_price: string;
  seller_name: string;
  seller_phone: string;
  seller_email: string;
  seller_location: string;
}

const initialFormData: FormData = {
  make: "",
  model: "",
  year: "",
  mileage: "",
  color: "",
  transmission: "",
  fuel_type: "",
  condition: "",
  vehicle_status: "",
  accident_history: "",
  known_issues: "",
  service_history: "",
  ownership_duration: "",
  is_financed: "",
  settlement_amount: "",
  damage_type: "",
  is_drivable: "",
  has_insurance: "",
  damage_description: "",
  scrap_interest: "",
  description: "",
  asking_price: "",
  seller_name: "",
  seller_phone: "",
  seller_email: "",
  seller_location: "",
};

const inputClass =
  "w-full bg-white border border-gray-300 rounded px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm";
const selectClass =
  "w-full bg-white border border-gray-300 rounded px-3 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm appearance-none cursor-pointer";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

const stepTitles = [
  "Vehicle info",
  "Specs & condition",
  "History & ownership",
  "Photos",
  "Price & contact",
];

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

const TOTAL_STEPS = 5;

export default function SubmissionForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step 1: Make, Model, Year
  const validateStep1 = () => formData.make && formData.model && formData.year;

  // Step 2: Mileage, Color, Transmission, Fuel, Condition
  const validateStep2 = () =>
    formData.mileage && formData.color && formData.transmission && formData.fuel_type && formData.condition;

  // Step 3: Vehicle history
  const validateStep3 = () => {
    const base =
      formData.vehicle_status &&
      formData.ownership_duration &&
      formData.is_financed;
    if (!base) return false;
    if (formData.vehicle_status === "accident_damaged") {
      return formData.damage_type && formData.is_drivable && formData.has_insurance;
    }
    return formData.accident_history && formData.service_history;
  };

  // Step 4: Photos
  const validateStep4 = () => photos.length >= 3;

  // Step 5: Price + Contact
  const validateStep5 = () =>
    formData.asking_price &&
    Number(formData.asking_price) > 0 &&
    formData.seller_name &&
    formData.seller_phone &&
    formData.seller_location;

  const handleSubmit = async () => {
    if (!validateStep5()) return;

    setSubmitting(true);
    setError("");

    try {
      const supabase = createClient();
      const referenceNumber = generateReferenceNumber();

      const { data: submission, error: submitError } = await supabase
        .from("submissions")
        .insert({
          reference_number: referenceNumber,
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          mileage: parseInt(formData.mileage),
          color: formData.color,
          transmission: formData.transmission,
          fuel_type: formData.fuel_type,
          condition: formData.condition,
          vehicle_status: formData.vehicle_status,
          accident_history: formData.accident_history,
          known_issues: formData.known_issues || null,
          service_history: formData.vehicle_status === "accident_damaged" ? "none" : formData.service_history,
          ownership_duration: formData.ownership_duration,
          is_financed: formData.is_financed === "yes",
          settlement_amount:
            formData.is_financed === "yes" && formData.settlement_amount
              ? parseFloat(formData.settlement_amount)
              : null,
          damage_type: formData.vehicle_status === "accident_damaged" ? formData.damage_type : null,
          is_drivable: formData.vehicle_status === "accident_damaged" ? formData.is_drivable === "yes" : null,
          has_insurance: formData.vehicle_status === "accident_damaged" ? formData.has_insurance === "yes" : null,
          damage_description: formData.vehicle_status === "accident_damaged" ? formData.damage_description || null : null,
          scrap_interest: formData.vehicle_status === "accident_damaged" ? formData.scrap_interest === "yes" : false,
          description: formData.description || null,
          asking_price: parseFloat(formData.asking_price),
          seller_name: formData.seller_name,
          seller_phone: formData.seller_phone,
          seller_email: formData.seller_email || null,
          seller_location: formData.seller_location,
        })
        .select()
        .single();

      if (submitError) throw submitError;

      for (let i = 0; i < photos.length; i++) {
        const file = photos[i];
        const fileExt = file.name.split(".").pop();
        const filePath = `${submission.id}/${i}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("car-photos")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Photo upload error:", uploadError);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("car-photos").getPublicUrl(filePath);

        await supabase.from("submission_photos").insert({
          submission_id: submission.id,
          photo_url: publicUrl,
          photo_path: filePath,
        });
      }

      router.push(`/submit/success?ref=${referenceNumber}`);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const pgError = err as { message?: string; code?: string };
      if (pgError?.message?.includes("fetch") || pgError?.message?.includes("network") || !navigator.onLine) {
        setError("Unable to connect. Please check your internet connection and try again.");
      } else if (pgError?.code === "23505") {
        setError("A submission with this reference already exists. Please try again.");
      } else if (pgError?.message) {
        setError(`Submission failed: ${pgError.message}`);
      } else {
        setError("Something went wrong. Please check your connection and try again.");
      }
      setSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const canContinue = () => {
    switch (step) {
      case 1: return validateStep1();
      case 2: return validateStep2();
      case 3: return validateStep3();
      case 4: return validateStep4();
      case 5: return validateStep5();
      default: return false;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-7">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-gray-400">Step {step} of {TOTAL_STEPS}</p>
          <p className="text-sm font-semibold text-gray-900 mt-0.5">{stepTitles[step - 1]}</p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full ${
                step >= s ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded mb-5 text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Make, Model, Year */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Make</label>
            <SelectWrapper>
              <select
                value={formData.make}
                onChange={(e) => updateField("make", e.target.value)}
                className={selectClass}
              >
                <option value="">Select make</option>
                {carMakes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </SelectWrapper>
          </div>

          <div>
            <label className={labelClass}>Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => updateField("model", e.target.value)}
              placeholder="e.g. Hilux, Polo, X5"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Year</label>
            <SelectWrapper>
              <select
                value={formData.year}
                onChange={(e) => updateField("year", e.target.value)}
                className={selectClass}
              >
                <option value="">Select year</option>
                {Array.from({ length: 30 }, (_, i) => currentYear - i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </SelectWrapper>
          </div>
        </div>
      )}

      {/* Step 2: Specs — Mileage, Color, Transmission, Fuel, Condition */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Mileage (km)</label>
              <input
                type="number"
                value={formData.mileage}
                onChange={(e) => updateField("mileage", e.target.value)}
                placeholder="e.g. 85000"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Color</label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => updateField("color", e.target.value)}
                placeholder="e.g. White, Silver"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Transmission</label>
            <SelectWrapper>
              <select
                value={formData.transmission}
                onChange={(e) => updateField("transmission", e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </SelectWrapper>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Fuel Type</label>
              <SelectWrapper>
                <select
                  value={formData.fuel_type}
                  onChange={(e) => updateField("fuel_type", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                </select>
              </SelectWrapper>
            </div>

            <div>
              <label className={labelClass}>Condition</label>
              <SelectWrapper>
                <select
                  value={formData.condition}
                  onChange={(e) => updateField("condition", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </SelectWrapper>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Vehicle History */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Vehicle Status</label>
            <SelectWrapper>
              <select
                value={formData.vehicle_status}
                onChange={(e) => {
                  updateField("vehicle_status", e.target.value);
                  if (e.target.value === "accident_damaged") {
                    updateField("accident_history", "been_in_accident");
                  }
                }}
                className={selectClass}
              >
                <option value="">Select</option>
                <option value="used">Used</option>
                <option value="rebuilt">Rebuilt</option>
                <option value="accident_damaged">Accident Damaged / Write-Off</option>
              </select>
            </SelectWrapper>
          </div>

          {/* Damage-specific fields — shown when accident_damaged */}
          {formData.vehicle_status === "accident_damaged" && (
            <>
              <div className="border border-gray-200 rounded p-4 space-y-4">
                <p className="text-sm font-medium text-gray-900">Damage Details</p>

                <div>
                  <label className={labelClass}>Type of Damage</label>
                  <SelectWrapper>
                    <select
                      value={formData.damage_type}
                      onChange={(e) => updateField("damage_type", e.target.value)}
                      className={selectClass}
                    >
                      <option value="">Select</option>
                      <option value="front">Front Collision</option>
                      <option value="rear">Rear Collision</option>
                      <option value="side">Side Impact</option>
                      <option value="rollover">Rollover</option>
                      <option value="flood">Flood Damage</option>
                      <option value="fire">Fire Damage</option>
                      <option value="hail">Hail Damage</option>
                      <option value="multiple">Multiple / Extensive</option>
                    </select>
                  </SelectWrapper>
                </div>

                <div>
                  <label className={labelClass}>Is the car drivable?</label>
                  <div className="flex gap-3 mt-1">
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.is_drivable === "yes" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                      <input type="radio" name="is_drivable" value="yes" checked={formData.is_drivable === "yes"} onChange={(e) => updateField("is_drivable", e.target.value)} className="hidden" />
                      Yes
                    </label>
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.is_drivable === "no" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                      <input type="radio" name="is_drivable" value="no" checked={formData.is_drivable === "no"} onChange={(e) => updateField("is_drivable", e.target.value)} className="hidden" />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Does the car have insurance?</label>
                  <div className="flex gap-3 mt-1">
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.has_insurance === "yes" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                      <input type="radio" name="has_insurance" value="yes" checked={formData.has_insurance === "yes"} onChange={(e) => updateField("has_insurance", e.target.value)} className="hidden" />
                      Yes
                    </label>
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.has_insurance === "no" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                      <input type="radio" name="has_insurance" value="no" checked={formData.has_insurance === "no"} onChange={(e) => updateField("has_insurance", e.target.value)} className="hidden" />
                      No
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Describe the damage</label>
                  <textarea
                    value={formData.damage_description}
                    onChange={(e) => updateField("damage_description", e.target.value)}
                    rows={3}
                    placeholder="Describe the extent of the damage, what parts are affected..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Are you interested in selling for scrap/parts?</label>
                  <div className="flex gap-3 mt-1">
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.scrap_interest === "yes" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                      <input type="radio" name="scrap_interest" value="yes" checked={formData.scrap_interest === "yes"} onChange={(e) => updateField("scrap_interest", e.target.value)} className="hidden" />
                      Yes, consider parts/scrap
                    </label>
                    <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.scrap_interest === "no" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                      <input type="radio" name="scrap_interest" value="no" checked={formData.scrap_interest === "no"} onChange={(e) => updateField("scrap_interest", e.target.value)} className="hidden" />
                      No, full vehicle only
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Standard history fields — shown when NOT accident damaged */}
          {formData.vehicle_status && formData.vehicle_status !== "accident_damaged" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Accident History</label>
                <SelectWrapper>
                  <select
                    value={formData.accident_history}
                    onChange={(e) => updateField("accident_history", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select</option>
                    <option value="accident_free">Accident Free</option>
                    <option value="been_in_accident">Been in an Accident</option>
                  </select>
                </SelectWrapper>
              </div>

              <div>
                <label className={labelClass}>Service History</label>
                <SelectWrapper>
                  <select
                    value={formData.service_history}
                    onChange={(e) => updateField("service_history", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Select</option>
                    <option value="full">Full Service History</option>
                    <option value="partial">Partial Service History</option>
                    <option value="none">No Service History</option>
                  </select>
                </SelectWrapper>
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>How long have you owned it?</label>
            <SelectWrapper>
              <select
                value={formData.ownership_duration}
                onChange={(e) => updateField("ownership_duration", e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                <option value="0-6 months">0 to 6 Months</option>
                <option value="6-12 months">6 to 12 Months</option>
                <option value="1-2 years">1 to 2 Years</option>
                <option value="2-5 years">2 to 5 Years</option>
                <option value="5+ years">5+ Years</option>
              </select>
            </SelectWrapper>
          </div>

          <div>
            <label className={labelClass}>Is the car financed?</label>
            <div className="flex gap-3 mt-1">
              <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.is_financed === "yes" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                <input type="radio" name="is_financed" value="yes" checked={formData.is_financed === "yes"} onChange={(e) => updateField("is_financed", e.target.value)} className="hidden" />
                Yes
              </label>
              <label className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors text-sm font-medium ${formData.is_financed === "no" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                <input type="radio" name="is_financed" value="no" checked={formData.is_financed === "no"} onChange={(e) => updateField("is_financed", e.target.value)} className="hidden" />
                No
              </label>
            </div>
          </div>

          {formData.is_financed === "yes" && (
            <div>
              <label className={labelClass}>Settlement Amount (NAD)</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 font-medium text-sm">N$</span>
                </div>
                <input
                  type="number"
                  value={formData.settlement_amount}
                  onChange={(e) => updateField("settlement_amount", e.target.value)}
                  placeholder="Outstanding amount owed"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          )}

          {formData.vehicle_status !== "accident_damaged" && (
            <div>
              <label className={labelClass}>Known Issues <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea
                value={formData.known_issues}
                onChange={(e) => updateField("known_issues", e.target.value)}
                rows={3}
                placeholder="e.g. Engine light on, AC not working, dent on left door..."
                className={`${inputClass} resize-none`}
              />
            </div>
          )}
        </div>
      )}

      {/* Step 4: Photos + Description */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-4">Upload at least 3 clear photos of your car.</p>
            <PhotoUploader photos={photos} onPhotosChange={setPhotos} />
          </div>

          <div>
            <label className={labelClass}>Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              placeholder="Recent repairs, modifications, extras included..."
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      )}

      {/* Step 5: Price + Contact */}
      {step === 5 && (
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Asking Price (NAD)</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 font-medium text-sm">N$</span>
              </div>
              <input
                type="number"
                value={formData.asking_price}
                onChange={(e) => updateField("asking_price", e.target.value)}
                placeholder="e.g. 150000"
                className={`${inputClass} pl-10`}
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">We may make a different offer after inspection.</p>
          </div>

          <hr className="border-gray-100" />

          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              value={formData.seller_name}
              onChange={(e) => updateField("seller_name", e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                value={formData.seller_phone}
                onChange={(e) => updateField("seller_phone", e.target.value)}
                placeholder="081 234 5678"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                type="email"
                value={formData.seller_email}
                onChange={(e) => updateField("seller_email", e.target.value)}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <SelectWrapper>
              <select
                value={formData.seller_location}
                onChange={(e) => updateField("seller_location", e.target.value)}
                className={selectClass}
              >
                <option value="">Select your town/city</option>
                {namibianTowns.map((town) => (
                  <option key={town} value={town}>{town}</option>
                ))}
              </select>
            </SelectWrapper>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
        {step > 1 ? (
          <button
            onClick={goBack}
            className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            onClick={() => canContinue() && goNext()}
            disabled={!canContinue()}
            className="px-5 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canContinue() || submitting}
            className="px-5 py-2.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {submitting ? "Submitting..." : "Submit Valuation"}
          </button>
        )}
      </div>
    </div>
  );
}

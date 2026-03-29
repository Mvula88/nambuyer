export type SubmissionStatus =
  | "pending"
  | "reviewing"
  | "inspection_scheduled"
  | "offer_made"
  | "accepted"
  | "rejected"
  | "completed";

export interface Submission {
  id: string;
  reference_number: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  color: string;
  transmission: "manual" | "automatic";
  fuel_type: "petrol" | "diesel";
  condition: "excellent" | "good" | "fair" | "poor";
  vehicle_status: "used" | "rebuilt" | "accident_damaged";
  accident_history: "accident_free" | "been_in_accident";
  known_issues: string | null;
  service_history: "full" | "partial" | "none";
  damage_type: "front" | "rear" | "side" | "rollover" | "flood" | "fire" | "hail" | "multiple" | null;
  is_drivable: boolean | null;
  has_insurance: boolean | null;
  damage_description: string | null;
  scrap_interest: boolean;
  ownership_duration: string;
  is_financed: boolean;
  settlement_amount: number | null;
  description: string | null;
  asking_price: number;
  offer_amount: number | null;
  offer_notes: string | null;
  seller_name: string;
  seller_phone: string;
  seller_email: string | null;
  seller_location: string;
  status: SubmissionStatus;
  inspection_date: string | null;
  inspection_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubmissionPhoto {
  id: string;
  submission_id: string;
  photo_url: string;
  photo_path: string;
  created_at: string;
}

export interface SubmissionWithPhotos extends Submission {
  submission_photos: SubmissionPhoto[];
}

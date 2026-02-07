export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export const PIPELINE_STAGES = [
  { value: "researching", label: "Researching", color: "bg-slate-500" },
  { value: "applied", label: "Applied", color: "bg-blue-500" },
  { value: "interviewing", label: "Interviewing", color: "bg-amber-500" },
  { value: "offer_received", label: "Offer Received", color: "bg-purple-500" },
  { value: "negotiating", label: "Negotiating", color: "bg-orange-500" },
  { value: "accepted", label: "Accepted", color: "bg-green-500" },
  { value: "declined", label: "Declined", color: "bg-red-500" },
] as const;

export const PROCEDURES = [
  "Bronchoscopy",
  "Endobronchial Ultrasound (EBUS)",
  "Thoracentesis",
  "Chest Tube Placement",
  "Central Line Placement",
  "Arterial Line Placement",
  "Intubation",
  "Tracheostomy (Percutaneous)",
  "Pleuroscopy / Medical Thoracoscopy",
  "Navigational Bronchoscopy",
  "Cryotherapy",
  "Endobronchial Valve Placement",
  "Pleural Catheter Management",
  "Point-of-Care Ultrasound",
];

export const ICU_MODELS = [
  "Closed ICU",
  "Open ICU",
  "Semi-closed / Hybrid",
  "Mandatory Consult",
];

export const CALL_FREQUENCIES = [
  "1:3 (every third)",
  "1:4 (every fourth)",
  "1:5 (every fifth)",
  "1:6 (every sixth)",
  "1:7 (every seventh)",
  "No call (nocturnist model)",
  "Home call only",
  "Other",
];

export const COMP_MODELS = [
  { value: "base", label: "Base Salary" },
  { value: "rvu", label: "RVU-based" },
  { value: "mixed", label: "Base + RVU" },
];

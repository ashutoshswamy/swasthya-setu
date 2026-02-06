// Mock data for Swasthya Setu - Solapur Municipal Corporation Health Management System

export interface Hospital {
  id: string;
  name: string;
  type: "Government" | "Private";
  address: string;
  phone: string;
  totalBeds: number;
  availableBeds: number;
  icuBeds: number;
  icuAvailable: number;
  ventilators: number;
  ventilatorsAvailable: number;
  oxygenBeds: number;
  oxygenAvailable: number;
  status: "Active" | "Inactive";
}

export interface Incident {
  id: string;
  reporterName: string;
  phone: string;
  symptoms: string[];
  location: string;
  dateReported: string;
  status: "Pending" | "Investigating" | "Resolved";
  severity: "Low" | "Medium" | "High" | "Critical";
  assignedHospital?: string;
}

export interface DiseaseData {
  name: string;
  cases: number;
  trend: "up" | "down" | "stable";
  percentChange: number;
}

export interface AreaData {
  name: string;
  cases: number;
  risk: "Low" | "Medium" | "High";
}

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "Solapur Civil Hospital",
    type: "Government",
    address: "Railway Lines, Solapur",
    phone: "0217-2315000",
    totalBeds: 500,
    availableBeds: 127,
    icuBeds: 50,
    icuAvailable: 12,
    ventilators: 30,
    ventilatorsAvailable: 8,
    oxygenBeds: 100,
    oxygenAvailable: 34,
    status: "Active",
  },
  {
    id: "h2",
    name: "Ashwini Hospital",
    type: "Private",
    address: "Hotgi Road, Solapur",
    phone: "0217-2652100",
    totalBeds: 200,
    availableBeds: 45,
    icuBeds: 25,
    icuAvailable: 6,
    ventilators: 15,
    ventilatorsAvailable: 4,
    oxygenBeds: 40,
    oxygenAvailable: 12,
    status: "Active",
  },
  {
    id: "h3",
    name: "Vaishnavi Hospital",
    type: "Private",
    address: "Murarji Peth, Solapur",
    phone: "0217-2623500",
    totalBeds: 150,
    availableBeds: 32,
    icuBeds: 20,
    icuAvailable: 5,
    ventilators: 10,
    ventilatorsAvailable: 3,
    oxygenBeds: 30,
    oxygenAvailable: 8,
    status: "Active",
  },
  {
    id: "h4",
    name: "Siddheshwar Hospital",
    type: "Government",
    address: "Siddheshwar Peth, Solapur",
    phone: "0217-2621000",
    totalBeds: 300,
    availableBeds: 89,
    icuBeds: 35,
    icuAvailable: 10,
    ventilators: 20,
    ventilatorsAvailable: 6,
    oxygenBeds: 60,
    oxygenAvailable: 22,
    status: "Active",
  },
  {
    id: "h5",
    name: "Yashoda Hospital",
    type: "Private",
    address: "Akkalkot Road, Solapur",
    phone: "0217-2741500",
    totalBeds: 180,
    availableBeds: 41,
    icuBeds: 22,
    icuAvailable: 7,
    ventilators: 12,
    ventilatorsAvailable: 5,
    oxygenBeds: 35,
    oxygenAvailable: 10,
    status: "Active",
  },
];

export const incidents: Incident[] = [
  {
    id: "inc1",
    reporterName: "Rajesh Patil",
    phone: "9876543210",
    symptoms: ["Fever", "Cough", "Body Ache"],
    location: "Laxmi Peth, Solapur",
    dateReported: "2026-02-06",
    status: "Investigating",
    severity: "Medium",
    assignedHospital: "h1",
  },
  {
    id: "inc2",
    reporterName: "Sunita Jadhav",
    phone: "9876543211",
    symptoms: ["Diarrhea", "Vomiting", "Weakness"],
    location: "Hotgi Road, Solapur",
    dateReported: "2026-02-05",
    status: "Resolved",
    severity: "Low",
    assignedHospital: "h2",
  },
  {
    id: "inc3",
    reporterName: "Amit Deshmukh",
    phone: "9876543212",
    symptoms: ["High Fever", "Difficulty Breathing", "Chest Pain"],
    location: "Railway Lines, Solapur",
    dateReported: "2026-02-06",
    status: "Pending",
    severity: "Critical",
  },
  {
    id: "inc4",
    reporterName: "Priya Kulkarni",
    phone: "9876543213",
    symptoms: ["Skin Rash", "Fever", "Joint Pain"],
    location: "Akkalkot Road, Solapur",
    dateReported: "2026-02-04",
    status: "Investigating",
    severity: "High",
    assignedHospital: "h5",
  },
  {
    id: "inc5",
    reporterName: "Mahesh Shinde",
    phone: "9876543214",
    symptoms: ["Fever", "Headache"],
    location: "Murarji Peth, Solapur",
    dateReported: "2026-02-03",
    status: "Resolved",
    severity: "Low",
    assignedHospital: "h3",
  },
];

export const diseaseData: DiseaseData[] = [
  { name: "Dengue", cases: 145, trend: "up", percentChange: 12 },
  { name: "Malaria", cases: 89, trend: "down", percentChange: 8 },
  { name: "Typhoid", cases: 67, trend: "stable", percentChange: 2 },
  { name: "COVID-19", cases: 34, trend: "down", percentChange: 25 },
  { name: "Chikungunya", cases: 28, trend: "up", percentChange: 15 },
  { name: "Gastroenteritis", cases: 156, trend: "up", percentChange: 18 },
];

export const areaData: AreaData[] = [
  { name: "Laxmi Peth", cases: 45, risk: "High" },
  { name: "Hotgi Road", cases: 32, risk: "Medium" },
  { name: "Railway Lines", cases: 28, risk: "Medium" },
  { name: "Akkalkot Road", cases: 18, risk: "Low" },
  { name: "Murarji Peth", cases: 52, risk: "High" },
  { name: "Siddheshwar Peth", cases: 25, risk: "Medium" },
  { name: "Vijapur Road", cases: 12, risk: "Low" },
  { name: "Pandharpur Road", cases: 38, risk: "Medium" },
];

export const weeklyTrendData = [
  { day: "Mon", cases: 45 },
  { day: "Tue", cases: 52 },
  { day: "Wed", cases: 48 },
  { day: "Thu", cases: 61 },
  { day: "Fri", cases: 55 },
  { day: "Sat", cases: 67 },
  { day: "Sun", cases: 43 },
];

export const monthlyTrendData = [
  { month: "Sep", cases: 320 },
  { month: "Oct", cases: 410 },
  { month: "Nov", cases: 380 },
  { month: "Dec", cases: 290 },
  { month: "Jan", cases: 450 },
  { month: "Feb", cases: 520 },
];

export const symptoms = [
  "Fever",
  "Cough",
  "Cold",
  "Headache",
  "Body Ache",
  "Fatigue",
  "Difficulty Breathing",
  "Chest Pain",
  "Diarrhea",
  "Vomiting",
  "Skin Rash",
  "Joint Pain",
  "Sore Throat",
  "Loss of Taste/Smell",
  "Weakness",
];

export const solapurAreas = [
  "Laxmi Peth",
  "Hotgi Road",
  "Railway Lines",
  "Akkalkot Road",
  "Murarji Peth",
  "Siddheshwar Peth",
  "Vijapur Road",
  "Pandharpur Road",
  "Saat Rasta",
  "Bhavani Peth",
  "Budhwar Peth",
  "Mangalwar Peth",
];

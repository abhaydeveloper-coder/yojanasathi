export interface Scheme {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  benefit: string;
  eligibility: string[];
  category: "farmer" | "student" | "employment" | "general";
  tags: string[];
}

export const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    nameHi: "पीएम किसान सम्मान निधि",
    description: "Direct income support of ₹6,000/year to small and marginal farmer families.",
    benefit: "₹6,000/year",
    eligibility: ["Farmer", "Land owner", "Annual income < ₹2 lakh"],
    category: "farmer",
    tags: ["Direct Benefit", "Agriculture"],
  },
  {
    id: "2",
    name: "PM Fasal Bima Yojana",
    nameHi: "पीएम फसल बीमा योजना",
    description: "Crop insurance scheme protecting farmers against crop loss due to natural calamities.",
    benefit: "Crop Insurance Cover",
    eligibility: ["Farmer", "All crop growers"],
    category: "farmer",
    tags: ["Insurance", "Agriculture"],
  },
  {
    id: "3",
    name: "National Scholarship Portal",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    description: "Unified portal for various scholarships for students from Class 1 to PhD level.",
    benefit: "Up to ₹50,000/year",
    eligibility: ["Student", "Income < ₹2.5 lakh", "Merit-based"],
    category: "student",
    tags: ["Scholarship", "Education"],
  },
  {
    id: "4",
    name: "PM Vidya Lakshmi Yojana",
    nameHi: "पीएम विद्या लक्ष्मी योजना",
    description: "Education loan portal connecting students with banks for higher education financing.",
    benefit: "Education Loan Access",
    eligibility: ["Student", "Higher education aspirant"],
    category: "student",
    tags: ["Education Loan", "Higher Education"],
  },
  {
    id: "5",
    name: "PM Kaushal Vikas Yojana",
    nameHi: "पीएम कौशल विकास योजना",
    description: "Skill development and training program for unemployed youth with certification.",
    benefit: "Free Skill Training + Certificate",
    eligibility: ["Age 15-45", "Unemployed youth"],
    category: "employment",
    tags: ["Skill Development", "Employment"],
  },
  {
    id: "6",
    name: "Mudra Loan Yojana",
    nameHi: "मुद्रा लोन योजना",
    description: "Micro loans up to ₹10 lakh for small businesses and entrepreneurs without collateral.",
    benefit: "Loan up to ₹10 lakh",
    eligibility: ["Small business owner", "Entrepreneur", "No collateral needed"],
    category: "employment",
    tags: ["Loan", "Entrepreneurship"],
  },
  {
    id: "7",
    name: "Ayushman Bharat Yojana",
    nameHi: "आयुष्मान भारत योजना",
    description: "Health insurance cover of ₹5 lakh per family for secondary and tertiary hospitalization.",
    benefit: "₹5 lakh health cover",
    eligibility: ["BPL families", "Annual income < ₹1 lakh"],
    category: "general",
    tags: ["Health Insurance", "Medical"],
  },
  {
    id: "8",
    name: "Kisan Credit Card",
    nameHi: "किसान क्रेडिट कार्ड",
    description: "Credit facility for farmers to meet their agricultural and ancillary needs.",
    benefit: "Low-interest credit access",
    eligibility: ["Farmer", "Land owner/tenant"],
    category: "farmer",
    tags: ["Credit", "Agriculture"],
  },
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const mockChatResponses: Record<string, string> = {
  farmer: "Based on your profile, here are the top schemes for farmers:\n\n🌾 **PM Kisan Samman Nidhi** - Get ₹6,000/year directly in your bank account.\n\n🛡️ **PM Fasal Bima Yojana** - Protect your crops with affordable insurance.\n\n💳 **Kisan Credit Card** - Access low-interest credit for farming needs.\n\nWould you like details on how to apply for any of these?",
  student: "Great news for students! Here are schemes you may be eligible for:\n\n📚 **National Scholarship Portal** - Apply for scholarships up to ₹50,000/year.\n\n🎓 **PM Vidya Lakshmi Yojana** - Get education loans from multiple banks.\n\nShall I help you understand the eligibility criteria?",
  employment: "Here are the best schemes for skill development and employment:\n\n💼 **PM Kaushal Vikas Yojana** - Free skill training with government certification.\n\n🏪 **Mudra Loan Yojana** - Start your own business with loans up to ₹10 lakh.\n\nWant to know more about the application process?",
  default: "I can help you find the right government schemes! Please tell me:\n\n• Are you a **farmer**, **student**, or looking for **employment**?\n• Which **state** are you from?\n• What is your **age** and **income range**?\n\nThis will help me suggest the most relevant schemes for you. 🙏",
};

export interface Scheme {
  id: string;
  name: string;
  nameHi?: string;
  description: string;
  descriptionHi?: string;
  benefit: string;
  benefitHi?: string;
  eligibility: string[];
  eligibilityHi?: string[];
  category: "farmer" | "student" | "employment" | "general";
  tags: string[];
  image: string;
  howToApply: string[];
  howToApplyHi?: string[];
  applicationUrl: string;
}

export const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "PM Kisan Samman Nidhi",
    nameHi: "पीएम किसान सम्मान निधि",
    description: "Direct income support of ₹6,000/year to small and marginal farmer families.",
    descriptionHi: "छोटे और सीमांत किसान परिवारों को ₹6,000/वर्ष की प्रत्यक्ष आय सहायता।",
    benefit: "₹6,000/year",
    benefitHi: "₹6,000/वर्ष",
    eligibility: ["Farmer", "Land owner", "Annual income < ₹2 lakh"],
    eligibilityHi: ["किसान", "भूमि स्वामी", "वार्षिक आय < ₹2 लाख"],
    category: "farmer",
    tags: ["Direct Benefit", "Agriculture"],
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Visit the official PM-Kisan portal",
      "Click on 'New Farmer Registration'",
      "Enter Aadhaar and mobile number",
      "Fill the application form and upload documents"
    ],
    howToApplyHi: [
      "आधिकारिक पीएम-किसान पोर्टल पर जाएं",
      "'नया किसान पंजीकरण' पर क्लिक करें",
      "आधार और मोबाइल नंबर दर्ज करें",
      "आवेदन पत्र भरें और दस्तावेज अपलोड करें"
    ],
    applicationUrl: "https://pmkisan.gov.in/"
  },
  {
    id: "2",
    name: "PM Fasal Bima Yojana",
    nameHi: "पीएम फसल बीमा योजना",
    description: "Crop insurance scheme protecting farmers against crop loss due to natural calamities.",
    descriptionHi: "प्राकृतिक आपदाओं के कारण फसल के नुकसान के खिलाफ किसानों की रक्षा करने वाली फसल बीमा योजना।",
    benefit: "Crop Insurance Cover",
    benefitHi: "फसल बीमा कवर",
    eligibility: ["Farmer", "All crop growers"],
    eligibilityHi: ["किसान", "सभी फसल उत्पादक"],
    category: "farmer",
    tags: ["Insurance", "Agriculture"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Login to PMFBY portal or visit nearest bank",
      "Select 'Farmer Corner' and register",
      "Select crop and land details",
      "Pay the premium amount"
    ],
    howToApplyHi: [
      "PMFBY पोर्टल पर लॉग इन करें या नजदीकी बैंक में जाएं",
      "'किसान कॉर्नर' चुनें और पंजीकरण करें",
      "फसल और भूमि विवरण चुनें",
      "प्रीमियम राशि का भुगतान करें"
    ],
    applicationUrl: "https://pmfby.gov.in/"
  },
  {
    id: "3",
    name: "National Scholarship Portal",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
    description: "Unified portal for various scholarships for students from Class 1 to PhD level.",
    descriptionHi: "कक्षा 1 से पीएचडी स्तर तक के छात्रों के लिए विभिन्न छात्रवृत्ति के लिए एकीकृत पोर्टल।",
    benefit: "Up to ₹50,000/year",
    benefitHi: "₹50,000/वर्ष तक",
    eligibility: ["Student", "Income < ₹2.5 lakh", "Merit-based"],
    eligibilityHi: ["छात्र", "आय < ₹2.5 लाख", "योग्यता आधारित"],
    category: "student",
    tags: ["Scholarship", "Education"],
    image: "https://images.unsplash.com/photo-1523050338392-06ba54431b72?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Register on NSP portal",
      "Login with temporary ID and password",
      "Fill the application form correctly",
      "Upload required documents and submit"
    ],
    howToApplyHi: [
      "NSP पोर्टल पर पंजीकरण करें",
      "अस्थायी आईडी और पासवर्ड के साथ लॉग इन करें",
      "आवेदन पत्र सही ढंग से भरें",
      "आवश्यक दस्तावेज अपलोड करें और जमा करें"
    ],
    applicationUrl: "https://scholarships.gov.in/"
  },
  {
    id: "4",
    name: "PM Vidya Lakshmi Yojana",
    nameHi: "पीएम विद्या लक्ष्मी योजना",
    description: "Education loan portal connecting students with banks for higher education financing.",
    descriptionHi: "उच्च शिक्षा वित्तपोषण के लिए छात्रों को बैंकों से जोड़ने वाला शिक्षा ऋण पोर्टल।",
    benefit: "Education Loan Access",
    benefitHi: "शिक्षा ऋण पहुंच",
    eligibility: ["Student", "Higher education aspirant"],
    eligibilityHi: ["छात्र", "उच्च शिक्षा के इच्छुक"],
    category: "student",
    tags: ["Education Loan", "Higher Education"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Register on Vidya Lakshmi portal",
      "Fill the Common Education Loan Application Form (CELAF)",
      "Search and apply for loans from multiple banks",
      "Track application status online"
    ],
    howToApplyHi: [
      "विद्या लक्ष्मी पोर्टल पर पंजीकरण करें",
      "कॉमन एजुकेशन लोन एप्लीकेशन फॉर्म (CELAF) भरें",
      "विभिन्न बैंकों से ऋण के लिए खोजें और आवेदन करें",
      "ऑनलाइन आवेदन स्थिति को ट्रैक करें"
    ],
    applicationUrl: "https://www.vidyalakshmi.co.in/"
  },
  {
    id: "5",
    name: "PM Kaushal Vikas Yojana",
    nameHi: "पीएम कौशल विकास योजना",
    description: "Skill development and training program for unemployed youth with certification.",
    descriptionHi: "प्रमाणन के साथ बेरोजगार युवाओं के लिए कौशल विकास और प्रशिक्षण कार्यक्रम।",
    benefit: "Free Skill Training + Certificate",
    benefitHi: "मुफ्त कौशल प्रशिक्षण + प्रमाण पत्र",
    eligibility: ["Age 15-45", "Unemployed youth"],
    eligibilityHi: ["आयु 15-45", "बेरोजगार युवा"],
    category: "employment",
    tags: ["Skill Development", "Employment"],
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Find a PMKVY training center near you",
      "Register at the training center",
      "Attend the training and assessment",
      "Receive certification and reward"
    ],
    howToApplyHi: [
      "अपने पास एक पीएमकेवीवाई प्रशिक्षण केंद्र खोजें",
      "प्रशिक्षण केंद्र में पंजीकरण करें",
      "प्रशिक्षण और मूल्यांकन में भाग लें",
      "प्रमाण पत्र और पुरस्कार प्राप्त करें"
    ],
    applicationUrl: "https://www.pmkvyofficial.org/"
  },
  {
    id: "6",
    name: "Mudra Loan Yojana",
    nameHi: "मुद्रा लोन योजना",
    description: "Micro loans up to ₹10 lakh for small businesses and entrepreneurs without collateral.",
    descriptionHi: "बिना किसी गारंटी के छोटे व्यवसायों और उद्यमियों के लिए ₹10 लाख तक के सूक्ष्म ऋण।",
    benefit: "Loan up to ₹10 lakh",
    benefitHi: "₹10 लाख तक का ऋण",
    eligibility: ["Small business owner", "Entrepreneur", "No collateral needed"],
    eligibilityHi: ["छोटे व्यवसाय के मालिक", "उद्यमी", "किसी गारंटी की आवश्यकता नहीं"],
    category: "employment",
    tags: ["Loan", "Entrepreneurship"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Approach any commercial or rural bank",
      "Fill the MUDRA application form",
      "Submit business plan and documents",
      "Loan gets sanctioned after verification"
    ],
    howToApplyHi: [
      "किसी भी वाणिज्यिक या ग्रामीण बैंक से संपर्क करें",
      "मुद्रा आवेदन पत्र भरें",
      "व्यवसाय योजना और दस्तावेज जमा करें",
      "सत्यापन के बाद ऋण स्वीकृत हो जाता है"
    ],
    applicationUrl: "https://www.mudra.org.in/"
  },
  {
    id: "7",
    name: "Ayushman Bharat Yojana",
    nameHi: "आयुष्मान भारत योजना",
    description: "Health insurance cover of ₹5 lakh per family for secondary and tertiary hospitalization.",
    descriptionHi: "द्वितीयक और तृतीयक अस्पताल में भर्ती के लिए प्रति परिवार ₹5 लाख का स्वास्थ्य बीमा कवर।",
    benefit: "₹5 lakh health cover",
    benefitHi: "₹5 लाख स्वास्थ्य कवर",
    eligibility: ["BPL families", "Annual income < ₹1 lakh"],
    eligibilityHi: ["बीपीएल परिवार", "वार्षिक आय < ₹1 lakh"],
    category: "general",
    tags: ["Health Insurance", "Medical"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Check eligibility on AB-PMJAY portal",
      "Visit any empaneled hospital with Aadhaar",
      "Meet 'Ayushman Mitra' for verification",
      "Get treated cashless up to ₹5 lakh"
    ],
    howToApplyHi: [
      "AB-PMJAY पोर्टल पर पात्रता की जांच करें",
      "आधार के साथ किसी भी सूचीबद्ध अस्पताल में जाएं",
      "सत्यापन के लिए 'आयुष्मान मित्र' से मिलें",
      "₹5 लाख तक कैशलेस इलाज कराएं"
    ],
    applicationUrl: "https://pmjay.gov.in/"
  },
  {
    id: "8",
    name: "Kisan Credit Card",
    nameHi: "किसान क्रेडिट कार्ड",
    description: "Credit facility for farmers to meet their agricultural and ancillary needs.",
    descriptionHi: "किसानों की कृषि और सहायक जरूरतों को पूरा करने के लिए ऋण सुविधा।",
    benefit: "Low-interest credit access",
    benefitHi: "कम ब्याज वाली ऋण पहुंच",
    eligibility: ["Farmer", "Land owner/tenant"],
    eligibilityHi: ["किसान", "भूमि स्वामी/किराएदार"],
    category: "farmer",
    tags: ["Credit", "Agriculture"],
    image: "https://images.unsplash.com/photo-1495107336059-ed25870536f1?q=80&w=800&auto=format&fit=crop",
    howToApply: [
      "Visit your nearest bank branch",
      "Fill the KCC application form",
      "Submit land ownership documents",
      "Card is issued after verification"
    ],
    howToApplyHi: [
      "अपनी नजदीकी बैंक शाखा में जाएं",
      "KCC आवेदन पत्र भरें",
      "भूमि स्वामित्व दस्तावेज जमा करें",
      "सत्यापन के बाद कार्ड जारी किया जाता है"
    ],
    applicationUrl: "https://www.sbi.co.in/web/agriculture-banking/kisan-credit-card"
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

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Bot, User, Loader2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/data/translations";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const ChatAssistant = () => {
  const { language, userProfile } = useApp();
  const t = translations[language].chat;
  const isHi = language === "hi";
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastIntent, setLastIntent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 0,
        text: t.welcome,
        sender: "ai",
      },
    ]);
  }, [language, t.welcome]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const guidedSuggestions = isHi
    ? [
        { label: "🌾 किसान योजनाएं", query: "farmer" },
        { label: "🎓 छात्र छात्रवृत्ति", query: "scholarship" },
        { label: "💼 नौकरी और रोजगार", query: "job" },
        { label: "🏥 स्वास्थ्य योजनाएं", query: "health" },
      ]
    : [
        { label: "🌾 Farmer Schemes", query: "farmer" },
        { label: "🎓 Student Scholarships", query: "scholarship" },
        { label: "💼 Job & Employment", query: "job" },
        { label: "🏥 Health Schemes", query: "health" },
      ];

  const getSmartMockResponse = (query: string): string => {
    const lower = query.toLowerCase();
    const formatResponse = (en: string, hi: string) => isHi ? hi : en;

    // Detection Helpers
    const isPmKisanQuery = (text: string) => 
      text.includes("kisan") || text.includes("kissan") || text.includes("pmkisan") || text.includes("किसान");
    
    const isUjjwalaQuery = (text: string) => 
      text.includes("ujjwala") || text.includes("gas") || text.includes("cylinder") || text.includes("उज्ज्वला");

    const isScholarshipQuery = (text: string) => 
      text.includes("scholarship") || text.includes("student") || text.includes("study") || text.includes("छात्र") || text.includes("स्कॉलरशिप");

    const isJobQuery = (text: string) => 
      text.includes("job") || text.includes("employment") || text.includes("work") || text.includes("रोजगार") || text.includes("नौकरी");

    const isHealthQuery = (text: string) => 
      text.includes("health") || text.includes("medical") || text.includes("hospital") || text.includes("ayushman") || text.includes("स्वास्थ्य") || text.includes("इलाज");

    // Detect if user is asking for specific info (Follow-ups)
    const isApplyQuery = ["apply", "application", "process", "कैसे आवेदन", "आवेदन", "स्टेप्स", "steps"].some(k => lower.includes(k));
    const isEligibilityQuery = ["eligibility", "eligible", "who can", "पात्रता", "कौन पात्र"].some(k => lower.includes(k));
    const isBenefitsQuery = ["benefit", "profit", "money", "लाभ", "फायदा", "पैसे"].some(k => lower.includes(k));

    // Detailed Information Map for Follow-ups
    const infoMap: Record<string, { apply: string[], eligibility: string[], benefits: string[], name: string[] }> = {
      pm_kisan: {
        name: ["PM Kisan Samman Nidhi", "पीएम किसान सम्मान निधि"],
        apply: [
          "1. Visit **pmkisan.gov.in**\n2. Click on **'New Farmer Registration'**\n3. Enter Aadhaar & Mobile Number\n4. Fill the form and upload Land records.",
          "1. **pmkisan.gov.in** पर जाएं\n2. **'नया किसान पंजीकरण'** पर क्लिक करें\n3. आधार और मोबाइल नंबर दर्ज करें\n4. फॉर्म भरें और भूमि रिकॉर्ड अपलोड करें।"
        ],
        eligibility: ["Small and marginal farmer families with land records.", "भूमि रिकॉर्ड वाले छोटे और सीमांत किसान परिवार।"],
        benefits: ["₹6,000 per year in 3 installments of ₹2,000.", "₹2,000 की 3 किश्तों में ₹6,000 प्रति वर्ष।"]
      },
      ujjwala: {
        name: ["PM Ujjwala Yojana", "पीएम उज्ज्वला योजना"],
        apply: [
          "1. Contact nearest LPG distributor\n2. Fill the PMUY application form\n3. Submit KYC and Aadhaar\n4. Connection is issued after verification.",
          "1. निकटतम एलपीजी वितरक से संपर्क करें\n2. PMUY आवेदन पत्र भरें\n3. केवाईसी और आधार जमा करें\n4. सत्यापन के बाद कनेक्शन जारी किया जाता है।"
        ],
        eligibility: ["Adult women from BPL/SC/ST households without LPG.", "बीपीएल/एससी/एसटी परिवारों की वयस्क महिलाएं जिनके पास एलपीजी नहीं है।"],
        benefits: ["Free LPG connection + Cash assistance of ₹1,600.", "मुफ्त एलपीजी कनेक्शन + ₹1,600 की नकद सहायता।"]
      },
      scholarship: {
        name: ["National Scholarship Portal", "राष्ट्रीय छात्रवृत्ति पोर्टल"],
        apply: [
          "1. Register on **scholarships.gov.in**\n2. Login with temporary ID\n3. Fill application and upload certificates\n4. Submit and track status online.",
          "1. **scholarships.gov.in** पर पंजीकरण करें\n2. अस्थायी आईडी के साथ लॉग इन करें\n3. आवेदन भरें और प्रमाण पत्र अपलोड करें\n4. सबमिट करें और ऑनलाइन स्थिति ट्रैक करें।"
        ],
        eligibility: ["Students with annual family income below ₹2.5 Lakh.", "₹2.5 लाख से कम वार्षिक पारिवारिक आय वाले छात्र।"],
        benefits: ["Scholarships ranging from ₹1,000 to ₹50,000.", "₹1,000 से ₹50,000 तक की छात्रवृत्ति।"]
      },
      employment: {
        name: ["PM Kaushal Vikas Yojana", "पीएम कौशल विकास योजना"],
        apply: [
          "1. Visit **pmkvyofficial.org**\n2. Find a recognized training center near you\n3. Enroll in a skill course\n4. Complete training to get certificate and reward.",
          "1. **pmkvyofficial.org** पर जाएं\n2. अपने पास एक मान्यता प्राप्त प्रशिक्षण केंद्र खोजें\n3. कौशल पाठ्यक्रम में नामांकन करें\n4. प्रमाण पत्र और इनाम पाने के लिए प्रशिक्षण पूरा करें।"
        ],
        eligibility: ["Unemployed youth aged 15-45.", "15-45 वर्ष के बेरोजगार युवा।"],
        benefits: ["Free skill training and government certification.", "मुफ्त कौशल प्रशिक्षण और सरकारी प्रमाणन।"]
      },
      farmer: {
        name: ["PM Fasal Bima Yojana", "पीएम फसल बीमा योजना"],
        apply: [
          "1. Login to **pmfby.gov.in**\n2. Select your crop and land location\n3. Fill farmer details\n4. Pay small premium to get insurance cover.",
          "1. **pmfby.gov.in** पर लॉग इन करें\n2. अपनी फसल और भूमि का स्थान चुनें\n3. किसान विवरण भरें\n4. बीमा कवर पाने के लिए छोटा प्रीमियम भुगतान करें।"
        ],
        eligibility: ["All farmers growing notified crops.", "अधिसूचित फसलें उगाने वाले सभी किसान।"],
        benefits: ["Insurance against crop loss due to natural calamities.", "प्राकृतिक आपदाओं के कारण फसल नुकसान के खिलाफ बीमा।"]
      },
      health: {
        name: ["Ayushman Bharat (PM-JAY)", "आयुष्मान भारत (PM-JAY)"],
        apply: [
          "1. Check name in SECC list at **pmjay.gov.in**\n2. Visit any empaneled hospital\n3. Show Aadhaar or Ration card to 'Ayushman Mitra'\n4. Get free treatment up to ₹5 Lakh.",
          "1. **pmjay.gov.in** पर SECC सूची में नाम जांचें\n2. किसी भी सूचीबद्ध अस्पताल में जाएं\n3. 'आयुष्मान मित्र' को आधार या राशन कार्ड दिखाएं\n4. ₹5 लाख तक का मुफ्त इलाज पाएं।"
        ],
        eligibility: ["Families listed in SECC-2011 database.", "SECC-2011 डेटाबेस में सूचीबद्ध परिवार।"],
        benefits: ["Cashless treatment up to ₹5 Lakh per year.", "प्रति वर्ष ₹5 लाख तक का कैशलेस इलाज।"]
      }
    };

    // 1. Handle Follow-up Queries based on Context
    if (isApplyQuery || isEligibilityQuery || isBenefitsQuery) {
      if (!lastIntent) {
        return formatResponse(
          "I'd love to help with the steps! 🙏 Which scheme are you interested in? (e.g., PM Kisan, Ujjwala)",
          "मैं स्टेप्स बताने में आपकी मदद करना चाहूंगा! 🙏 आप किस योजना में रुचि रखते हैं? (जैसे: पीएम किसान, उज्ज्वला)"
        );
      }

      const data = infoMap[lastIntent];
      const name = formatResponse(data.name[0], data.name[1]);
      
      if (isApplyQuery) {
        return formatResponse(
          `📝 **Step-by-Step Application for ${name}:**\n\n${data.apply[0]}`,
          `📝 **${name} के लिए चरण-दर-चरण आवेदन प्रक्रिया:**\n\n${data.apply[1]}`
        );
      }
      if (isEligibilityQuery) {
        return formatResponse(
          `✅ **Eligibility for ${name}:**\n${data.eligibility[0]}`,
          `✅ **${name} के लिए पात्रता:**\n${data.eligibility[1]}`
        );
      }
      if (isBenefitsQuery) {
        return formatResponse(
          `💰 **Benefits of ${name}:**\n${data.benefits[0]}`,
          `💰 **${name} के लाभ:**\n${data.benefits[1]}`
        );
      }
    }

    // 2. Main Scheme Detection
    if (isPmKisanQuery(lower)) {
      setLastIntent("pm_kisan");
      const d = infoMap.pm_kisan;
      return formatResponse(
        `📌 **Scheme:** ${d.name[0]}\n💰 **Benefit:** ${d.benefits[0]}\n✅ **Eligibility:** ${d.eligibility[0]}\n\n📝 **How to Apply:**\n${d.apply[0]}`,
        `📌 **योजना:** ${d.name[1]}\n💰 **लाभ:** ${d.benefits[1]}\n✅ **पात्रता:** ${d.eligibility[1]}\n\n📝 **आवेदन कैसे करें:**\n${d.apply[1]}`
      );
    }

    if (isUjjwalaQuery(lower)) {
      setLastIntent("ujjwala");
      const d = infoMap.ujjwala;
      return formatResponse(
        `📌 **Scheme:** ${d.name[0]}\n💰 **Benefit:** ${d.benefits[0]}\n✅ **Eligibility:** ${d.eligibility[0]}\n\n📝 **How to Apply:**\n${d.apply[0]}`,
        `📌 **योजना:** ${d.name[1]}\n💰 **लाभ:** ${d.benefits[1]}\n✅ **पात्रता:** ${d.eligibility[1]}\n\n📝 **आवेदन कैसे करें:**\n${d.apply[1]}`
      );
    }

    // 3. Category Logic
    if (isScholarshipQuery(lower)) {
      setLastIntent("scholarship");
      const d = infoMap.scholarship;
      return formatResponse(
        `📌 **Scheme:** ${d.name[0]}\n💰 **Benefit:** ${d.benefits[0]}\n✅ **Eligibility:** ${d.eligibility[0]}\n\n📝 **How to Apply:**\n${d.apply[0]}`,
        `📌 **योजना:** ${d.name[1]}\n💰 **लाभ:** ${d.benefits[1]}\n✅ **पात्रता:** ${d.eligibility[1]}\n\n📝 **आवेदन कैसे करें:**\n${d.apply[1]}`
      );
    }

    if (isJobQuery(lower)) {
      setLastIntent("employment");
      const d = infoMap.employment;
      return formatResponse(
        `📌 **Scheme:** ${d.name[0]}\n💰 **Benefit:** ${d.benefits[0]}\n✅ **Eligibility:** ${d.eligibility[0]}\n\n📝 **How to Apply:**\n${d.apply[0]}`,
        `📌 **योजना:** ${d.name[1]}\n💰 **लाभ:** ${d.benefits[1]}\n✅ **पात्रता:** ${d.eligibility[1]}\n\n📝 **आवेदन कैसे करें:**\n${d.apply[1]}`
      );
    }

    if (isHealthQuery(lower)) {
      setLastIntent("health");
      const d = infoMap.health;
      return formatResponse(
        `📌 **Scheme:** ${d.name[0]}\n💰 **Benefit:** ${d.benefits[0]}\n✅ **Eligibility:** ${d.eligibility[0]}\n\n📝 **How to Apply:**\n${d.apply[0]}`,
        `📌 **योजना:** ${d.name[1]}\n💰 **लाभ:** ${d.benefits[1]}\n✅ **पात्रता:** ${d.eligibility[1]}\n\n📝 **आवेदन कैसे करें:**\n${d.apply[1]}`
      );
    }

    // 4. Greetings
    if (["hi", "hello", "hey", "namaste", "नमस्ते", "हे", "सुप्रभात"].some(g => lower.includes(g))) {
      const name = userProfile?.name?.split(" ")[0] || (isHi ? "अतिथि" : "Guest");
      return formatResponse(
        `Namaste ${name}! 🙏 I am your YojanaSathi AI. How can I help you explore government schemes today?`,
        `नमस्ते ${name}! 🙏 मैं आपका योजनासाथी AI हूँ। आज मैं सरकारी योजनाओं को खोजने में आपकी कैसे मदद कर सकता हूँ?`
      );
    }

    // 5. Fallback
    const fallbacksEn = [
      "I'm not exactly sure about that. Could you please specify if you're looking for schemes related to **Farmers**, **Students**, or **Employment**?",
      "I'm still learning! 🙏 Could you rephrase your question? You can also pick a category below to get started."
    ];
    const fallbacksHi = [
      "मुझे इसके बारे में पूरी जानकारी नहीं है। क्या आप बता सकते हैं कि क्या आप **किसानों**, **छात्रों**, या **रोजगार** से संबंधित योजनाओं की तलाश कर रहे हैं?",
      "मैं अभी भी सीख रहा हूँ! 🙏 क्या आप अपने प्रश्न को फिर से लिख सकते हैं? आप शुरू करने के लिए नीचे दी गई श्रेणी भी चुन सकते हैं।"
    ];
    const fIdx = Math.floor(Math.random() * fallbacksEn.length);
    return formatResponse(fallbacksEn[fIdx], fallbacksHi[fIdx]);
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = { id: Date.now(), text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const delay = Math.floor(Math.random() * (1200 - 800 + 1) + 800);
    
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: getSmartMockResponse(messageText),
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-saffron shadow-lg flex items-center justify-center hover:opacity-90 active:scale-95 transition-all z-50 animate-bounce-gentle"
          aria-label="Ask AI"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[520px] bg-card sm:rounded-2xl shadow-2xl flex flex-col z-50 sm:border border-border animate-slide-up">
          {/* Header */}
          <div className="gradient-navy px-4 py-3 flex items-center justify-between sm:rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-navy-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-navy-foreground">{t.aiTitle}</h3>
                <p className="text-[10px] text-navy-foreground/70">{t.aiSub}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-navy-foreground/70 hover:text-navy-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-6 h-6 rounded-full gradient-navy flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-navy-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-line
                    ${msg.sender === "user"
                      ? "gradient-saffron text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full gradient-navy flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-navy-foreground" />
                </div>
                <div className="bg-muted text-foreground px-3 py-2.5 rounded-xl rounded-bl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground italic">{isHi ? "सोच रहा हूँ..." : "Thinking..."}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Guided Suggestions */}
          {!isLoading && messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-[10px] text-muted-foreground mb-2 font-medium">{t.quickQuestions}</p>
              <div className="flex flex-wrap gap-1.5">
                {guidedSuggestions.map((item) => (
                  <button
                    key={item.query}
                    onClick={() => handleSend(item.query)}
                    disabled={isLoading}
                    className="px-2.5 py-1.5 rounded-full border border-border bg-card text-[10px] text-foreground hover:border-primary hover:bg-saffron-light transition-all text-left disabled:opacity-50"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                disabled={isLoading}
                className="flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${input.trim() && !isLoading
                    ? "gradient-saffron text-primary-foreground"
                    : "bg-border text-muted-foreground"
                  }`}
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;

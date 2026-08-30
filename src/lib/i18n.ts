export type Lang = "en" | "hi" | "mr";

export const languages: { id: Lang; short: string; label: string }[] = [
  { id: "en", short: "EN", label: "English" },
  { id: "hi", short: "हिं", label: "हिंदी" },
  { id: "mr", short: "मर", label: "मराठी" },
];

type Dict = Record<string, { en: string; hi: string; mr: string }>;

export const dict: Dict = {
  "nav.home": { en: "Home", hi: "होम", mr: "मुख्यपृष्ठ" },
  "nav.services": { en: "Services", hi: "सेवाएँ", mr: "सेवा" },
  "nav.assistant": { en: "AI Assistant", hi: "एआई सहायक", mr: "एआय सहाय्यक" },
  "nav.applications": { en: "My Applications", hi: "मेरे आवेदन", mr: "माझे अर्ज" },
  "nav.profile": { en: "My Profile", hi: "मेरी प्रोफ़ाइल", mr: "माझे प्रोफाइल" },
  "nav.hub": { en: "Interoperability Hub", hi: "इंटरऑपरेबिलिटी हब", mr: "इंटरऑपरेबिलिटी हब" },
  "cta.startDemo": { en: "Start Demo", hi: "डेमो शुरू करें", mr: "डेमो सुरू करा" },
  "cta.exploreServices": { en: "Explore Services", hi: "सेवाएँ देखें", mr: "सेवा पहा" },
  "cta.askAi": { en: "Ask AI Assistant", hi: "एआई सहायक से पूछें", mr: "एआय सहाय्यकाला विचारा" },
  "hero.eyebrow": {
    en: "One Citizen. One Profile. One Gateway.",
    hi: "एक नागरिक। एक प्रोफ़ाइल। एक द्वार।",
    mr: "एक नागरिक. एक प्रोफाइल. एक प्रवेशद्वार.",
  },
  "hero.title": {
    en: "Government Services, Simplified.",
    hi: "सरकारी सेवाएँ, सरल बनाईं।",
    mr: "सरकारी सेवा, सोप्या केल्या.",
  },
  "hero.body": {
    en: "LOK SEVAK connects fragmented government services into one intelligent platform, helping citizens discover services, reuse their information, and complete applications effortlessly.",
    hi: "लोक सेवक बिखरी हुई सरकारी सेवाओं को एक बुद्धिमान मंच पर जोड़ता है, जिससे नागरिक सेवाएँ खोज सकें, अपनी जानकारी दोबारा उपयोग कर सकें और आवेदन आसानी से पूरे कर सकें।",
    mr: "लोक सेवक विखुरलेल्या सरकारी सेवा एका बुद्धिमान व्यासपीठावर जोडतो, ज्यामुळे नागरिक सेवा शोधू शकतात, माहिती पुन्हा वापरू शकतात आणि अर्ज सहज पूर्ण करू शकतात.",
  },
  "hero.tagline": {
    en: "Simplifying Government Services through AI and Interoperability.",
    hi: "एआई और इंटरऑपरेबिलिटी के माध्यम से सरकारी सेवाओं का सरलीकरण।",
    mr: "एआय आणि इंटरऑपरेबिलिटीद्वारे सरकारी सेवांचे सुलभीकरण.",
  },
  "demo.badge": { en: "Demo Mode", hi: "डेमो मोड", mr: "डेमो मोड" },
  "demo.note": {
    en: "Exploring Lok Sevak using simulated citizen data. No real personal data is required.",
    hi: "लोक सेवक को सिम्युलेटेड नागरिक डेटा के साथ देखा जा रहा है। किसी वास्तविक व्यक्तिगत डेटा की आवश्यकता नहीं है।",
    mr: "लोक सेवक सिम्युलेटेड नागरिक डेटासह पाहत आहात. कोणताही खरा वैयक्तिक डेटा आवश्यक नाही.",
  },
  "ai.heading": {
    en: "Tell Lok Sevak what you need.",
    hi: "लोक सेवक को बताइए आपको क्या चाहिए।",
    mr: "लोक सेवकला सांगा तुम्हाला काय हवे आहे.",
  },
  "services.heading": {
    en: "One dashboard, every department.",
    hi: "एक डैशबोर्ड, हर विभाग।",
    mr: "एक डॅशबोर्ड, प्रत्येक विभाग.",
  },
  "capabilities.heading": {
    en: "Platform Capabilities",
    hi: "प्लेटफ़ॉर्म क्षमताएँ",
    mr: "प्लॅटफॉर्म क्षमता",
  },
};

export function t(key: keyof typeof dict | string, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang];
}

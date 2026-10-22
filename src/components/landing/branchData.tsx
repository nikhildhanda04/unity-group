import type { BranchCardData } from "./BranchCard";
import type { InquiryModalConfig } from "./InquiryModal";
// Isometric figures temporarily disabled — see src/components/landing/iso/
// import IsoBrake from "./iso/IsoBrake";
// import IsoGrill from "./iso/IsoGrill";

const MOTOR_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAaiNpm55pDaaAXJuyvnej_M7LXzbW8Yzc4oq__VlDo-7d27yRsGcowthtPfIoM36koFZCqyEJU7A705HBJdV_PT-R5WCgVpQ-dFngflTNfPEm7zwRlYyrbzeIVRf_ob-D0PWigiCFq_vFzPAdWYXBgRUgzChDMVzdUxEPmOFeiqNXBRAn1kHgjok8e7PX_is4Gwdkg7N-twRhNFVu3o-qagqazOpEm3_zhVd4vv9kfW_-BQeG7M_M";

const CARHUB_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDwA1Ahv5ctGQgaf4qfKgtfd5lTuyBxmgCFWQxYld4HuYnSDw2k7QZWgWSQLYHrUr-vOJ9zyNS9pFOR3dvUD2Rs1RnhQt0azMhAw2alIFMZkR2uFq6V2KmpccfI45qddUAsuHKoIGwN042Vb-LRxH4xhHi7im2S_CRS8S6krIJB5fDYBCsnWsu_PmoweJ9aKxdZb4nKo7RHRUYWzDaNplS92PtJ0OjGKWQDw1Hn7ZdRiiSgUO3Rx-w";

const CARTEL_IMG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDiu5hsGYF43HsYDUH9UobEtFbNPe3WdQ-z9-fDEFH0-SjVQ2wiWmHKodw_NTRExUpXRjDJdPKr1WdBWYD5EJqBjCMOmOI6WcI1DemPjyf-TaFjIJ2edT0UIy7Yn4AGWrgoLAp2q2kuWKYfmgOK3wvILyMl7SrT5m2jKTxWhuY_ZestZwL_6efaYzS920NMA3AXJS4AsI-4iDgSWBRPM2YJ0pK19O8Zvj4qQUB28-y0-_LQf3JquPo";

// Real data for Unity Motor, pulled from the unity-motors repo (lib/whatsapp.ts,
// app/urls/page.tsx, app/components/location.tsx). No Facebook page or Google
// Reviews link exists anywhere in that repo — both are TODO pending real links.
const MOTOR_MAPS_URL = "https://maps.app.goo.gl/QENHWtHxqtNPQV277?g_st=iwb";
const MOTOR_WHATSAPP_URL = `https://wa.me/917027900004?text=${encodeURIComponent("Hi, I'd like to book an appointment at Unity Motor.")}`;
const MOTOR_SALES_URL = "https://unitymotor.in/cars";
const MOTOR_INSTAGRAM_URL = "https://instagram.com/unitymotors"; // flagged as unconfirmed in the source repo itself
// TODO: replace with the real Google review link once provided.
const MOTOR_REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Unity+Motor+Corp+reviews";

// TODO: replace these placeholder search links with the real pinned Google
// Maps locations once provided — e.g. https://maps.app.goo.gl/xxxxx or a
// https://www.google.com/maps/place/@lat,lng link.
const CARHUB_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Unity+CarHub";
const CARTEL_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Shawarma+Cartel";
// TODO: no data exists anywhere for this business yet — placeholder pending
// real details (photos, address, contact, services, reviews).
const BHATIA_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Dr+Bhatia+Homeopathics";

const CARHUB_MODAL: InquiryModalConfig = {
  eyebrow: "[ EXCHANGE DISPATCH ]",
  title: "SCHEDULE INSPECTION",
  fieldLabel: "VEHICLE MAKE & MODEL",
  fieldPlaceholder: "e.g. Mercedes-AMG E63 / Nissan GT-R",
  serviceLabel: "INSPECTION TYPE",
  serviceOptions: ["TRADE-IN VALUATION", "PRE-PURCHASE INSPECTION", "CONCIERGE SOURCING REQUEST", "PRIVATE SHOWROOM VIEWING"],
  slots: ["10:00 AM", "14:00 PM", "17:30 PM"],
  etaLabel: "ESTIMATED SESSION: 45 MIN",
  submitLabel: "CONFIRM INSPECTION",
  confirmationText: "INSPECTION SLOT RESERVED. Confirmation code CH-204 dispatched to the trade desk.",
};

const CARTEL_MODAL: InquiryModalConfig = {
  eyebrow: "[ KITCHEN DISPATCH ]",
  title: "RESERVE PICKUP SLOT",
  fieldLabel: "ORDER ITEMS",
  fieldPlaceholder: "e.g. 2x Black Truffle Wrap, 1x Lamb Shawarma Plate",
  serviceLabel: "ORDER TYPE",
  serviceOptions: ["PICKUP ORDER", "CATERING INQUIRY", "BULK / EVENT ORDER", "FRANCHISE SITE VISIT"],
  slots: ["12:30 PM", "18:00 PM", "20:30 PM"],
  etaLabel: "ESTIMATED PREP: 15 MIN",
  submitLabel: "CONFIRM ORDER",
  confirmationText: "PICKUP SLOT RESERVED. Confirmation code SC-042 sent to the kitchen queue.",
};

export function buildBranchData(openModal: (config: InquiryModalConfig) => void): BranchCardData[] {
  return [
    {
      index: "01",
      anchorId: "unity-motor",
      eyebrowEn: "FLAGSHIP SUBSIDIARY // ACTIVE UNIT 01",
      eyebrowHi: "प्रमुख सहायक कंपनी",
      title: "UNITY MOTOR CORP.",
      locTag: "LOC: BAY #04-12 // PERFORMANCE GRID",
      mapsUrl: MOTOR_MAPS_URL,
      statusTag: "[ CERTIFIED MASTER FACILITY ]",
      bayIdValue: "BAY ID: UM-909",
      subtitleEn: "PRECISION TUNING & MOTORSPORT",
      subtitleHi: "सटीक ट्यूनिंग और मोटरस्पोर्ट",
      liveTagText: "LIVE BENCH TEST ACTIVE",
      roomTagText: "DYNO ROOM: 24.8°C",
      image: {
        src: MOTOR_IMG,
        alt: "High performance supercar being tuned inside a moody brutalist motorsport workshop with dramatic red neon rim lights",
      },
      imageTags: [{ text: "CHASSIS: TITANIUM MONOCOQUE" }, { text: "STAGE 3 ECU // SYNCHRONIZED", accent: true }],
      // isoFigure: <IsoBrake className="w-full h-auto drop-shadow-xl" />,
      description:
        "Full-spectrum vehicle overhaul, high-torque engine mapping, aerodynamics tuning, and VIP certified showroom consignment.",
      actions: [
        { icon: "rate_review", label: "Give Review", href: MOTOR_REVIEW_URL },
        { icon: "sell", label: "Go to Car Sales", href: MOTOR_SALES_URL },
        { icon: "location_on", label: "Reach Workshop", href: MOTOR_MAPS_URL },
      ],
      cta: { titleEn: "BOOK APPOINTMENT", sub: "Chat with us on WhatsApp", tagText: "[ WHATSAPP ]", href: MOTOR_WHATSAPP_URL },
      rating: "4.9 ★★★★★",
      reviewCountLabel: "GOOGLE REVIEWS",
      reviewLink: MOTOR_REVIEW_URL,
      reviews: [
        { quote: '"UNITY MOTOR re-mapped my GT3 RS and balanced the aero. 10/10 precision. No bull, just cold numbers."', author: "MARCUS V. // 992 GT3 RS OWNER" },
        { quote: '"Diagnostic caught an intermittent fuel-rail sensor failure that two official dealerships completely missed."', author: "KHALID A. // M4 COMPETITION" },
        { quote: '"Fastest bay turnaround in the city. The live telemetry report sent straight to my phone was surgical."', author: "ELENA R. // AUDI R8 V10 PLUS" },
      ],
      socials: [{ icon: "photo_camera", label: "@unitymotors", value: "IG", href: MOTOR_INSTAGRAM_URL }],
      footerLeft: "SEC_CLEARANCE: LEVEL 04 APPROVED",
      footerRight: "[ BAY_ONLINE ]",
    },
    {
      index: "02",
      anchorId: "unity-carhub",
      eyebrowEn: "EXPANSION SUBSIDIARY // ACTIVE UNIT 02",
      eyebrowHi: "विस्तार सहायक कंपनी",
      title: "UNITY CARHUB",
      locTag: "LOC: EXCHANGE FLOOR #02 // SHOWROOM WING",
      mapsUrl: CARHUB_MAPS_URL,
      statusTag: "[ BONDED ESCROW PARTNER ]",
      bayIdValue: "FLOOR ID: CH-204",
      subtitleEn: "VEHICLE EXCHANGE & CONCIERGE",
      subtitleHi: "वाहन एक्सचेंज और कंसीयर्ज",
      liveTagText: "LIVE TRADE DESK ACTIVE",
      roomTagText: "SHOWROOM: CLIMATE CONTROLLED",
      image: {
        src: CARHUB_IMG,
        alt: "High-end hypercar showroom gallery featuring illuminated dark stone flooring and ultra-luxury European sports cars",
      },
      imageTags: [{ text: "34 VEHICLES CURRENTLY CURATED" }, { text: "ESCROW: 100% BONDED", accent: true }],
      description:
        "Elite vehicle procurement, escrow trade services, and pre-inspected high-net sports car exchange network across international ports.",
      cta: { titleEn: "SCHEDULE INSPECTION", sub: "Private viewing, any curated unit", tagText: "[ INSTANT ]", onClick: () => openModal(CARHUB_MODAL) },
      rating: "4.8 ★★★★★",
      reviewCountLabel: "GOOGLE RATED (210+ REVIEWS)",
      reviewLink: "https://google.com",
      reviews: [
        { quote: '"Sold my E63 in 48 hours at the number they quoted. Escrow was clean, no games."', author: "SAMEER R. // E63 AMG OWNER" },
        { quote: '"They sourced a JDM-spec GT-R I\'d been hunting for two years. Inspection report was flawless."', author: "PRIYA K. // GT-R IMPORT" },
        { quote: '"Best trade-in desk in the city. Transparent numbers, no haggling theatre."', author: "DEV M. // CAYENNE TURBO" },
      ],
      socials: [
        { icon: "photo_camera", label: "@unitycarhub", value: "22K", href: "https://instagram.com" },
        { icon: "groups", label: "COMMUNITY", value: "JOIN", href: "https://facebook.com" },
      ],
      footerLeft: "SEC_CLEARANCE: LEVEL 03 APPROVED",
      footerRight: "[ FLOOR_ONLINE ]",
    },
    {
      index: "03",
      anchorId: "shawarma-cartel",
      eyebrowEn: "EXPANSION SUBSIDIARY // ACTIVE UNIT 03",
      eyebrowHi: "विस्तार सहायक कंपनी",
      title: "SHAWARMA CARTEL",
      locTag: "LOC: FLAGSHIP KITCHEN #03 // URBAN CORE",
      mapsUrl: CARTEL_MAPS_URL,
      statusTag: "[ HALAL CERTIFIED NETWORK ]",
      bayIdValue: "KITCHEN ID: SC-042",
      subtitleEn: "HIGH-HEAT URBAN ROTISSERIE",
      subtitleHi: "हाई-हीट अर्बन रोटिसरी",
      liveTagText: "LIVE SPIT ROTATION ACTIVE",
      roomTagText: "GRILL TEMP: 240°C",
      image: {
        src: CARTEL_IMG,
        alt: "High heat gourmet street food counter with industrial stainless steel spit roasting charred seasoned meats",
      },
      imageTags: [{ text: "HALAL CERTIFIED // HIGH-HEAT ROTISSERIE" }, { text: "42 GLOBAL NODES ONLINE", accent: true }],
      // isoFigure: <IsoGrill className="w-full h-auto drop-shadow-xl" />,
      description:
        "Street-level gastronomic dominance. Fire-roasted prime cuts, secret heritage marinades, and high-velocity urban flagship stores.",
      cta: { titleEn: "ORDER FOR PICKUP", sub: "Live kitchen queue allocation", tagText: "[ INSTANT ]", onClick: () => openModal(CARTEL_MODAL) },
      rating: "4.9 ★★★★★",
      reviewCountLabel: "GOOGLE RATED (520+ REVIEWS)",
      reviewLink: "https://google.com",
      reviews: [
        { quote: '"The black truffle wrap is worth the queue every single time. Char is perfect."', author: "ANIKA S. // REGULAR" },
        { quote: '"Fastest halal rotisserie counter downtown. Consistent quality across every location."', author: "FAHAD T. // REGULAR" },
        { quote: '"Franchise onboarding was straightforward and the kitchen specs are genuinely turnkey."', author: "ROHAN V. // FRANCHISEE" },
      ],
      socials: [
        { icon: "photo_camera", label: "@shawarmacartel", value: "64K", href: "https://instagram.com" },
        { icon: "groups", label: "COMMUNITY", value: "JOIN", href: "https://facebook.com" },
      ],
      footerLeft: "SEC_CLEARANCE: LEVEL 02 APPROVED",
      footerRight: "[ KITCHEN_ONLINE ]",
    },
    {
      // PLACEHOLDER — no real data exists for this business anywhere in the
      // project yet (no photos, address, contact, services, or reviews).
      // Replace every field below once real details are provided.
      index: "04",
      anchorId: "bhatia-homeopathics",
      eyebrowEn: "EXPANSION SUBSIDIARY // ACTIVE UNIT 04",
      eyebrowHi: "विस्तार सहायक कंपनी",
      title: "DR. BHATIA HOMEOPATHICS",
      locTag: "LOC: AWAITING ADDRESS",
      mapsUrl: BHATIA_MAPS_URL,
      statusTag: "[ AWAITING REAL CONTENT ]",
      bayIdValue: "CLINIC ID: PENDING",
      subtitleEn: "HOMEOPATHIC CONSULTATION & CARE",
      subtitleHi: "होम्योपैथिक परामर्श और देखभाल",
      liveTagText: "DETAILS PENDING",
      roomTagText: "STATUS: ONBOARDING",
      image: {
        src: "",
        alt: "Dr. Bhatia Homeopathics — business photos pending",
      },
      imageTags: [{ text: "AWAITING BUSINESS PHOTOS" }, { text: "PLACEHOLDER CONTENT", accent: true }],
      description: "Placeholder description — replace with real practice details, services, and specialties once provided.",
      actions: [{ icon: "location_on", label: "Find Clinic", href: BHATIA_MAPS_URL }],
      cta: { titleEn: "FIND CLINIC", sub: "Real contact details pending", tagText: "[ PENDING ]", href: BHATIA_MAPS_URL },
      rating: "— RATING PENDING",
      reviewCountLabel: "REVIEWS PENDING",
      reviewLink: BHATIA_MAPS_URL,
      reviews: [
        { quote: "Placeholder testimonial — replace with a real patient review once provided.", author: "SAMPLE // PLACEHOLDER" },
      ],
      socials: [],
      footerLeft: "SEC_CLEARANCE: PENDING",
      footerRight: "[ ONBOARDING ]",
    },
  ];
}

import type { BranchCardData } from "./BranchCard";
// Isometric figures temporarily disabled — see src/components/landing/iso/
// import IsoBrake from "./iso/IsoBrake";
// import IsoGrill from "./iso/IsoGrill";

// Real locations and Instagram handles as supplied directly by the client
// (2026-10-22). No AI-generated stock photography is used here — image.src
// is left empty until real storefront/product photos are provided, which
// renders the existing "Business photos pending" placeholder in BranchCard.
const MOTOR_MAPS_URL = "https://maps.app.goo.gl/XwkVcpvRez2TgdqB9";
const MOTOR_WHATSAPP_URL = `https://wa.me/917027900004?text=${encodeURIComponent("Hi, I'd like to book an appointment at Unity Motors.")}`;
const MOTOR_SALES_URL = "https://unitymotor.in/cars";
const MOTOR_INSTAGRAM_URL = "https://www.instagram.com/unitymotorss";
const MOTOR_CALL_URL = "tel:+917027900004";
const MOTOR_PHONE_DISPLAY = "+91 70279 00004";
// The real place page — scrolling down on it shows/lets you write Google reviews.
const MOTOR_REVIEW_URL = MOTOR_MAPS_URL;

const CARHUB_MAPS_URL = "https://maps.app.goo.gl/1enA1R5yW1ag8aU97";
const CARHUB_INSTAGRAM_URL = "https://www.instagram.com/unitycarhubb";
const CARHUB_CALL_URL = "tel:+919896209999";
const CARHUB_PHONE_DISPLAY = "+91 98962 09999";

const CARTEL_MAPS_URL = "https://maps.app.goo.gl/E1xowwzLfTNMqb8u6";
const CARTEL_INSTAGRAM_URL = "https://www.instagram.com/shawarmacartel";
const CARTEL_CALL_URL = "tel:+919896968860";
const CARTEL_PHONE_DISPLAY = "+91 98969 68860";

const BHATIA_MAPS_URL = "https://maps.app.goo.gl/as3KmEyx4KwZpzqy6";
const BHATIA_INSTAGRAM_URL = "https://www.instagram.com/drbhatiahomoeopathy";
const BHATIA_CALL_URL = "tel:+918199926006";
const BHATIA_PHONE_DISPLAY = "+91 81999 26006";

// TODO: no pinned address exists yet for Unity Tech — replace once provided.
const TECH_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Unity+Tech";
const TECH_INSTAGRAM_URL = "https://www.instagram.com/unitytechstore";
const TECH_CALL_URL = "tel:+917277775000";
const TECH_PHONE_DISPLAY = "+91 72777 75000";

export function buildBranchData(): BranchCardData[] {
  return [
    {
      index: "01",
      anchorId: "unity-motor",
      title: "UNITY MOTORS",
      locTag: "Reach Workshop",
      mapsUrl: MOTOR_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/unity-motors-storefront.jpg",
        alt: "Unity Motors storefront and workshop signage",
      },
      imageTags: [],
      // isoFigure: <IsoBrake className="w-full h-auto drop-shadow-xl" />,
      description: "A workshop with the luxury everyone needs for their car.",
      actions: [
        { icon: "call", label: "Call Now", href: MOTOR_CALL_URL },
        { icon: "rate_review", label: "Give Review", href: MOTOR_REVIEW_URL },
        { icon: "sell", label: "Go to Car Sales", href: MOTOR_SALES_URL },
        { icon: "location_on", label: "Reach Workshop", href: MOTOR_MAPS_URL },
      ],
      cta: { titleEn: "BOOK APPOINTMENT", sub: "Chat with us on WhatsApp", tagText: "[ WHATSAPP ]", href: MOTOR_WHATSAPP_URL },
      phone: { display: MOTOR_PHONE_DISPLAY, href: MOTOR_CALL_URL },
      // TODO: real Google reviews pending — this environment couldn't reach
      // maps.app.goo.gl to pull them (network blocked), so none are shown
      // yet. Paste the actual review text/ratings here once available.
      socials: [{ icon: "photo_camera", label: "@unitymotorss", value: "IG", href: MOTOR_INSTAGRAM_URL }],
      footerLeft: "Unity Motors",
      footerRight: "Open Now",
    },
    {
      index: "02",
      anchorId: "unity-carhub",
      title: "UNITY CARHUB",
      locTag: "Reach Showroom",
      mapsUrl: CARHUB_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/unity-carhub-vehicle.png",
        alt: "A vehicle from Unity Motors' inventory, listed with a Unity Motors plate",
      },
      imageTags: [],
      description: "A beacon of trust in pre-owned vehicles.",
      actions: [{ icon: "call", label: "Call Now", href: CARHUB_CALL_URL }],
      cta: { titleEn: "GET DIRECTIONS", sub: "View the showroom on Google Maps", tagText: "[ MAPS ]", href: CARHUB_MAPS_URL },
      phone: { display: CARHUB_PHONE_DISPLAY, href: CARHUB_CALL_URL },
      socials: [{ icon: "photo_camera", label: "@unitycarhubb", value: "IG", href: CARHUB_INSTAGRAM_URL }],
      footerLeft: "Unity CarHub",
      footerRight: "Open Now",
    },
    {
      index: "03",
      anchorId: "shawarma-cartel",
      title: "SHAWARMA CARTEL",
      locTag: "Reach Kitchen",
      mapsUrl: CARTEL_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/shawarma-cartel-storefront.png",
        alt: "Shawarma Cartel food stall storefront with a bowl of shawarma rice in the foreground",
      },
      imageTags: [],
      // isoFigure: <IsoGrill className="w-full h-auto drop-shadow-xl" />,
      description: "The taste of the underworld.",
      actions: [{ icon: "call", label: "Call Now", href: CARTEL_CALL_URL }],
      cta: { titleEn: "GET DIRECTIONS", sub: "Find the stall on Google Maps", tagText: "[ MAPS ]", href: CARTEL_MAPS_URL },
      phone: { display: CARTEL_PHONE_DISPLAY, href: CARTEL_CALL_URL },
      socials: [{ icon: "photo_camera", label: "@shawarmacartel", value: "IG", href: CARTEL_INSTAGRAM_URL }],
      footerLeft: "Shawarma Cartel",
      footerRight: "Open Now",
    },
    {
      index: "04",
      anchorId: "bhatia-homeopathics",
      title: "DR. BHATIA HOMEOPATHICS",
      locTag: "Reach Clinic",
      mapsUrl: BHATIA_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/bhatia-homeopathics-clinic.png",
        alt: "Dr. Bhatia Homeopathics clinic consultation",
      },
      imageTags: [],
      description: "Homeopathic consultation and care.",
      actions: [
        { icon: "call", label: "Call Now", href: BHATIA_CALL_URL },
        { icon: "location_on", label: "Find Clinic", href: BHATIA_MAPS_URL },
      ],
      cta: { titleEn: "FIND CLINIC", sub: "Get in touch on Instagram", tagText: "[ DM ]", href: BHATIA_INSTAGRAM_URL },
      phone: { display: BHATIA_PHONE_DISPLAY, href: BHATIA_CALL_URL },
      socials: [{ icon: "photo_camera", label: "@drbhatiahomoeopathy", value: "IG", href: BHATIA_INSTAGRAM_URL }],
      footerLeft: "Dr. Bhatia Homeopathics",
      footerRight: "Onboarding",
    },
    {
      index: "05",
      anchorId: "unity-tech",
      title: "UNITY TECH",
      locTag: "Find Store",
      mapsUrl: TECH_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "",
        alt: "Unity Tech — business photos pending",
      },
      imageTags: [],
      description: "Gadgets you desire, ready to buy.",
      actions: [{ icon: "call", label: "Call Now", href: TECH_CALL_URL }],
      cta: { titleEn: "SHOP ON INSTAGRAM", sub: "Browse the latest drops", tagText: "[ DM ]", href: TECH_INSTAGRAM_URL },
      phone: { display: TECH_PHONE_DISPLAY, href: TECH_CALL_URL },
      socials: [{ icon: "photo_camera", label: "@unitytechstore", value: "IG", href: TECH_INSTAGRAM_URL }],
      footerLeft: "Unity Tech",
      footerRight: "Open Now",
    },
  ];
}

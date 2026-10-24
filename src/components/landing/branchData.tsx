import type { BranchCardData } from "./BranchCard";

// Real locations, phone numbers, and Instagram handles as supplied directly
// by the client (2026-10-22). Shawarma Cartel uses a real client-supplied
// photo; Motors, CarHub, Bhatia, and Tech use AI-generated stock imagery
// (client-approved) since no usable real photo exists for those yet.
const MOTOR_MAPS_URL = "https://maps.app.goo.gl/XwkVcpvRez2TgdqB9";
const MOTOR_WHATSAPP_URL = `https://wa.me/917027900004?text=${encodeURIComponent("Hi, I'd like to book an appointment at Unity Motors.")}`;
const MOTOR_SALES_URL = "https://unitymotor.in/cars";
const MOTOR_INSTAGRAM_URL = "https://www.instagram.com/unitymotorss";
const MOTOR_CALL_URL = "tel:+917027900004";

const CARHUB_MAPS_URL = "https://maps.app.goo.gl/1enA1R5yW1ag8aU97";
const CARHUB_INSTAGRAM_URL = "https://www.instagram.com/unitycarhubb";
const CARHUB_CALL_URL = "tel:+919896209999";

const CARTEL_MAPS_URL = "https://maps.app.goo.gl/4WWEriXykHAJtXy29";
const CARTEL_INSTAGRAM_URL = "https://www.instagram.com/shawarmacartel";
const CARTEL_CALL_URL = "tel:+919896968860";

const BHATIA_MAPS_URL = "https://maps.app.goo.gl/as3KmEyx4KwZpzqy6";
const BHATIA_INSTAGRAM_URL = "https://www.instagram.com/drbhatiahomoeopathy";
const BHATIA_CALL_URL = "tel:+918199926006";

// TODO: no pinned address exists yet for Unity Tech — replace once provided.
const TECH_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Unity+Tech";
const TECH_INSTAGRAM_URL = "https://www.instagram.com/unitytechstore";
const TECH_CALL_URL = "tel:+917277775000";

export function buildBranchData(): BranchCardData[] {
  return [
    {
      index: "01",
      anchorId: "unity-motor",
      title: "UNITY MOTORS",
      mapsUrl: MOTOR_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/unity-motors-ai.png",
        alt: "Unity Motors workshop bay with a vehicle being detailed",
      },
      description: "A workshop with the luxury everyone needs for their car.",
      cta: { label: "Book a Service", icon: "calendar_month", href: MOTOR_WHATSAPP_URL },
      secondaryLinks: [
        { icon: "call", label: "+91 70279 00004", href: MOTOR_CALL_URL },
        { icon: "location_on", label: "Directions", href: MOTOR_MAPS_URL },
        { icon: "sell", label: "Car Sales", href: MOTOR_SALES_URL },
        { icon: "photo_camera", label: "@unitymotorss", href: MOTOR_INSTAGRAM_URL },
      ],
    },
    {
      index: "02",
      anchorId: "unity-carhub",
      title: "UNITY CARHUB",
      mapsUrl: CARHUB_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/unity-carhub-ai.png",
        alt: "Luxury vehicle showroom floor",
      },
      description: "A beacon of trust in pre-owned vehicles.",
      cta: { label: "Call to Enquire", icon: "call", href: CARHUB_CALL_URL },
      secondaryLinks: [
        { icon: "location_on", label: "Directions", href: CARHUB_MAPS_URL },
        { icon: "photo_camera", label: "@unitycarhubb", href: CARHUB_INSTAGRAM_URL },
      ],
    },
    {
      index: "03",
      anchorId: "shawarma-cartel",
      title: "SHAWARMA CARTEL",
      mapsUrl: CARTEL_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/shawarma-cartel-ai.png",
        alt: "A loaded bowl of shawarma rice on a wooden counter in front of a lit food stall",
      },
      description: "The taste of the underworld.",
      cta: { label: "View Menu on Instagram", icon: "restaurant_menu", href: CARTEL_INSTAGRAM_URL },
      secondaryLinks: [
        { icon: "call", label: "+91 98969 68860", href: CARTEL_CALL_URL },
        { icon: "location_on", label: "Directions", href: CARTEL_MAPS_URL },
      ],
    },
    {
      index: "04",
      anchorId: "bhatia-homoeopathics",
      title: "DR. BHATIA HOMOEOPATHY",
      mapsUrl: BHATIA_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/bhatia-homeopathics-ai.png",
        alt: "Homoeopathic clinic desk with remedies and botanical notebook",
      },
      description: "Homoeopathic consultation and care.",
      cta: { label: "Call to Book", icon: "call", href: BHATIA_CALL_URL },
      secondaryLinks: [
        { icon: "location_on", label: "Directions", href: BHATIA_MAPS_URL },
        { icon: "photo_camera", label: "@drbhatiahomoeopathy", href: BHATIA_INSTAGRAM_URL },
      ],
    },
    {
      index: "05",
      anchorId: "unity-tech",
      title: "UNITY TECH",
      mapsUrl: TECH_MAPS_URL,
      statusTag: "Open Now",
      image: {
        src: "/unity-tech-ai.png",
        alt: "Unity Tech retail counter with phones, laptops, and accessories",
      },
      description: "Gadgets you desire, ready to buy.",
      cta: { label: "Shop on Instagram", icon: "storefront", href: TECH_INSTAGRAM_URL },
      secondaryLinks: [{ icon: "call", label: "+91 72777 75000", href: TECH_CALL_URL }],
    },
  ];
}

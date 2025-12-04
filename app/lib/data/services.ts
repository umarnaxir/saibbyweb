import { ServiceDetails } from "@/components/sub/ServiceCard";

export const serviceList: ServiceDetails[] = [
  {
    name: "Web Development",
    description: "We build responsive, user-friendly websites that drive engagement and conversion.",
    // image: "me-1.jpeg",
    image: "code-3.jpeg",
    subServices: [
      { bit1: "frontend", bit2: "development" },
      { bit1: "backend", bit2: "development" },
      { bit1: "database", bit2: "development" },
      { bit1: "maintanence", bit2: "management" },
    ],
  },
  { 
    name: "Mobile Development",
    description: "We create native and hybrid mobile apps that are fast, reliable and easy to use.",
    image: "mobile-mockup.jpeg",
    subServices: [
      { bit1: "ios", bit2: "development" },
      { bit1: "android", bit2: "development" },
      { bit1: "backend", bit2: "development" },
      { bit1: "database", bit2: "development" },
    ],
  },
  {
    name: "Design",
    description: "We design visually appealing and effective graphics, logos and branding solutions.",
    image: "design-web.jpg",
    subServices: [
      { bit1: "design", bit2: "research" },
      { bit1: "ui/ux", bit2: "design" },
      { bit1: "wireframe", bit2: "design" },
      { bit1: "prototype", bit2: "development" },
    ],
  },
  {
    name: "Digital Branding",
    description: "We establish and enhance your brand's online presence through strategic digital marketing and social media campaigns.",
    image: "app.jpg",
    subServices: [
      { bit1: "logo", bit2: "design" },
      { bit1: "creatives", bit2: "design" },
      { bit1: "brouchure", bit2: "design" },
      { bit1: "prototype", bit2: "development" },
    ],
  },
];

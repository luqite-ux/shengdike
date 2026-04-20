import type { SiteMarketingData } from "@/lib/site-marketing-types"

export const DEFAULT_SITE_MARKETING: SiteMarketingData = {
  homeAbout: {
    leftImageUrl: "/images/about-building.png",
    overlayTitle: "About SENNDIK",
    body: "SENNDIK is a leading industrial technology company specializing in solid state relay products, solutions and other critical components to create valuable business insights for customers and end users. Solid State Relay is What We Do.",
    stats: [
      { value: "14+", label: "Years Experience" },
      { value: "50+", label: "Countries Served" },
      { value: "35+", label: "Patents Obtained" },
      { value: "100+", label: "Team Members" },
    ],
    ctaLabel: "+ Explore More",
    ctaHref: "/about/company-profile",
  },
  homeStrategy: {
    sectionTitle: "Competitive Strategy",
    sectionSubtitle: "Our competitive strategy will bring differentiated value to customers.",
    cards: [
      { title: "Professional", description: "Expert knowledge and specialized solutions" },
      { title: "Scale", description: "Scalable production for any requirement" },
      { title: "Speed", description: "Fast delivery and rapid response time" },
      { title: "Quality", description: "Highest quality standards guaranteed" },
      { title: "Service", description: "Dedicated customer support 24/7" },
      { title: "Reputation", description: "Trusted by leading companies worldwide" },
    ],
  },
  homeFacts: {
    backgroundUrl: "/images/facts-bg.jpg",
    sectionTitle: "Facts & Figures",
    sectionSubtitle: "As of Nov.2024",
    watermark: "SENNDIK",
    facts: [
      { value: 14, suffix: "", label: "years", description: "R&D and Manufacturing" },
      { value: 2, suffix: "+", label: "years", description: "Business Experience" },
      { value: 35, suffix: "+", label: "", description: "Patented technologies" },
      { value: 30, suffix: "+", label: "", description: "Engineers" },
      { value: 100, suffix: "+", label: "", description: "Employees" },
      { value: 1305, suffix: "", label: "m²", description: "of factory" },
    ],
  },
  homeNews: {
    sectionTitle: "News",
    items: [
      {
        title: "SENNDIK participated in the SPS 2025",
        date: "2025-11-07",
        imageUrl: "/images/news/news-1.jpg",
        href: "/news/sps-2025",
      },
      {
        title: "SENNDIK participated in the Munich Electronica 2024",
        date: "2024-11-12",
        imageUrl: "/images/news/news-2.jpg",
        href: "/news/munich-electronica-2024",
      },
      {
        title: "SENNDIK participated in the International Exhibition for Plast and Rubber Industries",
        date: "2024-09-07",
        imageUrl: "/images/news/news-3.jpg",
        href: "/news/plast-rubber-exhibition",
      },
    ],
  },
  solutions: {
    heroTitle: "Comprehensive",
    heroSubtitle: "Solutions for Every Industry",
    heroBackgroundUrl: "/images/solutions/solutions-hero.jpg",
    introTitle: "About Our Solution",
    introBody:
      "SENNDIK relays on constant product development and commitment to work with customers to develop bespoke solutions. Innovation is the challenge that SENNDIK takes up every day by anticipating market trends and implementing specific knowledge and skills in partnership with industry and research.",
    industries: [
      {
        id: "home-appliances",
        title: "Home Appliances & Smart Home",
        description:
          "High reliability, no noise, low energy consumption, achieving healthier, more efficient living solutions.",
        imageUrl: "/images/solutions/home-appliances.jpg",
        position: "right",
        popupTitle: "Industry Applications - Home Appliances & Smart Home",
        popupContent:
          "Application Scenarios:\n\n1. Air Conditioning System\nPrecise control of swing blades, stable operation, quiet and low noise, extended electrical service life.\n\n2. Refrigerator, Lighting, Washing Machine and Dishwasher\n• Refrigerator: safe and reliable control of freezer, refrigeration, cooling lights, and relays, with fast start-up response.\n• Washing Machine: precise control of the washer's drain valve, providing sufficient water flow for various wash modes.\n• Dishwasher: hot water and detergent cycle control, solid state relays provide precise temperature and cycle control.\n\n3. Smart Home System\nSmart dimming control, stable output ensures flicker-free light, prolonging service life and reducing costs.\n\n4. Coffee Machine\n• Heating system control: heating system requires high stability and reliable control, solid state relays ensure steady temperatures.\n• Pump control: SSR water pumps deliver smooth start/stop, preventing mechanical impact and prolonging pump life.",
      },
      {
        id: "kitchen-equipment",
        title: "Kitchen Equipment",
        description:
          "High reliability, no noise, low energy consumption, achieving healthier, more efficient using solutions.",
        imageUrl: "/images/solutions/kitchen-equipment.jpg",
        position: "left",
        popupTitle: "Industry Applications - Kitchen Equipment",
        popupContent:
          "Application Scenarios:\n\n1. Commercial Ovens and Steamers\nAccurate heating control, zero-crossing switching reduces electromagnetic interference and extends heating element lifespan.\n\n2. Induction Cookers and Soup Stoves\nHigh-frequency switching with low noise, stable output for healthier and more efficient cooking.\n\n3. Dishwashers and Sterilizers\nPrecise control of hot water circulation and disinfection cycles, ensuring hygiene and reliability.",
      },
      {
        id: "plastic-industry",
        title: "Plastic Industry",
        description: "Precise temperature control, compact design, empower the plastic industry.",
        imageUrl: "/images/solutions/plastic-industry.jpg",
        position: "right",
        popupTitle: "Industry Applications - Plastic Industry",
        popupContent:
          "Application Scenarios:\n\n1. Injection Molding Machines\nMulti-zone heating control with precise temperature, compact design saves cabinet space.\n\n2. Extrusion Lines\nStable switching for heating bands, improving consistency and yield of plastic products.\n\n3. Blow Molding Machines\nLong service life under frequent switching, ensuring continuous production.",
      },
      {
        id: "industrial-manufacturing",
        title: "Industrial Manufacturing",
        description: "Stable switching control, no arc sparks, ensure stable equipment operation.",
        imageUrl: "/images/solutions/industrial-manufacturing.jpg",
        position: "left",
        popupTitle: "Industry Applications - Industrial Manufacturing",
        popupContent:
          "Application Scenarios:\n\n1. Automated Production Lines\nReliable load switching with no arc sparks, preserving downstream equipment.\n\n2. Packaging Machinery\nFast response and high-frequency switching for sealing, cutting and printing stations.\n\n3. Testing Equipment\nPrecise and repeatable switching ensures accurate test results.",
      },
      {
        id: "industrial-control",
        title: "Industrial Control",
        description:
          "Extend SCR lifespan, limit starting capacity, enhance efficiency of industrial control systems.",
        imageUrl: "/images/solutions/industrial-control.jpg",
        position: "right",
        popupTitle: "Industry Applications - Industrial Control",
        popupContent:
          "Application Scenarios:\n\n1. Motor Soft Starters\nLimit starting current, reduce mechanical stress and extend motor life.\n\n2. Power Regulators\nAccurate phase-angle or zero-cross control for heating, plating and welding.\n\n3. PLC / DCS Interface\nIsolated switching between weak-current control signals and strong-current loads.",
      },
      {
        id: "photovoltaic",
        title: "Photovoltaic Industry",
        description:
          "Excellent high voltage and thermal power output, effectively improve the yield of battery components.",
        imageUrl: "/images/solutions/photovoltaic.jpg",
        position: "left",
        popupTitle: "Industry Applications - Photovoltaic Industry",
        popupContent:
          "Application Scenarios:\n\n1. Solar Cell Manufacturing\nHigh voltage and thermal output stability for diffusion and sintering furnaces.\n\n2. Module Lamination\nPrecise temperature control during lamination, improving yield and appearance.\n\n3. Tracker / Combiner Box\nRugged DC switching for PV string disconnect and protection.",
      },
    ],
  },
  rnd: {
    heroTitle: "Endless skills, striving for excellence",
    heroBackgroundUrl: "/images/rnd/rnd-hero.jpg",
    pageSectionTitle: "R&D and Innovation",
    strategyTitle: "R&D and Innovation",
    strategyLead: "Technology and products insist on walking ahead of competitors",
    strategyBullets: [
      "High-intensity allocation of resources to achieve key breakthroughs. Annual investment in R&D expenses exceeds 12% of total sales.",
      "Constantly update product design, and provide personalized design and technical services for customers around the world.",
      "SENNDIK has obtained 35+ patents, covering invention patents, design patents, utility model patents...",
    ],
    strategyImageUrl: "/images/rnd/rnd-strategy.jpg",
    ipdMeetingImageUrl: "/images/rnd/ipd-meeting.jpg",
    ipdTitle: "IPD development model",
    ipdLead:
      "The objective is to ensure the compliance of output products with customer requirements and achieve seamless integration between technology and market.",
    ipdDiagramUrl: "/images/rnd/ipd-diagram.png",
    patentsTitle: "Our Patents",
    patentsLead: "As of November 2024",
    patentsTotal: 35,
    patentsInvention: 5,
    patentsUtility: 24,
    patentsImageUrl: "/images/rnd/patents.jpg",
    honorTitle: "Honor and Qualification",
    honorLead: "As of November 2024",
    honorImageUrl: "/images/rnd/certifications.jpg",
    honorYears: [
      { year: "2023", items: ['Recognized as "National High-tech Enterprise" again.'] },
      {
        year: "2022",
        items: [
          '"Specialized, Refined, Distinctive, and Innovative" small and medium-sized enterprise in Fujian Province and in',
        ],
      },
    ],
  },
  supportTop: {
    heroImageUrl: "/images/support/support-hero.jpg",
  },
  productsList: {
    heroBackgroundUrl: "/images/products/products-hero.jpg",
  },
  culturalConcept: {
    heroBackgroundUrl: "/images/about/cultural-concept-hero.jpg",
    valuesIntroTitle: "SENNDIK Values",
    valuesIntroBody:
      'In the process of development, SENNDIK attaches great importance to customer satisfaction, staff\'s self-worth, and social harmony, gradually forming a value system centered on "CARE", which includes three parts: Customer care, Staff care, and Social care.',
    careCards: [
      {
        title: "Customer Care",
        imageUrl: "/images/about/customer-care.jpg",
        points: [
          "Centered on customer interests, we prioritize them by providing optimal solutions and cost-effective products.",
          "We focus on enhancing product quality, controlling production processes, and developing customized products.",
          "We pay attention to customers' individual needs, offering comprehensive after-sales support, and swiftly addressing their issues.",
        ],
      },
      {
        title: "Staff Care",
        imageUrl: "/images/about/staff-care.jpg",
        points: [
          "We strive to create a safe and comfortable working environment for employees, offering benefits and remuneration that exceed industry standards.",
          "We develop career planning and training programs to provide employees with a favorable development platform.",
          "We encourage employees to enhance their self-worth and cultivate a personality characterized by courage, enthusiasm, decisiveness, resilience, confidence, dedication, and a strong sense of responsibility.",
        ],
      },
      {
        title: "Social Care",
        imageUrl: "/images/about/social-care.jpg",
        points: [
          "Environmental Concern: We have always adhered to the principle of sustainable development in our production and operation, upholding green, environmentally friendly, and low-carbon production models. We have obtained ISO14001 environmental management system certification as well as ROHS, REACH, and other certifications.",
          "Social Responsibility: We are committed to public welfare undertakings, responding to social donations, and caring for disadvantaged children.",
        ],
      },
    ],
    futureBackgroundUrl: "/images/about/future-focus-bg.jpg",
    futureWatermark: "PARTNER",
    futureTitle: "Future Focus",
    futureBody:
      "Our vision is to be a world leader and early innovator in power semiconductor solutions and insights while satisfying the world's growing need for safety, efficiency and a clean environment and being a partner of choice.\n\nOur products are the fundamental building blocks needed for a cleaner, more efficient, electrified, and connected world.",
  },
  companyStrength: {
    heroBackgroundUrl: "/images/about/company-strength-hero.jpg",
    tabTitles: [
      "Leading R&D and innovation capabilities",
      "Industry-leading production capabilities",
      "Industry-leading customer service capabilities",
    ],
    introLeftLines: [
      "12000m² Production area",
      "• Industry-leading Production Capacity",
      "• Fully Visualized Via Video Supply Chain System",
      "• 1% Lean Lead manufacturing Experience",
    ],
    introRightImageUrl: "/images/about/strength/production-line.jpg",
    introRightLines: [
      "• Information Production Management",
      "• Scale Automated Production",
      "• Automated Storage and Retrieval System",
    ],
    manufacturingHeading: "Introduction to",
    manufacturingSubheading: "Manufacture and Test equipment",
    steps: [
      {
        number: "01",
        title: "PCBA manufacture",
        description:
          "We have SMT manufacture technology, all components are sold on PCB board (customization is available), involving dip soldering and SMD repairing.",
        imageUrl: "/images/about/strength/pcba.jpg",
      },
      {
        number: "02",
        title: "Accessories soldering - SSR Load terminal",
        description:
          "Product heat dissipation area and power (N.O) Load terminal: Automatic soldering machine: Fixed spot soldering, dipping the solder paste and furnace soldering to the temperature settings high frequency induction heater: heating with high consistency for reliable soldering.",
        imageUrl: "/images/about/strength/soldering.jpg",
      },
      {
        number: "03",
        title: "Accessories soldering - Power component pins and relative circuits on PCB board",
        description:
          "Pneumatic/electronic Spot-welding: any specs can be soldered, Automatic soldering: pre-tin and position to prevent cold soldering, wave soldering and automatic angle and parameter setting reduces the defect rate of product soldering for special specified module and relays only.",
        imageUrl: "/images/about/strength/pcb-soldering.jpg",
      },
      {
        number: "04",
        title: "DCBA manufacture - Solder paste dispensing for DCBA terminals",
        description:
          "Visual Positioning: 2 CCD cameras locate vision position with high accuracy. New vacuum pin sensor: 5.0mm Automatic Dispensing: solder height tracking with the side suction of high-quality and precision with a high-precision intelligent paste dispenser, maintaining the same amount and high-accuracy for normal solder paste.",
        imageUrl: "/images/about/strength/dcba-dispensing.jpg",
      },
      {
        number: "05",
        title: "DCBA manufacture - DCBA soldering",
        description:
          "Re-flow-less SMD surface mount device re-soldering. All chips will get board 100% visual checking before post-assembly.",
        imageUrl: "/images/about/strength/dcba-soldering.jpg",
      },
      {
        number: "06",
        title: "DCBA manufacture - DCBA cleaning",
        description:
          "Ultrasonic PCB Cleaning: Adopting 2D ULTRASONIC CLEAN PCB cleaner (s) is automatically done from 99%.",
        imageUrl: "/images/about/strength/dcba-cleaning.jpg",
      },
      {
        number: "07",
        title: "DCBA manufacture - DCBA potting",
        description:
          "Automatic vacuum potting can realize A/B glue precise proportioning, air bubble remove by all index after the chip is sealed, and effective complete performance as stated.",
        imageUrl: "/images/about/strength/dcba-potting.jpg",
      },
      {
        number: "08",
        title: "Semi-finished product parameter test / Finished product parameter test",
        description:
          "CCD automatic parameter collection: Every Factory ID data to calculate test data accuracy automatically from accuracy test. Each product will have a sticker with barcode and QC passed identification for traceability.",
        imageUrl: "/images/about/strength/parameter-test.jpg",
      },
      {
        number: "09",
        title: "Full load aging test",
        description:
          "All finished goods will be connected with sufficient load sufficient by charging battery temperature of 25°C for 24hrs in aging. All this condition test for a minimum aging test time for durability during testing to match the functional tests responsibly.",
        imageUrl: "/images/about/strength/aging-test.jpg",
      },
    ],
  },
  corporateSustainability: {
    heroBackgroundUrl: "/images/about/sustainability-hero.jpg",
    contentTitle: "Corporate Sustainability",
    quoteParagraphs: [
      "Credit and reputation foremost to our employees, suppliers and customers is our sustainable operating principles.",
      "We want to thank and recognize all our employees for their efforts that we have a privileged position to create the reliable quality assurance, perfect technical service and the best cost-effective.",
      "Team SENNDIK is who we are and providing solid state relay solutions in the industrial automation field is what we do. We will be your ideal choice.",
      "Thank you for following along on our journey.",
    ],
    ceoCaption: "A message from our CEO",
    ceoName: "Jack Fang",
    ceoImageUrl: "/images/about/ceo-climbing.jpg",
    bottomTitle: "Building a Sustainable Future Through Innovation and Responsibility",
    bottomBackgroundUrl: "/images/about/sustainability-mountains.jpg",
  },
}

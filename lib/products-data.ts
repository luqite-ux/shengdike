// Product Categories based on product series
export const productCategories = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "pcb-ssr", name: "PCB Solid State Relay", slug: "pcb-ssr" },
  { id: "single-phase-ssr", name: "Single-phase SSR", slug: "single-phase-ssr" },
  { id: "industrial-ssr", name: "Industrial Grade SSR", slug: "industrial-ssr" },
  { id: "two-phase-ssr", name: "Two-phase SSR", slug: "two-phase-ssr" },
  { id: "din-ssr", name: "DIN Rail SSR", slug: "din-ssr" },
  { id: "temperature-controller", name: "Temperature Controller", slug: "temperature-controller" },
  { id: "electromagnetic-relay", name: "Electromagnetic Relay", slug: "electromagnetic-relay" },
  { id: "relay-socket", name: "Relay Socket & Base", slug: "relay-socket" },
  { id: "ssr-radiator", name: "SSR Radiator & Heatsink", slug: "ssr-radiator" },
  { id: "thyristor-module", name: "Thyristor Module", slug: "thyristor-module" },
  { id: "power-regulator", name: "Power Regulator", slug: "power-regulator" },
]

export interface Product {
  id: string
  name: string
  model: string
  category: string
  categoryName: string
  image: string
  description: string
  features: string[]
  specifications: {
    label: string
    value: string
  }[]
  relatedProducts?: string[]
  /** 规格书 PDF 下载地址（留空时 Download 按钮会引导到 Request Quote） */
  datasheetUrl?: string
}

export const products: Product[] = [
  // ==================== PCB Solid State Relay ====================
  {
    id: "jgx-1f-pcb-ssr",
    name: "JGX-1F PCB Solid State Relay",
    model: "JGX-1F",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JGX-1F%20PCB%20Solid%20State%20Relay-pDQq7KojhmAIMNP4u4brGBQPSu4QG8.png",
    description: "The JGX-1F series is a compact PCB mount solid state relay designed for direct PCB mounting applications. It features a white housing with clear pin markings for easy installation.",
    features: [
      "Compact PCB mount design",
      "5A maximum load current",
      "12-380VAC output voltage",
      "3-32VDC control voltage",
      "LED status indicator",
      "Zero-crossing switching"
    ],
    specifications: [
      { label: "Model", value: "JGX-1F (5A)" },
      { label: "Output Voltage", value: "12-380VAC" },
      { label: "Load Current", value: "5A" },
      { label: "Control Voltage", value: "3-32VDC" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["jgx-1fa-5a-series", "gj-5-l-series", "sdk2-03u3nl-series"]
  },
  {
    id: "jgx-1fa-5a-series",
    name: "JGX-1FA(5A) Series",
    model: "JGX-1FA(5A)",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JGX-1FA%285A%29%20Series-uFEFz7fpdOqDvo3TuIOsfO0jrXJzzN.png",
    description: "The JGX-1FA(5A) series is a PCB mount solid state relay with enhanced performance for DC output applications.",
    features: [
      "Compact white housing",
      "5A load current capacity",
      "DC output version",
      "Direct PCB mounting",
      "Clear terminal markings",
      "Reliable solid state switching"
    ],
    specifications: [
      { label: "Model", value: "JGX-1FA(5A)" },
      { label: "Output Voltage", value: "5-220VDC" },
      { label: "Load Current", value: "5A" },
      { label: "Control Voltage", value: "3-32VDC" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["jgx-1f-pcb-ssr", "gj-5-l-series", "sdk2-03u3nl-series"]
  },
  {
    id: "gj-5-l-series",
    name: "GJ-5-L Series",
    model: "GJ-5-L",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GJ-5-L%20Series-H65VRjGYs5mkDrnrllY40V53oeE08m.png",
    description: "The GJ-5-L series is a compact PCB solid state relay with CE certification, suitable for various control applications.",
    features: [
      "Ultra-compact design",
      "5A maximum current",
      "CE certified",
      "12-380VAC output",
      "3-32VDC input",
      "PCB through-hole mounting"
    ],
    specifications: [
      { label: "Model", value: "GJ-5-L" },
      { label: "Output Voltage", value: "12-380VAC" },
      { label: "Max Current @20°C", value: "5A" },
      { label: "Control Voltage", value: "3-32VDC" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["jgx-1f-pcb-ssr", "jgx-1fa-5a-series", "sdk2-03u3nl-series"]
  },
  {
    id: "h3fd-x05sn",
    name: "H3FD-X05SN DC Solid State Relay",
    model: "H3FD-X05SN",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/H3FD-X05SN-VXhy8BgnMzf2c6AcSWHWjxYTvhIZoi.png",
    description: "The H3FD-X05SN is a DC output solid state relay in a compact black housing, designed for DC load control applications.",
    features: [
      "DC output solid state relay",
      "5A 50VDC output",
      "Black housing design",
      "LED status indicator",
      "DC5-24V control input",
      "Bottom view pin layout"
    ],
    specifications: [
      { label: "Model", value: "H3FD-X05SN" },
      { label: "Output", value: "5A 50VDC" },
      { label: "Control Input", value: "DC5-24V" },
      { label: "Housing", value: "Black plastic" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["sdd-5hh-1", "sdd-10hdz-series", "sdd-10hhz-series"]
  },
  {
    id: "sdk2-03y3n-series",
    name: "SDK2-03Y3N Series PCB SSR",
    model: "SDK2-03Y3N",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDK2-03Y3N%20Series-BrsjpKHsmxURvuYZ9oT9heTQLIhSp6.png",
    description: "The SDK2-03Y3N is a metal-housed PCB solid state relay with compact design for space-constrained applications, featuring 3A load capacity.",
    features: [
      "Metal housing construction",
      "3A 380VAC load capacity",
      "3-32VDC control input",
      "Compact footprint",
      "PCB pin mounting",
      "High reliability"
    ],
    specifications: [
      { label: "Model", value: "SDK2-03Y3N" },
      { label: "Output", value: "3A 380VAC" },
      { label: "Control Input", value: "3-32VDC" },
      { label: "Housing", value: "Metal" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["sdk2-03u3nl-series", "jgx-1f-pcb-ssr", "gj-5-l-series"]
  },
  {
    id: "sdk2-03u3nl-series",
    name: "SDK2-03U5N Series PCB SSR",
    model: "SDK2-03U5N",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDK2-03U3NL%20Series%20Relay%20Manual-eW2FkNlJUfMtYeHJRWm8T9rT6947kT.png",
    description: "The SDK2-03U5N is a white PCB solid state relay with CE certification, featuring 5A output at 280VAC for general purpose AC control.",
    features: [
      "White housing design",
      "5A 280VAC output @20°C",
      "3-32VDC control input",
      "CE certified",
      "4-pin through-hole",
      "Clear terminal markings"
    ],
    specifications: [
      { label: "Model", value: "SDK2-03U5N" },
      { label: "Output", value: "Max 5A 280VAC @20°C" },
      { label: "Control Input", value: "3-32VDC" },
      { label: "Certification", value: "CE" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["sdk2-03y3n-series", "jgx-1f-pcb-ssr", "gj-5-l-series"]
  },
  {
    id: "sdd-5hh-1",
    name: "SDD-5HH-1 DC PCB Solid State Relay",
    model: "SDD-5HH-1",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDD-5HH-1-ZmrWwuTFYwoIjpxGo6JBvcK96A9poX.png",
    description: "The SDD-5HH-1 is a compact black DC solid state relay for PCB mounting, featuring 7A load capacity at 50VDC output.",
    features: [
      "Compact black housing",
      "7A 50VDC load capacity",
      "10-30VDC control input",
      "DC to DC switching",
      "LED indicator",
      "PCB through-hole mounting"
    ],
    specifications: [
      { label: "Model", value: "SDD-5HH-1" },
      { label: "Output", value: "LOAD 7A 50VDC" },
      { label: "Control Input", value: "10-30VDC" },
      { label: "Housing", value: "Black plastic" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["h3fd-x05sn", "sdd-10hdz-series", "sdd-10hhz-series"]
  },
  {
    id: "sdd-10hdz-series",
    name: "SDD-10HDZ Series DC PCB SSR",
    model: "SDD-10HDZ",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDD-10HDZ%20Series-t1Tkf60tvCQQIa0sADpYmhcswuM6zk.png",
    description: "The SDD-10HDZ is a metal-housed DC solid state relay with 10A capacity, featuring LED status indicator and multiple pin configuration.",
    features: [
      "Metal housing construction",
      "10A DC load capacity",
      "LED status indicator",
      "Multi-pin configuration",
      "High current handling",
      "Reliable DC switching"
    ],
    specifications: [
      { label: "Model", value: "SDD-10HDZ" },
      { label: "Output", value: "10A DC" },
      { label: "Control Input", value: "10-30VDC" },
      { label: "Housing", value: "Metal" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["sdd-5hh-1", "sdd-10hhz-series", "h3fd-x05sn"]
  },
  {
    id: "sdd-10hhz-series",
    name: "SDD-10HHZ Series DC PCB SSR",
    model: "SDD-10HHZ",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDD-10HHZ%20Series-ccPnCLHT55hLlGEAGrVaJxJxKi3hkE.png",
    description: "The SDD-10HHZ is a compact metal-housed DC solid state relay with 10A capacity and LED indicator for status monitoring.",
    features: [
      "Compact metal housing",
      "10A 50VDC output",
      "10-30VDC control input",
      "Green LED indicator",
      "Multi-pin output",
      "Industrial quality"
    ],
    specifications: [
      { label: "Model", value: "SDD-10HHZ" },
      { label: "Output", value: "10A 50VDC" },
      { label: "Control Input", value: "10-30VDC" },
      { label: "Housing", value: "Metal" },
      { label: "Mounting", value: "PCB Mount" },
    ],
    relatedProducts: ["sdd-10hdz-series", "sdd-5hh-1", "h3fd-x05sn"]
  },
  {
    id: "sdd-5s06-driver-series",
    name: "SDD-5S06 Driver Series",
    model: "SDD-5S06",
    category: "pcb-ssr",
    categoryName: "PCB Solid State Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDD-5S06%C2%A0Driver%20Series-BWlYwAumuDJkyTX3ExabvwrEn3x6CO.png",
    description: "The SDD-5S06 is a transparent-housed relay driver module for PCB mounting, designed for relay control applications.",
    features: [
      "Transparent housing",
      "Relay driver function",
      "PCB mounting pins",
      "Compact design",
      "Internal circuit visible",
      "Standard pin spacing"
    ],
    specifications: [
      { label: "Model", value: "SDD-5S06" },
      { label: "Type", value: "Relay Driver" },
      { label: "Housing", value: "Transparent" },
      { label: "Mounting", value: "PCB Mount" },
      { label: "Application", value: "Relay Control" },
    ],
    relatedProducts: ["sdd-5hh-1", "sdd-10hdz-series", "jgx-1f-pcb-ssr"]
  },

  // ==================== Single-phase SSR ====================
  {
    id: "saa10s48-series",
    name: "SAA10S48 Series Single-phase SSR",
    model: "SAA10S48",
    category: "single-phase-ssr",
    categoryName: "Single-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SAA10S48%20Series-1oHesVQkZctH7QsZlWMbCSY0HEBX8M.png",
    description: "The SAA10S48 series is a single-phase solid state relay with classic red and black design, featuring 10A load capacity for various AC control applications.",
    features: [
      "Single-phase AC control",
      "10A load current",
      "24-480VAC output",
      "70-280VAC input control",
      "CE certified",
      "Zero-crossing switching"
    ],
    specifications: [
      { label: "Model", value: "SAA10S48" },
      { label: "Output Voltage", value: "24-480VAC" },
      { label: "Load Current", value: "10A" },
      { label: "Control Input", value: "70-280VAC" },
      { label: "Frequency", value: "50-60Hz" },
    ],
    relatedProducts: ["saa40s48-series", "sda40s48-series", "sda15s48-ta-unit-series"]
  },
  {
    id: "saa40s48-series",
    name: "SAA40S48 Series Single-phase SSR",
    model: "SAA40S48",
    category: "single-phase-ssr",
    categoryName: "Single-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SAA40S48%20Series%20Single-phase%20Solid%20State%20Relay-KwKNVg72I6M3AGU6cHtppWXgqTEpZ5.png",
    description: "The SAA40S48 series is a high-capacity single-phase solid state relay with 40A load current, available in multiple certification versions including CE and RoHS.",
    features: [
      "40A high load capacity",
      "24-480VAC output",
      "70-280VAC AC control",
      "Multiple versions available",
      "CE and RoHS certified",
      "Reliable thermal design"
    ],
    specifications: [
      { label: "Model", value: "SAA40S48" },
      { label: "Output Voltage", value: "24-480VAC" },
      { label: "Load Current", value: "40A" },
      { label: "Control Input", value: "70-280VAC" },
      { label: "Frequency", value: "50-60Hz" },
    ],
    relatedProducts: ["saa10s48-series", "sda40s48-series", "sda15s48-ta-unit-series"]
  },
  {
    id: "sda40s48-series",
    name: "SDA40S48 Series Single-phase SSR",
    model: "SDA40S48",
    category: "single-phase-ssr",
    categoryName: "Single-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA40S48%20Series%20Single-phase%20Solid%20State%20Relay-vrukkXKCfDFKXoPiVWnzqOoWhmUDBj.png",
    description: "The SDA40S48 series features the classic SENNDIK blue label design with 25A capacity, 24-480VAC output and 3-32VDC control input.",
    features: [
      "Classic SENNDIK design",
      "25A load current",
      "24-480VAC output",
      "3-32VDC control input",
      "50-60Hz frequency",
      "CE certified"
    ],
    specifications: [
      { label: "Model", value: "SDA25S48" },
      { label: "Output Voltage", value: "24-480VAC" },
      { label: "Load Current", value: "25A" },
      { label: "Control Input", value: "3-32VDC" },
      { label: "Frequency", value: "50-60Hz" },
    ],
    relatedProducts: ["saa40s48-series", "saa10s48-series", "sda15s48-ta-unit-series"]
  },
  {
    id: "sda15s48-ta-unit-series",
    name: "SDA15S48-TA Unit Series",
    model: "SDA15S48-TA",
    category: "single-phase-ssr",
    categoryName: "Single-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA15S48-TA%C2%A0Unit%20Series-Es3qMxPCW9oDJc7VWgjrJsmx60DZDm.png",
    description: "The SDA15S48-TA is a single-phase SSR with integrated heatsink, designed for easy panel mounting with mounting bracket.",
    features: [
      "Integrated aluminum heatsink",
      "15A AC51 rating",
      "480V output voltage",
      "3-32VDC control input",
      "Panel mount bracket",
      "CE certified"
    ],
    specifications: [
      { label: "Model", value: "SDA15S48-TA" },
      { label: "Output Voltage", value: "480V~" },
      { label: "AC51 Rating", value: "15A" },
      { label: "Control Input", value: "3-32V" },
      { label: "Frequency", value: "50-60Hz" },
    ],
    relatedProducts: ["sda60s48ta", "sda25s48-tb-series", "sda15s48-tb-series"]
  },
  {
    id: "sda60s48ta",
    name: "SDA60S48-TA Series SSR",
    model: "SDA60S48-TA",
    category: "single-phase-ssr",
    categoryName: "Single-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA-60S48TA-KECyymOqdfJGby9xfYfinFdzgsmf1i.png",
    description: "The SDA60S48-TA is a high-capacity single-phase SSR with integrated heatsink and mounting bracket for industrial applications.",
    features: [
      "25A AC51 load capacity",
      "480V output voltage",
      "3-32V DC control input",
      "Integrated heatsink",
      "Panel mount bracket",
      "CE certified"
    ],
    specifications: [
      { label: "Model", value: "SDA25S48-TA" },
      { label: "Output Voltage", value: "480V~" },
      { label: "AC51 Rating", value: "25A" },
      { label: "Control Input", value: "3-32V" },
      { label: "Frequency", value: "50-60Hz" },
    ],
    relatedProducts: ["sda15s48-ta-unit-series", "sda25s48-tb-series", "sda40s48-series"]
  },
  {
    id: "sdd40s-series",
    name: "SDD40S Series Single-phase DC SSR",
    model: "SDD40S",
    category: "single-phase-ssr",
    categoryName: "Single-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDD40S%20Series-JvxsyP9xjy2QowT6b1cqckfZ0pw4zp.png",
    description: "The SDD40S series is a single-phase DC solid state relay with distinctive yellow label, featuring 40A load capacity for DC load control.",
    features: [
      "DC load control",
      "40A load capacity",
      "Yellow label design",
      "3-32VDC control input",
      "CE certified",
      "Made in China quality"
    ],
    specifications: [
      { label: "Model", value: "SDD40S" },
      { label: "Output", value: "DC Load" },
      { label: "Load Current", value: "40A" },
      { label: "Control Input", value: "3-32VDC" },
      { label: "Certification", value: "CE" },
    ],
    relatedProducts: ["sdd40s-single-phase", "sda40s48-series", "saa40s48-series"]
  },
  {
    id: "sdd40s-single-phase",
    name: "SDD40S Single-phase Solid State Relay",
    model: "SDD40S",
    category: "single-phase-ssr",
    categoryName: "Single-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDD40S%20Series%20Single-phase%20Solid%20State%20Relay-eoBmsTHc2GuDPkoDycuyjPizAJcn4y.png",
    description: "The SDD40S is a compact single-phase solid state relay with black housing and clear terminal markings for easy installation.",
    features: [
      "Compact black housing",
      "Clear terminal markings",
      "Single-phase control",
      "Screw terminal connections",
      "LED indicator",
      "Panel mount design"
    ],
    specifications: [
      { label: "Model", value: "SDD40S" },
      { label: "Type", value: "Single-phase SSR" },
      { label: "Housing", value: "Black plastic" },
      { label: "Terminals", value: "Screw type" },
      { label: "Mounting", value: "Panel Mount" },
    ],
    relatedProducts: ["sdd40s-series", "sda40s48-series", "saa40s48-series"]
  },

  // ==================== Industrial Grade SSR ====================
  {
    id: "h340zf-series",
    name: "H340ZF Industrial SSR Series",
    model: "H340ZF",
    category: "industrial-ssr",
    categoryName: "Industrial Grade SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/H340ZF%20Series-mFuJwbeQ3wUieC5zKZEQdR73B80mZX.png",
    description: "The H340ZF series is an industrial-grade solid state relay with 40A capacity, featuring CCC and CE dual certification for reliable industrial applications.",
    features: [
      "Industrial grade design",
      "40A load current (AC-12)",
      "40-480VAC output",
      "3-32V DC control input",
      "CCC and CE certified",
      "GB/T14048.5-2017 standard"
    ],
    specifications: [
      { label: "Model", value: "SDI03T40N (H340ZF)" },
      { label: "Output Voltage", value: "40-480VAC" },
      { label: "AC-12 le", value: "40A" },
      { label: "Control Input", value: "IN 3-32V" },
      { label: "Standard", value: "GB/T14048.5-2017" },
    ],
    relatedProducts: ["h3300zd-series", "sdi03t340n-series", "saa40s48-series"]
  },
  {
    id: "h3300zd-series",
    name: "H3300ZD Industrial SSR Series",
    model: "H3300ZD",
    category: "industrial-ssr",
    categoryName: "Industrial Grade SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/H3300ZD%20Series-IWLf0dt3z2qBjXHprTAEivJWzkE1sC.jpeg",
    description: "The H3300ZD series is a high-power industrial solid state relay with 300A capacity, featuring DBC ultra-high thermal conductive base plate for superior heat dissipation.",
    features: [
      "300A ultra-high capacity",
      "DBC thermal conductive base",
      "40-480VAC output",
      "3-32V DC control input",
      "CCC and CE certified",
      "Industrial heavy-duty design"
    ],
    specifications: [
      { label: "Model", value: "SDI03T300N (H3300ZD)" },
      { label: "Output Voltage", value: "40-480VAC" },
      { label: "AC-12 le", value: "300A" },
      { label: "Control Input", value: "IN 3-32V" },
      { label: "Base Plate", value: "DBC Ultra-high Thermal" },
    ],
    relatedProducts: ["h340zf-series", "sdi03t340n-series", "scb865600-series"]
  },
  {
    id: "sdi03t340n-series",
    name: "SDI03T340N Industrial SSR",
    model: "SDI03T340N",
    category: "industrial-ssr",
    categoryName: "Industrial Grade SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDI03T340N%20Series%20Solid%20State%20Relay-cMm5U5XJfHlrVnnnDGSCFs4aDSlmKx.png",
    description: "The SDI03T340N is a heavy-duty industrial solid state relay with 300A capacity and DBC ultra-high thermal conductive base plate.",
    features: [
      "300A industrial capacity",
      "40-480VAC output",
      "3-32V DC control input",
      "DBC thermal base plate",
      "CCC and CE certified",
      "GB/T14048.5-2017 compliant"
    ],
    specifications: [
      { label: "Model", value: "SDI03T300N (H3300ZD)" },
      { label: "Output Voltage", value: "40-480VAC" },
      { label: "AC-12 le", value: "300A" },
      { label: "Control Input", value: "IN 3-32V" },
      { label: "Base", value: "DBC Ultra-high Thermal" },
    ],
    relatedProducts: ["h3300zd-series", "h340zf-series", "scb865600-series"]
  },

  // ==================== Two-phase SSR ====================
  {
    id: "scb865600-series",
    name: "SCB865600 Two-phase SSR Series",
    model: "SCB865600",
    category: "two-phase-ssr",
    categoryName: "Two-phase SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SCB865600%20Series-AJe6F2RxiKP1SnyVLlxAnOtuTrIRFc.png",
    description: "The SCB865600 series is a dual-channel two-phase solid state relay with integrated heatsink, featuring LED status indicator and CE certification.",
    features: [
      "Dual-channel output",
      "24-600VAC output voltage",
      "50A per channel",
      "10-30VDC control input",
      "Integrated heatsink",
      "LED status indicator"
    ],
    specifications: [
      { label: "Model", value: "SCB865600" },
      { label: "Output Voltage", value: "24-600VAC" },
      { label: "Load Current", value: "50A x 2" },
      { label: "Control Input", value: "10-30VDC" },
      { label: "Certification", value: "CE" },
    ],
    relatedProducts: ["h340zf-series", "h3300zd-series", "sdi03t340n-series"]
  },

  // ==================== DIN Rail SSR ====================
  {
    id: "sda-3hdz-series",
    name: "SDA-3HDZ DIN Rail SSR",
    model: "SDA-3HDZ",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA-3HDZ%20Series-YwwnbveidnSxCowkhvtGyTUOj1Fu31.png",
    description: "The SDA-3HDZ is a compact metal-housed solid state relay designed for PCB mounting, featuring LED indicator and premium quality construction.",
    features: [
      "Metal housing construction",
      "3A 220VAC output",
      "10-30VDC control input",
      "LED status indicator",
      "Compact design",
      "High reliability"
    ],
    specifications: [
      { label: "Model", value: "SDA-3HDZ" },
      { label: "Output", value: "220VAC 3A" },
      { label: "Control Input", value: "IN:10-30VDC" },
      { label: "Housing", value: "Metal" },
      { label: "Indicator", value: "LED" },
    ],
    relatedProducts: ["sda-3hdz-din-mount", "sdd-10hz-din-mount", "sda100s60-td-series"]
  },
  {
    id: "sda-3hdz-din-mount",
    name: "SDA-3HDZ DIN Rail Mount Assembly",
    model: "SDA-3HDZ",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA-3HDZ-oGkdQinlKv5Dn7JDd9FX4bZHhSIoZN.png",
    description: "Complete DIN rail mount assembly featuring the SDA-3HDZ solid state relay pre-mounted on a dedicated socket base for easy panel installation.",
    features: [
      "Complete assembly with socket",
      "DIN rail mounting",
      "5A 250VAC rated socket",
      "Yellow release lever",
      "CE and UL certified",
      "Easy installation"
    ],
    specifications: [
      { label: "Model", value: "SDA-3HDZ + 1665C Base" },
      { label: "Socket Rating", value: "5A 250VAC" },
      { label: "Relay Output", value: "220VAC 3A" },
      { label: "Control Input", value: "10-30VDC" },
      { label: "Mounting", value: "DIN Rail" },
    ],
    relatedProducts: ["sda-3hdz-series", "sdd-10hz-din-mount", "sc0205-n-relay-base"]
  },
  {
    id: "sdd-10hz-din-mount",
    name: "SDD-10HZ DIN Rail Mount Assembly",
    model: "SDD-10HZ",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDD-10HZ%20Series%20Rail%20Mounting%20Support%20Base%20%281%29-93V2dpQHhcSEtnHexBxGfQQXBNFhzR.png",
    description: "The SDD-10HZ is a DIN rail mounted solid state relay assembly with integrated socket base, featuring 10A capacity and LED indicator.",
    features: [
      "DIN rail mounting",
      "10A load capacity",
      "Integrated socket base",
      "Green LED indicator",
      "15A 250VAC socket rating",
      "Yellow release lever"
    ],
    specifications: [
      { label: "Model", value: "SDD-10HZ" },
      { label: "Socket Rating", value: "15A 250VAC / 16A 250V" },
      { label: "Relay Capacity", value: "10A" },
      { label: "Mounting", value: "DIN Rail" },
      { label: "Indicator", value: "Green LED" },
    ],
    relatedProducts: ["sda-3hdz-din-mount", "sda100s60-td-series", "sda25s48-tb-series"]
  },
  {
    id: "sda100s60-td-series",
    name: "SDA100S60-TD DIN Rail SSR",
    model: "SDA100S60-TD",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA100S60-TD%C2%A0Device%20Series-5HDGR07T3SiC2y8jZVTmPWzra6Ijk4.png",
    description: "The SDA100S60-TD is a high-capacity DIN rail mounted SSR with blue housing and integrated aluminum heatsink for superior heat dissipation.",
    features: [
      "100A high capacity",
      "24-600VAC output",
      "4-32VDC control input",
      "Blue housing design",
      "Integrated heatsink",
      "CE certified"
    ],
    specifications: [
      { label: "Model", value: "SDA100S60-TD" },
      { label: "Output Voltage", value: "24-600VAC" },
      { label: "Load Current", value: "100A" },
      { label: "Control Input", value: "4-32V DC" },
      { label: "Mounting", value: "DIN Rail" },
    ],
    relatedProducts: ["sda50s60-td-series", "sda50s60-tc-series", "sda25s48-tb-series"]
  },
  {
    id: "sda25s48-tb-series",
    name: "SDA25S48-TB DIN Rail SSR",
    model: "SDA25S48-TB",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA25S48-TB%20Series-Ujvh3oKfnZ4mrnhaqBECvN3PXaJHx9.png",
    description: "The SDA25S48-TB is a compact DIN rail SSR with black housing and integrated heatsink, featuring 25A capacity at 480VAC output.",
    features: [
      "25A load capacity",
      "480VAC output voltage",
      "4-32VDC control input",
      "TA<50°C rating",
      "Integrated heatsink",
      "Compact design"
    ],
    specifications: [
      { label: "Model", value: "SDA25S48-TB" },
      { label: "Output Voltage", value: "480VAC" },
      { label: "Load Current", value: "25A" },
      { label: "Control Input", value: "4-32VDC" },
      { label: "Temperature", value: "TA<50°C" },
    ],
    relatedProducts: ["sda15s48-tb-series", "sda100s60-td-series", "sda50s60-tc-series"]
  },
  {
    id: "sda15s48-tb-series",
    name: "SDA15S48-TB DIN Rail SSR",
    model: "SDA15S48-TB",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA15S48-TB%20Series%20Solid%20State%20Relay-KzOF1ko7jJiF9mqn4FP5rCJ7bFDaN7.png",
    description: "The SDA15S48-TB series features compact DIN rail SSRs with integrated heatsinks, available in 25A and 40A versions.",
    features: [
      "Compact black housing",
      "480VAC output voltage",
      "4-32VDC control input",
      "TA<50°C rating",
      "Integrated heatsink",
      "Multiple current ratings"
    ],
    specifications: [
      { label: "Model", value: "SDA25S48-TB / SDA40S48-TB" },
      { label: "Output Voltage", value: "480VAC" },
      { label: "Load Current", value: "25A / 40A" },
      { label: "Control Input", value: "4-32VDC" },
      { label: "Temperature", value: "TA<50°C" },
    ],
    relatedProducts: ["sda25s48-tb-series", "sda100s60-td-series", "sda50s60-tc-series"]
  },
  {
    id: "sda50s60-tc-series",
    name: "SDA50S60-TC DIN Rail SSR",
    model: "SDA50S60-TC",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA50S60-TC%20Series-sQxCLZWQP0DxnA2eiutln0vYYD7Es9.png",
    description: "The SDA50S60-TC is a DIN rail mounted SSR with blue housing and compact aluminum heatsink for panel mounting applications.",
    features: [
      "50A load capacity",
      "24-600VAC output",
      "Blue housing design",
      "Compact heatsink",
      "DIN rail compatible",
      "CE certified"
    ],
    specifications: [
      { label: "Model", value: "SDA50S60-TC" },
      { label: "Output Voltage", value: "24-600VAC" },
      { label: "Load Current", value: "50A" },
      { label: "Control Input", value: "4-32VDC" },
      { label: "Mounting", value: "DIN Rail" },
    ],
    relatedProducts: ["sda50s60-tc-heatsink", "sda50s60-td-series", "sda100s60-td-series"]
  },
  {
    id: "sda50s60-tc-heatsink",
    name: "SDA50S60-TC with Large Heatsink",
    model: "SDA50S60-TC",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA50S60-TC%20Series%20Solid%20State%20Relay-l9kCJgTVMsWkKDzT6REjgHUkJcpC5I.png",
    description: "The SDA50S60-TC with large aluminum heatsink provides enhanced thermal performance for high-duty cycle applications.",
    features: [
      "50A load capacity",
      "Large aluminum heatsink",
      "Enhanced cooling",
      "Blue housing design",
      "Panel mount bracket",
      "High duty cycle capable"
    ],
    specifications: [
      { label: "Model", value: "SDA50S60-TC" },
      { label: "Output Voltage", value: "24-600VAC" },
      { label: "Load Current", value: "50A" },
      { label: "Heatsink", value: "Large aluminum" },
      { label: "Mounting", value: "Panel/DIN Rail" },
    ],
    relatedProducts: ["sda50s60-tc-series", "sda50s60-td-series", "mxd-b-50-heatsink"]
  },
  {
    id: "sda50s60-td-series",
    name: "SDA50S60-TD DIN Rail SSR",
    model: "SDA50S60-TD",
    category: "din-ssr",
    categoryName: "DIN Rail SSR",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SDA50S60-TD%20Series%20Solid%20State%20Relay-uIXGVt19198pmMvl3edn2s9d2qTXah.png",
    description: "The SDA50S60-TD is a slim profile DIN rail SSR with blue housing, featuring 100A capacity and compact form factor.",
    features: [
      "100A load capacity",
      "24-600VAC output",
      "4-32VDC control input",
      "Slim blue housing",
      "DIN rail mounting",
      "CE certified"
    ],
    specifications: [
      { label: "Model", value: "SDA50S60-TD" },
      { label: "Output Voltage", value: "24-600VAC" },
      { label: "Load Current", value: "100A" },
      { label: "Control Input", value: "4-32VDC" },
      { label: "Mounting", value: "DIN Rail" },
    ],
    relatedProducts: ["sda100s60-td-series", "sda50s60-tc-series", "sda25s48-tb-series"]
  },

  // ==================== Temperature Controller ====================
  {
    id: "ai-7248d71j7",
    name: "AI-7248D71J7 4-Channel Temperature Controller",
    model: "AI-7248D71J7",
    category: "temperature-controller",
    categoryName: "Temperature Controller",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI-7248D71J7%20%280.3%20Accuracy%20Level%29%204-Channel-8YLkZ6QmZIuPMsUo2QjFmxzJQdguaO.png",
    description: "The AI-7248D71J7 is a high-precision 4-channel DIN rail mount temperature controller with 0.3 accuracy level, featuring bright multi-color LED displays.",
    features: [
      "4-channel simultaneous control",
      "0.3 accuracy level",
      "Multi-color LED display",
      "DIN rail mount design",
      "AM/RUN/STOP modes",
      "Compact modular design"
    ],
    specifications: [
      { label: "Model", value: "AI-7248D71J7" },
      { label: "Channels", value: "4" },
      { label: "Accuracy", value: "0.3 Level" },
      { label: "Display", value: "7-segment LED" },
      { label: "Mounting", value: "DIN Rail" },
    ],
    relatedProducts: ["ai-207d21d21g1"]
  },
  {
    id: "ai-207d21d21g1",
    name: "AI-207D21D21G1 Smart Temperature Controller",
    model: "AI-207D21D21G1",
    category: "temperature-controller",
    categoryName: "Temperature Controller",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI-207D21D21G1%C2%A0Smart%20Sensor%20Unit-eNQHxaD8rjJocm3CV5TKPWMzsttWbm.png",
    description: "The AI-207D21D21G1 is a compact panel-mount smart temperature controller with dual display showing PV and SV values, featuring auto-tuning PID control.",
    features: [
      "Dual PV/SV display",
      "Auto-tuning PID control",
      "Panel mount 48x48mm",
      "Multiple output options",
      "AT/RUN/STOP functions",
      "YUDIAN brand quality"
    ],
    specifications: [
      { label: "Model", value: "AI-207D21D21G1" },
      { label: "Panel Size", value: "48x48mm" },
      { label: "Display", value: "Dual 3-digit LED" },
      { label: "Control", value: "PID with Auto-tune" },
      { label: "Brand", value: "YUDIAN" },
    ],
    relatedProducts: ["ai-7248d71j7"]
  },

  // ==================== Electromagnetic Relay ====================
  {
    id: "rkf4co730lt",
    name: "RKF4CO730LT Interface Relay",
    model: "RKF4CO730LT",
    category: "electromagnetic-relay",
    categoryName: "Electromagnetic Relay",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RKF4CO730LT%C2%A0Interface%20Component-RE4X5JmJUCy4uN1YDHYr6mmW0gVEem.png",
    description: "The RKF4CO730LT is a transparent housing electromagnetic relay with red test button, designed for interface and control applications.",
    features: [
      "Transparent housing",
      "Red manual test button",
      "230VAC coil voltage",
      "4CO contact configuration",
      "Shenler brand quality",
      "Clear contact visibility"
    ],
    specifications: [
      { label: "Model", value: "RKF4CO730LT" },
      { label: "Coil Voltage", value: "230VAC" },
      { label: "Contact Config", value: "4CO" },
      { label: "Housing", value: "Transparent" },
      { label: "Brand", value: "Shenler" },
    ],
    relatedProducts: ["rt4sp-d24-mounting-base", "sc0205-n-relay-base"]
  },

  // ==================== Relay Socket & Base ====================
  {
    id: "rt4sp-d24-mounting-base",
    name: "RT4SP-D24 Relay Mounting Base",
    model: "RT4SP-D24",
    category: "relay-socket",
    categoryName: "Relay Socket & Base",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RT4SP-D24%C2%A0Dedicated%20Mounting%20Base-lEI4DCZ16KGkwfqyGa9SrhoQ8OQbTU.png",
    description: "The RT4SP-D24 is a dedicated mounting base for relay modules, featuring transparent cover and multiple terminal connections.",
    features: [
      "Dedicated relay mounting base",
      "24VDC coil compatible",
      "Transparent protective cover",
      "Multiple screw terminals",
      "CE certified",
      "Compact footprint"
    ],
    specifications: [
      { label: "Model", value: "RT4SP-D24" },
      { label: "Coil Voltage", value: "24VDC" },
      { label: "Contact Rating", value: "6A 250VAC" },
      { label: "Terminals", value: "Screw type" },
      { label: "Cover", value: "Transparent" },
    ],
    relatedProducts: ["rkf4co730lt", "sc0205-n-relay-base"]
  },
  {
    id: "sc0205-n-relay-base",
    name: "SC0205-N Thin Rail Relay Base",
    model: "SC0205-N",
    category: "relay-socket",
    categoryName: "Relay Socket & Base",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SC0205-N%20Thin%20Rail%20Relay%20Base-a7vuubfnGLVqYR3n6zWIpzWbiqt1ec.png",
    description: "The SC0205-N is a thin profile DIN rail relay base with integrated protection and indication circuit, compatible with SDK32 series modules.",
    features: [
      "Ultra-thin 6.2mm width",
      "DIN rail mounting",
      "Protection circuit built-in",
      "LED indication circuit",
      "12/24 VAC/DC supply",
      "8A 250VAC contact rating"
    ],
    specifications: [
      { label: "Model", value: "SC0205-N" },
      { label: "Compatible Module", value: "SDK32-07242N" },
      { label: "Supply Voltage", value: "12/24 VAC/DC" },
      { label: "Coil Voltage", value: "12/24 VDC" },
      { label: "Contact Rating", value: "8A 250VAC" },
    ],
    relatedProducts: ["rt4sp-d24-mounting-base", "sda-3hdz-din-mount"]
  },

  // ==================== SSR Radiator & Heatsink ====================
  {
    id: "mxd-b-50-heatsink",
    name: "MXD-B-50 Solid State Cooling Base",
    model: "MXD-B-50",
    category: "ssr-radiator",
    categoryName: "SSR Radiator & Heatsink",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MXD-B-50%C2%A0Solid-State%20Cooling%20Base-hedyXDxameDCNdYL58yOeJE2wqR9oI.png",
    description: "The MXD-B-50 series includes various sizes of aluminum heatsinks designed specifically for solid state relay cooling, with excellent heat dissipation performance.",
    features: [
      "High-quality aluminum construction",
      "Multiple size options",
      "Excellent heat dissipation",
      "Pre-drilled mounting holes",
      "Compatible with various SSR sizes",
      "Natural convection cooling"
    ],
    specifications: [
      { label: "Model", value: "MXD-B-50 Series" },
      { label: "Material", value: "Aluminum" },
      { label: "Finish", value: "Anodized" },
      { label: "Mounting", value: "Screw mount" },
      { label: "Cooling", value: "Natural convection" },
    ],
    relatedProducts: ["saa40s48-series", "h340zf-series", "mtc160a-thermal-series"]
  },
  {
    id: "mtc160a-thermal-series",
    name: "MTC160A Thermal Management Series",
    model: "MTC160A",
    category: "ssr-radiator",
    categoryName: "SSR Radiator & Heatsink",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MTC160A%C2%A0Thermal%20Management%20Series-MXeO5nssUVwzR3w7gfCIYz6K7vikQL.png",
    description: "The MTC160A series is a comprehensive thermal management solution featuring aluminum heatsink with integrated fan for active cooling of high-power SSRs.",
    features: [
      "Active cooling with fan",
      "160A rated capacity",
      "Large aluminum heatsink",
      "Multiple mounting options",
      "Suitable for high-power SSRs",
      "Industrial grade construction"
    ],
    specifications: [
      { label: "Model", value: "MTC160A" },
      { label: "Cooling", value: "Active (Fan)" },
      { label: "Material", value: "Aluminum" },
      { label: "Capacity", value: "160A rated" },
      { label: "Application", value: "High-power SSR cooling" },
    ],
    relatedProducts: ["mxd-b-50-heatsink", "h3300zd-series", "sdi03t340n-series"]
  },

  // ==================== Thyristor Module ====================
  {
    id: "mtc160a-thyristor",
    name: "MTC160A Thyristor Module",
    model: "MTC160A",
    category: "thyristor-module",
    categoryName: "Thyristor Module",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MTC160A%C2%A0Thermal%20Management%20Series-MXeO5nssUVwzR3w7gfCIYz6K7vikQL.png",
    description: "The MTC160A is a high-power thyristor module with integrated heatsink, suitable for power control and industrial automation applications.",
    features: [
      "High power thyristor",
      "160A current rating",
      "Integrated heatsink",
      "Industrial grade",
      "Multiple protection features",
      "Easy installation"
    ],
    specifications: [
      { label: "Model", value: "MTC160A" },
      { label: "Current Rating", value: "160A" },
      { label: "Type", value: "Thyristor Module" },
      { label: "Cooling", value: "Integrated heatsink" },
      { label: "Application", value: "Power control" },
    ],
    relatedProducts: ["h3300zd-series", "sdi03t340n-series", "mtc160a-thermal-series"]
  },
  // ==================== Customer supplied August 2026 catalog ====================
  {
      id: "jgx-1fac",
      name: "JGX-1F(AC) 交流输出差SDK2卧式 Solid State Relay",
      model: "JGX-1F(AC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/jgx-1fac.jpg",
      description: "JGX-1F(AC) 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "JGX-1F(AC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda48s15-t",
      name: "SDA48S15-T 交流输出差SDK2卧式 Solid State Relay",
      model: "SDA48S15-T",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sda48s15-t.jpg",
      description: "SDA48S15-T 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA48S15-T"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk14ac",
      name: "SDK14(AC) 交流输出差SDK2卧式 Solid State Relay",
      model: "SDK14(AC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk14ac.jpg",
      description: "SDK14(AC) 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK14(AC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk24ac",
      name: "SDK24(AC) 交流输出差SDK2卧式 Solid State Relay",
      model: "SDK24(AC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk24ac.jpg",
      description: "SDK24(AC) 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK24(AC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk2ac",
      name: "SDK2卧式（AC） 交流输出差SDK2卧式 Solid State Relay",
      model: "SDK2卧式（AC）",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk2ac.jpg",
      description: "SDK2卧式（AC） 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK2卧式（AC）"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "pcb-sdk2-sdk2ac",
      name: "SDK2（AC） 交流输出差SDK2卧式 Solid State Relay",
      model: "SDK2（AC）",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/pcb-sdk2-sdk2ac.jpg",
      description: "SDK2（AC） 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK2（AC）"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk39ac",
      name: "SDK39(AC) 交流输出差SDK2卧式 Solid State Relay",
      model: "SDK39(AC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk39ac.jpg",
      description: "SDK39(AC) 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK39(AC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk9ac",
      name: "SDK9(AC) 交流输出差SDK2卧式 Solid State Relay",
      model: "SDK9(AC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk9ac.jpg",
      description: "SDK9(AC) 交流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 交流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK9(AC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 交流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "jgx-1fdc",
      name: "JGX-1F(DC) 直流输出差SDK2卧式 Solid State Relay",
      model: "JGX-1F(DC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/jgx-1fdc.jpg",
      description: "JGX-1F(DC) 直流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 直流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "JGX-1F(DC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 直流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk14dc",
      name: "SDK14(DC) 直流输出差SDK2卧式 Solid State Relay",
      model: "SDK14(DC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk14dc.jpg",
      description: "SDK14(DC) 直流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 直流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK14(DC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 直流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk2dc",
      name: "SDK2卧式（DC） 直流输出差SDK2卧式 Solid State Relay",
      model: "SDK2卧式（DC）",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk2dc.jpg",
      description: "SDK2卧式（DC） 直流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 直流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK2卧式（DC）"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 直流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "pcb-sdk2-sdk2dc",
      name: "SDK2（DC） 直流输出差SDK2卧式 Solid State Relay",
      model: "SDK2（DC）",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/pcb-sdk2-sdk2dc.jpg",
      description: "SDK2（DC） 直流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 直流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK2（DC）"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 直流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk39dc",
      name: "SDK39(DC) 直流输出差SDK2卧式 Solid State Relay",
      model: "SDK39(DC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk39dc.jpg",
      description: "SDK39(DC) 直流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 直流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK39(DC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 直流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk9dc",
      name: "SDK9(DC) 直流输出差SDK2卧式 Solid State Relay",
      model: "SDK9(DC)",
      category: "pcb-ssr",
      categoryName: "PCB Solid State Relay",
      image: "/images/products/shengdike-new/sdk9dc.jpg",
      description: "SDK9(DC) 直流输出差SDK2卧式 Solid State Relay is part of the SENNDIK PCB Solid State Relay range for industrial switching and control applications. It is organized from the customer's supplied product catalog under PCB安装 / 直流输出差SDK2卧式.",
      features: [
          "PCB Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK9(DC)"
          },
          {
              label: "Product Family",
              value: "PCB Solid State Relay"
          },
          {
              label: "Catalog Group",
              value: "PCB安装 / 直流输出差SDK2卧式"
          },
          {
              label: "Mounting / Type",
              value: "PCB Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk36",
      name: "SDK36 三相交流输出SDK66 Solid State Relay",
      model: "SDK36",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdk36.png",
      description: "SDK36 三相交流输出SDK66 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 三相交流输出SDK66.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK36"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 三相交流输出SDK66"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "h3f-205snac",
      name: "H3F-205SN(AC) 交流输出 Solid State Relay",
      model: "H3F-205SN(AC)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/h3f-205snac.jpg",
      description: "H3F-205SN(AC) 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "H3F-205SN(AC)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "saat40s60-td",
      name: "SAAT40S60-TD 交流输出 Solid State Relay",
      model: "SAAT40S60-TD",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/saat40s60-td.jpg",
      description: "SAAT40S60-TD 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SAAT40S60-TD"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda40s48-eh",
      name: "SDA40S48-EH 交流输出 Solid State Relay",
      model: "SDA40S48-EH",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sda40s48-eh.jpg",
      description: "SDA40S48-EH 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA40S48-EH"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda40s60-ta",
      name: "SDA40S60-TA 交流输出 Solid State Relay",
      model: "SDA40S60-TA",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sda40s60-ta.jpg",
      description: "SDA40S60-TA 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA40S60-TA"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda40s60-tb",
      name: "SDA40S60-TB 交流输出 Solid State Relay",
      model: "SDA40S60-TB",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sda40s60-tb.jpg",
      description: "SDA40S60-TB 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA40S60-TB"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda40s60-tc",
      name: "SDA40S60-TC 交流输出 Solid State Relay",
      model: "SDA40S60-TC",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sda40s60-tc.jpg",
      description: "SDA40S60-TC 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA40S60-TC"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd-5s48",
      name: "SDD-5S48 交流输出 Solid State Relay",
      model: "SDD-5S48",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdd-5s48.jpg",
      description: "SDD-5S48 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD-5S48"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk24c5ac",
      name: "SDK24C5(AC) 交流输出 Solid State Relay",
      model: "SDK24C5(AC)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdk24c5ac.jpg",
      description: "SDK24C5(AC) 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK24C5(AC)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk32ac",
      name: "SDK32(卧式AC) 交流输出 Solid State Relay",
      model: "SDK32(卧式AC)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdk32ac.png",
      description: "SDK32(卧式AC) 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK32(卧式AC)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk32ac-2",
      name: "SDK32(立式AC) 交流输出 Solid State Relay",
      model: "SDK32(立式AC)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdk32ac-2.jpg",
      description: "SDK32(立式AC) 交流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 交流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK32(立式AC)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda-3hdz",
      name: "SDA-3HDZ 双路交流 Solid State Relay",
      model: "SDA-3HDZ",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sda-3hdz.jpg",
      description: "SDA-3HDZ 双路交流 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 双路交流.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA-3HDZ"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 双路交流"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "srs1",
      name: "SRS1(双路交流) 双路交流 Solid State Relay",
      model: "SRS1(双路交流)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/srs1.jpg",
      description: "SRS1(双路交流) 双路交流 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 双路交流.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SRS1(双路交流)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 双路交流"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd-10hdz",
      name: "SDD-10HDZ(一开一闭) 双路直流 Solid State Relay",
      model: "SDD-10HDZ(一开一闭)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdd-10hdz.jpg",
      description: "SDD-10HDZ(一开一闭) 双路直流 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 双路直流.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD-10HDZ(一开一闭)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 双路直流"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd-10hhz",
      name: "SDD-10HHZ(两常开) 双路直流 Solid State Relay",
      model: "SDD-10HHZ(两常开)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdd-10hhz.jpg",
      description: "SDD-10HHZ(两常开) 双路直流 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 双路直流.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD-10HHZ(两常开)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 双路直流"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd-3hdz",
      name: "SDD-3HDZ 双路直流 Solid State Relay",
      model: "SDD-3HDZ",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdd-3hdz.jpg",
      description: "SDD-3HDZ 双路直流 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 双路直流.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD-3HDZ"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 双路直流"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "h3fd-x05sndc",
      name: "H3FD-X05SN(DC) 直流输出 Solid State Relay",
      model: "H3FD-X05SN(DC)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/h3fd-x05sndc.jpg",
      description: "H3FD-X05SN(DC) 直流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 直流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "H3FD-X05SN(DC)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 直流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd-10hz",
      name: "SDD-10HZ(单常开) 直流输出 Solid State Relay",
      model: "SDD-10HZ(单常开)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdd-10hz.jpg",
      description: "SDD-10HZ(单常开) 直流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 直流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD-10HZ(单常开)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 直流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd-5s06",
      name: "SDD-5S06 直流输出 Solid State Relay",
      model: "SDD-5S06",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdd-5s06.jpg",
      description: "SDD-5S06 直流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 直流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD-5S06"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 直流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd40s60-td",
      name: "SDD40S60-TD 直流输出 Solid State Relay",
      model: "SDD40S60-TD",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdd40s60-td.jpg",
      description: "SDD40S60-TD 直流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 直流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD40S60-TD"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 直流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk06dc",
      name: "SDK06(DC) 直流输出 Solid State Relay",
      model: "SDK06(DC)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdk06dc.jpg",
      description: "SDK06(DC) 直流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 直流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK06(DC)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 直流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk32dc",
      name: "SDK32(立式DC) 直流输出 Solid State Relay",
      model: "SDK32(立式DC)",
      category: "din-ssr",
      categoryName: "DIN Rail SSR",
      image: "/images/products/shengdike-new/sdk32dc.jpg",
      description: "SDK32(立式DC) 直流输出 Solid State Relay is part of the SENNDIK DIN Rail SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 导轨安装 / 直流输出.",
      features: [
          "DIN Rail Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK32(立式DC)"
          },
          {
              label: "Product Family",
              value: "DIN Rail SSR"
          },
          {
              label: "Catalog Group",
              value: "导轨安装 / 直流输出"
          },
          {
              label: "Mounting / Type",
              value: "DIN Rail Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "zac10",
      name: "ZAC10 Solid State Relay",
      model: "ZAC10",
      category: "temperature-controller",
      categoryName: "Temperature Controller",
      image: "/images/products/shengdike-new/zac10.jpg",
      description: "ZAC10 Solid State Relay is part of the SENNDIK Temperature Controller range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 工业控制器.",
      features: [
          "Industrial Controller product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "ZAC10"
          },
          {
              label: "Product Family",
              value: "Temperature Controller"
          },
          {
              label: "Catalog Group",
              value: "工业控制器"
          },
          {
              label: "Mounting / Type",
              value: "Industrial Controller"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdi",
      name: "SDI 交流输出 Solid State Relay",
      model: "SDI",
      category: "industrial-ssr",
      categoryName: "Industrial Grade SSR",
      image: "/images/products/shengdike-new/sdi.jpg",
      description: "SDI 交流输出 Solid State Relay is part of the SENNDIK Industrial Grade SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 工业级固态继电器 / 交流输出.",
      features: [
          "Industrial Grade product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDI"
          },
          {
              label: "Product Family",
              value: "Industrial Grade SSR"
          },
          {
              label: "Catalog Group",
              value: "工业级固态继电器 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Industrial Grade"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd300s06",
      name: "SDD300S06 Solid State Relay",
      model: "SDD300S06",
      category: "industrial-ssr",
      categoryName: "Industrial Grade SSR",
      image: "/images/products/shengdike-new/sdd300s06.jpg",
      description: "SDD300S06 Solid State Relay is part of the SENNDIK Industrial Grade SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 工业级固态继电器.",
      features: [
          "Industrial Grade product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD300S06"
          },
          {
              label: "Product Family",
              value: "Industrial Grade SSR"
          },
          {
              label: "Catalog Group",
              value: "工业级固态继电器"
          },
          {
              label: "Mounting / Type",
              value: "Industrial Grade"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk37",
      name: "SDK37 三相输出 Solid State Relay",
      model: "SDK37",
      category: "power-regulator",
      categoryName: "Power Regulator",
      image: "/images/products/shengdike-new/sdk37.jpg",
      description: "SDK37 三相输出 Solid State Relay is part of the SENNDIK Power Regulator range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 电力调整器 / 三相输出.",
      features: [
          "三相输出 product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK37"
          },
          {
              label: "Product Family",
              value: "Power Regulator"
          },
          {
              label: "Catalog Group",
              value: "电力调整器 / 三相输出"
          },
          {
              label: "Mounting / Type",
              value: "三相输出"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk13",
      name: "SDK13 单相输出 Solid State Relay",
      model: "SDK13",
      category: "power-regulator",
      categoryName: "Power Regulator",
      image: "/images/products/shengdike-new/sdk13.png",
      description: "SDK13 单相输出 Solid State Relay is part of the SENNDIK Power Regulator range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 电力调整器 / 单相输出.",
      features: [
          "单相输出 product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK13"
          },
          {
              label: "Product Family",
              value: "Power Regulator"
          },
          {
              label: "Catalog Group",
              value: "电力调整器 / 单相输出"
          },
          {
              label: "Mounting / Type",
              value: "单相输出"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk23",
      name: "SDK23 单相输出 Solid State Relay",
      model: "SDK23",
      category: "power-regulator",
      categoryName: "Power Regulator",
      image: "/images/products/shengdike-new/sdk23.png",
      description: "SDK23 单相输出 Solid State Relay is part of the SENNDIK Power Regulator range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 电力调整器 / 单相输出.",
      features: [
          "单相输出 product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK23"
          },
          {
              label: "Product Family",
              value: "Power Regulator"
          },
          {
              label: "Catalog Group",
              value: "电力调整器 / 单相输出"
          },
          {
              label: "Mounting / Type",
              value: "单相输出"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk27",
      name: "SDK27 单相输出 Solid State Relay",
      model: "SDK27",
      category: "power-regulator",
      categoryName: "Power Regulator",
      image: "/images/products/shengdike-new/sdk27.jpg",
      description: "SDK27 单相输出 Solid State Relay is part of the SENNDIK Power Regulator range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 电力调整器 / 单相输出.",
      features: [
          "单相输出 product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK27"
          },
          {
              label: "Product Family",
              value: "Power Regulator"
          },
          {
              label: "Catalog Group",
              value: "电力调整器 / 单相输出"
          },
          {
              label: "Mounting / Type",
              value: "单相输出"
          }
      ],
      relatedProducts: []
  },
  {
      id: "saa40s48",
      name: "SAA40S48(交流控制交流) 交流输出 Solid State Relay",
      model: "SAA40S48(交流控制交流)",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/saa40s48.jpg",
      description: "SAA40S48(交流控制交流) 交流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 交流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SAA40S48(交流控制交流)"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda-10s38-f",
      name: "SDA-10S38-F(内置熔断器) 交流输出 Solid State Relay",
      model: "SDA-10S38-F(内置熔断器)",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/sda-10s38-f.jpg",
      description: "SDA-10S38-F(内置熔断器) 交流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 交流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA-10S38-F(内置熔断器)"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda10s48",
      name: "SDA10S48（直流控制交流） 交流输出 Solid State Relay",
      model: "SDA10S48（直流控制交流）",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/sda10s48.jpg",
      description: "SDA10S48（直流控制交流） 交流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 交流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA10S48（直流控制交流）"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda25",
      name: "SDA25（诊断） 交流输出 Solid State Relay",
      model: "SDA25（诊断）",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/sda25.png",
      description: "SDA25（诊断） 交流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 交流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA25（诊断）"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda3ip20",
      name: "SDA3(IP20) 交流输出 Solid State Relay",
      model: "SDA3(IP20)",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/sda3ip20.jpg",
      description: "SDA3(IP20) 交流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 交流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA3(IP20)"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk41",
      name: "SDK41 交流输出 Solid State Relay",
      model: "SDK41",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/sdk41.jpg",
      description: "SDK41 交流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 交流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK41"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdk43",
      name: "SDK43 交流输出 Solid State Relay",
      model: "SDK43",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/sdk43.jpg",
      description: "SDK43 交流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 交流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDK43"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 交流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sda25sd600",
      name: "SDA25SD600 双路交流 Solid State Relay",
      model: "SDA25SD600",
      category: "two-phase-ssr",
      categoryName: "Two-phase SSR",
      image: "/images/products/shengdike-new/sda25sd600.jpg",
      description: "SDA25SD600 双路交流 Solid State Relay is part of the SENNDIK Two-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 双路交流.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDA25SD600"
          },
          {
              label: "Product Family",
              value: "Two-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 双路交流"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  },
  {
      id: "sdd10s06",
      name: "SDD10S06 直流输出 Solid State Relay",
      model: "SDD10S06",
      category: "single-phase-ssr",
      categoryName: "Single-phase SSR",
      image: "/images/products/shengdike-new/sdd10s06.jpg",
      description: "SDD10S06 直流输出 Solid State Relay is part of the SENNDIK Single-phase SSR range for industrial switching and control applications. It is organized from the customer's supplied product catalog under 面板安装 / 直流输出.",
      features: [
          "Panel Mount product configuration",
          "Designed for industrial switching and control applications",
          "SENNDIK product family with catalog-based model organization",
          "Suitable for OEM selection, replacement, and project matching"
      ],
      specifications: [
          {
              label: "Model",
              value: "SDD10S06"
          },
          {
              label: "Product Family",
              value: "Single-phase SSR"
          },
          {
              label: "Catalog Group",
              value: "面板安装 / 直流输出"
          },
          {
              label: "Mounting / Type",
              value: "Panel Mount"
          }
      ],
      relatedProducts: []
  }

]

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p?.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "all") return products.filter(Boolean)
  return products.filter((p) => p?.category === categorySlug)
}

export function getCategoryBySlug(slug: string) {
  return productCategories.find((c) => c.slug === slug)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product?.relatedProducts) return []
  return product.relatedProducts
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined)
}

export function getProductsInSameCategory(productId: string, limit = 4): Product[] {
  const product = getProductById(productId)
  if (!product) return []
  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit)
}

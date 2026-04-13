"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { PageHero } from "@/components/shared/page-hero"
import { Building2, Award, Users, Factory } from "lucide-react"

const strengthTabs = [
  {
    icon: Building2,
    title: "Leading R&D and innovation capabilities",
    active: true,
  },
  {
    icon: Award,
    title: "Industry-leading production capabilities",
  },
  {
    icon: Users,
    title: "Industry-leading customer service capabilities",
  },
]

const manufacturingSteps = [
  {
    number: "01",
    title: "PCBA manufacture",
    description: "We have SMT manufacture technology, all components are sold on PCB board (customization is available), involving dip soldering and SMD repairing.",
    image: "/images/about/strength/pcba.jpg",
  },
  {
    number: "02",
    title: "Accessories soldering - SSR Load terminal",
    description: "Product heat dissipation area and power (N.O) Load terminal: Automatic soldering machine: Fixed spot soldering, dipping the solder paste and furnace soldering to the temperature settings high frequency induction heater: heating with high consistency for reliable soldering.",
    image: "/images/about/strength/soldering.jpg",
  },
  {
    number: "03",
    title: "Accessories soldering - Power component pins and relative circuits on PCB board",
    description: "Pneumatic/electronic Spot-welding: any specs can be soldered, Automatic soldering: pre-tin and position to prevent cold soldering, wave soldering and automatic angle and parameter setting reduces the defect rate of product soldering for special specified module and relays only.",
    image: "/images/about/strength/pcb-soldering.jpg",
  },
  {
    number: "04",
    title: "DCBA manufacture - Solder paste dispensing for DCBA terminals",
    description: "Visual Positioning: 2 CCD cameras locate vision position with high accuracy. New vacuum pin sensor: 5.0mm Automatic Dispensing: solder height tracking with the side suction of high-quality and precision with a high-precision intelligent paste dispenser, maintaining the same amount and high-accuracy for normal solder paste.",
    image: "/images/about/strength/dcba-dispensing.jpg",
  },
  {
    number: "05",
    title: "DCBA manufacture - DCBA soldering",
    description: "Re-flow-less SMD surface mount device re-soldering. All chips will get board 100% visual checking before post-assembly.",
    image: "/images/about/strength/dcba-soldering.jpg",
  },
  {
    number: "06",
    title: "DCBA manufacture - DCBA cleaning",
    description: "Ultrasonic PCB Cleaning: Adopting 2D ULTRASONIC CLEAN PCB cleaner (s) is automatically done from 99%.",
    image: "/images/about/strength/dcba-cleaning.jpg",
  },
  {
    number: "07",
    title: "DCBA manufacture - DCBA potting",
    description: "Automatic vacuum potting can realize A/B glue precise proportioning, air bubble remove by all index after the chip is sealed, and effective complete performance as stated.",
    image: "/images/about/strength/dcba-potting.jpg",
  },
  {
    number: "08",
    title: "Semi-finished product parameter test / Finished product parameter test",
    description: "CCD automatic parameter collection: Every Factory ID data to calculate test data accuracy automatically from accuracy test. Each product will have a sticker with barcode and QC passed identification for traceability.",
    image: "/images/about/strength/parameter-test.jpg",
  },
  {
    number: "09",
    title: "Full load aging test",
    description: "All finished goods will be connected with sufficient load sufficient by charging battery temperature of 25°C for 24hrs in aging. All this condition test for a minimum aging test time for durability during testing to match the functional tests responsibly.",
    image: "/images/about/strength/aging-test.jpg",
  },
]

export default function CompanyStrengthPage() {
  const introRef = useRef(null)
  const manufacturingRef = useRef(null)
  const isIntroInView = useInView(introRef, { once: true, margin: "-100px" })
  const isManufacturingInView = useInView(manufacturingRef, { once: true, margin: "-100px" })

  return (
    <>
      <PageHero
        title="Company Strength"
        backgroundImage="/images/about/company-strength-hero.jpg"
        icon={<Factory className="w-10 h-10 text-white" />}
      />

      {/* Strength Tabs Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {strengthTabs.map((tab, index) => (
              <div
                key={tab.title}
                className={`flex items-center gap-4 p-6 rounded-lg cursor-pointer transition-all ${
                  tab.active
                    ? "bg-[#E94709] text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <tab.icon className={`w-8 h-8 ${tab.active ? "text-white" : "text-[#E94709]"}`} />
                <span className="font-medium">{tab.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Stats Section */}
      <section ref={introRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-4xl text-[#E94709]">01</span>
                </h3>
                <ul className="mt-6 space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E94709] font-bold">12000m²</span>
                    <span>Production area</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E94709] font-bold">•</span>
                    <span>Industry-leading Production Capacity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E94709] font-bold">•</span>
                    <span>Fully Visualized Via Video Supply Chain System</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E94709] font-bold">•</span>
                    <span>1% Lean Lead manufacturing Experience</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isIntroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="/images/about/strength/production-line.jpg"
                  alt="Production Line"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-4xl text-[#E94709]">02</span>
                </h3>
                <ul className="mt-6 space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="text-[#E94709] font-bold">•</span>
                    <span>Information Production Management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E94709] font-bold">•</span>
                    <span>Scale Automated Production</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#E94709] font-bold">•</span>
                    <span>Automated Storage and Retrieval System</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manufacturing Section */}
      <section ref={manufacturingRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isManufacturingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-6xl font-bold text-gray-200">03</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Introduction to
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-[#E94709]">
              Manufacture and Test equipment
            </h3>
          </motion.div>

          {/* Manufacturing Steps */}
          <div className="space-y-16">
            {manufacturingSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isManufacturingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className={`relative h-[300px] rounded-lg overflow-hidden ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

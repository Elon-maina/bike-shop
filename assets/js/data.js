/* Shop settings and catalogue. Edit this file to change the brand, contacts and products. */
window.SHOP = {
  name: "RideOn",
  tagline: "Cycles",
  about: "Bikes, parts and expert servicing, delivered across Kenya.",
  phone: "+254700000000",
  phoneDisplay: "+254 700 000 000",
  whatsapp: "254700000000",
  email: "hello@rideon.example",
  delivery: [
    { id: "nbo", name: "Nairobi next-day delivery", note: "Own rider, Nairobi & surroundings", fee: 190 },
    { id: "ctry", name: "Countrywide courier", note: "2-3 working days", fee: 360 },
    { id: "pick", name: "Pick up from store", note: "Ready same day", fee: 0 }
  ],
  freeDeliveryOver: 15000,

  menu: [
    { slug: "bikes", name: "Bikes", art: "mtb", children: [
      { slug: "mountain", name: "Mountain", art: "mtb" },
      { slug: "road", name: "Road", art: "road" },
      { slug: "hybrid", name: "Hybrid & City", art: "hybrid" },
      { slug: "electric", name: "Electric", art: "ebike" },
      { slug: "kids", name: "Kids", art: "kids" },
      { slug: "folding", name: "Folding", art: "folding" },
      { slug: "bmx", name: "BMX", art: "bmx" }
    ]},
    { slug: "parts", name: "Parts & Components", art: "chain", children: [
      { slug: "tyres", name: "Tyres & Tubes", art: "tyre" },
      { slug: "drivetrain", name: "Drivetrain", art: "chain" },
      { slug: "brakes", name: "Brakes", art: "brake" },
      { slug: "saddles", name: "Saddles & Seatposts", art: "saddle" },
      { slug: "pedals", name: "Pedals", art: "pedal" }
    ]},
    { slug: "accessories", name: "Accessories", art: "light", children: [
      { slug: "lights", name: "Lights", art: "light" },
      { slug: "locks", name: "Locks & Security", art: "lock" },
      { slug: "pumps", name: "Pumps", art: "pump" },
      { slug: "bottles", name: "Bottles & Cages", art: "bottle" },
      { slug: "bags", name: "Bags & Carriers", art: "bag" }
    ]},
    { slug: "clothing", name: "Clothing & Helmets", art: "helmet", children: [
      { slug: "helmets", name: "Helmets", art: "helmet" },
      { slug: "gloves", name: "Gloves", art: "gloves" },
      { slug: "hivis", name: "Hi-Vis & Safety", art: "vest" }
    ]},
    { slug: "tools", name: "Tools & Care", art: "tool", children: [
      { slug: "toolkits", name: "Tools", art: "tool" },
      { slug: "lubricants", name: "Lubricants", art: "lube" },
      { slug: "workstands", name: "Workstands", art: "stand" }
    ]}
  ],

  products: [
    { id: "trailblazer-29", name: "Trailblazer 29\" Hardtail Mountain Bike", cat: "mountain", art: "mtb", brand: "RideOn", price: 68500, was: 74000, rating: 4.8, reviews: 23, stock: 6, colors: ["Red", "Black"], tags: ["best", "deal"],
      desc: "A tough 29-inch hardtail built for Kenyan trails and murram roads. Lightweight alloy frame, 100 mm suspension fork, hydraulic disc brakes and a wide 1x12 gear range for steep climbs.",
      specs: { Frame: "6061 alloy", Fork: "100 mm air, lockout", Gears: "1x12 speed", Brakes: "Hydraulic disc", Wheels: "29\"", Weight: "13.4 kg" } },
    { id: "ridge-275", name: "Ridge 27.5\" Trail Mountain Bike", cat: "mountain", art: "mtb", brand: "Kestrel", price: 54900, rating: 4.6, reviews: 15, stock: 4, colors: ["Teal", "Grey"], tags: ["new"],
      desc: "Nimble 27.5-inch trail bike for riders who want fun handling and confidence on rough ground.",
      specs: { Frame: "Alloy", Fork: "80 mm coil", Gears: "2x9 speed", Brakes: "Mechanical disc", Wheels: "27.5\"", Weight: "14.2 kg" } },
    { id: "swift-700c", name: "Swift 700c Road Bike", cat: "road", art: "road", brand: "Kestrel", price: 89000, was: 96000, rating: 4.9, reviews: 11, stock: 2, colors: ["Blue", "White"], tags: ["deal"],
      desc: "Fast, light and comfortable over long distances. Ideal for the Nairobi–Naivasha weekend ride.",
      specs: { Frame: "Carbon fork, alloy frame", Gears: "2x11 speed", Brakes: "Dual-pivot rim", Wheels: "700c", Weight: "9.6 kg" } },
    { id: "metro-hybrid", name: "Metro 700c Hybrid City Bike", cat: "hybrid", art: "hybrid", brand: "RideOn", price: 42500, rating: 4.5, reviews: 19, stock: 9, colors: ["Orange", "Black"], tags: ["best"],
      desc: "An upright, comfortable commuter with fast-rolling tyres, mudguard mounts and a rack mount.",
      specs: { Frame: "Alloy", Gears: "3x7 speed", Brakes: "V-brake", Wheels: "700c", Weight: "12.8 kg" } },
    { id: "volt-ebike", name: "Volt 250W Electric City Bike", cat: "electric", art: "ebike", brand: "Volt", price: 145000, rating: 4.7, reviews: 8, stock: 3, colors: ["Black", "Silver"], tags: ["new"],
      desc: "Pedal-assist e-bike with up to 60 km range. Beat the traffic and arrive fresh.",
      specs: { Motor: "250 W rear hub", Battery: "36 V 10.4 Ah, removable", Range: "Up to 60 km", Charge: "4-5 hours", Weight: "21 kg" } },
    { id: "junior-20", name: "Junior 20\" Kids Bike (7-10 yrs)", cat: "kids", art: "kids", brand: "RideOn", price: 18500, rating: 4.8, reviews: 31, stock: 12, colors: ["Pink", "Blue"], tags: ["best"],
      desc: "A safe, light first geared bike for growing riders, with easy-reach brake levers.",
      specs: { Age: "7-10 years", Wheels: "20\"", Gears: "6 speed", Brakes: "V-brake", Weight: "10.5 kg" } },
    { id: "tiny-rider-16", name: "Tiny Rider 16\" Kids Bike with Stabilisers", cat: "kids", art: "kids", brand: "RideOn", price: 14500, was: 16000, rating: 4.7, reviews: 27, stock: 7, colors: ["Mint", "Red"], tags: ["deal"],
      desc: "Comes with removable stabilisers, a chain guard and a bell.",
      specs: { Age: "4-6 years", Wheels: "16\"", Gears: "Single speed", Brakes: "Front + coaster", Weight: "8.9 kg" } },
    { id: "foldit-20", name: "Fold-It 20\" Folding Bike", cat: "folding", art: "folding", brand: "Urbano", price: 39900, rating: 4.4, reviews: 9, stock: 5, colors: ["Grey", "Yellow"], tags: [],
      desc: "Folds in 15 seconds to fit car boots, matatus and small apartments.",
      specs: { Frame: "Alloy, folding", Gears: "7 speed", Wheels: "20\"", Folded: "80 x 64 x 35 cm", Weight: "12 kg" } },
    { id: "street-bmx", name: "Street 20\" BMX", cat: "bmx", art: "bmx", brand: "Kestrel", price: 24900, rating: 4.6, reviews: 12, stock: 0, colors: ["Yellow", "Black"], tags: ["new"],
      desc: "Chromoly-tough BMX with 360° rotor and pegs for street and park.",
      specs: { Frame: "Hi-ten steel", Wheels: "20\"", Brakes: "U-brake", Extras: "Rotor, 4 pegs", Weight: "11.5 kg" } },

    { id: "tubeless-29", name: "Trail Grip Tubeless Tyre 29 x 2.25", cat: "tyres", art: "tyre", brand: "Gripmax", price: 4800, rating: 4.7, reviews: 18, stock: 20, colors: ["Black"], tags: ["best"],
      desc: "Aggressive tread for loose dust and mud. Tubeless-ready with puncture-resistant casing.", specs: { Size: "29 x 2.25", Bead: "Folding", TPI: "60" } },
    { id: "tube-700", name: "Inner Tube 700 x 25-32c (Presta)", cat: "tyres", art: "tube", brand: "Gripmax", price: 650, rating: 4.5, reviews: 40, stock: 60, colors: ["Black"], tags: [],
      desc: "Butyl inner tube with 48 mm Presta valve.", specs: { Size: "700 x 25-32c", Valve: "Presta 48 mm" } },
    { id: "chain-11", name: "11-Speed Chain with Quick Link", cat: "drivetrain", art: "chain", brand: "Linx", price: 3200, rating: 4.6, reviews: 14, stock: 15, colors: ["Silver"], tags: [],
      desc: "Smooth, quiet shifting with a reusable quick link.", specs: { Speeds: "11", Links: "116" } },
    { id: "hydro-brake", name: "Hydraulic Disc Brake Set (Front + Rear)", cat: "brakes", art: "brake", brand: "Stopwell", price: 12500, was: 13900, rating: 4.8, reviews: 10, stock: 4, colors: ["Black"], tags: ["deal"],
      desc: "Two-piston hydraulic brakes with 160 mm rotors. Strong, easy to control stopping.", specs: { Rotors: "160 mm", Pistons: "2", Fluid: "Mineral oil" } },
    { id: "gel-saddle", name: "Comfort Gel Saddle", cat: "saddles", art: "saddle", brand: "RideOn", price: 2900, rating: 4.4, reviews: 22, stock: 18, colors: ["Black", "Red"], tags: [],
      desc: "Wide gel-padded saddle with a pressure-relief channel.", specs: { Width: "155 mm", Rails: "Steel" } },
    { id: "flat-pedals", name: "Flat Alloy Pedals with Pins", cat: "pedals", art: "pedal", brand: "Linx", price: 2400, rating: 4.6, reviews: 16, stock: 0, colors: ["Black", "Orange"], tags: [],
      desc: "Wide platform and replaceable pins for strong grip.", specs: { Body: "Alloy", Axle: "9/16\"", Weight: "380 g / pair" } },

    { id: "front-light-800", name: "USB Rechargeable Front Light 800 lm", cat: "lights", art: "light", brand: "Beam", price: 3500, rating: 4.8, reviews: 35, stock: 25, colors: ["Black"], tags: ["best"],
      desc: "Bright enough for unlit roads, with 5 modes and up to 10 hours of run time.", specs: { Output: "800 lumens", Battery: "USB-C, 2,000 mAh", Waterproof: "IPX5" } },
    { id: "rear-light", name: "Smart Brake Rear Light", cat: "lights", art: "rearlight", brand: "Beam", price: 1200, was: 1500, rating: 4.5, reviews: 21, stock: 30, colors: ["Red"], tags: ["deal"],
      desc: "Gets brighter when you slow down so drivers notice you braking.", specs: { Modes: "6", Battery: "USB-C", Waterproof: "IPX6" } },
    { id: "u-lock", name: "Heavy-Duty U-Lock with Cable", cat: "locks", art: "lock", brand: "Secura", price: 3800, rating: 4.7, reviews: 13, stock: 9, colors: ["Black", "Yellow"], tags: [],
      desc: "16 mm hardened steel shackle plus a 1.2 m cable for the front wheel.", specs: { Shackle: "16 mm", Keys: "3", Cable: "1.2 m" } },
    { id: "mini-pump", name: "Mini Pump with Gauge", cat: "pumps", art: "pump", brand: "Airflow", price: 2600, rating: 4.6, reviews: 29, stock: 22, colors: ["Silver", "Black"], tags: ["best"],
      desc: "Fits Presta and Schrader valves, pumps up to 120 psi, mounts beside your bottle cage.", specs: { Max: "120 psi", Valves: "Presta / Schrader", Length: "21 cm" } },
    { id: "bottle-750", name: "Insulated Water Bottle 750 ml", cat: "bottles", art: "bottle", brand: "RideOn", price: 1200, rating: 4.4, reviews: 17, stock: 40, colors: ["Blue", "Green", "Black"], tags: [],
      desc: "Keeps water cool for up to 2 hours and squeezes easily mid-ride.", specs: { Volume: "750 ml", BPA: "Free" } },
    { id: "pannier-20", name: "Waterproof Pannier Bag 20 L", cat: "bags", art: "bag", brand: "Urbano", price: 5400, rating: 4.7, reviews: 8, stock: 6, colors: ["Black", "Orange"], tags: ["new"],
      desc: "Roll-top waterproof pannier with quick-release hooks and reflective trim.", specs: { Volume: "20 L", Fits: "Most rear racks" } },

    { id: "aero-helmet", name: "Aero MTB Helmet with Visor", cat: "helmets", art: "helmet", brand: "Kestrel", price: 4500, rating: 4.8, reviews: 26, stock: 14, colors: ["Green", "Red", "Black", "White"], tags: ["best", "new"],
      desc: "18 vents, an adjustable fit dial and a removable visor. Certified to EN1078.", specs: { Sizes: "M (54-58), L (58-62)", Vents: "18", Weight: "280 g" } },
    { id: "gloves-ff", name: "Full-Finger Gel Gloves", cat: "gloves", art: "gloves", brand: "Gripmax", price: 1800, rating: 4.5, reviews: 19, stock: 0, colors: ["Black", "Red"], tags: [],
      desc: "Gel palm pads and touchscreen fingertips.", specs: { Sizes: "S-XL", Palm: "Gel padded" } },
    { id: "hivis-vest", name: "Reflective Hi-Vis Vest", cat: "hivis", art: "vest", brand: "RideOn", price: 950, rating: 4.6, reviews: 33, stock: 50, colors: ["Yellow", "Orange"], tags: ["best"],
      desc: "Light, breathable mesh vest with 360° reflective bands.", specs: { Sizes: "One size, adjustable" } },

    { id: "multitool-16", name: "16-in-1 Multi-Tool", cat: "toolkits", art: "tool", brand: "Linx", price: 2200, rating: 4.7, reviews: 24, stock: 16, colors: ["Black", "Red"], tags: [],
      desc: "Hex keys, screwdrivers, chain breaker and spoke keys in one pocket tool.", specs: { Functions: "16", Weight: "160 g" } },
    { id: "chain-lube", name: "Wet Chain Lube 100 ml", cat: "lubricants", art: "lube", brand: "Slick", price: 900, rating: 4.6, reviews: 38, stock: 45, colors: ["Blue"], tags: ["new"],
      desc: "Long-lasting lube for rainy and muddy rides.", specs: { Volume: "100 ml", Type: "Wet" } },
    { id: "repair-stand", name: "Home Repair Workstand", cat: "workstands", art: "stand", brand: "Linx", price: 9800, was: 11500, rating: 4.5, reviews: 6, stock: 3, colors: ["Black"], tags: ["deal"],
      desc: "Folding tripod workstand with a 360° rotating clamp. Holds bikes up to 25 kg.", specs: { Load: "25 kg", Height: "110-160 cm" } }
  ],

  slides: [
    { kicker: "New season", title: "Ride further.<br>Ride stronger.", text: "Mountain, road and city bikes, set up by our mechanics before they leave the shop.", cta: "Shop bikes", href: "shop.html?cat=bikes", art: "mtb", color: "Red", bg: "linear-gradient(120deg,#fff4ec 0%,#ffe3d3 100%)" },
    { kicker: "Stay safe", title: "Gear up<br>for the commute", text: "Helmets, lights and hi-vis that keep you seen on Nairobi roads.", cta: "Shop safety gear", href: "shop.html?cat=clothing", art: "helmet", color: "Green", bg: "linear-gradient(120deg,#eef8f4 0%,#d6f0e6 100%)" },
    { kicker: "Little riders", title: "Their first<br>real bike", text: "Light kids' bikes from 16\" to 24\", with free fitting in store.", cta: "Shop kids bikes", href: "shop.html?cat=kids", art: "kids", color: "Pink", bg: "linear-gradient(120deg,#eef3ff 0%,#dbe5ff 100%)" }
  ],

  posts: [
    { title: "How to pick the right tyre size", date: "2 Nov 2026", art: "tyre", color: "Black",
      body: "Look at the sidewall of your current tyre. You'll see numbers like 29 x 2.25 or 700 x 28c. The first number is the wheel diameter and the second is the tyre width. Match the diameter exactly. You can usually go a little wider or narrower on width, as long as it clears the frame." },
    { title: "5-minute check before every ride", date: "24 Oct 2026", art: "pump", color: "Silver",
      body: "Squeeze both tyres to check the pressure, pull both brake levers, spin each wheel to make sure it runs straight, check the quick-releases are closed, and make sure your lights are charged. It takes five minutes and catches most problems before they leave you stranded." },
    { title: "When does my chain need replacing?", date: "15 Oct 2026", art: "chain", color: "Silver",
      body: "Chains stretch as they wear. A chain checker tool costs little and tells you when you reach 0.5% wear (light riders) or 0.75% (most riders). Replacing the chain on time saves your cassette and chainrings, which cost far more." }
  ],

  stores: [
    { name: "Main Showroom", area: "Westlands, Nairobi", hours: "Mon-Sat 8:30-18:30, Sun 10-16" },
    { name: "Service Centre", area: "Kilimani, Nairobi", hours: "Mon-Sat 8:00-18:00" }
  ]
};

/**
 * Centralized Demo Data: 15 Sovereign Tribal Artisans of Jharkhand & West Bengal
 * Extracted and curated for Maati Ghar & Custodian AI
 * Location: lib/demoData.ts
 */

export interface DemoArtisan {
  id: string;
  name: string;
  hindiName: string;
  olChiki: string;
  artForm:
    | "Sohrai painting"
    | "Santhali Handloom"
    | "Dokra craft"
    | "Santhali Bamboo Craft"
    | "Santhali Embroidery";
  categoryKey:
    | "sohrai-painting"
    | "santhali-handloom"
    | "dokra-craft"
    | "bamboo-craft"
    | "embroidery";
  villageDistrict: string;
  district: string;
  state: "Jharkhand" | "West Bengal";
  coordinates: { xPct: number; yPct: number; latLong: string };
  priceInINR: number;
  artisanShareInINR: number;
  originalStory: string;
  englishStory: string;
  image: string;
  dimensions: string;
  materials: string[];
  giTag?: string;
  inStock: boolean;
}

export const DEMO_ARTISANS: DemoArtisan[] = [
  {
    id: "artisan-birsa-murmu",
    name: "Birsa Murmu",
    hindiName: "बिरसा मुर्मु",
    olChiki: "ᱵᱤᱨᱥᱟᱹ ᱢᱩᱨᱢᱩ",
    artForm: "Sohrai painting",
    categoryKey: "sohrai-painting",
    villageDistrict: "Hazaribagh, Jharkhand",
    district: "Hazaribagh",
    state: "Jharkhand",
    coordinates: { xPct: 37, yPct: 36, latLong: "23°59'N · 85°21'E" },
    priceInINR: 4800,
    artisanShareInINR: 4320,
    originalStory:
      "Birsa mitti ki deewar par janwaron aur kheton ke rang banate hain, jo unhe apne gaon ki purani yaadein yaad dilate hain. Unke liye har rekha zameen aur purkhon ke saath ek rishta hai.",
    englishStory:
      "Birsa paints the colors of forest fauna and crop fields across earthen walls, evoking living memories of his ancestral hamlet. For him, every carved line is an umbilical bond connecting the earth with his forefathers.",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    dimensions: '24" × 18" Framed Mud Board',
    materials: ["Dudhi Kaolin Clay", "River Manganese", "Lalmati Ochre"],
    giTag: "GI Tag #JH-SOHRAI-2020",
    inStock: true,
  },
  {
    id: "artisan-phulo-soren",
    name: "Phulo Soren",
    hindiName: "फुलो सोरेन",
    olChiki: "ᱯᱷᱩᱞᱳ ᱥᱚᱨᱮᱱ",
    artForm: "Santhali Handloom",
    categoryKey: "santhali-handloom",
    villageDistrict: "Dumka, Jharkhand",
    district: "Dumka",
    state: "Jharkhand",
    coordinates: { xPct: 66, yPct: 24, latLong: "24°16'N · 87°15'E" },
    priceInINR: 3200,
    artisanShareInINR: 2880,
    originalStory:
      "Phulo haath se bunai karte hue apni maa se seekhe hue paramparik patterns ko zinda rakhti hain. Har kapde mein unhe apne gaon ke geet aur tyoharon ki tasveer nazar aati hai.",
    englishStory:
      "While hand-weaving at her wooden loom, Phulo keeps alive the ancestral patterns learned from her mother. In every textile, she visualizes the sacred songs and seasonal harvest dances of her village.",
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=1200&q=85",
    dimensions: '2.5m Handwoven Organic Cotton Stole (Panchi Parhan)',
    materials: ["Organic Desi Cotton", "Natural Madder Dye", "Indigo Thread"],
    giTag: "Santhal Parganas Heritage Handloom",
    inStock: true,
  },
  {
    id: "artisan-ramesh-kisku",
    name: "Ramesh Kisku",
    hindiName: "रमेश किस्कू",
    olChiki: "ᱨᱟᱢᱮᱥ ᱠᱤᱥᱠᱩ",
    artForm: "Dokra craft",
    categoryKey: "dokra-craft",
    villageDistrict: "Seraikela-Kharsawan, Jharkhand",
    district: "Seraikela-Kharsawan",
    state: "Jharkhand",
    coordinates: { xPct: 50, yPct: 64, latLong: "22°42'N · 85°55'E" },
    priceInINR: 5600,
    artisanShareInINR: 5040,
    originalStory:
      "Ramesh dhatu ko garam karke chhoti murtiyon mein purani kahaniyon ka roop dete hain. Unka maanna hai ki jab haath mitti aur dhatu ko chhoota hai, tab ek purani kahani dobara janam leti hai.",
    englishStory:
      "Ramesh fires molten alloy in charcoal kilns, casting ancient folklore into miniature bronze figurines. He believes that whenever human hands touch soil and metal together, an ancestral myth is reborn.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
    dimensions: '10" × 6" Solid Cast Bell-Metal Figurine',
    materials: ["Lost-Wax Bronze", "Wild Beeswax", "River Alluvial Core"],
    giTag: "4,000-Yr Metallurgy Guild",
    inStock: true,
  },
  {
    id: "artisan-jamuna-hembram",
    name: "Jamuna Hembram",
    hindiName: "जमुना हेम्ब्रम",
    olChiki: "ᱡᱚᱢᱩᱱᱟ ᱦᱮᱢᱵᱽᱨᱚᱢ",
    artForm: "Sohrai painting",
    categoryKey: "sohrai-painting",
    villageDistrict: "Ramgarh, Jharkhand",
    district: "Ramgarh",
    state: "Jharkhand",
    coordinates: { xPct: 42, yPct: 46, latLong: "23°38'N · 85°31'E" },
    priceInINR: 3900,
    artisanShareInINR: 3510,
    originalStory:
      "Jamuna prakritik mitti ke rangon se ped, pakshi aur pashuon ko apni paintings mein jagah deti hain. Unke liye yeh kala prakriti ke prati shukriya kehne ka ek shaant tareeka hai.",
    englishStory:
      "Jamuna welcomes sacred trees, birds, and cattle into her canvas using unprocessed earth clays. For her, this sacred art is a silent, reverent hymn of gratitude to Mother Nature.",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
    dimensions: '20" × 16" Raw Terracotta Mural Panel',
    materials: ["Lalmati Red Earth", "Dudhi River Clay", "Rice Paste Wash"],
    giTag: "Maati Ghar Ramgarh Collective",
    inStock: true,
  },
  {
    id: "artisan-somai-tudu",
    name: "Somai Tudu",
    hindiName: "सोमाई टुडू",
    olChiki: "ᱥᱳᱢᱟᱭ ᱛᱩᱫᱩ",
    artForm: "Santhali Handloom",
    categoryKey: "santhali-handloom",
    villageDistrict: "Pakur, Jharkhand",
    district: "Pakur",
    state: "Jharkhand",
    coordinates: { xPct: 72, yPct: 20, latLong: "24°38'N · 87°50'E" },
    priceInINR: 4100,
    artisanShareInINR: 3690,
    originalStory:
      "Somai apne kargha par dheere-dheere dhaage jodkar paramparik kapde banate hain. Unki bunai mein unke parivaar ki kai peedhiyon se chali aa rahi yaadein basi hain.",
    englishStory:
      "Somai meticulously unites cotton threads on his pit loom, weaving ceremonial fabrics. Entwined in his rhythmic weaving are generational memories passed through centuries of Santhal artisans.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
    dimensions: '2m Handwoven Tribal Shawl with Temple Border',
    materials: ["Handspun Khadi Cotton", "Vegetable Bark Dye", "Tussar Silk Border"],
    giTag: "Pakur Weaver Collective",
    inStock: true,
  },
  {
    id: "artisan-karmi-baskey",
    name: "Karmi Baskey",
    hindiName: "कर्मी बास्के",
    olChiki: "ᱠᱟᱨᱢᱤ ᱵᱟᱥᱠᱮ",
    artForm: "Dokra craft",
    categoryKey: "dokra-craft",
    villageDistrict: "West Singhbhum, Jharkhand",
    district: "West Singhbhum",
    state: "Jharkhand",
    coordinates: { xPct: 40, yPct: 70, latLong: "22°34'N · 85°48'E" },
    priceInINR: 6200,
    artisanShareInINR: 5580,
    originalStory:
      "Karmi chhoti dhatu ki murtiyon mein nritya, pashu aur gaon ke jeevan ko darshati hain. Har murti banate waqt woh apni dadi se suni hui kahaniyon ko yaad karti hain.",
    englishStory:
      "Karmi manifests folk dances, horned creatures, and tribal village life in miniature bronze. With every sculpture molded, she recalls the enchanting fables whispered by her grandmother by the hearth.",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85",
    dimensions: '12" × 7" Ceremonial Madal Drummer Pair',
    materials: ["Lost-Wax Bronze", "Beeswax Filaments", "Charcoal Smelted Metal"],
    giTag: "Singhbhum Tribal Foundry",
    inStock: true,
  },
  {
    id: "artisan-lakhan-hansda",
    name: "Lakhan Hansda",
    hindiName: "लखन हांसदा",
    olChiki: "ᱞᱟᱠᱷᱚᱱ ᱦᱟᱸᱥᱫᱟ",
    artForm: "Santhali Bamboo Craft",
    categoryKey: "bamboo-craft",
    villageDistrict: "Jhargram, West Bengal",
    district: "Jhargram",
    state: "West Bengal",
    coordinates: { xPct: 68, yPct: 62, latLong: "22°27'N · 86°59'E" },
    priceInINR: 2800,
    artisanShareInINR: 2520,
    originalStory:
      "Lakhan baans ki patli lakdiyon ko haath se modkar tokri aur ghar ke upyogi samaan banate hain. Unke liye baans sirf ek saamagri nahi, balki jungle aur rozmarra ke jeevan ke beech ka sambandh hai.",
    englishStory:
      "Lakhan splits and curves slender forest bamboo reeds by hand into ceremonial baskets and household vessels. To him, bamboo is not merely a material—it is the living bridge between deep Sal forests and daily tribal life.",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=85",
    dimensions: 'Set of 3 Handcrafted Sacred Grain Baskets',
    materials: ["Wild Sal-Forest Bamboo", "Neem Bark Polish", "Natural Jute Fiber"],
    giTag: "Jangalmahal Artisan Guild",
    inStock: true,
  },
  {
    id: "artisan-maya-murmu",
    name: "Maya Murmu",
    hindiName: "माया मुर्मु",
    olChiki: "ᱢᱟᱭᱟ ᱢᱩᱨᱢᱩ",
    artForm: "Sohrai painting",
    categoryKey: "sohrai-painting",
    villageDistrict: "Bokaro, Jharkhand",
    district: "Bokaro",
    state: "Jharkhand",
    coordinates: { xPct: 47, yPct: 42, latLong: "23°40'N · 85°59'E" },
    priceInINR: 4500,
    artisanShareInINR: 4050,
    originalStory:
      "Maya apni paintings mein hiran, bail aur pakshiyon ke roop banakar gaon ki prakritik duniya ko darshati hain. Rang bharte waqt unhe bachpan mein tyohar ke samay ghar sajane ki yaad aati hai.",
    englishStory:
      "Maya paints graceful deer, sacred bulls, and forest birds, recreating her village's natural ecosystem. While spreading earth pigments, she is transported to childhood memories of decorating her mud home for winter festivals.",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    dimensions: '22" × 18" Finger-Combed Earthen Canvas',
    materials: ["Kaolin Dudhimati", "Charcoal Ash", "Pilimati Yellow Ochre"],
    giTag: "GI Tag #JH-SOHRAI-2020",
    inStock: true,
  },
  {
    id: "artisan-chaitan-soren",
    name: "Chaitan Soren",
    hindiName: "चैतन सोरेन",
    olChiki: "ᱪᱟᱭᱛᱟᱱ ᱥᱚᱨᱮᱱ",
    artForm: "Santhali Handloom",
    categoryKey: "santhali-handloom",
    villageDistrict: "Birbhum, West Bengal",
    district: "Birbhum",
    state: "West Bengal",
    coordinates: { xPct: 76, yPct: 40, latLong: "23°50'N · 87°30'E" },
    priceInINR: 3500,
    artisanShareInINR: 3150,
    originalStory:
      "Chaitan paramparik designs ko haath ke kargha par dhairya se bunate hain. Unka har vastra unke liye mitti, parivaar aur samudaay se judi ek chhoti kahani hai.",
    englishStory:
      "Chaitan patiently weaves heritage motifs on his foot-pedal loom. Each garment he produces is an intimate chapter connecting red laterite soil, his household, and his ancestral tribal community.",
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=1200&q=85",
    dimensions: '100% Organic Handwoven Tribal Saree (5.5m)',
    materials: ["Indigenous Cotton", "Turmeric & Pomegranate Dye", "Raw Silk Weft"],
    giTag: "Santhali Weaver Guild",
    inStock: true,
  },
  {
    id: "artisan-sukri-kisku",
    name: "Sukri Kisku",
    hindiName: "सुकरी किस्कू",
    olChiki: "ᱥᱩᱠᱨᱤ ᱠᱤᱥᱠᱩ",
    artForm: "Dokra craft",
    categoryKey: "dokra-craft",
    villageDistrict: "Purulia, West Bengal",
    district: "Purulia",
    state: "West Bengal",
    coordinates: { xPct: 58, yPct: 52, latLong: "23°20'N · 86°22'E" },
    priceInINR: 5900,
    artisanShareInINR: 5310,
    originalStory:
      "Sukri dhatu ki chhoti kalakritiyon mein lok jeevan aur prakriti ke roop banati hain. Unke haathon se nikli har vastu mein unhe apne bachpan ke mela aur gaon ki awaazein sunai deti hain.",
    englishStory:
      "Sukri sculpts folk life and wildlife into lost-wax bronze treasures. In every figurine molded by her fingers, she hears the celebratory echoes of village fairs and the forest sounds of her youth.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
    dimensions: '11" × 8" Tribal Mother with Grain Basket',
    materials: ["Recycled Bell-Metal", "Pure Honeycomb Wax", "Clay Core"],
    giTag: "Bikna Dokra GI Protected",
    inStock: true,
  },
  {
    id: "artisan-madho-tudu",
    name: "Madho Tudu",
    hindiName: "माधो टुडू",
    olChiki: "ᱢᱟᱫᱷᱳ ᱛᱩᱫᱩ",
    artForm: "Santhali Handloom",
    categoryKey: "santhali-handloom",
    villageDistrict: "Godda, Jharkhand",
    district: "Godda",
    state: "Jharkhand",
    coordinates: { xPct: 69, yPct: 15, latLong: "24°49'N · 87°12'E" },
    priceInINR: 3000,
    artisanShareInINR: 2700,
    originalStory:
      "Madho rangin dhaagon ko mila kar paramparik kapde bunne mein apna samay bitate hain. Unke liye kargha ki har aahat ek aisi dhun hai jo unhe apne purkhon ki yaad dilati hai.",
    englishStory:
      "Madho immerses his days in intertwining dyed yarns to craft tribal ceremonial clothing. To his ears, each rhythmic clatter of the loom is a melodious tune summoning memories of his forefathers.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
    dimensions: 'Hand-loomed Cotton Fabric Run (3m)',
    materials: ["Organic Village Cotton", "Indigo & Harda Botanical Dyes"],
    giTag: "Godda Handloom Collective",
    inStock: true,
  },
  {
    id: "artisan-rupa-baskey",
    name: "Rupa Baskey",
    hindiName: "रूपा बास्के",
    olChiki: "ᱨᱩᱯᱟ ᱵᱟᱥᱠᱮ",
    artForm: "Sohrai painting",
    categoryKey: "sohrai-painting",
    villageDistrict: "Jamtara, Jharkhand",
    district: "Jamtara",
    state: "Jharkhand",
    coordinates: { xPct: 56, yPct: 30, latLong: "23°57'N · 86°48'E" },
    priceInINR: 4200,
    artisanShareInINR: 3780,
    originalStory:
      "Rupa deewar par prakriti ke roop banate hue mitti ke saadhaaran rangon ka istemal karti hain. Unki kala mein gaon ke kheton, pashuon aur badalte mausam ki kahani chupkar rehti hai.",
    englishStory:
      "Rupa composes expressions of nature upon village walls using humble earth pigments. Secreted within her brushstrokes are tales of agrarian pastures, beloved cattle, and changing woodland seasons.",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
    dimensions: '20" × 20" Framed Sgraffito Tile',
    materials: ["Manganese River Silt", "Kaolin Dudhimati", "Neem Seed Binder"],
    giTag: "GI Tag #JH-SOHRAI-2020",
    inStock: true,
  },
  {
    id: "artisan-debu-hembram",
    name: "Debu Hembram",
    hindiName: "देबू हेम्ब्रम",
    olChiki: "ᱫᱮᱵᱩ ᱦᱮᱢᱵᱽᱨᱚᱢ",
    artForm: "Dokra craft",
    categoryKey: "dokra-craft",
    villageDistrict: "Bankura, West Bengal",
    district: "Bankura",
    state: "West Bengal",
    coordinates: { xPct: 70, yPct: 54, latLong: "23°14'N · 87°04'E" },
    priceInINR: 6700,
    artisanShareInINR: 6030,
    originalStory:
      "Debu paramparik lost-wax technique se dhatu ki kalakritiyan taiyar karte hain. Unke liye har murti ko banana ek dhairya bhari prakriya hai jisme purani kala ko naye roop mein jeevit rakha jata hai.",
    englishStory:
      "Debu sculpts metal antiquities through the ancient lost-wax process. For him, fashioning every single idol is an act of meditative patience through which centuries-old metallurgy is kept dynamically alive.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
    dimensions: '14" × 9" Royal Tribal Horned Bison',
    materials: ["Bell-Metal Bronze", "Tree Resin", "Beeswax", "Baked Loam"],
    giTag: "Bankura Bell-Metal Heritage",
    inStock: true,
  },
  {
    id: "artisan-sita-soren",
    name: "Sita Soren",
    hindiName: "सीता सोरेन",
    olChiki: "ᱥᱤᱛᱟ ᱥᱚᱨᱮᱱ",
    artForm: "Santhali Embroidery",
    categoryKey: "embroidery",
    villageDistrict: "Malda, West Bengal",
    district: "Malda",
    state: "West Bengal",
    coordinates: { xPct: 78, yPct: 18, latLong: "25°00'N · 88°08'E" },
    priceInINR: 2600,
    artisanShareInINR: 2340,
    originalStory:
      "Sita kapde par rangin dhaagon se phool, pakshi aur paramparik patterns banati hain. Har silai ke saath woh apni maa se seekhi hui kala ko agli peedhi tak pahunchane ka sapna dekhti hain.",
    englishStory:
      "With vibrant threads, Sita embroiders forest blossoms, singing birds, and ancestral motifs into handwoven fabric. With every careful needle stitch, she cherishes the dream of passing her mother's artistry to the next generation.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    dimensions: 'Hand-Embroidered Wall Tapestry (30" × 24")',
    materials: ["Organic Calico Cotton", "Silk Floss Thread", "Vegetable Dye Accents"],
    giTag: "Malda Folk Needlecraft Guild",
    inStock: true,
  },
  {
    id: "artisan-harilal-murmu",
    name: "Harilal Murmu",
    hindiName: "हरीलाल मुर्मु",
    olChiki: "ᱦᱟᱹᱨᱤᱞᱟᱞ ᱢᱩᱨᱢᱩ",
    artForm: "Sohrai painting",
    categoryKey: "sohrai-painting",
    villageDistrict: "Latehar, Jharkhand",
    district: "Latehar",
    state: "Jharkhand",
    coordinates: { xPct: 30, yPct: 40, latLong: "23°44'N · 84°30'E" },
    priceInINR: 5100,
    artisanShareInINR: 4590,
    originalStory:
      "Harilal apni Sohrai paintings mein gaon ke pashuon aur pedon ko gahre prakritik rangon se ubharte hain. Unke liye yeh painting sirf sajawat nahi, balki apni zameen aur samudaay ki kahani ko sambhal kar rakhna hai.",
    englishStory:
      "Harilal brings alive his village's wildlife and sacred Sal trees using intense natural soil dyes. For him, this painting is never mere decoration—it is the holy safe-keeping of his land, his soil, and his tribe's story.",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    dimensions: '28" × 20" Ceremonial Sohrai Harvest Panel',
    materials: ["Manganese Black Mud", "Kaolin Dudhimati", "Forest Geru Red"],
    giTag: "GI Tag #JH-SOHRAI-2020",
    inStock: true,
  },
];

/**
 * Filter helpers
 */
export function getArtisansByCategory(category: string): DemoArtisan[] {
  if (category === "all") return DEMO_ARTISANS;
  return DEMO_ARTISANS.filter((a) => a.categoryKey === category);
}

export function getArtisansByState(state: "Jharkhand" | "West Bengal"): DemoArtisan[] {
  return DEMO_ARTISANS.filter((a) => a.state === state);
}

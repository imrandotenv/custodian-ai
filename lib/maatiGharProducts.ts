/**
 * Maati Ghar Catalog & Products Dataset
 * Faithful replica of https://www.maatighar.com/ products and categories
 * Integrated with Ramgarh Cantt social enterprise & 15 authentic tribal artisans
 */

export interface MaatiProduct {
  id: string;
  title: string;
  hindiTitle?: string;
  category:
    | "hand-painted"
    | "sohrai-paintings"
    | "paitkar-paintings"
    | "khovar-paintings"
    | "jadopatia-paintings"
    | "dhokra"
    | "ledra-textile";
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  details?: string[];
  dimensions?: string;
  materials?: string[];
  artisanName?: string;
  artisanLocation?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CraftCategoryInfo {
  key: MaatiProduct["category"];
  title: string;
  hindiTitle: string;
  description: string;
  link: string;
  bannerImage: string;
}

export const MAATIGHAR_CATEGORIES: CraftCategoryInfo[] = [
  {
    key: "hand-painted",
    title: "Hand-painted Products",
    hindiTitle: "हस्त-चित्रित दैनिक उत्पाद",
    description:
      "Explore our curated collection of meticulously crafted hand-painted products, each a masterpiece of artistry and tradition. Whether adorning your home or gifting to a loved one, they offer a unique blend of tradition and contemporary elegance.",
    link: "/shop?category=hand-painted",
    bannerImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "sohrai-paintings",
    title: "Sohrai Paintings",
    hindiTitle: "सोहराई भित्ति चित्रकला",
    description:
      "Sohrai Painting is a vibrant mural painting tradition predominantly practiced in the quaint villages of Hazaribagh, Jharkhand. During the Sohrai festival, following Diwali, women adorn their mud walls with intricate artworks using natural earth colours.",
    link: "/shop?category=sohrai-paintings",
    bannerImage:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "paitkar-paintings",
    title: "Paitkar Paintings",
    hindiTitle: "पाइतकार प्राचीन स्क्रोल चित्रकला",
    description:
      "Paitkar Painting, a cherished folk art form captivate with their rich narrative tapestries. Crafted by skilled Bengali artists known as 'Chitrakars,' these intricate artworks use natural colours and delve into Hindu mythology, tribal rituals, and rural life.",
    link: "/shop?category=paitkar-paintings",
    bannerImage:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "khovar-paintings",
    title: "Khovar Paintings",
    hindiTitle: "खोवर विवाह भित्ति चित्रकला",
    description:
      "Khovar Painting is a cherished mural art folk tradition which beautifully depicts the cultural practice of adorning a wedding room. Women from the community elegantly paint the mud walls of homes during weddings, symbolizing blessings for the newlywed couple.",
    link: "/shop?category=khovar-paintings",
    bannerImage:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "jadopatia-paintings",
    title: "Jadopatia (Jadupatua) Paintings",
    hindiTitle: "जादोपटिया संथाली लोक चित्र",
    description:
      "Jadopatia paintings, prevalent in Jharkhand's Dumka and Jamtara districts, weave enchanting tales through vibrant hues and intricate designs. Created by Bengali artists known as 'Chitrakars,' these folk artworks delve into Hindu mythology, tribal customs, and timeless legends.",
    link: "/shop?category=jadopatia-paintings",
    bannerImage:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "dhokra",
    title: "Dhokra Metal Art",
    hindiTitle: "ढोकरा धातु शिल्प (Lost-Wax)",
    description:
      "Dhokra metal art is a traditional art form from Jharkhand, renowned for its intricate designs and timeless appeal. Each piece is handcrafted using the ancient lost-wax casting technique, resulting in unique, one-of-a-kind items that celebrate the rich cultural heritage of India.",
    link: "/shop?category=dhokra",
    bannerImage:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85",
  },
  {
    key: "ledra-textile",
    title: "Ledra Textile Art & Handloom",
    hindiTitle: "लेदरा लोक वस्त्र एवं हथकरघा",
    description:
      "Ledra Textile Art is a traditional quilt and handloom craft lovingly hand-stitched by rural women Self-Help Groups in Ramgarh Cantt and Santhal Parganas using layered cotton fabric and botanical pigments.",
    link: "/shop?category=ledra-textile",
    bannerImage:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=1200&q=85",
  },
];

export const MAATIGHAR_PRODUCTS: MaatiProduct[] = [
  // 1. HAND-PAINTED PRODUCTS
  {
    id: "sohrai-jute-folder-deers",
    title: "Sohrai Painting Jute File Folder - Deers",
    hindiTitle: "सोहराई जूट फाइल फोल्डर - हिरण",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 995,
    originalPrice: 1295,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Handcrafted natural golden jute folder adorned with traditional Sohrai deer motifs painted with natural mud pigments by Ramgarh women artisans. Perfect for corporate gifting and conference files.",
    dimensions: "14\" × 10.5\" (Holds A4 Documents)",
    materials: ["100% Golden Jute", "Natural Mud Colors", "Cotton Lining"],
    artisanName: "Muni Devi Collective",
    artisanLocation: "Ramgarh Cantt, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "jadopatia-tote-couple",
    title: "Jadopatia Painting Pure Cotton Tote Bag - Dancing Tribal Couple",
    hindiTitle: "जादोपटिया कॉटन टोट बैग - संथाली नृत्य युगल",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 435,
    originalPrice: 550,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=800&q=85",
    description:
      "Heavyweight 100% unbleached natural cotton canvas tote bag hand-painted with joyful Santhal dancing figures. Sturdy handles with reinforced box stitching.",
    dimensions: '16" × 15" with 11" shoulder drop',
    materials: ["Organic Desi Cotton Canvas", "Eco Pigment Ink"],
    artisanName: "Champa Soren SHG",
    artisanLocation: "Dumka, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "jadopatia-tray-dance",
    title: "Jadopatia Painting Hand-painted Tray - Tribal Dance",
    hindiTitle: "जादोपटिया लकड़ी की ट्रे - लोक नृत्य",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 995,
    originalPrice: 1295,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
    description:
      "Bespoke solid mango wood serving tray sealed with water-resistant non-toxic lacquer. Features authentic Dumka Jadopatia storytelling artwork in earthy ochres.",
    dimensions: '12" × 8" × 1.8"',
    materials: ["Seasoned Mango Wood", "Natural Earth Tones", "Food-safe Lacquer"],
    artisanName: "Virendra Kumar Atelier",
    artisanLocation: "Ramgarh Cantt, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "sohrai-pen-stand-deer",
    title: "Sohrai Painting Hand-painted Pen Stand - Deer",
    hindiTitle: "सोहराई पेन स्टैंड - हिरण",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 595,
    originalPrice: 750,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    description:
      "Artisan wooden desk accessory hand-painted with ancient Hazaribagh Sohrai wildlife motifs. Adds traditional warmth to modern study or office tables.",
    dimensions: '4" × 3" × 3"',
    materials: ["Recycled Pine Wood", "Dudhimati Clay Colors"],
    artisanName: "Birsa Murmu Guild",
    artisanLocation: "Hazaribagh, Jharkhand",
    inStock: true,
  },
  {
    id: "sohrai-cutlery-cows",
    title: "Sohrai Painting Hand-painted Cutlery Holder - Cows",
    hindiTitle: "सोहराई चम्मच स्टैंड - गौ माता",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 795,
    originalPrice: 995,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85",
    description:
      "Multi-compartment dining caddy painted with Pashupati sacred cow figures symbolizing harvest abundance and family prosperity.",
    dimensions: '7.5" × 4.5" × 5"',
    materials: ["Handcrafted Wood", "Natural Ochre Pigments"],
    artisanName: "Jamuna Hembram",
    artisanLocation: "Ramgarh, Jharkhand",
    inStock: true,
  },
  {
    id: "sohrai-tea-coasters-elephant",
    title: "Sohrai Painting Hand-painted Tea Coasters - Elephant (Set of 6)",
    hindiTitle: "सोहराई चाय कोस्टर सेट - हाथी (६ पीस)",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 895,
    originalPrice: 1150,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85",
    description:
      "Set of 6 heat-resistant wooden coasters with wooden holder. Decorated with hand-painted Sohrai forest elephants and floral vines.",
    dimensions: '4" diameter each',
    materials: ["MDF Core", "Hand-painted Acrylic & Soil Pigments"],
    artisanName: "Ramgarh Women Collective",
    artisanLocation: "Ramgarh Cantt, Jharkhand",
    inStock: true,
  },
  {
    id: "sohrai-jute-folder-cows",
    title: "Sohrai Painting Jute File Folder - Cows",
    hindiTitle: "सोहराई जूट फाइल फोल्डर - गाय",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 1495,
    originalPrice: 1850,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=85",
    description:
      "Deluxe multi-pocket conference folder crafted with tight-weave golden jute and featuring detailed Sohrai cattle paintings on front flap.",
    dimensions: '14.5" × 11"',
    materials: ["Heavyweight Jute", "Natural Mud Resins", "Brass Clasp"],
    artisanName: "Muni Devi",
    artisanLocation: "Ramgarh Cantt, Jharkhand",
    inStock: true,
  },
  {
    id: "sohrai-tote-peacocks",
    title: "Sohrai Painting Pure Cotton Tote Bag - Peacocks",
    hindiTitle: "सोहराई कॉटन टोट बैग - मयूर",
    category: "hand-painted",
    categoryLabel: "Hand-painted Products",
    price: 435,
    originalPrice: 550,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=800&q=85",
    description:
      "Natural cream cotton tote hand-painted with dancing peacock pair using traditional comb-smeared outlines.",
    dimensions: '15" × 14"',
    materials: ["Pure Cotton", "Earth-safe Inks"],
    artisanName: "Phulo Soren",
    artisanLocation: "Dumka, Jharkhand",
    inStock: true,
  },

  // 2. SOHRAI PAINTINGS
  {
    id: "sohrai-painting-peacocks",
    title: "Sohrai Painting - Peacocks",
    hindiTitle: "सोहराई चित्रकला - मयूर",
    category: "sohrai-paintings",
    categoryLabel: "Sohrai Paintings",
    price: 2695,
    originalPrice: 3200,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
    description:
      "Vibrant Sohrai mural painted on handmade textured paper using unsealed Dudhimati white kaolin mud, manganese black clay, and red geru. Framed in natural wood.",
    dimensions: '18" × 14" Framed',
    materials: ["Dudhimati White Clay", "River Manganese", "Handmade Rag Paper"],
    artisanName: "Birsa Murmu",
    artisanLocation: "Hazaribagh, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "sohrai-painting-cow-others",
    title: "Sohrai Painting - Cow and others",
    hindiTitle: "सोहराई चित्रकला - गाय एवं वन जीव",
    category: "sohrai-paintings",
    categoryLabel: "Sohrai Paintings",
    price: 2695,
    originalPrice: 3400,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85",
    description:
      "Traditional post-harvest celebration painting depicting cattle with horns decorated for the Sohrai festival, surrounded by peacocks and forest songbirds.",
    dimensions: '18" × 14" Framed',
    materials: ["Natural Soil Ochres", "Manganese Slip", "Cotton Rag Paper"],
    artisanName: "Jamuna Hembram",
    artisanLocation: "Ramgarh, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "sohrai-painting-deers-elephant",
    title: "Sohrai Painting - Deers and Elephant",
    hindiTitle: "सोहराई चित्रकला - हिरण एवं हाथी",
    category: "sohrai-paintings",
    categoryLabel: "Sohrai Paintings",
    price: 2695,
    originalPrice: 3300,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85",
    description:
      "Masterful comb-cut sgraffito technique depicting a herd of spotted deer led by an elephant through forest foliage.",
    dimensions: '20" × 16" Framed',
    materials: ["Kaolin Clay", "Wild Plant Gums", "Recycled Paper Board"],
    artisanName: "Maya Murmu",
    artisanLocation: "Bokaro, Jharkhand",
    inStock: true,
  },
  {
    id: "sohrai-painting-tree-of-life",
    title: "Sohrai Painting - Tree of Life",
    hindiTitle: "सोहराई चित्रकला - कल्पवृक्ष / जीवन वृक्ष",
    category: "sohrai-paintings",
    categoryLabel: "Sohrai Paintings",
    price: 4495,
    originalPrice: 5500,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    description:
      "Large-scale monumental Sohrai composition celebrating the sacred Karam tree with intertwined branches, nesting hornbills, and grazing forest fawns.",
    dimensions: '28" × 22" Glass Framed',
    materials: ["Pure Earthen Pigments", "Handmade Archival Paper", "Teak Wood Frame"],
    artisanName: "Harilal Murmu",
    artisanLocation: "Latehar, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "sohrai-painting-pair-deers",
    title: "Sohrai Painting - A Pair of Deers",
    hindiTitle: "सोहराई चित्रकला - हिरण युगल",
    category: "sohrai-paintings",
    categoryLabel: "Sohrai Paintings",
    price: 1795,
    originalPrice: 2200,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
    description:
      "Elegant minimalist Sohrai artwork showing a tender pair of forest deers created with finger-line drawing and unrefined earth pigments.",
    dimensions: '14" × 11" Framed',
    materials: ["Lalmati Red Clay", "Dudhimati White Slip"],
    artisanName: "Rupa Baskey",
    artisanLocation: "Jamtara, Jharkhand",
    inStock: true,
  },
  {
    id: "sohrai-painting-forest-life",
    title: "Sohrai Painting - Forest Life",
    hindiTitle: "सोहराई चित्रकला - वन जीवन",
    category: "sohrai-paintings",
    categoryLabel: "Sohrai Paintings",
    price: 4495,
    originalPrice: 5600,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85",
    description:
      "Dense panoramic depiction of Chota Nagpur forest biodiversity: tigers, dancing peacocks, wild peacocks, and blossoming Mahua trees.",
    dimensions: '30" × 20" Framed',
    materials: ["Manganese", "Geru", "Pilu Clay"],
    artisanName: "Birsa Murmu & Hazaribagh Guild",
    artisanLocation: "Hazaribagh, Jharkhand",
    inStock: true,
  },

  // 3. PAITKAR PAINTINGS
  {
    id: "paitkar-painting-tribal-men",
    title: "Paitkar Painting - Tribal Men Celebrating",
    hindiTitle: "पाइतकार चित्रकला - उत्सव मनाते संथाली पुरुष",
    category: "paitkar-paintings",
    categoryLabel: "Paitkar Paintings",
    price: 1495,
    originalPrice: 1895,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85",
    description:
      "Ancient folk scroll art created by Bengali Chitrakars of Amadubi village. Painted with stone pigments and neem extract on handmade parchment.",
    dimensions: '14" × 10" Mounted',
    materials: ["Stone Ochres", "Neem Leaf Gum", "Jute Parchment"],
    artisanName: "Anil Chitrakar",
    artisanLocation: "Amadubi, East Singhbhum, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "paitkar-painting-tribal-dance",
    title: "Paitkar Painting - Tribal Dance",
    hindiTitle: "पाइतकार चित्रकला - संथाली सामूहिक लोक नृत्य",
    category: "paitkar-paintings",
    categoryLabel: "Paitkar Paintings",
    price: 5995,
    originalPrice: 7500,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    description:
      "Elaborate multi-figure narrative scroll illustrating the sacred Baha spring festival with circle dancers, Madal drummers, and forest spirits.",
    dimensions: '36" × 18" Silk Border Scroll',
    materials: ["Lampblack", "Wild Ochres", "Katha Bark Resin", "Handmade Paper"],
    artisanName: "Amadubi Chitrakar Guild",
    artisanLocation: "Amadubi, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "paitkar-painting-tribal-couple",
    title: "Paitkar Painting - Tribal Couple",
    hindiTitle: "पाइतकार चित्रकला - संथाली दम्पति",
    category: "paitkar-paintings",
    categoryLabel: "Paitkar Paintings",
    price: 1495,
    originalPrice: 1950,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=800&q=85",
    description:
      "Intimate rendering of an ancestral Santhal couple carrying bows and forest wild berries, framed with natural wooden border.",
    dimensions: '14" × 11" Framed',
    materials: ["Vegetable Dyes", "Stone Powder", "Archival Parchment"],
    artisanName: "Anil Chitrakar",
    artisanLocation: "Amadubi, Jharkhand",
    inStock: true,
  },
  {
    id: "paitkar-painting-tribal-music",
    title: "Paitkar Painting - Tribal Music",
    hindiTitle: "पाइतकार चित्रकला - संगीत और मांदर वादन",
    category: "paitkar-paintings",
    categoryLabel: "Paitkar Paintings",
    price: 3995,
    originalPrice: 4800,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Rhythmic visual composition showcasing the ancient instruments of Santhal folklore: Tirio flute, Tumdak drum, and Tamak kettledrum.",
    dimensions: '24" × 16" Framed',
    materials: ["Terracotta Slip", "Lampblack", "Handmade Cotton Rag Paper"],
    artisanName: "Anil Chitrakar",
    artisanLocation: "Amadubi, Jharkhand",
    inStock: true,
  },

  // 4. KHOVAR PAINTINGS
  {
    id: "khovar-painting-peacocks",
    title: "Khovar Painting - Peacocks",
    hindiTitle: "खोवर विवाह चित्रकला - मयूर आशीर्वाद",
    category: "khovar-paintings",
    categoryLabel: "Khovar Paintings",
    price: 2695,
    originalPrice: 3200,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
    description:
      "Traditional bridal chamber (Khovar) mural traditionally painted to bless newlywed couples with enduring fidelity, love, and bountiful harvest.",
    dimensions: '18" × 14" Framed',
    materials: ["Manganese Clay Undercoat", "Dudhimati Kaolin Topcoat", "Comb-scratched"],
    artisanName: "Jamuna Hembram",
    artisanLocation: "Ramgarh, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "khovar-painting-birds-flowers",
    title: "Khovar Painting - Birds on Flowers",
    hindiTitle: "खोवर चित्रकला - कमल एवं पक्षी",
    category: "khovar-paintings",
    categoryLabel: "Khovar Paintings",
    price: 4495,
    originalPrice: 5400,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85",
    description:
      "Master comb-scratched sgraffito depicting water birds perched on blossoming mud lotus stalks. Contrasting stark white kaolin over deep charcoal manganese.",
    dimensions: '26" × 20" Framed',
    materials: ["100% Unprocessed Clays", "Handmade Archival Rag Paper"],
    artisanName: "Muni Devi",
    artisanLocation: "Ramgarh Cantt, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "khovar-painting-deers",
    title: "Khovar Painting - Deers",
    hindiTitle: "खोवर चित्रकला - वन हिरण",
    category: "khovar-paintings",
    categoryLabel: "Khovar Paintings",
    price: 1795,
    originalPrice: 2200,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85",
    description:
      "Graceful horned deers depicted with sweeping comb lines symbolizing fertility and freedom in the Chota Nagpur forested plateau.",
    dimensions: '14" × 11" Framed',
    materials: ["Natural Black Clay", "White Dudhi Mud"],
    artisanName: "Maya Murmu",
    artisanLocation: "Bokaro, Jharkhand",
    inStock: true,
  },
  {
    id: "khovar-painting-elephants",
    title: "Khovar Painting - Elephants",
    hindiTitle: "खोवर चित्रकला - गजराज हाथी",
    category: "khovar-paintings",
    categoryLabel: "Khovar Paintings",
    price: 2695,
    originalPrice: 3200,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    description:
      "Auspicious royal elephant painted on bridal chamber wall to protect the home and bestow strength and dignity upon the household.",
    dimensions: '18" × 14" Framed',
    materials: ["Manganese River Soil", "Kaolin Clay"],
    artisanName: "Harilal Murmu",
    artisanLocation: "Latehar, Jharkhand",
    inStock: true,
  },

  // 5. JADOPATIA PAINTINGS
  {
    id: "jadopatia-eight-sisters",
    title: "Jadopatia (Jadupatua) Painting - Eight Sisters",
    hindiTitle: "जादोपटिया चित्रकला - आठ बहनें (लोक कथा)",
    category: "jadopatia-paintings",
    categoryLabel: "Jadopatia (Jadupatua) Paintings",
    price: 3495,
    originalPrice: 4200,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=800&q=85",
    description:
      "Timeless Santhal folklore painted by Dumka Jadu Patuas. Recounts the legend of the eight devoted sisters who gathered wild Mahua flowers to save their village.",
    dimensions: '22" × 16" Framed',
    materials: ["Terracotta Slip", "Wild Plant Inks", "Handmade Jute Board"],
    artisanName: "Champa Soren",
    artisanLocation: "Dumka, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "jadopatia-celebrations",
    title: "Jadopatia (Jadupatua) Painting - Celebrations",
    hindiTitle: "जादोपटिया चित्रकला - संथाली उत्सव",
    category: "jadopatia-paintings",
    categoryLabel: "Jadopatia (Jadupatua) Paintings",
    price: 3495,
    originalPrice: 4200,
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85",
    description:
      "Joyous communal ritual scene with festive figures dancing in unison beneath flowering Sal branches.",
    dimensions: '22" × 16" Framed',
    materials: ["Earth Colors", "Tamarind Gum", "Handmade Paper"],
    artisanName: "Champa Soren",
    artisanLocation: "Dumka, Jharkhand",
    inStock: true,
  },
  {
    id: "jadopatia-festivals",
    title: "Jadopatia (Jadupatua) Painting - Festivals",
    hindiTitle: "जादोपटिया चित्रकला - जाहेरथान एवं पर्व",
    category: "jadopatia-paintings",
    categoryLabel: "Jadopatia (Jadupatua) Paintings",
    price: 3495,
    originalPrice: 4200,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85",
    description:
      "Intricately painted scroll panel depicting the worship at the Jaherthan (sacred village grove) during the seed sowing season.",
    dimensions: '24" × 16" Framed',
    materials: ["Natural Soil Pigments", "Organic Resins"],
    artisanName: "Dumka Jadu Patua Collective",
    artisanLocation: "Dumka, Jharkhand",
    inStock: true,
  },
  {
    id: "jadopatia-harvest-dance",
    title: "Jadopatia (Jadupatua) Painting - Harvest Dance",
    hindiTitle: "जादोपटिया चित्रकला - फसल कटाई नृत्य",
    category: "jadopatia-paintings",
    categoryLabel: "Jadopatia (Jadupatua) Paintings",
    price: 2995,
    originalPrice: 3800,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=85",
    description:
      "Vivid narrative depiction of Santhal men and women returning from golden paddy fields with sickles and grain baskets, singing ancestral carols.",
    dimensions: '20" × 14" Framed',
    materials: ["Handmade Paper", "Mineral Inks"],
    artisanName: "Rupa Baskey",
    artisanLocation: "Jamtara, Jharkhand",
    inStock: true,
  },

  // 6. DHOKRA METAL ART
  {
    id: "dhokra-peacock-boat",
    title: "Dhokra Art Frame - Peacock Boat",
    hindiTitle: "ढोकरा धातु फ्रेम - मयूर नाव",
    category: "dhokra",
    categoryLabel: "Dhokra Metal Art",
    price: 1995,
    originalPrice: 2495,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Handcrafted 4,000-year-old lost-wax bell metal bronze casting mounted inside a rich dark wood frame. Depicts a ceremonial tribal peacock boat carrying ancestral deities.",
    dimensions: '10" × 10" Shadow Box Frame',
    materials: ["Bell Metal (Bronze/Brass)", "Charcoal Clay Core", "Pure Beeswax Filaments"],
    artisanName: "Santosh Hemrom",
    artisanLocation: "Purulia & Seraikela Guild",
    inStock: true,
    featured: true,
  },
  {
    id: "dhokra-nandi-pair",
    title: "Dhokra Art Statues - Nandi Pair",
    hindiTitle: "ढोकरा धातु शिल्प - नंदी युगल (Lost-Wax)",
    category: "dhokra",
    categoryLabel: "Dhokra Metal Art",
    price: 3495,
    originalPrice: 4200,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Pair of sacred hump bulls sculpted by hand using fine pure beeswax cords wound over clay cores, cast in molten bronze. Revered in tribal harvest festivals.",
    dimensions: '6" × 5" each, approx 1.8 kg total',
    materials: ["Cast Bronze", "Clay Mold", "Wax Thread Work"],
    artisanName: "Ramesh Kisku",
    artisanLocation: "Seraikela-Kharsawan, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "dhokra-square-couple",
    title: "Dhokra Art Square Frame - Tribal Couple",
    hindiTitle: "ढोकरा स्क्वायर फ्रेम - संथाली दम्पति",
    category: "dhokra",
    categoryLabel: "Dhokra Metal Art",
    price: 795,
    originalPrice: 995,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Solid bell metal miniature depicting a man with flute and woman with grain basket, set against raw woven jute backing.",
    dimensions: '6.5" × 6.5" Wall Frame',
    materials: ["Cast Brass", "Jute Backing", "Natural Wood Border"],
    artisanName: "Karmi Baskey",
    artisanLocation: "West Singhbhum, Jharkhand",
    inStock: true,
  },
  {
    id: "dhokra-statue-fish",
    title: "Dhokra Art Statue - Fish",
    hindiTitle: "ढोकरा धातु मूर्ति - जल मत्स्य (प्रतीक)",
    category: "dhokra",
    categoryLabel: "Dhokra Metal Art",
    price: 1495,
    originalPrice: 1850,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Delicately detailed lost-wax fish with filigree scales and fins. A traditional tribal emblem of water abundance, luck, and fertile monsoons.",
    dimensions: '8" length × 3.5" height, 750g',
    materials: ["Solid Bell Metal", "Antique Patina Finish"],
    artisanName: "Debu Hembram",
    artisanLocation: "Bankura, West Bengal",
    inStock: true,
  },
  {
    id: "dhokra-statue-horse",
    title: "Dhokra Art Statue - Horse",
    hindiTitle: "ढोकरा धातु मूर्ति - आदिवासी अश्व",
    category: "dhokra",
    categoryLabel: "Dhokra Metal Art",
    price: 1495,
    originalPrice: 1950,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Graceful tribal cavalry horse with ornamental wax rope mane and elongated neck, handcrafted using ancient non-ferrous foundry techniques.",
    dimensions: '7" × 6", 850g',
    materials: ["Cast Bell Metal", "Wax Coil Technique"],
    artisanName: "Sukri Kisku",
    artisanLocation: "Purulia, West Bengal",
    inStock: true,
  },
  {
    id: "dhokra-hanging-sun",
    title: "Dhokra Art Wall/Door Hanging - Sun",
    hindiTitle: "ढोकरा सूर्य दीवार लटकन",
    category: "dhokra",
    categoryLabel: "Dhokra Metal Art",
    price: 595,
    originalPrice: 750,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85",
    description:
      "Auspicious solar deity circular medallion with radiating flame rays and peaceful smiling tribal face. Ideal for main doorway blessings.",
    dimensions: '5" diameter',
    materials: ["Cast Brass", "Braided Cotton Cord"],
    artisanName: "Purulia Foundry Guild",
    artisanLocation: "Purulia, West Bengal",
    inStock: true,
  },

  // 7. LEDRA TEXTILE ART OF JHARKHAND
  {
    id: "ledra-vintage-quilt",
    title: "Ledra Vintage Hand-Stitched Quilt - Ramgarh SHG",
    hindiTitle: "लेदरा विंटेज हस्त-निर्मित रज़ाई (रामगढ़ SHG)",
    category: "ledra-textile",
    categoryLabel: "Ledra Textile Art & Handloom",
    price: 3200,
    originalPrice: 3900,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=85",
    description:
      "Layered vintage organic cotton lovingly hand-quilted with rhythmic running stitches by Ramgarh Cantt rural women collective. Zero waste, lightweight, and warm.",
    dimensions: '84" × 56" (Single Bed / Couch Throw)',
    materials: ["Upcycled Vintage Cotton", "Natural Cotton Thread", "Botanical Dyes"],
    artisanName: "Ramgarh Cantt Women Collective",
    artisanLocation: "Ramgarh Cantt, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "santhali-handloom-saree",
    title: "Santhali Handloom Cotton Saree - Panchi Parhan",
    hindiTitle: "संथाली हथकरघा साड़ी - पांची पड़हाण",
    category: "ledra-textile",
    categoryLabel: "Ledra Textile Art & Handloom",
    price: 3200,
    originalPrice: 4000,
    image:
      "https://images.unsplash.com/photo-1606819717115-9159c900370b?auto=format&fit=crop&w=800&q=85",
    description:
      "Traditional two-piece Santhal handloom weave with red temple border and ecru ground, woven on pit looms by master weavers in Dumka.",
    dimensions: '5.5 meters with blouse piece',
    materials: ["Desi Organic Cotton", "Madder Red Dye"],
    artisanName: "Phulo Soren",
    artisanLocation: "Dumka, Jharkhand",
    inStock: true,
    featured: true,
  },
  {
    id: "santhali-cotton-stole",
    title: "Santhali Desi Cotton Handwoven Stole",
    hindiTitle: "संथाली जैविक सूती स्टोल / दुपट्टा",
    category: "ledra-textile",
    categoryLabel: "Ledra Textile Art & Handloom",
    price: 1850,
    originalPrice: 2400,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=85",
    description:
      "Airy handloom cotton stole with rhythmic geometrical Santhal motifs along both pallus. Handspun and handwoven by Pakur weaving elders.",
    dimensions: '2.2 meters × 28"',
    materials: ["100% Handspun Cotton", "Indigo & Madder"],
    artisanName: "Somai Tudu",
    artisanLocation: "Pakur, Jharkhand",
    inStock: true,
  },
];

export function getProductsByCategory(category: MaatiProduct["category"]) {
  return MAATIGHAR_PRODUCTS.filter((p) => p.category === category);
}

export function getAllCategories() {
  return MAATIGHAR_CATEGORIES;
}

export function getProductById(id: string) {
  return MAATIGHAR_PRODUCTS.find((p) => p.id === id);
}

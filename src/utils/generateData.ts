import { faker } from '@faker-js/faker';

type CategoryConfig = {
  meta: {
    parentCategory?: string;
    pricingTier: 'budget' | 'mid-range' | 'premium';
    popularity: number; // 1-10 scale
  };
  vocabulary: {
    nouns: string[];
    adjectives: string[];
    verbs?: string[]; // For action-oriented products
  };
  brands: {
    name: string;
    quality: 'generic' | 'standard' | 'premium' | 'budget';
    priceModifier?: number; // % adjustment
  }[];
  materials?: string[];
  modifiers?: {
    condition?: string[];
    techLevel?: string[]; // For electronics/smart devices
    capacity?: string[]; // For baby/kids products
    medicalUse?: string[]; // For baby/kids products
    skillLevel?: string[]; // For baby/kids products
    skinType?: string[]; // For baby/kids products
    inkType?: string[]; // For baby/kids products
    ageGroup?: string[]; // For baby/kids products
  };
};

const DEFAULT_MATERIALS = [
  'plastic',
  'metal',
  'wood',
  'composite',
  'fabric'
];



const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  "automotive": {
    meta: {
      pricingTier: 'mid-range',
      popularity: 8
    },
    vocabulary: {
      nouns: ["engine", "transmission", "suspension", "brakes"],
      adjectives: ["high-performance", "OEM", "aftermarket", "rebuilt"]
    },
    brands: [
      { name: "Bosch", quality: "premium", priceModifier: 1.2 },
      { name: "ACDelco", quality: "standard", priceModifier: 1.0 },
      { name: "Duralast", quality: "generic", priceModifier: 0.8 },
      { name: "Mobil 1", quality: "premium", priceModifier: 1.3 },
      { name: "NGK", quality: "standard", priceModifier: 1.0 },
      { name: "KYB", quality: "standard", priceModifier: 1.1 },
      { name: "Brembo", quality: "premium", priceModifier: 1.5 },
      { name: "Fel-Pro", quality: "standard", priceModifier: 1.0 }
    ],
    materials: ["aluminum", "steel", "ceramic", "carbon fiber"]
  },

  "smart home": {
    meta: {
      pricingTier: 'premium',
      popularity: 9
    },
    vocabulary: {
      nouns: ["thermostat", "security camera", "door lock", "light bulb"],
      adjectives: ["voice-controlled", "energy-saving", "Wi-Fi", "Zigbee"]
    },
    brands: [
      { name: "Nest", quality: "premium" },
      { name: "Ring", quality: "standard" },
      { name: "TP-Link", quality: "generic" },
      { name: "Ecobee", quality: "premium", priceModifier: 1.3 },
      { name: "Arlo", quality: "premium", priceModifier: 1.4 },
      { name: "Wyze", quality: "budget", priceModifier: 0.8 },
      { name: "Lutron", quality: "premium", priceModifier: 1.5 },
      { name: "Eufy", quality: "standard", priceModifier: 1.1 }
    ],
    modifiers: {
      techLevel: ["basic", "pro", "enterprise", "matter-compatible"]
    }
  },

  "baby products": {
    meta: {
      pricingTier: 'mid-range',
      popularity: 7
    },
    vocabulary: {
      nouns: ["stroller", "crib", "bottle", "high chair"],
      adjectives: ["portable", "convertible", "organic", "machine-washable"]
    },
    brands: [
      { name: "Graco", quality: "standard" },
      { name: "UPPAbaby", quality: "premium" },
      { name: "Summer Infant", quality: "generic" },
      { name: "Chicco", quality: "premium", priceModifier: 1.3 },
      { name: "Evenflo", quality: "standard", priceModifier: 1.0 },
      { name: "BabyBjörn", quality: "premium", priceModifier: 1.4 },
      { name: "Fisher-Price", quality: "standard", priceModifier: 1.0 },
      { name: "4moms", quality: "premium", priceModifier: 1.5 }
    ],
    modifiers: {
      ageGroup: ["newborn", "0-6mo", "6-12mo", "toddler"]
    }
  },

  "sports products": {
    meta: {
      pricingTier: 'mid-range',
      popularity: 8
    },
    vocabulary: {
      nouns: ["dumbbells", "yoga mat", "running shoes", "jump rope"],
      adjectives: ["lightweight", "shock-absorbing", "breathable", "anti-slip"],
      verbs: ["train", "compete", "endure"]
    },
    brands: [
      { name: "Nike", quality: "premium", priceModifier: 1.3 },
      { name: "Adidas", quality: "standard" },
      { name: "Under Armour", quality: "premium" },
      { name: "Reebok", quality: "standard", priceModifier: 1.1 },
      { name: "Puma", quality: "standard", priceModifier: 1.0 },
      { name: "ASICS", quality: "premium", priceModifier: 1.2 },
      { name: "New Balance", quality: "standard", priceModifier: 1.0 },
      { name: "Wilson", quality: "premium", priceModifier: 1.3 }
    ],
    materials: ["neoprene", "EVA foam", "spandex", "rubber"],
    modifiers: {
      skillLevel: ["beginner", "intermediate", "advanced", "professional"]
    }
  },

  "health care": {
    meta: {
      pricingTier: 'mid-range',
      popularity: 9
    },
    vocabulary: {
      nouns: ["thermometer", "blood pressure monitor", "massage gun", "first aid kit"],
      adjectives: ["FDA-approved", "ergonomic", "sterile", "hypoallergenic"]
    },
    brands: [
      { name: "Braun", quality: "premium" },
      { name: "Omron", quality: "standard" },
      { name: "Curad", quality: "generic" },
      { name: "Withings", quality: "premium", priceModifier: 1.4 },
      { name: "Flex", quality: "standard", priceModifier: 1.0 },
      { name: "Theragun", quality: "premium", priceModifier: 1.5 },
      { name: "Medline", quality: "generic", priceModifier: 0.8 },
      { name: "iHealth", quality: "standard", priceModifier: 1.1 }
    ],
    modifiers: {
      medicalUse: ["home", "clinical", "professional", "hospital-grade"]
    }
  },

  "office products": {
    meta: {
      pricingTier: 'budget',
      popularity: 7
    },
    vocabulary: {
      nouns: ["stapler", "printer", "desk organizer", "whiteboard"],
      adjectives: ["ergonomic", "space-saving", "wireless", "refillable"]
    },
    brands: [
      { name: "3M", quality: "premium" },
      { name: "Swingline", quality: "standard" },
      { name: "Amazon Basics", quality: "generic" },
      { name: "Brother", quality: "standard", priceModifier: 1.1 },
      { name: "HP", quality: "premium", priceModifier: 1.3 },
      { name: "X-ACTO", quality: "standard", priceModifier: 1.0 },
      { name: "Post-it", quality: "premium", priceModifier: 1.2 },
      { name: "Ticonderoga", quality: "standard", priceModifier: 1.0 }
    ],
    materials: ["plastic", "metal", "glass", "MDF"],
    modifiers: {
      capacity: ["personal", "small office", "enterprise", "industrial"]
    }
  },

  "music instruments": {
    meta: {
      pricingTier: 'premium',
      popularity: 6
    },
    vocabulary: {
      nouns: ["guitar", "keyboard", "drum set", "microphone"],
      adjectives: ["acoustic", "electric", "digital", "professional-grade"]
    },
    brands: [
      { name: "Fender", quality: "premium" },
      { name: "Yamaha", quality: "standard" },
      { name: "Casio", quality: "budget" },
      { name: "Gibson", quality: "premium", priceModifier: 1.5 },
      { name: "Roland", quality: "premium", priceModifier: 1.4 },
      { name: "Shure", quality: "premium", priceModifier: 1.3 },
      { name: "Ibanez", quality: "standard", priceModifier: 1.1 },
      { name: "Pearl", quality: "premium", priceModifier: 1.3 }
    ],
    materials: ["mahogany", "maple", "brass", "nylon"],
    modifiers: {
      skillLevel: ["beginner", "intermediate", "professional", "concert"]
    }
  },

  "stationary products": {
    meta: {
      parentCategory: "office products",
      pricingTier: 'budget',
      popularity: 5
    },
    vocabulary: {
      nouns: ["notebook", "pen", "pencil", "marker"],
      adjectives: ["refillable", "archival-quality", "smudge-proof", "water-based"]
    },
    brands: [
      { name: "Moleskine", quality: "premium" },
      { name: "Pilot", quality: "standard" },
      { name: "Bic", quality: "generic" },
      { name: "Sharpie", quality: "standard", priceModifier: 1.1 },
      { name: "Leuchtturm1917", quality: "premium", priceModifier: 1.3 },
      { name: "Zebra", quality: "standard", priceModifier: 1.0 },
      { name: "Uni-ball", quality: "standard", priceModifier: 1.0 },
      { name: "Staedtler", quality: "premium", priceModifier: 1.2 }
    ],
    modifiers: {
      inkType: ["ballpoint", "gel", "fountain", "rollerball"]
    }
  },

  "beauty products": {
    meta: {
      pricingTier: 'mid-range',
      popularity: 8
    },
    vocabulary: {
      nouns: ["lipstick", "mascara", "foundation", "moisturizer"],
      adjectives: ["cruelty-free", "vegan", "long-lasting", "non-comedogenic"]
    },
    brands: [
      { name: "MAC", quality: "premium" },
      { name: "Maybelline", quality: "standard" },
      { name: "e.l.f.", quality: "budget" },
      { name: "L'Oreal", quality: "standard", priceModifier: 1.1 },
      { name: "Estée Lauder", quality: "premium", priceModifier: 1.5 },
      { name: "NYX", quality: "standard", priceModifier: 1.0 },
      { name: "Clinique", quality: "premium", priceModifier: 1.4 },
      { name: "Revlon", quality: "standard", priceModifier: 1.0 }
    ],
    modifiers: {
      skinType: ["oily", "dry", "combination", "sensitive"]
    }
  }
};

export const generateProducts = (category: string, categoryImages: string[]) => {
  const config = CATEGORY_CONFIG[category];
  if (!config) throw new Error(`Unknown category: ${category}`);
  if (!categoryImages || categoryImages.length < 50) throw new Error(`Need exactly 50 images for ${category}`);

  const products = [];
  const usedCombinations = new Set(); // To ensure unique product combinations

  for (let i = 0; i < 50; i++) {
    // ─── Generate Unique Combination ──────────────────────
    let combinationKey;
    let brand, adjective, noun, modifier;
    
    do {
      brand = faker.helpers.arrayElement(config.brands);
      adjective = faker.helpers.arrayElement(config.vocabulary.adjectives);
      noun = faker.helpers.arrayElement(config.vocabulary.nouns);
      
      modifier = config.modifiers?.techLevel 
        ? faker.helpers.arrayElement(config.modifiers.techLevel)
        : config.modifiers?.ageGroup
        ? faker.helpers.arrayElement(config.modifiers.ageGroup)
        : null;

      combinationKey = `${brand.name}|${adjective}|${noun}|${modifier}`;
    } while (usedCombinations.has(combinationKey));
    
    usedCombinations.add(combinationKey);

    // ─── Name Generation ────────────────────────────────
    let productName = `${brand.name} ${adjective} ${noun}`;
    if (modifier) productName += ` (${modifier})`;

    // ─── Pricing Logic ─────────────────────────────────
    const basePrice = parseFloat(faker.number.float({
      min: {
        'budget': 5,
        'mid-range': 50,
        'premium': 200
      }[config.meta.pricingTier],
      max: {
        'budget': 50,
        'mid-range': 200,
        'premium': 1000
      }[config.meta.pricingTier],
      fractionDigits: 2 // Use fractionDigits instead of precision
    }).toFixed(2));

    const finalPrice = basePrice * (brand.priceModifier || 1);

    // ─── Description Generation ────────────────────────
    const materials = config.materials || DEFAULT_MATERIALS;
    const features = [
      `Material: ${faker.helpers.arrayElement(materials)}`,
      `Brand quality: ${brand.quality}`,
      config.modifiers?.condition && 
        `Condition: ${faker.helpers.arrayElement(config.modifiers.condition || ['new', 'like new', 'excellent'])}`
    ].filter(Boolean);

    const description = `## ${productName}\n` +
      `**Category**: ${category}${config.meta.parentCategory ? ` (${config.meta.parentCategory})` : ''}\n\n` +
      `### Features:\n- ${features.join('\n- ')}\n\n` +
      `${faker.lorem.paragraphs(2)}`;

    // ─── Create Product ────────────────────────────────
    products.push({
      title: productName,
      description,
      minPrice: parseFloat(finalPrice.toFixed(2)),
      category,
      subCategory: config.meta.parentCategory ? config.meta.parentCategory : undefined,
      metadata: {
        quality: brand.quality,
        popularity: config.meta.popularity,
        techLevel: config.modifiers?.techLevel ? modifier : undefined,
        ageGroup: config.modifiers?.ageGroup ? modifier : undefined,
        material: features[0]?.replace('Material: ', '')
      },
      post_images: [categoryImages[i]] // Use the corresponding image
    });
  }

  return products;
};

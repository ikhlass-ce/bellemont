const rawProducts = [
  // DRESSES
  {
    id: "bologna-dress",
    name: "Bologna Silk Dress",
    price: 120,
    category: "dresses",
    description: "An exquisite silk slip midi dress in a deep burgundy shade. Features a delicate lace-trimmed neckline, thin adjustable straps, and a fluid tiered silhouette. Perfect for formal summer evenings.",
    color: "Burgundy",
    colors: [
      { name: "Burgundy", hex: "#800020" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_burgundy_strap.jpg"
    ],
    fabricInfo: "100% Mulberry Silk. Lace trim details. Dry clean only.",
    rating: 4.9,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "Stunning color. The lace detail is extremely delicate and expensive looking." }
    ]
  },
  {
    id: "venice-dress",
    name: "Venice Balloon Dress",
    price: 110,
    category: "dresses",
    description: "A structured cotton-poplin midi dress in classic navy. Features balloon puff sleeves, a flattering deep V-neckline, and an elasticated waist that opens to a full flared skirt.",
    color: "Navy",
    colors: [
      { name: "Navy", hex: "#000080" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_navy_balloon.jpg"
    ],
    fabricInfo: "100% Cotton Poplin. Medium weight with crisp structured shape.",
    rating: 4.7,
    reviews: [
      { author: "Amelia R.", rating: 5, comment: "Beautiful balloon sleeves and fit. Looks very class." }
    ]
  },
  {
    id: "tuscany-dress",
    name: "Tuscany Puff Sleeve Dress",
    price: 130,
    category: "dresses",
    description: "A romantic rustic square-neck dress in soft stone-beige. Features voluminous puff sleeves, a fitted bodice with thick waistband, and a long pleated midi skirt. Offers a nostalgic, vintage quiet luxury aesthetic.",
    color: "Stone Beige",
    colors: [
      { name: "Stone Beige", hex: "#e5ddcf" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_beige_rustic.jpg"
    ],
    fabricInfo: "70% Cotton, 30% Linen blend. Soft touch fabric.",
    rating: 4.9,
    reviews: [
      { author: "Marie L.", rating: 5, comment: "The structure of the bodice is pristine. Reminds me of rustic estates in Italy." }
    ]
  },
  {
    id: "positano-dress",
    name: "Positano Linen Midi Dress",
    price: 125,
    category: "dresses",
    description: "An olive green midi dress featuring a square neck, long sleeves with tied cuff details, and a high waist. The flowing skirt drapes beautifully, making it an essential piece for seaside strolls.",
    color: "Olive Green",
    colors: [
      { name: "Olive Green", hex: "#556b2f" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_olive_sunhat.jpg"
    ],
    fabricInfo: "100% Linen. Lightly washed for extra softness.",
    rating: 4.8,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "Stunning olive shade. Beautiful fit and very high quality linen." }
    ]
  },
  {
    id: "amalfi-dress",
    name: "Amalfi Sweetheart Dress",
    price: 135,
    category: "dresses",
    description: "A gorgeous white summer dress with a sweetheart neckline, puff sleeves, and a flattering drop-waist seam that falls to a full romantic midi skirt. Beautiful for seaside moments.",
    color: "White",
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_white_surf.jpg"
    ],
    fabricInfo: "100% Cotton Poplin. Fully lined for non-transparency.",
    rating: 5.0,
    reviews: [
      { author: "Hanna B.", rating: 5, comment: "Breathtaking dress. The drop waist is so flattering and it flows beautifully in the wind." }
    ]
  },
  {
    id: "yacht-dress",
    name: "Riviera Yacht Dress",
    price: 145,
    category: "dresses",
    description: "An ultra-premium white linen-cotton wrap dress designed for yacht cruise wear. Features elegant balloon sleeves with delicate tie cuffs, a wrap tie waist, and a flowing romantic maxi skirt.",
    color: "White",
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_white_yacht.jpg"
    ],
    fabricInfo: "60% Organic Linen, 40% Premium Cotton. Light, breathable slub.",
    rating: 4.9,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "Breathtaking dress! The balloon sleeves and high wrap waist are so flattering on the yacht deck." }
    ]
  },
  {
    id: "ivory-peasant-dress",
    name: "Siena Peasant Maxi Dress",
    price: 118,
    category: "dresses",
    description: "An elegant cottage-inspired button-front maxi dress in a delicate floral-dappled ivory print. Features balloon long sleeves and a high square neckline.",
    color: "Ivory Floral",
    colors: [
      { name: "Ivory Floral", hex: "#faf3e0" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_ivory_peasant.jpg"
    ],
    fabricInfo: "100% Cotton Poplin. Breathable, medium weight.",
    rating: 4.8,
    reviews: [
      { author: "Marie L.", rating: 5, comment: "Beautiful cottage style. The print is very detailed and classic." }
    ]
  },
  {
    id: "camel-column-dress",
    name: "Parisienne Linen Column Dress",
    price: 135,
    category: "dresses",
    description: "A beautifully structured high-neck linen maxi dress in rich camel. Features clean vertical darts and an elegant A-line column drape. Captures timeless Paris architecture styles.",
    color: "Camel",
    colors: [
      { name: "Camel", hex: "#c19a6b" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_camel_column.jpg"
    ],
    fabricInfo: "80% Organic Linen, 20% Cotton blend.",
    rating: 5.0,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "Fits perfectly. Material is highly breathable and premium." }
    ]
  },
  {
    id: "white-shirt-dress",
    name: "Milan Puff Shirt Dress",
    price: 125,
    category: "dresses",
    description: "An ultra-premium white poplin midi dress. Features voluminous structured sleeves, utility side pockets, and a clean structured waist seam.",
    color: "White",
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_white_shirt.jpg"
    ],
    fabricInfo: "100% Structured Heavyweight Cotton Poplin.",
    rating: 4.9,
    reviews: [
      { author: "Hanna B.", rating: 5, comment: "Love the pockets and sleeve volume. Pristine quality poplin." }
    ]
  },
  {
    id: "black-puff-midi-dress",
    name: "Monaco Sweetheart Midi Dress",
    price: 110,
    category: "dresses",
    description: "A chic black midi dress featuring a structured sweetheart/V-neck, elastic balloon puff sleeves, and a clean flowing A-line silhouette.",
    color: "Classic Black",
    colors: [
      { name: "Classic Black", hex: "#1a1a1a" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_black_puff_midi.jpg"
    ],
    fabricInfo: "95% Cotton, 5% Elastane for structured comfort.",
    rating: 4.8,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "Classic black dress. The sweetheart neckline is very flattering." }
    ]
  },
  {
    id: "black-puff-maxi-dress",
    name: "Florence Drawstring Maxi Dress",
    price: 128,
    category: "dresses",
    description: "A breathtaking full-length maxi dress designed in premium heavy black fabric. Features a delicate drawstring waistband and balloon sleeves.",
    color: "Classic Black",
    colors: [
      { name: "Classic Black", hex: "#1a1a1a" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_black_puff_maxi.jpg"
    ],
    fabricInfo: "100% Premium Belgian Linen blend.",
    rating: 4.9,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Very elegant drape. Can dress it up with heels or casual with flats." }
    ]
  },
  {
    id: "beige-stripe-tank-dress",
    name: "Capri Pinstripe Tank Dress",
    price: 128,
    category: "dresses",
    description: "A gorgeous sleeveless tank midi dress featuring elegant sand and white vertical stripes. Tailored with a square neckline and an A-line gathered skirt.",
    color: "Sand Stripe",
    colors: [
      { name: "Sand Stripe", hex: "#d0c3b0" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_beige_stripe_tank.jpg"
    ],
    fabricInfo: "100% Pure Italian Cotton Poplin.",
    rating: 4.9,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "Classic resort wear! The vertical pinstripes make me feel so tall and elegant." }
    ]
  },
  {
    id: "brown-gingham-dress",
    name: "Positano Gingham Empire Midi",
    price: 118,
    category: "dresses",
    description: "A lovely tan-and-white gingham checkered midi dress. Designed with a deep V-neck, short flutter sleeves, and an elasticated gathers waist.",
    color: "Tan Gingham",
    colors: [
      { name: "Tan Gingham", hex: "#bfa38a" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_brown_gingham.jpg"
    ],
    fabricInfo: "70% Viscose, 30% Linen blend.",
    rating: 4.8,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "Beautiful print details. Perfect look for afternoon cafes." }
    ]
  },
  {
    id: "cream-shirt-sleeveless-dress",
    name: "Riviera Sleeveless Shirt Dress",
    price: 130,
    category: "dresses",
    description: "An elegant cream-colored sleeveless midi dress featuring a classic collar, button-front bodice, and a fluid flared skirt. Perfect for warm city summer days.",
    color: "Cream",
    colors: [
      { name: "Cream", hex: "#faf6ed" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_cream_shirt_sleeveless.jpg"
    ],
    fabricInfo: "80% Rayon, 20% Linen for a soft, fluid drape.",
    rating: 4.9,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Drapes beautifully. Keeps me cool during long city walks." }
    ]
  },
  {
    id: "black-gingham-strapless-dress",
    name: "Amalfi Strapless Gingham Maxi",
    price: 122,
    category: "dresses",
    description: "A stunning strapless tube maxi dress in a classic black and white gingham pattern. Features a comfortable elastic shirred bodice.",
    color: "Black Gingham",
    colors: [
      { name: "Black Gingham", hex: "#2b2b2b" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/dress_black_gingham_strapless.jpg"
    ],
    fabricInfo: "100% Cotton Crepe. Light and comfortable.",
    rating: 4.7,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "Extremely chic! Looks incredible when paired with simple black flats." }
    ]
  },

  // SKIRTS
  {
    id: "striped-sash-skirt",
    name: "Sorrento Striped Sash Skirt",
    price: 115,
    category: "skirts",
    description: "An A-line white maxi skirt in premium cotton poplin. Features a striking black and white geometric striped silk-feel scarf sash tied elegantly at the waist.",
    color: "White & Striped",
    colors: [
      { name: "White & Striped", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_striped_sash.jpg"
    ],
    fabricInfo: "100% Cotton Poplin skirt. 100% Polyester scarf sash. Dry clean recommended.",
    rating: 4.9,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "Breathtaking sash detail. Matches classic French Riviera styles." }
    ]
  },
  {
    id: "beige-pleated-skirt",
    name: "Ischia Pleated Skirt",
    price: 120,
    category: "skirts",
    description: "A beautifully gathered beige-ivory pleated midi skirt with structured waistband folds. Creates a dramatic fluid movement when walking.",
    color: "Ivory Beige",
    colors: [
      { name: "Ivory Beige", hex: "#f0ece1" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_beige_pleated.jpg"
    ],
    fabricInfo: "80% Cotton, 20% Silk blend. Premium dry-clean only.",
    rating: 4.8,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Drapes gorgeously. Looks extremely high-end when paired with a black silk top." }
    ]
  },
  {
    id: "white-puff-skirt",
    name: "Milan Full A-Line Skirt",
    price: 125,
    category: "skirts",
    description: "An ultra-premium white A-line maxi skirt that creates a dramatic, structured editorial volume. Features side pockets and a high-rise thick waist seam.",
    color: "White",
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_white_puff.jpg"
    ],
    fabricInfo: "100% Structured Heavyweight Cotton Poplin.",
    rating: 5.0,
    reviews: [
      { author: "Hanna B.", rating: 5, comment: "Stunning crisp cotton. The volume is gorgeous." }
    ]
  },
  {
    id: "stone-wrap-skirt",
    name: "Palermo Linen Wrap Skirt",
    price: 110,
    category: "skirts",
    description: "A chic stone-beige wrap skirt crafted from heavy textured linen. Features a flattering high-waisted side-tie closure and a clean straight drape.",
    color: "Stone Beige",
    colors: [
      { name: "Stone Beige", hex: "#dcd5c9" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_stone_wrap.jpg"
    ],
    fabricInfo: "100% Pure Organic Linen. Pre-washed for soft texture.",
    rating: 4.7,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "Essential summer staple. Lightweight but not transparent." }
    ]
  },
  {
    id: "cream-satin-skirt",
    name: "Monaco Bias Satin Skirt",
    price: 118,
    category: "skirts",
    description: "A gorgeous creamy-white bias-cut silk-satin maxi skirt that drapes beautifully over the body. Features a hidden elasticated waist.",
    color: "Cream",
    colors: [
      { name: "Cream", hex: "#fdfbf7" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_cream_satin.jpg"
    ],
    fabricInfo: "90% Mulberry Silk, 10% Elastane. Medium weight with luxury luster.",
    rating: 4.9,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "Liquid satin drape. Extremely flattering cut." }
    ]
  },
  {
    id: "white-satin-skirt",
    name: "Venice Satin Maxi Skirt",
    price: 122,
    category: "skirts",
    description: "A gorgeous flowing white silk-satin bias-cut maxi skirt. Captures the high-fashion city styling of Venice when paired with a black knit top.",
    color: "White",
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_white_satin.jpg"
    ],
    fabricInfo: "90% Mulberry Silk, 10% Elastane. Medium weight satin.",
    rating: 4.8,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "Stunning movement. The satin has a lovely heavyweight feel." }
    ]
  },
  {
    id: "yellow-look-skirt",
    name: "Capri Linen Blend Skirt",
    price: 108,
    category: "skirts",
    description: "A structured, pleated cotton-linen maxi skirt in crisp white. High-waisted silhouette designed to be belted and styled with resort wear linen shirts.",
    color: "White",
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_yellow_look.jpg"
    ],
    fabricInfo: "60% Cotton, 40% Organic Linen.",
    rating: 4.9,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Matches the Capri look perfectly. Easy to style and extremely breathable." }
    ]
  },
  {
    id: "texture-slub-skirt",
    name: "Tuscany Textured Maxi Skirt",
    price: 130,
    category: "skirts",
    description: "A breathtaking textured maxi skirt in an organic slub-cotton weave. Features delicate vertical pleat gathers and a romantic raw luxury feeling.",
    color: "Ivory",
    colors: [
      { name: "Ivory", hex: "#fafaf7" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_texture_slub.jpg"
    ],
    fabricInfo: "100% Organic Textured Cotton Slub.",
    rating: 5.0,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "Exquisite raw-texture feel. Feels very bespoke and expensive." }
    ]
  },
  {
    id: "sage-tiered-skirt",
    name: "Positano Tiered Chiffon Skirt",
    price: 125,
    category: "skirts",
    description: "A flowing tiered maxi skirt in a light sage green. Captures the nostalgic romance of historical Mediterranean water canals and brick paths.",
    color: "Sage Green",
    colors: [
      { name: "Sage Green", hex: "#8a9a86" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_sage_tiered.jpg"
    ],
    fabricInfo: "100% Chiffon Crepe. Fully lined with soft viscose.",
    rating: 4.8,
    reviews: [
      { author: "Hanna B.", rating: 5, comment: "Beautiful muted sage color. Flows like water." }
    ]
  },
  {
    id: "blush-watercolor-skirt",
    name: "Amalfi Ruffle Wrap Skirt",
    price: 115,
    category: "skirts",
    description: "A romantic high-waisted wrap skirt featuring a delicate blush pink watercolor motif. Cascading ruffle details add beautiful movement.",
    color: "Blush Pink Watercolor",
    colors: [
      { name: "Blush Pink Watercolor", hex: "#ebd0d4" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_blush_watercolor.jpg"
    ],
    fabricInfo: "70% Viscose, 30% Silk blend. Soft touch fabric.",
    rating: 4.9,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "Lovely subtle print. Pairs beautifully with simple white crop tops." }
    ]
  },
  {
    id: "boho-paisley-skirt",
    name: "Tuscany Paisley Tiered Skirt",
    price: 135,
    category: "skirts",
    description: "A gorgeous tiered cotton maxi skirt featuring a detailed brown and amber paisley print. Offers a sophisticated rustic European chic style.",
    color: "Paisley Brown",
    colors: [
      { name: "Paisley Brown", hex: "#7b4f37" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_boho_paisley.jpg"
    ],
    fabricInfo: "100% Cotton Voile. Fully lined with cotton.",
    rating: 4.9,
    reviews: [
      { author: "Charlotte T.", rating: 5, comment: "Matches the rustic Italian countryside perfectly. Beautiful tiered volume." }
    ]
  },
  {
    id: "beige-linen-skirt",
    name: "Palermo Tailored Linen Skirt",
    price: 128,
    category: "skirts",
    description: "A structured high-waisted linen maxi skirt in an elegant oat-beige shade. Features sharp front pleats and side slip pockets.",
    color: "Oat Beige",
    colors: [
      { name: "Oat Beige", hex: "#c8bdaf" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_beige_linen.jpg"
    ],
    fabricInfo: "80% Organic Linen, 20% Cotton blend.",
    rating: 4.8,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "The pleats add such a clean line. Fabric is nice and substantial." }
    ]
  },
  {
    id: "brown-satin-skirt",
    name: "Como Chocolate Satin Skirt",
    price: 120,
    category: "skirts",
    description: "A luxurious chocolate brown bias-cut silk-satin maxi skirt. Drapes beautifully over the body with a rich natural luster.",
    color: "Chocolate Brown",
    colors: [
      { name: "Chocolate Brown", hex: "#3e2723" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_brown_satin.jpg"
    ],
    fabricInfo: "90% Mulberry Silk, 10% Elastane. Medium weight satin.",
    rating: 5.0,
    reviews: [
      { author: "Marie L.", rating: 5, comment: "Breathtaking dark brown tone. Feels like absolute silk water." }
    ]
  },
  {
    id: "white-wrap-midi-skirt",
    name: "Riviera Linen Wrap Midi",
    price: 110,
    category: "skirts",
    description: "A timeless white mock wrap midi skirt crafted from structured heavy organic linen. Features a clean straight drape and side-tie waist details.",
    color: "White",
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_white_wrap_midi.jpg"
    ],
    fabricInfo: "100% Pure Organic Linen. Pre-washed for soft texture.",
    rating: 4.7,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "Pristine white linen. Very high-end styling." }
    ]
  },
  {
    id: "cream-lace-skirt",
    name: "Sardinia Lace Tiered Skirt",
    price: 140,
    category: "skirts",
    description: "An exquisite ivory lace tiered ruffle maxi skirt. Offers a nostalgic, romantic Mediterranean summer aesthetic.",
    color: "Ivory Cream",
    colors: [
      { name: "Ivory Cream", hex: "#faf5eb" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_cream_lace.jpg"
    ],
    fabricInfo: "80% Cotton Lace, 20% Polyamide. Viscose lining.",
    rating: 4.9,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "The lace is soft and details are amazing. Looks wonderful with the black linen top." }
    ]
  },
  {
    id: "brown-mermaid-skirt",
    name: "Portofino Mermaid Maxi Skirt",
    price: 124,
    category: "skirts",
    description: "An elegant dark brown crepe maxi skirt with a fitted mermaid flare at the lower hem. Styled perfectly with soft open-knit crochet tops.",
    color: "Portofino Brown",
    colors: [
      { name: "Portofino Brown", hex: "#4a3b32" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/skirt_brown_mermaid.jpg"
    ],
    fabricInfo: "75% Crepe Viscose, 20% Cotton, 5% Elastane.",
    rating: 4.9,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Incredible mermaid shape. It flows beautifully at the hem and fits like a glove." }
    ]
  },

  // TROUSERS
  {
    id: "sand-linen-trousers",
    name: "Ischia Wide-Leg Linen Trousers",
    price: 120,
    category: "trousers",
    description: "Beautifully draped off-white sand-toned wide-leg linen trousers. Features soft front waist pleats. Perfect to style with linen button-up tops.",
    color: "Sand",
    colors: [
      { name: "Sand", hex: "#e2dacb" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/trouser_sand_linen.jpg"
    ],
    fabricInfo: "100% Organic Linen. Pre-washed for soft luxury feel.",
    rating: 4.8,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "Unbelievably soft linen. The drape is incredibly fluid." }
    ]
  },
  {
    id: "dark-blue-denim",
    name: "Monaco Wide-Leg Denim",
    price: 130,
    category: "trousers",
    description: "Ultra-premium dark blue raw denim wide-leg jeans with a high-waisted rise. Designed to pair beautifully with black crop tanks.",
    color: "Navy Blue",
    colors: [
      { name: "Navy Blue", hex: "#1d2a44" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/trouser_dark_blue_denim.jpg"
    ],
    fabricInfo: "100% Premium Cotton Denim.",
    rating: 4.9,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "The structure is pristine. Hard to find high-waisted denim of this caliber." }
    ]
  },
  {
    id: "beige-linen-suit-trousers",
    name: "Parisienne Linen Tailored Trousers",
    price: 135,
    category: "trousers",
    description: "Tailored wide-leg summer trousers in high-quality oat-beige linen. Designed to match perfectly with our linen vest for a unified luxury coord.",
    color: "Oat Beige",
    colors: [
      { name: "Oat Beige", hex: "#c8bdaf" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/trouser_beige_linen_street.jpg"
    ],
    fabricInfo: "80% Organic Linen, 20% Premium Cotton.",
    rating: 5.0,
    reviews: [
      { author: "Marie L.", rating: 5, comment: "I wear them as a full set constantly. Unbelievably chic." }
    ]
  },
  {
    id: "light-denim-elevator",
    name: "Capri Light-Wash Denim",
    price: 125,
    category: "trousers",
    description: "High-waisted wide-leg jeans in a soft light-wash finish. Captures classic resort elegance when paired with structured halter tops.",
    color: "Light Wash Denim",
    colors: [
      { name: "Light Wash Denim", hex: "#9bb8d3" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/trouser_light_denim_elevator.jpg"
    ],
    fabricInfo: "100% Recycled Cotton Denim.",
    rating: 4.8,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "The wash is exactly what I wanted. Very vintage French style." }
    ]
  },
  {
    id: "light-denim-bedroom",
    name: "Sorrento Casual Wide-Leg Denim",
    price: 118,
    category: "trousers",
    description: "A relaxed, wide-leg light-wash denim jean. Offers a highly comfortable drape for casual luxury loungewear styling.",
    color: "Light Wash Denim",
    colors: [
      { name: "Light Wash Denim", hex: "#a5c2de" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/trouser_light_denim_bedroom.jpg"
    ],
    fabricInfo: "98% Cotton Denim, 2% Elastane for soft comfort stretch.",
    rating: 4.9,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "Super soft denim, almost feels like loungewear." }
    ]
  },
  {
    id: "camel-pleated-trousers",
    name: "Rome Pleated Crepe Trousers",
    price: 125,
    category: "trousers",
    description: "An editorial wide-leg crepe trousers in rich camel-brown. Tailored with sharp front waist pleats. Perfect when styled with a sleeveless mock-neck knit.",
    color: "Camel-Brown",
    colors: [
      { name: "Camel-Brown", hex: "#a67c52" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "/assets/trouser_camel_pleated.jpg"
    ],
    fabricInfo: "75% Crepe Viscose, 20% Polyester, 5% Elastane.",
    rating: 4.9,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "The tailoring is flawless. Instantly elevates a simple sleeveless knit." }
    ]
  },

  // BLAZERS
  {
    id: "st-tropez-blazer",
    name: "St. Tropez Linen Blazer",
    price: 180,
    category: "blazers",
    description: "An unstructured blazer silhouette in fine washed linen. Shoulder pads for a soft lift, double breasted closure, mock horn buttons, and functional patch pockets. Pairs effortlessly with linen trousers.",
    color: "Ivory Cream",
    colors: [
      { name: "Ivory Cream", hex: "#fcfaf4" },
      { name: "Camel", hex: "#c19a6b" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=1000&q=80",
      "/assets/hero_editorial.png"
    ],
    fabricInfo: "100% Linen with 100% Cotton body lining.",
    rating: 4.9,
    reviews: [
      { author: "Charlotte T.", rating: 5, comment: "A quiet luxury staple. The color is the perfect soft cream." }
    ]
  },
  {
    id: "parisienne-blazer",
    name: "Parisienne Double-Breasted Blazer",
    price: 220,
    category: "blazers",
    description: "Sharp tailoring defined by clean peak lapels, double-breasted closure, and elegant gold metallic crest buttons. Fully lined in sleek satin. Fits slim and structured.",
    color: "Classic Black",
    colors: [
      { name: "Classic Black", hex: "#1a1a1a" },
      { name: "Navy Blue", hex: "#1d2a44" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&q=80"
    ],
    fabricInfo: "70% Wool, 30% Silk. Lining: 100% Viscose Satin.",
    rating: 5.0,
    reviews: [
      { author: "Gisele D.", rating: 5, comment: "Exquisite details. The buttons feel heavy and authentic. Worth every penny." }
    ]
  },

  // SHIRTS & BLOUSES
  {
    id: "sorrento-shirt",
    name: "Sorrento Linen Shirt",
    price: 85,
    category: "shirts-blouses",
    description: "An essential boyfriend-fit collared shirt in premium lightweight linen. Classic patch pocket at the chest, curved hemline, and button-cuffed sleeves. Designed to wear buttoned up or open over swimwear.",
    color: "Classic White",
    colors: [
      { name: "Classic White", hex: "#fafafa" },
      { name: "Soft Beige", hex: "#f0ebe1" },
      { name: "Olive", hex: "#556b2f" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1000&q=80",
      "/assets/collection_summer.png"
    ],
    fabricInfo: "100% Pure Italian Linen.",
    rating: 4.8,
    reviews: []
  },
  {
    id: "como-silk-blouse",
    name: "Como Silk Blouse",
    price: 140,
    category: "shirts-blouses",
    description: "Crafted in beautiful heavyweight Mulberry silk. Features a high cowl neckline, keyhole closure at the back, and tailored long cuffs with silk-covered buttons. Possesses a rich natural shine.",
    color: "Pearl Ivory",
    colors: [
      { name: "Pearl Ivory", hex: "#faf9f6" },
      { name: "Classic Black", hex: "#1a1a1a" }
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1000&q=80"
    ],
    fabricInfo: "100% Mulberry Silk. Dry clean recommended.",
    rating: 4.9,
    reviews: []
  },

  // LINEN SETS
  {
    id: "riviera-set",
    name: "Riviera Linen Set",
    price: 195,
    category: "linen-sets",
    description: "A two-piece lounge set containing a relaxed long-line short sleeve top and high-waist drawstring shorts. Offers supreme comfort while retaining a highly sophisticated, editorial silhouette.",
    color: "Soft Beige",
    colors: [
      { name: "Soft Beige", hex: "#ebe6db" },
      { name: "White", hex: "#fafafa" }
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=1000&q=80",
      "/assets/hero_editorial.png"
    ],
    fabricInfo: "100% Linen. Garment dyed for unique color depth.",
    rating: 4.7,
    reviews: [
      { author: "Hanna B.", rating: 4, comment: "Very elegant loungewear. Perfect for beach vacations." }
    ]
  },

  // HIJABS
  {
    id: "premium-chiffon-hijab",
    name: "Premium Georgette Chiffon Hijab",
    price: 29,
    category: "hijabs",
    description: "An elegant, lightweight georgette chiffon hijab with a delicate textured grip. Provides beautiful drape and structured folds that stay in place throughout the day. Finished with seamless baby hems.",
    color: "Sand",
    colors: [
      { name: "Sand", hex: "#e0d8cc" },
      { name: "Ivory Cream", hex: "#fbf9f5" },
      { name: "Taupe", hex: "#a39c93" },
      { name: "Soft Sage", hex: "#c4cbbe" }
    ],
    sizes: ["Standard (180cm x 75cm)"],
    images: [
      "/assets/silk_scarf.png",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=80"
    ],
    fabricInfo: "100% Georgette Polyester. Matte finish with slight texture for grip.",
    rating: 4.9,
    reviews: [
      { author: "Yasmin A.", rating: 5, comment: "The quality is unmatched. The drape is incredibly luxurious, and it stays put all day." },
      { author: "Lina F.", rating: 5, comment: "Gorgeous sand shade. Matches all my linen outfits perfectly." }
    ]
  },
  {
    id: "luxury-silk-hijab",
    name: "Luxury Silk-Satin Hijab",
    price: 45,
    category: "hijabs",
    description: "Crafted in a premium silk and viscose blend, this hijab has a stunning luster on one side and a textured matte finish on the other to prevent slipping. Absolute luxury for formal settings.",
    color: "Ivory",
    colors: [
      { name: "Ivory", hex: "#fafaf4" },
      { name: "Champagne", hex: "#eddcca" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["Standard (180cm x 70cm)"],
    images: [
      "/assets/silk_scarf.png",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1000&q=80"
    ],
    fabricInfo: "60% Silk, 40% Viscose. Hand wash only.",
    rating: 5.0,
    reviews: [
      { author: "Mariam H.", rating: 5, comment: "Pure elegance. Has a beautiful weight and shine. I purchased the Champagne as well!" }
    ]
  },

  // HEAD SCARVES
  {
    id: "como-silk-hair-scarf",
    name: "Como Silk Hair Scarf",
    price: 32,
    category: "head-scarves",
    description: "A square silk scarf featuring a timeless minimalist border print inspired by Italian lake estates. Can be styled around the head, neck, or tied to your handbag handle.",
    color: "Cream & Black",
    colors: [
      { name: "Cream & Black", hex: "#faf9f6" }
    ],
    sizes: ["One Size (60cm x 60cm)"],
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1000&q=80",
      "/assets/silk_scarf.png"
    ],
    fabricInfo: "100% Silk Twill. Features hand-rolled hems.",
    rating: 4.8,
    reviews: []
  },
  {
    id: "monaco-silk-scarf",
    name: "Monaco Gold-Trim Scarf",
    price: 38,
    category: "head-scarves",
    description: "A premium square scarf in pure silk satin. Features a sophisticated cream center outlined by navy blue and framed with a thin elegant gold chain motif. Epitomizes the French Riviera holiday aesthetic.",
    color: "Gold Border Ivory",
    colors: [
      { name: "Gold Border Ivory", hex: "#f7f1e3" }
    ],
    sizes: ["One Size (70cm x 70cm)"],
    images: [
      "/assets/silk_scarf.png",
      "/assets/luxury_accessory.png"
    ],
    fabricInfo: "100% Silk Satin. Lightweight with high drape.",
    rating: 4.9,
    reviews: [
      { author: "Olivia S.", rating: 5, comment: "Looks so vintage and gorgeous when driving in a convertible or at the beach." }
    ]
  },

  // SHOES
  {
    id: "capri-sandals",
    name: "Capri Leather Sandals",
    price: 110,
    category: "shoes",
    description: "Minimalist flat sandals handmade with premium vachetta leather straps. Features a subtle gold buckle closure, cushioned footbed, and durable leather outsole. Pairs with anything from denim to maxi dresses.",
    color: "Tan Leather",
    colors: [
      { name: "Tan Leather", hex: "#b87d4b" },
      { name: "Nero Black", hex: "#111111" }
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1000&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1000&q=80"
    ],
    fabricInfo: "100% Calfskin Vachetta Leather upper and lining. Rubber traction heel patch.",
    rating: 4.7,
    reviews: []
  },
  {
    id: "milan-slides",
    name: "Milan Leather Slides",
    price: 95,
    category: "shoes",
    description: "Slip-on leather mules defined by a clean, geometric cut-out band. Perfect for quick yet elegant departures. Soft padded leather details support standard steps comfortably.",
    color: "Cream Ivory",
    colors: [
      { name: "Cream Ivory", hex: "#faf6ed" },
      { name: "Black", hex: "#111111" }
    ],
    sizes: ["36", "37", "38", "39", "40"],
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&q=80"
    ],
    fabricInfo: "100% Italian Nappa Leather. Handcrafted in Tuscany.",
    rating: 4.8,
    reviews: []
  },

  // BAGS
  {
    id: "signature-tote",
    name: "Bellemont Signature Leather Tote",
    price: 280,
    category: "bags",
    description: "An unstructured tote bag crafted from rich pebbled leather. Unlined raw leather interior features a removable zip pouch for keys and documents. Embellished with a minimalist gold logo print.",
    color: "Pebbled Sand",
    colors: [
      { name: "Pebbled Sand", hex: "#d8cca3" }
    ],
    sizes: ["One Size"],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=80"
    ],
    fabricInfo: "100% Full-Grain Calfskin Leather. Gold-toned brass details.",
    rating: 4.9,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "The leather is exceptionally soft, smells amazing, and fits my laptop and essentials with style." }
    ]
  },
  {
    id: "burgundy-clasp-bag",
    name: "Como Burgundy Shoulder Bag",
    price: 165,
    category: "bags",
    description: "An elegant, structured shoulder bag in rich burgundy brown leather. Features a classic gold lock clasp and a clean, timeless silhouette.",
    color: "Burgundy",
    colors: [
      { name: "Burgundy", hex: "#581c1c" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_burgundy_clasp.jpg"
    ],
    fabricInfo: "100% Premium Box Calfskin Leather.",
    rating: 4.9,
    reviews: [
      { author: "Hanna B.", rating: 5, comment: "Matches all my classic coats. Extremely high quality leather." }
    ]
  },
  {
    id: "brown-oversized-tote",
    name: "Milan Oversized Leather Tote",
    price: 240,
    category: "bags",
    description: "A spacious, structured travel/work tote bag crafted from rich textured dark brown leather. Features top double handles and a secure zip closure.",
    color: "Dark Brown",
    colors: [
      { name: "Dark Brown", hex: "#423229" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_brown_oversized_tote.jpg"
    ],
    fabricInfo: "100% Full-Grain Pebbled Calfskin Leather.",
    rating: 5.0,
    reviews: [
      { author: "Marie L.", rating: 5, comment: "Absolutely gorgeous work tote. Fits a laptop, planner, and cosmetics easily." }
    ]
  },
  {
    id: "black-belt-tote",
    name: "Parisienne Top-Handle Handbag",
    price: 195,
    category: "bags",
    description: "An iconic structured top-handle bag designed in black smooth leather. Features thin double top handles and a refined gold belt clasp.",
    color: "Classic Black",
    colors: [
      { name: "Classic Black", hex: "#111111" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_black_belt_tote.jpg"
    ],
    fabricInfo: "100% Genuine Box Calf Leather. Gold-plated hardware.",
    rating: 4.9,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Stunning! Reminds me of vintage French campaign collections." }
    ]
  },
  {
    id: "brown-gold-clasp-bag",
    name: "Rome Frame Clutch Handbag",
    price: 185,
    category: "bags",
    description: "A beautifully structured rectangular frame top-handle clutch in deep brown leather. Accented with a sleek gold-finished top clasp.",
    color: "Deep Brown",
    colors: [
      { name: "Deep Brown", hex: "#3e2723" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_brown_gold_clasp.jpg"
    ],
    fabricInfo: "100% Smooth Glazed Calfskin.",
    rating: 4.8,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "So sophisticated. Received multiple compliments on my very first evening out." }
    ]
  },
  {
    id: "black-pearl-clasp-bag",
    name: "Sardinia Pearl-Clasp Handbag",
    price: 198,
    category: "bags",
    description: "A gorgeous structured top-handle handbag in classic black leather. Features a luxurious gold clasp embellished with delicate white pearls.",
    color: "Classic Black",
    colors: [
      { name: "Classic Black", hex: "#111111" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_black_pearl_clasp.jpg"
    ],
    fabricInfo: "100% Premium Nappa Leather.",
    rating: 4.9,
    reviews: [
      { author: "Sofia M.", rating: 5, comment: "The pearl clasp adds the perfect touch of vintage femininity." }
    ]
  },
  {
    id: "black-barrel-bag",
    name: "Ischia Barrel Shoulder Bag",
    price: 175,
    category: "bags",
    description: "A unique, minimalist cylinder-shaped barrel handbag designed in black smooth leather. Features elongated double top shoulder straps.",
    color: "Classic Black",
    colors: [
      { name: "Classic Black", hex: "#111111" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_black_barrel.jpg"
    ],
    fabricInfo: "100% Fine Calfskin Nappa Leather.",
    rating: 4.8,
    reviews: [
      { author: "Hanna B.", rating: 5, comment: "Beautiful barrel shape. Holds more than it looks!" }
    ]
  },
  {
    id: "plum-satchel-bag",
    name: "Venice Top-Handle Satchel",
    price: 210,
    category: "bags",
    description: "An exquisite, structured satchel bag in a rich plum/burgundy leather. Features a contrasting white top handle and gold metal bar detailing.",
    color: "Plum & White",
    colors: [
      { name: "Plum & White", hex: "#4d2230" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_plum_satchel.jpg"
    ],
    fabricInfo: "100% Genuine Calf Leather with gold hardware accents.",
    rating: 5.0,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "Breathtaking design. The contrast of the white handle is brilliant." }
    ]
  },
  {
    id: "tan-slouchy-tote",
    name: "Sorrento Slouchy Shoulder Tote",
    price: 185,
    category: "bags",
    description: "A beautifully slouchy, oversized shoulder tote in a rich tan color. A highly versatile bag with a spacious interior and clean seams.",
    color: "Rich Tan",
    colors: [
      { name: "Rich Tan", hex: "#a05a2c" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_tan_slouchy_tote.jpg"
    ],
    fabricInfo: "100% Soft Calfskin Suede-Leather blend.",
    rating: 4.9,
    reviews: [
      { author: "Marie L.", rating: 5, comment: "Perfect travel tote. Extremely spacious and durable." }
    ]
  },
  {
    id: "olive-crossbody-bag",
    name: "Capri Leather Flap Crossbody",
    price: 168,
    category: "bags",
    description: "A structured, clean crossbody shoulder bag in a sophisticated olive green leather. Designed with adjustable shoulder straps and silver buckles.",
    color: "Olive Green",
    colors: [
      { name: "Olive Green", hex: "#4d5b41" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_olive_crossbody.jpg"
    ],
    fabricInfo: "100% Premium Matte Box Leather.",
    rating: 4.7,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Beautiful deep olive tone. Pairs very well with white shirt dresses." }
    ]
  },
  {
    id: "brown-flap-handbag",
    name: "Palermo Classic Flap Handbag",
    price: 190,
    category: "bags",
    description: "A timeless dark chocolate brown structured handbag. Designed with a clean front flap cover, short leather top handle, and adjustable shoulder strap.",
    color: "Chocolate Brown",
    colors: [
      { name: "Chocolate Brown", hex: "#3e2723" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_brown_flap_handbag.jpg"
    ],
    fabricInfo: "100% Full-Grain Calf Leather.",
    rating: 4.9,
    reviews: [
      { author: "Diana W.", rating: 5, comment: "Sophisticated everyday luxury. Sturdy construction." }
    ]
  },
  {
    id: "brown-bow-bag",
    name: "Milan Bow Shoulder Bag",
    price: 160,
    category: "bags",
    description: "A structured shoulder bag in rich chocolate brown leather featuring delicate tied side leather bows. Elegant and feminine.",
    color: "Chocolate Brown",
    colors: [
      { name: "Chocolate Brown", hex: "#3e2723" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_brown_bow.jpg"
    ],
    fabricInfo: "100% Premium Smooth Calfskin.",
    rating: 4.8,
    reviews: [
      { author: "Hanna B.", rating: 5, comment: "Matches all my classic coats. Extremely high quality leather." }
    ]
  },
  {
    id: "brown-scarf-tote",
    name: "Parisienne Scarf Accent Tote",
    price: 195,
    category: "bags",
    description: "A beautifully structured brown leather tote bag accented with an elegant cream-and-gold chain printed silk scarf wrapped around the strap handle.",
    color: "Tan Brown",
    colors: [
      { name: "Tan Brown", hex: "#8b5a2b" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_brown_scarf_tote.jpg"
    ],
    fabricInfo: "100% Genuine Grainy Leather. 100% Silk Scarf detail.",
    rating: 4.9,
    reviews: [
      { author: "Evelyn K.", rating: 5, comment: "The silk scarf adds such a premium detail. Love it!" }
    ]
  },
  {
    id: "burgundy-slouchy-hobo",
    name: "Amalfi Slouchy Hobo Bag",
    price: 178,
    category: "bags",
    description: "An ultra-chic, slouchy hobo bag in deep burgundy plum leather. Designed with a wide flat shoulder strap for comfortable city wear.",
    color: "Deep Burgundy",
    colors: [
      { name: "Deep Burgundy", hex: "#4d1a1a" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/bag_burgundy_slouchy_hobo.jpg"
    ],
    fabricInfo: "100% Soft Grained Calfskin.",
    rating: 4.9,
    reviews: [
      { author: "Clara V.", rating: 5, comment: "Incredibly chic slouchy shape. Fits my book and all essentials." }
    ]
  },

  // ACCESSORIES
  {
    id: "burker-gold-burgundy-watch",
    name: "Burker Signature Gold & Burgundy Watch",
    price: 195,
    category: "accessories",
    description: "An elegant, vintage-inspired timepiece featuring a signature rectangular case with a deep burgundy sunray dial. Complete with a polished gold link bracelet and a matching gold cuff. A true classic designed for sophisticated daily wear.",
    color: "Gold & Burgundy",
    colors: [
      { name: "Gold & Burgundy", hex: "#800020" }
    ],
    sizes: ["One Size (Adjustable)"],
    images: [
      "/assets/accessory_gold_watch_burgundy.jpg"
    ],
    fabricInfo: "18k Gold-Plated Stainless Steel. Japanese Quartz movement. 3ATM Water Resistant.",
    rating: 4.9,
    reviews: []
  },
  {
    id: "aurelia-double-snake-necklace",
    name: "Aurelia Double Layer Snake Necklace",
    price: 95,
    category: "accessories",
    description: "A minimalist double-layered necklace featuring a thick flat herringbone snake chain and a delicate companion rope chain. Designed to sit perfectly on the collarbone, adding a sleek gold accent to linen shirting and silk dresses.",
    color: "Gold",
    colors: [
      { name: "Gold", hex: "#d4af37" }
    ],
    sizes: ["One Size (16\" + 18\" with 2\" extender)"],
    images: [
      "/assets/accessory_gold_snake_necklace.jpg"
    ],
    fabricInfo: "18k Gold Plated Sterling Silver. Lead and nickel free.",
    rating: 4.8,
    reviews: []
  },
  {
    id: "meyear-vintage-octagon-watch",
    name: "Meyear Vintage Octagon Watch",
    price: 220,
    category: "accessories",
    description: "An exquisite rose gold/gold timepiece crafted with an octagonal face, mineral glass, and a deep matte black dial featuring delicate crystal indices. Fitted with a unique chunky rectangular link bracelet.",
    color: "Rose Gold",
    colors: [
      { name: "Rose Gold", hex: "#b76e79" }
    ],
    sizes: ["One Size (Adjustable)"],
    images: [
      "/assets/accessory_gold_watch_black.jpg"
    ],
    fabricInfo: "18k Rose Gold-Plated Stainless Steel. Premium Quartz movement.",
    rating: 4.9,
    reviews: []
  },
  {
    id: "monaco-rectangular-sunglasses",
    name: "Monaco Rectangular Sunglasses",
    price: 110,
    category: "accessories",
    description: "A bold yet classic rectangular silhouette crafted from thick, polished black bio-acetate. Outfitted with solid black lenses providing 100% UVA/UVB protection. The ultimate statement accessory for quiet luxury.",
    color: "Classic Black",
    colors: [
      { name: "Classic Black", hex: "#111111" }
    ],
    sizes: ["One Size"],
    images: [
      "/assets/accessory_black_sunglasses.jpg"
    ],
    fabricInfo: "Handcrafted Bio-Acetate Frame. Scratch-resistant CR-39 lenses.",
    rating: 4.7,
    reviews: []
  },
  {
    id: "la-maison-gold-bangle-set",
    name: "La Maison Gold Bangle Set",
    price: 145,
    category: "accessories",
    description: "A curated set of handcrafted 18k gold plated bangles, featuring a mix of fluid organic wavy bands, sleek minimalist cuffs, double-band stacked bangles, and delicate beaded designs.",
    color: "Gold",
    colors: [
      { name: "Gold", hex: "#d4af37" }
    ],
    sizes: ["One Size (Malleable/Adjustable)"],
    images: [
      "/assets/accessory_gold_bracelets_tray.jpg"
    ],
    fabricInfo: "18k Gold Plated Brass. High polish finish. Anti-tarnish coating.",
    rating: 5.0,
    reviews: []
  }
];

const baseUrl = import.meta.env.BASE_URL || '/';

export const products = rawProducts.map(p => ({
  ...p,
  images: p.images.map(img => img.startsWith('/') ? `${baseUrl}${img.slice(1)}` : img)
}));

export const getProductsByCategory = (categorySlug) => {
  return products.filter(p => p.category === categorySlug);
};

export const getProductById = (id) => {
  return products.find(p => p.id === id);
};

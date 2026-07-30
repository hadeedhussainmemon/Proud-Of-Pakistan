import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";
import Personality from "@/models/Personality";
import Business from "@/models/Business";
import Article from "@/models/Article";

export async function GET() {
  try {
    await dbConnect();

    // 1. Clean existing collections
    await User.deleteMany({});
    await Personality.deleteMany({});
    await Business.deleteMany({});
    await Article.deleteMany({});

    // 2. Seed Users
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@proudofpakistan.com",
      password: "password123",
      role: UserRole.ADMIN,
    });

    const contributorUser = await User.create({
      name: "Contributor User",
      email: "contributor@proudofpakistan.com",
      password: "password123",
      role: UserRole.CONTRIBUTOR,
    });

    // 3. Seed Personalities
    const personalities = await Personality.create([
      {
        name: "Dr. Abdus Salam",
        slug: "abdus-salam",
        category: "Science",
        biography: "Dr. Abdus Salam was a Pakistani theoretical physicist. He shared the 1979 Nobel Prize in Physics with Sheldon Glashow and Steven Weinberg for his contribution to the electroweak unification theory. He was the first Pakistani to receive a Nobel Prize in science.",
        birthDate: new Date("1926-01-29"),
        deathDate: new Date("1996-11-21"),
        achievements: [
          "Nobel Prize in Physics (1979)",
          "Hughes Medal (1990)",
          "Royal Medal (1978)",
          "Founded the International Centre for Theoretical Physics (ICTP)"
        ],
        images: ["/images/abdus-salam.jpg"],
        featured: true,
        company: "Imperial College London",
        awards: ["Nobel Prize in Physics", "Hughes Medal"],
        timeline: [
          { year: "1926", event: "Born in Jhang, Punjab" },
          { year: "1957", event: "Appointed Professor of Theoretical Physics at Imperial College" },
          { year: "1979", event: "Awarded Nobel Prize in Physics" }
        ],
        sponsored: false
      },
      {
        name: "Jahangir Khan",
        slug: "jahangir-khan",
        category: "Sports",
        biography: "Jahangir Khan is a former World No. 1 professional squash player from Pakistan. He is widely considered to be the greatest squash player of all time. During his career, he won the World Open six times and the British Open ten times.",
        birthDate: new Date("1963-12-10"),
        achievements: [
          "555 consecutive match wins (longest winning streak in professional sports history)",
          "6-time World Open Champion",
          "10-time British Open Champion"
        ],
        images: ["/images/jahangir-khan.jpg"],
        featured: true,
        company: "Pakistan Squash Federation",
        awards: ["Pride of Performance", "Hilal-e-Imtiaz"],
        timeline: [
          { year: "1963", event: "Born in Karachi, Sindh" },
          { year: "1981", event: "Became the youngest World Open Champion at age 17" },
          { year: "1981-1986", event: "Undefeated for 555 consecutive matches" }
        ],
        sponsored: false
      },
      {
        name: "Abdul Sattar Edhi",
        slug: "abdul-sattar-edhi",
        category: "Philanthropy",
        biography: "Abdul Sattar Edhi was a Pakistani humanitarian, philanthropist and ascetic who founded the Edhi Foundation, which runs the world's largest volunteer ambulance network, along with homeless shelters, animal shelters, rehab centres and orphanages.",
        birthDate: new Date("1928-02-28"),
        deathDate: new Date("2016-07-08"),
        achievements: [
          "Ramon Magsaysay Award (1986)",
          "Lenin Peace Prize (1988)",
          "Guinness World Record for largest volunteer ambulance service"
        ],
        images: ["/images/edhi.jpg"],
        featured: true,
        company: "Edhi Foundation",
        awards: ["Nishan-e-Imtiaz", "Lenin Peace Prize"],
        timeline: [
          { year: "1928", event: "Born in Bantva, Gujarat" },
          { year: "1951", event: "Established first clinic in Karachi" },
          { year: "1997", event: "Secured Guinness World Record for ambulance network" }
        ],
        sponsored: false
      },
      {
        name: "Arshad Nadeem",
        slug: "arshad-nadeem",
        category: "Sports",
        biography: "Arshad Nadeem is a Pakistani javelin thrower who won the Gold Medal at the 2024 Paris Olympics with an Olympic record throw of 92.97 meters, ending Pakistan's 32-year Olympic medal drought.",
        birthDate: new Date("1997-01-02"),
        achievements: [
          "Olympic Gold Medal (Paris 2024)",
          "Olympic Record Throw of 92.97m",
          "Commonwealth Games Gold Medal (2022)"
        ],
        images: ["/images/arshad-nadeem.jpg"],
        featured: true,
        company: "Pakistan Athletics",
        awards: ["Olympic Gold Medal", "Hilal-e-Imtiaz"],
        timeline: [
          { year: "1997", event: "Born in Mian Channu, Punjab" },
          { year: "2022", event: "Won Gold at Commonwealth Games" },
          { year: "2024", event: "Won Olympic Gold with a record 92.97m throw" }
        ],
        sponsored: false
      }
    ]);

    // 4. Seed Businesses
    const businesses = await Business.create([
      {
        name: "Systems Limited",
        slug: "systems-limited",
        category: "Technology",
        description: "Systems Limited is a global pioneer in IT services and software exports. Founded in 1977, the company has consistently delivered state-of-the-art software solutions, earning recognition as a leading digital enterprise in Pakistan.",
        websiteUrl: "https://www.systemsltd.com",
        featured: true,
        services: ["Software Development", "BPO Services", "Cloud & Infrastructure"],
        products: ["SysPay", "Retail Platforms"],
        premium: true
      },
      {
        name: "Habib Bank Limited (HBL)",
        slug: "hbl",
        category: "Finance",
        description: "Habib Bank Limited (HBL) is a commercial bank based in Karachi, Pakistan. It is the largest bank in Pakistan by assets, operating a massive branch network domestically and internationally, powering local infrastructure and development.",
        websiteUrl: "https://www.hbl.com",
        featured: true,
        services: ["Commercial Banking", "Consumer Banking", "Digital Finance"],
        products: ["HBL Mobile App", "HBL Konnect"],
        premium: true
      },
      {
        name: "National Foods",
        slug: "national-foods",
        category: "Food Processing",
        description: "National Foods is a premium packaged food brand bringing traditional Pakistani spices, recipe mixes, pickles, and sauces to household tables across the globe.",
        websiteUrl: "https://nfoods.com",
        featured: true,
        services: ["Food Manufacturing", "Exportation"],
        products: ["Recipe Spices", "Pickles", "Ketchup"],
        premium: false
      }
    ]);

    // 5. Seed Articles
    await Article.create([
      {
        title: "The electroweak unification theory and Nobel Prize history",
        subtitle: "Unpacking the legacy of Dr. Abdus Salam's physics achievements.",
        slug: "electroweak-unification-salam",
        category: "History",
        tags: ["Science", "Physics", "Nobel Prize"],
        content: "<p>Dr. Abdus Salam's work on the electroweak unification theory changed modern physics forever. This article covers the mathematical frameworks, his struggle for international scientific representation, and his founding of the ICTP in Trieste, Italy.</p>",
        authorId: adminUser._id,
        readTime: "6 min",
        featured: true,
        relatedPersonalities: [personalities[0]._id],
        province: "Punjab",
        city: "Jhang"
      },
      {
        title: "How Pak-based IT Hubs are Dominating Global Freelance Tech Exports",
        subtitle: "Startups and software enterprises driving the digital economy forward.",
        slug: "tech-exports-dominance",
        category: "Business",
        tags: ["Technology", "Exports", "Startups"],
        content: "<p>Pakistani software developers and technology startups are setting international records. With entities like Systems Limited at the vanguard, tech export growth is boosting national GDP and incubating innovative local tech talent.</p>",
        authorId: contributorUser._id,
        readTime: "8 min",
        featured: true,
        relatedBusinesses: [businesses[0]._id],
        province: "Punjab",
        city: "Lahore"
      },
      {
        title: "K2: The Wild Mountain Path and Tourism Opportunities",
        subtitle: "A detailed guide to trekking Gilgit-Baltistan's crown jewel.",
        slug: "k2-wild-mountain",
        category: "Tourism",
        tags: ["Tourism", "Mountains", "Gilgit-Baltistan"],
        content: "<p>K2, the world's second-highest peak, remains the ultimate test for mountaineers. This guide outlines the Karakoram highway routes, basecamp trekking tips, and environmental conservation guidelines for travelers.</p>",
        authorId: adminUser._id,
        readTime: "10 min",
        featured: true,
        province: "Gilgit-Baltistan",
        touristPlace: "K2 Basecamp"
      },
      {
        title: "Indus Valley Civilizations: Mohenjo-daro & Harappa Heritage",
        subtitle: "Unearthing the advanced urban planning of 3300 BCE.",
        slug: "indus-valley-civilizations",
        category: "History",
        tags: ["History", "Heritage", "Sindh"],
        content: "<p>Discover the grid architecture, drainage systems, and cultural items discovered in Mohenjo-daro (Sindh) and Harappa (Punjab), dating back over 5000 years.</p>",
        authorId: adminUser._id,
        readTime: "12 min",
        featured: true,
        province: "Sindh",
        city: "Larkana",
        historicalEvent: "Bronze Age Settlements"
      }
    ]);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with rich dynamic content for all pages!",
      usersCreated: 2,
      personalitiesCreated: 4,
      businessesCreated: 3,
      articlesCreated: 4,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

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
      password: "password123", // Note: In production use bcrypt
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
      },
      {
        name: "Habib Bank Limited (HBL)",
        slug: "hbl",
        category: "Finance",
        description: "Habib Bank Limited (HBL) is a commercial bank based in Karachi, Pakistan. It is the largest bank in Pakistan by assets, operating a massive branch network domestically and internationally, powering local infrastructure and development.",
        websiteUrl: "https://www.hbl.com",
        featured: true,
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
      }
    ]);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with Articles!",
      usersCreated: 2,
      personalitiesCreated: 3,
      businessesCreated: 2,
      articlesCreated: 2,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

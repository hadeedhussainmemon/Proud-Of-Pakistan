import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";
import Personality from "@/models/Personality";
import Business from "@/models/Business";
import Article from "@/models/Article";
import SiteConfig from "@/models/SiteConfig";

export async function GET() {
  try {
    await dbConnect();

    // 1. Clean existing collections
    await User.deleteMany({});
    await Personality.deleteMany({});
    await Business.deleteMany({});
    await Article.deleteMany({});
    await SiteConfig.deleteMany({});

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

    // 3. Seed site configuration with the user's specific text blocks
    await SiteConfig.create({
      key: "main",
      headline: "Proud of Pakistan – A Symbol of National Honor, Excellence, and Inspiration",
      subheadline: "Honoring exceptional citizens whose achievements, character, and service represent the strength and future of our nation.",
      logoUrl: "/logo.jpg",
      faviconUrl: "/favicon.ico",
      heroImageUrl: "/hero_visual.jpg",
      
      aboutIntro: "Proud of Pakistan is a prestigious national recognition platform established to honor extraordinary individuals whose achievements, leadership, innovation, integrity, and selfless service have made a meaningful contribution to Pakistan and its people.\n\nWe believe that every nation is strengthened by recognizing those who dedicate their lives to excellence, inspire others through their actions, and create lasting positive change. Proud of Pakistan exists to celebrate these remarkable individuals and ensure that their contributions receive the recognition they truly deserve.\n\nOur platform embraces excellence across every sector of society, including education, healthcare, science, technology, sports, arts, literature, media, entrepreneurship, public service, social welfare, environmental sustainability, research, law, and national defense. Every individual we recognize represents the resilience, talent, and limitless potential of Pakistan.\n\nMore than an awards platform, Proud of Pakistan is a national movement committed to promoting merit, celebrating achievement, and inspiring future generations to serve the nation with honor, integrity, and dedication.",
      
      vision: "Our vision is to establish Proud of Pakistan as the country's most respected and trusted national recognition platform, where excellence is celebrated, integrity is rewarded, and service to humanity is honored.\n\nWe envision a Pakistan where talented individuals from every province, city, and community receive equal opportunities to be recognized for their contributions regardless of their background, profession, or social status.\n\nOur long-term vision is to inspire generations of Pakistanis to pursue excellence, embrace innovation, demonstrate leadership, and dedicate their talents toward building a peaceful, prosperous, progressive, and globally respected Pakistan.",
      
      mission: "Our mission is to identify, recognize, honor, and promote individuals whose exceptional achievements have brought pride and dignity to Pakistan.\n\nWe are committed to creating opportunities that celebrate excellence, encourage innovation, strengthen patriotism, and inspire responsible citizenship.\n\nThrough national recognition programs, partnerships, educational initiatives, media engagement, and community collaboration, we strive to showcase inspiring success stories that motivate future generations to dream bigger, work harder, and serve society with sincerity.\n\nWe firmly believe that recognition creates inspiration, and inspiration creates transformation.",
      
      coreValues: [
        { name: "Excellence", description: "We celebrate outstanding achievements and encourage the highest standards in every field." },
        { name: "Integrity", description: "Honesty, transparency, ethics, and accountability remain the foundation of every decision we make." },
        { name: "Patriotism", description: "We promote love for Pakistan by recognizing those who elevate the nation's image through their achievements." },
        { name: "Service", description: "We honor individuals whose work improves lives and creates positive social impact." },
        { name: "Leadership", description: "We believe true leaders inspire others through vision, responsibility, and action." },
        { name: "Innovation", description: "We encourage creativity, research, technology, and new ideas that contribute to national development." },
        { name: "Equality", description: "Every deserving individual deserves equal recognition regardless of gender, ethnicity, religion, region, or socioeconomic background." },
        { name: "Respect", description: "Every achievement deserves appreciation, and every contributor deserves dignity." }
      ],
      
      objectives: "Our objectives are to discover hidden talent, recognize outstanding individuals, and inspire excellence throughout Pakistan.\n\nWe aim to encourage youth leadership, strengthen national unity, promote positive role models, and build a culture where merit is respected above all else.\n\nWe seek to create partnerships between educational institutions, government organizations, businesses, media, NGOs, and community leaders to support talent development and social progress.\n\nOur objective is also to project a positive image of Pakistan by highlighting the remarkable achievements of Pakistanis at both national and international levels.",
      
      selectionCriteria: "Every recipient of Proud of Pakistan is selected through a fair, transparent, and merit-based evaluation process.\n\nThe selection committee considers several important factors, including:\n• Exceptional achievements within the individual's profession or field.\n• Positive impact on society and community development.\n• Leadership, innovation, and creativity.\n• Professional excellence and ethical conduct.\n• Humanitarian contributions and social responsibility.\n• National or international recognition.\n• Consistency, dedication, and long-term commitment.\n• Inspiration provided to future generations.\n\nRecognition is based solely on merit, integrity, and measurable contribution.",
      
      categories: "Proud of Pakistan proudly recognizes excellence across diverse sectors, including:\n\nEducation\nHealthcare\nScience & Technology\nSports\nBusiness & Entrepreneurship\nArts & Culture\nLiterature\nMedia & Journalism\nSocial Welfare\nHumanitarian Services\nEnvironmental Sustainability\nResearch & Innovation\nWomen Empowerment\nYouth Leadership\nCommunity Development\nPublic Service\nLaw & Justice\nNational Defense\nLifetime Achievement\nSpecial Recognition Awards\n\nAdditional categories may be introduced to recognize emerging fields and outstanding contributions to society.",
      
      whyUs: "Every successful nation celebrates its heroes. Proud of Pakistan exists because countless extraordinary individuals serve the nation with dedication but often remain unrecognized.\n\nWe believe recognition is not merely an award—it is encouragement, appreciation, and inspiration. By honoring excellence, we motivate future generations to pursue meaningful success while contributing positively to society.\n\nProud of Pakistan is committed to preserving the stories of remarkable Pakistanis so they can inspire millions and become symbols of hope, resilience, and national pride.",
      
      founderMessage: "Welcome to Proud of Pakistan.\n\nThis platform was created with one simple but powerful belief: every individual who serves Pakistan with honesty, excellence, and dedication deserves recognition.\n\nThroughout our nation, countless people work tirelessly to improve lives, strengthen communities, advance knowledge, and represent Pakistan with dignity. Many of these remarkable individuals remain unseen despite their extraordinary contributions.\n\nProud of Pakistan was established to change that.\n\nOur mission is to celebrate those who inspire others through their achievements, values, and commitment to humanity. We believe that recognizing excellence encourages more excellence, and honoring service inspires more service.\n\nTogether, let us build a future where achievement is respected, character is valued, and every deserving Pakistani receives the recognition they have earned.\n\nThank you for being part of this journey toward a stronger, brighter, and more respected Pakistan.",
      
      impact: "Proud of Pakistan is committed to creating lasting national impact by recognizing excellence, inspiring youth, and promoting positive social change.\n\nOur platform connects extraordinary individuals with communities, institutions, businesses, media organizations, and future leaders.\n\nEach recognition represents more than an achievement—it becomes a story of hope, resilience, determination, and inspiration that encourages countless others to believe in their own potential.\n\nOur long-term impact is measured not only by the number of awards presented but by the lives inspired, opportunities created, partnerships established, and positive change generated throughout Pakistan.",
      
      joinUs: "Building a stronger Pakistan is a shared responsibility.\n\nWhether you are an educator, entrepreneur, athlete, researcher, healthcare professional, artist, social worker, business leader, student, public servant, or community volunteer, your contribution matters.\n\nWe invite individuals, organizations, educational institutions, corporate partners, media organizations, and community leaders to become part of the Proud of Pakistan movement.\n\nTogether, we can identify hidden talent, celebrate excellence, encourage innovation, strengthen national unity, and inspire future generations to build a Pakistan that every citizen can proudly call home.\n\nJoin Proud of Pakistan today, because together we celebrate excellence, honor service, and inspire the future of our nation."
    });

    // 4. Seed Personalities
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
        province: "Punjab",
        city: "Lahore"
      }
    ]);

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with dynamic text blocks and configs!",
      usersCreated: 2,
      personalitiesCreated: 3,
      articlesCreated: 2,
      configSeeded: true
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

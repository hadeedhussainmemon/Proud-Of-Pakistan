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

    // 4. Seed Top 10 Personalities of Pakistan
    const personalities = await Personality.create([
      {
        name: "Quaid-e-Azam Muhammad Ali Jinnah",
        slug: "muhammad-ali-jinnah",
        category: "Leadership",
        biography: "Muhammad Ali Jinnah was a barrister, politician and the founder of Pakistan. Jinnah served as the leader of the All-India Muslim League from 1913 until the nation's independence on 14 August 1947, and then as the dominion's first Governor-General.",
        birthDate: new Date("1876-12-25"),
        deathDate: new Date("1948-09-11"),
        achievements: [
          "Founder of the Islamic Republic of Pakistan",
          "First Governor-General of Pakistan",
          "Leader of the All-India Muslim League"
        ],
        images: ["/images/jinnah.jpg"],
        featured: true,
        company: "Government of Pakistan",
        awards: ["Baba-e-Qaum (Father of the Nation)"],
        timeline: [
          { year: "1876", event: "Born in Karachi, Sindh" },
          { year: "1913", event: "Joined All-India Muslim League" },
          { year: "1947", event: "Declaration of Independence & appointed Governor-General" }
        ],
        sponsored: false
      },
      {
        name: "Liaquat Ali Khan",
        slug: "liaquat-ali-khan",
        category: "Leadership",
        biography: "Liaquat Ali Khan was a Pakistani statesman, lawyer and political theorist who served as the first Prime Minister of Pakistan, playing a key role in building the new state's foundations.",
        birthDate: new Date("1895-10-01"),
        deathDate: new Date("1951-10-16"),
        achievements: [
          "First Prime Minister of Pakistan",
          "Presented the Objectives Resolution in 1949",
          "First Defense Minister of Pakistan"
        ],
        images: ["/images/liaquat.jpg"],
        featured: true,
        company: "Government of Pakistan",
        awards: ["Quaid-e-Millat (Leader of the Nation)"],
        timeline: [
          { year: "1895", event: "Born in Karnal, Punjab" },
          { year: "1947", event: "Appointed as the first Prime Minister of Pakistan" },
          { year: "1949", event: "Introduced the landmark Objectives Resolution" }
        ],
        sponsored: false
      },
      {
        name: "A. K. Fazlul Huq",
        slug: "fazlul-huq",
        category: "Leadership",
        biography: "Abul Kasem Fazlul Huq was a notable statesman who presented the historic Lahore Resolution (Pakistan Resolution) in 1940. He served as the first Chief Minister of East Bengal and Governor of East Pakistan.",
        birthDate: new Date("1873-10-26"),
        deathDate: new Date("1962-04-27"),
        achievements: [
          "Presented the historic Lahore Resolution (1940)",
          "First Chief Minister of East Bengal",
          "Founder of the Krishak Praja Party"
        ],
        images: ["/images/fazlul-huq.jpg"],
        featured: true,
        company: "Government of East Bengal",
        awards: ["Sher-e-Bangla (Tiger of Bengal)"],
        timeline: [
          { year: "1873", event: "Born in Bakerganj, Bengal Presidency" },
          { year: "1940", event: "Presented the Lahore Resolution advocating for a separate nation" },
          { year: "1954", event: "Appointed Chief Minister of East Bengal" }
        ],
        sponsored: false
      },
      {
        name: "Dr. Abdus Salam",
        slug: "abdus-salam",
        category: "Science",
        biography: "Dr. Abdus Salam was a theoretical physicist who shared the 1979 Nobel Prize in Physics for electroweak unification. He was the first Pakistani to win a Nobel Prize in science.",
        birthDate: new Date("1926-01-29"),
        deathDate: new Date("1996-11-21"),
        achievements: [
          "Nobel Prize in Physics (1979)",
          "Founded the International Centre for Theoretical Physics (ICTP)"
        ],
        images: ["/images/abdus-salam.jpg"],
        featured: true,
        company: "Imperial College London",
        awards: ["Nobel Prize in Physics", "Hughes Medal"],
        timeline: [
          { year: "1926", event: "Born in Jhang, Punjab" },
          { year: "1979", event: "Awarded Nobel Prize in Physics" }
        ],
        sponsored: false
      },
      {
        name: "Wasim Akram",
        slug: "wasim-akram",
        category: "Sports",
        biography: "Wasim Akram is a former Pakistani cricketer, widely regarded as the greatest fast bowler in the history of cricket. Known as the 'King of Swing', he pioneered reverse swing bowling.",
        birthDate: new Date("1966-06-03"),
        achievements: [
          "First bowler to reach 500 ODI wickets",
          "Pioneer of Reverse Swing Bowling",
          "1992 Cricket World Cup Champion"
        ],
        images: ["/images/wasim-akram.jpg"],
        featured: true,
        company: "Pakistan Cricket Board",
        awards: ["Pride of Performance", "Hilal-e-Imtiaz"],
        timeline: [
          { year: "1966", event: "Born in Lahore, Punjab" },
          { year: "1992", event: "Helped win the Cricket World Cup in Australia" },
          { year: "2003", event: "Retired as the highest wicket-taker in ODI history" }
        ],
        sponsored: false
      },
      {
        name: "Abdul Sattar Edhi",
        slug: "abdul-sattar-edhi",
        category: "Philanthropy",
        biography: "Abdul Sattar Edhi was a humanitarian who founded the Edhi Foundation, which runs the world's largest volunteer ambulance network, alongside homeless and rehab centers.",
        birthDate: new Date("1928-02-28"),
        deathDate: new Date("2016-07-08"),
        achievements: [
          "Guinness World Record for largest volunteer ambulance service",
          "Ramon Magsaysay Award (1986)"
        ],
        images: ["/images/edhi.jpg"],
        featured: true,
        company: "Edhi Foundation",
        awards: ["Nishan-e-Imtiaz", "Lenin Peace Prize"],
        timeline: [
          { year: "1928", event: "Born in Bantva, Gujarat" },
          { year: "1951", event: "Established first clinic in Karachi" }
        ],
        sponsored: false
      },
      {
        name: "Jahangir Khan",
        slug: "jahangir-khan",
        category: "Sports",
        biography: "Jahangir Khan is a former World No. 1 squash player. He won the World Open six times and is famous for an unmatched 555 consecutive match-winning streak.",
        birthDate: new Date("1963-12-10"),
        achievements: [
          "555 consecutive professional match wins (world record)",
          "10-time British Open Champion"
        ],
        images: ["/images/jahangir-khan.jpg"],
        featured: true,
        company: "Pakistan Squash Federation",
        awards: ["Pride of Performance", "Hilal-e-Imtiaz"],
        timeline: [
          { year: "1963", event: "Born in Karachi, Sindh" },
          { year: "1981", event: "Youngest World Open Squash Champion" }
        ],
        sponsored: false
      },
      {
        name: "Allama Muhammad Iqbal",
        slug: "allama-iqbal",
        category: "Literature",
        biography: "Allama Iqbal was a poet, philosopher, and politician, widely regarded as having inspired the Pakistan Movement. He is the national poet of Pakistan, often called 'Poet of the East'.",
        birthDate: new Date("1877-11-09"),
        deathDate: new Date("1938-04-21"),
        achievements: [
          "Proposed the concept of a separate Muslim state in his 1930 Allahabad Address",
          "Author of Bang-e-Dara, Bal-e-Jibril, and Zarb-i Kalim",
          "National Poet of Pakistan"
        ],
        images: ["/images/iqbal.jpg"],
        featured: true,
        company: "Muslim League",
        awards: ["Muffakir-e-Pakistan (The Thinker of Pakistan)"],
        timeline: [
          { year: "1877", event: "Born in Sialkot, Punjab" },
          { year: "1930", event: "Delivered the historic Allahabad Address proposing a homeland" },
          { year: "1938", event: "Passed away prior to Independence" }
        ],
        sponsored: false
      },
      {
        name: "Fatima Jinnah",
        slug: "fatima-jinnah",
        category: "Leadership",
        biography: "Fatima Jinnah was a dental surgeon, biographer and stateswoman. She was the sister of Quaid-e-Azam and co-founded the Pakistan Women's Association to help resettle female refugees.",
        birthDate: new Date("1893-07-31"),
        deathDate: new Date("1967-07-09"),
        achievements: [
          "Madar-e-Millat (Mother of the Nation)",
          "Co-founded the Pakistan Women's Association",
          "Key organizer of the female wing of All-India Muslim League"
        ],
        images: ["/images/fatima.jpg"],
        featured: true,
        company: "All-India Muslim League",
        awards: ["Madar-e-Millat"],
        timeline: [
          { year: "1893", event: "Born in Karachi, Sindh" },
          { year: "1947", event: "Led the rehabilitation of refugees post partition" },
          { year: "1965", event: "Ran in the historic presidential elections" }
        ],
        sponsored: false
      },
      {
        name: "Shoaib Akhtar",
        slug: "shoaib-akhtar",
        category: "Sports",
        biography: "Shoaib Akhtar, known as the 'Rawalpindi Express', is a former Pakistani cricketer who set the record for the fastest delivery in cricket history, clocked at 161.3 km/h (100.2 mph).",
        birthDate: new Date("1975-08-13"),
        achievements: [
          "Fastest delivery in cricket history (161.3 km/h)",
          "Over 400 international wickets for Pakistan"
        ],
        images: ["/images/shoaib-akhtar.jpg"],
        featured: true,
        company: "Pakistan Cricket Board",
        awards: ["Fastest Bowler Record Medal"],
        timeline: [
          { year: "1975", event: "Born in Rawalpindi, Punjab" },
          { year: "2003", event: "Bowled the fastest recorded delivery in the World Cup against England" }
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
        relatedPersonalities: [personalities[3]._id],
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
      message: "Database seeded successfully with Top 10 Personalities of Pakistan!",
      usersCreated: 2,
      personalitiesCreated: 10,
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

"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, MapPin, Landmark, BookOpen, Music, Users, Landmark as HistoryIcon } from "lucide-react";

interface ProvinceDetail {
  name: string;
  capital: string;
  historySummary: string;
  cultureSummary: string;
  foodSummary: string;
  cities: string[];
  attractions: string[];
}

const mockProvinces: Record<string, ProvinceDetail> = {
  punjab: {
    name: "Punjab",
    capital: "Lahore",
    historySummary: "Rich with Indus Valley Civilisation ruins, Mughal monuments, and colonial architecture. It is a historical gateway of civilization.",
    cultureSummary: "Famous for Punjabi Sufi music, lively festivals like Basant, and rich Punjabi literature (Heer Ranjha, Bulleh Shah).",
    foodSummary: "Renowned for Sarson ka Saag, Makki ki Roti, Karahi, Lahori Fish, and rich milk-based lassi.",
    cities: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Sialkot"],
    attractions: ["Badshahi Mosque", "Shalimar Gardens", "Rohtas Fort", "Katas Raj Temples"],
  },
  sindh: {
    name: "Sindh",
    capital: "Karachi",
    historySummary: "Home to the 5,000-year-old Mohenjo-daro civilization, the origin of Sufi mysticism in South Asia, and the historic port of Debal.",
    cultureSummary: "Celebrated for Sindhi Ajrak & Topi, classical Sufi music at Lal Shahbaz Qalandar and Shah Abdul Latif Bhittai shrines.",
    foodSummary: "Famous for Sindhi Biryani, Seyal Mani, Palla Fish, and sweet Rabri.",
    cities: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Thatta"],
    attractions: ["Mohenjo-daro", "Gorakh Hill", "Shah Jahan Mosque", "Ranikot Fort"],
  },
  "khyber-pakhtunkhwa": {
    name: "Khyber Pakhtunkhwa",
    capital: "Peshawar",
    historySummary: "Ancient Gandhara Civilization hub, home to the historic Khyber Pass, and key routes of Alexander the Great and Silk Road trade.",
    cultureSummary: "Rich Pashtun traditions, traditional Attan dance, Pashto poetry, and Gandhara art collections.",
    foodSummary: "Famous for Chapli Kebab, Kabuli Pulao, Shinwari Karahi, and Peshawari Kahwah.",
    cities: ["Peshawar", "Abbottabad", "Swat", "Mardan", "Mansehra"],
    attractions: ["Kalam Valley", "Lake Saif-ul-Muluk", "Khyber Pass", "Takht-i-Bahi Buddhist Ruins"],
  },
  balochistan: {
    name: "Balochistan",
    capital: "Quetta",
    historySummary: "Home to Mehrgarh, one of the earliest farming settlements in South Asia (7000 BCE), and the historic Kalat state.",
    cultureSummary: "Traditional Balochi music, tribal customs, Balochi embroidery, and cultural festivals like Sibi Mela.",
    foodSummary: "Famous for Balochi Sajji, Dampukht, Khaddi Kebab, and dry fruits.",
    cities: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Chaman"],
    attractions: ["Hingol National Park", "Kund Malir Beach", "Astola Island", "Pir Ghaib Waterfall"],
  },
  "gilgit-baltistan": {
    name: "Gilgit-Baltistan",
    capital: "Gilgit",
    historySummary: "Historically part of the silk road, containing ancient rock carvings, Buddhist inscriptions, and local kingdoms like Hunza and Nagar.",
    cultureSummary: "Unique Shina and Balti languages, local folk dances, and polo matches played on the highest fields globally.",
    foodSummary: "Famous for Chapshuro, Mamtu (dumplings), Harissa, and organic apricots.",
    cities: ["Gilgit", "Skardu", "Hunza", "Chilas"],
    attractions: ["Hunza Valley", "K2 Basecamp", "Attabad Lake", "Deosai Plains National Park"],
  },
  "azad-kashmir": {
    name: "Azad Kashmir",
    capital: "Muzaffarabad",
    historySummary: "A region rich in independent princely history, historic forts like Ramkot, and ancient temple ruins.",
    cultureSummary: "Kashmiri crafts, traditional paper mache art, wood carvings, and Kashmiri folk music.",
    foodSummary: "Famous for Kashmiri Rogan Josh, Wazwan, Gushtaba, and Kashmiri Pink Tea (Kashmiri Chai).",
    cities: ["Muzaffarabad", "Mirpur", "Rawalakot", "Bagh"],
    attractions: ["Neelum Valley", "Ratti Gali Lake", "Banjosa Lake", "Arang Kel Village"],
  }
};

export default function ProvinceDetailPage({ params }: { params: Promise<{ province: string }> }) {
  const resolvedParams = use(params);
  const provKey = resolvedParams.province.toLowerCase();
  const prov = mockProvinces[provKey] || {
    name: resolvedParams.province.toUpperCase(),
    capital: "Unknown",
    historySummary: "History overview coming soon.",
    cultureSummary: "Culture and lifestyle overview coming soon.",
    foodSummary: "Traditional cuisines overview coming soon.",
    cities: [],
    attractions: [],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Back Link */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-white font-semibold mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Explore
      </Link>

      {/* Header Banner */}
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-950/20 to-emerald-950/5 border border-emerald-500/10 mb-12">
        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-2">
          Province Capital: {prov.capital}
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
          Province of {prov.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* History */}
          <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/5">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <HistoryIcon className="h-4 w-4 text-amber-400" />
              History & Heritage
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed">{prov.historySummary}</p>
          </div>

          {/* Culture */}
          <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/5">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Music className="h-4 w-4 text-amber-400" />
              Culture, Music & Literature
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed">{prov.cultureSummary}</p>
          </div>

          {/* Food */}
          <div className="p-6 rounded-2xl bg-emerald-950/10 border border-emerald-500/5">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-400" />
              Traditional Cuisines
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed">{prov.foodSummary}</p>
          </div>
        </div>

        {/* Sidebar lists */}
        <div className="space-y-8">
          {/* Cities */}
          {prov.cities.length > 0 && (
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                Key Cities
              </h3>
              <div className="flex flex-col gap-2">
                {prov.cities.map((city) => (
                  <Link
                    key={city}
                    href={`/explore/${provKey}/${city.toLowerCase().replace(/\s+/g, "-")}`}
                    className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-500/5 hover:border-amber-400/30 text-emerald-100/80 hover:text-white transition-all text-xs font-semibold"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Attractions */}
          {prov.attractions.length > 0 && (
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Landmark className="h-4 w-4 text-amber-400" />
                Famous Attractions
              </h3>
              <ul className="text-xs text-emerald-100/70 space-y-2 pl-1">
                {prov.attractions.map((att) => (
                  <li key={att} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {att}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

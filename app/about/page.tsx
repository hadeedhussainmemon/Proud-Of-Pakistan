export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-neutral-100 bg-[#020805] font-sans">
      <div className="space-y-12">
        
        {/* Header */}
        <header className="border-b border-emerald-950/40 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Establishment & Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight leading-none mt-3">
            About <br />
            <span className="font-extrabold italic text-amber-400">Proud of Pakistan</span>
          </h1>
        </header>

        {/* Content paragraphs */}
        <div className="space-y-8 text-neutral-300 font-light leading-relaxed text-base text-justify">
          <p className="text-lg text-white font-normal leading-relaxed">
            Proud of Pakistan is a prestigious national recognition platform dedicated to honoring individuals whose outstanding achievements, exceptional talent, exemplary character, and selfless service have brought pride and distinction to Pakistan.
          </p>
          <p>
            The platform was established with the belief that every nation progresses by recognizing and celebrating the people who contribute positively to society. Proud of Pakistan serves as a bridge between exceptional individuals and the nation, ensuring that their efforts, sacrifices, and accomplishments receive the appreciation and recognition they truly deserve.
          </p>
          <p>
            Our mission extends beyond presenting awards. We aim to inspire future generations by highlighting remarkable stories of resilience, leadership, innovation, patriotism, and humanitarian service. Through this platform, we encourage a culture where merit, integrity, excellence, and national responsibility are recognized as the true measures of success.
          </p>
          <p>
            Proud of Pakistan welcomes individuals from every sector of society—including education, healthcare, science, technology, sports, arts and culture, literature, media, entrepreneurship, public service, social welfare, law, environmental sustainability, research, and national defense—who have made meaningful contributions to the development and positive image of Pakistan.
          </p>
          <p>
            By celebrating excellence and promoting positive role models, Proud of Pakistan strives to strengthen national unity, inspire young generations, and project a progressive, compassionate, and globally respected image of Pakistan.
          </p>
          
          <div className="border-t border-emerald-950/40 pt-8 text-center">
            <p className="font-bold text-amber-400 text-lg">
              Proud of Pakistan is more than an award—it is a national movement to recognize excellence, celebrate service, and inspire the future of Pakistan.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

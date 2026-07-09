import { Link } from 'react-router-dom';

const articlesData = [
  {
    title: "The Numbers Don't Add Up: Oakland NAACP and Community Leaders Demand Transparency, Accountability, and Answers from OUSD Leadership",
    content: "Public letter from NAACP Oakland to OUSD, June 24, 2026",
    url: "https://www.facebook.com/737480720/posts/pfbid02PTUQpqd54EC9fBeFevnua2QiqwhwgXC82CxrRfhEeKQaJQJ2oequgtw4qMBmLMPpL/?fs=e&mibextid=wwXIfr",
    image: "/images/naacpletter.jpg"
  },
  {
    title: "Alameda County Supt. Castro Urges OUSD to Provide a List of Tradeoffs at June Budget Meeting",
    content: "Letter from Alameda County Office of Education to OUSD, June 18, 2026",
    url: "https://oaklandsite.org/wp-content/uploads/2026/06/2025-26-OUSD-OEA-AB1200-Collective-Bargaining-Board-Letter-FINAL-06182026.docx.pdf",
    image: "/images/acoletter.jpg"
  }
];

export default function ArticlesAchievements() {
  return (
    <div className="min-h-[80vh] py-20 px-6 max-w-4xl mx-auto bg-warm-ivory">
      <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-10 text-center">
        Articles & Achievements
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articlesData.map((article, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
            <div className="h-48 bg-gray-100 overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-playfair text-xl font-bold text-rooted-black mb-2">{article.title}</h3>
              <p className="text-rooted-black/70 text-sm mb-4 flex-grow">{article.content}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-oakland-terracotta text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-sierra-sage transition-colors w-fit">
                Read Full Article &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">Return Home</Link>
      </div>
    </div>
  );
}

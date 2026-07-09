import HeroScene from '../components/3D/HeroScene';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-ivory">
      
      {/* 1. Hero Section (3D) */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
        
        <div className="relative z-10 max-w-md w-full mx-auto p-6 bg-warm-ivory/90 backdrop-blur-md rounded-xl sm:bg-transparent sm:backdrop-blur-none shadow-lg sm:shadow-none">
          <img src="/images/logo.png" alt="LeAna Powell Logo" className="w-24 h-auto mx-auto mb-4" />
          <p className="text-rooted-black/80 font-bold tracking-wider text-xs sm:text-sm uppercase mb-2">
            Oakland School Board District 6
          </p>
          <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-4">
            LeAna Powell
          </h1>
          <p className="text-lg sm:text-2xl text-rooted-black/80 mb-0 font-light">
            Rooted in Oakland. Fighting for Kids.
          </p>
        </div>

        <div className="relative z-10 mt-6">
          <a
            href="https://secure.actblue.com/donate/leana-powell-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-oakland-terracotta text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sierra-sage transition-colors shadow-lg"
          >
            Fuel the Movement &rarr;
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-rooted-black/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-45.17-85.17a8,8,0,0,1,11.31,0L120,156.69V88a8,8,0,0,1,16,0v68.69l25.83-25.83a8,8,0,0,1,11.31,11.31l-40,40a8,8,0,0,1-11.31,0l-40-40A8,8,0,0,1,82.83,130.83Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Intro & About Section (Headshot + New Copy + Paw Prints + Honeycomb) */}
      <section className="honeycomb-bg py-20 px-6 relative overflow-hidden">
        
        {/* Floating Paw Prints Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <span className="absolute top-10 left-5 text-6xl anim-float-1 text-rooted-black/10">🐾</span>
          <span className="absolute bottom-20 right-10 text-4xl anim-float-2 text-rooted-black/10">🐾</span>
          <span className="absolute top-1/2 left-1/4 text-8xl anim-float-3 text-rooted-black/5">🐾</span>
          <span className="absolute top-20 right-1/3 text-3xl anim-float-1 text-oakland-terracotta/10">🐾</span>
          <span className="absolute bottom-10 left-1/3 text-5xl anim-float-2 text-rooted-black/10">🐾</span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-lg border border-white/50">
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rooted-black mb-4 text-center">
            Hello, I'm<br />
            <span className="text-oakland-terracotta text-5xl sm:text-6xl">LeAna,</span>
          </h2>
          <p className="text-xl sm:text-2xl text-rooted-black/80 text-center font-light mb-8">
            and I'm running for Oakland School Board because every child should get the opportunity to have a quality education!
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6">
            {/* Headshot (Using the file listed in your images folder) */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 rounded-full overflow-hidden shadow-xl border-4 border-california-gold">
              <img src="/images/headshot.JPG" alt="LeAna Powell Headshot" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow">
              <h3 className="font-playfair text-2xl font-bold text-rooted-black mb-4">About LeAna</h3>
              <div className="space-y-4 text-base sm:text-lg text-rooted-black/80 leading-relaxed">
                <p>I’m a proud Oakland native, mom, parent advocate, and community leader running for the Oakland School Board to represent District 6.</p>
                <p>Born and raised in Oakland, my family has been in our town’s public schools for five generations. I have two children currently in Oakland Unified School District and one that graduated from high school. Oakland is home and the success of the district translates to success for my children and that of my extended family, friends, neighbors, and community, and so for me, this is very personal.</p>
                <p>As a mother of three children, some experiencing disabilities, I understand firsthand the challenges families face navigating public education systems while advocating for our students’ success. One of my children graduated high school during the unprecedented and disruptive pandemic, which gave me direct experience with the academic, emotional, and social impacts families experienced, which continue to this day.</p>
                <p>I am active in the Parent Teacher Organization (PTO) at Burckhalter Elementary, where I have experienced deep collaboration between families, educators, school staff, and administration. This has taught me that advocacy and collaboration are not opposites: effective leadership requires both!</p>
                <p>My professional experience includes budget and policy advocacy locally and at the California State Capitol; supporting and building capacity for education nonprofits that provide much needed resources to children and families; leading parent workshops related to children with special needs and behavioral health; engaging with public officials to ensure additional resources come to the community; and creating spaces to empower parents and strengthen community voices, among other experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Links to Coming Soon Pages */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rooted-black mb-12 text-center">Explore Our Community</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link to="/bear-necessities" className="group bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-california-gold">
            <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">🐻</span>
            <h3 className="font-playfair text-xl font-bold text-rooted-black">Bear Necessities</h3>
            <p className="text-rooted-black/60 mt-2 text-sm">Coming Soon</p>
          </Link>

          <Link to="/resources" className="group bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-california-gold">
            <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">📚</span>
            <h3 className="font-playfair text-xl font-bold text-rooted-black">Resources</h3>
            <p className="text-rooted-black/60 mt-2 text-sm">Coming Soon</p>
          </Link>

          <Link to="/the-den-live" className="group bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-california-gold">
            <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">🎙️</span>
            <h3 className="font-playfair text-xl font-bold text-rooted-black">The Den Live!</h3>
            <p className="text-rooted-black/60 mt-2 text-sm">Coming Soon</p>
          </Link>

          <Link to="/cub-house" className="group bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-california-gold">
            <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">🏠</span>
            <h3 className="font-playfair text-xl font-bold text-rooted-black">Cub House</h3>
            <p className="text-rooted-black/60 mt-2 text-sm">Coming Soon</p>
          </Link>

        </div>
      </section>
      
    </div>
  );
}

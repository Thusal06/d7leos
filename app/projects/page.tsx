"use client";
import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project { 
  id: string; 
  title: string; 
  category: 'meetings'|'religious'|'service'|'environment'|'youth'|'joint'; 
  description: string; 
  image: string; 
  date: string; 
  venue: string; 
  impact: string;
  gallery: string[];
}

const allProjects: Project[] = [
  { 
    id: 'firstcouncilmeeting', 
    title: 'First Council Meeting', 
    category: 'meetings', 
    description: 'We proudly marked a historic milestone with the First Council Meeting of Leo District 306 D7, held on 13th July 2025 at Skill Center, Mahanama College, Colombo 03. This pivotal gathering brought together the newly appointed district leadership, laying the foundation for a year of impactful service, unity, and innovation under the theme "Forge the Future." Here\'s to shaping a stronger, purpose-driven Leo movement together!', 
    image: '/images/projects/firstcouncilmeeting/1.jpg', 
    date: '2025-07-13', 
    venue: 'Skill Center, Mahanama College, Colombo 03', 
    impact: 'District leadership foundation established',
    gallery: [
      '/images/projects/firstcouncilmeeting/1.jpg',
      '/images/projects/firstcouncilmeeting/2.jpg',
      '/images/projects/firstcouncilmeeting/3.jpg',
      '/images/projects/firstcouncilmeeting/4.jpg',
      '/images/projects/firstcouncilmeeting/5.jpg',
      '/images/projects/firstcouncilmeeting/6.jpg'
    ]
  },
  { 
    id: 'ashirwadapooja', 
    title: 'ආශිර්වාද යාත්‍රා', 
    category: 'religious', 
    description: 'ආශිර්වාද යාත්‍රා — a special Multi-Religious Blessing Program organized by Leo District 306 D7 — was held on 13th July 2025. It was an inspiring moment of unity and peace, where diverse faiths came together to seek blessings and spiritual strength as we embark on a new chapter of service, leadership, and togetherness. May these blessings guide us with wisdom, compassion, and strength throughout the year ahead.', 
    image: '/images/projects/ashirwadapooja/1.jpg', 
    date: '2025-07-13', 
    venue: 'Multi-Religious Venue', 
    impact: 'Unity and spiritual strength for the district',
    gallery: [
      '/images/projects/ashirwadapooja/1.jpg',
      '/images/projects/ashirwadapooja/2.jpg',
      '/images/projects/ashirwadapooja/3.jpg',
      '/images/projects/ashirwadapooja/4.jpg',
      '/images/projects/ashirwadapooja/5.jpg',
      '/images/projects/ashirwadapooja/6.jpg',
      '/images/projects/ashirwadapooja/7.jpg',
      '/images/projects/ashirwadapooja/8.jpg'
    ]
  },
  { 
    id: 'pirith', 
    title: 'සර්වරාත්‍රික පිරිත් සජ්ඣායනාමය පිංකම', 
    category: 'religious', 
    description: 'අප්පමාදො අමත පදං- පමාදෝ මච්චුනෝ පදං අප්පමත්ථාන මියංති- යේ පමත්ථා යථා මතා. ලියෝවරුන් වන අප, ආධ්‍යාත්මික කටයුතු වල නියැලීම ද ඉතා වැදගත් ලෙස දක්වමින්, ලියෝ දිස්ත්‍රික්ක 306 D7 නව ලියෝ වර්ෂයට සහ ලියෝ දිස්ත්‍රික්කයට ආශිර්වාද පතා සිදු කරනු ලබන, සර්වරාත්‍රික පිරිත් සජ්ඣායනාමය පිංකම', 
    image: '/images/projects/pirith/1.jpg', 
    date: '2025-07-13', 
    venue: 'Buddhist Temple', 
    impact: 'Spiritual blessings for the new Leo year',
    gallery: [
      '/images/projects/pirith/1.jpg',
      '/images/projects/pirith/2.jpg',
      '/images/projects/pirith/3.jpg',
      '/images/projects/pirith/4.jpg',
      '/images/projects/pirith/5.jpg',
      '/images/projects/pirith/6.jpg',
      '/images/projects/pirith/7.jpg',
      '/images/projects/pirith/8.jpg'
    ]
  }
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'meetings', label: 'Meetings' },
  { key: 'religious', label: 'Religious' },
  { key: 'service', label: 'Service' },
  { key: 'environment', label: 'Environment' },
  { key: 'youth', label: 'Youth' },
  { key: 'joint', label: 'Joint Initiatives' }
] as const;

type CatKey = typeof categories[number]['key'];

export default function ProjectsPage() {
  const [active, setActive] = useState<CatKey>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoverImageIndex, setHoverImageIndex] = useState<{ [key: string]: number }>({});
  const [preloadedImages, setPreloadedImages] = useState<{ [key: string]: HTMLImageElement[] }>({});
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const projects = useMemo(() => (
    active === 'all' ? allProjects : allProjects.filter(p => p.category === active)
  ), [active]);

  // Preload images for smooth transitions
  useEffect(() => {
    const preloadProjectImages = async () => {
      const imageCache: { [key: string]: HTMLImageElement[] } = {};
      
      for (const project of allProjects) {
        imageCache[project.id] = [];
        for (const imageSrc of project.gallery) {
          const img = new Image();
          img.src = imageSrc;
          imageCache[project.id].push(img);
        }
      }
      
      setPreloadedImages(imageCache);
    };

    preloadProjectImages();
  }, []);

  const nextImage = () => {
    if (open) {
      setCurrentImageIndex((prev) => (prev + 1) % open.gallery.length);
    }
  };

  const prevImage = () => {
    if (open) {
      setCurrentImageIndex((prev) => (prev - 1 + open.gallery.length) % open.gallery.length);
    }
  };

  const openProject = (project: Project) => {
    setOpen(project);
    setCurrentImageIndex(0);
  };

  // Touch handlers for modal gallery
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!open) return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
      }
    }
  };

  // Auto-slide functionality for hover with preloaded images
  const handleMouseEnter = (projectId: string) => {
    setHoveredProject(projectId);
    const project = allProjects.find(p => p.id === projectId);
    if (project && project.gallery.length > 1) {
      const interval = setInterval(() => {
        setHoverImageIndex(prev => ({
          ...prev,
          [projectId]: ((prev[projectId] || 0) + 1) % project.gallery.length
        }));
      }, 1200); // Reduced to 1.2 seconds for smoother experience
      
      // Store interval ID for cleanup
      (window as any)[`interval_${projectId}`] = interval;
    }
  };

  const handleMouseLeave = (projectId: string) => {
    setHoveredProject(null);
    // Clear the interval
    if ((window as any)[`interval_${projectId}`]) {
      clearInterval((window as any)[`interval_${projectId}`]);
      delete (window as any)[`interval_${projectId}`];
    }
    // Reset to first image
    setHoverImageIndex(prev => ({
      ...prev,
      [projectId]: 0
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="heading-serif text-3xl font-bold">Projects</h1>
        <p className="text-lg opacity-80">Forge the Future - Leo District 306 D7</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((c) => (
          <button 
            key={c.key} 
            onClick={() => setActive(c.key)} 
            className={`px-4 py-2 rounded-lg border transition-all ${
              active === c.key 
                ? 'bg-gold text-black border-gold shadow-lg' 
                : 'border-white/20 hover:bg-white/10 hover:border-white/40'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <AnimatePresence>
          {projects.map((p) => (
            <motion.div 
              key={p.id} 
              layout 
              initial={{ opacity: 0, scale: 0.96 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }} 
              className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-xl overflow-hidden group hover:shadow-xl hover:bg-white/20 dark:hover:bg-white/15 transition-all duration-300"
              onMouseEnter={() => handleMouseEnter(p.id)}
              onMouseLeave={() => handleMouseLeave(p.id)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={hoveredProject === p.id && p.gallery.length > 1 
                    ? p.gallery[hoverImageIndex[p.id] || 0] 
                    : p.image
                  } 
                  alt={p.title} 
                  className="h-56 sm:h-48 md:h-52 lg:h-56 w-full object-cover group-hover:scale-105 transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image counter for galleries with multiple images */}
                {p.gallery.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {hoveredProject === p.id ? (hoverImageIndex[p.id] || 0) + 1 : 1} / {p.gallery.length}
                  </div>
                )}

                {/* Auto-slide indicator dots */}
                {p.gallery.length > 1 && hoveredProject === p.id && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {p.gallery.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          index === (hoverImageIndex[p.id] || 0) ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-3 sm:p-4">
                <div className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{p.title}</div>
                <div className="text-xs sm:text-sm opacity-70 mb-3 line-clamp-2">
                  {p.description.length > 80 ? `${p.description.substring(0, 80)}...` : p.description}
                </div>
                <div className="text-xs opacity-60 mb-3">
                  {new Date(p.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <button 
                  onClick={() => openProject(p)} 
                  className="w-full px-3 py-2 text-sm rounded-md bg-maroon text-white hover:bg-maroon/80 transition-colors"
                >
                  View Details & Gallery
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enhanced Modal with Gallery */}
      <AnimatePresence>
        {open && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setOpen(null)}
          >
            <motion.div 
              initial={{ y: 20, scale: 0.95 }} 
              animate={{ y: 0, scale: 1 }} 
              exit={{ y: 10, scale: 0.95 }} 
              onClick={(e) => e.stopPropagation()} 
              className="bg-white/95 dark:bg-black/95 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-2 sm:mx-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start p-4 sm:p-6 border-b border-white/10">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl sm:text-2xl font-bold heading-serif line-clamp-2">{open.title}</h3>
                  <p className="text-xs sm:text-sm opacity-70 mt-1">
                    {new Date(open.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <button 
                  onClick={() => setOpen(null)} 
                  className="p-2 rounded-full bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 hover:bg-white/20 dark:hover:bg-white/20 transition-colors flex-shrink-0"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Gallery */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-base sm:text-lg">Project Gallery</h4>
                  <div className="relative">
                    <div 
                      className="aspect-video rounded-lg overflow-hidden bg-black/5"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <img
                        src={open.gallery[currentImageIndex]}
                        alt={`${open.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover select-none"
                        draggable={false}
                      />
                    </div>
                    
                    {/* Gallery Navigation */}
                    {open.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={nextImage}
                          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Image counter */}
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {currentImageIndex + 1} / {open.gallery.length}
                        </div>

                        <div className="flex justify-center mt-3 gap-1.5 sm:gap-2">
                          {open.gallery.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-base sm:text-lg">About This Project</h4>
                  <p className="opacity-90 leading-relaxed text-sm sm:text-base">{open.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-lg p-3">
                      <span className="opacity-70">Date: </span>
                      <span className="font-medium">
                        {new Date(open.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-lg p-3">
                      <span className="opacity-70">Venue: </span>
                      <span className="font-medium">{open.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
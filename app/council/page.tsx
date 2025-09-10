"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SectionItem {
  name: string;
  role?: string;
  photo?: string; // absolute path under /public
  biography?: string;
  gallery?: string[];
}
interface Section {
  title: string;
  items: SectionItem[];
}

interface ModalData {
  name: string;
  role: string;
  photo: string;
  biography: string;
  gallery: string[];
}

const photo = (file: string | undefined) => (file ? `/images/council/${file}` : '/logos/lion.png');

const sections: Section[] = [
  // New top section with placeholders for Lions District 306 D7
  {
    title: 'Lions District 306 D7',
    items: [
      { 
        role: 'District Governor', 
        name: 'Lion Gaya Upasena PMJF PMAF', 
        photo: photo('gaya.jpeg'),
        biography: 'Lion Gaya Upasena PMJF PMAF serves as the District Governor of Lions District 306 D7, bringing decades of distinguished service to the Lions organization. As a Progressive Melvin Jones Fellow (PMJF) and Progressive Member of the Academy of Fellows (PMAF), he has demonstrated exceptional leadership and commitment to humanitarian service. His tenure is marked by innovative approaches to community development, youth empowerment, and sustainable service projects across the district.',
        gallery: ['/images/council/gaya.jpeg', '/logos/lion.png', '/logos/dp.png']
      },
      { 
        role: 'Immediate Past District Governor', 
        name: 'Lion Ranjith Fernando PMJF PMAF', 
        photo: photo('ranjith.jpg'),
        biography: 'Lion Ranjith Fernando PMJF PMAF, as the Immediate Past District Governor, brings invaluable experience and institutional knowledge to the district leadership. His previous term as District Governor was characterized by significant growth in membership, successful completion of major service projects, and strengthening of inter-club relationships. As both a PMJF and PMAF, he continues to mentor current leadership while contributing his expertise to strategic planning and district development.',
        gallery: ['/images/council/ranjith.png', '/logos/lion.png', '/logos/dp.png']
      },
      { 
        role: 'First Vice District Governor', 
        name: 'Lion Chandika Dedigama PMJF', 
        photo: photo('chandika.jpeg'),
        biography: 'Lion Chandika Dedigama PMJF serves as the First Vice District Governor, playing a crucial role in district operations and future leadership development. As a Progressive Melvin Jones Fellow, he has demonstrated outstanding commitment to Lions ideals and community service. His responsibilities include supporting current district initiatives while preparing for future leadership roles, ensuring continuity and growth in the district\'s service mission.',
        gallery: ['/images/council/chandika.jpg', '/logos/lion.png', '/logos/dp.png']
      },
      { 
        role: 'Second Vice District Governor', 
        name: 'Lion Viduranga Maddumage', 
        photo: photo('viduranga.jpg'),
        biography: 'Lion Viduranga Maddumage serves as the Second Vice District Governor, contributing to district planning and member development initiatives. His role involves supporting district operations, participating in strategic planning, and preparing for progressive leadership responsibilities within the Lions organization. He brings fresh perspectives and innovative ideas to the district leadership team while maintaining the core values of Lions service.',
        gallery: ['/images/council/viduranga.jpg', '/logos/lion.png', '/logos/dp.png']
      },
    ],
  },
  {
    title: 'District Executives',
    items: [
      { 
        role: 'District President', 
        name: 'Leo Lion Hansathi Imethma', 
        photo: photo('hansathi.jpg'),
        biography: `
          <p><strong>Leo Lion Hansathi Imethma</strong> was born in <strong>2002</strong> to Mr. Manjula Gallage and Mrs. Sasika Nilani, as the eldest sister to two brothers. From a young age, she displayed a natural inclination toward leadership and community service, guided by a strong sense of empathy and a desire to make a positive impact. This passion shaped her academic and extracurricular journey, where she excelled both in studies and in diverse activities.</p>

          <p><strong>Education & School Achievements</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Proud alumna of <strong>Asian Grammar School</strong></li>
            <li>Achieved the <strong>best O/L results</strong> in her batch; completed <strong>A/Ls in Physical Science</strong></li>
            <li>Active member of the <strong>Eastern Band</strong>, <strong>MUN Club</strong>, <strong>Netball Team</strong>, <strong>Swimming Squad</strong>, and <strong>Senior Dancing Troupe</strong></li>
            <li>Awarded the <strong>Pahin Patha</strong> milestone as a traditional dancer</li>
            <li>Named <strong>Most Outstanding Student</strong> for <strong>two consecutive years</strong></li>
            <li>Served as a <strong>Prefect for four years</strong> and <strong>Head Prefect (2020/21)</strong></li>
          </ul>

          <p><strong>Higher Education & Professional Career</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Undergraduate at the <strong>Institute of Chemistry Ceylon</strong></li>
            <li>Plays for the university <strong>basketball team</strong></li>
            <li>Served as <strong>Junior Secretary</strong> of the Student’s Association (2024/25)</li>
            <li><strong>Head of Business Operations</strong> at <strong>Angel Products</strong>, a leading bedding supplier in Sri Lanka</li>
          </ul>

          <p><strong>Leo Movement Journey</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Charter Member of the <strong>Leo Club of Asian Grammar School</strong> (2016/17)</li>
            <li>Club roles:
              <ul class="list-disc pl-5 mt-1">
                <li><strong>Club Secretary</strong> (2017/18)</li>
                <li><strong>Club Vice President</strong> (2018/19)</li>
                <li><strong>4th Club President</strong> (2019/20)</li>
              </ul>
            </li>
            <li>As Club President, coordinated <strong>30+ large-scale projects and fundraisers</strong>, including <em>AGS Winds Kite Festival</em> and <em>Literacy Academy</em></li>
            <li>Later joined the <strong>Leo Club of Pannipitiya Metro Titans</strong> and served as <strong>Club Secretary (2022/23)</strong></li>
          </ul>

          <p><strong>District-Level Leadership (Leo District 306 C2)</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Regional Director</strong></li>
            <li><strong>District Assistant Secretary</strong></li>
            <li><strong>District Secretary</strong></li>
            <li><strong>District Vice President</strong></li>
            <li>Key contributions:
              <ul class="list-disc pl-5 mt-1">
                <li><strong>Project Secretary</strong> of <em>C2 Games 2020</em></li>
                <li><strong>Organizer</strong> of the <em>Exodia 2021</em> Regional Orientation Series</li>
                <li><strong>Project Chairman</strong> of the <em>19th Annual Leo District Conference (2023/24)</em></li>
                <li><strong>Co-Chairman</strong> of <em>Battle of C’s 2025</em></li>
              </ul>
            </li>
          </ul>

          <p><strong>Multiple District 306 Sri Lanka & Maldives</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Served as a <strong>Multiple Council Officer</strong></li>
            <li>Contributions:
              <ul class="list-disc pl-5 mt-1">
                <li><strong>Project Secretary</strong> of the <em>Leo Multiple District Conference (2021/22)</em></li>
                <li><strong>Project Secretary</strong> of the <em>Leo Multiple District Walk (2022)</em></li>
                <li><strong>Co-Chairman</strong> of <em>Leo Multiple Service Week</em> and <em>Leo Day Celebrations (2024)</em></li>
              </ul>
            </li>
          </ul>

          <p><strong>Lions Movement</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Helped charter the <strong>Leo Lions Club of Colombo Uptown Legends (2023/24)</strong></li>
            <li>Elected as <strong>1st Vice President</strong> (2023/24)</li>
            <li>Served as <strong>Club Director</strong> and <strong>Lions District Cabinet Member</strong> (2024/25)</li>
          </ul>

          <p><strong>Awards & Recognitions</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>International President’s Appreciation Certificates</strong></li>
            <li><strong>Top 10 Leo Awards</strong> – Leo District 306 C2</li>
            <li><strong>District Governor’s Appreciation Awards</strong></li>
            <li><strong>District President’s Appreciation Awards</strong></li>
            <li><strong>Most Outstanding Regional Director Award</strong></li>
            <li><strong>Most Outstanding Council Officer Award</strong></li>
            <li><strong>Leo of the Year</strong> at District, Multiple District, and <strong>International</strong> levels (2024/25)</li>
          </ul>

          <p><strong>Inspiration</strong></p>
          <p>Leo Lion Hansathi Imethma’s story is one of <strong>dedication</strong>, <strong>resilience</strong>, and <strong>unwavering commitment</strong>. Her journey stands as an inspiration to many, embodying the true spirit of leadership, service, and excellence.</p>
        `,
        gallery: ['/images/council/hansathi.jpg', '/logos/dp.png', '/logos/leo.png']
      },
      { 
        role: 'Immediate Past District President', 
        name: 'Leo Lion Sunera Naveed', 
        photo: photo('naveed.jpg'),
        biography: 'Leo Lion Sunera Naveed, as the Immediate Past District President, brings invaluable experience and continuity to the district leadership. Having successfully led the district through significant growth and development, he continues to mentor and guide the current leadership team while contributing his expertise to various district initiatives.',
        gallery: ['/images/council/naveed.jpg', '/logos/dp.png', '/logos/leo.png']
      },
      { 
        role: 'District Leo Club Chairperson', 
        name: 'Leo Lion Rahul Attanayake', 
        photo: photo('rahul.jpg'),
        biography: 'Leo Lion Rahul Attanayake serves as the District Leo Club Chairperson, overseeing the development and coordination of Leo Clubs across the district. His commitment to youth development and organizational excellence has been pivotal in expanding the Leo movement and fostering leadership among young members.',
        gallery: ['/images/council/rahul.jpg', '/logos/dp.png', '/logos/leo.png']
      },
      { role: 'District Vice President', name: 'Leo Lion Senura Battage', photo: photo('senura.jpeg') },
      { role: 'District Secretary', name: 'Leo Lion Vihara Jayaweera', photo: photo('vihara.png') },
      { role: 'District Treasurer', name: 'Leo Lion Tehan Nakandala', photo: photo('tehan.jpg') },
      { role: 'District Contest Director', name: 'Leo Lion Sunera Naveed', photo: photo('naveed.jpg') },
      { role: 'District Additional Secretary / Membership Chairperson', name: 'Leo Indeera Weerasinghe', photo: photo('indeera.JPG') },
      { role: 'District Additional Treasurer', name: 'Leo Minasha Katugampola', photo: photo('minasha.jpg') },
      { role: 'District Assistant Secretary', name: 'Leo Lion Yohani Gunathilaka', photo: photo('yohani.jpg') },
      { role: 'District Assistant Treasurer', name: 'Leo Manthila Liyanage', photo: photo('manthila.jpg') },
      { role: 'Leo Lion Liason Officer', name: 'Leo Lion Thavisha Bandara', photo: photo('thavisha.jpeg') },
      // Updated director assignments and titles per request
      { role: 'District Director - Special Programs', name: 'Leo Lion Manthila Gamage', photo: photo('manthilagamage.JPG') },
      { role: 'District Director - Education and Career Guidance', name: 'Leo Lion Poorna Panduwawala', photo: photo('poorna.jpeg') },
      { role: 'District Director - Operations', name: 'Leo Gevindu Kodikara', photo: photo('gevindu.jpeg') },
      { role: 'District Director - Leadership & Professional Development', name: 'Leo Inod Perera', photo: photo('inod.jpeg') },
      { role: 'District Director - Creative Operations', name: 'Leo Lion Didula Fonseka', photo: photo(undefined) },
    ],
  },
  {
    title: 'Region Directors',
    items: [
      { role: 'Region Chairperson (Region 1)', name: 'Leo Nimsara Manith', photo: photo('nimsara.jpg') },
      { role: 'Region Chairperson (Region 2)', name: 'Leo Lion Gaveen Nayanjith', photo: photo('gaveennayanajith.jpg') },
      { role: 'Region Chairperson (Region 3)', name: 'Leo Thisaruni Wijebandara', photo: photo('thisarani.jpeg') },
      { role: 'Region Chairperson (Region 5)', name: 'Leo Ravinya Dimuth', photo: photo('ravinya.jpeg') },
      { role: 'Region Chairperson (Region 4)', name: 'Leo Muthula Liyanage', photo: photo('muthula.jpg') },
    ],
  },
  {
    title: 'Zone Chairpersons',
    items: [
      { role: 'Zone Chairperson (Region 01 - Zone 01)', name: 'Leo Hiruna Rathnayaka', photo: photo('hiruna.jpg') },
      { role: 'Zone Chairperson (Region 01 - Zone 02)', name: 'Leo Hasanka Lakshan', photo: photo(undefined) },
      { role: 'Zone Chairperson (Region 02 - Zone 01)', name: 'Leo Gaveen Perera', photo: photo('gaveen.jpg') },
      { role: 'Zone Chairperson (Region 02 - Zone 02)', name: 'Leo Rehan Thulnaka', photo: photo('rehan.webp') },
      { role: 'Zone Chairperson (Region 03 - Zone 01)', name: 'Leo Lithira Ramuditha', photo: photo('lithira.jpg') },
      { role: 'Zone Chairperson (Region 03 - Zone 02)', name: 'Leo Lehara Silva', photo: photo('lehara.jpg') },
      { role: 'Zone Chairperson (Region 04 - Zone 01)', name: 'Leo Vihas Santhula', photo: photo(undefined) },
      { role: 'Zone Chairperson (Region 04 - Zone 02)', name: 'Leo Navindu Jayawardane', photo: photo('navindu.png') },
      { role: 'Zone Chairperson (Region 05 - Zone 01)', name: 'Leo Udula Satharasinghe', photo: photo('udula.jpg') },
      { role: 'Zone Chairperson (Region 05 - Zone 02)', name: 'Leo Pamudi Anuththara', photo: photo('pamudi.jpg') },
    ],
  },
  {
    title: 'District Coordinators',
    items: [
      { role: 'District Chief Coordinator - Constitution & by laws', name: 'Leo Raveen Senevirathna', photo: photo(undefined) },
      { role: 'District Chief Coordinator - Lions Global Challenges', name: 'Leo Kavindu Dehiwala', photo: photo('kavindu.JPG') },
      { role: 'District Chief Coordinator - Entertainment and Cultural Affairs', name: 'Leo Chirani Devanga', photo: photo('chirani.jpg') },
      { role: 'District Chief Coordinator - Multiple District Affairs', name: 'Leo Akila Weragoda', photo: photo('akila.jpg') },
      { role: 'District Team Head - Marketing & Digital Transformations Team', name: 'Leo Malindya Fernando', photo: photo('malindya.png') },
      { role: 'District Team Head - Administration', name: 'Leo Lion Shamindya Rupasinghe', photo: photo('shamindya.JPEG') },
      { role: 'District Team Head - Club Performance', name: 'Leo Janidu Induwara', photo: photo('janindu.jpeg') },
      { role: 'District Team Head - Fundraising & Management', name: 'Leo Gayathri Kaushalya', photo: photo('gayathri.jpeg') },
      { role: 'District Team Head - Editorial (Chief Bulletin Editor / Content Writing)', name: 'Leo Sineth Wickramaarachchi', photo: photo('sineth.jpg') },
    ],
  },
  {
    title: 'Marketing & Digital Transformations Team',
    items: [
      { name: 'Leo Lion Chiran Damsara', photo: photo('chiran.jpg') },
      { name: 'Leo Lion Thusal Ranawaka', photo: photo('thusal.jpeg') },
      { name: 'Leo Sanduni Charundya', photo: photo('sanduni.jpg') },
    ],
  },
  {
    title: 'Administration Team',
    items: [
      { name: 'Leo Malina Kalupahana', photo: photo('malina.jpg') },
      { name: 'Leo Thevindu Damsith', photo: photo('thevindu.jpg') },
      { name: 'Leo Sathsari Samaranayake', photo: photo('sathsari.jpg') },
    ],
  },
  {
    title: 'Finance and Fundraising Team',
    items: [
      { name: 'Leo Chamod Vishwajith', photo: photo('chamod.jpg') },
      { name: 'Leo Davindu Wickramasinghe', photo: photo('davindu.jpeg') },
      { name: 'Leo Damsath Chiranjeewa', photo: photo('damsath.jpg') },
    ],
  },
  {
    title: 'Editorial & Content Writing Team',
    items: [
      { name: 'Leo Nimasha Edirisooriya', photo: photo('nimasha.jpg') },
      { name: 'Leo Sasira Vihanga', photo: photo('sasira.jpg') },
      { name: 'Leo Malki Madushika', photo: photo('malki.jpg') },
    ],
  },
  {
    title: 'Club Performance Team',
    items: [
      { name: 'Leo Ravija Liyanage', photo: photo('ravija.jpeg') },
      { name: 'Leo Sanithu Kenula', photo: photo('sanithu.jpg') },
      { name: 'Leo Lion Anuk Nisalitha', photo: photo('anuk.jpeg') },
    ],
  },
];

// Modal Component
function OfficialModal({ data, onClose }: { data: ModalData | null; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!data) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % data.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="heading-serif text-2xl font-bold">{data.name}</h2>
              <p className="text-lg opacity-80">{data.role}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side - Photo and Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black/5">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Gallery Slideshow */}
              {data.gallery.length > 1 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Journey Gallery</h3>
                  <div className="relative">
                    <div className="aspect-video rounded-lg overflow-hidden bg-black/5">
                      <img
                        src={data.gallery[currentImageIndex]}
                        alt={`${data.name} gallery ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Gallery Navigation */}
                    <div className="flex justify-between items-center mt-2">
                      <button
                        onClick={prevImage}
                        className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <div className="flex gap-2">
                        {data.gallery.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <button
                        onClick={nextImage}
                        className="p-2 rounded-full glass hover:bg-white/20 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right side - Biography */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Biography</h3>
              <div
                className="opacity-90 leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: data.biography }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CouncilPage() {
  const [selectedOfficial, setSelectedOfficial] = useState<ModalData | null>(null);

  // Check if an official should have a modal (key positions)
  const shouldShowModal = (role: string) => {
    const keyRoles = [
      'District President',
      'Immediate Past District President', 
      'District Leo Club Chairperson',
      'District Governor',
      'Immediate Past District Governor',
      'First Vice District Governor',
      'Second Vice District Governor'
    ];
    return keyRoles.includes(role);
  };

  const handleOfficialClick = (item: SectionItem) => {
    if (shouldShowModal(item.role || '') && item.biography && item.gallery) {
      setSelectedOfficial({
        name: item.name,
        role: item.role || '',
        photo: item.photo || '/logos/lion.png',
        biography: item.biography,
        gallery: item.gallery
      });
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="heading-serif text-3xl font-bold">District Council</h1>

      {sections.map((section) => (
        <section key={section.title} className="space-y-5">
          <h2 className="heading-serif text-2xl font-semibold">{section.title}</h2>
          <div className="flex flex-wrap justify-center gap-5">
            {section.items.map((m, idx) => (
              <motion.div
                key={`${section.title}-${idx}-${m.name}`}
                className={`glass rounded-xl overflow-hidden group w-full sm:w-64 ${
                  shouldShowModal(m.role || '') ? 'cursor-pointer hover:ring-2 hover:ring-white/30' : ''
                }`}
                whileHover={{ y: -6 }}
                onClick={() => handleOfficialClick(m)}
              >
                {/* Square image wrapper */}
                <div className="relative w-full aspect-square overflow-hidden bg-black/5">
                  <img
                    src={m.photo || '/logos/lion.png'}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Click indicator for key officials */}
                  {shouldShowModal(m.role || '') && (
                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <div className="font-semibold">{m.name}</div>
                  {m.role && <div className="text-sm opacity-70">{m.role}</div>}
                  {shouldShowModal(m.role || '') && (
                    <div className="text-xs opacity-50 mt-1">Click for details</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {/* Modal */}
      <OfficialModal 
        data={selectedOfficial} 
        onClose={() => setSelectedOfficial(null)} 
      />
    </div>
  );
}
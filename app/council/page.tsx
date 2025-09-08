"use client";
import { motion } from 'framer-motion';

interface SectionItem {
  name: string;
  role?: string;
  photo?: string; // absolute path under /public
}
interface Section {
  title: string;
  items: SectionItem[];
}

const photo = (file: string | undefined) => (file ? `/images/council/${file}` : '/logos/lion.png');

const sections: Section[] = [
  // New top section with placeholders for Lions District 306 D7
  {
    title: 'Lions District 306 D7',
    items: [
      { role: 'District Governor', name: 'To be announced', photo: photo(undefined) },
      { role: 'Immediate Past District Governor', name: 'To be announced', photo: photo(undefined) },
      { role: 'First Vice District Governor', name: 'To be announced', photo: photo(undefined) },
      { role: 'Second Vice District Governor', name: 'To be announced', photo: photo(undefined) },
    ],
  },
  {
    title: 'District Executives',
    items: [
      { role: 'District President', name: 'Leo Lion Hansathi Imethma', photo: photo('hansathi.jpg') },
      { role: 'Immediate Past District President', name: 'Leo Lion Sunera Naveed', photo: photo('naveed.jpg') },
      { role: 'District Leo Club Chairperson', name: 'Leo Lion Rahul Attanayake', photo: photo('rahul.jpg') },
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

export default function CouncilPage() {
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
                className="glass rounded-xl overflow-hidden group w-full sm:w-64"
                whileHover={{ y: -6 }}
              >
                {/* Square image wrapper */}
                <div className="relative w-full aspect-square overflow-hidden bg-black/5">
                  <img
                    src={m.photo || '/logos/lion.png'}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="font-semibold">{m.name}</div>
                  {m.role && <div className="text-sm opacity-70">{m.role}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
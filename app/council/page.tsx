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
        biography: `
          <p><strong>Lion Ranjith Fernando</strong> embodies a rare synergy of professional excellence, entrepreneurial vision, and service-driven leadership.</p>

          <p><strong>Professional Journey</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Early career in banking; instrumental in establishing the <strong>Leasing Unit at People’s Bank</strong></li>
            <li>Served as <strong>Branch Manager</strong> at <strong>Seylan Bank</strong></li>
            <li>Expanded into entrepreneurship; built a successful footprint in the <strong>printing and packaging industry</strong></li>
          </ul>

          <p><strong>Academic & Credentials</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Bachelor of Commerce</strong> – University of Sri Jayewardenepura</li>
            <li><strong>Associate Member</strong> – Institute of Bankers</li>
            <li><strong>Finalist</strong> – Institute of Chartered Accountants of Sri Lanka</li>
            <li>Advanced studies in <strong>Japan</strong> and <strong>India</strong></li>
            <li>Led <strong>MASCO 85</strong> of his alma mater with distinction</li>
          </ul>

          <p><strong>Industry Leadership</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>President</strong> – Sri Lanka Association of Printers</li>
            <li>Represented Sri Lanka at international platforms including the <strong>Export Development Board (EDB)</strong> and the <strong>Federation of Asia Print</strong></li>
          </ul>

          <p><strong>Lionism & Thought Leadership</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Rose through the ranks with unwavering dedication; crowned <strong>Most Outstanding Club President (2008)</strong></li>
            <li>Served in numerous cabinet roles</li>
            <li>Authored <strong>four publications</strong> on leadership and Lions governance</li>
            <li>Recipient of the prestigious <strong>Leadership Medal</strong> from International President <strong>Douglas Alexander</strong></li>
          </ul>

          <p><strong>District Governor (2024/25) – “Together We Smile”</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Spearheaded a <strong>Rs. 40 million state-of-the-art Dialysis Center</strong> at <strong>KDU Hospital</strong> in partnership with <strong>LCIF</strong> and local funding</li>
            <li>Led District 306C2 to global recognition:
              <ul class="list-disc pl-5 mt-1">
                <li><strong>Membership Hero Award</strong></li>
                <li><strong>Membership Rockstar Award</strong> at the <strong>2025 International Convention (USA)</strong></li>
                <li><strong>Kindness Matters Award</strong> – bestowed upon only <strong>30 districts worldwide</strong></li>
              </ul>
            </li>
          </ul>

          <p><strong>Beyond Lionism</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Published author and visiting lecturer</li>
            <li>Polymath with passions spanning <strong>IT</strong>, <strong>AI</strong>, <strong>painting</strong>, <strong>music</strong>, and <strong>photography</strong></li>
          </ul>

          <p><strong>Family</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Married to <strong>Lion Lady Sriyani</strong></li>
            <li>Father to two accomplished daughters: <strong>Anupama</strong> and <strong>Sewwandi</strong></li>
          </ul>

          <p><strong>Current Roles</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Immediate Past District Governor</strong> – 306C2</li>
            <li><strong>Multiple Council Secretary</strong> – MD 306</li>
          </ul>

          <p>He exemplifies what it means to be a leader—in service, profession, and life.</p>
        `,
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
        biography: `
          <p><strong>Leo Lion Sunera Naveed</strong>, a prominent alumnus of <strong>Ananda College, Colombo 10</strong>, is the only child of Mr. Lasantha Prasad Lokupitiya and Mrs. Hasithri Yaswanthi Rodrigo. His journey is defined by leadership, innovation, and unwavering dedication to service.</p>

          <p><strong>School Achievements & Leadership</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Colors' man</strong>, skilled <strong>hockey goalie</strong>, and <strong>Deputy Head Prefect</strong></li>
            <li><strong>President Scout</strong> and <strong>national-level hockey player</strong> with multiple awards</li>
            <li>Held key positions:
              <ul class="list-disc pl-5 mt-1">
                <li>Assistant Secretary – Interact Club</li>
                <li>Editor – Astronomical Association</li>
                <li>Media Coordinator – Young Inventors Society</li>
                <li>Editor – Aeronautical Academy</li>
                <li>Head of Media – ACMUN 2017 & 2018</li>
                <li>Lead Organiser – Ananda Dalada Society</li>
                <li>Treasurer – Ananda College Wall of Humanity</li>
              </ul>
            </li>
            <li>Also a young inventor and guitarist</li>
            <li>Represented Interact District Sri Lanka & Maldives at <em>Act Asia 2017</em> in Nepal</li>
          </ul>

          <p><strong>Early Leo Journey</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Joined the <strong>Leo Club of Ananda College</strong> to serve the community</li>
            <li>Rose through the ranks to <strong>Director</strong> and <strong>Club President (2018/19)</strong></li>
            <li>Chairperson of <em>Project Wilpattu</em> – won <strong>Most Outstanding Environment Project</strong></li>
            <li>Under his leadership, the club secured <strong>12 honours</strong>, including <em>1st Runner-Up – Most Outstanding School-based Leo Club</em></li>
            <li>Also served as Media Head – <em>Sri Lanka Crisis Simulation</em> and Director – <em>Rotaract Club of Centennial United</em></li>
          </ul>

          <p><strong>Expanding Service & Leadership</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Elected <strong>Charter Vice President</strong> of the first-ever <strong>Leo Lions Club of Ananda Alumni</strong> (2020/21)</li>
            <li>Joined the <strong>Nawala Metro Leo Club</strong> to continue impactful community work</li>
            <li>Held positions: <strong>Club Treasurer</strong>, <strong>District Membership Officer</strong>, and <strong>Treasurer of “Manudam”</strong></li>
            <li>Awards: <strong>Most Disciplined Leo</strong> and <strong>1st Runner-Up – Most Outstanding Club Treasurer</strong></li>
            <li>Elected <strong>Club President – Leo Club of Nawala Metro (2021/22)</strong>
              <ul class="list-disc pl-5 mt-1">
                <li>Achievements: <strong>Most Outstanding Leo Club</strong>, <strong>Most Outstanding Leo Club President</strong>, <strong>Excellence Award</strong>, and <strong>33+ club awards</strong></li>
                <li>Also elected <strong>Club Vice President – Leo Lions Club of Ananda Alumni</strong></li>
              </ul>
            </li>
            <li>As <strong>Immediate Past President (2022/23)</strong>, received <strong>1st Runner-Up – Most Outstanding Immediate Past President</strong></li>
          </ul>

          <p><strong>District, Multiple District & International</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>District Treasurer – Leo District 306 C2 (2023/24)</strong></li>
            <li><strong>Co-Chair</strong> – <em>Mass Induction '23</em> of Leo Multiple District 306 (1,500 inductees)</li>
            <li>Represented Sri Lanka & Maldives – <strong>Leo ISAAME Forum 2023 (Bangladesh)</strong></li>
            <li>Captained House <strong>“Ernest”</strong> at <em>C2 Games</em> – won <strong>overall championship</strong></li>
            <li>Charter Club President – <strong>Leo Lions Club of Colombo Uptown Legends</strong>, enabling Leos to transition to Lions</li>
            <li>Recognized among the <strong>Top 30 Leos</strong> – Leo District 306 C2</li>
            <li>Awards: <strong>International President Appreciation</strong>, <strong>District Governor’s Appreciation</strong>, <strong>5 Years of Leoism</strong></li>
            <li>Completed <strong>District Lions Leadership Institute (DLLI)</strong>; supported <strong>Presidential LCIF</strong></li>
            <li>Honoured with <strong>Leo of the Year</strong> – the highest lifetime recognition for a Leo</li>
          </ul>

          <p><strong>Professional & Entrepreneurship</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Head of Marketing</strong> – East Gate (Pvt) Ltd</li>
            <li>Founded startups: <em>Xfinity.Ik</em> (online courses), <em>NAVE8</em>, <em>Infernation</em> (creative content & events), and <em>Mighty Bigfoot</em> (computer shop)</li>
          </ul>

          <p><strong>Role</strong>: Immediate Past District President</p>
          <p>His journey showcases unwavering devotion to leadership, creativity, and community impact—blending academic excellence, entrepreneurship, and service.</p>
        `,
        gallery: ['/images/council/naveed.jpg', '/logos/dp.png', '/logos/leo.png']
      },
      { 
        role: 'District Leo Club Chairperson', 
        name: 'Leo Lion Rahul Attanayake', 
        photo: photo('rahul.jpg'),
        biography: `
          <p><em>“Innovation is seeing what everybody has seen and thinking what nobody has thought.”</em> This quote reflects the journey of <strong>Leo Lion Rahul Attanayake PFLM</strong>, widely regarded as one of the most innovative Leos in the history of Leoism in Sri Lanka.</p>

          <p><strong>Early Life & Education</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Only son with two elder sisters to Mr. D.R. Attanayake and Mrs. Rohini Attanayake</li>
            <li>Completed primary and secondary education at <strong>Lyceum International School, Nugegoda</strong> (Cambridge curriculum)</li>
          </ul>

          <p><strong>Sports & Achievements</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Two-time National Champion</strong> in <em>Wushu (Sanshou)</em> – 2014 & 2015</li>
            <li>Holds the <strong>national record for the fastest knockout (2 seconds)</strong></li>
            <li>Qualified <strong>Wushu referee</strong></li>
          </ul>

          <p><strong>Professional & Academic Path</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Youngest <strong>Alternate Channel Manager</strong> at <strong>Softlogic Life PLC</strong>, heading the <em>BOC Endowment Team</em></li>
            <li>Graduate in Business – <strong>University of Glyndwr, UK</strong></li>
            <li>Postgraduate qualifications:
              <ul class="list-disc pl-5 mt-1">
                <li><strong>MSc in Strategic Marketing</strong> – Asia E University</li>
                <li><strong>MBA in General Management</strong> – University of Bedfordshire</li>
                <li><strong>MSc in Business Psychology</strong> – University of Northampton</li>
              </ul>
            </li>
            <li>Certified <strong>Life Coach</strong> and <strong>Workshop Facilitator</strong></li>
          </ul>

          <p><strong>Leo Journey & Iconic Projects</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Joined the <strong>Leo Club of Kottawa Central Golden City</strong> (2013); served as <strong>Club President (2016/17)</strong></li>
            <li>Introduced groundbreaking projects:
              <ul class="list-disc pl-5 mt-1">
                <li><em>Henanigalata Mangachchamu</em></li>
                <li><em>Maayam 64+</em></li>
                <li><strong>Centennial Soccer League</strong> – Sri Lanka’s largest Leo Club sports event for 3 consecutive years; won <em>Best Sports & Recreation Project</em> at Multiple District level</li>
                <li><em>Viru Karuna</em> – carried war heroes to the peak of Sri Pada</li>
                <li><em>Nodutu Manaya</em> – interfaith religious chanting program at Borella Cemetery</li>
              </ul>
            </li>
            <li>Awards: <strong>Leo of the Year – Leo District 306 C2</strong>, <strong>Most Outstanding Leo Executive – MD306 (2018/19)</strong>, <strong>Leo Scholar Award – 2019/20</strong></li>
            <li>Delegate – <strong>1st-ever Leo ISAAME Forum 2016</strong> (Sri Lanka)</li>
          </ul>

          <p><strong>District & Multiple District Leadership</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Roles: <strong>District Coordinator – Youth Empowerment</strong>, <strong>District Treasurer</strong>, <strong>District Vice President</strong>, <strong>16th District President (2020/21)</strong></li>
            <li>As District President (theme: <em>“Finding Yourself through Serving”</em>):
              <ul class="list-disc pl-5 mt-1">
                <li>Extended <strong>8 new Leo Clubs</strong> (4 Alpha, 4 Omega)</li>
                <li>Reactivated <strong>6 clubs</strong> – total <strong>31 active clubs</strong></li>
                <li>Achieved <strong>215% net membership growth</strong></li>
                <li>Completed all district events despite the pandemic</li>
              </ul>
            </li>
            <li>Introduced landmark initiatives:
              <ul class="list-disc pl-5 mt-1">
                <li>Leader’s Outing Eka</li>
                <li>Clash of Zones</li>
                <li>C2 Legends</li>
                <li><strong>C2 Games Colombo 2020</strong> – mega inter-house event including aquatic and track & field</li>
                <li><strong>Battle of C’s Cricket</strong> – inter-district (with Leo District 306 C1)</li>
                <li><strong>Urban Adventures Leo Youth Camp</strong> – largest in Sri Lanka (170+ participants)</li>
                <li><strong>Manudam</strong> – humanitarian mega project</li>
                <li><strong>KPI Reporting System</strong> for district operations</li>
                <li><strong>Life & Hospitalization Cover</strong> – first-ever insurance for a Leo District Council globally</li>
              </ul>
            </li>
            <li>At the <strong>44th Annual Leo District Conference</strong>, Leo District 306 C2 won <strong>4 Winner Awards</strong> and <strong>1 Runner-Up Award</strong> at Multiple District level</li>
            <li>Elected <strong>Multiple District Vice President (2021/22)</strong> and <strong>45th Multiple District President (2022/23)</strong> – Leo Multiple District 306 Sri Lanka</li>
          </ul>

          <p><strong>Multiple District Presidency Highlights</strong></p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Introduced the <strong>FLM/PFLM Trust Program</strong> – grants for clubs, districts, and MD</li>
            <li>Extended the <strong>first-ever Leo Club in the Maldives</strong> – a historic milestone</li>
            <li>Oversaw the extension of <strong>35 new Leo Clubs</strong>, surpassing Lions MD306 membership</li>
            <li>Rebranded and elevated the image of Leoism in Sri Lanka & Maldives</li>
            <li>Conducted all MD events at a grand and innovative scale</li>
            <li>Currently serves as <strong>District Leo Club Chairperson – Leo District 306 D7</strong></li>
          </ul>

          <p><strong>Legacy</strong></p>
          <p>Rahul’s story is one of <strong>resilience</strong>, <strong>innovation</strong>, and <strong>transformational leadership</strong>. From record-breaking athlete to national leader, he has inspired thousands—proving that with vision and passion, the impossible becomes possible.</p>
          <p><strong>Role</strong>: District Leo Club Chairperson</p>
        `,
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
      'Immediate Past District Governor'
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
                  shouldShowModal(m.role || '') ? 'cursor-pointer ring-0 hover:ring-2 hover:ring-[color:var(--tw-district-ring,#C41D66)]' : ''
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
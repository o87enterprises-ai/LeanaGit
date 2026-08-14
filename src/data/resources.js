// Articles, letters, reports, and coverage — carried over from the Resources
// section of leanaforoaklandschools.com and combined with Achievements here.
//
// To add one: copy a block, set `group` to one of the GROUPS keys below, and
// point `image` at a file in public/media (preferred) or a remote URL.
// Leave `url` off if there is no link yet — the card renders without a button.

export const GROUPS = {
  news: 'In the News',
  documents: 'Documents & Reports',
  advocacy: "LeAna's History of Advocacy",
};

// Section headings translate; the articles themselves stay in English because
// they link out to English-language coverage.
export const GROUPS_ES = {
  news: 'En las Noticias',
  documents: 'Documentos e Informes',
  advocacy: 'La Trayectoria de LeAna',
};

// The two letters the campaign is leading with.
export const featured = [
  {
    title:
      "The Numbers Don't Add Up: Oakland NAACP and Community Leaders Demand Transparency, Accountability, and Answers from OUSD Leadership",
    source: 'Public letter from NAACP Oakland to OUSD, June 24, 2026',
    url: 'https://www.facebook.com/737480720/posts/pfbid02PTUQpqd54EC9fBeFevnua2QiqwhwgXC82CxrRFhEeKQaJQJ2oequgtw4qMBmLMPpl/?fs=e&mibextid=wwXIfr',
    image: '/images/naacpletter.jpg',
  },
  {
    title:
      'Alameda County Supt. Castro Urges OUSD to Provide a List of Tradeoffs at June Budget Meeting',
    source: 'Letter from Alameda County Office of Education to OUSD, June 18, 2026',
    url: 'https://oaklandside.org/wp-content/uploads/2026/06/2025-26-OUSD-OEA-AB1200-Collective-Bargaining-Board-Letter-FINAL-06182026.docx.pdf',
    image: '/images/acoeletter.jpg',
  },
];

export const resources = [
  {
    group: 'news',
    title:
      'OUSD’s superintendent went around her own team on the budget. Then she brought down the axe',
    source: 'Oaklandside article, June 26, 2026',
    url: 'https://oaklandside.org/2026/06/26/ousds-superintendent-went-around-her-own-team-on-the-budget-then-she-brought-down-the-axe/',
    image:
      'https://oaklandside.org/wp-content/uploads/2026/04/OUSDLayoffPlan-JK-09-1200x900.jpg?crop=1',
  },
  {
    group: 'news',
    title: 'Deficit? Surplus? OUSD passed a very confusing budget',
    source: 'Oaklandside article, June 25, 2026',
    url: 'https://oaklandside.org/2026/06/25/deficit-surplus-ousd-passed-a-very-confusing-budget/',
    image: '/media/2025-02-12_Middleton_SchoolBoard_04.jpg',
  },
  {
    group: 'news',
    title: 'OUSD cut its deficit by two-thirds, but a $38M gap remains',
    source: 'Oaklandside article, June 11, 2026',
    url: 'https://oaklandside.org/2026/06/11/ousd-cuts-deficit-two-thirds-38-million-gap-remains/',
    image:
      'https://oaklandside.org/wp-content/uploads/2026/06/large-2025.02.12_Middleton_SchoolBoard_24-780x520.jpg',
  },
  {
    group: 'news',
    title: 'Oakland schools cut a costly teachers deal. Now no one seems sure they can pay for it',
    source: 'SF Chronicle article, May 24, 2026',
    url: 'https://www.sfchronicle.com/eastbay/article/oakland-school-teacher-union-salary-22268594.php',
    image: 'https://s.hdnux.com/photos/01/66/26/57/31026154/3/ratio3x2_960.webp',
  },
  {
    group: 'news',
    title:
      'Amid budget troubles, Oakland Unified quietly suspends search for a new superintendent',
    source: 'East Bay Times article, April 21, 2026',
    url: 'https://www.mercurynews.com/2026/04/21/oakland-schools-superintendent-search/',
    image: '/media/SJM-L-STRIKEDAY3-0509-1-1.jpg',
  },
  {
    group: 'news',
    title: 'In Farewell Address, OUSD Superintendent Says District Must Make Hard Choices',
    source: 'KQED article, May 29, 2025',
    // The link on the old site pointed at the wrong file; left off until we have the real one.
    image: 'https://cdn.kqed.org/wp-content/uploads/sites/10/2025/05/IMG_4393-scaled.jpg',
  },
  {
    group: 'news',
    title: 'The Dig',
    source: 'Oakland School Board coverage, by parents',
    url: 'https://thedigousd.com/june-3-june-10-board-meeting-recap/',
    image:
      'https://storage.ghost.io/c/fd/ca/fdca709a-5571-44ad-8471-9329c75ba2de/content/images/size/w1200/2026/06/Screenshot-2026-06-14-at-12.05.51---AM.png',
  },
  {
    group: 'documents',
    title: 'Proposed Board Policy: Prioritizing Student Outcomes',
    source:
      'Authored by Directors Patrice Berry and Clifford Thompson, this policy died in committee last January',
    url: 'https://ousd.legistar.com/View.ashx?M=F&ID=15174169&GUID=4B1C2F13-56C1-4F68-A506-EA949520E36F',
    image: '/media/policy-thumbnail.jpg',
  },
  {
    group: 'documents',
    title: 'Raise The Bar: Oakland Public Schools Student Data Report',
    source: 'Report by Families in Action for Quality Education, 2025',
    url: 'https://drive.google.com/file/d/1swZ9OxxSVgwm3d8V0f3_JzuRmQ38Zv2B/view',
    image: '/media/FIA-Math-Level-by-Race.png.avif',
  },
  {
    group: 'advocacy',
    title:
      'Brilliant Baby Accounts Seek to Set Low-Income Oakland Families on Path to College',
    source: 'SF Chronicle, November 18, 2017',
    url: 'https://www.sfchronicle.com/education/article/Brilliant-Baby-accounts-seek-to-set-12366766.php',
    image: '/media/960x0.webp',
  },
  {
    group: 'advocacy',
    title: 'Medi-Cal Dental Coverage to Be Partially Restored, But Not Until May',
    source: 'Alameda Health System, July 5, 2013',
    url: 'https://www.alamedahealthsystem.org/medi-cal-dental-coverage-to-be-partially-restored-but-not-until-may/',
    image: '/media/20130707__dental4.jpg',
  },
];

/** The two campaign letters also belong in Documents & Reports. */
export const resourcesByGroup = Object.keys(GROUPS).reduce((acc, key) => {
  const extras = key === 'documents' ? featured.map((item) => ({ ...item, group: key })) : [];
  acc[key] = [...extras, ...resources.filter((item) => item.group === key)];
  return acc;
}, {});

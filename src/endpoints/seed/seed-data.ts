/**
 * SEED DATA - Configurare pentru Client Bootstrap
 *
 * Acest fișier conține toate datele care trebuie personalizate pentru fiecare client.
 * Modifică valorile de mai jos înainte de a rula seeder-ul.
 *
 * IMPORTANT: După modificări, rulează: pnpm seed sau accesează /api/seed
 */

// =============================================================================
// CONFIGURARE BUSINESS
// =============================================================================

export const businessData = {
  // Numele sălii
  name: 'Transilvania Fitness',
  tagline: 'Transformă-ți corpul și mintea',

  // Contact
  address: 'Str. Moților nr. 54, Cluj-Napoca, România',
  phone: '+40 264 123 456',
  email: 'contact@transilvaniagym.ro',
  whatsapp: '+40 264 123 456',

  // Social Media (lasă gol dacă nu există)
  facebook: 'https://facebook.com/transilvaniagym',
  instagram: 'https://instagram.com/transilvaniagym',
  tiktok: 'https://tiktok.com/@transilvaniagym',
  youtube: 'https://youtube.com/@transilvaniagym',
  linkedin: '',
  twitter: '',

  // Program de lucru
  workingHours: [
    { days: 'Luni - Vineri', hours: '07:00 - 22:00' },
    { days: 'Sâmbătă', hours: '08:00 - 20:00' },
    { days: 'Duminică', hours: '09:00 - 18:00' },
  ],

  // Google Maps
  googleMapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.4729182042995!2d23.588416315676973!3d46.77121097913861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e8a9c5b81d1%3A0x3c8e3a1f8f7c8b9!2sCluj-Napoca%2C%20Romania!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s',
  googleMapsLink: 'https://goo.gl/maps/cluj-napoca',
}

// =============================================================================
// TEMA - Culori
// =============================================================================

export const themeData = {
  primaryColor: '#f13a11', // Culoarea accent (butoane, link-uri)
  darkColor: '#171819', // Background dark
  lightColor: '#ffffff', // Text pe dark
  textColor: '#666262', // Text secundar
  surfaceColor: '#f9f9f9', // Card backgrounds
}

// =============================================================================
// IMAGINI - URL-uri pentru seed
// =============================================================================

// Base URL pentru imagini (GitHub raw sau alt CDN)
export const IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/MihaiBarascu/seed-assets/master/transilvania-fitness/'

// Imagini pentru posts/blog si general use (trainers, classes, etc.)
export const blogImages = [
  {
    filename: 'trainers/trainer-male-1.jpg',
    alt: 'Antrenor masculin fitness - antrenament forta',
  },
  {
    filename: 'trainers/trainer-female-1.jpg',
    alt: 'Antrenoare fitness feminina - kettlebell workout',
  },
  {
    filename: 'trainers/trainer-male-2.jpg',
    alt: 'Antrenor fitness - CrossFit si functional',
  },
  {
    filename: 'classes/yoga-class-1.jpg',
    alt: 'Clasa de yoga in grup - stretching si relaxare',
  },
  {
    filename: 'classes/crossfit-battle-ropes.jpg',
    alt: 'Antrenament CrossFit cu battle ropes',
  },
  {
    filename: 'classes/boxing-class.jpg',
    alt: 'Clasa de box fitness - antrenament cardio intens',
  },
  {
    filename: 'classes/pilates-class.jpg',
    alt: 'Clasa de Pilates - core training si flexibilitate',
  },
  {
    filename: 'classes/spinning-class.jpg',
    alt: 'Clasa de spinning - cardio pe bicicleta',
  },
]

// Imagini Hero
export const heroImages = [
  {
    filename: 'hero/gym-barbell-dark.jpg',
    alt: 'Sala de fitness moderna - echipament profesional',
  },
  {
    filename: 'hero/hero-gym-1.jpg',
    alt: 'Interior sala fitness - zona de greutati',
  },
  {
    filename: 'hero/hero-gym-2.jpg',
    alt: 'Echipamente fitness profesionale',
  },
]

// Imagini pentru Blog Posts
export const blogPostImages = [
  {
    filename: 'blog/workout-tips.jpg',
    alt: 'Antrenament fitness cu bara - exercitii de baza',
  },
  {
    filename: 'blog/fitness-nutrition.jpg',
    alt: 'Alimentatie sanatoasa pentru fitness - oua avocado legume',
  },
  {
    filename: 'blog/healthy-lifestyle.jpg',
    alt: 'Antrenament de dimineata - abdominale cu lumina naturala',
  },
]

// =============================================================================
// CATEGORII BLOG
// =============================================================================

export const blogCategories = ['Fitness', 'Nutritie', 'Lifestyle', 'Antrenamente', 'Sanatate']

// =============================================================================
// TEAM MEMBERS - Echipa
// =============================================================================

export const teamMembersData = [
  {
    title: 'Alexandru Popescu',
    slug: 'alexandru-popescu',
    role: 'Antrenor Principal & Fondator',
    excerpt:
      'Cu peste 15 ani de experiență în fitness și culturism, Alexandru este sufletul sălii noastre.',
    imageIndex: 0, // trainer-male-1.jpg
    experience: 15,
    specializations: [{ name: 'Culturism' }, { name: 'Powerlifting' }, { name: 'Nutriție Sportivă' }],
    socialMedia: {
      instagram: 'https://instagram.com/alex_trainer',
      facebook: 'https://facebook.com/alextrainer',
    },
    contact: {
      email: 'alexandru@transilvaniafitness.ro',
      phone: '+40 722 333 444',
    },
    cta: { label: 'Programează o sesiune', linkType: 'custom' as const, url: '/comanda?tip=antrenor&optiune=Alexandru+Popescu' },
  },
  {
    title: 'Maria Ionescu',
    slug: 'maria-ionescu',
    role: 'Instructor Fitness de Grup',
    excerpt: 'Specializată în aerobic, Pilates și Yoga, Maria aduce energie pozitivă în fiecare clasă.',
    imageIndex: 1, // trainer-female-1.jpg
    experience: 8,
    specializations: [{ name: 'Yoga' }, { name: 'Pilates' }, { name: 'Aerobic' }],
    socialMedia: {
      instagram: 'https://instagram.com/maria_fitness',
      facebook: 'https://facebook.com/mariafitness',
    },
    contact: {
      email: 'maria@transilvaniafitness.ro',
      phone: '+40 733 444 555',
    },
    cta: { label: 'Programează o sesiune', linkType: 'custom' as const, url: '/comanda?tip=antrenor&optiune=Maria+Ionescu' },
  },
  {
    title: 'Mihai Radu',
    slug: 'mihai-radu',
    role: 'Antrenor CrossFit',
    excerpt: 'Campion național de CrossFit, Mihai te va împinge să-ți depășești limitele.',
    imageIndex: 2, // trainer-male-2.jpg
    experience: 10,
    specializations: [{ name: 'CrossFit' }, { name: 'Functional Training' }, { name: 'HIIT' }],
    socialMedia: {
      instagram: 'https://instagram.com/mihai_crossfit',
    },
    contact: {
      email: 'mihai@transilvaniafitness.ro',
      phone: '+40 744 555 666',
    },
    cta: { label: 'Programează o sesiune', linkType: 'custom' as const, url: '/comanda?tip=antrenor&optiune=Mihai+Radu' },
  },
]

// =============================================================================
// CLASE FITNESS
// =============================================================================

export const classesData = [
  {
    title: 'Yoga pentru Începători',
    slug: 'yoga-incepatori',
    imageIndex: 3, // yoga-class-1.jpg
    description:
      'Clasă de yoga perfectă pentru cei care vor să înceapă o practică de yoga relaxantă și revigorantă.',
    category: 'mind-body' as const,
    difficulty: 'beginner' as const,
    duration: 60,
    trainerIndex: 1, // Maria Ionescu
    capacity: 20,
    schedule: [
      { day: 'monday' as const, time: '18:00' },
      { day: 'wednesday' as const, time: '18:00' },
      { day: 'friday' as const, time: '18:00' },
    ],
    price: {
      dropIn: 50,
      monthly: 350,
      package: {
        sessions: 10,
        price: 400,
      },
    },
    benefits: [
      { benefit: 'Îmbunătățește flexibilitatea' },
      { benefit: 'Reduce stresul și anxietatea' },
      { benefit: 'Întărește musculatura' },
      { benefit: 'Îmbunătățește postura' },
    ],
    requirements: 'Saltea de yoga, prosop, sticlă de apă',
    cta: { label: 'Înscrie-te la clasă', linkType: 'custom' as const, url: '/comanda?tip=clasa&optiune=Yoga+pentru+Începători' },
  },
  {
    title: 'CrossFit Intensiv',
    slug: 'crossfit-intensiv',
    imageIndex: 4, // crossfit-battle-ropes.jpg
    description: 'Antrenament de înaltă intensitate pentru cei care vor rezultate rapide și vizibile.',
    category: 'strength' as const,
    difficulty: 'advanced' as const,
    duration: 45,
    trainerIndex: 0, // Alexandru Popescu
    capacity: 15,
    schedule: [
      { day: 'tuesday' as const, time: '07:00' },
      { day: 'thursday' as const, time: '07:00' },
      { day: 'saturday' as const, time: '09:00' },
    ],
    price: {
      dropIn: 70,
      monthly: 450,
    },
    benefits: [
      { benefit: 'Crește forța și rezistența' },
      { benefit: 'Arde calorii eficient' },
      { benefit: 'Dezvoltă masa musculară' },
      { benefit: 'Îmbunătățește condiția fizică generală' },
    ],
    requirements: 'Încălțăminte sport, prosop mare, sticlă de apă, mănuși (opțional)',
    cta: { label: 'Înscrie-te la clasă', linkType: 'custom' as const, url: '/comanda?tip=clasa&optiune=CrossFit+Intensiv' },
  },
  {
    title: 'Pilates Core',
    slug: 'pilates-core',
    imageIndex: 6, // pilates-class.jpg
    description:
      'Consolidează-ți centrul corpului și îmbunătățește-ți postura cu exerciții Pilates.',
    category: 'flexibility' as const,
    difficulty: 'intermediate' as const,
    duration: 50,
    trainerIndex: 2, // Mihai Radu
    capacity: 12,
    schedule: [
      { day: 'monday' as const, time: '10:00' },
      { day: 'wednesday' as const, time: '10:00' },
      { day: 'friday' as const, time: '10:00' },
    ],
    price: {
      dropIn: 60,
      monthly: 400,
      package: {
        sessions: 8,
        price: 380,
      },
    },
    benefits: [
      { benefit: 'Întărește mușchii abdominali' },
      { benefit: 'Îmbunătățește echilibrul' },
      { benefit: 'Reduce durerile de spate' },
      { benefit: 'Tonifică întregul corp' },
    ],
    requirements: 'Saltea de yoga, îmbrăcăminte confortabilă',
    cta: { label: 'Înscrie-te la clasă', linkType: 'custom' as const, url: '/comanda?tip=clasa&optiune=Pilates+Core' },
  },
]

// =============================================================================
// ABONAMENTE
// =============================================================================

export const abonamentsData = [
  // GYM Subscriptions
  {
    title: 'Basic',
    subtitle: 'Intrare liberă',
    type: 'gym' as const,
    imageIndex: 0,
    price: { amount: 150, period: '/lună' },
    features: [
      { text: 'Acces nelimitat la sală', included: true },
      { text: 'Program Luni-Vineri 07:00-22:00', included: true },
      { text: 'Vestiare și dușuri', included: true },
      { text: 'Clase fitness gratuite', included: false },
      { text: 'Antrenor personal', included: false },
    ],
    cta: { label: 'Alege Basic', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=Basic' },
    highlighted: false,
    order: 1,
  },
  {
    title: 'Premium',
    subtitle: 'Cel mai popular',
    type: 'gym' as const,
    imageIndex: 1,
    price: { amount: 250, period: '/lună', oldPrice: 300 },
    features: [
      { text: 'Acces nelimitat la sală', included: true },
      { text: 'Program 07:00-22:00 (7 zile)', included: true },
      { text: 'Vestiare și dușuri premium', included: true },
      { text: 'Toate clasele fitness incluse', included: true },
      { text: '1 sesiune antrenor personal/lună', included: true },
    ],
    cta: { label: 'Alege Premium', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=Premium' },
    highlighted: true,
    highlightLabel: 'Popular',
    order: 2,
  },
  {
    title: 'VIP',
    subtitle: 'Experiență completă',
    type: 'gym' as const,
    imageIndex: 2,
    price: { amount: 450, period: '/lună' },
    features: [
      { text: 'Acces nelimitat la sală 24/7', included: true },
      { text: 'Toate clasele fitness incluse', included: true },
      { text: 'Vestiare VIP cu saună', included: true },
      { text: '4 sesiuni antrenor personal/lună', included: true },
      { text: 'Plan nutrițional personalizat', included: true },
      { text: 'Acces gratuit SPA', included: true },
    ],
    cta: { label: 'Alege VIP', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=VIP' },
    highlighted: false,
    order: 3,
  },
  // SPA Subscriptions
  {
    title: 'Relaxare SPA',
    subtitle: '5 intrări',
    type: 'spa' as const,
    imageIndex: 0,
    price: { amount: 200, period: '/5 vizite' },
    features: [
      { text: 'Acces saună și jacuzzi', included: true },
      { text: 'Prosop și halat inclus', included: true },
      { text: 'Valabilitate 2 luni', included: true },
    ],
    cta: { label: 'Rezervă acum', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=Relaxare+SPA' },
    highlighted: false,
    order: 1,
  },
  {
    title: 'Wellness Nelimitat',
    subtitle: 'Acces lunar',
    type: 'spa' as const,
    imageIndex: 1,
    price: { amount: 350, period: '/lună' },
    features: [
      { text: 'Acces nelimitat SPA', included: true },
      { text: 'Toate facilitățile incluse', included: true },
      { text: 'Reducere 20% la masaje', included: true },
    ],
    cta: { label: 'Contactează-ne', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=Wellness+Nelimitat' },
    highlighted: true,
    highlightLabel: 'Best Value',
    order: 2,
  },
  // Solar Subscriptions
  {
    title: 'Solar Basic',
    subtitle: '100 minute',
    type: 'solar' as const,
    imageIndex: 2,
    price: { amount: 80, period: '' },
    features: [
      { text: '100 minute solar', included: true },
      { text: 'Valabilitate 3 luni', included: true },
    ],
    cta: { label: 'Cumpără', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=Solar+Basic' },
    highlighted: false,
    order: 1,
  },
  {
    title: 'Solar Premium',
    subtitle: '300 minute',
    type: 'solar' as const,
    imageIndex: 0,
    price: { amount: 200, period: '', oldPrice: 240 },
    features: [
      { text: '300 minute solar', included: true },
      { text: 'Valabilitate 6 luni', included: true },
      { text: 'Cremă bronzantă gratuită', included: true },
    ],
    cta: { label: 'Cumpără', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=Solar+Premium' },
    highlighted: true,
    highlightLabel: 'Economie 17%',
    order: 2,
  },
  // Combo Package
  {
    title: 'Fitness + SPA',
    subtitle: 'Pachet complet',
    type: 'fitness-spa' as const,
    imageIndex: 1,
    price: { amount: 380, period: '/lună', oldPrice: 450 },
    features: [
      { text: 'Abonament Premium Sală', included: true },
      { text: 'Acces nelimitat SPA', included: true },
      { text: 'Reducere 15%', included: true },
    ],
    cta: { label: 'Alege pachetul', linkType: 'custom' as const, url: '/comanda?tip=abonament&optiune=Fitness+SPA' },
    highlighted: true,
    highlightLabel: 'Economie 15%',
    order: 1,
  },
]

// =============================================================================
// SCHEDULE - Orarul săptămânal
// =============================================================================

export const scheduleEntries = [
  { day: 'monday' as const, time: '07:00', endTime: '08:00', className: 'Morning Cardio', trainer: 'Dan Popescu' },
  { day: 'monday' as const, time: '18:00', endTime: '19:00', className: 'Yoga', trainer: 'Maria Ionescu' },
  { day: 'monday' as const, time: '19:00', endTime: '19:45', className: 'Kango Jumps', trainer: 'Marius David' },
  { day: 'tuesday' as const, time: '07:00', endTime: '07:45', className: 'CrossFit', trainer: 'Alexandru Popescu' },
  { day: 'tuesday' as const, time: '09:00', endTime: '10:00', className: 'TRX Training', trainer: 'Ana Marinescu' },
  { day: 'tuesday' as const, time: '18:00', endTime: '18:45', className: 'Spinning', trainer: 'Vlad Ionescu' },
  { day: 'wednesday' as const, time: '10:00', endTime: '10:50', className: 'Pilates Core', trainer: 'Mihai Radu' },
  { day: 'wednesday' as const, time: '18:00', endTime: '19:00', className: 'Yoga', trainer: 'Maria Ionescu' },
  { day: 'wednesday' as const, time: '19:30', endTime: '20:30', className: 'Boxing Fitness', trainer: 'Radu Constantin' },
  { day: 'thursday' as const, time: '07:00', endTime: '07:45', className: 'CrossFit', trainer: 'Alexandru Popescu' },
  { day: 'thursday' as const, time: '17:00', endTime: '17:50', className: 'Aerobic Step', trainer: 'Elena Dumitrescu' },
  { day: 'friday' as const, time: '10:00', endTime: '10:50', className: 'Pilates Core', trainer: 'Mihai Radu' },
  { day: 'friday' as const, time: '18:00', endTime: '19:00', className: 'Yoga', trainer: 'Maria Ionescu' },
  { day: 'saturday' as const, time: '09:00', endTime: '09:45', className: 'CrossFit', trainer: 'Alexandru Popescu' },
  { day: 'saturday' as const, time: '11:00', endTime: '12:30', className: 'Zumba Party', trainer: 'Cristina Popa' },
  { day: 'sunday' as const, time: '10:00', endTime: '11:15', className: 'Yoga Relaxare', trainer: 'Maria Ionescu' },
  { day: 'sunday' as const, time: '16:00', endTime: '17:00', className: 'Stretching & Recovery', trainer: 'Team' },
]

// =============================================================================
// FOOTER - Texte și Link-uri
// =============================================================================

export const footerData = {
  description: `Transformă-ți corpul și mintea cu programele noastre profesionale de fitness. Alătură-te comunității noastre și începe călătoria ta către o viață sănătoasă!`,
  columns: [
    {
      title: 'Linkuri Rapide',
      contentType: 'links' as const,
      links: [
        { label: 'Despre Noi', url: '/despre' },
        { label: 'Clasele Noastre', url: '/clase' },
        { label: 'Antrenori', url: '/antrenori' },
        { label: 'Abonamente', url: '/abonamente' },
        { label: 'Blog', url: '/blog' },
      ],
    },
    {
      title: 'Serviciile Noastre',
      contentType: 'text' as const,
      textItems: [
        { icon: 'check' as const, text: 'Antrenament Personal' },
        { icon: 'check' as const, text: 'Clase de Grup' },
        { icon: 'check' as const, text: 'Consiliere Nutrițională' },
        { icon: 'check' as const, text: 'Programe Online' },
        { icon: 'check' as const, text: 'Recuperare & Masaj' },
      ],
    },
    {
      title: 'Contact',
      contentType: 'contact' as const,
    },
    {
      title: 'Program de Lucru',
      contentType: 'schedule' as const,
    },
  ],
  legalLinks: [
    { label: 'Politica de Confidențialitate', url: '/confidentialitate' },
    { label: 'Termeni și Condiții', url: '/termeni' },
    { label: 'Politica Cookie', url: '/cookies' },
    { label: 'ANPC', url: 'https://anpc.ro/', newTab: true },
  ],
}

// =============================================================================
// NAVIGARE HEADER
// =============================================================================

export const headerNavigation = {
  // Link-uri navigare principală
  mainLinks: [
    { label: 'Acasă', url: '/', type: 'custom' as const },
    { label: 'Postări', url: '/posts', type: 'custom' as const },
    { label: 'Abonamente', url: '/abonamente', type: 'custom' as const },
    { label: 'Antrenori', url: '/antrenori', type: 'custom' as const },
    { label: 'Contact', url: '/contact', type: 'custom' as const },
  ],

  // Dropdown pentru clase
  classesDropdown: {
    label: 'Clase',
    url: '/clase',
    // subItems will be populated dynamically from classesData
  },

  // Social media în header
  socialPlatforms: ['facebook', 'instagram', 'tiktok'] as const,
}

// =============================================================================
// PAGINI SETTINGS
// =============================================================================

export const pagesSettings = {
  echipa: {
    heroTitle: 'Echipa Noastră',
    heroSubtitle:
      'Cunoaște antrenorii noștri profesioniști, dedicați să te ajute să îți atingi obiectivele',
    columns: '3' as const,
    cardType: 'team' as const,
    showSpecialization: true,
    meta: {
      title: `Echipa | ${businessData.name}`,
      description:
        'Cunoaște echipa de antrenori profesioniști de la Transilvania Fitness. Experți în fitness, yoga, CrossFit și nutriție.',
    },
    individualLayout: 'sidebar' as const,
    showExperience: true,
    showSpecializations: true,
    showContact: true,
    showSocialMedia: true,
    showCTA: true,
    showRelatedMembers: true,
    ctaTitle: 'Vrei să lucrezi cu {name}?',
    ctaDescription:
      'Contactează-ne pentru a programa o sesiune de antrenament sau pentru mai multe informații despre serviciile noastre.',
    ctaButtonText: 'Contactează-ne',
    ctaSecondaryButtonText: 'Vezi clasele disponibile',
    relatedMembersTitle: 'Restul echipei',
    relatedMembersCount: 3,
  },
  clase: {
    heroTitle: 'Clasele Noastre',
    heroSubtitle: 'Descoperă programul complet de clase fitness pentru toate nivelurile',
    showScheduleLink: true,
    columns: '3' as const,
    cardType: 'class' as const,
    meta: {
      title: `Clase Fitness | ${businessData.name}`,
      description:
        'Explorează clasele noastre de fitness: Yoga, CrossFit, Pilates, Spinning și multe altele. Program variat pentru începători și avansați.',
    },
    individualLayout: 'sidebar' as const,
    showSchedule: true,
    showPricing: true,
    showTrainer: true,
    showBenefits: true,
    showRequirements: true,
    showRelatedClasses: true,
    relatedClassesTitle: 'Alte clase similare',
    relatedClassesCount: 3,
    ctaButtonText: 'Rezervă acum',
  },
  abonamente: {
    heroTitle: 'Abonamente',
    heroSubtitle: 'Alege abonamentul potrivit pentru stilul tău de viață și obiectivele tale',
    showFilters: true,
    columns: '3' as const,
    defaultFilter: 'all' as const,
    meta: {
      title: `Abonamente | ${businessData.name}`,
      description:
        'Descoperă abonamentele noastre flexibile: Sală, SPA, Solar și pachete combo. Prețuri competitive și beneficii exclusive.',
    },
  },
}

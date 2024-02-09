const deckOfCards = [
  {
    id: 'portfolio-1',
    color: '#FBBF24',
    projectData: {
      imageUrl: 'cards/silvanusdesign.com.png',
      title: 'My old portfolio',
      description: 'A previous portfolio',
      siteUrl: 'https://silvanusdesign.com',
      githubUrl: 'https://github.com/SilasCundiff/day-night-portfolio/tree/main',
      techStack: ['React', 'Framer Motion', 'Nextjs', 'Styled Components', 'Lottie'],
      roles: ['Frontend Developer', 'Designer'],
      disableIframe: false,
    },
  },
  {
    id: 'zenify-1',
    color: '#EF4444',
    projectData: {
      imageUrl: 'cards/zenify.silascundiff.com.png',
      title: 'Zenify',
      description: 'An audio visualizer that uses the Spotify API to create a unique experience for each song',
      siteUrl: 'https://zenify.silascundiff.com',
      githubUrl: 'https://github.com/SilasCundiff/zenify-three',
      techStack: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'SpotifyAPI', 'Vercel', 'Nextjs'],
      roles: ['Frontend Developer', 'Designer'],
      disableIframe: false,
    },
  },
  {
    id: 'avanos-1',
    color: '#10B981',
    projectData: {
      imageUrl: 'cards/avanos.com.png',
      title: 'Title 3',
      description: 'A website for a medical device company',
      siteUrl: 'https://avanos.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Bitbucket'],
      roles: ['Frontend Developer', 'Content Manager', 'Advisor', 'Security Administrator'],
      disableIframe: false,
    },
  },
  {
    id: 'anna-griffin-1',
    color: '#3B82F6',
    projectData: {
      imageUrl: 'cards/annagriffin.com.png',
      title: 'Anna Griffin',
      description: 'Large E-commerce site for an arts and crafts company.',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      siteUrl: 'https://www.annagriffin.com',
      roles: ['Frontend Developer', 'Content Manager', 'Theme Developer', 'Plugin Developer'],
      disableIframe: true,
    },
  },
  {
    id: 'beacham-1',
    color: '#6D28D9',
    projectData: {
      imageUrl: 'cards/beacham.com.png',
      title: 'Beacham Realty',
      description: 'Real estate website for a luxury real estate company.',
      siteUrl: 'https://beacham.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      roles: ['Frontend Developer', 'Theme Developer', 'Plugin Developer'],
      disableIframe: false,
    },
  },
  {
    id: 'zelena',
    color: '#93C5FD',
    projectData: {
      imageUrl: 'cards/Zelena.png',
      title: 'Zelena',
      description: 'A tool for updating FMLS listings for all of our realty websites.',
      techStack: ['React', 'TypeScript', 'GoLang', 'Mongo', 'gRPC', 'Docker'],
      roles: ['Frontend Developer', 'Backend Developer', 'Designer'],
      disableIframe: true,
    },
  },
  {
    id: 'earths-ally-1',
    color: '#F472B6',
    projectData: {
      imageUrl: 'cards/earthsally.com.png',
      title: "Earth's Ally",
      description: 'Commercial website for a gardening company.',
      siteUrl: 'https://earthsally.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      roles: ['Frontend Developer', 'Theme Developer', 'Content Manager'],
      disableIframe: false,
    },
  },
  {
    id: 'ingriffin-1',
    color: '#6366F1',
    projectData: {
      imageUrl: 'cards/ingriffin.com.png',
      title: 'InGriffin',
      description: 'A community website for Griffin, Georgia.',
      siteUrl: 'https://ingriffin.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      roles: ['Frontend Developer', 'Theme Developer', 'Plugin Developer'],
      disableIframe: false,
    },
  },
  {
    id: 'rhonda-haran-1',
    color: '#EC4899',
    projectData: {
      imageUrl: 'cards/rhonda-haran.com.png',
      title: 'Rhonda Haran Real Estate',
      description: 'Real estate website for a luxury real estate company',
      siteUrl: 'https://rhonda-haran.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      roles: ['Frontend Developer', 'Theme Developer', 'Plugin Developer'],
      disableIframe: false,
    },
  },
  {
    id: 'sea-island-1',
    color: '#F59E0B',
    projectData: {
      imageUrl: 'cards/seaislandproperties.com.png',
      title: 'Sea Island Properties',
      description: 'A real estate website for luxury sea side properties',
      siteUrl: 'https://seaislandproperties.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      roles: ['Frontend Developer', 'Theme Developer', 'Plugin Developer'],
      disableIframe: false,
    },
  },
  {
    id: 'springworks-1',
    color: '#D97706',
    projectData: {
      imageUrl: 'cards/springworkstx.com.png',
      title: 'SpringWorks Therapeutics',
      description: 'A website for a biotech company',
      siteUrl: 'https://springworkstx.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      roles: ['Frontend Developer', 'Theme Developer', 'Content Manager', 'Advisor'],
      disableIframe: true,
    },
  },
  {
    id: 'sothebysrealty-1',
    color: '#EF4444',
    projectData: {
      imageUrl: 'cards/sothebysrealty.com.png',
      title: 'Sothebys Realty',
      description: 'A real estate website for luxury properties',
      siteUrl: 'https://www.sothebysrealty.com/eng',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Gulp', 'Docker'],
      roles: ['Frontend Developer', 'Theme Developer', 'Plugin Developer'],
      disableIframe: true,
    },
  },
]

export default deckOfCards
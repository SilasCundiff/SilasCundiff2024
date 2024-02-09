const deckOfCards = [
  {
    id: 'portfolio-1',
    color: '#FBBF24',
    projectData: {
      imageUrl: 'silvanusdesign.com.png',
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
      imageUrl: 'zenify.silascundiff.com.png',
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
      imageUrl: 'avanos.com.png',
      title: 'Avanos',
      description: 'A website for a medical device company',
      siteUrl: 'https://avanos.com/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Bitbucket'],
      roles: ['Frontend Developer', 'Content Manager', 'Advisor', 'Security Administrator'],
      disableIframe: false,
    },
  },
  {
    id: 'dalrc-1',
    color: '#10B981',
    projectData: {
      imageUrl: 'dalrc.org.png',
      title: 'Delta Retiree Club',
      description: 'A website for Delta Retirees to stay connected and informed',
      siteUrl: 'https://dalrc.org/',
      techStack: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Bitbucket'],
      roles: ['Frontend Developer', 'Content Manager', 'Advisor'],
      disableIframe: false,
    },
  },
  {
    id: 'anna-griffin-1',
    color: '#3B82F6',
    projectData: {
      imageUrl: 'annagriffin.com.png',
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
      imageUrl: 'beacham.com.png',
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
      imageUrl: 'Zelena.png',
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
      imageUrl: 'earthsally.com.png',
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
      imageUrl: 'ingriffin.com.png',
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
      imageUrl: 'rhonda-haran.com.png',
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
      imageUrl: 'seaislandproperties.com.png',
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
      imageUrl: 'springworkstx.com.png',
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
      imageUrl: 'sothebysrealty.com.png',
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

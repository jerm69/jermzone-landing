'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import {
  SportsBasketball as BasketballIcon,
  SportsEsports as GamesIcon,
  FlightTakeoff as FlightIcon,
  Dashboard as DashboardIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  FileDownload as DownloadIcon,
  ArrowBack as PreviousIcon,
  ArrowForward as NextIcon,
  Pause as PauseIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { colors, mono } from './ThemeRegistry';

const CONTACT = {
  email: 'jterhaar91@gmail.com',
  github: 'https://github.com/jerm69',
  linkedin: 'https://www.linkedin.com/in/jeremy-terhaar/',
};

const projects = [
  {
    title: 'WULv2 Basketball League',
    description: 'A full-stack league platform for rosters, schedules, standings and community, with support for multiple leagues.',
    icon: <BasketballIcon fontSize="large" />,
    color: colors.rose,
    path: '/league',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    status: 'live' as const,
  },
  {
    title: 'Games',
    description: 'Six classic browser games: Blackjack, Checkers, Minesweeper, Snake, Tic-Tac-Toe and Video Poker.',
    icon: <GamesIcon fontSize="large" />,
    color: colors.sky,
    path: '/games',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    status: 'live' as const,
  },
  {
    title: 'FlightRadar Live',
    description: 'An upcoming flight-tracking project exploring live ADS-B data, aircraft details and flight history.',
    icon: <FlightIcon fontSize="large" />,
    color: colors.orange,
    tags: ['ADS-B', 'Maps', 'Real-time', 'API'],
    status: 'soon' as const,
  },
  {
    title: 'Dev Dashboard',
    description: 'An upcoming dashboard concept for process health, server metrics and quick links to active projects.',
    icon: <DashboardIcon fontSize="large" />,
    color: colors.gold,
    tags: ['Monitoring', 'PM2', 'Node.js'],
    status: 'soon' as const,
  },
];

const skillGroups = [
  { label: 'Languages', items: ['C#', 'Java', 'TypeScript', 'JavaScript', 'PowerShell', 'Python', 'Bash', 'PHP'] },
  { label: 'Frameworks & Tools', items: ['.NET', 'Node.js', 'GitHub Actions', 'Jenkins', 'AWS', 'Terraform', 'Kafka'] },
  { label: 'Databases', items: ['SQL Server', 'PostgreSQL', 'MySQL'] },
  { label: 'DevOps & Automation', items: ['CI/CD Pipeline Design', 'Infrastructure Automation', 'Deployment Scripting'] },
];

const experience = [
  {
    company: 'Chewy',
    roles: [
      { title: 'Software Engineer II', dates: 'Oct 2022 – Present' },
      { title: 'Software Engineer I', dates: 'Sep 2019 – Oct 2022' },
    ],
    bullets: [
      'Led a standardized CI/CD platform using GitHub Actions and modular PowerShell tooling for provisioning and deployment quality gates.',
      'Built warehouse management APIs and React interfaces with automated validation and continuous testing.',
      'Strengthened releases for a 24/7 supply chain platform serving 1000+ users, reducing pipelines from days to under an hour.',
    ],
  },
  {
    company: 'BEI Services',
    roles: [{ title: 'Software Engineer', dates: 'Sep 2016 – Sep 2019' }],
    bullets: [
      'Delivered full-stack web applications and REST APIs, from database schema to frontend, for enterprise clients.',
      'Built SQL solutions and third-party integrations to improve data reliability and business workflows.',
    ],
  },
];

const sectionSx = { py: { xs: 5, md: 7 }, scrollMarginTop: { xs: '112px', sm: '80px' } };
const labelSx = { fontFamily: mono, color: colors.gold, letterSpacing: '0.14em', fontSize: '0.72rem', textTransform: 'uppercase' };
const secondarySx = { color: colors.gray, lineHeight: 1.65 };
const outlineSx = { borderColor: colors.slate, color: colors.bone, '&:hover': { borderColor: colors.sky, bgcolor: colors.ink } };

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 3, pb: 1.5, borderBottom: `1px solid ${colors.slate}` }}>
      <Typography component="span" sx={labelSx}>{index}</Typography>
      <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.35rem', md: '1.65rem' } }}>{title}</Typography>
    </Box>
  );
}

function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || hovered || focused || !visible || reducedMotion) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % projects.length), 7000);
    return () => window.clearTimeout(timer);
  }, [index, playing, hovered, focused, visible, reducedMotion]);

  const select = (next: number) => {
    const destination = (next + projects.length) % projects.length;
    setIndex(destination);
    setPlaying(false);
    setAnnouncement(`${projects[destination].title}, ${destination + 1} of ${projects.length}`);
  };
  const project = projects[index];

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured apps"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <Box sx={{ bgcolor: colors.charcoal, border: `1px solid ${colors.slate}`, borderLeft: `4px solid ${project.color}`, p: { xs: 2.5, sm: 4 }, minHeight: { sm: 255 } }}>
        <Box role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box aria-hidden="true" sx={{ color: project.color, display: 'flex' }}>{project.icon}</Box>
            <Typography sx={{ ...labelSx, color: project.status === 'live' ? colors.gold : colors.gray }}>
              {project.status === 'live' ? 'Live project' : 'Coming soon'}
            </Typography>
          </Stack>
          <Typography variant="h5" component="h3" sx={{ fontSize: { xs: '1.3rem', sm: '1.6rem' }, mb: 1 }}>{project.title}</Typography>
          <Typography sx={{ ...secondarySx, maxWidth: 670, mb: 2 }}>{project.description}</Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap gap={1} sx={{ mb: project.status === 'live' ? 2.5 : 0 }}>
            {project.tags.map((tag) => (
              <Typography key={tag} component="span" sx={{ fontFamily: mono, color: colors.gray, fontSize: '0.7rem', borderBottom: `1px solid ${colors.slate}` }}>{tag}</Typography>
            ))}
          </Stack>
          {project.status === 'live' && (
            <Button href={project.path} variant="outlined" size="small" sx={outlineSx}>Open {project.title}</Button>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton aria-label="Previous project" onClick={() => select(index - 1)} sx={{ color: colors.bone }}><PreviousIcon /></IconButton>
          <Typography sx={{ fontFamily: mono, fontSize: '0.8rem', minWidth: 58, textAlign: 'center' }} aria-hidden="true">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </Typography>
          <IconButton aria-label="Next project" onClick={() => select(index + 1)} sx={{ color: colors.bone }}><NextIcon /></IconButton>
          <IconButton
            aria-label={reducedMotion ? 'Autoplay unavailable with reduced motion' : playing ? 'Pause project autoplay' : 'Play project autoplay'}
            onClick={() => setPlaying((current) => !current)}
            disabled={reducedMotion}
            sx={{ color: colors.bone, ml: 1 }}
          >
            {playing && !reducedMotion ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={0.5} aria-label="Choose a project">
          {projects.map((item, position) => (
            <IconButton
              key={item.title}
              aria-label={`Show ${item.title}, project ${position + 1} of ${projects.length}`}
              aria-current={index === position ? 'true' : undefined}
              onClick={() => select(position)}
              sx={{ p: 1, color: index === position ? colors.gold : colors.gray }}
            >
              <Box component="span" sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: 'currentColor' }} />
            </IconButton>
          ))}
        </Stack>
      </Box>
      <Box component="span" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap' }} aria-live="polite" aria-atomic="true">
        {announcement}
      </Box>
    </Box>
  );
}

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.navy, color: colors.bone }}>
      {/* Nav */}
      <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: colors.ink, borderBottom: `1px solid ${colors.slate}` }}>
        <Container maxWidth="lg" sx={{ py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <Box component="a" href="#top" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '1.15rem', textDecoration: 'none', color: colors.bone }}>JT<span style={{ color: colors.gold }}>.</span></Box>
          <Box component="nav" aria-label="Page sections" sx={{ display: 'flex', gap: { xs: 1.5, sm: 3 }, width: { xs: '100%', sm: 'auto' }, overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {['Projects', 'About', 'Experience', 'Skills', 'Contact'].map((label) => (
              <Box key={label} component="a" href={`#${label.toLowerCase()}`} sx={{ color: colors.gray, fontFamily: mono, fontSize: { xs: '0.68rem', sm: '0.75rem' }, textDecoration: 'none', py: 0.5, '&:hover': { color: colors.bone } }}>{label}</Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Hero */}
      <Box component="main" id="top" sx={{ scrollMarginTop: '112px' }}>
        <Box sx={{ bgcolor: colors.ink, borderBottom: `1px solid ${colors.slate}` }}>
          <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: { xs: 3, md: 7 }, alignItems: 'end' }}>
            <Box>
              <Typography sx={{ ...labelSx, mb: 2 }}>Software engineering / Minneapolis, MN</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '3.7rem' }, letterSpacing: '-0.055em', lineHeight: 1.12, mb: 2 }}>Jeremy Terhaar<span style={{ color: colors.gold }}>.</span></Typography>
              <Typography sx={{ color: colors.sky, fontWeight: 600, fontSize: { xs: '1rem', md: '1.15rem' }, mb: 2 }}>Software Engineer — DevOps &amp; Platform Engineering</Typography>
              <Typography sx={{ ...secondarySx, maxWidth: 660 }}>Building reliable supply-chain systems, deployment platforms and tools that help engineering teams ship with confidence.</Typography>
            </Box>
            <Stack direction={{ xs: 'row', md: 'column' }} alignItems={{ xs: 'flex-start', md: 'stretch' }} flexWrap="wrap" gap={1.5} sx={{ maxWidth: { md: 230 } }}>
              <Button href="/resume.pdf" target="_blank" rel="noopener noreferrer" startIcon={<DownloadIcon />} variant="contained" color="secondary" sx={{ bgcolor: colors.mustard, color: colors.ink, '&:hover': { bgcolor: colors.gold } }}>View résumé</Button>
              <Button href="#contact" variant="outlined" sx={outlineSx}>Get in touch</Button>
            </Stack>
          </Container>
        </Box>

        {/* Projects */}
        <Container maxWidth="lg" component="section" id="projects" sx={sectionSx}>
          <SectionHeading index="01" title="Featured apps" />
          <ProjectsCarousel />
        </Container>

        {/* About */}
        <Box sx={{ bgcolor: colors.ink }}>
          <Container maxWidth="lg" component="section" id="about" sx={sectionSx}>
            <SectionHeading index="02" title="About" />
            <Typography sx={{ ...secondarySx, maxWidth: 780 }}>I’m a software engineer based in Minneapolis, focused on CI/CD, infrastructure automation and reliable systems. Outside of work I build full-stack projects, including a basketball league platform and browser games, to keep learning and stay hands-on.</Typography>
          </Container>
        </Box>

        {/* Experience */}
        <Container maxWidth="lg" component="section" id="experience" sx={sectionSx}>
          <SectionHeading index="03" title="Experience" />
          <Stack spacing={0}>
            {experience.map((job) => (
              <Box key={job.company} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: { xs: 1.5, md: 4 }, py: 2.5, borderBottom: `1px solid ${colors.slate}` }}>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '1.05rem', mb: 0.5 }}>{job.company}</Typography>
                  {job.roles.map((role) => (
                    <Typography key={role.title} variant="body2" sx={secondarySx}>{role.title} · {role.dates}</Typography>
                  ))}
                </Box>
                <Box component="ul" sx={{ m: 0, pl: 2.5, color: colors.gray, '& li': { mb: 0.75, lineHeight: 1.6 }, '& li::marker': { color: colors.steel } }}>
                  {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </Box>
              </Box>
            ))}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: { xs: 1, md: 4 }, py: 2.5, borderBottom: `1px solid ${colors.slate}` }}>
              <Typography variant="h6" sx={{ fontSize: '1.05rem' }}>Education</Typography>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>University of Minnesota, Twin Cities</Typography>
                <Typography variant="body2" sx={secondarySx}>B.A., Computer Science &amp; German, Scandinavian and Dutch Studies · 2016</Typography>
              </Box>
            </Box>
          </Stack>
        </Container>

        {/* Skills */}
        <Box sx={{ bgcolor: colors.ink }}>
          <Container maxWidth="lg" component="section" id="skills" sx={sectionSx}>
            <SectionHeading index="04" title="Technical toolkit" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: { xs: 2, md: 4 } }}>
              {skillGroups.map((group) => (
                <Box key={group.label}>
                  <Typography sx={{ ...labelSx, color: colors.sky, mb: 1 }}>{group.label}</Typography>
                  <Typography sx={secondarySx}>{group.items.join('  ·  ')}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Contact */}
        <Container maxWidth="lg" component="section" id="contact" sx={sectionSx}>
          <SectionHeading index="05" title="Contact" />
          <Typography sx={{ ...secondarySx, mb: 2.5 }}>Interested in working together? Let’s talk.</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            <Button variant="outlined" startIcon={<EmailIcon />} sx={outlineSx} href={`mailto:${CONTACT.email}`}>Email</Button>
            <Button variant="outlined" startIcon={<LinkedInIcon />} sx={outlineSx} href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</Button>
            <Button variant="outlined" startIcon={<GitHubIcon />} sx={outlineSx} href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ borderTop: `1px solid ${colors.slate}`, py: 3 }}>
        <Container maxWidth="lg"><Typography variant="body2" sx={{ fontFamily: mono, color: colors.gray }}>© {new Date().getFullYear()} Jeremy Terhaar</Typography></Container>
      </Box>
    </Box>
  );
}

'use client';

import {
  Box, Container, Typography, Button, Card, CardContent,
  Grid, Chip, Stack, Divider
} from '@mui/material';
import {
  SportsBasketball as BasketballIcon,
  SportsEsports as GamesIcon,
  FlightTakeoff as FlightIcon,
  Dashboard as DashboardIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  FileDownload as DownloadIcon,
  WorkOutline as WorkIcon,
  SchoolOutlined as SchoolIcon,
} from '@mui/icons-material';

// Palette pulled directly from the locker-photo reference: navy, slate blue,
// charcoal, maroon/red, burnt orange, and mustard.
const NAVY_DARK = '#152a42';
const SLATE = '#4c6672';
const STEEL_BLUE = '#5089ad';
const CHARCOAL_DARK = '#26282c';
const MAROON = '#7c2328';
const RED = '#9c3230';
const ORANGE = '#c1652f';
const MUSTARD = '#c99a3e';
// Light gray from the locker swatches (#a9abae → rgb(169,171,174)) is used
// directly as rgba(169,171,174, alpha) throughout for muted text/borders.

const ACCENT = RED;
const ACCENT_BLUE = STEEL_BLUE;
const ACCENT_MUSTARD = MUSTARD;
const ACCENT_ORANGE = ORANGE;
const BG_BASE = NAVY_DARK;
const BG_CARD = CHARCOAL_DARK;

const CONTACT = {
  email: 'jterhaar91@gmail.com',
  github: 'https://github.com/jerm69',
  linkedin: 'https://www.linkedin.com/in/jeremy-terhaar/',
};

const projects = [
  {
    title: 'WULv2 Basketball League',
    description:
      'Full-stack basketball league management system — team rosters, game scheduling, standings, community forums, and multi-tenant league support.',
    icon: <BasketballIcon sx={{ fontSize: 40 }} />,
    color: ACCENT,
    bgDark: '#3a1f1f',
    path: '/league',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    status: 'live' as const,
  },
  {
    title: 'Games',
    description:
      'Classic browser games — Minesweeper, Tic-Tac-Toe, and Checkers, each with multiple difficulty levels.',
    icon: <GamesIcon sx={{ fontSize: 40 }} />,
    color: ACCENT_BLUE,
    bgDark: '#1c2e3a',
    path: '/games',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    status: 'live' as const,
  },
  {
    title: 'FlightRadar Live',
    description:
      'Real-time flight tracking integration pulling live ADS-B data — map visualisation, aircraft info panels, and flight history.',
    icon: <FlightIcon sx={{ fontSize: 40 }} />,
    color: ACCENT_ORANGE,
    bgDark: '#3a2716',
    path: '#',
    tags: ['ADS-B', 'Maps', 'Real-time', 'API'],
    status: 'soon' as const,
  },
  {
    title: 'Dev Dashboard',
    description:
      'Personal engineering dashboard — process health, server metrics, and quick-launch links for active projects.',
    icon: <DashboardIcon sx={{ fontSize: 40 }} />,
    color: ACCENT_MUSTARD,
    bgDark: '#332913',
    path: '#',
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
      'Designed and led the implementation of a standardized CI/CD platform leveraging GitHub Actions and modular PowerShell tooling to automate provisioning, enforce deployment quality gates, and unify release workflows across warehouse systems.',
      'Developed and maintained a full-stack warehouse management feature, designing RESTful APIs and React-based front-end interfaces while integrating automated validation and continuous testing into deployment pipelines.',
      'Improved reliability and operational resilience of a 24/7 supply chain platform serving 1000+ users by reducing deployment pipelines from days to under an hour and strengthening release consistency across internal and third-party integrations.',
    ],
  },
  {
    company: 'BEI Services',
    roles: [{ title: 'Software Engineer', dates: 'Sep 2016 – Sep 2019' }],
    bullets: [
      'Designed and delivered full-stack web applications and RESTful APIs, owning database schema design, backend service development, and frontend implementation to support enterprise client workflows.',
      'Engineered scalable SQL solutions and third-party system integrations, improving data reliability and streamlining business operations for external partners.',
    ],
  },
];

function LineChartMotif() {
  return (
    <Box
      component="svg"
      viewBox="0 0 600 200"
      preserveAspectRatio="none"
      sx={{
        position: 'absolute',
        bottom: 0, left: 0,
        width: '100%', height: '55%',
        opacity: 0.35,
      }}
    >
      <polyline
        points="0,150 60,140 120,160 180,110 240,130 300,80 360,95 420,55 480,70 540,30 600,45"
        fill="none"
        stroke={ACCENT_BLUE}
        strokeWidth="2"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'draw-line 2.4s ease-out forwards' }}
      />
      <polyline
        points="0,180 60,170 120,175 180,150 240,155 300,120 360,130 420,100 480,105 540,75 600,60"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'draw-line 2.8s 0.3s ease-out forwards' }}
      />
    </Box>
  );
}

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BG_BASE, color: 'white' }}>
      <style>{`
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Nav */}
      <Box
        sx={{
          position: 'sticky', top: 0, zIndex: 10,
          borderBottom: '1px solid rgba(80,137,173,0.2)',
          bgcolor: 'rgba(21,42,66,0.9)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            JT
          </Typography>
          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {['Experience', 'Skills', 'Projects', 'Contact'].map((label) => (
              <Typography
                key={label}
                variant="body2"
                sx={{ color: 'rgba(169,171,174,0.85)', cursor: 'pointer', '&:hover': { color: 'white' } }}
                onClick={() => document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              >
                {label}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${SLATE} 55%, ${MAROON} 100%)`,
          py: { xs: 10, md: 16 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <LineChartMotif />
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}
          >
            Jeremy Terhaar
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, color: ACCENT, fontWeight: 600 }}>
            Software Engineer — DevOps &amp; Platform Engineering
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, color: 'rgba(169,171,174,0.8)', maxWidth: 560, mx: 'auto' }}>
            9+ years building and scaling high-availability systems for enterprise supply chain
            platforms — CI/CD frameworks, deployment automation, and infrastructure tooling that
            improve engineering velocity and reliability.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              sx={{ bgcolor: ACCENT, '&:hover': { bgcolor: '#832f2f' }, px: 4, fontWeight: 700 }}
              href="/resume.pdf"
              target="_blank"
            >
              Download Resume
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ borderColor: 'rgba(169,171,174,0.4)', color: 'white', px: 4, '&:hover': { borderColor: 'white', bgcolor: 'rgba(80,137,173,0.1)' } }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Experience */}
      <Container maxWidth="md" id="experience" sx={{ py: 10 }}>
        <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', color: ACCENT, mb: 1, letterSpacing: 3 }}>
          Experience
        </Typography>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
          Where I&apos;ve Worked
        </Typography>
        <Stack spacing={4}>
          {experience.map((job) => (
            <Card key={job.company} sx={{ bgcolor: BG_CARD, border: '1px solid rgba(80,137,173,0.18)', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48, height: 48, borderRadius: 2,
                      bgcolor: 'rgba(156,50,48,0.15)', border: `1px solid ${ACCENT}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT,
                      flexShrink: 0,
                    }}
                  >
                    <WorkIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{job.company}</Typography>
                    {job.roles.map((role) => (
                      <Typography key={role.title} variant="body2" sx={{ color: 'rgba(169,171,174,0.78)' }}>
                        {role.title} &middot; {role.dates}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Stack spacing={1} sx={{ pl: { xs: 0, md: 1 } }}>
                  {job.bullets.map((bullet, i) => (
                    <Typography key={i} variant="body2" sx={{ color: 'rgba(169,171,174,0.82)', lineHeight: 1.8 }}>
                      • {bullet}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ))}
          <Card sx={{ bgcolor: BG_CARD, border: '1px solid rgba(80,137,173,0.18)', borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 48, height: 48, borderRadius: 2,
                  bgcolor: 'rgba(80,137,173,0.15)', border: `1px solid ${ACCENT_BLUE}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT_BLUE,
                  flexShrink: 0,
                }}
              >
                <SchoolIcon />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>University of Minnesota, Twin Cities</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(169,171,174,0.78)' }}>
                  B.A., Computer Science &amp; German, Scandinavian and Dutch Studies &middot; 2016
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>

      {/* Skills */}
      <Container maxWidth="lg" id="skills" sx={{ py: 10 }}>
        <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', color: ACCENT, mb: 1, letterSpacing: 3 }}>
          Skills
        </Typography>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 700 }}>
          Technical Toolkit
        </Typography>
        <Grid container spacing={3}>
          {skillGroups.map((group) => (
            <Grid item xs={12} sm={6} key={group.label}>
              <Typography variant="subtitle2" sx={{ color: 'rgba(169,171,174,0.7)', mb: 1.5, letterSpacing: 1 }}>
                {group.label.toUpperCase()}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {group.items.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{
                      bgcolor: 'rgba(80,137,173,0.1)',
                      color: 'rgba(169,171,174,0.9)',
                      border: '1px solid rgba(80,137,173,0.3)',
                      '&:hover': { bgcolor: 'rgba(156,50,48,0.15)', borderColor: ACCENT },
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Projects */}
      <Box id="projects" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', color: ACCENT, mb: 1, letterSpacing: 3 }}>
            Projects
          </Typography>
          <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 700 }}>
            Featured Apps
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'rgba(169,171,174,0.7)', mb: 8 }}>
            A few things I&apos;ve built outside of work.
          </Typography>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} key={project.title}>
                <Card
                  component={project.status === 'live' ? 'a' : 'div'}
                  href={project.status === 'live' ? project.path : undefined}
                  sx={{
                    height: '100%',
                    bgcolor: BG_CARD,
                    border: '1px solid rgba(80,137,173,0.18)',
                    borderRadius: 3,
                    transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
                    textDecoration: 'none',
                    display: 'block',
                    ...(project.status === 'live' && {
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: `0 20px 40px rgba(0,0,0,0.4)`,
                        borderColor: project.color,
                      },
                    }),
                    ...(project.status === 'soon' && {
                      opacity: 0.7,
                      cursor: 'default',
                    }),
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box
                        sx={{
                          width: 60, height: 60,
                          borderRadius: 2,
                          bgcolor: project.bgDark,
                          border: `1px solid ${project.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: project.color,
                        }}
                      >
                        {project.icon}
                      </Box>
                      {project.status === 'live' ? (
                        <Chip
                          label="LIVE"
                          size="small"
                          sx={{ bgcolor: 'rgba(201,154,62,0.15)', color: ACCENT_MUSTARD, border: `1px solid ${ACCENT_MUSTARD}50`, fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      ) : (
                        <Chip
                          label="COMING SOON"
                          size="small"
                          sx={{ bgcolor: 'rgba(80,137,173,0.1)', color: 'rgba(169,171,174,0.45)', border: '1px solid rgba(80,137,173,0.3)', fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      )}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(169,171,174,0.78)', mb: 3, lineHeight: 1.7 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      {project.tags.map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            px: 1.5, py: 0.4,
                            borderRadius: 1,
                            bgcolor: `${project.color}15`,
                            border: `1px solid ${project.color}30`,
                            fontSize: '0.7rem',
                            color: project.color,
                            fontWeight: 600,
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Card sx={{ bgcolor: BG_CARD, border: '1px solid rgba(80,137,173,0.18)', borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: ACCENT, letterSpacing: 3 }}>
              About
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, mb: 3 }}>
              Focused on reliability, automation, and clean systems
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(169,171,174,0.8)', lineHeight: 1.9, mb: 2 }}>
              I&apos;m a software engineer based in Minneapolis, MN, specializing in DevOps and platform
              engineering — designing CI/CD frameworks, deployment automation, and infrastructure
              tooling that improve engineering velocity and system reliability.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(169,171,174,0.8)', lineHeight: 1.9 }}>
              Outside of work, I build full-stack side projects like a basketball league management
              platform and a handful of browser games — a way to keep learning and stay hands-on
              with new tools.
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Contact */}
      <Container maxWidth="md" id="contact" sx={{ py: 10 }}>
        <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', color: ACCENT, mb: 1, letterSpacing: 3 }}>
          Contact
        </Typography>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 5, fontWeight: 700 }}>
          Let&apos;s Connect
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            sx={{ borderColor: 'rgba(169,171,174,0.4)', color: 'white', px: 3, '&:hover': { borderColor: ACCENT, bgcolor: 'rgba(156,50,48,0.12)' } }}
            href={`mailto:${CONTACT.email}`}
          >
            Email
          </Button>
          <Button
            variant="outlined"
            startIcon={<LinkedInIcon />}
            sx={{ borderColor: 'rgba(169,171,174,0.4)', color: 'white', px: 3, '&:hover': { borderColor: ACCENT_BLUE, bgcolor: 'rgba(80,137,173,0.12)' } }}
            href={CONTACT.linkedin}
            target="_blank"
          >
            LinkedIn
          </Button>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={{ borderColor: 'rgba(169,171,174,0.4)', color: 'white', px: 3, '&:hover': { borderColor: 'white', bgcolor: 'rgba(80,137,173,0.1)' } }}
            href={CONTACT.github}
            target="_blank"
          >
            GitHub
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Divider sx={{ borderColor: 'rgba(80,137,173,0.18)' }} />
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(169,171,174,0.4)' }}>
          © {new Date().getFullYear()} Jeremy Terhaar
        </Typography>
      </Box>
    </Box>
  );
}

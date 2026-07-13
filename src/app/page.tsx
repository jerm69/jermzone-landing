'use client';

import { useEffect } from 'react';
import {
  Box, Container, Typography, Button, Card, CardContent,
  Grid, Avatar, Chip
} from '@mui/material';
import {
  SportsBasketball as BasketballIcon,
  SportsEsports as GamesIcon,
  FlightTakeoff as FlightIcon,
  Dashboard as DashboardIcon,
  GitHub as GitHubIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

function setFavicon(icon: string) {
  const svg = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>`;
  let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = svg;
}

const projects = [
  {
    title: 'WULv2 Basketball League',
    description:
      'Full-stack basketball league management system — team rosters, game scheduling, standings, community forums, and multi-tenant league support.',
    icon: <BasketballIcon sx={{ fontSize: 40 }} />,
    color: '#e94560',
    bgDark: '#2a0a10',
    path: 'http://192.168.1.111/app',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    status: 'live' as const,
  },
  {
    title: 'JERMZONE Games',
    description:
      'Classic browser games with smart AI opponents — Minesweeper, Tic-Tac-Toe, and Checkers, each with multiple difficulty levels.',
    icon: <GamesIcon sx={{ fontSize: 40 }} />,
    color: '#00b4d8',
    bgDark: '#001a2e',
    path: 'http://192.168.1.111/games',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Minimax AI'],
    status: 'live' as const,
  },
  {
    title: 'FlightRadar Live',
    description:
      'Real-time flight tracking integration pulling live ADS-B data — map visualisation, aircraft info panels, and flight history.',
    icon: <FlightIcon sx={{ fontSize: 40 }} />,
    color: '#06d6a0',
    bgDark: '#001a14',
    path: '#',
    tags: ['ADS-B', 'Maps', 'Real-time', 'API'],
    status: 'soon' as const,
  },
  {
    title: 'Dev Dashboard',
    description:
      'Personal engineering dashboard — Pi stats, PM2 process health, server metrics, and quick-launch links for all JERMZONE apps.',
    icon: <DashboardIcon sx={{ fontSize: 40 }} />,
    color: '#f4a261',
    bgDark: '#1a0e00',
    path: '#',
    tags: ['Monitoring', 'Pi', 'PM2', 'Node.js'],
    status: 'soon' as const,
  },
];

const skills = [
  'React / Next.js', 'Node.js / Express', 'PostgreSQL / Prisma',
  'TypeScript', 'Material-UI', 'Tailwind CSS', 'REST APIs', 'Nginx / PM2',
];

export default function LandingPage() {
  useEffect(() => {
    document.title = 'JERMZONE';
    setFavicon('💀');
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d0d1a', color: 'white' }}>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          py: { xs: 12, md: 18 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(ellipse at center, rgba(233,69,96,0.15) 0%, transparent 70%)',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Avatar
            sx={{
              width: 110, height: 110,
              margin: '0 auto 2rem',
              fontSize: 64,
              bgcolor: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(233,69,96,0.5)',
            }}
          >
            💀
          </Avatar>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}
          >
            JERMZONE
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, color: '#e94560', fontWeight: 600 }}>
            Software &amp; Engineering Projects
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, color: 'rgba(255,255,255,0.6)', maxWidth: 480, mx: 'auto' }}>
            A collection of self-hosted apps running on a Raspberry Pi — built for fun, learning, and real use.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: '#e94560', '&:hover': { bgcolor: '#c73652' }, px: 4, fontWeight: 700 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', px: 4, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' } }}
              href="https://github.com"
              target="_blank"
            >
              GitHub
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Skills */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', color: '#e94560', mb: 3, letterSpacing: 3 }}>
          Tech Stack
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              icon={<CodeIcon />}
              sx={{
                bgcolor: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(233,69,96,0.1)', borderColor: '#e94560' },
                transition: 'all 0.2s',
              }}
            />
          ))}
        </Box>
      </Container>

      {/* Projects */}
      <Box id="projects" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', color: '#e94560', mb: 1, letterSpacing: 3 }}>
            Projects
          </Typography>
          <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 700 }}>
            Featured Apps
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', mb: 8 }}>
            Everything self-hosted on a Raspberry Pi 4 — because the cloud is just someone else&apos;s computer.
          </Typography>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} key={project.title}>
                <Card
                  component={project.status === 'live' ? 'a' : 'div'}
                  href={project.status === 'live' ? project.path : undefined}
                  sx={{
                    height: '100%',
                    bgcolor: '#13132b',
                    border: '1px solid rgba(255,255,255,0.07)',
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
                          sx={{ bgcolor: 'rgba(0,255,100,0.1)', color: '#00ff64', border: '1px solid rgba(0,255,100,0.3)', fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      ) : (
                        <Chip
                          label="COMING SOON"
                          size="small"
                          sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      )}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)', mb: 3, lineHeight: 1.7 }}>
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
        <Card sx={{ bgcolor: '#13132b', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ color: '#e94560', letterSpacing: 3 }}>
              About
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, mb: 3 }}>
              Building stuff for fun (and occasional profit)
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9, mb: 2 }}>
              Everything here runs on a Raspberry Pi 4 on my local network — Node.js backends, Next.js frontends,
              PostgreSQL databases, and Nginx tying it all together. No cloud bills, no vendor lock-in.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
              The WULv2 league app handles real basketball league data with multi-tenant schemas.
              The games app is a playground for AI algorithms. More projects on the way.
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', py: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)' }}>
          © {new Date().getFullYear()} JERMZONE — Self-hosted on a Raspberry Pi 4
        </Typography>
      </Box>
    </Box>
  );
}

module.exports = {
  apps: [
    {
      name: 'jermzone-landing',
      cwd: '/home/jt/jermzone-landing',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/jt/.pm2/logs/jermzone-landing-error.log',
      out_file: '/home/jt/.pm2/logs/jermzone-landing-out.log',
      merge_logs: true,
    },
  ],
};

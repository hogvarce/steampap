module.exports = {
  apps : [
      {
        name: 'build-server',
        script: 'webpack',
        args: '--config webpack.server.js --watch',
        instances: 1,
        autorestart: true,
        watch: true,
        wait_ready: true,
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      },
      {
          name: 'build-client',
          script: 'webpack',
          args: '--config webpack.client.js --watch',
          instances: 1,
          autorestart: true,
          wait_ready: true,
          watch: true,
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },
      {
          name: 'run-server',
          script: 'nodemon',
          args: '--watch build --exec "node build/server.js"',
          instances: 1,
          autorestart: true,
          watch: true,
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },
  ],
};

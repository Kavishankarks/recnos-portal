/**
 * pm2 process definition for the RECNOS portal.
 *
 * Why this file exists: the app is built with `output: "standalone"` in
 * next.config.ts. Running `next start` against a standalone build makes Next
 * warn on every boot that the two are incompatible, so the process runs the
 * standalone server directly.
 *
 * PORT is set explicitly. The standalone server defaults to 3000 when PORT is
 * absent, and port 3000 belongs to the separate `mrads` app — omitting this
 * would cause the two to fight over the port.
 *
 * The build step must also copy .next/static and public into the standalone
 * directory; Next does not do that itself. See .deploy/deploy.sh, which does
 * both the copy and the restart.
 */
module.exports = {
  apps: [
    {
      name: "recnos-portal",
      cwd: "/root/recnos-portal",
      script: ".next/standalone/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        HOSTNAME: "127.0.0.1",
      },
      // Restart if the process leaks past 512M rather than letting the VPS swap.
      max_memory_restart: "512M",
      autorestart: true,
      watch: false,
    },
  ],
};

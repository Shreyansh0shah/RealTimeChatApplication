module.exports = {
  apps: [
    {
      name: "chat-backend",
      script: "server.js",

      instances: "max",        // use all CPU cores
      exec_mode: "cluster",    // enable load balancing

      watch: false,

      max_memory_restart: "300M",

      env: {
        NODE_ENV: "development",
        PORT: 5001
      },

      time: true,

      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true
    }
  ]
};

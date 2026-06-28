module.exports = {
  "apps": [{
    "name": "MarqueeServer",
    "script": "/var/www/marquee/server/dist/index.js",
    "env": {
      "NODE_ENV": "production",
      "PORT": 3224
    },
    "instances": "1",
    "exec_mode": "fork",
    "cwd": "/var/www/marquee/server"
  }]
}

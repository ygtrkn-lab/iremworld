const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

// Next.js app'i initialize et
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

console.log(`🚀 İremWorld Server başlatılıyor...`)
console.log(`📊 Environment: ${process.env.NODE_ENV}`)
console.log(`🗄️ Database: ${process.env.DB_NAME}`)

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // URL'i parse et
      const parsedUrl = parse(req.url, true)
      
      // Request'i handle et
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('❌ Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal server error')
    }
  })
  .once('error', (err) => {
    console.error('❌ Server error:', err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`✅ İremWorld Server hazır: http://${hostname}:${port}`)
    console.log(`🌐 Production URL: https://optinumguvenlik.com/iremworld`)
    console.log(`📁 Sabit Veritabanı: iremworld_db.nb3`)
  })
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🔄 SIGINT received, shutting down gracefully')
  process.exit(0)
})

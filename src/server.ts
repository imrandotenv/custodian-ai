import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/db.js";

const server = app.listen(env.PORT, () => {
  console.log(`
  ╭──────────────────────────────────────────────────────────╮
  │                                                          │
  │   🌿 CUSTODIAN-AI REST API SANCTUARY IS LIVE            │
  │                                                          │
  │   📡 Port:          http://localhost:${env.PORT}                │
  │   🩺 Health Check:  http://localhost:${env.PORT}/api/v1/health   │
  │   🎨 Frontend CORS: ${env.FRONTEND_URL}                  │
  │   🌱 Environment:   ${env.NODE_ENV}                          │
  │                                                          │
  ╰──────────────────────────────────────────────────────────╯
  `);
});

// Graceful Shutdown
async function gracefulShutdown(signal: string) {
  console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);

  server.close(async () => {
    console.log("🔒 HTTP server closed.");
    try {
      await prisma.$disconnect();
      console.log("💾 Database connection terminated.");
      process.exit(0);
    } catch (err) {
      console.error("❌ Error during database disconnect:", err);
      process.exit(1);
    }
  });

  // Force close if graceful shutdown hangs
  setTimeout(() => {
    console.error("⚠️ Forcing shutdown after 10s timeout.");
    process.exit(1);
  }, 10000);
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

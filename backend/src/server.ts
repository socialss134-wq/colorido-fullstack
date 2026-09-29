import { app } from './app';
import { env } from './config/env';
import { prisma } from './config/db';
const server=app.listen(env.PORT,()=>console.log(`COLORIDO API running at http://localhost:${env.PORT}`));
async function shutdown(){server.close(async()=>{await prisma.$disconnect();process.exit(0)});}
process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);

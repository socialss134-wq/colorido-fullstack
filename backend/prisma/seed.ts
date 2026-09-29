import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import events from '../src/seedData/events.json';
import schedule from '../src/seedData/schedule.json';
import announcements from '../src/seedData/announcements.json';
import results from '../src/seedData/results.json';
import sponsors from '../src/seedData/sponsors.json';
import gallery from '../src/seedData/gallery.json';
import { env } from '../src/config/env';

const prisma=new PrismaClient();
const pos:any={'1st':'first','2nd':'second','3rd':'third'};

async function main(){
  const passwordHash=await bcrypt.hash(env.ADMIN_PASSWORD,12);
  await prisma.admin.upsert({where:{email:env.ADMIN_EMAIL},update:{passwordHash},create:{email:env.ADMIN_EMAIL,passwordHash,name:'COLORIDO Administrator'}});
  for(const e0 of events as any[]) {
    const e={...e0,status:e0.status==='filling-fast'?'filling_fast':e0.status};
    await prisma.event.upsert({where:{id:e.id},update:e as any,create:e as any});
  }
  for(const a of announcements as any[]) await prisma.announcement.upsert({where:{id:a.id},update:{...a,category:a.category,priority:a.priority},create:{...a,category:a.category,priority:a.priority}});
  for(const r of results as any[]) {
    const x={...r,position:pos[r.position]};
    await prisma.result.upsert({where:{id:r.id},update:x,create:x});
  }
  for(const s of schedule as any[]) await prisma.scheduleItem.upsert({where:{id:s.id},update:s as any,create:s as any});
  for(const s of sponsors as any[]) await prisma.sponsor.upsert({where:{id:s.id},update:s as any,create:s as any});
  for(const g of gallery as any[]) await prisma.galleryImage.upsert({where:{id:g.id},update:g as any,create:g as any});
  console.log(`Seeded ${events.length} events, ${schedule.length} schedule items, ${announcements.length} announcements, ${results.length} results, ${sponsors.length} sponsors, ${gallery.length} gallery images.`);
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());

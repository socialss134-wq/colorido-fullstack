import { prisma } from '../config/db';
import { ok, fail } from '../utils/http';
import { registrationSchema, contactSchema } from '../schemas/public';
import { nextRegistrationId } from '../utils/registrationId';
import { env } from '../config/env';

export async function health(_req:any,res:any) { return ok(res,{status:'healthy',service:'colorido2k26-api',timestamp:new Date().toISOString()}); }

const eventSelect = {
  id:true,name:true,category:true,subCategory:true,type:true,gender:true,description:true,date:true,time:true,venue:true,
  eligibility:true,teamSize:true,registrationFee:true,registrationDeadline:true,rules:true,importantInstructions:true,
  contactPerson:true,contactNumber:true,status:true,featured:true,image:true
} as const;

function eventOut(e:any) {
  return {...e, status:e.status==='filling_fast'?'filling-fast':e.status,
    rules: Array.isArray(e.rules)?e.rules:[], importantInstructions:Array.isArray(e.importantInstructions)?e.importantInstructions:[]};
}
function resultOut(r:any) {
  const position:any={first:'1st',second:'2nd',third:'3rd'};
  return {...r,position:position[r.position]||r.position};
}

export async function getEvents(req:any,res:any) {
  const where:any = {};
  if (req.query.category === 'Cultural' || req.query.category === 'Sports') where.category=req.query.category;
  const rows=await prisma.event.findMany({where,select:eventSelect,orderBy:{date:'asc'}});
  return ok(res,rows.map(eventOut));
}
export async function getEvent(req:any,res:any) {
  const e=await prisma.event.findUnique({where:{id:req.params.id},select:eventSelect});
  return e ? ok(res,eventOut(e)) : fail(res,'Event not found','NOT_FOUND',404);
}
export async function getFeatured(_req:any,res:any) {
  const rows=await prisma.event.findMany({where:{featured:true},select:eventSelect,orderBy:{date:'asc'}});
  return ok(res,rows.map(eventOut));
}
export async function getAnnouncements(req:any,res:any) {
  const where:any={published:true};
  const rows=await prisma.announcement.findMany({where,orderBy:{date:'desc'}});
  const limit=Number(req.query.limit);
  return ok(res,Number.isFinite(limit)&&limit>0?rows.slice(0,limit):rows);
}
export async function getResults(req:any,res:any) {
  const rows=await prisma.result.findMany({where:{status:'published'},orderBy:{createdAt:'desc'}});
  const limit=Number(req.query.limit);
  return ok(res,(Number.isFinite(limit)&&limit>0?rows.slice(0,limit):rows).map(resultOut));
}
export async function getSchedule(_req:any,res:any) { return ok(res,await prisma.scheduleItem.findMany({orderBy:[{date:'asc'},{time:'asc'}]})); }
export async function getSponsors(_req:any,res:any) { return ok(res,await prisma.sponsor.findMany({orderBy:{createdAt:'asc'}})); }
export async function getGallery(_req:any,res:any) { return ok(res,await prisma.galleryImage.findMany({orderBy:{createdAt:'asc'}})); }

export async function createContact(req:any,res:any) {
  const parsed=contactSchema.safeParse(req.body); if(!parsed.success) return fail(res,parsed.error.issues[0]?.message || 'Invalid contact data');
  await prisma.contactMessage.create({data:parsed.data});
  return ok(res,{success:true,message:'Your message has been received. We will get back to you soon!'},201);
}

export async function createRegistration(req:any,res:any) {
  const parsed=registrationSchema.safeParse(req.body);
  if(!parsed.success) return fail(res,parsed.error.issues[0]?.message || 'Invalid registration data','VALIDATION_ERROR',422);
  const data=parsed.data;
  const event=await prisma.event.findUnique({where:{id:data.eventId}});
  if(!event) return fail(res,'Selected event does not exist','EVENT_NOT_FOUND',404);
  if(event.status==='closed') return fail(res,'Registration for this event is closed','REGISTRATION_CLOSED',409);
  if(env.ENFORCE_DEADLINE==='true' && new Date(event.registrationDeadline).getTime() < Date.now()) return fail(res,'Registration deadline has passed','DEADLINE_PASSED',409);
  if(event.category!==data.eventCategory) return fail(res,'Event category does not match the selected event','EVENT_MISMATCH',400);

  const needsTeam=event.type==='Group'||event.type==='Team';
  const members=data.teamMembers ?? [];
  if(needsTeam) {
    if(!data.teamName) return fail(res,'Team name is required for this event','TEAM_REQUIRED',422);
    if(event.teamSize>1 && members.length !== event.teamSize-1) return fail(res,`This event requires ${event.teamSize} total participants. Add ${event.teamSize-1} team member(s).`,'TEAM_SIZE_INVALID',422);
  } else if(members.length) return fail(res,'Team members are not allowed for this event','TEAM_NOT_ALLOWED',422);

  const result=await prisma.$transaction(async tx=>{
    let participant=await tx.participant.findFirst({where:{email:data.email.toLowerCase(),phone:data.phone}});
    if(!participant) participant=await tx.participant.create({data:{
      participantName:data.participantName,email:data.email.toLowerCase(),phone:data.phone,college:data.college,year:data.year,
      department:data.department,gender:data.gender,address:data.address,emergencyContact:data.emergencyContact
    }});
    const existing=await tx.registration.findFirst({where:{participantId:participant.id,eventId:event.id}});
    if(existing) throw Object.assign(new Error('Already registered for this event'),{code:'ALREADY_REGISTERED'});
    const registrationId=await nextRegistrationId(tx as any);
    const registration=await tx.registration.create({data:{
      registrationId,participantId:participant.id,eventId:event.id,eventName:event.name,eventCategory:event.category,
      eventType:event.type,teamName:data.teamName,termsAccepted:true,status:'confirmed',
      teamMembers:{create:members.map(m=>({name:m.name,email:m.email.toLowerCase(),phone:m.phone}))}
    },include:{participant:true}});
    return registration;
  });
  return ok(res,{registrationId:result.registrationId,participantName:result.participant.participantName,eventName:event.name,status:'confirmed',
    instructions:['Bring a valid college ID card to the event','Report 30 minutes before the scheduled time','Check the Announcements page for updates','Keep your registration ID handy for verification']},201);
}

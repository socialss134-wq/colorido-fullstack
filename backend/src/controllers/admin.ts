import { prisma } from '../config/db';
import { ok, fail } from '../utils/http';
import type { AuthRequest } from '../middleware/auth';

const models:any={events:prisma.event,announcements:prisma.announcement,results:prisma.result,schedule:prisma.scheduleItem,sponsors:prisma.sponsor,gallery:prisma.galleryImage};

export async function dashboard(_req:AuthRequest,res:any){
  const [events,registrations,announcements,results,messages]=await Promise.all([
    prisma.event.count(),prisma.registration.count(),prisma.announcement.count(),prisma.result.count(),prisma.contactMessage.count({where:{read:false}})
  ]);
  return ok(res,{events,registrations,announcements,results,unreadMessages:messages});
}
export async function registrations(req:AuthRequest,res:any){
  const rows=await prisma.registration.findMany({include:{participant:true,teamMembers:true,event:{select:{id:true,name:true,category:true,type:true}}},orderBy:{createdAt:'desc'}});
  return ok(res,rows);
}
export async function registrationById(req:AuthRequest,res:any){
  const row=await prisma.registration.findUnique({where:{id:req.params.id},include:{participant:true,teamMembers:true,event:true}});
  return row?ok(res,row):fail(res,'Registration not found','NOT_FOUND',404);
}
export async function updateRegistrationStatus(req:AuthRequest,res:any){
  const status=req.body?.status;
  if(!['confirmed','pending','cancelled'].includes(status)) return fail(res,'Invalid registration status','VALIDATION_ERROR',422);
  const row=await prisma.registration.update({where:{id:req.params.id},data:{status}});
  return ok(res,row);
}

function model(name:string){return models[name];}
function clean(name:string,data:any){
  const d={...data};
  if(name==='events'){
    if(Array.isArray(d.rules)) d.rules=d.rules;
    if(Array.isArray(d.importantInstructions)) d.importantInstructions=d.importantInstructions;
  }
  return d;
}
export async function listResource(req:AuthRequest,res:any){const m=model(req.params.resource);if(!m)return fail(res,'Unknown resource','NOT_FOUND',404);return ok(res,await m.findMany({orderBy:{createdAt:'desc'}}));}
export async function createResource(req:AuthRequest,res:any){const m=model(req.params.resource);if(!m)return fail(res,'Unknown resource','NOT_FOUND',404);return ok(res,await m.create({data:clean(req.params.resource,req.body)}),201);}
export async function updateResource(req:AuthRequest,res:any){const m=model(req.params.resource);if(!m)return fail(res,'Unknown resource','NOT_FOUND',404);return ok(res,await m.update({where:{id:req.params.id},data:clean(req.params.resource,req.body)}));}
export async function deleteResource(req:AuthRequest,res:any){const m=model(req.params.resource);if(!m)return fail(res,'Unknown resource','NOT_FOUND',404);await m.delete({where:{id:req.params.id}});return ok(res,{deleted:true});}

export async function exportRegistrations(req:AuthRequest,res:any){
  const rows=await prisma.registration.findMany({include:{participant:true,event:true,teamMembers:true},orderBy:{createdAt:'asc'}});
  const header=['registrationId','participantName','email','phone','college','year','department','gender','event','category','eventType','teamName','status','createdAt'];
  const esc=(v:any)=>`"${String(v??'').replace(/"/g,'""')}"`;
  const lines=[header.join(','),...rows.map(r=>[
    r.registrationId,r.participant.participantName,r.participant.email,r.participant.phone,r.participant.college,r.participant.year,
    r.participant.department,r.participant.gender,r.event.name,r.event.category,r.eventType,r.teamName,r.status,r.createdAt.toISOString()
  ].map(esc).join(','))];
  res.setHeader('Content-Type','text/csv');res.setHeader('Content-Disposition','attachment; filename="colorido-registrations.csv"');return res.send(lines.join('\n'));
}

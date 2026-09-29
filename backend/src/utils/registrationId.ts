import { prisma } from '../config/db';

export async function nextRegistrationId(tx: typeof prisma = prisma) {
  const latest = await tx.registration.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { registrationId: true },
  });
  const n = latest ? Number(latest.registrationId.replace('CLD-', '')) + 1 : 1;
  return `CLD-${String(n).padStart(6, '0')}`;
}

import { prisma } from "../config/prisma";

export const createAuditLog = async (
  event: string,
  entityId: string,
  data: any,
) => {
  await prisma.auditLog.create({
    data: {
      event,
      entityId,
      data,
    },
  });
};

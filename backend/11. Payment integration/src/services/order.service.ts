import { prisma } from "../config/prisma";
import { createAuditLog } from "./audit.service";

export const createOrder = async (amount: number) => {
  const order = await prisma.order.create({
    data: { amount },
  });

  await createAuditLog("ORDER_CREATED", order.id, order);

  return order;
};

export const getOrder = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
  });
};

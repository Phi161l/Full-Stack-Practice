import { prisma } from "../config/prisma";

export const createOrder = async (amount: number) => {
  return prisma.order.create({
    data: {
      amount,
    },
  });
};

export const getOrder = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
  });
};
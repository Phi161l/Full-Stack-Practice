// services/booking.service.ts
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

export async function createBooking({
  guestId,
  roomId,
  checkIn,
  checkOut,
  staffId
}: {
  guestId: string
  roomId: string
  checkIn: Date
  checkOut: Date
  staffId: string
}) {

  // ❗ 1. Validate dates
  if (checkOut <= checkIn) {
    throw new Error("Check-out must be after check-in")
  }

  // ❗ 2. Check for conflicts
  const conflict = await prisma.booking.findFirst({
    where: {
      roomId,
      status: {
        in: ["PENDING", "CONFIRMED", "CHECKED_IN"]
      },
      AND: [
        { checkIn: { lt: checkOut } },
        { checkOut: { gt: checkIn } }
      ]
    }
  })

  if (conflict) {
    throw new Error("Room is already booked for these dates")
  }

  // ✅ 3. Create booking
  return prisma.booking.create({
    data: {
      guestId,
      roomId,
      createdById: staffId,
      checkIn,
      checkOut,
      status: "CONFIRMED"
    }
  })
}








export async function checkIn(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId }
  })

  if (!booking) throw new Error("Booking not found")

  if (booking.status !== "CONFIRMED") {
    throw new Error("Only confirmed bookings can be checked in")
  }

  return prisma.$transaction([
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CHECKED_IN" }
    }),
    prisma.room.update({
      where: { id: booking.roomId },
      data: { status: "OCCUPIED" }
    })
  ])
}








export async function checkOut(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId }
  })

  if (!booking) throw new Error("Booking not found")

  if (booking.status !== "CHECKED_IN") {
    throw new Error("Guest is not checked in")
  }

  return prisma.$transaction([
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CHECKED_OUT" }
    }),
    prisma.room.update({
      where: { id: booking.roomId },
      data: { status: "AVAILABLE" }
    })
  ])
}






export async function walkInBooking(data) {
  const booking = await createBooking(data)

  return checkIn(booking.id)
}
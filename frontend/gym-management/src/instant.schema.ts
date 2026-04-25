import { i } from '@instantdb/react';

const schema = i.schema({
  entities: {
    members: i.entity({
      name: i.string().indexed(),
      phone: i.string().unique().indexed(),
      joinDate: i.date(),
    }),

    memberships: i.entity({
      startDate: i.date(),
      endDate: i.date(),
      status: i.string(),        // ACTIVE, EXPIRED, CANCELLED
      createdAt: i.date(),
    }),
  },

  links: {
    memberMemberships: {
      forward: {
        on: 'members',
        has: 'many',
        label: 'memberships',
      },
      reverse: {
        on: 'memberships',
        has: 'one',
        label: 'member',
      },
    },
  },
});

export default schema;

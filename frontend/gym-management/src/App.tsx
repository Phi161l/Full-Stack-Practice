import { useState } from 'react';
import { init, id } from '@instantdb/react';
import schema from './instant.schema';

const db = init({
  appId: import.meta.env.VITE_INSTANT_APP_ID!,
  schema,
});

function GymApp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Real-time query: Get all members with their memberships
  const { data, isLoading } = db.useQuery({
    members: {
      memberships: {},
    },
  });

  const members = data?.members || [];

  const registerNewMember = async () => {
    if (!name || !phone) return alert("Name and phone are required!");

    const memberId = id();
    const membershipId = id();

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    db.transact([
      db.tx.members[memberId].update({
        name: name.trim(),
        phone: phone.trim(),
        joinDate: startDate,
      }),
      db.tx.memberships[membershipId].update({
        startDate,
        endDate,
        status: 'ACTIVE',
        createdAt: startDate,
      }).link({ member: memberId }),
    ]);

    setName('');
    setPhone('');
  };

  const renewMembership = (membershipId: string) => {
    const newEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    db.transact(
      db.tx.memberships[membershipId].update({
        endDate: newEndDate,
        status: 'ACTIVE',
      })
    );
  };

  const cancelMembership = (membershipId: string) => {
    db.transact(
      db.tx.memberships[membershipId].update({ status: 'CANCELLED' })
    );
  };

  if (isLoading) return <p style={{ textAlign: 'center' }}>Loading gym data...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>🏋️‍♂️ Gym Membership Management</h1>

      {/* Register Form */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Register New Member</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button onClick={registerNewMember} style={{ padding: '8px 16px' }}>
          Register + Start 30-day Membership
        </button>
      </div>

      {/* Members List */}
      <h2>All Members ({members.length})</h2>
      {members.length === 0 && <p>No members yet. Register the first one above.</p>}

      {members.map((member: any) => (
        <div key={member.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
          <strong>{member.name}</strong> — 📱 {member.phone}
          <br />
          Joined: {new Date(member.joinDate).toLocaleDateString()}

          <div style={{ marginTop: '10px' }}>
            {member.memberships?.map((mem: any) => (
              <div key={mem.id} style={{ marginTop: '8px', padding: '8px', background: '#f9f9f9' }}>
                Membership: {new Date(mem.startDate).toLocaleDateString()} → 
                {new Date(mem.endDate).toLocaleDateString()}
                <span style={{ 
                  marginLeft: '10px',
                  color: mem.status === 'ACTIVE' ? 'green' : 'red',
                  fontWeight: 'bold'
                }}>
                  ({mem.status})
                </span>

                {mem.status === 'ACTIVE' && (
                  <>
                    <button onClick={() => renewMembership(mem.id)} style={{ marginLeft: '10px' }}>
                      Renew (30 days)
                    </button>
                    <button onClick={() => cancelMembership(mem.id)} style={{ marginLeft: '8px', color: 'red' }}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GymApp;
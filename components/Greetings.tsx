'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

function Greetings() {
  const { data: session } = useSession();
  return (
    <h2 className="text-2xl font-bold tracking-tight">
      Hi {session?.user.name?.split(' ')[0]}, Welcome back 👋
    </h2>
  );
}

export default Greetings;

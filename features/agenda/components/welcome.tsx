'use client';

import { useAccount } from '@/context/AgendaContext';

export default function Welcome() {
    const account = useAccount();

    return (
        <div>
            <h1>Welcome</h1>
        </div>
    )
}
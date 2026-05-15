"use client";

import { useState } from "react"

type User = {
  id: number;
  name: string;
};

type CounterProps = {
    users: User[]
}

export default function Counter({users} : CounterProps) {
    const [count, setCount] = useState(0)

    return (
    <div>
        <p>Total users: {users.length}</p>
        <button onClick={() => setCount((c) => c+ 1)}>
            {count}
        </button>
    </div>
)
}

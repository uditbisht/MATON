import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Simulating DB storage
        console.log(`New Subscription: ${email}`);

        return NextResponse.json(
            { message: 'You’re now part of the MATON Matcha community.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}

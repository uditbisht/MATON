import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    const supabase = await createClient();
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('contact_submissions')
            .insert([
                { name, email, message },
            ]);

        if (error) {
            console.error('Supabase error:', error);
            throw new Error('Failed to save contact submission');
        }

        return NextResponse.json(
            { message: 'Thank you for contacting us. We will get back to you shortly.' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}

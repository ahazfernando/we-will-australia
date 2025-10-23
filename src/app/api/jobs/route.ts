import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = process.env.RECIPIENT_EMAIL;
const fromEmail = 'Team WWA <careers@wewillaustralia.com.au>';

export async function POST(request: Request) {
    if (!recipientEmail) {
        return NextResponse.json(
            { error: 'Recipient email is not configured.' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const {
            jobTitle,
            companyName,
            jobType,
            experienceLevel,
            salaryRange,
            location,
            jobDescription
        } = body;

        // Validate required fields
        if (!jobTitle || !companyName || !jobDescription) {
            return NextResponse.json(
                { error: 'Job title, company name, and job description are required.' },
                { status: 400 }
            );
        }

        // Save job to Firebase
        const jobData = {
            title: jobTitle,
            company: companyName,
            type: jobType || 'Not specified',
            experienceLevel: experienceLevel || 'Not specified',
            salaryRange: salaryRange || 'Not specified',
            location: location || 'Not specified',
            description: jobDescription,
            postedTime: serverTimestamp(),
            status: 'active',
            applications: 0
        };

        const docRef = await addDoc(collection(db, 'listings'), jobData);

        // Send notification email to admin
        const { error: emailError } = await resend.emails.send({
            from: fromEmail,
            to: [recipientEmail],
            subject: `New Job Posted: ${jobTitle} at ${companyName}`,
            html: `
                <h1>New Job Posted</h1>
                <p><strong>Job Title:</strong> ${jobTitle}</p>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Location:</strong> ${location || 'Not specified'}</p>
                <p><strong>Job Type:</strong> ${jobType || 'Not specified'}</p>
                <p><strong>Experience Level:</strong> ${experienceLevel || 'Not specified'}</p>
                <p><strong>Salary Range:</strong> ${salaryRange || 'Not specified'}</p>
                <hr style="border-top: 1px solid #ccc; margin: 20px 0;">
                <h2>Job Description:</h2>
                <p style="white-space: pre-wrap;">${jobDescription}</p>
                <hr style="border-top: 1px solid #ccc; margin: 20px 0;">
                <p><strong>Job ID:</strong> ${docRef.id}</p>
                <p><em>This job has been automatically posted to the job board.</em></p>
            `,
        });

        if (emailError) {
            console.error('Failed to send notification email:', emailError);
            // Don't fail the request if email fails, job was still saved
        }

        return NextResponse.json({ 
            message: 'Job posted successfully!', 
            jobId: docRef.id 
        }, { status: 200 });

    } catch (error: any) {
        console.error('API Route Error:', error);
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred.' 
        }, { status: 500 });
    }
}

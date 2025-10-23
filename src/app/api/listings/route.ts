import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Fetch the recipient email from environment variables for security
const recipientEmail = process.env.RECIPIENT_EMAIL;

// Define the "from" address. This domain must be verified in your Resend account.
const fromEmail = 'Team WWA <careers@wewillaustralia.com.au>';

export async function POST(request: Request) {
    // First, check if the recipient email address is configured in your environment
    if (!recipientEmail) {
        console.error('Recipient email is not configured in environment variables.');
        return NextResponse.json(
            { error: 'Server configuration error: Recipient email is not set.' },
            { status: 500 }
        );
    }

    try {
        // Parse the incoming form data from the request
        const formData = await request.formData();
        const resume = formData.get('resume') as File | null;

        // Extract all other form fields
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const address = formData.get('address') as string;
        const phone = formData.get('phone') as string;
        const linkedin = formData.get('linkedin') as string;
        const coverletter = formData.get('coverletter') as string;
        const jobTitle = formData.get('jobTitle') as string;

        // Validate that the resume file was included
        if (!resume) {
            return NextResponse.json({ error: 'Resume file is required.' }, { status: 400 });
        }

        // Convert the resume file into a Buffer to be sent as an attachment
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());

        // --- Step 1: Send the application email to the company ---
        const { data: companyEmailData, error: companyEmailError } = await resend.emails.send({
            from: fromEmail,
            to: [recipientEmail],
            subject: `New Application for ${jobTitle}: ${firstName} ${lastName}`,
            html: `
              <h1>New Job Application</h1>
              <p><strong>Position:</strong> ${jobTitle}</p>
              <hr style="border-top: 1px solid #ccc; margin: 20px 0;">
              <h2>Applicant Details:</h2>
              <ul>
                <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
                <li><strong>Address:</strong> ${address || 'N/A'}</li>
                <li><strong>LinkedIn:</strong> ${linkedin ? `<a href="${linkedin}" target="_blank">${linkedin}</a>` : 'N/A'}</li>
              </ul>
              <hr style="border-top: 1px solid #ccc; margin: 20px 0;">
              <h2>Cover Letter:</h2>
              <p style="white-space: pre-wrap;">${coverletter}</p>
            `,
            attachments: [
                {
                    filename: resume.name,
                    content: resumeBuffer,
                },
            ],
        });

        // If there was an error sending the email to the company, stop and return an error
        if (companyEmailError) {
            console.error('Resend Error (Company Email):', companyEmailError);
            return NextResponse.json({ error: 'Failed to send application email.' }, { status: 500 });
        }

        // --- Step 2: Send a confirmation email to the applicant ---
        const { error: applicantEmailError } = await resend.emails.send({
            from: fromEmail,
            to: [email], // Send to the applicant's email address
            subject: `We've Received Your Application for ${jobTitle}`,
            html: `
              <h1>Thank You for Applying!</h1>
              <p>Hi ${firstName},</p>
              <p>This is a confirmation that we have successfully received your application for the <strong>${jobTitle}</strong> position at Wewill Australia.</p>
              <p>We are currently reviewing applications and will get in touch with you if your qualifications match our needs.</p>
              <br>
              <p>Best regards,</p>
              <p><strong>The Wewill Australia Team</strong></p>
            `,
        });

        // If the confirmation email fails, just log it. Don't fail the whole request
        // because the main application was successfully sent to the company.
        if (applicantEmailError) {
            console.warn('Failed to send confirmation email to applicant:', applicantEmailError);
        }

        // Return a success response to the client
        return NextResponse.json({ message: 'Application submitted successfully!' }, { status: 200 });

    } catch (error: any) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: error.message || 'An unexpected error occurred.' }, { status: 500 });
    }
}
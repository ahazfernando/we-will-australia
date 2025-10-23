import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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
        const formData = await request.formData();
        const resume = formData.get('resume') as File | null;

        // Extract other form fields
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const address = formData.get('address') as string;
        const phone = formData.get('phone') as string;
        const linkedin = formData.get('linkedin') as string;
        const coverletter = formData.get('coverletter') as string;
        const jobTitle = formData.get('jobTitle') as string;

        if (!resume) {
            return NextResponse.json({ error: 'Resume file is required.' }, { status: 400 });
        }

        // Convert resume file to buffer for attachment
        const resumeBuffer = Buffer.from(await resume.arrayBuffer());

        // 1. Send the application notification email to the company
        const { data: companyEmailData, error: companyEmailError } = await resend.emails.send({
            from: fromEmail,
            to: [recipientEmail],
            subject: `New Application for ${jobTitle}: ${firstName} ${lastName}`,
            html: `
              <h1>New Job Application</h1>
              <p><strong>Position:</strong> ${jobTitle}</p>
              <hr>
              <h2>Applicant Details:</h2>
              <ul>
                <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
                <li><strong>Address:</strong> ${address}</li>
                <li><strong>LinkedIn:</strong> ${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : 'N/A'}</li>
              </ul>
              <hr>
              <h2>Message:</h2>
              <p>${coverletter}</p>
            `,
            attachments: [
                {
                    filename: resume.name,
                    content: resumeBuffer,
                },
            ],
        });

        if (companyEmailError) {
            console.error('Resend API Error (to company):', companyEmailError);
            return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
        }

        // 2. If the first email was successful, send a confirmation email to the applicant
        const { error: applicantEmailError } = await resend.emails.send({
            from: fromEmail,
            to: [email],
            subject: `We've Received Your Application for ${jobTitle}`,
            html: `
              <h1>Thank You for Applying, ${firstName}!</h1>
              <p>This email confirms that we have successfully received your application for the <strong>${jobTitle}</strong> position.</p>
              <p>Our hiring team will review your application and qualifications. If your profile is a good match for the role, we will be in touch shortly.</p>
              <p>We appreciate your interest in joining We Will Australia.</p>
              <br>
              <p>Best regards,</p>
              <p>The Hiring Team</p>
            `,
        });

        if (applicantEmailError) {
            // Log the error, but don't block the user from getting a success message,
            // as their application was successfully sent to the company.
            console.error('Resend API Error (to applicant):', applicantEmailError);
        }

        // Return a success response to the frontend
        return NextResponse.json({ message: 'Application submitted successfully!', data: companyEmailData });

    } catch (err) {
        console.error('Server Error:', err);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
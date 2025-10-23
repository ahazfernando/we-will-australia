import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Get the recipient email from environment variables
const recipientEmail = process.env.RECIPIENT_EMAIL;

// Define the "from" email address. This must be a verified domain on Resend.
const fromEmail = 'Recruitment Inquiry <careers@wewillaustralia.com.au>';

export async function POST(request: Request) {
    // Check if the recipient email is configured in your environment
    if (!recipientEmail) {
        console.error('Recipient email is not configured in environment variables.');
        return NextResponse.json(
            { error: 'Server configuration error: Recipient email is missing.' },
            { status: 500 }
        );
    }

    try {
        // Parse the JSON body from the request
        const body = await request.json();

        // Destructure all the expected fields from the form
        const {
            jobTitle,
            jobLocation,
            positionType,
            roleType,
            firstName,
            surname,
            phone,
            email,
            companyName,
            occupation,
            idealCandidate
        } = body;

        // Basic validation to ensure required fields are present
        if (!jobTitle || !jobLocation || !firstName || !surname || !email || !companyName) {
            return NextResponse.json({ error: 'Missing required form fields.' }, { status: 400 });
        }

        // 1. Send the notification email to the company/recruiter
        const { data: companyEmailData, error: companyEmailError } = await resend.emails.send({
            from: fromEmail,
            to: [recipientEmail],
            subject: `New Client Inquiry: Staffing for ${jobTitle} at ${companyName}`,
            html: `
              <h1>New Client Staffing Inquiry</h1>
              <p>You have received a new staffing request. Please see the details below and follow up with the client.</p>
              <hr>
              <h2>Client Information:</h2>
              <ul>
                <li><strong>Name:</strong> ${firstName} ${surname}</li>
                <li><strong>Company:</strong> ${companyName}</li>
                <li><strong>Occupation/Title:</strong> ${occupation || 'N/A'}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
              </ul>
              <hr>
              <h2>Position Details:</h2>
              <ul>
                <li><strong>Job Title:</strong> ${jobTitle}</li>
                <li><strong>Job Location:</strong> ${jobLocation}</li>
                <li><strong>Position Type:</strong> ${positionType}</li>
                <li><strong>Role Type:</strong> ${roleType} (Temporary/Permanent)</li>
              </ul>
              <hr>
              <h2>Ideal Candidate Description:</h2>
              <p>${idealCandidate || 'No additional details provided.'}</p>
            `,
        });

        if (companyEmailError) {
            console.error('Resend API Error (to company):', companyEmailError);
            return NextResponse.json({ error: 'Failed to send notification email.' }, { status: 500 });
        }

        // 2. If the first email was successful, send a confirmation email to the client
        const { error: applicantEmailError } = await resend.emails.send({
            from: fromEmail,
            to: [email], // Send to the person who filled out the form
            subject: `We've Received Your Staffing Inquiry`,
            html: `
              <h1>Thank You for Reaching Out To Us, ${firstName}!</h1>
              <p>This email confirms that we have successfully received your inquiry regarding your staffing needs for the <strong>${jobTitle}</strong> position.</p>
              <p>Our team will review the details you provided and will get back to you shortly to discuss how we can assist.</p>
              <p>We appreciate you considering our recruitment services.</p>
              <br>
              <p>Best regards,</p>
              <p>The Team at We Will Australia Recruitment</p>
            `,
        });

        if (applicantEmailError) {
            // If this email fails, log it but don't fail the request,
            // as the primary notification has already been sent.
            console.error('Resend API Error (to applicant):', applicantEmailError);
        }

        // Return a success response to the frontend
        return NextResponse.json({ message: 'Form submitted successfully!', data: companyEmailData });

    } catch (err) {
        console.error('Server Error:', err);
        // Handle JSON parsing errors or other unexpected issues
        if (err instanceof SyntaxError) {
            return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}

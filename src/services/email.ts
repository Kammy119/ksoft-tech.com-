import type { FormData as ProjectFormData } from '../ProjectStart';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function formatCurrency(budget: string): string {
  switch (budget) {
    case '500-2000': return '$500 - $2,000';
    case '2000-5000': return '$2,000 - $5,000';
    case '5000-10000': return '$5,000 - $10,000';
    case '10000-20000': return '$10,000 - $20,000';
    case '20000+': return '$20,000+';
    default: return 'Not specified';
  }
}

function formatTimeline(timeline: string): string {
  switch (timeline) {
    case '1-2': return '1-2 months';
    case '2-3': return '2-3 months';
    case '3-6': return '3-6 months';
    case '6+': return '6+ months';
    default: return 'Not specified';
  }
}

function createContactEmail(formData: ContactFormData): string {
  return `
    <h1>New Contact Form Submission</h1>
    
    <h2>Contact Information</h2>
    <table cellpadding="5" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 200px;"><strong>Name:</strong></td>
        <td>${formData.name}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${formData.email}</td>
      </tr>
      <tr>
        <td><strong>Phone:</strong></td>
        <td>${formData.phone || 'Not provided'}</td>
      </tr>
    </table>

    <h2>Message Details</h2>
    <table cellpadding="5" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 200px;"><strong>Subject:</strong></td>
        <td>${formData.subject}</td>
      </tr>
      <tr>
        <td style="vertical-align: top;"><strong>Message:</strong></td>
        <td>${formData.message.replace(/\n/g, '<br>')}</td>
      </tr>
    </table>

    <hr>
    <p><small>This email was sent from the WebCraft contact form.</small></p>
  `;
}

function createProjectSummaryEmail(formData: ProjectFormData): string {
  const features = formData.features.length > 0 
    ? `<ul>${formData.features.map(f => `<li>${f}</li>`).join('')}</ul>`
    : 'None specified';

  return `
    <h1>New Project Inquiry</h1>
    
    <h2>Client Information</h2>
    <table cellpadding="5" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 200px;"><strong>Full Name:</strong></td>
        <td>${formData.firstName} ${formData.lastName}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${formData.email}</td>
      </tr>
      <tr>
        <td><strong>Phone:</strong></td>
        <td>${formData.phone}</td>
      </tr>
      <tr>
        <t <boltAction type="file" filePath="src/services/email.ts">
        <td><strong>Phone:</strong></td>
        <td>${formData.phone}</td>
      </tr>
      <tr>
        <td><strong>Company:</strong></td>
        <td>${formData.companyName || 'Not provided'}</td>
      </tr>
    </table>

    <h2>Project Details</h2>
    <table cellpadding="5" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 200px;"><strong>Project Type:</strong></td>
        <td>${formData.projectType}</td>
      </tr>
      <tr>
        <td><strong>Budget Range:</strong></td>
        <td>${formatCurrency(formData.budget)}</td>
      </tr>
      <tr>
        <td><strong>Timeline:</strong></td>
        <td>${formatTimeline(formData.timeline)}</td>
      </tr>
    </table>

    <h2>Project Requirements</h2>
    <table cellpadding="5" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 200px;"><strong>Purpose:</strong></td>
        <td>${formData.purpose}</td>
      </tr>
      <tr>
        <td><strong>Target Audience:</strong></td>
        <td>${formData.targetAudience}</td>
      </tr>
      <tr>
        <td><strong>Required Features:</strong></td>
        <td>${features}</td>
      </tr>
      <tr>
        <td><strong>CMS Required:</strong></td>
        <td>${formData.contentManagement ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td><strong>E-commerce Required:</strong></td>
        <td>${formData.ecommerce ? 'Yes' : 'No'}</td>
      </tr>
    </table>

    <h2>Additional Information</h2>
    <table cellpadding="5" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="width: 200px;"><strong>Existing Website:</strong></td>
        <td>${formData.existingWebsite || 'None'}</td>
      </tr>
      <tr>
        <td><strong>Additional Notes:</strong></td>
        <td>${formData.additionalNotes || 'None provided'}</td>
      </tr>
    </table>
  `;
}

export async function sendProjectInquiryEmail(formData: ProjectFormData): Promise<boolean> {
  const apiKey = import.meta.env.VITE_ELASTIC_EMAIL_API_KEY;
  const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;
  const senderEmail = import.meta.env.VITE_SENDER_EMAIL;

  const emailContent = createProjectSummaryEmail(formData);
  const subject = `New Project Inquiry - ${formData.firstName} ${formData.lastName} - ${formData.projectType}`;

  const url = 'https://api.elasticemail.com/v4/emails';
  const data = {
    Recipients: [{ Email: recipientEmail }],
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Content: emailContent
        }
      ],
      Subject: subject,
      From: senderEmail,
      ReplyTo: formData.email
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': apiKey
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return true;
  } catch (err) {
    const error = err as Error;
    console.error('Failed to send project inquiry email:', error.message);
    throw error;
  }
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  const apiKey = import.meta.env.VITE_ELASTIC_EMAIL_API_KEY;
  const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL;
  const senderEmail = import.meta.env.VITE_SENDER_EMAIL;

  const emailContent = createContactEmail(formData);
  const subject = `WebCraft Contact Form: ${formData.subject}`;

  const url = 'https://api.elasticemail.com/v4/emails';
  const data = {
    Recipients: [{ Email: recipientEmail }],
    Content: {
      Body: [
        {
          ContentType: "HTML",
          Content: emailContent
        }
      ],
      Subject: subject,
      From: senderEmail,
      ReplyTo: formData.email
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': apiKey
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return true;
  } catch (err) {
    const error = err as Error;
    console.error('Failed to send email:', error.message);
    throw error;
  }
}
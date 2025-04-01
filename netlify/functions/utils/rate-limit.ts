import fs from 'fs';
import path from 'path';

const RATE_LIMIT_DIR = path.join(process.cwd(), 'rate-limits');
const MAX_SUBMISSIONS_PER_HOUR = 5; // Maximum submissions per hour per IP
const MAX_SUBMISSIONS_PER_DAY = 20; // Maximum submissions per day per IP
const MAX_SUBMISSIONS_PER_EMAIL = 3; // Maximum submissions per email per day
const MAX_NEWSLETTER_SUBSCRIPTIONS = 1; // Maximum newsletter subscriptions per email

// Ensure rate limit directory exists
if (!fs.existsSync(RATE_LIMIT_DIR)) {
  fs.mkdirSync(RATE_LIMIT_DIR, { recursive: true });
}

interface RateLimitData {
  ip: string;
  email: string;
  submissions: {
    timestamp: string;
    formType: string;
  }[];
}

export const checkRateLimit = (ip: string, email: string, formType: string): { allowed: boolean; message: string } => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Get or create rate limit file for this IP
  const ipFile = path.join(RATE_LIMIT_DIR, `${ip}.json`);
  let rateLimitData: RateLimitData = {
    ip,
    email,
    submissions: [],
  };

  if (fs.existsSync(ipFile)) {
    rateLimitData = JSON.parse(fs.readFileSync(ipFile, 'utf-8'));
  }

  // Special handling for newsletter subscriptions
  if (formType === 'newsletter') {
    const hasNewsletterSubscription = rateLimitData.submissions.some(
      submission => submission.formType === 'newsletter'
    );
    
    if (hasNewsletterSubscription) {
      return {
        allowed: false,
        message: 'This email is already subscribed to the newsletter.',
      };
    }
  }

  // Add new submission
  rateLimitData.submissions.push({
    timestamp: now.toISOString(),
    formType,
  });

  // Clean up old submissions
  rateLimitData.submissions = rateLimitData.submissions.filter(
    submission => new Date(submission.timestamp) > oneDayAgo
  );

  // Check hourly limit
  const hourlySubmissions = rateLimitData.submissions.filter(
    submission => new Date(submission.timestamp) > oneHourAgo
  );
  if (hourlySubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
    return {
      allowed: false,
      message: 'Too many submissions. Please try again later.',
    };
  }

  // Check daily limit
  if (rateLimitData.submissions.length >= MAX_SUBMISSIONS_PER_DAY) {
    return {
      allowed: false,
      message: 'Daily submission limit reached. Please try again tomorrow.',
    };
  }

  // Check email-specific limit (excluding newsletter)
  if (formType !== 'newsletter') {
    const emailSubmissions = rateLimitData.submissions.filter(
      submission => submission.formType === formType
    );
    if (emailSubmissions.length >= MAX_SUBMISSIONS_PER_EMAIL) {
      return {
        allowed: false,
        message: `Maximum submissions reached for this form type. Please try again later.`,
      };
    }
  }

  // Save updated rate limit data
  fs.writeFileSync(ipFile, JSON.stringify(rateLimitData, null, 2));

  return { allowed: true, message: '' };
}; 
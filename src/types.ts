export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isCompleted: boolean;
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviewCount: number;
  instructor: string;
  duration: string;
  lessonsCount: number;
  enrolled: boolean;
  progress: number; // 0 to 100
  image: string;
  description: string;
  price?: number;
  curriculum: CurriculumSection[];
}

export interface MentorReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  reviewsCount: number;
  price: number;
  bio: string;
  image: string;
  skills: string[];
  availability: string[]; // ['Monday 10:00 AM', ...]
  reviews: MentorReview[];
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: "Job" | "Internship";
  location: string;
  duration?: string; // For internships (e.g. '6 Months')
  stipendOrSalary: string;
  matchScore: number;
  skillsRequired: string[];
  description: string;
  applied: boolean;
  saved: boolean;
  status?: "Applied" | "Reviewing" | "Interviewing" | "Offered" | "Rejected";
  applicationDate?: string;
}

export interface Workshop {
  id: string;
  title: string;
  host: string;
  company: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  registrants: number;
  image: string;
  description: string;
  registered: boolean;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  description: string;
  applied: boolean;
  status?: "Pending" | "Awarded" | "Declined";
}

export interface BlogComment {
  id: string;
  author: string;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  content: string;
  comments: BlogComment[];
  bookmarksCount: number;
  bookmarked: boolean;
}

export interface SupportMessage {
  id: string;
  sender: "user" | "support";
  message: string;
  time: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: "Open" | "Resolved";
  messages: SupportMessage[];
  priority: "Low" | "Medium" | "High";
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "alert" | "recommendation" | "application" | "message";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description: string;
  tags: string[];
}

export interface UserProfile {
  fullName: string;
  email: string;
  headline: string;
  bio: string;
  avatar: string;
  resumeUrl?: string;
  skills: string[];
  projects: PortfolioProject[];
  experience: { role: string; company: string; duration: string }[];
  education: { degree: string; school: string; year: string }[];
}

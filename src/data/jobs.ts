import type { Job } from '../types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140k - $180k',
    category: 'Engineering',
    description: 'We are looking for an experienced Frontend Engineer to lead our core product team. You will be working with React, TypeScript, and Tailwind CSS to build beautiful and responsive user interfaces.',
    requirements: [
      '5+ years of experience with React and modern JavaScript',
      'Strong understanding of web performance and accessibility',
      'Experience with state management libraries',
      'Bachelor\'s degree in Computer Science or equivalent'
    ],
    postedAt: '2023-10-25'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100k - $140k',
    category: 'Design',
    description: 'Join our award-winning design team. We need someone who is passionate about user experience and visual design.',
    requirements: [
      'Portfolio demonstrating strong UI/UX skills',
      'Proficiency in Figma and Adobe Creative Suite',
      'Experience working in an agile environment',
      'Excellent communication skills'
    ],
    postedAt: '2023-10-24'
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'DataSystems Inc.',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$120k - $160k',
    category: 'Engineering',
    description: 'We need a backend specialist to help scale our Node.js microservices architecture.',
    requirements: [
      'Strong experience with Node.js and Express',
      'Knowledge of SQL and NoSQL databases',
      'Experience with AWS or other cloud providers',
      'Ability to write clean, testable code'
    ],
    postedAt: '2023-10-23'
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'Growth Masters',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90k - $120k',
    category: 'Marketing',
    description: 'Lead our marketing initiatives and drive growth for our new product lines.',
    requirements: [
      '3+ years of experience in digital marketing',
      'Proven track record of successful campaigns',
      'Experience with SEO and content marketing',
      'Strong analytical skills'
    ],
    postedAt: '2023-10-22'
  },
  {
    id: '5',
    title: 'Junior Web Developer',
    company: 'StartUp Hub',
    location: 'Remote',
    type: 'Part-time',
    salary: '$40k - $60k',
    category: 'Engineering',
    description: 'Great opportunity for a junior developer to learn and grow in a fast-paced environment.',
    requirements: [
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Willingness to learn new technologies',
      'Good problem-solving skills',
      'Team player'
    ],
    postedAt: '2023-10-21'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Cloud Ninjas',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130k - $170k',
    category: 'DevOps',
    description: 'Automate our infrastructure and improve our CI/CD pipelines.',
    requirements: [
      'Experience with Docker and Kubernetes',
      'Strong scripting skills (Bash, Python)',
      'Familiarity with Terraform or Ansible',
      'Knowledge of monitoring tools'
    ],
    postedAt: '2023-10-20'
  }
];


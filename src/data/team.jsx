// src/data/team.js
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Passionate about creating tools that simplify people's lives.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    socials: [
      { name: "GitHub", url: "#", icon: <FaGithub /> },
      { name: "Twitter", url: "#", icon: <FaTwitter /> },
      { name: "LinkedIn", url: "#", icon: <FaLinkedin /> }
    ]
  },
  {
    name: "Maria Garcia",
    role: "Lead Developer",
    bio: "Full-stack wizard with a focus on user experience.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    socials: [
      { name: "GitHub", url: "#", icon: <FaGithub /> },
      { name: "Twitter", url: "#", icon: <FaTwitter /> }
    ]
  },
  {
    name: "James Wilson",
    role: "UI/UX Designer",
    bio: "Creates interfaces that are both beautiful and functional.",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    socials: [
      { name: "GitHub", url: "#", icon: <FaGithub /> },
      { name: "LinkedIn", url: "#", icon: <FaLinkedin /> }
    ]
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    bio: "Ensures ContactMate meets our users' needs perfectly.",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    socials: [
      { name: "Twitter", url: "#", icon: <FaTwitter /> },
      { name: "LinkedIn", url: "#", icon: <FaLinkedin /> }
    ]
  }
];

export default teamMembers;
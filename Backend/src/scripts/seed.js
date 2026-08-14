import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Education from "../models/Education.js";
import Project from "../models/Project.js";
import Achievement from "../models/Achievement.js";
import dotenv from "dotenv";

import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
await connectDatabase();

const profileData = {
  name: "Bandari Harish",
  roles: ["Frontend Developer", "React Developer", "Angular Developer"],
  tagline:
    "Frontend Developer with 1.5 years of professional experience building responsive and scalable web applications.",
  about:
    "Frontend Developer with 1.5 years of professional experience building responsive and scalable web applications using Angular, React, JavaScript, TypeScript, HTML5, CSS3, SCSS (Sass), Bootstrap, and Tailwind CSS. Proficient in developing reusable UI components and delivering responsive, performance-oriented applications. Passionate about writing clean, maintainable code and continuously enhancing technical skills to build modern, user-friendly web experiences.",
  objective:
    "To secure a challenging position as a Frontend Developer where I can leverage my skills in building scalable web applications, contribute to innovative projects, and grow alongside a dynamic team of professionals.",
  location: "Hyderabad, Telangana, India",
  education: "B.Tech in Computer Science",
  languages: ["English", "Hindi", "Telugu"],
  experience: "1.5+ Years",
  email: "hb.harishbandari@gmail.com",
  phone: "+91-9491352681",
  social: {
    linkedin: "https://www.linkedin.com/in/bandariharish/",

    github: "https://www.github.com/Bandari-Harish",
  },
  availability: "Open to Work",
  avatar: "BH",
  resume:
    "https://drive.google.com/drive/folders/1Uhxhy_ZeT5CB7Vmpv8_CxXye0e0szS3Z?usp=sharing",
  stats: {
    projects: 3,
    technologies: 10,
    githubRepos: 3,
    codingHours: 1200,
  },
};

const skillsData = [
  { name: "Angular", icon: "fa-brands fa-angular" },
  { name: "React", icon: "fa-brands fa-react" },
  { name: "JavaScript", icon: "fa-brands fa-js" },
  { name: "TypeScript", icon: "fa-solid fa-file-code" },
  { name: "Python", icon: "fa-brands fa-python" },
  { name: "HTML5", icon: "fa-brands fa-html5" },
  { name: "CSS3", icon: "fa-brands fa-css3-alt" },
  { name: "SCSS (Sass)", icon: "fa-brands fa-sass" },
  { name: "Bootstrap", icon: "fa-brands fa-bootstrap" },
  { name: "Tailwind CSS", icon: "fa-solid fa-wind" },
];

const experiencesData = [
  {
    role: "Associate Developer",
    company: "SPRUKO Technologies Private Limited",
    period: "Apr 2025 – Jul 2026",
    type: "fulltime",
    location: "Hyderabad, India",
    points: [
      "Designed and developed responsive, reusable UI components using Angular, TypeScript, and SCSS, ensuring consistent design and maintainable code.",
      "Developed responsive web applications using Bootstrap and Tailwind CSS, ensuring seamless user experiences across desktop, tablet, and mobile devices.",
      "Built reusable front-end components that improved project delivery speed and maintainability.",
      "Worked closely with the design team to translate UI/UX requirements into scalable and user-friendly interfaces.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "SketchEA IT Consultant Private Limited",
    period: "May 2023 – Jul 2023",
    type: "internship",
    location: "Visakhapatnam, India",
    points: [
      "Designed an automated system using Workflow Automation Design (WAD) to optimize ATL supervisor workflows, cutting task allocation time by 40%.",
      "Developed a responsive web application for Atal Tinkering Labs (ATL) under NITI Aayog, enhancing student engagement and improving access to hands-on learning resources.",
    ],
  },
];

const educationsData = [
  {
    degree: "B.Tech",
    field: "Computer Science",
    institution: "Gitam University",
    period: "2020 – 2024",
    grade: "",
    location: "Visakhapatnam, India",
  },
  {
    degree: "Class XII",
    field: "MPC",
    institution: "Vignan Junior College",
    period: "2018 – 2020",
    grade: "",
    location: "Hyderabad, India",
  },
  {
    degree: "Class X",
    field: "",
    institution: "Sree Vidyanikethan International School",
    period: "2017 – 2018",
    grade: "",
    location: "Hyderabad, India",
  },
];

const projectsData = [
  {
    title: "Property Management Dashboard",
    category: "Angular",
    icon: "fa-solid fa-building",
    period: "Jun 2025 – Aug 2025",
    description:
      "Responsive Property Management Dashboard for customers to browse property listings with an intuitive and mobile-friendly interface.",
    tech: ["Angular", "TypeScript", "SCSS", "REST APIs"],
    github: "",
    demo: "",
    status: "published",
  },
  {
    title: "Weather Dashboard",
    category: "JavaScript",
    icon: "fa-solid fa-cloud-sun",
    period: "Mar 2022 – May 2022",
    description:
      "Responsive weather dashboard with real-time weather updates, automatic location detection, hourly forecasts, and 7-day weather forecasts.",
    tech: [
      "HTML",
      "SCSS (Sass)",
      "Bootstrap 5",
      "JavaScript",
      "OpenWeather API",
      "IPInfo API",
      "Axios",
    ],
    github: "",
    demo: "",
    status: "published",
  },
  {
    title: "Portfolio Website",
    category: "React",
    icon: "fa-solid fa-user",
    period: "May 2022 – Jun 2022",
    description:
      "Personal portfolio website showcasing technical skills, projects, and achievements, deployed on GitHub Pages.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "",
    demo: "",
    status: "published",
  },
];

const achievementsData = [
  {
    icon: "fa-solid fa-trophy",
    text: "Secured a position in the top 100 for Smart Ideathon 2023, recognizing the Atal Tinkering Lab project.",
  },
];

const existingProfile = await Profile.findOne();
if (!existingProfile) {
  await Profile.create(profileData);
  console.log("Profile created.");
} else {
  console.log("Profile already exists.");
}

const count = async (Model) => Model.estimatedDocumentCount();

if ((await count(Skill)) === 0) {
  await Skill.insertMany(skillsData);
  console.log("Skills created.");
} else {
  console.log("Skills already exist.");
}

if ((await count(Experience)) === 0) {
  await Experience.insertMany(experiencesData);
  console.log("Experiences created.");
} else {
  console.log("Experiences already exist.");
}

if ((await count(Education)) === 0) {
  await Education.insertMany(educationsData);
  console.log("Educations created.");
} else {
  console.log("Educations already exist.");
}

if ((await count(Project)) === 0) {
  await Project.insertMany(projectsData);
  console.log("Projects created.");
} else {
  console.log("Projects already exist.");
}

if ((await count(Achievement)) === 0) {
  await Achievement.insertMany(achievementsData);
  console.log("Achievements created.");
} else {
  console.log("Achievements already exist.");
}

console.log("Seeding completed.");

await mongoose.connection.close();

import {FaReact, FaNode, FaCss3Alt} from 'react-icons/fa';
import {SiJavascript, SiMicrosoftsqlserver, SiTypescript, SiPython, SiCsharp} from 'react-icons/si';

import Project1 from '../assets/Project1.jpg';
import Project2 from '../assets/Project2.jpg';
import Project3 from '../assets/Project3.jpg';

export const Skills = [
    {
        id: 0,
        tech: 'React Js',
        icon: <FaReact />
    },
    {
        id: 1,
        tech: 'Node Js',
        icon: <FaNode />
    },
    {
        id: 2,
        tech: 'SQL',
        icon: <SiMicrosoftsqlserver />
    },
    {
        id: 3,
        tech: 'CSS',
        icon: <FaCss3Alt />
    },
    {
        id: 4,
        tech: 'JavaScript',
        icon: <SiJavascript />
    },
    {
        id: 5,
        tech: 'Typescript',
        icon: <SiTypescript />
    },
    {
        id: 6,
        tech: 'Python',
        icon: <SiPython />
    },
    {
        id: 7,
        tech: 'C#',
        icon: <SiCsharp />
    }

   
]

export const projectDetails = [
    {
        id: 0,
        project_name: "Python media Downloader",        
        project_desc: "This is a python generated youtube and instagram downloader that when link is installed it will download the video straight to your downloads, built and adapted for Mac OS and Windows and Linx",
        tech_stack: ["Python"],
        project_img: Project1,
        project_url: "https://github.com/Achykez/media_downloader",
        reverse: false,
    },
    {
        id: 1,
        project_name: "Spotify Clone",
        project_desc: " This is a web app that posseses spotify features while fetching its data from Shazam Core API using Rapid APi and Redux Toolkit Query",
        tech_stack: ["ReactJS", "Tailwind", "RAPID API"],
        project_img: Project2,
        project_url: "https://github.com/Achykez/Moozik",
        reverse: false,

    },
    {
        id: 2,
        project_name: "Tetris App",
        project_desc: " A tetris Game made with ReactJS",
        project_img: Project3,
        tech_stack: ["ReactJS",],
        project_url: "https://github.com/Achykez/Tetris-Web-App",
        reverse: false,

    }
]
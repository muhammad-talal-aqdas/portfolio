import type { ScatteredGridItem } from "@/components/ScatteredGrid";

export interface PortfolioItem extends ScatteredGridItem {
  teaser: string;
  description: string;
  media?: string[];
  videoUrl?: string;
  poetry?: string[];
}

export const portfolioData: Record<string, PortfolioItem[]> = {
  about: [
    {
      id: "birthplace",
      title: "Birthplace",
      teaser: "Born in Rawalpindi, raised mostly in Islamabad.",
      description: "Born in Rawalpindi, raised mostly in Islamabad.",
      image: "/assets/About/birth-place.jpeg",
      media: [
        "/assets/About/birth-place.jpeg",
      ],
    },
    {
      id: "arfa-karim",
      title: "Arfa Karim",
      teaser: "My childhood hero",
      description: "My childhood hero. A young Pakistani prodigy who worked with Microsoft — watching her made me want to become an engineer.",
      image: "/assets/About/arfa karim.jpeg",
      media: [
        "/assets/About/arfa karim.jpeg",
      ],
    },
    {
      id: "first-code",
      title: "First Code",
      teaser: "10th grade, a sample ATM",
      description: "10th grade. My first real program — a sample ATM machine system. That's where it started.",
      image: "/assets/About/first-code.jpeg",
      media: [
        "/assets/About/first-code.jpeg",
      ],
    },
    {
      id: "cricket-trophy",
      title: "Cricket Trophy",
      teaser: "Known for cricket at school",
      description: "Known for cricket throughout school. This trophy means more to me than most things I own.",
      image: "/assets/About/trophy-sports.jpeg",
      media: [
        "/assets/About/trophy-sports.jpeg",
      ],
    },
    {
      id: "urdu-speeches",
      title: "Urdu Speeches",
      teaser: "Won more than once",
      description: "Competed in Urdu speech competitions throughout school — won more than once.",
      image: "/assets/About/urdu-speech.jpeg",
      media: [
        "/assets/About/urdu-speech.jpeg",
      ],
    },
    {
      id: "fun-fact",
      title: "Fun Fact",
      teaser: "Hardworking, not bookish",
      description: "Top positions almost every year growing up. Truth is, I didn't study much — just hardworking, not bookish.",
      image: "/assets/About/fun-fact.jpeg",
      media: [
        "/assets/About/fun-fact.jpeg",
      ],
    },
    {
      id: "three-words",
      title: "Three Words",
      teaser: "Hardworking. Emotional. Kind.",
      description: "Hardworking. Emotional. Kind.",
      image: "/assets/About/three-words.jpeg",
      media: [
        "/assets/About/three-words.jpeg",
      ],
    },
    {
      id: "cooking",
      title: "Cooking",
      teaser: "Grilled malai boti and kadahi",
      description: "I was genuinely bad at this until 1st year of college. Three years of regular practice later, grilled malai boti and kadahi are my specialty now.",
      image: "/assets/About/cooking.jpeg",
      media: [
        "/assets/About/cooking.jpeg",
      ],
    },
    {
      id: "photography",
      title: "Photography",
      teaser: "No formal training",
      description: "No formal training — just whatever caught my eye, camera up, shot taken.",
      image: "/assets/About/photography.jpeg",
      media: [
        "/assets/About/photography.jpeg",
      ],
    },
    {
      id: "teaching",
      title: "Teaching",
      teaser: "Friends first, students second",
      description: "I don't just teach — I become friends with my students. We play, they open up, and somewhere in that, real learning happens.",
      image: "/assets/About/teaching.jpeg",
      media: [
        "/assets/About/teaching.jpeg",
      ],
    },
    {
      id: "iqbal-poetry",
      title: "Iqbal's Poetry",
      teaser: "Fell in love at 14",
      description: "Fell in love with Iqbal's poetry at 14. His vision — non-traditional, uncompromising — became something I genuinely tried to live by.",
      image: "/assets/About/allama iqbal.jpeg",
      media: [
        "/assets/About/allama iqbal.jpeg",
      ],
    },
    {
      id: "bad-at",
      title: "Bad At",
      teaser: "Handling my emotions",
      description: "Handling my emotions. Working on it.",
    },
    {
      id: "sci-fi-thrillers",
      title: "Sci-fi Thrillers",
      teaser: "Thrill is what I love",
      description: "Didn't know my genre until F4 Thailand — 16 hour-long episodes, some of the hardest hours of my life. But it made one thing clear: thrill is what I actually love.",
    },
    {
      id: "ben-10",
      title: "Ben 10",
      teaser: "A fan from day one",
      description: "A fan from day one — even as a kid I could tell it had more depth than a typical cartoon.",
      image: "/assets/About/ben 10.jpeg",
      media: [
        "/assets/About/ben 10.jpeg",
      ],
    },
    {
      id: "danny-phantom",
      title: "Danny Phantom",
      teaser: "The finale made me cry",
      description: "The show whose finale actually made me cry.",
      image: "/assets/About/danny-phantom.jpeg",
      media: [
        "/assets/About/danny-phantom.jpeg",
      ],
    },
    {
      id: "fullmetal-alchemist",
      title: "Fullmetal Alchemist: Brotherhood",
      teaser: "My favorite anime",
      description: "My favorite anime. Genuinely one of the best stories ever told.",
      image: "/assets/About/fullmetal-alchemist.jpeg",
      media: [
        "/assets/About/fullmetal-alchemist.jpeg",
      ],
    },
  ],
  projects: [
    {
      id: "nexora",
      title: "Nexora",
      teaser: "Every AI, one platform",
      description: "A web app that brings Codex, Claude, Groq, and Gemini together in one place to build websites — live AI chat, working previews, and real-time design, with each model doing what it does best. Deployed through Netlify.",
      image: "/assets/projects/NEXORA/WhatsApp Image 2026-08-09 at 11.02.39 AM (15).jpeg",
      videoUrl: "/assets/projects/NEXORA/AD.mp4",
      media: [
        "/assets/projects/NEXORA/NEXORA 1..mp4",
        "/assets/projects/NEXORA/NEXORA 2.mp4",
        "/assets/projects/NEXORA/WhatsApp Image 2026-08-09 at 11.02.39 AM (15).jpeg",
        "/assets/projects/NEXORA/WhatsApp Image 2026-08-09 at 11.02.39 AM (19).jpeg",
        "/assets/projects/NEXORA/WhatsApp Image 2026-08-09 at 11.02.39 AM (20).jpeg",
        "/assets/projects/NEXORA/WhatsApp Video 2026-08-09 at 11.02.45 AM.mp4",
      ],
    },
    {
      id: "home-services",
      title: "Home Services",
      teaser: "Connecting people to workers",
      description: "A Java app that connects people with service workers of any kind — plumbers, electricians, whoever's needed. Workers can be contacted, rated, and paid — online or otherwise.",
      image: "/assets/projects/Home Services/WhatsApp Image 2026-08-09 at 11.02.38 AM.jpeg",
      videoUrl: "/assets/projects/Home Services/AD.mp4",
      media: [
        "/assets/projects/Home Services/WhatsApp Image 2026-08-09 at 11.02.38 AM.jpeg",
        "/assets/projects/Home Services/WhatsApp Image 2026-08-09 at 11.02.39 AM (1).jpeg",
        "/assets/projects/Home Services/WhatsApp Image 2026-08-09 at 11.02.39 AM (2).jpeg",
        "/assets/projects/Home Services/WhatsApp Image 2026-08-09 at 11.02.39 AM (3).jpeg",
        "/assets/projects/Home Services/WhatsApp Image 2026-08-09 at 11.02.39 AM.jpeg",
      ],
    },
    {
      id: "citylink",
      title: "CityLink",
      teaser: "Local transit, digitized",
      description: "A C++ app for local bus and van transport. Drivers register their vehicles, timings, and routes. Passengers can browse, book seats, and pay — daily or monthly.",
      image: "/assets/projects/CityLink/AD.mp4",
      videoUrl: "/assets/projects/CityLink/AD.mp4",
      media: [
        "/assets/projects/CityLink/01.07.2026_16.59.40_REC.mp4",
        "/assets/projects/CityLink/WhatsApp Video 2026-08-09 at 11.02.42 AM.mp4",
      ],
    },
    {
      id: "quizpilot",
      title: "Quizpilot",
      teaser: "Built for my own students",
      description: "Built for my coaching students prepping for entry test exams. It captures the screen, extracts MCQs from past and model papers, builds a searchable question bank, and lets students revise whenever they want.",
      image: "/assets/projects/Quizpilot/AD.mp4",
      videoUrl: "/assets/projects/Quizpilot/AD.mp4",
    },
    {
      id: "medical-assistant",
      title: "Medical Assistant",
      teaser: "AI for doctors",
      description: "An AI chatbot with deep medical knowledge, built to help doctors and med students with diagnosis. It can also read reports and X-rays, saving valuable time in clinical settings.",
      image: "/assets/projects/Medical Assistant/AD.mp4",
      videoUrl: "/assets/projects/Medical Assistant/AD.mp4",
    },
    {
      id: "smile",
      title: "Smile",
      teaser: "A clean dental website",
      description: "A simple, easy-to-use website for a dental clinic, built under my Nexora brand.",
      image: "/assets/projects/Smile/Smile.mp4",
      videoUrl: "/assets/projects/Smile/Smile.mp4",
    },
    {
      id: "scrapper",
      title: "Scrapper",
      teaser: "A web-scraping dashboard",
      description: "A WebCollector-style tool with a clean dashboard for scraping and organizing web data.",
      image: "/assets/projects/scrapper/WhatsApp Image 2026-09-02 at 3.16.16 PM.jpeg",
      media: [
        "/assets/projects/scrapper/WhatsApp Image 2026-09-02 at 3.16.16 PM.jpeg",
        "/assets/projects/scrapper/WhatsApp Image 2026-09-02 at 3.16.17 PM.jpeg",
      ],
    },
    {
      id: "distance-measurer",
      title: "Distance Measurer & Navigation",
      teaser: "Hardware meets code",
      description: "A project combining real circuitry with code — built and simulated in Proteus to measure distance for navigation purposes.",
      image: "/assets/projects/Distant measurer and navigation/Screenshot 2026-09-02 151154.png",
      media: [
        "/assets/projects/Distant measurer and navigation/Screenshot 2026-09-02 151154.png",
        "/assets/projects/Distant measurer and navigation/Screenshot 2026-09-02 151254.png",
        "/assets/projects/Distant measurer and navigation/WhatsApp Image 2026-08-09 at 11.02.39 AM (4).jpeg",
        "/assets/projects/Distant measurer and navigation/WhatsApp Image 2026-09-02 at 11.10.40 AM.jpeg",
      ],
    },
  ],
  experience: [
    {
      id: "elementary-school",
      title: "Elementary School",
      teaser: "The Educators",
      description: "Spent most of my elementary years at The Educators — the school I loved most — with a short year at Islamabad Model College early on.",
      image: "/assets/experience/elementary school/WhatsApp Image 2026-09-02 at 12.33.09 PM (1).jpeg",
      media: [
        "/assets/experience/elementary school/WhatsApp Image 2026-09-02 at 12.33.09 PM (1).jpeg",
        "/assets/experience/elementary school/WhatsApp Image 2026-09-02 at 12.34.15 PM (1).jpeg",
        "/assets/experience/elementary school/WhatsApp Image 2026-09-02 at 12.34.15 PM (2).jpeg",
        "/assets/experience/elementary school/WhatsApp Image 2026-09-02 at 12.34.15 PM.jpeg",
        "/assets/experience/elementary school/WhatsApp Image 2026-09-02 at 12.34.16 PM.jpeg",
      ],
    },
    {
      id: "high-school",
      title: "High School",
      teaser: "SSC & HSSC",
      description: "SSC from Concepts School of Sciences. HSSC from Army Public College, Fort Road. Cricket flowed in my veins those years — studied just enough, played every chance I got.",
      image: "/assets/experience/high school/WhatsApp Image 2026-09-02 at 11.09.52 AM.jpeg",
      media: [
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 11.09.52 AM.jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.33.09 PM.jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.33.11 PM.jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.07 PM (1).jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.07 PM.jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.13 PM.jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.14 PM (1).jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.14 PM (2).jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.14 PM (3).jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.14 PM.jpeg",
        "/assets/experience/high school/WhatsApp Image 2026-09-02 at 12.34.17 PM.jpeg",
      ],
    },
    {
      id: "college",
      title: "College",
      teaser: "NUST, Software Engineering",
      description: "Currently studying Software Engineering at NUST — where the real technical journey began.",
      image: "/assets/experience/college/WhatsApp Image 2026-09-02 at 3.25.01 PM (1).jpeg",
      media: [
        "/assets/experience/college/WhatsApp Image 2026-09-02 at 3.25.01 PM (1).jpeg",
        "/assets/experience/college/WhatsApp Image 2026-09-02 at 3.25.01 PM (2).jpeg",
        "/assets/experience/college/WhatsApp Image 2026-09-02 at 3.25.01 PM (3).jpeg",
        "/assets/experience/college/WhatsApp Image 2026-09-02 at 3.25.01 PM.jpeg",
        "/assets/experience/college/WhatsApp Image 2026-09-02 at 3.30.02 PM.jpeg",
      ],
    },
    {
      id: "certificates",
      title: "Certificates",
      teaser: "Proof of the work",
      description: "Professional and field-related certifications earned along the way.",
      image: "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (10).jpeg",
      media: [
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (10).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (11).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (12).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (13).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (5).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (6).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (7).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (8).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-09 at 11.02.39 AM (9).jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-25 at 10.32.01 PM.jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-25 at 10.45.01 PM.jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-25 at 10.53.00 PM.jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-26 at 1.38.39 PM.jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-26 at 1.50.28 PM.jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-26 at 1.58.12 PM.jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-26 at 2.10.30 PM.jpeg",
        "/assets/experience/CERTIFICATES/WhatsApp Image 2026-08-26 at 2.17.44 PM.jpeg",
      ],
    },
    {
      id: "topline-ambassador",
      title: "Topline Studies Ambassador",
      teaser: "Campus Ambassador",
      description: "Represented Topline Studies as a campus ambassador — connecting the program with students on ground.",
      image: "/assets/experience/TOPLINE STUDIES AMBASSADOR/WhatsApp Image 2026-08-09 at 11.02.39 AM (14).jpeg",
      media: [
        "/assets/experience/TOPLINE STUDIES AMBASSADOR/WhatsApp Image 2026-08-09 at 11.02.39 AM (14).jpeg",
      ],
    },
    {
      id: "flyrank-internship",
      title: "FlyRank Internship",
      teaser: "AI Marketing Intern",
      description: "AI Marketing and AI Fluency intern at FlyRank — put real AI tools to work in a professional marketing context.",
      image: "/assets/experience/FlyRank Internship/WhatsApp Image 2026-09-02 at 1.42.32 PM.jpeg",
      media: [
        "/assets/experience/FlyRank Internship/WhatsApp Image 2026-09-02 at 1.42.32 PM.jpeg",
        "/assets/experience/FlyRank Internship/WhatsApp Image 2026-09-02 at 1.59.55 PM.jpeg",
        "/assets/experience/FlyRank Internship/WhatsApp Image 2026-09-02 at 2.35.01 PM.jpeg",
        "/assets/experience/FlyRank Internship/WhatsApp Image 2026-09-02 at 2.36.19 PM.jpeg",
      ],
    },
    {
      id: "gaotek-internship",
      title: "GAOTek Internship",
      teaser: "Virtual Assistant Intern",
      description: "Virtual Assistant intern at GAOTek — remote work, real responsibility, real deadlines.",
      image: "/assets/experience/GAOTek Internship/WhatsApp Image 2026-09-02 at 3.03.18 PM.jpeg",
      media: [
        "/assets/experience/GAOTek Internship/WhatsApp Image 2026-09-02 at 3.03.18 PM.jpeg",
        "/assets/experience/GAOTek Internship/WhatsApp Image 2026-09-02 at 3.06.16 PM.jpeg",
      ],
    },
    {
      id: "alkhidmat",
      title: "Alkhidmat Social Work",
      teaser: "Giving back",
      description: "Volunteered through Alkhidmat — blood donation drives, cleanliness drives, plantation drives, hospital visits, and collecting donations for patients in need.",
      image: "/assets/experience/Alkhidmat Social work/WhatsApp Image 2026-09-02 at 1.20.21 PM (1).jpeg",
      media: [
        "/assets/experience/Alkhidmat Social work/WhatsApp Image 2026-09-02 at 1.20.21 PM (1).jpeg",
        "/assets/experience/Alkhidmat Social work/WhatsApp Image 2026-09-02 at 1.20.21 PM.jpeg",
        "/assets/experience/Alkhidmat Social work/WhatsApp Image 2026-09-02 at 11.09.52 AM (2).jpeg",
        "/assets/experience/Alkhidmat Social work/WhatsApp Image 2026-09-02 at 11.09.52 AM (3).jpeg",
        "/assets/experience/Alkhidmat Social work/WhatsApp Image 2026-09-02 at 2.37.48 PM.jpeg",
      ],
    },
    {
      id: "coaching",
      title: "Coaching",
      teaser: "Teaching my way",
      description: "Coached students prepping for exams — became friends with them first, taught through connection rather than just instruction. That same spirit led to building Quizpilot for them.",
      image: "/assets/experience/COACHING/WhatsApp Image 2026-08-09 at 11.02.39 AM (16).jpeg",
      media: [
        "/assets/experience/COACHING/WhatsApp Image 2026-08-09 at 11.02.39 AM (16).jpeg",
        "/assets/experience/COACHING/WhatsApp Image 2026-08-09 at 11.02.39 AM (17).jpeg",
        "/assets/experience/COACHING/WhatsApp Image 2026-08-09 at 11.02.39 AM (18).jpeg",
      ],
    },
  ],
  snapshots: [
    {
      id: "behind-grey-something-becomes",
      title: "Behind grey something becomes",
      teaser: "Behind grey something becomes",
      description: "Behind grey something becomes",
      image: "/assets/Snapshots/My Captures/behind-grey-something-becomes.jpeg",
      media: [
        "/assets/Snapshots/My Captures/behind-grey-something-becomes.jpeg",
      ],
    },
    {
      id: "blooms-without-permission",
      title: "Blooms without permission",
      teaser: "Blooms without permission",
      description: "Blooms without permission",
      image: "/assets/Snapshots/My Captures/blooms-without-permission.jpeg",
      media: [
        "/assets/Snapshots/My Captures/blooms-without-permission.jpeg",
      ],
    },
    {
      id: "borrowed-glow-feels-like-belonging",
      title: "Borrowed glow feels like belonging",
      teaser: "Borrowed glow feels like belonging",
      description: "Borrowed glow feels like belonging",
      image: "/assets/Snapshots/My Captures/borrowed-glow-feels-like-belonging.jpeg",
      media: [
        "/assets/Snapshots/My Captures/borrowed-glow-feels-like-belonging.jpeg",
      ],
    },
    {
      id: "coldest-roads-remember-light",
      title: "Coldest roads remember light",
      teaser: "Coldest roads remember light",
      description: "Coldest roads remember light",
      image: "/assets/Snapshots/My Captures/coldest-roads-remember-light.jpeg",
      media: [
        "/assets/Snapshots/My Captures/coldest-roads-remember-light.jpeg",
      ],
    },
    {
      id: "courage-to-continue",
      title: "Courage to continue",
      teaser: "Courage to continue",
      description: "Courage to continue",
      image: "/assets/Snapshots/My Captures/courage-to-continue.jpeg",
      media: [
        "/assets/Snapshots/My Captures/courage-to-continue.jpeg",
      ],
    },
    {
      id: "crescent-interrupts-infinity",
      title: "Crescent interrupts infinity",
      teaser: "Crescent interrupts infinity",
      description: "Crescent interrupts infinity",
      image: "/assets/Snapshots/My Captures/crescent-interrupts-infinity.jpeg",
      media: [
        "/assets/Snapshots/My Captures/crescent-interrupts-infinity.jpeg",
      ],
    },
    {
      id: "darkest-clouds-leave-a-door",
      title: "Darkest clouds leave a door",
      teaser: "Darkest clouds leave a door",
      description: "Darkest clouds leave a door",
      image: "/assets/Snapshots/My Captures/darkest-clouds-leave-a-door.jpeg",
      media: [
        "/assets/Snapshots/My Captures/darkest-clouds-leave-a-door.jpeg",
      ],
    },
    {
      id: "darkness-waits-for-light",
      title: "Darkness waits for light",
      teaser: "Darkness waits for light",
      description: "Darkness waits for light",
      image: "/assets/Snapshots/My Captures/darkness-waits-for-light.jpeg",
      media: [
        "/assets/Snapshots/My Captures/darkness-waits-for-light.jpeg",
      ],
    },
    {
      id: "day-softens-before-goodbye",
      title: "Day softens before goodbye",
      teaser: "Day softens before goodbye",
      description: "Day softens before goodbye",
      image: "/assets/Snapshots/My Captures/day-softens-before-goodbye.jpeg",
      media: [
        "/assets/Snapshots/My Captures/day-softens-before-goodbye.jpeg",
      ],
    },
    {
      id: "distance-is-full-of-becoming",
      title: "Distance is full of becoming",
      teaser: "Distance is full of becoming",
      description: "Distance is full of becoming",
      image: "/assets/Snapshots/My Captures/distance-is-full-of-becoming.jpeg",
      media: [
        "/assets/Snapshots/My Captures/distance-is-full-of-becoming.jpeg",
      ],
    },
    {
      id: "earth-waits-for-the-sky",
      title: "Earth waits for the sky",
      teaser: "Earth waits for the sky",
      description: "Earth waits for the sky",
      image: "/assets/Snapshots/My Captures/earth-waits-for-the-sky.jpeg",
      media: [
        "/assets/Snapshots/My Captures/earth-waits-for-the-sky.jpeg",
      ],
    },
    {
      id: "ending-becomes-light",
      title: "Ending becomes light",
      teaser: "Ending becomes light",
      description: "Ending becomes light",
      image: "/assets/Snapshots/My Captures/ending-becomes-light.jpeg",
      media: [
        "/assets/Snapshots/My Captures/ending-becomes-light.jpeg",
      ],
    },
    {
      id: "fading-light-leaves-a-legacy",
      title: "Fading light leaves a legacy",
      teaser: "Fading light leaves a legacy",
      description: "Fading light leaves a legacy",
      image: "/assets/Snapshots/My Captures/fading-light-leaves-a-legacy.jpeg",
      media: [
        "/assets/Snapshots/My Captures/fading-light-leaves-a-legacy.jpeg",
      ],
    },
    {
      id: "faith-after-the-storm",
      title: "Faith after the storm",
      teaser: "Faith after the storm",
      description: "Faith after the storm",
      image: "/assets/Snapshots/My Captures/faith-after-the-storm.jpeg",
      media: [
        "/assets/Snapshots/My Captures/faith-after-the-storm.jpeg",
      ],
    },
    {
      id: "fire-makes-an-altar",
      title: "Fire makes an altar",
      teaser: "Fire makes an altar",
      description: "Fire makes an altar",
      image: "/assets/Snapshots/My Captures/fire-makes-an-altar.jpeg",
      media: [
        "/assets/Snapshots/My Captures/fire-makes-an-altar.jpeg",
      ],
    },
    {
      id: "heart-recognizes-hope",
      title: "Heart recognizes hope",
      teaser: "Heart recognizes hope",
      description: "Heart recognizes hope",
      image: "/assets/Snapshots/My Captures/heart-recognizes-hope.jpeg",
      media: [
        "/assets/Snapshots/My Captures/heart-recognizes-hope.jpeg",
      ],
    },
    {
      id: "hope-arrives-through-storms",
      title: "Hope arrives through storms",
      teaser: "Hope arrives through storms",
      description: "Hope arrives through storms",
      image: "/assets/Snapshots/My Captures/hope-arrives-through-storms.jpeg",
      media: [
        "/assets/Snapshots/My Captures/hope-arrives-through-storms.jpeg",
      ],
    },
    {
      id: "horizon-keeps-its-promises",
      title: "Horizon keeps its promises",
      teaser: "Horizon keeps its promises",
      description: "Horizon keeps its promises",
      image: "/assets/Snapshots/My Captures/horizon-keeps-its-promises.jpeg",
      media: [
        "/assets/Snapshots/My Captures/horizon-keeps-its-promises.jpeg",
      ],
    },
    {
      id: "light-finds-us-through-change",
      title: "Light finds us through change",
      teaser: "Light finds us through change",
      description: "Light finds us through change",
      image: "/assets/Snapshots/My Captures/light-finds-us-through-change.jpeg",
      media: [
        "/assets/Snapshots/My Captures/light-finds-us-through-change.jpeg",
      ],
    },
    {
      id: "light-proves-the-morning",
      title: "Light proves the morning",
      teaser: "Light proves the morning",
      description: "Light proves the morning",
      image: "/assets/Snapshots/My Captures/light-proves-the-morning.jpeg",
      media: [
        "/assets/Snapshots/My Captures/light-proves-the-morning.jpeg",
      ],
    },
    {
      id: "loneliness-lit-from-within",
      title: "Loneliness lit from within",
      teaser: "Loneliness lit from within",
      description: "Loneliness lit from within",
      image: "/assets/Snapshots/My Captures/loneliness-lit-from-within.jpeg",
      media: [
        "/assets/Snapshots/My Captures/loneliness-lit-from-within.jpeg",
      ],
    },
    {
      id: "moon-lingers-after-letting-go",
      title: "Moon lingers after letting go",
      teaser: "Moon lingers after letting go",
      description: "Moon lingers after letting go",
      image: "/assets/Snapshots/My Captures/moon-lingers-after-letting-go.jpeg",
      media: [
        "/assets/Snapshots/My Captures/moon-lingers-after-letting-go.jpeg",
      ],
    },
    {
      id: "moon-needs-no-permission",
      title: "Moon needs no permission",
      teaser: "Moon needs no permission",
      description: "Moon needs no permission",
      image: "/assets/Snapshots/My Captures/moon-needs-no-permission.jpeg",
      media: [
        "/assets/Snapshots/My Captures/moon-needs-no-permission.jpeg",
      ],
    },
    {
      id: "mountains-hold-their-secrets",
      title: "Mountains hold their secrets",
      teaser: "Mountains hold their secrets",
      description: "Mountains hold their secrets",
      image: "/assets/Snapshots/My Captures/mountains-hold-their-secrets.jpeg",
      media: [
        "/assets/Snapshots/My Captures/mountains-hold-their-secrets.jpeg",
      ],
    },
    {
      id: "moving-without-directions",
      title: "Moving without directions",
      teaser: "Moving without directions",
      description: "Moving without directions",
      image: "/assets/Snapshots/My Captures/moving-without-directions.jpeg",
      media: [
        "/assets/Snapshots/My Captures/moving-without-directions.jpeg",
      ],
    },
    {
      id: "night-carries-private-silence",
      title: "Night carries private silence",
      teaser: "Night carries private silence",
      description: "Night carries private silence",
      image: "/assets/Snapshots/My Captures/night-carries-private-silence.jpeg",
      media: [
        "/assets/Snapshots/My Captures/night-carries-private-silence.jpeg",
      ],
    },
    {
      id: "nights-gather-us-close",
      title: "Nights gather us close",
      teaser: "Nights gather us close",
      description: "Nights gather us close",
      image: "/assets/Snapshots/My Captures/nights-gather-us-close.jpeg",
      media: [
        "/assets/Snapshots/My Captures/nights-gather-us-close.jpeg",
      ],
    },
    {
      id: "ordinary-streets-wait-to-glow",
      title: "Ordinary streets wait to glow",
      teaser: "Ordinary streets wait to glow",
      description: "Ordinary streets wait to glow",
      image: "/assets/Snapshots/My Captures/ordinary-streets-wait-to-glow.jpeg",
      media: [
        "/assets/Snapshots/My Captures/ordinary-streets-wait-to-glow.jpeg",
      ],
    },
    {
      id: "peace-needs-no-rush",
      title: "Peace needs no rush",
      teaser: "Peace needs no rush",
      description: "Peace needs no rush",
      image: "/assets/Snapshots/My Captures/peace-needs-no-rush.jpeg",
      media: [
        "/assets/Snapshots/My Captures/peace-needs-no-rush.jpeg",
      ],
    },
    {
      id: "quiet-shelter-outlasts-winter",
      title: "Quiet shelter outlasts winter",
      teaser: "Quiet shelter outlasts winter",
      description: "Quiet shelter outlasts winter",
      image: "/assets/Snapshots/My Captures/quiet-shelter-outlasts-winter.jpeg",
      media: [
        "/assets/Snapshots/My Captures/quiet-shelter-outlasts-winter.jpeg",
      ],
    },
    {
      id: "road-bends-beyond-certainty",
      title: "Road bends beyond certainty",
      teaser: "Road bends beyond certainty",
      description: "Road bends beyond certainty",
      image: "/assets/Snapshots/My Captures/road-bends-beyond-certainty.jpeg",
      media: [
        "/assets/Snapshots/My Captures/road-bends-beyond-certainty.jpeg",
      ],
    },
    {
      id: "roads-teach-slow-arrivals",
      title: "Roads teach slow arrivals",
      teaser: "Roads teach slow arrivals",
      description: "Roads teach slow arrivals",
      image: "/assets/Snapshots/My Captures/roads-teach-slow-arrivals.jpeg",
      media: [
        "/assets/Snapshots/My Captures/roads-teach-slow-arrivals.jpeg",
      ],
    },
    {
      id: "roots-teach-the-sky",
      title: "Roots teach the sky",
      teaser: "Roots teach the sky",
      description: "Roots teach the sky",
      image: "/assets/Snapshots/My Captures/roots-teach-the-sky.jpeg",
      media: [
        "/assets/Snapshots/My Captures/roots-teach-the-sky.jpeg",
      ],
    },
    {
      id: "sky-keeps-unsaid-thoughts",
      title: "Sky keeps unsaid thoughts",
      teaser: "Sky keeps unsaid thoughts",
      description: "Sky keeps unsaid thoughts",
      image: "/assets/Snapshots/My Captures/sky-keeps-unsaid-thoughts.jpeg",
      media: [
        "/assets/Snapshots/My Captures/sky-keeps-unsaid-thoughts.jpeg",
      ],
    },
    {
      id: "sky-writes-departures",
      title: "Sky writes departures",
      teaser: "Sky writes departures",
      description: "Sky writes departures",
      image: "/assets/Snapshots/My Captures/sky-writes-departures.jpeg",
      media: [
        "/assets/Snapshots/My Captures/sky-writes-departures.jpeg",
      ],
    },
    {
      id: "soft-endings-feel-like-forgiveness",
      title: "Soft endings feel like forgiveness",
      teaser: "Soft endings feel like forgiveness",
      description: "Soft endings feel like forgiveness",
      image: "/assets/Snapshots/My Captures/soft-endings-feel-like-forgiveness.jpeg",
      media: [
        "/assets/Snapshots/My Captures/soft-endings-feel-like-forgiveness.jpeg",
      ],
    },
    {
      id: "solitude-meets-the-self",
      title: "Solitude meets the self",
      teaser: "Solitude meets the self",
      description: "Solitude meets the self",
      image: "/assets/Snapshots/My Captures/solitude-meets-the-self.jpeg",
      media: [
        "/assets/Snapshots/My Captures/solitude-meets-the-self.jpeg",
      ],
    },
    {
      id: "stillness-holds-tenderness",
      title: "Stillness holds tenderness",
      teaser: "Stillness holds tenderness",
      description: "Stillness holds tenderness",
      image: "/assets/Snapshots/My Captures/stillness-holds-tenderness.jpeg",
      media: [
        "/assets/Snapshots/My Captures/stillness-holds-tenderness.jpeg",
      ],
    },
    {
      id: "sun-remembers-us-after-rain",
      title: "Sun remembers us after rain",
      teaser: "Sun remembers us after rain",
      description: "Sun remembers us after rain",
      image: "/assets/Snapshots/My Captures/sun-remembers-us-after-rain.jpeg",
      media: [
        "/assets/Snapshots/My Captures/sun-remembers-us-after-rain.jpeg",
      ],
    },
    {
      id: "thin-moon-reminds-the-dark",
      title: "Thin moon reminds the dark",
      teaser: "Thin moon reminds the dark",
      description: "Thin moon reminds the dark",
      image: "/assets/Snapshots/My Captures/thin-moon-reminds-the-dark.jpeg",
      media: [
        "/assets/Snapshots/My Captures/thin-moon-reminds-the-dark.jpeg",
      ],
    },
    {
      id: "warmth-makes-wilderness-home",
      title: "Warmth makes wilderness home",
      teaser: "Warmth makes wilderness home",
      description: "Warmth makes wilderness home",
      image: "/assets/Snapshots/My Captures/warmth-makes-wilderness-home.jpeg",
      media: [
        "/assets/Snapshots/My Captures/warmth-makes-wilderness-home.jpeg",
      ],
    },
    {
      id: "where-gravity-whispers-earth-lets-go",
      title: "Where gravity whispers earth lets go",
      teaser: "Where gravity whispers earth lets go",
      description: "Where gravity whispers earth lets go",
      image: "/assets/Snapshots/My Captures/where-gravity-whispers-earth-lets-go.mp4",
      media: [
        "/assets/Snapshots/My Captures/where-gravity-whispers-earth-lets-go.mp4",
      ],
    },
    {
      id: "windows-against-the-dark",
      title: "Windows against the dark",
      teaser: "Windows against the dark",
      description: "Windows against the dark",
      image: "/assets/Snapshots/My Captures/windows-against-the-dark.jpeg",
      media: [
        "/assets/Snapshots/My Captures/windows-against-the-dark.jpeg",
      ],
    },
    {
      id: "winter-cannot-erase-home",
      title: "Winter cannot erase home",
      teaser: "Winter cannot erase home",
      description: "Winter cannot erase home",
      image: "/assets/Snapshots/My Captures/winter-cannot-erase-home.jpeg",
      media: [
        "/assets/Snapshots/My Captures/winter-cannot-erase-home.jpeg",
      ],
    },
    {
      id: "winter-keeps-the-moon-close",
      title: "Winter keeps the moon close",
      teaser: "Winter keeps the moon close",
      description: "Winter keeps the moon close",
      image: "/assets/Snapshots/My Captures/winter-keeps-the-moon-close.jpeg",
      media: [
        "/assets/Snapshots/My Captures/winter-keeps-the-moon-close.jpeg",
      ],
    },
    {
      id: "world-becomes-possible",
      title: "World becomes possible",
      teaser: "World becomes possible",
      description: "World becomes possible",
      image: "/assets/Snapshots/My Captures/world-becomes-possible.jpeg",
      media: [
        "/assets/Snapshots/My Captures/world-becomes-possible.jpeg",
      ],
    },
  ],
};

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export const contactLinks: ContactLink[] = [
  { label: "Gmail", value: "mtalal.aqdas@gmail.com", href: "mailto:mtalal.aqdas@gmail.com" },
  { label: "Apple Mail", value: "mtalal.aqdas@icloud.com", href: "mailto:mtalal.aqdas@icloud.com" },
  { label: "WhatsApp", value: "+92 371 1362229", href: "https://wa.me/923711362229" },
  { label: "LinkedIn", value: "muhammad-talal-aqdas", href: "https://pk.linkedin.com/in/muhammad-talal-aqdas-6a37a43a6" },
  { label: "GitHub", value: "muhammad-talal-aqdas", href: "https://github.com/muhammad-talal-aqdas" },
];

export const secondaryContactLinks: ContactLink[] = [
  { label: "Instagram", value: "muhammadd_talal", href: "https://instagram.com/muhammadd_talal" },
  { label: "Facebook", value: "talal.king.710", href: "https://www.facebook.com/talal.king.710" },
];

export const contactNote = "Also reachable via Slack or Teams on request";

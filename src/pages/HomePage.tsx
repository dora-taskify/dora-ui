import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Layers,
    Zap,
    Smartphone,
    Users,
    Shield,
} from "lucide-react";

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-primary">Dora.co</h1>
                    <div className="flex gap-4">
                        <Button
                            variant="ghost"
                            className="text-gray-700 hover:text-primary"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Login
                        </Button>
                        <Button
                            className="bg-primary text-white px-6"
                            onClick={() => (window.location.href = "/register")}
                            >
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>
]
            <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-6 bg-gradient-to-b from-zinc-50 to-white">
                <h1 className="text-5xl font-bold leading-tight">
                    Organize Your <span className="text-primary">Projects</span> <br />
                    With Ease & Clarity
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                    Keep all your tasks, notes, and ideas in one place. Clean, fast, and
                    accessible anywhere.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Button
                        className="bg-primary text-white px-6 py-3 rounded-xl"
                        onClick={() => (window.location.href = "/register")}
                    >
                        Start for Free
                    </Button>
                </div>
            </section>
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Why Choose Dora?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                        {
                            icon: Layers,
                            title: "Flexible Boards",
                            desc: "Organize tasks with customizable boards for teams or personal use.",
                        },
                        {
                            icon: Zap,
                            title: "Fast & Lightweight",
                            desc: "Built with modern tech for a blazing fast experience.",
                        },
                        {
                            icon: Smartphone,
                            title: "Mobile Friendly",
                            desc: "Optimized for mobile screens so you can stay productive anywhere.",
                        },
                        {
                            icon: Users,
                            title: "Easy Collaboration",
                            desc: "Invite teammates to collaborate seamlessly.",
                        },
                        {
                            icon: CheckCircle2,
                            title: "Task Prioritization",
                            desc: "Highlight important tasks so deadlines never slip.",
                        },
                        {
                            icon: Shield,
                            title: "Secure & Reliable",
                            desc: "Your data is encrypted and protected with best practices.",
                        },
                        ].map((f, i) => (
                        <div
                            key={i}
                            className="p-6 bg-zinc-50 rounded-2xl shadow hover:shadow-md transition"
                        >
                            <f.icon className="text-primary w-10 h-10 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="text-gray-600">{f.desc}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-zinc-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            See <span className="text-primary">Dora</span> in Action
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Dora helps you stay focused and organized with a clean, intuitive
                            interface. Manage tasks, track progress, and collaborate with ease —
                            whether you’re working solo or with a team.
                        </p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                Drag & drop tasks across boards
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                Prioritize tasks with labels & deadlines
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary"></span>
                                Designed for mobile & desktop
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl shadow-xl overflow-hidden border border-zinc-200">
                    <img
                        src="/preview.png"
                        alt="MyBoards preview"
                        className="w-full h-auto object-cover"
                    />
                    </div>
                </div>
            </section>


            <section className="py-20 px-6 bg-primary text-white text-center">
                <h2 className="text-4xl font-bold mb-4">
                    Ready to Boost Your Productivity?
                </h2>
                <p className="mb-8 text-lg">
                    Start using Dora today and experience the difference.
                </p>
                <Button
                    className="bg-white text-primary hover:bg-primary-shade font-semibold px-8 py-3 rounded-xl"
                    onClick={() => (window.location.href = "/register")}
                >
                    Get Started Free
                </Button>
            </section>

            <footer className="bg-zinc-900 text-zinc-400 py-10 px-6 mt-auto">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                    <p>© {new Date().getFullYear()} Dora. All rights reserved.</p>
                    <p>
                        Developed by{" "}
                        <a
                        href="https://your-portfolio-link.com"
                        className="text-primary hover:underline"
                        >
                            Team Taskify
                        </a>
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
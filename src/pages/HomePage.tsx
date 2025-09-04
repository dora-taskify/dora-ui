import { Button } from "@/components/ui/button";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
            <div className="text-center max-w-2xl space-y-6">
                <h1 className="text-5xl font-bold text-gray-800">
                    Selamat Datang di <span className="text-primary">MyBoards</span>
                </h1>
                <p className="text-gray-600 text-lg">
                    Satu tempat untuk mengatur proyek, ide, dan catatanmu. 
                    Rapi, terorganisir, dan mudah diakses kapan saja.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Button
                        variant="ghost"
                        className="cursor-pointer px-6 py-3 rounded-2xl text-lg text-primary border-zinc-400 border hover:text-primary-shade"
                        onClick={() => (window.location.href = "/login")}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

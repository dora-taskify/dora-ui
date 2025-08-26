const SplashScreen = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white gap-4 overflow-hidden z-50">
            <img src="/Dora.png" alt="dora" width={80}/>
            <div className="w-6 h-6 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default SplashScreen;
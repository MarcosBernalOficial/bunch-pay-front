import { useEffect, useState } from "react";

const LoadingScreen = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const alreadyLoaded = localStorage.getItem("alreadyLoaded");

        if (!alreadyLoaded) {
        setLoading(true);
        localStorage.setItem("alreadyLoaded", "true");

        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // 2 segundos de splash screen

        return () => clearTimeout(timer);
        } else {
        // Ya cargó antes, mostrar contenido directo
        setLoading(false);
        }
    }, []);

    if (loading) {
        return (
        <div className="flex items-center justify-center h-screen bg-blue-dark">
            <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-accent text-lg font-semibold">Bunch Pay</p>
            </div>
        </div>
        );
    }

    return <>{children}</>;
};

export default LoadingScreen;

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowRightArrowLeft, faTag, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function MainDashboard() {
    const [showBalance, setShowBalance] = useState(false);

    const servicios = [
        { nombre: "Sube", ruta: "/servicios/sube" },
        { nombre: "Agua", ruta: "/servicios/agua" },
        { nombre: "Gas", ruta: "/servicios/gas" },
        { nombre: "Celular", ruta: "/servicios/celular" },
    ];

    return (
        <div className="flex flex-col h-full bg-surface max-w-sm w-full mx-auto">
        <Header />

        <main className="flex-grow overflow-y-auto px-4 py-2 space-y-4">
            {/* Saldo box */}
            <div className="bg-surface p-4 rounded-xl shadow-md border border-primary/50 flex flex-col">
            <div className="inline-flex justify-between items-center mb-2">
                <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="flex items-center gap-2 text-primary font-texto text-sm hover:underline transition duration-300"
                    >
                    <FontAwesomeIcon icon={showBalance ? faEyeSlash : faEye} />
                    {showBalance ? "Ocultar saldo" : "Mostrar saldo"}
                </button>
            </div>
            <div className="text-2xl font-titulo mb-4 text-primary truncate">
                {showBalance ? "$ 25,000.00" : "$ **** **"}
            </div>
            <div className="flex justify-between mb-4 font-texto">
                <ActionButton icon={<FontAwesomeIcon icon={faPlus} />} label="Ingresar" />
                <ActionButton icon={<FontAwesomeIcon icon={faArrowRightArrowLeft} />} label="Transferir" />
                <ActionButton icon={<FontAwesomeIcon icon={faTag} />} label="Alias/CVU" />
                <ActionButton icon={<FontAwesomeIcon icon={faCreditCard} />} label="Tarjeta" />
            </div>
            <button className="w-full bg-surface text-primary font-texto border border-primary/50 py-2 rounded hover:bg-primary hover:text-surface transition-colors duration-300">
                Movimientos
            </button>
            </div>

            {/* Servicios */}
            <div className="bg-surface border border-primary/50 py-3 rounded-xl text-center text-primary font-titulo">
            Servicios
            <div className="grid grid-cols-4 gap-2 mt-3 px-2">
                {servicios.map((servicio) => (
                <Link
                    key={servicio.nombre}
                    to={servicio.ruta}
                    className="bg-surface border border-primary/50 font-texto rounded-md h-12 flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-surface transition-all duration-300 text-sm font-semibold"
                >
                    {servicio.nombre}
                </Link>
                ))}
            </div>
            </div>

            {/* Beneficios y Rendimientos */}
            <div className="flex gap-4">
            <div className="flex-1 shadow-md rounded-xl p-3 bg-surface border border-primary/50">
                <h2 className="text-sm font-titulo mb-3 text-primary text-center">Beneficios</h2>
                <div className="overflow-y-auto max-h-32 pr-1 font-texto space-y-2 hide-scrollbar">
                <BenefitBox text="40% OFF Starbucks" bgColor="bg-green-300" />
                <BenefitBox text="25% OFF Día" bgColor="bg-pink-300" />
                <BenefitBox text="10% OFF Amazon" bgColor="bg-yellow-300" />
                <BenefitBox text="15% OFF Spotify" bgColor="bg-blue-300" />
                </div>
            </div>

            <div className="flex-1 shadow-md rounded-xl p-3 bg-surface border border-primary/50">
                <h2 className="text-sm font-titulo mb-3 text-primary text-center">Rendimientos</h2>
                <YieldBox label="Hoy" value="$12,3" />
                <YieldBox label="Total" value="$2.123,4" />
            </div>
            </div>
        </main>

        <Footer />
        </div>
    );
    }

    function ActionButton({ icon, label }) {
    return (
        <button className="flex flex-col items-center">
        <span className="bg-primary text-surface rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-md hover:bg-surface hover:text-primary hover:shadow-sm hover:shadow-primary transition-colors duration-300">
            {icon}
        </span>
        <span className="text-xs mt-1 text-primaryLight">{label}</span>
        </button>
    );
    }

    function BenefitBox({ text, bgColor }) {
    return (
        <div className={`${bgColor} text-background p-2 text-center text-sm shadow-sm`}>
        {text}
        </div>
    );
    }

    function YieldBox({ label, value }) {
    return (
        <div className="bg-background flex justify-between items-center mb-2 rounded-md p-2 shadow-sm my-4">
        <span className="text-primary font-texto text-md py-1">{label}</span>
        <div className="font-texto rounded-md min-w-[56px] h-6 px-2 shadow-inner text-center text-accent truncate">
            {value}
        </div>
        </div>
    );
}

export default MainDashboard;

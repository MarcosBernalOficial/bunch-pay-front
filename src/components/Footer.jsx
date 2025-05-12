import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWallet,
    faFileInvoiceDollar,
    faHouse,
    faPercent,
    faChartLine,
    } from '@fortawesome/free-solid-svg-icons';
    import { Link } from 'react-router-dom';

    function Footer() {
    const icons = [
        <FontAwesomeIcon icon={faWallet} />,
        <FontAwesomeIcon icon={faFileInvoiceDollar} />,
        <FontAwesomeIcon icon={faHouse} />,
        <FontAwesomeIcon icon={faPercent} />,
        <FontAwesomeIcon icon={faChartLine} />,
    ];

    return (
        <footer className="bg-surface py-3  border-t border-primary/50">
        <div className="max-w-sm mx-auto flex justify-around">
            {icons.map((icon, index) => {
            const iconElement = (
                <div
                className="w-12 h-12 bg-surface rounded-md shadow-md hover:bg-primary hover:text-surface transition-colors duration-300 flex items-center justify-center text-primary text-xl"
                >
                {icon}
                </div>
            );

            return index === 2 ? (
                <Link to="/" key={index}>
                {iconElement}
                </Link>
            ) : (
                <div key={index}>{iconElement}</div>
            );
            })}
        </div>
        </footer>
    );
}

export default Footer;

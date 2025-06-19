import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrainSubway,
    faMobileScreen,
} from '@fortawesome/free-solid-svg-icons';
import { faSteam } from '@fortawesome/free-brands-svg-icons';
import ServiceRechargeModal from './ServiceRechargeModal';
import DiscountCoupons from './DiscountCoupons';
import api from '../utils/api';
import DashboardFooter from '../components/DashboardFooter';

export default function BenefitsAndServices() {
    const [showRecharge, setShowRecharge] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [rechargeLoading, setRechargeLoading] = useState(false);
    const [errorRecharge, setErrorRecharge] = useState('');
    const [modalKey, setModalKey] = useState(0);

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setShowRecharge(true);
        setErrorRecharge('');
    };

    const handleSubmitRecharge = async (form) => {
        setRechargeLoading(true);
        setErrorRecharge('');
        try {
            await api.post('/api/recharge/service', {
                ...form,
                serviceType: selectedService,
            });
            setShowRecharge(false);
            setModalKey(k => k + 1);
        } catch (err) {
            console.log(err)
            setErrorRecharge(
                err?.response?.data?.message ||
                'Error al procesar la recarga. Verificá tu saldo o los datos ingresados.'
            );
        } finally {
            setRechargeLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowRecharge(false);
        setErrorRecharge('');
        setModalKey(k => k + 1);
    };

    return (
        <div className="min-h-screen bg-blue-dark flex flex-col items-center py-10">
            <div className="w-full max-w-lg bg-blue-mid rounded-2xl border border-blue-accent shadow-xl p-6 space-y-10">
                <div>
                    <h2 className="text-2xl font-bold text-blue-accent text-center mb-6">Servicios</h2>
                    <div className="grid grid-cols-3 gap-6 text-sm text-center">
                        <button
                            className="bg-blue-accent p-4 rounded-xl border border-blue-accent flex flex-col items-center gap-2"
                            onClick={() => handleServiceClick('SUBE')}
                        >
                            <FontAwesomeIcon icon={faTrainSubway} className="text-2xl" />
                            SUBE
                        </button>
                        <button
                            className="bg-blue-accent p-4 rounded-xl border border-blue-accent flex flex-col items-center gap-2"
                            onClick={() => handleServiceClick('CELULAR')}
                        >
                            <FontAwesomeIcon icon={faMobileScreen} className="text-2xl" />
                            Celular
                        </button>
                        <button
                            className="bg-blue-accent p-4 rounded-xl border border-blue-accent flex flex-col items-center gap-2"
                            onClick={() => handleServiceClick('STEAM')}
                        >
                            <FontAwesomeIcon icon={faSteam} className="text-2xl" />
                            Steam
                        </button>
                    </div>
                </div>
                <div>
                    <DiscountCoupons />
                </div>
                <div className="w-full px-4 py-4 border-t border-blue-accent">
                    <div className="max-w-screen-xl mx-auto">
                        <DashboardFooter />
                    </div>
                </div>
            </div>
            <ServiceRechargeModal
                key={modalKey}
                open={showRecharge}
                onClose={handleCloseModal}
                serviceType={selectedService}
                onSubmit={handleSubmitRecharge}
                loading={rechargeLoading}
                error={errorRecharge}
            />
        </div>
    );
}

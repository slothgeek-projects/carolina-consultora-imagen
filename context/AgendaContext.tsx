'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Account, Branch, Professional, Schedule, Service } from '@/lib/definitions';
import { fetchAccountOrderProfessional, fetchAccountOrderServices } from '@/data/account';
import { fetchProfessionalAvailability, fetchServiceAvailability } from '@/controller/professional';

// Tipos para el contexto
interface AgendaContextType {
    account: Account | null;
    branches: Branch[];
    services: Service[];
    professionals: Professional[];
    schedule: Schedule[];
    loadingSchedule: boolean;
    canSendForm: boolean;
    sendingForm: boolean;
    hours: any[];
    selectedService?: any;
    selectedVariation?: any;
    selectedProfessional?: any;
    selectedBranch?: any;
    selectedDate?: string;
    selectedTime?: string;
    appointmentData?: any;
    setHours: (hours: any[]) => void;
    setSelectedService: (service: any) => void;
    setSelectedVariation: (variation: any) => void;
    setSelectedProfessional: (professional: any) => void;
    setSelectedBranch: (branch: any) => void;
    setSelectedDate: (date: string) => void;
    setSelectedTime: (time: string) => void;
    setAppointmentData: (data: any) => void;
    setCanSendForm: (canSendForm: boolean) => void;
    setSendingForm: (sendingForm: boolean) => void;
    submitForm: (() => void) | null;
    setSubmitForm: (fn: (() => void) | null) => void;
    clearSelections: () => void;
    goBack: () => void;
    isFormComplete: () => boolean;
    step: number;
    setStep: (step: number) => void;
}

// Contexto
const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

// Props para el provider
interface AgendaProviderProps {
    children: ReactNode;
    account: Account;
}

// Provider del contexto
export function AgendaProvider({ children, account }: AgendaProviderProps) {
    const [branches, setBranches] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [professionals, setProfessionals] = useState<any[]>([]);
    const [canSendForm, setCanSendForm] = useState<boolean>(false);
    const [sendingForm, setSendingForm] = useState<boolean>(false);
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loadingSchedule, setLoadingSchedule] = useState<boolean>(false);
    const [hours, setHours] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [selectedVariation, setSelectedVariation] = useState<any>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
    const [selectedBranch, setSelectedBranch] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [appointmentData, setAppointmentData] = useState<any>(null);
    const [step, setStep] = useState<number>(0);
    const [submitForm, setSubmitFormState] = useState<(() => void) | null>(null);

    // React trata las funciones como lazy initializers en setState; el wrapper externo evita eso
    const setSubmitForm = (fn: (() => void) | null) => {
        setSubmitFormState(fn === null ? null : () => fn);
    };

    useEffect(() => {
        if (account.theme === 'service' || account.theme === 'service-without-professional') {
            fetchAccountOrderServices(account.documentId).then((data) => {
                setBranches(data.branches);
            });
        } else if (account.theme === 'professional') {
            fetchAccountOrderProfessional(account.documentId).then((data) => {
                setBranches(data.branches);
            });
        }
    }, [account]);

    useEffect(() => {
        if (selectedBranch) {
            if (account.theme === 'service' || account.theme === 'service-without-professional') {
                setServices(selectedBranch.services);
            } else if (account.theme === 'professional') {
                setProfessionals(selectedBranch.professionals);
            }
            setStep(step + 1);
        }
    }, [selectedBranch]);

    useEffect(() => {
        if (selectedDate) {
            setHours(schedule[selectedDate as keyof typeof schedule]);
            setStep(step + 1);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (selectedTime) {
            setStep(step + 1);
        }
    }, [selectedTime]);

    useEffect(() => {
        if (!selectedService || !selectedBranch) return;

        if (account.theme === 'service') {
            if (selectedService.type === 'variable' && selectedVariation) {
                setProfessionals(selectedService.professionals);
                setStep(step + 1);
            }
    
            if (selectedService.type === 'simple') {
                setProfessionals(selectedService.professionals);
                setStep(step + 1);
            }
        }

        if (account.theme === 'professional' && selectedProfessional) {
            setLoadingSchedule(true);
            const serviceDuration = selectedService.type === 'variable' ? selectedService.serviceVariation.find((variation: any) => variation.uid === selectedVariation)?.duration : selectedService.durationInMinutes;
            const interval = account.timeInterval || 60;
            fetchProfessionalAvailability(selectedProfessional.documentId, serviceDuration, interval).then((data) => {
                setSchedule(data);
                setStep(step + 1);
            }).finally(() => {
                setLoadingSchedule(false);
            });
        }

        if (account.theme === 'service-without-professional') {
            setLoadingSchedule(true);
            const serviceDuration = selectedService.type === 'variable' ? selectedService.serviceVariation.find((variation: any) => variation.uid === selectedVariation)?.duration : selectedService.durationInMinutes;
            fetchServiceAvailability(selectedService.documentId, selectedBranch.documentId, serviceDuration).then((data) => {
                setSchedule(data);
                setStep(step + 1);
            }).finally(() => {
                setLoadingSchedule(false);
            });
        }

    }, [selectedService, selectedVariation]);

    useEffect(() => {
        if (account.theme === 'service' && selectedProfessional) {
            setLoadingSchedule(true);
            const serviceDuration = selectedService.type === 'variable' ? selectedService.serviceVariation.find((variation: any) => variation.uid === selectedVariation)?.duration : selectedService.durationInMinutes;
            const interval = account.timeInterval || 60;
            fetchProfessionalAvailability(selectedProfessional.documentId, serviceDuration, interval).then((data) => {
                setSchedule(data);
                setStep(step + 1);
            }).finally(() => {
                setLoadingSchedule(false);
            });
        }

        if (account.theme === 'professional' && selectedProfessional) {
            setServices(selectedProfessional.services);
            setStep(step + 1);
        }
    }, [selectedProfessional]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    // Función para limpiar todas las selecciones
    const clearSelections = () => {
        setServices([]);
        setProfessionals([]);
        setSchedule([]);
        setHours([]);
        setSelectedService(null);
        setSelectedVariation(null);
        setSelectedProfessional(null);
        setSelectedBranch(null);
        setSelectedDate('');
        setSelectedTime('');
        setAppointmentData(null);
        setStep(0);
        setCanSendForm(false);
        setSubmitForm(null);
    };

    // Función para retroceder al paso anterior limpiando las selecciones dependientes.
    // Limpia la selección del paso DESTINO (paso - 1) y todo lo que viene después,
    // para que React detecte el cambio cuando el usuario re-selecciona la misma opción.
    const goBack = () => {
        if (step <= 1) {
            clearSelections();
            return;
        }

        // Mapa indexado por paso DESTINO (paso al que se llega), por tema.
        // Limpia la selección de ese paso y toda la cascada aguas abajo.
        const clearForDestination: Record<string, Record<number, () => void>> = {
            'professional': {
                // Destino paso 1 (branch): limpiar branch + todo
                1: () => {
                    setSelectedBranch(null);
                    setProfessionals([]);
                    setSelectedProfessional(null);
                    setServices([]);
                    setSelectedService(null);
                    setSelectedVariation(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                // Destino paso 2 (professional): limpiar professional + todo aguas abajo
                2: () => {
                    setSelectedProfessional(null);
                    setServices([]);
                    setSelectedService(null);
                    setSelectedVariation(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                // Destino paso 3 (service): limpiar service + aguas abajo
                3: () => {
                    setSelectedService(null);
                    setSelectedVariation(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                // Destino paso 4 (date): limpiar date + aguas abajo
                4: () => { setSelectedDate(''); setHours([]); setSelectedTime(''); },
                // Destino paso 5 (hour): limpiar time
                5: () => { setSelectedTime(''); },
                6: () => { setCanSendForm(false); setSendingForm(false); },
            },
            'service': {
                1: () => {
                    setSelectedBranch(null);
                    setServices([]);
                    setSelectedService(null);
                    setSelectedVariation(null);
                    setProfessionals([]);
                    setSelectedProfessional(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                2: () => {
                    setSelectedService(null);
                    setSelectedVariation(null);
                    setProfessionals([]);
                    setSelectedProfessional(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                3: () => {
                    setSelectedProfessional(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                4: () => { setSelectedDate(''); setHours([]); setSelectedTime(''); },
                5: () => { setSelectedTime(''); },
                6: () => { setCanSendForm(false); setSendingForm(false); },
            },
            'service-without-professional': {
                1: () => {
                    setSelectedBranch(null);
                    setServices([]);
                    setSelectedService(null);
                    setSelectedVariation(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                2: () => {
                    setSelectedService(null);
                    setSelectedVariation(null);
                    setSchedule([]);
                    setSelectedDate('');
                    setHours([]);
                    setSelectedTime('');
                },
                3: () => { setSelectedDate(''); setHours([]); setSelectedTime(''); },
                4: () => { setSelectedTime(''); },
                6: () => { setCanSendForm(false); setSendingForm(false); },
            },
        };

        const destination = step - 1;

        // Si el destino es el paso de sucursal y solo hay una activa,
        // no tiene sentido mostrarla: volver al inicio directamente.
        if (destination === 1) {
            const activeBranches = branches.filter((b) => !b.disabled);
            if (activeBranches.length === 1) {
                clearSelections();
                return;
            }
        }

        const clear = clearForDestination[account.theme]?.[destination];
        if (clear) clear();

        setStep(destination);
    };

    // Función para verificar si el formulario está completo
    const isFormComplete = () => {
        const requiredFields = {
            service: selectedService,
            branch: selectedBranch,
            date: selectedDate,
            time: selectedTime,
        };

        // Para temas que requieren profesional
        if (account.theme === 'professional' && !selectedProfessional) {
            return false;
        }

        return Object.values(requiredFields).every(field => field);
    };

    const value: AgendaContextType = {
        account,
        branches,
        services,
        professionals,
        schedule,
        loadingSchedule,
        hours,
        selectedService,
        selectedVariation,
        selectedProfessional,
        selectedBranch,
        selectedDate,
        selectedTime,
        appointmentData,
        canSendForm,
        sendingForm,
        setSendingForm,
        setCanSendForm,
        submitForm,
        setSubmitForm,
        setSelectedService,
        setSelectedVariation,
        setSelectedProfessional,
        setSelectedBranch,
        setSelectedDate,
        setSelectedTime,
        setHours,
        setAppointmentData,
        clearSelections,
        goBack,
        isFormComplete,
        step,
        setStep,
    };

    return (
        <AgendaContext.Provider value={value}>
            {children}
        </AgendaContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useAgenda() {
    const context = useContext(AgendaContext);
    if (context === undefined) {
        throw new Error('useAgenda debe ser usado dentro de un AgendaProvider');
    }
    return context;
}

// Hook para obtener solo la cuenta
export function useAccount() {
    const context = useContext(AgendaContext);
    if (context === undefined) {
        throw new Error('useAccount debe ser usado dentro de un AgendaProvider');
    }
    return context.account;
}

// Hook para obtener solo los datos de la cita
export function useAppointmentData() {
    const context = useContext(AgendaContext);
    if (context === undefined) {
        throw new Error('useAppointmentData debe ser usado dentro de un AgendaProvider');
    }
    return {
        branches: context.branches,
        services: context.services,
        professionals: context.professionals,
        schedule: context.schedule,
        loadingSchedule: context.loadingSchedule,
        hours: context.hours,
        selectedService: context.selectedService,
        selectedVariation: context.selectedVariation,
        selectedProfessional: context.selectedProfessional,
        selectedBranch: context.selectedBranch,
        selectedDate: context.selectedDate,
        selectedTime: context.selectedTime,
        appointmentData: context.appointmentData,
        setSelectedService: context.setSelectedService,
        setSelectedVariation: context.setSelectedVariation,
        setSelectedProfessional: context.setSelectedProfessional,
        setSelectedBranch: context.setSelectedBranch,
        setSelectedDate: context.setSelectedDate,
        setSelectedTime: context.setSelectedTime,
        setHours: context.setHours,
        setAppointmentData: context.setAppointmentData,
        clearSelections: context.clearSelections,
        goBack: context.goBack,
        isFormComplete: context.isFormComplete,
        step: context.step,
        setStep: context.setStep,
    };
} 
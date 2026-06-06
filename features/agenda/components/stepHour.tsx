'use client';

import { useEffect } from "react";
import { useAgenda } from "@/context/AgendaContext";
import { Button } from "@heroui/react";

export default function StepHour() {
    const { account, hours, selectedDate, setSelectedTime } = useAgenda();

    useEffect(() => {
        setSelectedTime('');
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold">¿Cuándo prefieres agendar tu cita?</h2>
                <p className="text-sm text-o-gray-300">Selecciona una fecha para continuar</p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
                {hours.map((hour, index) => (
                    <Button key={index} className="bg-primary w-full uppercase shadow-medium" size="lg" onPress={() => setSelectedTime(hour.start)}>
                        <span>{ new Date(selectedDate + ' ' + hour.start).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }) }</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}
'use client';

import { useAgenda, useAppointmentData } from '@/context/AgendaContext';

export default function AppointmentForm() {
    const { account } = useAgenda();
    const {
        selectedService,
        selectedProfessional,
        selectedBranch,
        selectedDate,
        selectedTime,
        setSelectedService,
        setSelectedProfessional,
        setSelectedBranch,
        setSelectedDate,
        setSelectedTime,
        isFormComplete,
        clearSelections
    } = useAppointmentData();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormComplete()) {
            console.log('Formulario completo:', {
                service: selectedService,
                professional: selectedProfessional,
                branch: selectedBranch,
                date: selectedDate,
                time: selectedTime
            });
            // Aquí iría la lógica para crear la cita
        }
    };

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Crear Cita</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Información de la cuenta */}
                <div className="bg-surface-secondary p-3 rounded">
                    <h3 className="font-semibold">Cuenta: {account?.name}</h3>
                    <p className="text-sm text-muted">Tema: {account?.theme}</p>
                </div>

                {/* Selección de servicio */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Servicio
                    </label>
                    <select 
                        value={selectedService?.id || ''} 
                        onChange={(e) => {
                            const service = account?.services?.find(s => s.id === e.target.value);
                            setSelectedService(service);
                        }}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Seleccionar servicio</option>
                        {account?.services?.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selección de profesional (solo si el tema lo requiere) */}
                {account?.theme === 'professional' && (
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Profesional
                        </label>
                        <select 
                            value={selectedProfessional?.id || ''} 
                            onChange={(e) => {
                                const professional = account?.proffesionals?.find(p => p.id === e.target.value);
                                setSelectedProfessional(professional);
                            }}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Seleccionar profesional</option>
                            {account?.proffesionals?.map(professional => (
                                <option key={professional.id} value={professional.id}>
                                    {professional.firstName} {professional.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Selección de sucursal */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Sucursal
                    </label>
                    <select 
                        value={selectedBranch?.id || ''} 
                        onChange={(e) => {
                            const branch = account?.branches?.find(b => b.id === e.target.value);
                            setSelectedBranch(branch);
                        }}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Seleccionar sucursal</option>
                        {account?.branches?.map(branch => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha y hora */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Fecha
                        </label>
                        <input 
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Hora
                        </label>
                        <input 
                            type="time" 
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex gap-2 pt-4">
                    <button 
                        type="submit"
                        disabled={!isFormComplete()}
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                    >
                        Crear Cita
                    </button>
                    <button 
                        type="button"
                        onClick={clearSelections}
                        className="px-4 py-2 border border-gray-300 rounded"
                    >
                        Limpiar
                    </button>
                </div>

                {/* Estado del formulario */}
                <div className="text-sm text-muted">
                    Formulario completo: {isFormComplete() ? '✅' : '❌'}
                </div>
            </form>
        </div>
    );
} 
import { useAgenda } from "@/context/AgendaContext";
import { ServiceVariation } from "@/lib/definitions";

export default function Navigation() {
    const { account, step, selectedBranch, selectedService, selectedProfessional, selectedDate, selectedTime, selectedVariation } = useAgenda();

    if (step === 7 || step === 0 || !account) {
        return null;
    }

    const variationName = selectedService?.serviceVariation.find((variation: ServiceVariation) => variation.uid === selectedVariation)?.name;

    const items = [
        { label: "Ubicación", value: selectedBranch?.name },
        { label: "Servicio", value: selectedService ? selectedService.name + (selectedVariation ? ' - ' + variationName : '') : undefined },
        ...(account.theme !== 'service-without-professional'
            ? [{ label: "Profesional", value: selectedProfessional ? selectedProfessional.firstName + ' ' + selectedProfessional.lastName : undefined }]
            : []),
        { label: "Fecha", value: selectedDate ? selectedDate.split('-').reverse().join('/') : undefined },
        { label: "Hora", value: selectedTime ? new Date(selectedDate + ' ' + selectedTime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }) : undefined },
    ].filter(item => item.value);

    if (items.length === 0) return null;

    return (
        <div className="flex flex-col gap-1.5 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-o-gray-300">Tu selección</h2>
            <div className="flex justify-center flex-wrap gap-1.5 text-sm">
                {items.map(item => (

                    <div key={item.label} className="flex items-center font-semibold px-2.5 py-0.5 bg-surface-secondary text-foreground rounded-full text-xs text-center">
                        <span
                            className="truncate max-w-[300px]"
                            title={item.value}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

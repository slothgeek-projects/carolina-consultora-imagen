'use client';

import { useAgenda } from "@/context/AgendaContext";
import { Button } from "@heroui/react";
import { Service, ServiceVariation } from "@/lib/definitions";
import { parsePrice, truncate } from "@/lib/helpers";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function StepService() {
    const { account, services, setSelectedService, setSelectedVariation } = useAgenda();

    if (!account) {
        return null;
    }

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold">¿Qué servicio deseas agendar?</h2>
                <p className="text-sm text-o-gray-300">Selecciona un servicio para continuar</p>
            </div>
            {
                services && services.filter((service) => !service.disabled).map((service) => {
                    return <ServiceItem
                        key={service.documentId}
                        service={service}
                        currency={account?.currency}
                        hidePrice={!account?.showPrices}
                        onSelectService={() => setSelectedService(service)}
                        onSelectVariation={(variation) => setSelectedVariation(variation)}
                    />
                })
            }
        </div>
    )
}

function ServiceItem({ service, currency, hidePrice, onSelectService, onSelectVariation }: { service: Service, currency: string, hidePrice: boolean, onSelectService: (service: Service) => void, onSelectVariation: (variation: string) => void }) {

    const [onOpen, setOnOpen] = useState(false);
    const type = service.type;
    const price = service.type === 'simple' ? service.price : service.serviceVariation.reduce((acc, curr) => acc < curr.price ? acc : curr.price, 10000000);

    const handleClick = () => {
        if (type === 'variable') {
            setOnOpen(!onOpen);
        } else {
            onSelectService(service);
        }
    }

    const handleClickVariation = (variation: ServiceVariation) => {
        onSelectService(service);
        onSelectVariation(variation.uid);
    }

    return (
        <div className="p-2 bg-surface border-border border-1 cursor-pointer rounded-lg space-y-3 shadow-medium" onClick={handleClick}>
            <div className="flex flex-col">
                <div className="flex flex-col justify-between items-start">
                    {
                        type === 'simple' && !hidePrice && <span className="text-tiny text-muted">{parsePrice(price, currency, 0)}</span>
                    }
                    {
                        type === 'variable' && !hidePrice && <span className="text-tiny text-muted">Desde {parsePrice(price, currency, 0)}</span>
                    }
                    <div className="flex items-center gap-1 flex-1 w-full">
                        <h3 className="font-bold w-full leading-[1.2]">{service.name}</h3>
                        {type === 'variable' && <ChevronDown className={clsx("w-5 h-5 text-primary transition-transform duration-300", onOpen && "rotate-180")} onClick={() => setOnOpen(!onOpen)} />}
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-o-gray-300">{truncate(service.description, 100)}</p>
                </div>
            </div>
            {
                type === 'variable' && onOpen && (
                    <>
                        <div className="flex flex-col gap-2 border-t border-border pt-2">
                            {service.serviceVariation.map((variation) => (
                                <div onClick={() => handleClickVariation(variation)} className="p-2 bg-surface-secondary border-border border-1 cursor-pointer rounded-lg flex justify-between items-center" key={variation.uid}>
                                    <div className="flex flex-col w-full">
                                        <div className="flex w-full items-center justify-between gap-2">
                                            <h3 className="font-bold truncate">{variation.name}</h3>
                                            <span className="text-sm min-w-1/2 text-right">{!hidePrice ? parsePrice(variation.price, currency, 0) : ''}</span>
                                        </div>
                                        <p className="text-sm text-o-gray-300">{truncate(variation.description, 100)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}


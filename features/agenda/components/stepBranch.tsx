import { useAgenda } from "@/context/AgendaContext";
import { Avatar } from "@heroui/react";
import { Button } from '@heroui/react';
import { Card } from "@heroui/react";
import { ChevronRight, MapPin, Video, House } from "lucide-react";

export default function StepBranch() {
    const { account, branches, setSelectedBranch } = useAgenda();

    if (!account) {
        return null;
    }

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold">¿Donde prefieres agendar tu cita?</h2>
                <p className="text-sm text-o-gray-300">Selecciona una sucursal para continuar</p>
            </div>
            {
                branches && branches.filter((branch) => !branch.disabled).map((branch) => (

                    <Card
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch)}
                        className="w-full transition-transform duration-200 cursor-pointer"
                    >
                        <div className="flex items-center justify-between p-2">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-surface-secondary rounded-full flex items-center justify-center">
                                    {branch.type === 'local' && <MapPin className="w-6 h-6" />}
                                    {branch.type === 'online' && <Video className="w-6 h-6" />}
                                    {branch.type === 'domicile' && <House className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-foreground truncate">
                                        {branch.name}
                                    </h3>
                                    {branch.address && branch.type === 'local' && (
                                        <p className="text-sm text-muted line-clamp-2">
                                            {branch.address}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <ChevronRight className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}
import { useAgenda } from "@/context/AgendaContext";
import { Button } from '@heroui/react';
import { Card, CardFooter } from '@heroui/react';
import { Avatar } from '@heroui/react';
import { Chip } from '@heroui/react';
import { ChevronRight } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL as string;

export default function StepProfessional() {
    const { account, professionals, setSelectedProfessional } = useAgenda();

    if (!account) {
        return null;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">¿Quién te atenderá?</h2>
                <p className="text-sm text-muted mt-2">Selecciona un profesional para continuar</p>
            </div>

            <div className="grid gap-4 max-w-md mx-auto w-full">
                {professionals && professionals.filter((professional) => !professional.disabled).map((professional) => (
                    <Card
                        key={professional.documentId}
                        onClick={() => setSelectedProfessional(professional)}
                        className="w-full transition-transform duration-200 cursor-pointer"
                    >
                        <div className="flex items-center justify-between p-2">
                            <div className="flex items-center space-x-4">
                                <Avatar size="lg" className="flex-shrink-0">
                                    <Avatar.Image alt="John Doe" src={`${baseUrl}${professional.avatar?.url}`} />
                                    <Avatar.Fallback>{`${professional.firstName.charAt(0).toUpperCase()}${professional.lastName.charAt(0).toUpperCase()}`}</Avatar.Fallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-foreground truncate">
                                        {professional.firstName} {professional.lastName}
                                    </h3>
                                    {professional.bio && (
                                        <p className="text-sm text-muted line-clamp-2">
                                            {professional.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <ChevronRight className="w-6 h-6" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
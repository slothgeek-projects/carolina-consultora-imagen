'use client';

import { useEffect } from 'react';
import { useAgenda } from '@/context/AgendaContext';
import { Button } from '@heroui/react';
import { CalendarDaysIcon, ClockIcon, UserIcon, PhoneIcon, MapPinIcon, ChatBubbleBottomCenterTextIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon, Mail, Sparkles } from 'lucide-react';

export default function ThankYou() {
    const { account, appointmentData, selectedProfessional } = useAgenda();

    if (!account) {
        return null;
    }

    useEffect(() => {
        //scroll to top slowly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto animate-fade-in">
                {/* Header con animación */}
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        ¡Cita Agendada Exitosamente!
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                        Gracias por confiar en <strong>{account.name}</strong>. Te contactaremos pronto para confirmar tu cita.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-green-600 dark:text-green-400">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium">Tu cita está siendo procesada</span>
                        <Sparkles className="w-5 h-5" />
                    </div>
                </div>

                {/* Tarjeta principal con detalles */}
                <div className="bg-surface rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-border">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Información personal */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                Contacto
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                    <UserIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-o-gray-300">Nombre</p>
                                        <p className="font-medium text-foreground">{appointmentData?.fullName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                    <PhoneIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-o-gray-300">Teléfono</p>
                                        <p className="font-medium text-foreground">{appointmentData?.phone}</p>
                                    </div>
                                </div>

                                {appointmentData?.email && (
                                    <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                        <Mail className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-o-gray-300">Correo electrónico</p>
                                            <p className="font-medium text-foreground">{appointmentData?.email}</p>
                                        </div>
                                    </div>
                                )}

                                {appointmentData?.message && (
                                    <div className="flex items-start gap-3 p-3 bg-surface-secondary rounded-lg">
                                        <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-sm text-o-gray-300">Mensaje</p>
                                            <p className="font-medium text-foreground">{appointmentData?.message}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detalles de la cita */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                                    <CalendarDaysIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                Detalles
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                    <BriefcaseIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-o-gray-300">Servicio</p>
                                        <p className="font-medium text-foreground">{appointmentData?.service}</p>
                                    </div>
                                </div>
                                {
                                    selectedProfessional && (
                                        <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                            <UserIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-o-gray-300">Profesional</p>
                                                <p className="font-medium text-foreground">{appointmentData?.professional}</p>
                                            </div>
                                        </div>
                                    )
                                }


                                <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                    <MapPinIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-o-gray-300">Ubicación</p>
                                        <p className="font-medium text-foreground">{appointmentData?.branch}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                    <CalendarDaysIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-o-gray-300">Fecha</p>
                                        <p className="font-medium text-foreground">
                                            {new Date(appointmentData?.date + ' ' + appointmentData?.time).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-surface-secondary rounded-lg">
                                    <ClockIcon className="w-5 h-5 text-o-gray-300 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-o-gray-300">Hora</p>
                                        <p className="font-medium text-foreground">
                                            {new Date(appointmentData?.date + ' ' + appointmentData?.time).toLocaleTimeString('es-ES', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información adicional */}
                <div className="bg-surface-secondary rounded-2xl p-6 mb-8 border border-border">
                    <div className="text-center">
                        <h4 className="text-lg font-semibold text-foreground mb-3">
                            ¿Qué sigue?
                        </h4>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-muted">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                                </div>
                                <p>Recibirás una confirmación por WhatsApp</p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                                </div>
                                <p>Te contactaremos para confirmar detalles</p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                                </div>
                                <p>¡Disfruta de tu servicio!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
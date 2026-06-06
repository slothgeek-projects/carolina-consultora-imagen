'use client';

import { useEffect } from "react";
import { useAgenda } from "@/context/AgendaContext";
import { Button } from '@heroui/react';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function StepDate() {
    const { account, schedule, setSelectedDate, selectedDate, setSelectedTime } = useAgenda();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        setSelectedDate('');
        setSelectedTime('');
    }, []);

    if (!account) {
        return null;
    }

    const handleDateSelect = (date: Date | string) => {
        const formattedDate = typeof date === 'string' ? date : date.toISOString().split('T')[0];
        setSelectedDate(formattedDate);
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const goToCurrentMonth = () => {
        setCurrentMonth(new Date());
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold">¿Cuándo prefieres agendar tu cita?</h2>
                <p className="text-sm text-o-gray-300">Selecciona una fecha para continuar</p>
            </div>
            
            <Calendar 
                schedule={schedule} 
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                onPreviousMonth={goToPreviousMonth}
                onNextMonth={goToNextMonth}
                onCurrentMonth={goToCurrentMonth}
            />
        </div>
    )
}

interface CalendarProps {
    schedule: any;
    currentMonth: Date;
    selectedDate?: string;
    onDateSelect: (date: Date | string) => void;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    onCurrentMonth: () => void;
}

function Calendar({ 
    schedule, 
    currentMonth, 
    selectedDate, 
    onDateSelect, 
    onPreviousMonth, 
    onNextMonth, 
    onCurrentMonth 
}: CalendarProps) {
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();

    // Obtener el primer día del mes
    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
    // Obtener el último día del mes
    const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);
    
    // Obtener el día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();
    // Ajustar para que lunes sea 0
    const adjustedFirstDay = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
    
    // Obtener el número total de días en el mes
    const totalDaysInMonth = lastDayOfMonth.getDate();

    // Nombres de los días de la semana
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    
    // Nombres de los meses
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Generar array de días para mostrar en el calendario
    const calendarDays = [];
    
    // Agregar días del mes anterior para completar la primera semana
    const previousMonth = new Date(currentYear, currentMonthIndex - 1, 0);
    const daysInPreviousMonth = previousMonth.getDate();
    
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
        const day = daysInPreviousMonth - i;
        const date = new Date(currentYear, currentMonthIndex - 1, day);
        const dateKey = date.toISOString().split('T')[0];
        calendarDays.push({
            dateKey,
            day,
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            date: date
        });
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= totalDaysInMonth; day++) {
        const date = new Date(currentYear, currentMonthIndex, day);
        const dateKey = date.toISOString().split('T')[0];
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = selectedDate === dateKey;
        
        calendarDays.push({
            dateKey,
            day,
            isCurrentMonth: true,
            isToday,
            isSelected,
            date
        });
    }
    
    // Agregar días del siguiente mes para completar la última semana
    const remainingDays = 42 - calendarDays.length; // 6 semanas * 7 días = 42
    for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(currentYear, currentMonthIndex + 1, day);
        const dateKey = date.toISOString().split('T')[0];
        calendarDays.push({
            dateKey,
            day,
            isCurrentMonth: false,
            isToday: false,
            isSelected: false,
            date: date
        });
    }

    const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && 
                          currentMonth.getFullYear() === today.getFullYear();

    return (
        <div className="max-w-md mx-auto">
            {/* Header del calendario */}
            <div className="flex items-center justify-between mb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onPress={onPreviousMonth}
                    className="min-w-0 p-2"
                    isIconOnly
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                        {monthNames[currentMonthIndex]} {currentYear}
                    </h3>
                    {!isCurrentMonth && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onPress={onCurrentMonth}
                            className="min-w-0 px-2 py-1 text-xs"
                        >
                            Hoy
                        </Button>
                    )}
                </div>
                
                <Button
                    variant="ghost"
                    size="sm"
                    onPress={onNextMonth}
                    className="min-w-0 p-2"
                    isIconOnly
                >
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day, index) => (
                    <div
                        key={index}
                        className="text-center text-sm font-medium text-o-gray-300 py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Días del calendario */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayInfo, index) => {
                    const hasSchedule = schedule[dayInfo.dateKey] ? schedule[dayInfo.dateKey]?.length > 0 : false;
                    const isDisabled = dayInfo.date.getTime() < yesterday.getTime() || !dayInfo.isCurrentMonth || !hasSchedule;
                    
                    return (
                        <button
                            key={index}
                            onClick={() => !isDisabled && onDateSelect(dayInfo.dateKey) }
                            disabled={isDisabled}
                            title={dayInfo.date.toLocaleDateString() + ' '}
                            className={`
                                aspect-square rounded-lg font-medium transition-all
                                ${dayInfo.isCurrentMonth
                                    ? 'hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400'
                                    : 'text-muted'
                                }
                                ${dayInfo.isToday 
                                    ? 'bg-o-blue-100 text-o-blue-500 font-bold' 
                                    : ''
                                }
                                ${dayInfo.isSelected 
                                    ? 'bg-o-blue-500 text-white hover:bg-o-blue-700' 
                                    : ''
                                }
                                ${isDisabled 
                                    ? 'cursor-not-allowed opacity-50 line-through' 
                                    : 'cursor-pointer'
                                }
                                ${!dayInfo.isCurrentMonth 
                                    ? 'cursor-default' 
                                    : ''
                                }
                            `}
                        >
                            {dayInfo.day}
                        </button>
                    );
                })}
            </div>

            {/* Leyenda */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-o-gray-300">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-100 dark:bg-blue-900 rounded"></div>
                    <span>Hoy</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-o-blue-500 rounded"></div>
                    <span>Seleccionado</span>
                </div>
            </div>
        </div>
    );
}
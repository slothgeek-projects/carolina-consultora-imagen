'use client';

import { useAgenda } from '@/context/AgendaContext';
import { Button, TextArea, Checkbox, Input, Label, TextField, InputGroup, Select, ListBox, Header, Description } from '@heroui/react';
import { ListPlus, MailIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition, useActionState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { createAppointmentAction } from '@/controller/appointment';
import { ServiceVariation } from '@/lib/definitions';
import SelectLocation from '@/features/agenda/components/selectLocation';
import { fromZonedTime } from 'date-fns-tz';
import { countryCodes } from '@/lib/helpers';

export default function Step0() {
    const [formState, formAction] = useActionState(createAppointmentAction, undefined);
    const { account, setStep, step, setSendingForm, selectedProfessional, selectedService, selectedBranch, selectedDate, selectedTime, selectedVariation, setAppointmentData, setCanSendForm, setSubmitForm } = useAgenda();
    const [fullName, setFullName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string>('+506');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [showNote, setShowNote] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const handleSubmitRef = useRef<(() => void) | null>(null);

    if (!account) {
        return null;
    }

    const handleSubmit = () => {
        startTransition(async () => {
            const formData = new FormData();

            const { timeStart, timeEnd } = getDuration();

            setSendingForm(true);

            formData.append('professional', selectedProfessional?.documentId || '');
            formData.append('service', selectedService?.documentId || '');
            formData.append('branch', selectedBranch?.documentId || '');
            formData.append('timeStart', timeStart);
            formData.append('timeEnd', timeEnd);
            formData.append('customerName', fullName);
            formData.append('customerPhone', countryCode + phone);
            formData.append('customerEmail', email);
            formData.append('note', message);
            formData.append('state', account.appointmentDefaultState || 'pending');

            if (selectedBranch?.type == 'domicile') {
                formData.append('latitude', latitude.toString());
                formData.append('longitude', longitude.toString());
            } else {
                formData.append('latitude', '0');
                formData.append('longitude', '0');
            }

            setAppointmentData({
                fullName,
                phone,
                email,
                message,
                service: selectedService?.name,
                professional: selectedProfessional?.firstName + ' ' + selectedProfessional?.lastName,
                branch: selectedBranch?.name,
                date: selectedDate,
                time: selectedTime,
                variation: selectedVariation,
                latitude,
                longitude
            });

            formAction(formData);
        });
    }

    const getDuration = () => {
        const tz = account.timeZone || 'America/Costa_Rica';

        const localDateTimeString = `${selectedDate}T${selectedTime}`;
        const timeStart = fromZonedTime(localDateTimeString, tz);

        let minutes = 0;

        if (selectedService.type === 'variable') {
            const variation = selectedService.serviceVariation.find(
                (v: ServiceVariation) => v.uid === selectedVariation
            );
            minutes = variation?.duration ?? 60;
        } else {
            minutes = selectedService.durationInMinutes ?? 60;
        }

        const timeEnd = new Date(timeStart.getTime() + minutes * 60_000);

        return {
            timeStart: timeStart.toISOString(),
            timeEnd: timeEnd.toISOString()
        }
    }

    handleSubmitRef.current = handleSubmit;

    useEffect(() => {
        setSubmitForm(() => handleSubmitRef.current?.());
        return () => setSubmitForm(null);
    }, []);

    useEffect(() => {
        if (formState?.data) {
            setStep(step + 1);
            setSendingForm(false);
        }
    }, [formState]);

    useEffect(() => {
        if (termsAccepted && phone.length > 0 && fullName.length > 0) {
            setCanSendForm(true);
        } else {
            setCanSendForm(false);
        }
    }, [termsAccepted, phone, fullName]);

    useEffect(() => {
        // remove all non-numeric characters from phone
        setPhone(phone.replace(/[^0-9]/g, ''));
    }, [phone]);

    return (
        <div className='space-y-6 animate-fade-in'>
            <div className="text-center">
                <h2 className="text-2xl font-bold">¿Cómo podemos contactarte?</h2>
                <p className="text-sm text-o-gray-300">Ingresa tus datos para continuar</p>
            </div>
            <div className='space-y-4'>
                <div className='pt-1'>
                    <TextField aria-label='Nombre completo' name="oa_name" >
                        <Label htmlFor="oa_name" className='text-xs'><span className='text-o-gray-300'>Nombre completo</span></Label>
                        <InputGroup className='bg-background'>
                            <InputGroup.Prefix>
                                <UserIcon className='w-4 h-4' />
                            </InputGroup.Prefix>
                            <InputGroup.Input placeholder="¿Cómo te llamas?" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </InputGroup>
                    </TextField>
                </div>
                <div>
                    <TextField className="w-full" defaultValue="heroui.com" name="website" aria-label='Teléfono'>
                        <Label htmlFor="oa_phone" className='text-xs'><span className='text-o-gray-300'>Teléfono de contacto</span></Label>
                        <InputGroup className="bg-background">
                            <InputGroup.Prefix className='px-0'>
                                <Select
                                    className="w-[58px]"
                                    defaultValue={'CR'}
                                    onChange={(value) => setCountryCode(countryCodes.find(country => country.code === value)?.value || '')}
                                    placeholder=""
                                    aria-label='Código de país'
                                >
                                    <Select.Trigger className="bg-transparent shadow-none">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className='bg-background min-w-[40px]'>
                                        <ListBox>
                                            {countryCodes.map((country) => (
                                                <ListBox.Item key={country.code} id={country.code} textValue={country.name} className='w-[40px]'>
                                                    <span className='flex items-center gap-1'>
                                                        <span className='text-sm'>{country.icon}</span>
                                                    </span>
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                                <span className='text-sm pr-1'>{countryCode}</span>
                            </InputGroup.Prefix>
                            <InputGroup.Input aria-label='Teléfono' value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" placeholder="8888 8888" />
                        </InputGroup>
                        <Description className='text-o-gray-300'>Incluye el código de país, ej: +506 8888 8888</Description>
                    </TextField>
                </div>
                <div className='pt-1'>
                    <TextField aria-label='Correo electrónico' name="oa_email" >
                        <Label htmlFor="oa_email" className='text-xs'><span className='font-semibold'>(Opcional)</span> <span className='text-o-gray-300'>Correo electrónico</span></Label>
                        <InputGroup className='bg-background'>
                            <InputGroup.Prefix>
                                <MailIcon className='w-4 h-4' />
                            </InputGroup.Prefix>
                            <InputGroup.Input aria-label='Correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" placeholder="tu@correo.com" />
                        </InputGroup>
                    </TextField>
                </div>
                <div>
                    <div>
                        <Button
                            variant='ghost'
                            className={clsx('gap-1', { 'hidden': showNote })}
                            size='sm'
                            onPress={() => setShowNote(true)}
                        >
                            <ListPlus className='w-4 h-4' />
                            Añadir nota
                        </Button>
                        <TextArea
                            aria-label='Nota'
                            placeholder="Escribe una nota para el profesional"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={clsx('w-full bg-background', { 'hidden': !showNote }, 'mt-2')}
                        />
                    </div>
                </div>
            </div>
            {
                selectedBranch?.type == 'domicile' && <SelectLocation onLocationSelect={(location) => {
                    setLatitude(location.lat.toString());
                    setLongitude(location.lng.toString());
                }} />
            }
            <div>
                <Checkbox id="basic-terms" isSelected={termsAccepted} onChange={setTermsAccepted}>
                    <Checkbox.Control className='bg-background'>
                        <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Content>
                        <Label htmlFor="basic-terms">
                            Acepto los <Link href="/terminos-y-condiciones-cliente" className='underline text-primary' target='_blank'>términos y condiciones</Link> de uso.
                        </Label>
                    </Checkbox.Content>
                </Checkbox>
            </div>
            {
                formState?.error && (
                    <div className='rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 flex gap-2 text-sm text-red-700 dark:text-red-400' role='alert'>
                        <span className='text-red-500 dark:text-red-400 mt-0.5 shrink-0'>⚠</span>
                        <div>
                            {typeof formState.error === 'string' ? (
                                formState.error
                            ) : (
                                <ul className='space-y-0.5 list-disc list-inside'>
                                    {Object.entries(formState.error).map(([field, errors]) => (
                                        <li key={field}>
                                            {Array.isArray(errors) ? errors[0] : errors}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
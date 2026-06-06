'use client';

import { useRef } from 'react';
import { useAgenda } from '@/context/AgendaContext';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/features/agenda/components/header';
import StepLink from '@/features/agenda/components/stepLink';
import StepBranch from '@/features/agenda/components/stepBranch';
import StepService from '@/features/agenda/components/stepService';
import Navigation from '@/features/agenda/components/navigation';
import StepProfessional from '@/features/agenda/components/stepProfessional';
import StepDate from '@/features/agenda/components/stepDate';
import StepHour from '@/features/agenda/components/stepHour';
import StepContact from '@/features/agenda/components/stepContact';
import ThankYou from '@/features/agenda/components/trankyou';
import StepProgress from '@/features/agenda/components/stepProgress';
import Footer from '@/features/agenda/components/footer';

const STEPS = {
    0: StepLink,
    1: StepBranch,
    2: StepProfessional,
    3: StepService,
    4: StepDate,
    5: StepHour,
    6: StepContact,
    7: ThankYou,
} as const;

const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? '-60%' : '60%', opacity: 0 }),
};

export default function AgendaByProfessional() {
    const { step } = useAgenda();
    const prevStepRef = useRef(step);
    const directionRef = useRef(1);

    if (prevStepRef.current !== step) {
        directionRef.current = step > prevStepRef.current ? 1 : -1;
        prevStepRef.current = step;
    }

    const Step = STEPS[step as keyof typeof STEPS];

    return (
        <div className="relative space-y-4 pb-24">
            <Header />
            <Navigation />
            <StepProgress />
            <AnimatePresence mode="wait" custom={directionRef.current}>
                <motion.div
                    key={step}
                    custom={directionRef.current}
                    variants={variants}
                    initial="center"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                    <Step />
                </motion.div>
            </AnimatePresence>
            <Footer />
        </div>
    );
}

import { useAgenda } from "@/context/AgendaContext";
import clsx from "clsx";

export default function Steps({totalSteps}: {totalSteps: number}) {

    const { step, setStep } = useAgenda();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-1 z-10">
            <div className="flex justify-center gap-1">
                {
                    Array.from({ length: totalSteps }).map((_, index) => (
                        <div 
                            key={index} 
                            className={clsx("w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer", { "bg-o-blue-500": index < step })}
                        ></div>
                    ))
                }
            </div>
        </div>
    )
}
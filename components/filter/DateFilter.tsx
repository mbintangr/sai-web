"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { extractDate } from "@/lib/date"

export function DateFilter() {
    const [date, setDate] = React.useState<Date>()

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const handleSelect = (date?: Date) => {
        setDate(date);
        const params = new URLSearchParams(searchParams);
    
        // Adjust for timezone differences
        if (date) {
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dateStr = format(utcDate, "yyyy-MM-dd"); // Format the date as YYYY-MM-DD
            params.set("date", dateStr);
        } else {
            params.delete("date");
        }
        replace(`${pathName}?${params.toString()}`);
    };
    return (
        <Popover>
            <PopoverTrigger asChild className=" bg-light-orange text-orange hover:bg-light-orange/90 rounded-xl">
                <Button
                    variant={"default"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 text-orange" />
                    {date ? format(date, "PPP") : <span className="text-orange">Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-light-orange text-orange">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

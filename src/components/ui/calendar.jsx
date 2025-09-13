import *"react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils.js";
;

export 

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
     {
          if (props.orientation === "left") {
            return ;
          }
          return ;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

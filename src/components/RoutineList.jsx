import { useRoutines } from "../hooks/UseRoutines";
import { Routine } from "./Routine";

export const RoutineList = (props) => {
   const { personId, color, hour, incrementPointBalance, decrementPointBalance, isSchoolDay } =
      props;
   const routines = useRoutines(personId, hour, isSchoolDay);

   return routines.map((routine) => (
      <Routine
         key={routine.RoutineId}
         routine={routine}
         color={color}
         incrementPointBalance={incrementPointBalance}
         decrementPointBalance={decrementPointBalance}
      />
   ));
};

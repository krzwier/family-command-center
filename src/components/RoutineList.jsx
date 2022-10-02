import { useRoutines } from "../hooks/UseRoutines";
import { Routine } from "./Routine";

export const RoutineList = (props) => {
   const { personId, hour, incrementPointBalance, decrementPointBalance } = props;
   const routines = useRoutines(personId, hour);

   return routines.map((routine) => (
      <Routine
         key={routine.RoutineId}
         routine={routine}
         incrementPointBalance={incrementPointBalance}
         decrementPointBalance={decrementPointBalance}
      />
   ));
};

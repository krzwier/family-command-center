import { usePerson } from "../hooks/UsePerson";
import { useMoney } from "../hooks/UseMoney";
import { usePoints } from "../hooks/UsePoints";
import { DateTime } from "./DateTime";
import { Greeting } from "./Greeting";
import { RoutineList } from "./RoutineList";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export const PersonalDashboard = (props) => {
   const { personId } = props;
   const person = usePerson(personId);
   const moneyBalance = useMoney(personId);
   const { pointBalance, incrementPointBalance, decrementPointBalance } = usePoints(personId);
   const [date, setDate] = useState(new Date());
   const [hour, setHour] = useState(0);

   useEffect(() => {
      const timer = setInterval(() => {
         const currentDate = new Date();
         const currentHour = currentDate.getHours();
         setDate(date);
         if (currentHour !== hour) {
            setHour(currentHour);
         }
      }, 1000);

      return () => {
         clearInterval(timer);
      };
   });

   return (
      <>
         <Container fluid>
            <DateTime date={date} />
            <Greeting personName={person.PersonName} date={date} />
            <RoutineList
               personId={personId}
               hour={hour}
               incrementPointBalance={incrementPointBalance}
               decrementPointBalance={decrementPointBalance}
            />
            <Row className="fixed-bottom justify-content-end">
               {pointBalance === "no account" ? (
                  <></>
               ) : (
                  <Col
                     xs="auto"
                     className="tracker d-flex flex-row py-3 bg-purple align-items-center justify-content-center"
                  >
                     <img src="./resources/Icons/points.png" width="80px" />
                     <h4 className="text-light-yellow m-0">{pointBalance}</h4>
                  </Col>
               )}
               {moneyBalance === "no account" ? (
                  <></>
               ) : (
                  <Col
                     xs="auto"
                     className="tracker d-flex flex-row bg-wintergreen-dream align-items-center justify-content-center"
                  >
                     <img src="./resources/Icons/money.png" width="80px" />
                     <h4 className="text-light-yellow ps-3 m-0">{`\$${moneyBalance.toFixed(
                        2
                     )}`}</h4>
                  </Col>
               )}
            </Row>
         </Container>
      </>
   );
};

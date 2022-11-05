import { usePerson } from "../hooks/UsePerson";
import { useMoney } from "../hooks/UseMoney";
import { usePoints } from "../hooks/UsePoints";
import { useDateTime } from "../hooks/UseDateTime";
import { DateTime } from "./DateTime";
import { Greeting } from "./Greeting";
import { RoutineList } from "./RoutineList";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export const PersonalDashboard = (props) => {
   const { personId, color } = props;
   const person = usePerson(personId);
   const moneyBalance = useMoney(personId);
   const { pointBalance, incrementPointBalance, decrementPointBalance, markRoutineCompletion } =
      usePoints(personId);
   const { date, hour, isSchoolDay } = useDateTime();
   //    const [date, setDate] = useState(new Date());
   //    const [hour, setHour] = useState(0);

   return (
      <>
         <Container fluid>
            <DateTime date={date} />
            <Greeting personName={person.PersonName} date={date} />
            <RoutineList
               key={personId}
               personId={personId}
               hour={hour}
               isSchoolDay={isSchoolDay}
               incrementPointBalance={incrementPointBalance}
               decrementPointBalance={decrementPointBalance}
            />
            <Row className="fixed-bottom justify-content-end">
               {pointBalance === "no account" ? (
                  <></>
               ) : (
                  <Col
                     xs="auto"
                     className={`tracker d-flex flex-row py-3 bg-${color}-dark align-items-center justify-content-center`}
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
                     className="tracker d-flex flex-row bg-dark-gray align-items-center justify-content-center"
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

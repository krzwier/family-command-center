import { usePerson } from "../hooks/UsePerson";
import {
   Container,
   InputGroup,
   ListGroup,
   Row,
   Col,
   Form
} from "react-bootstrap";
import { useState, useEffect } from "react";

export const PersonalDashboard = (props) => {
   const { personId } = props;
   const person = usePerson(personId);
   //    const tasks = useTasks();
   var [date, setDate] = useState(new Date());
   //    const currentDateTime = new Date();

   useEffect(() => {
      const timer = setInterval(
         () => setDate(new Date()),
         1000
      );

      return () => {
         clearInterval(timer);
      };
   });

   const getGreeting = (date, name) => {
      if (date.getHours() >= 17) {
         return `Good evening, ${name}!`;
      }
      if (date.getHours() > 12) {
         return `Good afternoon, ${name}`;
      }
      if (date.getHours() > 5) {
         return `Good morning, ${name}`;
      }
      return `You should be in bed, ${name}!`;
   };

   return (
      <Container className="px-2 py-3">
         <Row>
            <p className="text-end text-dark-gray">
               <small>
                  {`${date.toLocaleString("en-us", {
                     weekday: "long"
                  })}, ${date.toLocaleString("en-us", {
                     dateStyle: "long"
                  })}, ${date.toLocaleString("en-us", {
                     timeStyle: "short"
                  })}`}
               </small>
            </p>
         </Row>
         <Row className="py-5">
            <h5 className="display-5 mx-auto text-center text-dark-gray">
               {getGreeting(date, person.PersonName)}
            </h5>
         </Row>
         {/* <Row>
            <ListGroup className="w-50 mx-auto">
               <ListGroup.Item variant="mint-cream">
                  <img
                     src="./resources/Icons/toothbrush.png"
                     height="50px"
                  />
                  <input
                     type="checkbox"
                     id="brush teeth"
                     class="check-box"
                  />
                  <label>Brush teeth</label>
               </ListGroup.Item>
               <ListGroup.Item>Jammies</ListGroup.Item>
            </ListGroup>
         </Row> */}
         <Row className="justify-content-center">
            <Col
               xs={6}
               className="bg-wintergreen-dream routine-box pt-3"
            >
               <h6 className="display-6 text-mint-cream text-center">
                  Before-School Routine
               </h6>
               {/* 
               <InputGroup className="form-check">
                  <InputGroup.Checkbox className="form-check-input custom-checkbox" />
                  <InputGroup.Text className="form-check-label custom-label">
                     Brush Teeth
                  </InputGroup.Text>
               </InputGroup> */}
               <ul class="ks-cboxtags">
                  <li>
                     <input
                        type="checkbox"
                        id="checkbox1"
                        value="task1"
                     />

                     <label for="checkbox1">
                        <img
                           src="./resources/Icons/toothbrush.png"
                           height="46.38px"
                           className="pe-3"
                        />
                        Brush Teeth
                     </label>
                  </li>
                  <li>
                     <input
                        type="checkbox"
                        id="checkbox2"
                        value="task2"
                     />

                     <label for="checkbox2">
                        <img
                           src="./resources/Icons/clothes.png"
                           height="46.38px"
                           className="pe-3"
                        />
                        Get Dressed
                     </label>
                  </li>
               </ul>
            </Col>
         </Row>
      </Container>
   );
};

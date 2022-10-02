import { Row } from "react-bootstrap";

const getGreeting = (date, name) => {
   if (date.getHours() >= 17) {
      return `Good evening, ${name}!`;
   }
   if (date.getHours() > 12) {
      return `Good afternoon, ${name}!`;
   }
   if (date.getHours() > 5) {
      return `Good morning, ${name}!`;
   }
   return `You should be in bed, ${name}!`;
};

export const Greeting = (props) => {
   const { personName, date } = props;

   return (
      <Row className="py-5">
         <h5 className="display-5 mx-auto text-center text-dark-gray">
            {getGreeting(date, personName)}
         </h5>
      </Row>
   );
};

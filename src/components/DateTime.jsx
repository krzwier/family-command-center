import { Row } from "react-bootstrap";

export const DateTime = (props) => {
   const { date } = props;

   return (
      <Row>
         <p className="text-end text-dark-gray py-2 px-3">
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
   );
};

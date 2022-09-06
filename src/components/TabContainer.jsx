import { Nav, Container, Row, Col } from "react-bootstrap";
import { usePersons } from "../hooks/UsePersons";

export const TabContainer = () => {
   const persons = usePersons();

   return (
      <Container fluid>
         <Row>
            <Col xs={1}>
               <Nav
                  variant="pills"
                  defaultActiveKey="/home"
                  className="flex-column"
               >
                  {persons.map((person) => (
                     <Nav.Item key={person.PersonId}>
                        <Nav.Link
                           href={`/${person.PersonName}`}
                        >
                           <img
                              src={`../../${person.AvatarPath}`}
                           />
                           {person.PersonName}
                        </Nav.Link>
                     </Nav.Item>
                  ))}
                  {/* <Nav.Item>
                     <Nav.Link href="/home">
                        Active
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link eventKey="link-1">
                        Option 2
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link eventKey="disabled" disabled>
                        Disabled
                     </Nav.Link>
                  </Nav.Item> */}
               </Nav>
            </Col>
            <Col xs={11}></Col>
         </Row>
      </Container>
   );
};

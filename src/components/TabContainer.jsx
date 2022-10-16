import { Nav, Row, Col, Tab } from "react-bootstrap";
import { usePersons } from "../hooks/UsePersons";
import { PersonalDashboard } from "./PersonalDashboard";

export const TabContainer = () => {
   const persons = usePersons();

   return (
      <Tab.Container defaultActiveKey="Mommy">
         <Row className="full-screen">
            <Col xs="auto" className="pe-0 bg-wintergreen-dream ps-4 py-3">
               <Nav className="nav-pills flex-column" role="tablist">
                  {persons.map((person) => (
                     <Nav.Item key={person.PersonId}>
                        <Nav.Link className="nav-link" eventKey={person.PersonName}>
                           <img src={`${person.AvatarPath}`} width="80px" />
                        </Nav.Link>
                     </Nav.Item>
                  ))}
               </Nav>
            </Col>
            <Col className="bg-light-cyan px-0">
               <Tab.Content className="h-100">
                  {persons.map((person) => (
                     <Tab.Pane key={person.PersonId} eventKey={person.PersonName} className="h-100">
                        <PersonalDashboard key={person.PersonId} personId={person.PersonId} />
                     </Tab.Pane>
                  ))}
               </Tab.Content>
            </Col>
         </Row>
      </Tab.Container>
   );
};

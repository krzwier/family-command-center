import { Nav, Row, Col, Tab } from "react-bootstrap";
import { usePersons } from "../hooks/UsePersons";

export const TabContainer = () => {
   const persons = usePersons();

   return (
      <Tab.Container defaultActiveKey="Mommy">
         <Row className="full-screen">
            <Col
               xs={1}
               className="pe-0 bg-wintergreen-dream ps-4 py-3"
            >
               <Nav
                  className="nav-pills flex-column"
                  role="tablist"
               >
                  {persons.map((person) => (
                     <Nav.Item key={person.PersonId}>
                        <Nav.Link
                           className="nav-link"
                           eventKey={person.PersonName}
                        >
                           <img
                              src={`${person.AvatarPath}`}
                              width="100%"
                           />
                        </Nav.Link>
                     </Nav.Item>
                  ))}
               </Nav>
            </Col>
            <Col xs={11} className="bg-light-cyan ps-0">
               <Tab.Content className="h-100">
                  {persons.map((person) => (
                     <Tab.Pane
                        key={person.PersonId}
                        eventKey={person.PersonName}
                        className="h-100"
                     >
                        {person.PersonName}
                     </Tab.Pane>
                  ))}
               </Tab.Content>
            </Col>
         </Row>
      </Tab.Container>
   );
};

/* <Tab.Container defaultActiveKey="Mommy">
            <Row>
               <Col xs={1} className="py-1 bg-light-cyan">
                  <Nav className="ps-2 flex-column">
                     {persons.map((person) => (
                        <Nav.Item
                           key={person.PersonId}
                           className="my-2"
                        >
                           <Button
                              className="btn-wintergreen-dream"
                              eventKey={person.PersonName}
                           >
                              <img
                                 src={`${person.AvatarPath}`}
                                 width="100%"
                              />
                           </Button>
                        </Nav.Item>
                     ))}
                  </Nav>
               </Col>
               <Col xs={11}>
                  <Tab.Content>
                     {persons.map((person) => (
                        <Tab.Pane
                           eventKey={person.PersonName}
                           key={person.PersonId}
                        >
                           {person.PersonName}
                        </Tab.Pane>
                     ))}
                  </Tab.Content>
               </Col>
            </Row>
         </Tab.Container> */

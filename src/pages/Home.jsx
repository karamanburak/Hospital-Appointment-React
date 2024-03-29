import React, { useState } from "react";
import { Button, Card, CardFooter, Container, Row } from "react-bootstrap";
import logo from "../helper/logo.png";
import { FaUserDoctor } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


import { doctorData, appointmentData } from "../helper/data";
import PatientList from "../components/PatientList";
import AddPatient from "../components/AddPatient";



const Home = () => {

  const [doctors, setDoctors] = useState(doctorData)
  const [appointment, setAppointment] = useState(JSON.parse(localStorage.getItem("list")) || [...appointmentData])


  const [show, setShow] = useState(false);
  const [drName, setDrName] = useState("");
  const [display, setDisplay] = useState(true)


  const handleAdd = (newAppointment) => {
    setAppointment([...appointment, newAppointment]);
    localStorage.setItem(
      "list",
      JSON.stringify([...appointment, newAppointment])
    );
  };

  const handleClose = () => setShow(false);
  const handleShow = (name) => {
    setShow(true);
    setDrName(name)
  };

  const doctorClick = (id) => {
    setDisplay(!display)

    setDoctors(display ? doctors.filter((a)=>a.id===id) : doctorData)


  }



  return (
    <>
      <Container className="container p-3 ">
        <div className="header">
          <img src={logo} alt="LOGO" width="150px" />
          <h1 className="text-danger text-center fw-bold"> AleXianer Hospital</h1>
        </div>
        <Row
          className="g-3 justify-content-center m-auto card-row"
          sm={12}
           md={6}
          lg={4}
          xl={3} >
          {doctors.map((dr) => {
            return (
              <Card key={dr.id}
                className="doctor mx-1"
                style={{ borderColor: display ? "cornflowerblue" : "purple" }}
              >
                <img src={dr.img} />
                <CardFooter className="text-center">
                  <Card.Title>
                    <FaPhoneAlt /> <CiMail />{" "}
                    <h4 className="mt-2">{dr.name}</h4>
                  </Card.Title>
                  <Card.Text style={{ color: "red" }}>
                    <FaUserDoctor style={{ color: "blue" }} /> {dr.dep}
                  </Card.Text>
                  <Button
                    className="w-100 mb-2"
                    variant="outline-success"
                    onClick={() => handleShow(dr.name)}>
                    Appointment
                  </Button>
                  <Button
                    className="w-100"
                    variant={display ? "outline-warning" : "outline-danger"}
                    onClick={() => doctorClick(dr.id)}
                  >
                   {display ? "Show" : "Close"} Patient List
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </Row>
          <PatientList appointment={appointment} setAppointment={setAppointment} doctors={doctors} />
      </Container>
   
      <AddPatient handleAdd={handleAdd} handleClose={handleClose} drName={drName} show={show} />


    </>
  )
}

export default Home
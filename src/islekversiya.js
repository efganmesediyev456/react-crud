import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'


import { Button,Modal,Form } from 'react-bootstrap';



function App() {


    const [employees,setEmployees]=useState(null)
    var [counts,setCounts]=useState(1)
    var [deleteLoading,setdeleteLoading]=useState(false)

    var [currentPage,setCuurentPage]=useState(1)

    const [employee,setEmployee]=useState([
        {
            "id": 0,
            "name": "",
            "surname": "",
            "father_name": "",
            "address": "",
            "fin_code": "",
            "education": "",
            "email": "",
            "salary": 0,
            "birthday": "",
        }
    ])


    useEffect( ()=>{
        const refresh = async () => {
            var datas=await axios.post("http://localhost:8000/api/get-employess")
            setEmployees(datas.data)
            setCounts(datas.data.from)
            console.log("salam")
        }
        refresh()
    },[])


    const refresh = async (page=currentPage) => {

        if(employees.data.length-1==0){
            page--;
        }
        setCuurentPage(page)
        var datas=await axios.post("http://localhost:8000/api/get-employess?page="+page)
        setEmployees(datas.data)
        setCounts(datas.data.from)
    }

    const clickPrev = async (page) => {

        if(page==0){
            return false;
        }
        setCuurentPage(page)
        var datas=await axios.post("http://localhost:8000/api/get-employess?page="+page)
        setEmployees(datas.data)
        setCounts(datas.data.from)
    }
    const clickNext = async (page) => {
        if(page > employees.last_page){
            return false;
        }
        setCuurentPage(page)
        var datas=await axios.post("http://localhost:8000/api/get-employess?page="+page)
        setEmployees(datas.data)
        setCounts(datas.data.from)
    }

    const handleRemove=async (id)=>{
        setdeleteLoading(true)
        await axios.post("http://localhost:8000/api/delete-employess",{id:id})
        refresh()
        setdeleteLoading(false)
    }

    // --------------modal-----------------


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow =  async (id) => {

        setEmployee({
            "id": 0,
            "name": "",
            "surname": "",
            "father_name": "",
            "address": "",
            "fin_code": "",
            "education": "",
            "email": "",
            "salary": 0,
            "birthday": "",
        })

        if(id!==0){
            var data=await axios.post("http://localhost:8000/api/info-employess",{id:id})
            setEmployee(data.data.data);
        }



        setShow(true);
    }


    const handleSubmit=async (event)=>{

        event.preventDefault()

        var data = new FormData(event.target);
        data.append("id",employee.id ? employee.id : 0)


        var datas=await axios.post("http://localhost:8000/api/add-edit-employess",data)



        if(employee.id!==0){
            employees.data.map((e,k)=>{
                if(e.id==datas.data.data.id){
                    employees.data[k]=datas.data.data;
                    setEmployees(employees)

                }
            })
        }else{
            employees.data.push(datas.data.data);
            setEmployees(employees);
            refresh(employees.last_page)
        }
        setShow(false);
    }


    return (


        <div className={"container"}>
            <div className="row">
                <div className="col-md-8 offset-2">
                    <Button variant="success" onClick={()=>{handleShow(0)}}>
                        Adding
                    </Button>
                    <table className = "table">
                        <thead className = "thead-light">
                        <tr>
                            <th scope = "col">#</th>
                            <th scope = "col">Name</th>
                            <th scope = "col">Surname</th>
                            <th scope = "col">Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            employees && employees.data.map((e)=>(
                                <tr key={e.id}>
                                    <td>{counts++}</td>
                                    <td>{e.name}</td>
                                    <td>{e.surname}</td>
                                    <td>
                                        <button className={"btn btn-danger"} onClick={()=>{handleRemove(e.id)}}>{deleteLoading && "Loading..."}{!deleteLoading && "Delete"}</button>
                                        <button className={"btn btn-primary"} onClick={()=>handleShow(e.id)}>Edit</button>
                                    </td>
                                </tr>

                                ))}

                        </tbody>
                    </table>
                    <nav aria-label = "Page navigation example">
                        <ul className = "pagination">
                            {
                                employees && employees.links.map((e,k)=>
                                    <li key={e.label} className = "page-item">
                                        {
                                            k==0 && (<a className = "page-link" href = "#" aria-label = "Previous" onClick={()=>{clickPrev(currentPage-1)}}>
                                                <span className = "sr-only">Previous</span>
                                            </a>)
                                        }
                                        {
                                            k==employees.links.length-1 && (
                                                <a onClick={()=>{clickNext(parseInt(currentPage)+1)}} className = "page-link" href = "#" aria-label = "Next">
                                                    <span aria-hidden = "true"></span>
                                                    <span className = "sr-only">Next</span>
                                                </a>
                                            )
                                        }
                                        {
                                            (k!==employees.links.length-1 && k!==0 ) &&
                                            ( <a className = "page-link" onClick={()=>{refresh(e.label)}}   >{e.label}</a>)
                                        }










                                    </li>




                                )
                            }


                        </ul>
                    </nav>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                        <Modal.Body>


                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name={"name"} type="text" placeholder="" defaultValue={employee.name} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name={"email"} type="email" placeholder="" defaultValue={employee.email}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control name={"surname"} type="text" placeholder="" defaultValue={employee.surname}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Father Name</Form.Label>
                                    <Form.Control name={"father_name"} type="text" placeholder="" defaultValue={employee.father_name}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control name={"address"} type="text" placeholder="" defaultValue={employee.address}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Fin Code</Form.Label>
                                    <Form.Control name={"fin_code"} type="text" placeholder="" defaultValue={employee.fin_code}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Education</Form.Label>
                                    <Form.Control name={"education"} type="text" placeholder="" defaultValue={employee.education}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Salary</Form.Label>
                                    <Form.Control name={"salary"} type="text" placeholder="" defaultValue={employee.salary}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control name={"birthday"} type="date" placeholder="" defaultValue={employee.birthday}/>
                                </Form.Group>





                        </Modal.Body>


                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                        </Form>
                    </Modal>


                </div>
            </div>









        </div>
    )
    ;
}

export default App;

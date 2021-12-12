import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
var ReactDOM = require('react-dom');



function App() {




    const [data, setData] = useState([])
    const  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzJlNTAyYzNjOWRlOTEwMTQ5OGQzODJiNzhiOGZjMDJlZGRlOThkZjExNzUxYTIzNGU5MDVkY2MyZjNjYzcxNjcwMjM5NWI4ZDU0NWE4NTUiLCJpYXQiOjE2Mzg0ODE1NTAuMjM1MTkxLCJuYmYiOjE2Mzg0ODE1NTAuMjM1MTk5LCJleHAiOjE2NzAwMTc1NTAuMDgxODk1LCJzdWIiOiIxMDEiLCJzY29wZXMiOltdfQ.cCkI8rbrm5v39pUo4D_6WRRaVLGzzNYtvjAshp4tbivtXGwmuMPlH2Vq2HXRg6e0CmaK7umPEFhMcKOAl4d9z8jZ_WzhM0Fb_TqLF74bJ2UJDUYSwrG0jcM1oBCoA7fXhHyHEBW2FlVM6HO567SiYEST5bN_nT3kWepRJX1IkjwpsOB8nZNIN9KLUHQgrbb4JOCPyZ3A0n2JS_4VQgXIiEqOXkecgrQcYiaxoBG20MXr5GqVgeetMRdPpRw8rDFrBl63DhEFQi8_dkY7ACSx-cNCY_CyzznkDWcaboEiEkHezm0A441Fjtfikv20FW5C_u3h6LK4X7F_20roKLciWPng3jN-EU_H1ZcX0XGArqEGuX7G1SEIEnQg08IjcaZSfnFQlmx1cxYDbwOM6LVzYf4_4QxOkSEHoi_3Rbom4wgdUrk_pWiKoLIjnfftTSO6jCDhgNbEaDkGiYxkewL0crcjkGSXkshyZHSpIEQJF_Zan_WUdTDJA513UFjNH--SB6ch6rP8pYki-SRabmDWEfEU_v2SsYHZW0cGgNacv27yDjH48TZwZi30tP5b09J2eDELVvS7ZIzNkuqMHJY821LiuqIdL0XI2Lv09VqF3JzrbIQx0bMqq-RRSaXPrqGYAdrSMwPg6rxUsnO7zynadhsj9MzEj7-8wUGLZ_q6uns"

        function handleRemove(movie) {

            this.ref_name = React.createRef();

            console.log(movie)
            const url = `http://localhost:8000/api/delete-employess`;
            axios
                .post(url,{id:movie.id},{
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                })
                .then(res => {
                    setData(data.filter(function(e){
                    return e.id!=movie.id
                }))
                })
                .catch(err => {
                    console.log(err);
                });
        }

    function handleEdit(e) {

        // console.log(e.target.parentNode.parentNode.querySelectorAll("td:first").textContent)
    }


    useEffect(() => {

        const fetchData = async () => {
            const result = await axios.post(
                'http://localhost:8000/api/get-employess', {},{
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                }
            );

            var to=result.data.per_page;
            var from=result.data.to-to;

            console.log(from+1,to)

            // var tbody=ReactDOM.findDOMNode().querySelectorAll("tbdoy")

            // console.log(tbody)

            setData(result.data.data);
        };
        fetchData()
    }, []);
    return (


        <div className={"col-md-6 offset-3"}>
            <table className = "table table-striped ">
                <thead>
                <tr>
                    <th scope = "col">#</th>
                    <th scope = "col">Name</th>
                    <th scope = "col">Options</th>

                </tr>
                </thead>
                <tbody>

                {
                    data.map(item => (<tr key = {item.name}><td></td><td> { item.name } </td>  <td><button className = "btn btn-danger" onClick = {e => handleRemove(item)}>Delete</button></td><td><button className={"btn btn-primary"} onClick={e => handleEdit(e)}>Edit</button></td></tr>))
                }
                        </tbody>
                    </table>
        </div>




)
    ;
}

export default App;

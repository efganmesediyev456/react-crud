import React,{useEffect,useState} from 'react';
import { Table,Button } from 'semantic-ui-react'
import axios from 'axios'
import {
   Link
} from "react-router-dom";

export default function Read() {

    const [APIData, setAPIData] = useState([]);


    const getData = () => {
        axios.get(`https://61b5c6900e84b70017331bc2.mockapi.io/api/posts`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }


    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox)
    }

    const onDelete = (id) => {
        axios.delete(`https://61b5c6900e84b70017331bc2.mockapi.io/api/posts/${id}`).then(() => {
            getData();
        })
    }

    useEffect(() => {

        axios.get(`https://61b5c6900e84b70017331bc2.mockapi.io/api/posts`)
            .then((response) => {
                setAPIData(response.data);
            })

    }, [])

    return (
        <div>
            <Link to='/create'>
            <Button>Create</Button>
            </Link>
            <Table singleLine>

                <Table.Header>

                    <Table.Row>
                        <Table.HeaderCell>FirstName</Table.HeaderCell>
                        <Table.HeaderCell>LastName</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    {APIData.map((data) => {
                        return (
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>

                                <Table.Cell>
                                    <Link to='/update'>
                                    <Button onClick={() => setData(data)} >Update</Button>
                                    </Link>
                                </Table.Cell>

                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>

                            </Table.Row>
                        )})}

                </Table.Body>
            </Table>
        </div>
    )
}
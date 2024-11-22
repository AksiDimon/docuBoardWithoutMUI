import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { fetchData } from "../fetchData";
import { fetchAddData } from "../fetchAddData";
import { fetchDeleteData } from "../fetchDeleteData";
import { Edit } from "./Edit";
import { checkCORS } from "../fetchExapmle";

export function Spreadsheet() {
  const [data, setData] = useState([]);
  const initialState = {
  'companySigDate': '',
  'companySignatureName': '',
  'documentName': '',
  'documentStatus': '',
  'documentType': '',
  'employeeNumber': '',
  'employeeSigDate': '',
  'employeeSignatureName': '',
  }
  const [addNewData, setAddData] = useState(initialState);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const token = localStorage.getItem('authToken');
  //запрос даты c сервера
  

  useEffect(() => {
    // console.log(addNewData, '⇦');
    fetchData(token).then(res => setData(res.data));
    // fetchData(token).then(res => setData(res.data))
  },[])
  const navigate = useNavigate();
  // console.log(addNewData,'!!!!!!')

  // 'companySigDate',
  // 'companySignatureName',
  // 'documentName',
  // 'documentStatus',
  // 'documentType',
  // 'employeeNumber',
  // 'employeeSigDate',
  // 'employeeSignatureName'

  //Добалвение в форму новой записи.
  function handleAddData (event) {
    const {value, name} = event.target;
    
    setAddData({
      ...addNewData,
      // companySigDate: new Date(value).toISOString(),
      // employeeSigDate: new Date(value).toISOString(),
      [name]: value,
    })
    // // setData([...data, addNewData])
  }
  function handleSendData (event) {
    event.preventDefault()

    // fetchAddData(token, addNewData)
    // setAddData(initialState)
    // // setData(initialState)
    // fetchData(token).then(res => setData(res.data))

    fetchAddData(token, addNewData)
    .then(() => {
      setAddData(initialState)
      return fetchData(token)
    })
    .then(res => {
      console.log(res, 'SERVER')
      return setData(res.data)})
  }

  //Удаление записи
  function handleDelete (id) {
    fetchDeleteData(token, id)
    .then(() =>  fetchData(token))
    .then(res => setData(res.data))
  }

  function handleEdit (val) {
    navigate('/edit');
  }

  console.log(data, '⇦STATE')
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="documents table">
          <TableHead>
            <TableRow>

              <TableCell>companySigDate</TableCell>
              <TableCell>companySignatureName</TableCell>
              <TableCell>documentName</TableCell>
              <TableCell>documentStatus</TableCell>
              <TableCell>documentType</TableCell>
              <TableCell>employeeNumber</TableCell>
              <TableCell>employeeSigDate</TableCell>
              <TableCell>employeeSignatureName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(val => {
              return (
                <TableRow key={val.id}>
                  <TableCell>{val.companySigDate}</TableCell>
                  <TableCell>{val.companySignatureName}</TableCell>
                  <TableCell>{val.documentName}</TableCell>
                  <TableCell>{val.documentStatus}</TableCell>
                  <TableCell>{val.documentType}</TableCell>
                  <TableCell>{val.employeeNumber}</TableCell>
                  <TableCell>{val.employeeSigDate}</TableCell>
                  <TableCell>{val.employeeSignatureName}</TableCell>
                  <Button onClick={() => handleDelete(val.id) } > Delete </Button>
                  {isOpenEdit && (
                    <Edit
                    value = {val}
                    token= {token}
                    id = {val.id}
                    setIsOpenEdit = {setIsOpenEdit}
                    setData = {setData}
                    />
                  )}
                  {/* <div>{val}</div> */}
                  <Button onClick={() => setIsOpenEdit(true)} > Edit </Button>
                  {/* <Button onClick={() => checkCORS() }> CORS </Button> */}
                  
                  <div>{val.id}</div>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <form onSubmit={handleSendData}>
        <div style={{ width: 'fit-content',  flexWrap: 'wrap', display: 'flex' }} >
          <div style={{ flex: '1', margin: '10px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>companySigDate</label>
              <input
                type={'date'}
                name = {'companySigDate'}
                value={addNewData.companySigDate}
                onChange={handleAddData}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }} >companySignatureName</label>
              <input
                type={'text'}
                name='companySignatureName'
                value = {addNewData.companySignatureName}
                onChange={handleAddData}
              />
            </div>
            <div >
            <label style={{ display: 'block', marginBottom: '5px' }} >documentName</label>
            <input
              type={'text'}
              name='documentName'
              value={addNewData.documentName}
              onChange={handleAddData}
            />
          </div>
          <div >
            <label style={{ display: 'block', marginBottom: '5px' }} >documentStatus</label>
            <input
              type={'text'}
              name={'documentStatus'}
              value = {addNewData.documentStatus}
              onChange={handleAddData}
            />
          </div>
          </div>
          <div style={{ flex: '1', margin: '10px' }}>
            <div >
            <label style={{ display: 'block', marginBottom: '5px' }} >documentType</label>
            <input
              type={'text'}
              name='documentType'
              value={addNewData.documentType}
              onChange={handleAddData}
            />
          </div>
          <div >
            <label style={{ display: 'block', marginBottom: '5px' }} >employeeNumber</label>
            <input
              type={'text'}
              name='employeeNumber'
              value={addNewData.employeeNumber}
              onChange={handleAddData}
            />
          </div>
          <div >
            <label style={{ display: 'block', marginBottom: '5px' }} >employeeSigDate</label>
            <input
              type={'date'}
              name='employeeSigDate'
              value={addNewData.employeeSigDate}
              onChange={handleAddData}
            />
          </div>
          <div >
            <label style={{ display: 'block', marginBottom: '5px' }} >employeeSignatureName</label>
            <input
              type={'text'}
              name={'employeeSignatureName'}
              value={addNewData.employeeSignatureName}
              onChange={handleAddData}
            />
          </div>
          </div>
          <div>
            <button type= 'submit' style ={{ width:'fit-content', height: '30px', marginTop: '25px'}} > ADD Data </button>
          </div>
        </div>
      </form>
    </div>

  );
}

// {
// 	"x": 1,
// 	"y": 2,
// }

// `{
// 	"x": 1,
// 	"y": 2,
// }`.split("")
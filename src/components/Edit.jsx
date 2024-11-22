import s from './style.module.css'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material"
import React, { useEffect, useState } from "react";
import { fetchEdit } from '../fetchEdit';
import {useNavigate} from 'react-router-dom'
import { fetchData } from '../fetchData';
export function Edit({ value, token, id, setIsOpenEdit, setData}) {
    const [changeData, setChangeData] = useState(value)
    useEffect(() => {
        // console.log(Object.entries(value), '👾')
        const valueNotId = Object.entries(value).filter(val => val[0] !== 'id');
        const obj = {}
        for(let arr of valueNotId) {
            obj[arr[0]] = arr[1]
        }
        setChangeData(obj)
        // console.log(obj)
    }, [value])


    function handleEdit (event) {
        const {name, value} = event.target;
        setChangeData((prev) => ({
            ...prev,
            [name] : value
        }))
    }
    function handleSubmit(event) {
        event.preventDefault()
        fetchEdit(token,id,changeData)
        .then(() => {
            setIsOpenEdit(false)
            return fetchData(token)
        })
        .then(val => setData(val.data))
        
        // navigate('/spreadsheet')
    }
    return (
        <div className={s.mainConEdit}>Edit
            <form onSubmit={handleSubmit}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {Object.entries(changeData) .map(([key, value]) => {
                    // const key = arr[0]
                    // const value = arr[1]
                    return (
                        <div style={{margin: '15px', flex: '1', textAlign: 'center'}} >
                            <label style={{ display: 'block', marginBottom: '5px' }}>{key}</label>
                            <input
                                name={key}
                                value={value}
                                onChange = {handleEdit}
                            />
                        </div>
                    )
                })}
                
                </div>
                <div style={{textAlign: 'center'}}>
                    <button type='submit'> Add Edit</button>
                </div>
                
            </form>
            
        </div>
    )
}
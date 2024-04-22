import React, { useState } from 'react';

const MainDynamic = () => {

    const empData = {
        firstName: '',
        lastName: '',
        email: '',
        isEmployeeid: 'no',
        empid:''
    }
    const [employeeData, setEmployeeData] = useState([empData]);

    const addEmployeeData = () => {
        setEmployeeData([...employeeData, empData]);
    };

    const handleForm = (e, index) => {

        const { name, value } = e.target;

        const updateUser = employeeData.map((emp, i) => {
            if (i == index) {
                return { ...emp, [name]: value }
            }
            return emp
        })
        setEmployeeData(updateUser)
    };

    console.log(employeeData)

    return (
        <>
            <button onClick={addEmployeeData}>+</button>
            {employeeData.map((item, index) => (
                <div key={index}>
                    <input placeholder='First Name' name='firstName' value={employeeData[index].firstName} onChange={(e) => handleForm(e, index)} />
                    <input placeholder='Last Name' name='lastName' value={employeeData[index].lastName} onChange={(e) => handleForm(e, index)} />
                    <input placeholder='Email' name='email' value='' onChange={(e) => handleForm(e, index)} />
                    <label htmlFor={`yes${index}`}>Yes</label>
                    <input type='radio' id={`yes${index}`} name='isEmployeeid' value='yes' onChange={(e) => handleForm(e, index)} />
                    <label htmlFor={`no${index}`}>No</label>
                    <input type='radio' name='isEmployeeid' id={`no${index}`} onChange={(e) => handleForm(e, index)} />
                    <br></br>
                    {employeeData[index].isEmployeeid=='yes' && <input type='text' name='empid' value={employeeData[index].empid} onChange={(e) => handleForm(e, index)} />}
                </div>
            ))}
        </>
    );
};

export default MainDynamic;

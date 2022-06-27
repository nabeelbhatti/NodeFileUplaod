import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header'
import{ useNavigate} from 'react-router-dom'

export default function BasicExampleDataGrid() {
  const navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async() => {
            /* */
            const data = await axios.get('http://localhost:5000/api/v1/user')
            setData(data.data.users)
          })()
    }, [])
    console.log(data)
   

      const columns = [
        { field: 'sheetNo', headerName: 'Sheet No', width: 150 },
        { field: 'catg', headerName: 'Catg', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'size', headerName: 'Size', width: 150 },
        { field: 'ownersName', headerName: 'Owners Name', width: 250 },
        { field: 'mobileNo', headerName: 'Mobile No', width: 150 },
        { field: 'secondMobileNo', headerName: '2nd Mobile No', width: 150 },
        { field: 'thirdMobileNo', headerName: '3rd Mobile No', width: 150 },
        { field: 'plotNo', headerName: 'Plot No', width: 150 },
        { field: 'secNo', headerName: 'Sec No', width: 150 },
        { field: 'communityCenter', headerName: 'Community Center', width: 150 },
        { field: 'refNo', headerName: 'Ref No', width: 150 },
        { field: 'emailId', headerName: 'Email Id', width: 150 },
        { field: 'cnicNo', headerName: 'Cnic #', width: 250 },
        { field: 'mem', headerName: 'MEM #', width: 150 },
        {  field: "Edit",
        renderCell: (cellValues) => {
          return (
            <button
             
            className='btn btn-primary'
              onClick={(event) => {
                // handleClick(event, cellValues);
              }}
            >
              Edit
            </button>
          );
        }},
        {  field: "Delete",
        renderCell: (cellValues) => {
          return (
            <button
             
            className='btn btn-danger'
              onClick={(event) => {
                // handleClick(event, cellValues);
              }}
            >
              Delete
            </button>
          );
        }}
      ];
const currentlySelected = async(e) => { 
  if(e.field === "Edit"){
    navigate(`/Add/${e.id}`)

  }
 else if(e.field === "Delete"){
  await axios.delete(`http://localhost:5000/api/v1/user/${e.id}`).then(async(res) => {
    const data = await axios.get('http://localhost:5000/api/v1/user')
    setData(data.data.users)

  }).catch(err => {
    alert(err)
  }
  )
  
  }
else{

  console.log(e)
}
 }
  return (
    <>
    <Header/>
    
    <div style={{  height: 700, width: '100%'  }}>
      <DataGrid loading={loading} onCellClick={currentlySelected} rows={data} columns={columns} components={{ Toolbar: GridToolbar }} getRowId ={(row) => row._id} />
    </div>
    </>
  );
}
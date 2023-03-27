import {FC, forwardRef} from "react"

//Third parties
import { 
  ChevronsUp, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  ChevronsLeft, 
  ChevronsRight,
  X,
  Eye
} from 'react-feather'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';

const DataTableComponent = ({ title, columns, data, actions, clickAction }) => {
  const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        icons={{
          SortArrow: () => <ChevronsUp size={12}/>,
          SearchIcon: () => <Search size={12}/>,
          PreviousPage: () => <ArrowLeft size={16}/>,
          NextPage: () => <ArrowRight size={16}/>,
          FirstPage: () => <ChevronsLeft size={16} />,
          LastPage: () => <ChevronsRight size={16} />,
          Clear: () => {<X size={16}/>},
          ViewColumn: () => {<Eye size={16}/>},
        }}
        title={title}
        columns={columns}
        data={data}
        actions={actions}
        onRowClick={((evt, selectedRow) => clickAction.push(`/Hotels/${selectedRow.id}`))}
        options={{
          actionsColumnIndex: -1,
          rowStyle: rowData => ({
            backgroundColor: rowData.state === 0 ? '#EEE' : '#ffff',
          })
         
        }}
      />
    </ThemeProvider>
  )
}

export default DataTableComponent
import {Container , Typography} from '@mui/material';
import MenuList from './components/MenuList';
import MenuForm from "./components/MenuForm";

function App(){
  return(
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4"  gutterBottom>
        Menu Management Dashboard 
        </Typography>
        <MenuForm />
        <MenuList />
    </Container>
  );
}

export default App;
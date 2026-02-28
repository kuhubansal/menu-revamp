import { useQuery } from "@tanstack/react-query";
import { fetchMenus } from "../api/menuApi";
import { CircularProgress, List, ListItem, ListItemText, Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";

export default function MenuList() {
    const [page, setPage] = useState(1);
    const [search , setSearch] = useState("");
    const { data, isLoading, isError, refetch} = useQuery({
    queryKey: ["menus", page, search],
    queryFn: async () => {
      const res = await fetchMenus(page, 6, search);
      console.log("Fetched menus:", res.data);
      return res.data;
    },
  });
  const totalPages = Math.ceil((data?.total || 0) / 6);
  const handleSearch=()=>{
    setPage(1); // reset to first page when searching
    refetch(); // manually refetch  
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return (
      <Typography color="error">
        Error loading menus: {(isError as any)?.message || "Unknown error"}
      </Typography>
    );

    if (!data || data.length === 0) {
    return <Typography>No menus found.</Typography>;
  }

  return (
    <Box>
      { /*Search Bar */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          variant="outlined"
          size="small"
          label="Search menus"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {/* Menu List */}
      <List>
        {data.menus.map((menu: any) => (
          <ListItem key={menu.menuid}>
            <ListItemText
            primary={menu.menuname}
            secondary={`Code: ${menu.menucode}`}
          />
        </ListItem>
      ))}
    </List>

    {/* Pagination buttons */}
    <Box display="flex" justifyContent="space-between" mt={2}>
    <Button
       variant="outlined"
       disabled={page === 1}
       onClick={() => setPage((p)=> p-1)}
       >
        Previous
       </Button>
       <Typography>Page {page}</Typography>
       <Button 
         variant="outlined"
         disabled={page >= totalPages}
         onClick={()=> setPage((p) => p+1)}
         >
          Next
         </Button>
    </Box>
    </Box>
  );
}

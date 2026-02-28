import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function MenuForm() {
  const [formData, setFormData] = useState({
    menuname: "",
    menucode: "",
    parentmenuid: "",
    menuownerid: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload:any) => {
      const res = await axios.post("http://localhost:3000/api/menus", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      setFormData({ menuname: "", menucode: "", parentmenuid: "", menuownerid: "" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  const payload = { ...formData,
    parentmenuid: formData.parentmenuid ? Number(formData.parentmenuid) : null };
    mutation.mutate(payload);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        width: 350,
        margin: "20px auto",
      }}
    >
      <Typography variant="h6" textAlign="center">
        Add New Menu
      </Typography>

      <TextField
        label="Menu Name"
        name="menuname"
        value={formData.menuname}
        onChange={handleChange}
        required
      />
      <TextField
        label="Menu Code"
        name="menucode"
        value={formData.menucode}
        onChange={handleChange}
        required
      />
      <TextField
        label="Parent Menu ID"
        name="parentmenuid"
        value={formData.parentmenuid}
        onChange={handleChange}
      />
      <TextField
        label="Menu Owner ID"
        name="menuownerid"
        value={formData.menuownerid}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Adding..." : "Add Menu"}
      </Button>

      {mutation.isError && (
        <Typography color="error" textAlign="center">
          Failed to add menu. Try again.
        </Typography>
      )}
      {mutation.isSuccess && (
        <Typography color="success.main" textAlign="center">
          Menu added successfully!
        </Typography>
      )}
    </Box>
  );
}
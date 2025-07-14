"use client"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, TextField, Switch } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

const [darkMode, setDarkMode] = useState<boolean>(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : false;
});
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
      },
    },
  });

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setTaskTitle("");
    setOpenAdd(false);
  };

  const handleAdd = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, taskTitle.trim()]);
      handleCloseAdd();
    }
  };

  const handleDelete = (index: number) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleOpenEdit = (index: number) => {
    setEditIndex(index);
    setTaskTitle(tasks[index]);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditIndex(null);
    setTaskTitle("");
  };

  const handleUpdate = () => {
    if (editIndex !== null && taskTitle.trim()) {
      const updated = [...tasks];
      updated[editIndex] = taskTitle.trim();
      setTasks(updated);
      handleCloseEdit();
    }
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`${darkMode ? "bg-black" : "bg-white"} min-h-screen flex flex-col items-center pt-10`}>
        <div className={`text-4xl ${darkMode ? "text-white" : "text-gray-900"} mb-6`}>
          Task Management Dashboard
        </div>

        <TextField
          label="Search-task..."
          className="mb-4 w-210"
          InputProps={{
            style: { color: darkMode ? "#ffffff" : "#000000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#ffffff" : "#757575" },
          }}
        />
        <Switch className="mt-7" checked={darkMode} onChange={handleThemeToggle} />

        <div className="w-210 space-y-6">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-xl rounded-lg p-6`}
            >
              <div className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"} mb-6`}>{task}</div>

              <div className="flex gap-2">
                <IconButton onClick={() => handleDelete(index)} color="error">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenEdit(index)}>
                  <EditIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>

        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            boxShadow: 3,
          }}
          onClick={handleOpenAdd}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={openAdd}
          onClose={handleCloseAdd}
          fullWidth
          PaperProps={{
            style: { backgroundColor: darkMode ? "#1e1e1e" : "#ffffff" },
          }}
        >
          <DialogTitle sx={{ color: darkMode ? "#ffffff" : "#000000" }}>Add Task</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Task Title"
              fullWidth
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              InputProps={{
                style: { color: darkMode ? "#ffffff" : "#000000" },
              }}
              InputLabelProps={{
                style: { color: darkMode ? "#ffffff" : "#757575" },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="error">
              Cancel
            </Button>
            <Button onClick={handleAdd} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: { backgroundColor: darkMode ? "#1e1e1e" : "#ffffff" },
          }}
        >
          <DialogTitle sx={{ color: darkMode ? "#ffffff" : "#000000" }}>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              InputProps={{
                style: { color: darkMode ? "#ffffff" : "#000000" },
              }}
              InputLabelProps={{
                style: { color: darkMode ? "#ffffff" : "#757575" },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="error">
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
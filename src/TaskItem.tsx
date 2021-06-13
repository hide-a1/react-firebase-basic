import { Grid, ListItem, TextField } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import React, { useState } from "react";
import { db } from "./firebase";
import styles from "./TaskItem.module.css";

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };
  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };
  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify="flex-end">
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Grid>
      <button className={styles.taskitem_icon} onClick={editTask}>
        <EditOutlinedIcon />
      </button>
      <button className={styles.taskitem_icon} onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </ListItem>
  );
};

export default TaskItem;

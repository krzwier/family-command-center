import { Row, Col, Collapse } from "react-bootstrap";
import { useTasks } from "../hooks/UseTasks";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { PropTypes } from "prop-types";
import {
  Accordion,
  AccordionDetails,
  Card,
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";

export const Routine = ({
  routine,
  color,
  incrementPointBalance,
  decrementPointBalance,
}) => {
  const { tasks, toggleTaskCompletion, listIsComplete } = useTasks(
    routine.RoutineId,
    incrementPointBalance,
    decrementPointBalance,
    routine.IsCompleted
  );
  const [expanded, setExpanded] = useState(!listIsComplete);

  useEffect(() => {
    if (listIsComplete) {
      setExpanded(false);
    }
  }, [listIsComplete]);

  return (
    <Accordion component={Card} expanded={expanded}>
      <CardHeader
        avatar={<img src={routine.IconPath} height="50px" />}
        title={routine.RoutineDisplayName}
        onClick={() => setExpanded(!expanded)}
        action={
          <Checkbox
            checked={listIsComplete}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<TaskAltIcon />}
            size="large"
          />
        }
      />
      <AccordionDetails>
        <List sx={{ width: "100%" }}>
          {tasks.map((task) => {
            const labelId = `input-routine${routine.RoutineId}task${task.TaskId}`;
            return (
              <ListItem
                key={task.TaskId}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    key={task.TaskId}
                    // value={task.completed}
                    onChange={
                      (event) => toggleTaskCompletion(task.TaskId)
                      // parseInt(
                      //   event.target.id.substring(
                      //     event.target.id.indexOf("task") + 4
                      //   )
                      // )
                      //   )
                    }
                    checked={task.completed}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <img src={task.IconPath} height="50px" className="pe-4" />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={task.TaskDescription} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

{
  /* <input
              type="checkbox"
              id={`input-routine${routine.RoutineId}task${task.TaskId}`}
              value={task.TaskId}
              className="w-25"
              checked={task.completed}
              onChange={(event) =>
                toggleTaskCompletion(
                  parseInt(
                    event.target.id.substring(
                      event.target.id.indexOf("task") + 4
                    )
                  )
                )
              }
            />
            <label
              htmlFor={`input-routine${routine.RoutineId}task${task.TaskId}`}
              className="taskDescription"
            >
              <img src={task.IconPath} height="50px" className="pe-4" />
              {task.TaskDescription}
            </label>
          
          */
}

Routine.propTypes = {
  routine: PropTypes.object,
  color: PropTypes.string,
  incrementPointBalance: PropTypes.func,
  decrementPointBalance: PropTypes.func,
};

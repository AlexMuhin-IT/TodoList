import React, { ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"

type Props = {
  value: string
  onChange: (newTitle: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState<string>(value)

  const onTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const changeEditModeHandler = () => {
    setEditMode(!editMode)
    onChange(title)
  }
  return (
    <div>
      {editMode ? (
        <TextField size={"small"} onChange={onTitleHandler} onBlur={changeEditModeHandler} value={title} autoFocus />
      ) : (
        <span onDoubleClick={changeEditModeHandler}>{value}</span>
      )}
    </div>
  )
}

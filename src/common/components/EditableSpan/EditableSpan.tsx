import React, { ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"

type Props = {
  value: string
  onChange: (newTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = ({
  value,
  onChange,
  disabled,
}: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState<string>(value)

  const onTitleHandler = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(e.currentTarget.value)
  }
  const changeEditModeHandler = () => {
    setEditMode(!editMode)
    onChange(title)
  }
  return (
    <div>
      {editMode && !disabled ? (
        <TextField
          size={"small"}
          onChange={onTitleHandler}
          onBlur={changeEditModeHandler}
          value={title}
          autoFocus
          disabled={disabled}
        />
      ) : (
        <span onDoubleClick={changeEditModeHandler}>
          {value}
        </span>
      )}
    </div>
  )
}

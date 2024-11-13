import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { Button, TextField } from "@mui/material"
import { Send } from "@mui/icons-material"

type Props = {
  addItem: (title: string) => void
}
export const AddItemForm = React.memo(({ addItem }: Props) => {
  // console.log("addItemForm is called")

  const [title, setNewTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim())
      setNewTitle("")
    } else {
      setError("Title is required")
    }
  }
  const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        id="filled-basic"
        label="Введите название"
        variant="filled"
        className={error ? "error" : ""}
        type="text"
        value={title}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
        error={!!error}
        helperText={error}
      />
      <Button onClick={addItemHandler} variant="contained" endIcon={<Send />} size={"small"}>
        Send
      </Button>
    </div>
  )
})

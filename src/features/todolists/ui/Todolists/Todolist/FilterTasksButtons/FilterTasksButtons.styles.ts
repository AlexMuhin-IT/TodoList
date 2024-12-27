// import { SxProps } from "@mui/material"
//
// export const filterButtonsContainerSx: SxProps = () => ({
//   display: "flex",
//   justifyContent: "space-around",
//   color: "secondary",
//   "&:active": {
//     boxShadow: "none",
//     backgroundColor: "#0062cc",
//     borderColor: "#005cbf",
//     borderBlockColor: "black",
//   },
//
// })
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"

export const BootstrapButton = styled(Button)(({ isActive }: { isActive: boolean }) => ({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 12,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  // color: "white",
  backgroundColor: isActive ? "#00d91d" : "#00d91d",
  borderColor: isActive ? "#00d91d" : "green",
  color: isActive ? "white" : "inherit",
  "&:hover": {
    backgroundColor: isActive ? "#00d91d" : "#0063cc",
    borderColor: "#00d91d",
    boxShadow: "none",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}))

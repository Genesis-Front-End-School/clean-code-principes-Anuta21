import { Switch } from "@mui/material";
import { commonSlice, useAppSelector } from "../../redux";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export const Switcher: React.FC = () => {
  const dispatch = useDispatch();
  const { darkMode } = useAppSelector((state) => state.persistedReducer.common);
  const { setMode } = commonSlice.actions;

  const handleChange = () => {
    dispatch(setMode(!darkMode));
  };

  return (
    <Wrapper darkMode={darkMode}>
      <>light / dark</>
      <Switch checked={darkMode} onChange={handleChange} />
    </Wrapper>
  );
};


import { useContext } from "react";
import CtxContext from "./ContextProvider";

const useCTX = () => {
    return useContext(CtxContext);
}

export default useCTX;

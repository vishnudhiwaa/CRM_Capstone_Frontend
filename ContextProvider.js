
import { createContext, useState } from "react";

const CtxContext = createContext({});

export const ContextProvider = ({children}) => {

    const [request, setRequest] = useState({}); 
    const [order, setOrder] = useState({}); 
    const [requestM, setRequestM] = useState({}); 
    const [requestY, setRequestY] = useState({}); 
    const [cLead, setCLead] = useState({})

    return (
        <CtxContext.Provider value={{request, setRequest, 
        requestY, setRequestY, requestM, setRequestM, order, setOrder, cLead, setCLead }}>
            {children}
        </CtxContext.Provider>
    )
}

export default CtxContext;

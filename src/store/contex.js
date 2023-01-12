import { useState, createContext } from "react";
const Context = createContext({
  page: 1,
  id:'',
  type:'',
  night:'',
  changePage:(page)=>{},
  changeId:(id)=>{},
  changeType:(type)=>{},
  setNight:(mode)=>{},
});

export function ContextProvider(props) {
  const [page, setPage] = useState(1);
  const [id, setId] = useState();
  const [type, setType] = useState();
  const [night, setNightMode] = useState();
  function changePage(page) {
    setPage(page);
  }
  function changeId(id) {
    setId(id);
  }
  function changeType(type) {
    setType(type);
  }
  function setNight(mode) {
    setNightMode(mode);
  }
  const contextValues = {
    page: page,
    id:id,
    type:type,
    night:night,
    changePage:changePage,
    changeId:changeId,
    changeType:changeType, 
    setNight:setNight,  
  };
  return<Context.Provider value={contextValues}>{props.children}</Context.Provider>
}
export default Context
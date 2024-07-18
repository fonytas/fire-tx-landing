import { createContext, FC, useContext, useState } from "react";

interface SelectListContext {
  list: string[];
  add: (item: string) => void;
  remove: (item: string) => void;
  addMany: (items: string[]) => void;
  removeMany: (items: string[]) => void;
}

const SelectListContext = createContext<SelectListContext>({
  list: [],
  add: () => {},
  remove: () => {},
  addMany: () => {},
  removeMany: () => {},
})

interface SelectListProviderProps {
  children?: any;
}

export const SelectListProvider: FC<SelectListProviderProps> = ({children}) => {
  const [list, setList] = useState<string[]>([])
  const add = (item: string) => {
    if (!list.includes(item)) {
      setList([...list, item]) 
    }
  }
  const addMany = (items: string[]) => {
    const filtered = items.filter((e) => !list.includes(e))
    setList([...list, ...filtered]) 
  }

  const remove = (item: string) => {
    if (list.includes(item)) {
      setList([...list.filter((i) => i !== item)]) 
    }
  }
  const removeMany = (items: string[]) => {
    const filtered = items.filter((e) => list.includes(e))
    setList([...list.filter((i) => !filtered.includes(i))]) 
  }
  console.log(list)
  return (
    <SelectListContext.Provider value={{
      list,
      add,
      remove,
      addMany,
      removeMany,
    }}>
      {children}
    </SelectListContext.Provider>
  )
}

export const useSelectList = () => useContext(SelectListContext)
import { useState, useCallback, useEffect, ReactPortal } from "react"
import ReactDom from "react-dom"

//Hook que crea un portal
//Nota: el onClick en el portal no funciona, se debe usar la propiedad onMouseDown
//const Portal = usePortal(document.queryselector("#idDelContenedor"))
//<Portal>codigo html</Portal>
const usePortal = (el) => {
    //State para renderizar y remover
  const [portal, setPortal] = useState({
    render: () => null,
    remove: () => null
  })

  //Se usa el hook de useCallback para envolver y memorizar los archivos en createportal
  const createPortal = useCallback((el) => {
    const Portal = ({ children }) => ReactDom.createPortal(children, el)
    const remove = () => ReactDom.unmountComponentAtNode.bind(el)

    const result = { 
      render: Portal, 
      remove 
    }
    return result
  }, [])

  //Se usa el useEffect para actualizar los datos del portal cada vez que se actualiza
  //el id del contenedor
  useEffect(() => {
    if (el) portal.remove()
    const newPortal = createPortal(el)
    setPortal(newPortal)
    return () => {
      newPortal.remove()
    }
  }, [el])

  //Renderizamos el portal
  return portal.render
}

export default usePortal

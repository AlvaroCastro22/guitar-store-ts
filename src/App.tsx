

import './App.css'
import Header from './components/Header.tsx'
import Guitar from './components/Guitar.tsx'

import { useCart } from './hooks/useCart.ts'
function App() {
    const {data,carrito,addCarrito,removeFromCarrito,addCantidad,decreaseCantidad,clearCarrito,totalPagar,isEmpty} = useCart()
    
  return (
    <>
   
    <Header  carrito={carrito} removeFromCarrito={removeFromCarrito} addCantidad={addCantidad} decreaseCantidad={decreaseCantidad} clearCarrito={clearCarrito} totalPagar={totalPagar} isEmpty={isEmpty}/>
    <main className="container-xl mt-5">
        <h2 className="text-center" >Nuestra Colección</h2>
        <div className="row mt-5">
            {data.map((guitar)=>(
                <Guitar props={guitar} key={guitar.id} addCarrito={addCarrito}/>
                ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
</>
  )
}

export default App

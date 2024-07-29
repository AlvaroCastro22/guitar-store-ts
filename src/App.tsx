

import './App.css'
import Header from './components/Header.tsx'
import Guitar from './components/Guitar.tsx'

import { useEffect, useReducer } from 'react'
import { cartReducer, initialState } from './reducers/cart-reducer.ts'
function App() {
    
    const [state,dispatch] = useReducer(cartReducer,initialState)
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(state.cart))
      },[state.cart])
  return (
    <>
   
    <Header dispatch={dispatch} state={state}/>
    <main className="container-xl mt-5">
        <h2 className="text-center" >Nuestra Colección</h2>
        <div className="row mt-5">
            {state.data.map((guitar)=>(
                <Guitar props={guitar} key={guitar.id} dispatch={dispatch}/>
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

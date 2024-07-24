import { useEffect, useState,useMemo } from 'react'
import {db} from  "../data/db";
import type { Guitar,CartItem } from '../types';
export const useCart = () => {
    const MAX_ITEMS = 6;
    const initialCarrito = () : CartItem[] =>{
        const localStorageCarrito = localStorage.getItem('cart')
        return localStorageCarrito ? JSON.parse(localStorageCarrito) : []
    }

    const [data] = useState(db);

    const [carrito,setCarrito] = useState(initialCarrito);

    function addCarrito(item:Guitar){
        let repetido = carrito.findIndex(prev=>prev.id==item.id)
        if (repetido>=0) {
            if(carrito[repetido].cantidad>=MAX_ITEMS) return 
            let nuevoCarrito = [...carrito]
            nuevoCarrito[repetido].cantidad++
            setCarrito(nuevoCarrito)
        } else {
            const newItem : CartItem = {...item, cantidad : 1}
            setCarrito(prev=>[...prev,newItem])
        }
        // saveLocalStorage()
        // setCarrito(prev=>{
        //     let repetido = carrito.findIndex(prev=>prev.id==id)
        //     if (repetido>=0) {
                
        //         return prev.map(y=>{
                    
        //             return y.id==id ? {...y,cantidad:y.cantidad+1} : y
                    
        //         })
        //     } else {
                
        //         return [...prev,{id:id,cantidad:1}]
        //     }
            
            
        // })
    }
    function removeFromCarrito(id:Guitar['id']){
        console.log(id);
        setCarrito(x=>x.filter(y=>y.id!=id))
    }
    function addCantidad(id:Guitar['id']){
        setCarrito(prev=>prev.map(x=>
            {
                return x.id==id && x.cantidad<MAX_ITEMS  ? {...x,cantidad:x.cantidad++} : x 
            }))
    }
    function decreaseCantidad(id:Guitar['id']){
        setCarrito(prev=>prev.map(x=>
            {
                return (x.id==id && x.cantidad>1) ? {...x,cantidad:x.cantidad-1} : x 
            }))
    }
    function clearCarrito(){
        // let nuevoCarrito = [...carrito]
        // nuevoCarrito.splice(0,nuevoCarrito.length)
        // setCarrito(nuevoCarrito)
        setCarrito([])
    }
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(carrito))
    },[carrito])
    



    
    
    const initialValue = 0;
      
    const totalPagar =useMemo(()=>carrito.reduce((accumulator,currentValue) => accumulator + currentValue.price*currentValue.cantidad,initialValue,),[carrito]) 

    //State derivado
    const isEmpty = useMemo(() => carrito.length === 0,[carrito]) ;
    return {
        data,carrito,addCarrito,removeFromCarrito,addCantidad,decreaseCantidad,clearCarrito,totalPagar,isEmpty
    }
}
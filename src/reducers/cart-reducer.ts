import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

export type CartActions = {
    type:'add-item'
    payload:{
        newItem:Guitar
    } 
}
|{
    type: 'remove-item'
    payload:{
        id: Guitar['id']
    }
}
|{
    type: 'decrease-quantity'
    payload:{
        id: Guitar['id']
    }
}
|{
    type: 'increase-quantity'
    payload:{
        id: Guitar['id']
    }
}
|{
    type: 'clean-cart'
}
export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}
const localStorageActivities = ():CartItem[]=>{
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
}
export const initialState:CartState = {
    data: db,
    cart:localStorageActivities()
}

export const cartReducer = (state:CartState=initialState,action:CartActions) =>{
    if(action.type=="add-item"){
        console.log("Desde add item");
        let repetido = state.cart.find(prev=>prev.id==action.payload.newItem.id)
        let updatedCart :CartItem[]=[]
        if (repetido) {
            updatedCart = state.cart.map(item=>{
                if (item.id==action.payload.newItem.id) {
                    if (item.cantidad<5) {
                        return {...item,cantidad:item.cantidad+1}
                    }else{
                        return item
                    }
                }else{
                    return item
                }
            })
            
        } else {
            const newItem : CartItem = {...action.payload.newItem, cantidad : 1}
            updatedCart = [...state.cart,newItem]
        }
        return {
            ...state,
            cart:updatedCart
        }
    }
    if(action.type=="clean-cart"){
        return {...state, cart:[]}
    }
    if (action.type=="decrease-quantity") {
        
        const newState = state.cart.map(item=>{
            if (item.id==action.payload.id) {
                if (item.cantidad!=1) {
                    return {...item,cantidad:item.cantidad-1}
                }
                return item
            }else{
                return item
            }
        })
        
        
        return {...state,cart:newState}
    }
    if (action.type=="increase-quantity") {
        const newState = state.cart.map(item=>{
            if (item.id==action.payload.id) {
                if (item.cantidad==5) {
                    return item
                }
                return {...item,cantidad:item.cantidad+1}
            }else{
                return item
            }
        })
        
        
        return {...state,cart:newState}
    }
    if (action.type=="remove-item") {
        const newState = state.cart.filter(item=>item.id!=action.payload.id)
        
        
        return {...state,cart:newState}
        
    }
    return state
}
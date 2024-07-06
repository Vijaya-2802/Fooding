import React from 'react'
import { useCart, useDispatchCart } from '../components/Contextreducer'
export default function Cart() {
    let data=useCart();//Data is a type of array
    let dispatch=useDispatchCart();
    if(data.length===0){
        return(
            <div>
                <div className='m-5 w-100 text-center text-white fs-3'>The cart is empty</div>
            </div>
        )
    }
    const handleCheckOut = async (e) => {
      try{
        let userEmail = localStorage.getItem("userEmail");
        console.log("handlecheckout",userEmail);
        console.log("handlecheckout",data);
        let response = await fetch("http://localhost:5000/api/orderData", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
          })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
          dispatch({ type: "DROP" })
        }
      }
      catch(e){
        console.log(e);
      }
    }
    let totalPrice=data.reduce((total,food)=>total+food.price,0)
  return (
    <div className=''>
      {/* {console.log(data)}; */}
        <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className='table table-hover'>
                <thead >
                    <tr >
                        <th className='text-success fs-4' scope='col'>#</th>
                        <th className='text-success fs-4' scope='col'>Name</th>
                        <th className='text-success fs-4' scope='col'>Quantity</th>
                        <th className='text-success fs-4' scope='col'>Option</th>
                        <th className='text-success fs-4' scope='col'>Amount</th>
                        <th className='text-success fs-4' scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((food,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type="button" className="btn p-0" onClick={()=>{dispatch({type:"REMOVE", index: index})}}>🗑️</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div><h1 className='fs-2  text-white'>Total Price: {totalPrice}/-</h1></div>
            <div>
                <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut} >Check Out</button>
            </div>
        </div>  
    </div>
  )
}

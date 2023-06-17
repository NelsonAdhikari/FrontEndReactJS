import { Button } from "react-bootstrap"
import {RiDeleteBin5Fill} from 'react-icons/ri' 
import {GrView} from 'react-icons/gr'
import {GrUpdate} from 'react-icons/gr'
const SingleProductView=({
    index,
    product
})=>{
    const formatDate=(time)=>{
        return new Date(time).toLocaleString()

    }
    const getBackgroundForProduct=()=>{
        // live + stock ==>green:table-success
        // not live ==> red:table-danger
        //not stock ==> yellow: table-warning

        if(product.live && product.stock ){
            return "table-success"
        }else if(!product.live){
            return "table-danger"
        }else if(!product.stock){
            return "table-warning"
        }else{

        }
        
    }
    
    return(
        <tr className={getBackgroundForProduct()}>
                            <td className="px-2 small">{index + 1}</td>
                            <td className="px-2 small">{product.title}</td>
                            <td className="px-2 small">{product.quantity}</td>
                            <td className="px-2 small">{product.price}</td>
                            <td className="px-2 small">{product.discountedPrice}</td>
                            <td className="px-2 small">{product.live ? 'LIVE' : 'NOT'}</td>
                            <td className="px-2 small">{product.stock? 'IN' : 'OUT'}</td>
                            <td className="px-2 small">{product.category ? product.category.title : 'null'}</td>
                            <td className="px-2 small">{formatDate(product.addedDate)}</td>
                            <td className={`px-2 small d-flex table-light`}>
                                <Button  variant="danger"  size="sm">
                                <RiDeleteBin5Fill/>
                                </Button>
                                <Button className=" ms-2" variant="warning" size="sm">
                                <GrView/>
                                </Button>
                                <Button className="ms-2" variant="success" size="sm">
                                <GrUpdate/>
                                </Button>
                            </td>
                        </tr>   
    )
}

export default SingleProductView;
import { Button } from "react-bootstrap"
import {RiDeleteBin5Fill} from 'react-icons/ri' 
import {GrView} from 'react-icons/gr'
import {GrUpdate} from 'react-icons/gr'
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { deleteProduct } from "../../services/product.service"
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
const SingleProductView=({
    index,
    product,
    updateProductList,
    openProductViewModal
})=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    //delete product
    const deleteProductLocal=(productId)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to see this category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                //call api
              deleteProduct(product.productId).then(data=>{
                console.log(data);
                toast.success("product deleted")
 
                    updateProductList(productId)
              
              })
              .catch(error=>{
                console.log(error)
                toast.error("Failed to delete product")
              })
            }
          })
    }

    //modal view
    const viewProductModalView=()=>{
        return(
            <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
        )
    }
    
    return(
        <tr className={getBackgroundForProduct()}>
                            <td className="px-2 small">{index + 1}</td>
                            <td className="px-2 small">{product.title}</td>
                            <td className="px-2 small">{product.quantity}</td>
                            <td className="px-2 small">Rs.{product.price}</td>
                            <td className="px-2 small">Rs.{product.discountedPrice}</td>
                            <td className="px-2 small">{product.live ? 'LIVE' : 'NOT'}</td>
                            <td className="px-2 small">{product.stock? 'IN' : 'OUT'}</td>
                            <td className="px-2 small">{product.category ? product.category.title : 'null'}</td>
                            <td className="px-2 small">{formatDate(product.addedDate)}</td>
                            <td className={`px-2 small d-flex table-light`}>
                                <Button  variant="danger" onClick={(event)=>deleteProductLocal(product.productId)}  size="sm">
                                <RiDeleteBin5Fill/>
                                </Button>
                                <Button className=" ms-2" onClick={(event)=>openProductViewModal(event,product)} variant="warning" size="sm">
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
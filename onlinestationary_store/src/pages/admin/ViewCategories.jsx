import { useEffect, useState } from "react"
import CategoryView from "../../components/CategoryView"
import {getCategories} from "../../services/CategoryService"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const ViewCategories=()=>{

    const [categories,setCategories]=useState({
        content:[]
    })

    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        getCategories()
        .then(data=>{
            console.log(data)
            setCategories(data)
        })
        .catch(error=>{
            console.log(error)
            toast.error("Error loading Category")
        })
        .finally(()=>{
            setLoading(false)
        })
    }, [])
        //delete category main function
        const deleteCategoryMain=(categoryId)=>{
            // alert(categoryId)
    

        //sweet alert:

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                //call api
              deleteCategory(categoryId)
              .then(data=>{
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
              })
              .catch(error=>{
                console.log(error)
                toast.error("Error in deleting category")
              })
            }
          })
        }
        //api call

    return(
        <>
          {
            categories.content.map((category)=>{
               return( <CategoryView deleteCat={deleteCategoryMain} category={category} key={category.categoryId}/> )
            })
          }
        </>
    )
}

export default ViewCategories
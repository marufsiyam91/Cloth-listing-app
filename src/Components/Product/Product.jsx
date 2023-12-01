import React from 'react'
import {MdDelete} from 'react-icons/md'

const Product = ({item, handledelete}) => {
  console.log(item)
  const {clothName, clothId,clothPrice, clothQuantity, description, color, clothSize,check, date} = item

  return (
    <>
    <div>
          <hr/>
      </div>
     <tr>
          <td>{clothName}</td>
          <td>{clothId}</td>
          <td>{clothPrice}</td>
          <td>{clothQuantity}</td>
          <td>{description}</td>
          <td>{color}</td>
          <td>{clothSize}</td>
          <td>{check}</td>
          <td>{date}</td>
          <td onClick={() => handledelete(clothId)} className='delete_btn'>
                    <MdDelete color='red'/>
          </td>
      </tr>
        

      
    </>
              

  )
}

export default Product



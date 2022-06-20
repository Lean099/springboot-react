import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './Home'
import { FormModal } from './FormModal'

export const Input = ()=>{

    const context = useContext(Context)

    return(
      <div className="mt-2">
        <textarea type="text" className="form-control"/>
        {
          context.pageState.isAuthenticated ? 
                <button className="btn btn-dark btn-sm mt-2">Ask</button> 
                :
                <FormModal/>
        }
      </div>
    )
}
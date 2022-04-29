import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

export const SortQA = ()=>{
  return(
    <div className="d-flex justify-content-end">
      <div class="btn-group mt-2 dropstart">
        <button class="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <FontAwesomeIcon icon={faFilter} className="me-1" />Sort
        </button>
        <ul class="dropdown-menu">
          <li><button class="dropdown-item">All</button></li>
          <li><button class="dropdown-item">My questions</button></li>
          <li><button class="dropdown-item">My answers</button></li>
        </ul>
      </div>
    </div>
  )
}
import { Header } from './Header'
import { Input } from './Input'
import { QuestionsAndAnswers } from './QuestionsAndAnswers'
import { SortQA } from './SortQA'

export const Home = ()=>{

  return(
      <div class="container" style={{maxWidth: "1000px"}}>
          <Header/>
          <Input/>
          <SortQA/>
          <QuestionsAndAnswers/>
      </div>
  )
}
import './App.css'
import Greeting from './greeting.jsx'

const students = [
  {name: "Matt",
    pizza : "Pepperoni"},
  {name: "Bushra",
    pizza : "Mushroom"},
  {name: "Vani",
    pizza : "Pineapple"},
  {name: "Lane",
    pizza : "Sausage"},
  {name: "Sam",
    pizza : "Cheese"},
  {name: "Tom",
    pizza : "Veggie"},
  {name: "Max",
    pizza : "BBQ Chicken"},
]

function App() {
  return (
    <main>
      <h1>Hello Class</h1>
      <ul>
        <h2> Hello Students </h2>
        <li>{students.map(student=><Greeting name={student.name} pizza={student.pizza}/>)}</li>
      </ul>
    </main>
  )
}

export default App

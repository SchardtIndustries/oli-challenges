function Greeting({name, pizza}) {
  return <li>
    <h3>Hello, {}{name}</h3> 
        <p>Have a great day!</p>
        <p>{name} is a 
            {name.length>4 ? ' long' : ' short'} name.
        </p>
        {pizza && <p>Your favorite pizza is {pizza}.</p>}
    </li>;
}

export default Greeting;
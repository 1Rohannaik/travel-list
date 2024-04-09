import { useState } from "react";
import "./index.css";

function App() {

  const [items, setItems] = useState([]);
    const handelAddItems = (item) => {
      setItems((items) => [...items, item]);
    };
  
  const handelRemove = (id) => {
    const arr = items.filter((data) => {
      return (
        data.id !== id
      )
    })
    setItems(arr)
  }
  const handelClearList = () => {
    setItems("")
  }
  return (
    <div>
      <Logo />
      <Form handelAddItems={handelAddItems} />
      <PackingList
        items={items}
        handelRemove={handelRemove}
        handelClearList={handelClearList}
      />
      <Stats items={items} />
    </div>
  );
}
const Logo = () => {
  return (
    <div>
      <h1>🌴 far away</h1>
    </div>
  );
};
const Form = ({handelAddItems}) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


  const handelSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItems = {
      description,
      quantity,
      packed: false,
      id: Math.random(),
    };
    console.log(newItems)
    setDescription("");
    setQuantity(1);

    handelAddItems(newItems);
  };

  const handelClick = () => {};
  return (
    <form className="add-form" onSubmit={handelSubmit}>
      <h3>what do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handelClick}>add</button>
    </form>
  );
};
const PackingList = ({ items, handelRemove, handelClearList }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return <Item item={item} handelRemove={handelRemove} key={item.id} />;
        })}
      </ul>
      <div>
        <button onClick={handelClearList}>clear list</button>
      </div>
    </div>
  );
};
const Item = ({ item, handelRemove }) => {
  return (
    <div>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => handelRemove(item.id)}>❌</button>
      </li>
    </div>
  );
};
const Stats = ({items}) => {
const numItems = items.length
  return (
    <footer className="stats">
      <em>
        💼you have {numItems} items in your list
      </em>
    </footer>
  );
};

export default App;

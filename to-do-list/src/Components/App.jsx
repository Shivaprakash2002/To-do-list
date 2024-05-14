import React from 'react'
import { useState } from 'react';


function App() {
    
    const [items,setItems] = useState([
        {
            id : 1,
            item : "Daily Running",
            time : "5.00 AM",
            checked : true
        },
        {
            id : 2,
            item : "Reading Books",
            time : "7.00 AM",
            checked : false
        },
        {
        id : 3,
        item : "Going to Gym",
        time : "5.00 PM",
        checked : false
        }
    ]
    );

    const handleChange = (id) => {
        const newitems = items.map((item) => 
            item.id === id ? {...item,checked:!item.checked} : item
        )
        setItems(newitems);
    }

    const deleteElement = (id) => {
        const deleteitems = items.filter((item) => 
        item.id !== id)
        setItems(deleteitems);
    }
    
    const [visible,isVisible] = useState(false);
    const [formdata,setformData] = useState({
        list : '',
        time : ''
    })
    
    const toggleOn = () => {
        isVisible(!visible);
    }
  
    const handleinput = (e) => {
        const {name,value} = e.target;
        setformData({
            ...formdata,
            [name] : value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formdata);
        setformData({
            list: '',
            time: '',
        });
        isVisible(!visible);
        const key = items.length ? items.length + 1 : items.length;
        const addItems = {
            id: key,
            item: formdata.list,
            time: formdata.time,
            checked: false
        }
        const listitems = [...items , addItems];
        setItems(listitems);
    };

  return (
    <>
    <button onClick={toggleOn} style={{width : '120px'}} className='newlist'>Create New List</button>
    {visible  &&
       <div className="overlay">
                <div className="list">
                  <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter the List" value={formdata.list} name='list'
                    onChange={handleinput}/>
                    <input type="time" placeholder="Enter the Time" value={formdata.time} name='time'
                    onChange={handleinput}/>
                    <button type='submit'>submit</button>
                  </form>
                </div>
            </div>
    }
    <main>
      {items.length <= 0 ? (
  <div>The List is empty</div>
) : ( 
  <ul>
    {items.map((list) => (
      <li className='item' key={list.id}>
        <input
          type="checkbox"
          checked={list.checked}
          onChange={() => handleChange(list.id)}
        />
        <label
          style={list.checked ? { textDecoration: "line-through" } : null}
          onDoubleClick={() => handleChange(list.id)}
        >
          {list.item}
        </label>
        <label>{list.time}</label>
        <button onClick={() => deleteElement(list.id)}>delete</button>
      </li>
    ))}
  </ul>
)}
    </main>
    </>
  )
}

export default App;
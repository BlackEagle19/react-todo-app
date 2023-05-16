import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  function addItem() {
    if (!newItem) {
      alert('Bir şey girin');
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    setItems((oldList) => [...oldList, item]);
    setNewItem('');
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function completeItem(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  }

  return (
    <div className="todo-app">
      <h1>Yapılacaklar Listesi</h1>
      <form
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
      >
        <input
          className="todo-input"
          type="text"
          placeholder="Bir şey ekleyin..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="todo-button" type="submit">
          Ekle
        </button>
      </form>

      <ul className="todo-container">
        {items.map((item) => (
          <li
            className={`todo-row ${item.completed ? 'complete' : ''}`}
            key={item.id}
          >
            {item.value}
            <div className="icons">
              <button
                className="edit-icon"
                onClick={() => completeItem(item.id)}
              >
                {item.completed ? '✔' : '✎'}
              </button>
              <button
                className="delete-icon"
                onClick={() => deleteItem(item.id)}
              >
                ✖
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

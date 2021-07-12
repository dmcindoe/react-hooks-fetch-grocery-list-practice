import React, { useState, useEffect } from "react"
import GroceryList from "./GroceryList"
import GroceryForm from "./GroceryForm"

const App = () => {
  const [ groceries, setGroceries ] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/groceries")
      .then(resp => resp.json())
      .then(data => setGroceries(data))
  }, [])

  const handleAddGrocery = (newGrocery) => {
    fetch("http://localhost:4000/groceries", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrocery)
    })
      .then(resp => resp.json())
      .then(data => setGroceries([...groceries, data]))
  }

  const handleDeleteGrocery = (deletedGrocery) => {
    fetch(`http://localhost:4000/groceries/${deletedGrocery.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => setGroceries(groceries.filter(grocery => grocery !== deletedGrocery)))
  }

  const handleUpdateGrocery = (updatedGrocery) => {
    fetch(`http://localhost:4000/groceries/${updatedGrocery.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...updatedGrocery, isBought: !updatedGrocery.isBought})
    })
      .then(resp => resp.json())
      .then(data => setGroceries(groceries.map(grocery => {
        if (grocery === updatedGrocery) {
          return data
        } else {
          return grocery
        }
      }))
  )}

  return (
    <>
      <h1>GroceryList</h1>
      <GroceryList
          groceries={groceries}
          onDeleteGrocery={handleDeleteGrocery}
          onUpdateGrocery={handleUpdateGrocery}
      />
      <GroceryForm onAddGrocery={handleAddGrocery} />
    </>
  )
}

export default App

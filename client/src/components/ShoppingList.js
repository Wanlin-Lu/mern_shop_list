import React, { useState } from 'react'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'

const ShoppingList = () => {
  const [items, setItems] = useState([
    { id: uuidv4(), name: 'Egges' },
    { id: uuidv4(), name: 'Milk' },
    { id: uuidv4(), name: 'bread' },
    { id: uuidv4(), name: 'onion' },
    { id: uuidv4(), name: 'Water' },
    { id: uuidv4(), name: 'bluebarry' }
  ])

  const addItem = () => {
    const name = prompt('Enter Item name');
    if (name) {
      setItems(prevItems => ([...prevItems, { id: uuidv4(), name }]));
    }
  }

  return (
    <Container>
      <Button color="dark" style={{ marginBottom: "2rem" }} onClick={addItem}>
        Add Item
      </Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  color="danger"
                  className="remove-btn"
                  size="sm"
                  onClick={() =>
                    setItems(items.filter((item) => item.id !== id))
                  }
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

export default ShoppingList
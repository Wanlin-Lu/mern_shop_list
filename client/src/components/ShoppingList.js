import React, { useState, useEffect } from 'react'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import { getItems } from '../actions/itemActions'
import PropTypes from 'prop-types'

const ShoppingList = props => {
  const [items, setItems] = useState([])

  useEffect(() => {
    props.getItems()
  }, [])

  useEffect(() => {
    setItems(props.item.items)
  }, [props.item.items])

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

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems })(ShoppingList)
import React, { useEffect } from 'react'
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

const ShoppingList = ({ items, getItems, deleteItem, isAuthenticated }) => {

  useEffect(() => {
      getItems();
  }, [getItems])

  const handleDelete = id => {
    deleteItem(id)
  }

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  color="danger"
                  className="remove-btn"
                  size="sm"
                  onClick={handleDelete.bind(this, _id)}
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
  items: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    items: state.item.items,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)
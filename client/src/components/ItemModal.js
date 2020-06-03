import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'

const ItemModal = props => {
  const [inputName, setInputName] = useState('')
  const [isOpen, setModalOpen] = useState(false)

  const toggle = () => {
    setModalOpen(!isOpen)
  }

  const changeHandler = e => {
    setInputName(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    props.addItem({ name: inputName })
    setModalOpen(false)
  }

  return (
    <div>
      <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label for="item">Item:</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={changeHandler}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal)
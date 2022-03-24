import React, {useEffect, useState} from 'react';
import { Button, Form, Modal, ModalBody, ModalTitle } from 'react-bootstrap';
// import Modal from 'react-modal';
import { useDispatch } from "react-redux";
import { addSection } from "../store/actions/data-actions"
// import { ResizingTextarea } from "../components/ResizingTextarea";
import 'bootstrap/dist/css/bootstrap.min.css';

function useAddEvents(section, prompt) {
  const dispatch = useDispatch();
  
  const handleNewSection = React.useCallback(
    function handleScoreSelected(section) {
      const newSection = {section, prompts: []};
      dispatch(addSection({ section:newSection, prompts:[] }));
    },
    [dispatch]
  );

  return { handleNewSection };
}

export function AddSectionModal (){
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [newSectionText, setNewSectionText] = useState('');
  // const [newPromptText, setNewPromptText] = useState('');
  const { handleNewSection} =
    useAddEvents(newSectionText, '');

  const setModalIsOpenToTrue =()=>{
      setModalIsOpen(true)
  }

  function handleClick(event, value) {
    console.log("Submit:" + event.target.value);
    event.preventDefault();
    if(value){
      handleNewSection(value);
    }
  }

  const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
  }

  const content =(
    <div>
      <Button 
      // className="mt-4 mb-4 text-lg font-bold text-center block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button" data-modal-toggle="addSectionModal"
        onClick={setModalIsOpenToTrue}>
          ➕ Add New Section 
      </Button>
      <Modal backdrop='true' centered='true' size='sm' show={modalIsOpen} onHide={setModalIsOpenToFalse}>
        <Modal.Header closeButton>
        <ModalTitle>
          Add New Section
        </ModalTitle>
        </Modal.Header>
      <ModalBody>
        <Form>
          <Form.Group className="mb-3" controlId="newSection">
              <Form.Control type="text" placeholder="Section Title" value ={newSectionText} onChange={(e) => setNewSectionText(e.target.value.replaceAll('\n',''))} />
            </Form.Group>
          <Button variant="secondary" type="cancel" onClick={setModalIsOpenToFalse} className="m-1">
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="m-1" onClick={(e)=>{handleClick(e, newSectionText); setModalIsOpenToFalse()}}>
            Create
          </Button>
        </Form>
        </ModalBody>
      </Modal>
    </div>
    );
    return content;
}

function AnimeList () {

        return (
            <>
            <ul>
                 <h1>One Piece</h1>
                 <h1>Fullmetal Alchemist: Brotherhood</h1>
                 <h1>Naruto</h1>
                 <h1>Bleach</h1>
                 <h1>Haikyu!!</h1>
                 <h1>Kuroko no Basketball</h1>
                 <h1>My hero academia</h1>
                 <h1>One punch man</h1>   
            </ul>     
            </>
        )

}

export default AddSectionModal;
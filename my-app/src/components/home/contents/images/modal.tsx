import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteImage, getImages } from "../../../rest/image";
import toast from "react-hot-toast";
import { setAllImages } from "../../../../stateManager/reducer/images";
import { useDispatch } from "react-redux";

export default function DeleteModal({ deleteModal, setDeleteModal, authToken }: any) {
    const dispatch = useDispatch();

    async function handleDelete() {
        try {
            await deleteImage(deleteModal.id, authToken)
            setDeleteModal({ show: false, id: '' })
            const result = await getImages(authToken)
            if (result) {
                dispatch(setAllImages({
                    images: result
                }))
            }
        } catch (err: any) {
            toast.error(err)
        }
    }

    return (
        <>
            <Modal show={deleteModal.show} onHide={() => setDeleteModal({ show: false, id: '' })}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are your sure you want to delete this image??</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteModal({ show: false, id: '' })}>
                        Close
                    </Button>
                    <Button style={{ background: "red", color: "#fff" }} onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
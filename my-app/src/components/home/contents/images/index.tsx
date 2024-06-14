import React, { useEffect, useState } from "react";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import './index.scss';
import { getImages, uploadImage } from "../../../rest/image";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setAllImages } from "../../../../stateManager/reducer/images";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DeleteIcon from '../../../../assets/svgs/icn_Delete.svg';
import DeleteModal from "./modal";

function Images() {
    const uploader = Uploader({
        apiKey: "free"
    });
    const { authToken } = useSelector((state: any) => state.AuthDetails)
    const { images } = useSelector((state: any) => state.AllImages)
    const dispatch = useDispatch();
    const [url, setUrl] = useState('');
    const [deleteModal, setDeleteModal] = useState({
        show: false,
        id: ''
    });

    async function getAllImages() {
        try {
            const result = await getImages(authToken)
            if (result) {
                dispatch(setAllImages({
                    images: result
                }))
            }
        } catch (err) {

        }
    }
    useEffect(() => { getAllImages() }, [])


    async function imageUploader() {
        try {
            const res = await uploadImage(url, authToken)
            if (res) {
                toast.success(`Image uploaded successfully`)
                setUrl('')
                getAllImages()
            }
        } catch (err: any) {
            toast.error(err)
        }
    }

    useEffect(() => {
        if (url !== '') {
            imageUploader()
        }
    }, [url])

    return (
        <div className="images" >
            <UploadButton uploader={uploader}
                onComplete={files => setUrl(files.map(x => x.fileUrl).join("\n"))}>
                {({ onClick }) =>
                    <button onClick={onClick} className="upload-btn" >
                        + Upload a image...
                    </button>
                }
            </UploadButton>
            <div style={{ marginTop: "25px", height:"90%", overflow:"scroll" }} >
                <Row xs={1} md={2} className="g-4" >
                    {images && images.length > 0 && images?.map((items:any, idx:number) => (
                        <Col key={idx}>
                            <Card >
                                <Card.Img style={{borderBottom:"1px solid lightgrey"}} height={300} variant="top" src={items?.url} />
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <Card.Text><span style={{fontWeight:700}} >Uploaded At: </span> {items.uploadat}</Card.Text>
                                    <img style={{cursor:"pointer"}} onClick={() => setDeleteModal({show:true, id: items.id})}  src={DeleteIcon} height={20} width={20} />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} authToken={authToken} />
        </div>
    )
}

export default Images;
import React, { useEffect, useState } from "react";
import './index.scss';
import Images from '../../../../assets/all-images.png';
import Albums from '../../../../assets/albums.png';
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../../rest/image";
import { setAllImages } from "../../../../stateManager/reducer/images";
import { useNavigate } from "react-router-dom";


function Dashboard () {
    const { authToken } = useSelector((state: any) => state.AuthDetails)
    const [totalImages, setTotalImages] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function getAllImages() {
        try {
            const result = await getImages(authToken)
            if (result) {
                setTotalImages(result.length)
                dispatch(setAllImages({
                    images: result
                }))
            }
        } catch (err) {

        }
    }
    useEffect(() =>  {getAllImages()}, [])

    return (
        <div className="dashboard" >
            <div onClick={() => navigate('/home/images')}  className="box" >
                <img src={Images} height={40} width={40} />
                <div className="counts" >
                    <label>Total Images</label>
                    <div>{totalImages}</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
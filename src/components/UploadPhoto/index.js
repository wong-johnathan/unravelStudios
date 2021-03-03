import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const UploadPhoto = (props) => {
  const style1 = {
    backgroundColor: "#5e5e5e40",
    paddingTop: "100%",
    borderRadius: "5px",
    width: "100%",
    position: "relative",
  };
  const style2 = {
    paddingTop: "100%",
    borderRadius: "5px",
    width: "100%",
    position: "relative",
    backgroundImage: `${props.image}`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };
  return (
    <React.Fragment>
      <div className='p-1 border d-flex justify-content-center' style={{ borderRadius: "5px" }}>
        <div style={props.image ? style2 : style1}>
          {!props.image && (
            <div className='position-absolute h-100 d-flex justify-content-center align-items-center' style={{ top: 0, left: 0, bottom: 0, right: 0 }}>
              <FontAwesomeIcon icon={faCamera} size='lg' />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadPhoto;

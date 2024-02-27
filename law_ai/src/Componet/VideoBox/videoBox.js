import React, { useState } from 'react'
import Modal from 'react-modal';
function VideoBox1() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        console.log("ok")
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className="card border-0 bg-transparent shadow rounded">
                <div className="position-relative p-3">
                    <img src={require("../../assets/images/about/05.png")} alt="Image5" className="card-img-top"  />
                    <div className="video-btn video-btn-pos">
                        {/* <a className="play-btn popup-youtube" href="https://www.youtube.com/watch?v=P_wKDMcr1Tg">
                            <i className="la la-play"></i>
                        </a> */}
                        <div className="play-btn popup-youtube" onClick={openModal}>
                            <i className="la la-play" />
                        </div>
                        <div className="spinner-eff">
                            <div className="spinner-circle circle-1"></div>
                            <div className="spinner-circle circle-2"></div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-4">
                    <h5>Watch make it simple to take your business success with AdvocateIron.</h5>
                    <p className="mb-0">AdvocateIron Amazing Landing Page of businesses need access to development resources.</p>
                </div>
            </div>
            {isOpen && <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                appElement={document.getElementById('root')}
                style={{
                    overlay: {
                        height:"100%",
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems:"center",
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        position: 'relative',
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        width: '50%',
                        maxHeight: '100%',
                    },
                }}
            >

                <div
                    style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        maxWidth: '100%',
                    }}
                >
                     <button
                    onClick={closeModal}
                    style={{
                        position: 'absolute',
                        top: '-1.5rem',
                        right: '3rem',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '3rem',
                        cursor: 'pointer',
                    }}
                >
                        &times;
                    </button> 
                     <iframe
                        title="Video"
                        src="https://www.youtube.com/embed/P_wKDMcr1Tg"
                        allowFullScreen
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '90%',
                            height: '100%',
                        }}
                    />
                </div> 
             </Modal>} 
        </div>
    )
}

export default VideoBox1
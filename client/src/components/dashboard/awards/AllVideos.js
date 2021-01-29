import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteVideo } from '../../../actions/profile'

const AllVideos = ({videos, deleteVideo }) => {

    const allVideos = videos.map(vid => (
        <div className="video p-1" key={vid._id}>
            <iframe 
            title={vid._id}
            width="100%" 
            height="315" 
            src={vid !== null && vid.link.replace("watch?v=","embed/").split('&')[0]}
            />
            <p className="my-1">{vid.description}</p>
            <div 
                className="btn btn-danger"
                onClick={() => deleteVideo(vid._id)}
            >Delete</div>
        </div>
    ))
    return (
        <div>
            {videos.length === 0 ? (
                <div className="p-2">
                    <h1 className="lead">
                        No Videos Yet
                    </h1>
                </div>
            ): (
                <div className="m-2">
                    <p className="lead"><strong>All Videos</strong></p>
                    <div className="all-videos">         
                        {allVideos}
                   </div>
                </div>
            )}
        </div>
    )
}

AllVideos.propTypes = {
    deleteVideo: PropTypes.func.isRequired
}

export default connect(null, { deleteVideo })(AllVideos)

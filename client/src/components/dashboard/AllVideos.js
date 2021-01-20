import React from 'react'
import PropTypes from 'prop-types'

const AllVideos = ({videos}) => {

    const allVideos = videos.map(vid => (
        <div>
            <iframe 
            width="560" 
            height="315" 
            src={vid.link}
            frameborder="0" 
            allowfullscreen
            />
            {vid.description}
        </div>

    ))
    return (
        <div>
            {videos.length === 0 ? (
                <div className="p-2">
                    <h1 className="lead">
                        No Awards Yet
                    </h1>
                </div>
            ): (
                <div>
                    <h2 className="m-2">All Videos</h2>
                    {allVideos}
                </div>
            )}
        </div>
    )
}

AllVideos.propTypes = {

}

export default AllVideos

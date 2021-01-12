import React from 'react'
import PropTypes from 'prop-types'
import Gallery from 'react-grid-gallery';


//https://benhowell.github.io/react-grid-gallery/#demo

//https://freefrontend.com/css-gallery/

const ArtworksTab = props => {
    const IMAGES = [
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfrYqDmnmWv6PMcrrrWrLLQ6C92LZNoTykA&usqp=CAU",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfrYqDmnmWv6PMcrrrWrLLQ6C92LZNoTykA&usqp=CAU",
            thumbnailWidth: 500,
            thumbnailHeight: 174,
            caption: "After Rain (Jeshu John - designerspics.com)"
        },
        {
        src: "https://arbordayblog.org/wp-content/uploads/2018/06/oak-tree-sunset-iStock-477164218-1080x608.jpg",
        thumbnail: "https://arbordayblog.org/wp-content/uploads/2018/06/oak-tree-sunset-iStock-477164218-1080x608.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
        src: "https://cdn-amalp.nitrocdn.com/EPIsoGEOwNoGliAJSLDihKcNNOdQGKoK/assets/static/source/rev-ea9d2ca/wp-content/uploads/2019/07/trees-july192019-min.jpg",
        thumbnail: "https://cdn-amalp.nitrocdn.com/EPIsoGEOwNoGliAJSLDihKcNNOdQGKoK/assets/static/source/rev-ea9d2ca/wp-content/uploads/2019/07/trees-july192019-min.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 250,
        caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
        src: "https://static.euronews.com/articles/stories/04/07/09/32/1440x810_cmsv2_05b2049a-3161-5ce7-9961-4447035cd571-4070932.jpg",
        thumbnail: "https://static.euronews.com/articles/stories/04/07/09/32/1440x810_cmsv2_05b2049a-3161-5ce7-9961-4447035cd571-4070932.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVWLr4FDfoA70ZLxIRAY7JkEIWfsuWcJYFQ&usqp=CAU",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrVWLr4FDfoA70ZLxIRAY7JkEIWfsuWcJYFQ&usqp=CAU",
        thumbnailWidth: 320,
        thumbnailHeight: 250,
        caption: "After Rain (Jeshu John - designerspics.com)"
    }
    ];

    const onClick = e => {
        console.log(e);
    };
    return (
        <div className='artworks m-1'>
            <Gallery 
                images={IMAGES}
                backdropClosesModal={true}           
            />
        </div>
    )
}

ArtworksTab.propTypes = {

}

export default ArtworksTab

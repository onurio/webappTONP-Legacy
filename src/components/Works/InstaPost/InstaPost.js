import React,{useState} from 'react';
import InstagramEmbed from 'react-instagram-embed';

export const InstaPost=(props)=>{
    // const [isLoaded,setIsLoaded] = useState(false);
    const [opacity,setOpacity] = useState('0');

    return(
        <div style={{opacity: opacity,transition: '3s',margin: '3rem 0',width:'100%'}}>
            <InstagramEmbed
            className="center"
            url={props.url}
            maxWidth={'100%'}
            hideCaption={true}
            containerTagName='InstaPost'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {setOpacity('1')}}
            onAfterRender={() => {}}
            onFailure={() => {}}
             />
        </div>
    );
    }


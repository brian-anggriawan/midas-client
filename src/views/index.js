import React from 'react';
import Pageadmin from 'layouts/page-admin';



class Index extends React.Component{


    render(){
        return(
            <Pageadmin>
                
                <div style={{ height: '500px'}}>
                    <h1 className='display-1 text-center'>Midas</h1>
                    <h1 className='display-2 text-center'>Mustikatama Document Archive System</h1>
                </div>
            </Pageadmin>
        )
    }
}


export default Index;